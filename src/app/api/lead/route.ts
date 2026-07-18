import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { leadSchema } from "@/lib/validation";
import { sendLeadNotification } from "@/lib/email";
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

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  // Silently drop honeypot hits without revealing to the bot that it failed.
  if (parsed.data.companyWebsite) {
    return NextResponse.json({ ok: true });
  }

  const lead = await prisma.lead.create({
    data: {
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || undefined,
      businessType: parsed.data.businessType || undefined,
      city: parsed.data.city || undefined,
      message: parsed.data.message || undefined,
      source: parsed.data.source || undefined,
      pageUrl: parsed.data.pageUrl || undefined,
      utmSource: parsed.data.utmSource || undefined,
      utmMedium: parsed.data.utmMedium || undefined,
      utmCampaign: parsed.data.utmCampaign || undefined,
    },
  });

  await sendLeadNotification(parsed.data).catch((err) => {
    console.error("Failed to send lead notification email:", err);
  });

  return NextResponse.json({ ok: true, id: lead.id });
}
