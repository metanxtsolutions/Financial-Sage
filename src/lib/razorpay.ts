import Razorpay from "razorpay";
import { createHmac, timingSafeEqual } from "crypto";

// Lazy by design, same reasoning as src/lib/prisma.ts: constructing the
// client at module scope would run during Next.js's build-time page-data
// collection, so a missing key would fail the whole build instead of only
// the request that needs Razorpay.
const globalForRazorpay = globalThis as unknown as {
  razorpay: Razorpay | undefined;
};

function createRazorpayClient() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    throw new Error(
      "RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET is not set. Add them to .env (see .env.example).",
    );
  }
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

function getRazorpayClient(): Razorpay {
  if (!globalForRazorpay.razorpay) {
    globalForRazorpay.razorpay = createRazorpayClient();
  }
  return globalForRazorpay.razorpay;
}

export const razorpay: Razorpay = new Proxy({} as Razorpay, {
  get(_target, prop, receiver) {
    return Reflect.get(getRazorpayClient() as object, prop, receiver);
  },
});

// Shared by /api/verify-payment and any endpoint (e.g. /api/itr/mark-paid)
// that mutates state on a successful payment - each must re-verify the
// signature itself rather than trust a client-reported "already verified"
// flag. Constant-time comparison so response timing can't leak the correct
// signature.
export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string,
): boolean {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    throw new Error("RAZORPAY_KEY_SECRET is not set. Add it to .env (see .env.example).");
  }

  const expectedSignature = createHmac("sha256", keySecret).update(`${orderId}|${paymentId}`).digest("hex");

  const expectedBuffer = Buffer.from(expectedSignature, "hex");
  const providedBuffer = Buffer.from(signature, "hex");
  return expectedBuffer.length === providedBuffer.length && timingSafeEqual(expectedBuffer, providedBuffer);
}
