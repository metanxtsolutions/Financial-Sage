import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPayUResponseHash } from "@/lib/payu";

// PayU posts here (both surl and furl point at this same route - `status`
// is what distinguishes success from failure) as a real browser navigation,
// not a fetch from our own JS, so the only way back to the app is an HTTP
// redirect - a 303 turns PayU's POST into a plain GET on the way back.
function redirectToApp(siteUrl: string, params: Record<string, string>) {
  const url = new URL("/itr-filing/apply", siteUrl);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  return NextResponse.redirect(url, 303);
}

export async function POST(request: Request) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;

  const form = await request.formData().catch(() => null);
  if (!form) {
    return redirectToApp(siteUrl, { payu: "error" });
  }

  const get = (name: string) => (form.get(name) ?? "").toString();
  const key = get("key");
  const txnid = get("txnid");
  const amount = get("amount");
  const productinfo = get("productinfo");
  const firstname = get("firstname");
  const email = get("email");
  const status = get("status");
  const hash = get("hash");
  const mihpayid = get("mihpayid");
  const udf1 = get("udf1");

  if (!txnid || !hash) {
    return redirectToApp(siteUrl, { payu: "error" });
  }

  let isValid: boolean;
  try {
    isValid = verifyPayUResponseHash({ status, txnid, amount, productinfo, firstname, email, key, udf1 }, hash);
  } catch (err) {
    console.error("PayU callback: signature verification failed:", err);
    return redirectToApp(siteUrl, { payu: "error" });
  }

  if (!isValid) {
    console.error("PayU callback: hash mismatch", { txnid });
    return redirectToApp(siteUrl, { payu: "error" });
  }

  // udf1 carries our own applicationId through untouched - only the ITR
  // wizard's payment step sets it, so a plain test payment (e.g. /payu-test)
  // has nothing to reconcile against.
  if (!udf1) {
    return redirectToApp(siteUrl, { payu: status === "success" ? "success" : "failed" });
  }

  const application = await prisma.itrApplication.findUnique({ where: { id: udf1 } });
  if (!application) {
    return redirectToApp(siteUrl, { payu: "error" });
  }

  if (status === "success") {
    await prisma.itrApplication.update({
      where: { id: application.id },
      data: {
        status: "DOCUMENTS_PENDING",
        payuTxnId: txnid,
        payuPaymentId: mihpayid || null,
      },
    });
    return redirectToApp(siteUrl, { payu: "success", applicationId: application.id });
  }

  return redirectToApp(siteUrl, { payu: "failed", applicationId: application.id });
}
