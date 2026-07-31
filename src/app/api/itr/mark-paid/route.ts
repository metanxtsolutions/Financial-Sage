import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { itrMarkPaidSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = itrMarkPaidSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Missing required fields" }, { status: 400 });
  }

  const { applicationId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;

  // Re-verify independently rather than trust that the client already called
  // /api/verify-payment - never mutate paid-status on a client-reported flag.
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

  const application = await prisma.itrApplication.findUnique({ where: { id: applicationId } });
  if (!application) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }

  const updated = await prisma.itrApplication.update({
    where: { id: applicationId },
    data: {
      status: "DOCUMENTS_PENDING",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    },
  });

  return NextResponse.json({ success: true, status: updated.status });
}
