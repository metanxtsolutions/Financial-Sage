import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generatePayURequestHash, getPayUActionUrl } from "@/lib/payu";
import { isRateLimited } from "@/lib/rate-limit";

// The amount is never taken from the browser: it is read from the order saved
// at create-order, and the callback checks PayU's amount against the same row.
export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const orderId = typeof body?.orderId === "string" ? body.orderId : null;
  if (!orderId) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const order = await prisma.dscOrder.findUnique({ where: { id: orderId } });
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  if (order.status !== "PAYMENT_PENDING") {
    return NextResponse.json({ error: "This order has already been paid." }, { status: 409 });
  }

  const txnid = `fsdsc_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  const amount = (order.amount / 100).toFixed(2);
  const productinfo = "Financial Sage DSC";

  let hash: string;
  let key: string;
  try {
    ({ hash, key } = generatePayURequestHash({
      txnid,
      amount,
      productinfo,
      firstname: order.name,
      email: order.email,
      udf1: order.id,
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
    firstname: order.name,
    email: order.email,
    phone: order.phone,
    udf1: order.id,
    surl: `${siteUrl}/api/dsc/payu-callback`,
    furl: `${siteUrl}/api/dsc/payu-callback`,
    hash,
  });
}
