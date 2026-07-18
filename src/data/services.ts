export interface CoreService {
  title: string;
  description: string;
  href: string;
}

export const coreServices: CoreService[] = [
  {
    title: "GST Registration",
    description: "New GST registration for proprietorships, partnerships, LLPs, and companies — filed within 24 hours of documents.",
    href: "/gst-registration",
  },
  {
    title: "Monthly / Quarterly GST Filing",
    description: "GSTR-1 and GSTR-3B filed on time, every time, with reconciliation before submission.",
    href: "/gst-return-filing",
  },
  {
    title: "ITC Advisory",
    description: "Monthly reconciliation of your purchases against GSTR-2B to catch mismatches and unclaimed credit.",
    href: "/gst-compliance",
  },
  {
    title: "GST Notice Handling",
    description: "Response drafting and representation for GST notices, clarifications, and scrutiny.",
    href: "/gst-compliance",
  },
  {
    title: "Annual Return (GSTR-9)",
    description: "Year-end consolidation and filing of your annual GST return, reconciled against monthly filings.",
    href: "/gst-return-filing",
  },
  {
    title: "E-Way Bill Support",
    description: "Generation and validation support for e-way bills on goods movement above ₹50,000.",
    href: "/gst-compliance",
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
  { title: "We Handle the Rest", body: "We file, follow up, and keep you updated until it's done — no portal logins or paperwork on your end." },
];

export const whyFinancialSage = [
  { title: "Transparent subscription pricing", body: "Published prices, no 'request a quote' games." },
  { title: "WhatsApp-first onboarding", body: "Share documents and get updates where you already are." },
  { title: "MSME-focused support", body: "We build our process around small business realities, not enterprise red tape." },
  { title: "Pan-India coverage", body: "Fully remote — we serve clients across every state." },
  { title: "Fast response", body: `We respond within ${"40 minutes"} during business hours.` },
  { title: "Dedicated GST expert", body: "One point of contact who knows your filing history." },
  { title: "CA-reviewed filings", body: "Every filing is reviewed for accuracy before submission." },
  { title: "Secure documentation", body: "Your documents are handled confidentially and never shared beyond your filing." },
];
