import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPayUResponseHash } from "@/lib/payu";
import { sendDscOrderNotification } from "@/lib/email";

// Same shape as /api/payu/callback (PayU posts here as a browser navigation,
// so every exit is a 303 back to the order page), for DSC orders.
function redirectToApp(siteUrl: string, params: Record<string, string>) {
  const url = new URL("/digital-signature-certificate/apply", siteUrl);
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

  if (!txnid || !hash || !udf1) {
    return redirectToApp(siteUrl, { payu: "error" });
  }

  let isValid: boolean;
  try {
    isValid = verifyPayUResponseHash({ status, txnid, amount, productinfo, firstname, email, key, udf1 }, hash);
  } catch (err) {
    console.error("DSC PayU callback: signature verification failed:", err);
    return redirectToApp(siteUrl, { payu: "error" });
  }

  if (!isValid) {
    console.error("DSC PayU callback: hash mismatch", { txnid });
    return redirectToApp(siteUrl, { payu: "error" });
  }

  const order = await prisma.dscOrder.findUnique({ where: { id: udf1 } });
  if (!order) {
    return redirectToApp(siteUrl, { payu: "error" });
  }

  if (status !== "success") {
    return redirectToApp(siteUrl, { payu: "failed", orderId: order.id });
  }

  // A genuine PayU postback can still carry the wrong amount if the request
  // was tampered with before it reached PayU, so it must match the order.
  if (Number(amount).toFixed(2) !== (order.amount / 100).toFixed(2)) {
    console.error("DSC PayU callback: amount mismatch", { txnid, amount, expected: order.amount });
    return redirectToApp(siteUrl, { payu: "error", orderId: order.id });
  }

  // PayU can post the same success twice; only the first one marks it paid.
  const { count } = await prisma.dscOrder.updateMany({
    where: { id: order.id, status: "PAYMENT_PENDING" },
    data: { status: "PAID", payuTxnId: txnid, payuPaymentId: mihpayid || null },
  });

  if (count > 0) {
    try {
      await sendDscOrderNotification({ ...order, payuTxnId: txnid, payuPaymentId: mihpayid || null });
    } catch (err) {
      // The order is already marked paid, so a failed email must not fail the redirect.
      console.error("DSC order email failed:", err);
    }
  }

  return redirectToApp(siteUrl, { payu: "success", orderId: order.id });
}
