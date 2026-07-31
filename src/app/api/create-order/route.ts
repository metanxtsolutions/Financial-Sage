import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { createOrderSchema } from "@/lib/validation";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = createOrderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  try {
    const order = await razorpay.orders.create({
      amount: parsed.data.amount,
      currency: parsed.data.currency,
      receipt: parsed.data.receipt ?? `receipt_${Date.now()}`,
    });

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    const statusCode = (err as { statusCode?: number } | null)?.statusCode;
    if (statusCode === 401) {
      return NextResponse.json({ error: "Razorpay authentication failed" }, { status: 401 });
    }
    console.error("Razorpay create-order failed:", err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
