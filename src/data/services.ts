import type { IconName } from "@/components/Icon";

export interface CoreService {
  title: string;
  description: string;
  href: string;
  icon: IconName;
}

export const coreServices: CoreService[] = [
  {
    title: "GST Registration",
    description: "Any entity type, filed within 24 hours of your documents. No office visits, no waiting on a CA's calendar.",
    href: "/gst-registration",
    icon: "document-check",
  },
  {
    title: "Monthly / Quarterly GST Filing",
    description: "GSTR-1 and GSTR-3B, reconciled and filed on time, every time. Never a surprise late fee again.",
    href: "/gst-return-filing",
    icon: "refresh",
  },
  {
    title: "ITC Advisory",
    description: "We check your purchases against GSTR-2B every month, so you claim every rupee of credit you're owed.",
    href: "/gst-compliance",
    icon: "shield-check",
  },
  {
    title: "GST Notice Handling",
    description: "A notice showed up? We read it, draft the response, and deal with the portal so you don't have to.",
    href: "/gst-compliance",
    icon: "bell",
  },
  {
    title: "Annual Return (GSTR-9)",
    description: "Your annual return, reconciled against every monthly filing and submitted well before the deadline.",
    href: "/gst-return-filing",
    icon: "calendar-check",
  },
  {
    title: "E-Way Bill Support",
    description: "E-way bills generated and checked for shipments over ₹50,000, so goods never get stuck at a checkpost.",
    href: "/gst-compliance",
    icon: "truck",
  },
];

export interface BusinessTypeCard {
  label: string;
  href: string;
}

export const whoNeedsGst: BusinessTypeCard[] = [
  { label: "Freelancers", href: "/gst-registration-for-freelancers" },
  { label: "Agencies", href: "/gst-registration-for-consultants" },
  { label: "Restaurants", href: "/gst-registration-for-restaurants" },
  { label: "Manufacturers", href: "/gst-registration-for-startups" },
  { label: "Import/Export", href: "/gst-registration-for-import-export" },
  { label: "Amazon Sellers", href: "/gst-registration-for-amazon-sellers" },
  { label: "Shopify Sellers", href: "/gst-registration-for-shopify-sellers" },
  { label: "Consultants", href: "/gst-registration-for-consultants" },
  { label: "Doctors", href: "/gst-registration-for-doctors" },
  { label: "Architects", href: "/gst-registration-for-consultants" },
  { label: "YouTubers & Creators", href: "/gst-registration-for-freelancers" },
  { label: "Digital Marketing Agencies", href: "/gst-registration-for-consultants" },
  { label: "Software Companies", href: "/gst-registration-for-startups" },
  { label: "E-commerce Sellers", href: "/gst-registration-for-ecommerce" },
  { label: "Startups", href: "/gst-registration-for-startups" },
];

export const processSteps = [
  { title: "Choose Service", body: "Pick GST registration, filing, or a compliance plan that fits your business stage." },
  { title: "Submit Details", body: "Share your documents and business details over WhatsApp, email, or our online form." },
  { title: "We Handle the Rest", body: "We file, follow up, and keep you posted until it's done. No portal logins or paperwork on your end." },
];

export const whyFinancialSage: { title: string; body: string; icon: IconName }[] = [
  { title: "A fraction of a CA's retainer", body: "Traditional CAs charge ₹10,000 or more a year. Our plans start at ₹399.", icon: "tag" },
  { title: "WhatsApp-first onboarding", body: "Send documents, ask questions, get updates. All on the app you already use all day.", icon: "chat" },
  { title: "Built for MSME budgets", body: "Priced and designed for a business with five employees, not five hundred.", icon: "users" },
  { title: "Pan-India coverage", body: "Fully remote. We serve clients in every state, from Tier 1 metros to Tier 3 towns.", icon: "globe" },
  { title: "Fast response", body: `We respond within ${"40 minutes"} during business hours, not next week.`, icon: "clock" },
  { title: "Dedicated GST expert", body: "One point of contact who knows your filing history, not a rotating call queue.", icon: "user-check" },
  { title: "CA-reviewed filings", body: "Every return is checked for accuracy before it goes anywhere near the GST portal.", icon: "badge-check" },
  { title: "Secure documentation", body: "Your documents are handled confidentially and never shared beyond your filing.", icon: "lock" },
];
