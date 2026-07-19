import { Resend } from "resend";
import type { LeadInput } from "@/lib/validation";

export async function sendLeadNotification(lead: LeadInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    // Free-tier Resend not configured yet. Don't fail the lead submission,
    // just skip the email. The lead is already saved to the database.
    console.warn("Resend not configured. Skipping lead email notification.");
    return;
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from,
    to,
    subject: `New GST enquiry: ${lead.name} (${lead.businessType || "unspecified"})`,
    text: [
      `Name: ${lead.name}`,
      `Phone: ${lead.phone}`,
      `Email: ${lead.email || "-"}`,
      `Business type: ${lead.businessType || "-"}`,
      `City: ${lead.city || "-"}`,
      `Message: ${lead.message || "-"}`,
      `Source: ${lead.source || "-"}`,
      `Page URL: ${lead.pageUrl || "-"}`,
      `UTM: ${lead.utmSource || "-"} / ${lead.utmMedium || "-"} / ${lead.utmCampaign || "-"}`,
    ].join("\n"),
  });
}
