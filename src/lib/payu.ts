import { createHash, timingSafeEqual } from "crypto";

// Lazy reads (not a cached client object like Razorpay's SDK) - PayU's
// hosted checkout needs no persistent client, just a key/salt pair read
// per-request, so there's nothing to lazily construct or cache here.
function getMerchantKey(): string {
  const key = process.env.PAYU_MERCHANT_KEY;
  if (!key) {
    throw new Error("PAYU_MERCHANT_KEY is not set. Add it to .env (see .env.example).");
  }
  return key;
}

function getMerchantSalt(): string {
  const salt = process.env.PAYU_MERCHANT_SALT;
  if (!salt) {
    throw new Error("PAYU_MERCHANT_SALT is not set. Add it to .env (see .env.example).");
  }
  return salt;
}

export function getPayUActionUrl(): string {
  return process.env.PAYU_BASE_URL || "https://test.payu.in/_payment";
}

interface PayURequestHashInput {
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  /** Opaque value PayU echoes back untouched in its postback, e.g. an application id to reconcile later. */
  udf1?: string;
}

// PayU's hosted-checkout request hash covers 17 pipe-separated fields: key,
// txnid, amount, productinfo, firstname, email, udf1-udf10 (only udf1 is
// used here), salt. Built as an array + join rather than a hand-typed pipe
// string so the separator count can't be miscounted - a single wrong pipe
// silently breaks every payment with an "Invalid Hash" error on PayU's side.
export function generatePayURequestHash(input: PayURequestHashInput): { hash: string; key: string } {
  const key = getMerchantKey();
  const salt = getMerchantSalt();
  const fields = [
    key,
    input.txnid,
    input.amount,
    input.productinfo,
    input.firstname,
    input.email,
    input.udf1 ?? "",
    "",
    "",
    "",
    "", // udf2-udf5 (unused)
    "",
    "",
    "",
    "",
    "", // udf6-udf10 (unused)
    salt,
  ];
  const hash = createHash("sha512").update(fields.join("|")).digest("hex");
  return { hash, key };
}

interface PayUResponseHashInput {
  status: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  key: string;
  udf1?: string;
}

// The response/verification hash PayU sends back is the reverse of the
// request fields (salt first, key last) with `status` inserted right after
// salt - this is PayU's documented "reverse hash" formula for confirming a
// postback actually came from PayU and wasn't forged by a browser POSTing
// straight to our callback URL.
export function verifyPayUResponseHash(input: PayUResponseHashInput, providedHash: string): boolean {
  const salt = getMerchantSalt();
  const fields = [
    salt,
    input.status,
    "",
    "",
    "",
    "",
    "", // udf10-udf6 (unused)
    "",
    "",
    "",
    "", // udf5-udf2 (unused)
    input.udf1 ?? "",
    input.email,
    input.firstname,
    input.productinfo,
    input.amount,
    input.txnid,
    input.key,
  ];
  const expected = createHash("sha512").update(fields.join("|")).digest("hex").toLowerCase();
  const provided = providedHash.trim().toLowerCase();

  const expectedBuffer = Buffer.from(expected, "hex");
  const providedBuffer = Buffer.from(provided, "hex");
  return (
    expectedBuffer.length === providedBuffer.length && timingSafeEqual(expectedBuffer, providedBuffer)
  );
}
