// Single source of truth for business facts shown across the site. The owner
// sets these display figures; update them here and every page picks up the change.

export const siteConfig = {
  name: "Financial Sage",
  tagline: "India's GST Registration & Compliance Specialist for MSMEs",
  legalNote:
    "Financial Sage is a GST and business-compliance service provider. We are not a government body; GSTIN issuance and approval timelines are determined by the GST department.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.financialsage.co.in",
  loginUrl: "https://login.financialsage.co.in",
  phoneDisplay: "+91 98300 00000",
  phoneE164: "+919830000000",
  email: "hello@financialsage.co.in",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919830000000",
  responseTime: "40 minutes",
  stats: {
    registrations: "600+",
    activeClients: "400+",
    enquiries: "800+",
  },
  pricingFrom: {
    gstRegistration: 999,
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
