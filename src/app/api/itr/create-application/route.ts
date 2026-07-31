import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { itrApplicationSchema } from "@/lib/validation";
import { isRateLimited } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/site-config";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = itrApplicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const application = await prisma.itrApplication.create({
    data: {
      itrType: parsed.data.itrType,
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      pan: parsed.data.pan,
      state: parsed.data.state || undefined,
      amount: siteConfig.pricingFrom.itrFilingWizard * 100,
    },
  });

  return NextResponse.json({ applicationId: application.id, amount: application.amount });
}
