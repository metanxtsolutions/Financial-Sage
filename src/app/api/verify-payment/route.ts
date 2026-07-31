import { NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { verifyPaymentSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = verifyPaymentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Missing required fields" }, { status: 400 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;

  let isValid: boolean;
  try {
    isValid = verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
  } catch (err) {
    console.error("Razorpay signature verification failed:", err);
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  if (!isValid) {
    return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
  }

  return NextResponse.json({ success: true, payment_id: razorpay_payment_id });
}
