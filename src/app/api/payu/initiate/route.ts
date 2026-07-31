import { NextResponse } from "next/server";
import { generatePayURequestHash, getPayUActionUrl } from "@/lib/payu";
import { payuInitiateSchema } from "@/lib/validation";
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

  const parsed = payuInitiateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const { amount, name, email, phone, productinfo, udf1 } = parsed.data;
  const txnid = `fs_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  const amountStr = amount.toFixed(2);

  let hash: string;
  let key: string;
  try {
    ({ hash, key } = generatePayURequestHash({
      txnid,
      amount: amountStr,
      productinfo,
      firstname: name,
      email,
      udf1,
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
    amount: amountStr,
    productinfo,
    firstname: name,
    email,
    phone,
    udf1: udf1 ?? "",
    surl: `${siteUrl}/api/payu/callback`,
    furl: `${siteUrl}/api/payu/callback`,
    hash,
  });
}
