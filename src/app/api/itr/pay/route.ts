import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generatePayURequestHash, getPayUActionUrl } from "@/lib/payu";
import { isRateLimited } from "@/lib/rate-limit";

// The amount is never taken from the browser: it is read from the application
// saved at create-application, and the callback checks PayU's amount against
// the same row.
export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const applicationId = typeof body?.applicationId === "string" ? body.applicationId : null;
  if (!applicationId) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const application = await prisma.itrApplication.findUnique({ where: { id: applicationId } });
  if (!application) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }
  if (application.status !== "PAYMENT_PENDING") {
    return NextResponse.json({ error: "This application has already been paid." }, { status: 409 });
  }

  const txnid = `fs_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  const amount = (application.amount / 100).toFixed(2);
  const productinfo = "Financial Sage ITR Filing";

  let hash: string;
  let key: string;
  try {
    ({ hash, key } = generatePayURequestHash({
      txnid,
      amount,
      productinfo,
      firstname: application.name,
      email: application.email,
      udf1: application.id,
    }));
  } catch (err) {
    console.error("PayU hash generation failed:", err);
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;

  return NextResponse.json({
    action: getPayUActionUrl(),
    key,
    txnid,
    amount,
    productinfo,
    firstname: application.name,
    email: application.email,
    phone: application.phone,
    udf1: application.id,
    surl: `${siteUrl}/api/payu/callback`,
    furl: `${siteUrl}/api/payu/callback`,
    hash,
  });
}
