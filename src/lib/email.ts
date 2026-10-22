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

interface DscOrderEmail {
  id: string;
  dscType: string;
  name: string;
  phone: string;
  email: string;
  pan: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  amount: number;
  payuTxnId: string | null;
  payuPaymentId: string | null;
}

/** Tells the team a DSC order has been paid, so eKYC and dispatch can start. */
export async function sendDscOrderNotification(order: DscOrderEmail) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.warn("Resend not configured. Skipping DSC order email notification.");
    return;
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from,
    to,
    subject: `Paid DSC order: ${order.name} (${order.dscType})`,
    text: [
      `Order ID: ${order.id}`,
      `DSC: ${order.dscType}`,
      `Amount paid: ₹${(order.amount / 100).toFixed(2)} (incl. 18% GST)`,
      `PayU txn: ${order.payuTxnId || "-"} / payment ${order.payuPaymentId || "-"}`,
      "",
      `Name: ${order.name}`,
      `PAN: ${order.pan}`,
      `Phone: ${order.phone}`,
      `Email: ${order.email}`,
      "",
      "Delivery address:",
      order.address,
      `${order.city}, ${order.state} ${order.pincode}`,
    ].join("\n"),
  });
}
