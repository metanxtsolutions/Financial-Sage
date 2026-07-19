// Single source of truth for real business facts. Do not inflate these numbers.
// Per the project brief, Financial Sage competes on transparent pricing and
// responsiveness, not on bigger-than-life stats.

export const siteConfig = {
  name: "Financial Sage",
  tagline: "India's GST Registration & Compliance Specialist for MSMEs",
  legalNote:
    "Financial Sage is a GST and business-compliance service provider. We are not a government body; GSTIN issuance and approval timelines are determined by the GST department.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://financialsage.co.in",
  loginUrl: "https://login.financialsage.co.in",
  phoneDisplay: "+91 98300 00000",
  phoneE164: "+919830000000",
  email: "hello@financialsage.co.in",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919830000000",
  responseTime: "40 minutes",
  stats: {
    registrations: "150+",
    activeClients: "40-50",
    enquiries: "800+",
  },
  pricingFrom: {
    gstRegistration: 399,
    otherRegistration: 999,
    filing: 299,
  },
} as const;

export function whatsappLink(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`;
}

export const defaultWhatsappMessage =
  "Hi Financial Sage, I'd like help with GST registration/filing for my business.";
