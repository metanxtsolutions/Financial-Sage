import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { dscOrderSchema } from "@/lib/validation";
import { isRateLimited } from "@/lib/rate-limit";
import { dscCharge } from "@/data/pricing";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = dscOrderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const { dscType, name, phone, email, pan, address, city, state, pincode } = parsed.data;
  const order = await prisma.dscOrder.create({
    data: { dscType, name, phone, email, pan, address, city, state, pincode, amount: dscCharge(dscType).total },
  });

  return NextResponse.json({ orderId: order.id, amount: order.amount });
}
