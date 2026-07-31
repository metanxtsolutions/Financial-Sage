import Razorpay from "razorpay";

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
