export interface PricingTier {
  id: string;
  name: string;
  price: number;
  priceNote: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel: string;
}

// Edit prices here. Every displayed, structured-data and checkout price is
// derived from this file (siteConfig.pricingFrom re-exports the headline ones).
//
// Service fees only. Government fees, stamp duty and 18% GST are charged
// separately and are stated next to the price wherever it is shown.
export const PRICE_DISCLOSURE =
  "Service fee, excluding 18% GST and government fees (charged separately at actuals).";

export const gstRegistrationPrice = 399;
export const monthlyFilingFrom = 299; // GST nil return, per month

/** ITR wizard price per form. Used for display AND the amount stored on the
 *  application / sent to PayU, so the two cannot drift. */
export const itrWizardPrices = {
  ITR_1: 499, // salaried
  ITR_2: 1499, // capital gains, foreign assets, more than one property
  ITR_3: 1499, // business / professional income, F&O
  ITR_4: 999, // presumptive income (not in the owner's list, review)
} as const;
export type ItrWizardType = keyof typeof itrWizardPrices;
export const itrWizardFrom = itrWizardPrices.ITR_1;

/** Standalone monthly GST return filing plans (no registration bundled). */
export const gstFilingPlans = [
  { id: "nil", label: "Nil return", volume: "No sales or purchases in the month", price: 299 },
  { id: "upto-10", label: "Up to 10 invoices", volume: "GSTR-1 and GSTR-3B", price: 499 },
  { id: "11-25", label: "11 to 25 invoices", volume: "GSTR-1 and GSTR-3B", price: 699 },
  { id: "26-50", label: "26 to 50 invoices", volume: "GSTR-1 and GSTR-3B", price: 999 },
] as const;

export interface ServicePrice {
  amount: number;
  /** Billing interval or basis, appended to the amount, e.g. "/month". */
  unit?: string;
  /** "Starting from" for variable-scope services. */
  from?: boolean;
  /** Extra disclosure, e.g. "Government fees extra". */
  note?: string;
}

/** Retail price per /other-services slug. Slugs not listed keep the price in
 *  other-services.ts and are listed in the pricing review report. */
export const servicePrices: Record<string, ServicePrice> = {
  "company-registration": { amount: 4999, from: true },
  "llp-registration": { amount: 3999, from: true },
  "opc-registration": { amount: 3999, from: true }, // review: not in owner's list
  "partnership-firm-registration": { amount: 1999, from: true },
  "sole-proprietorship-registration": { amount: 999 },
  "msme-udyam-registration": {
    amount: 299,
    note: "Our assistance fee. Official Udyam registration on the government portal is free.",
  },
  "import-export-code": { amount: 999 },
  "fssai-registration": { amount: 999, from: true, note: "Government licence fee extra" },
  "fssai-state-licence": { amount: 999, from: true, note: "Government licence fee extra" },
  "fssai-central-licence": { amount: 999, from: true, note: "Government licence fee extra" },
  "trademark-registration": { amount: 999, unit: " per class", note: "Government fees extra" },
  "itr-filing": { amount: 499 },
  "itr-1-filing": { amount: 499 },
  "itr-2-filing": { amount: 1499, from: true },
  "itr-3-filing": { amount: 1499, from: true },
  "itr-4-filing": { amount: 999, from: true }, // review
  "tds-return-filing": { amount: 999, unit: "/quarter", from: true },
  "income-tax-notice-response": { amount: 1499, from: true }, // review
  "roc-annual-filing": { amount: 3499, from: true },
  "private-limited-annual-compliance": { amount: 3499, from: true },
  "llp-annual-compliance": { amount: 2999, from: true }, // review
  "bookkeeping-and-accounting": { amount: 1999, unit: "/month", from: true },
  "gst-registration-cancellation": { amount: 999 },
  "gst-registration-revocation": { amount: 1499 },
};

/** "From ₹1,999/month" style label shared by every price display. */
export function formatPrice(p: Pick<ServicePrice, "amount" | "unit" | "from">): string {
  return `${p.from ? "From " : ""}₹${p.amount.toLocaleString("en-IN")}${p.unit ?? ""}`;
}

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: gstRegistrationPrice,
    priceNote: "+ 18% GST and applicable Govt fee",
    description: "GST registration only, for businesses just getting started.",
    features: [
      "Free eligibility consultation",
      "Document preparation & review",
      "GST application filing",
      "ARN tracking until GSTIN is issued",
      "Digital copy of GST certificate",
    ],
    ctaLabel: "Start Registration",
  },
  {
    id: "business",
    name: "Business",
    price: 5999, // review: bundle = 399 + 12 x 499, rounded
    priceNote: "+ 18% GST and applicable Govt fee",
    description:
      "Registration plus a full year of return filing, for businesses that want to file and forget.",
    features: [
      "Everything in Starter",
      "12 months of GSTR-1 & GSTR-3B filing (up to 10 invoices/month)",
      "MSME/Udyam registration, if applicable",
      "Dedicated GST expert on WhatsApp",
      "Monthly filing reminders",
    ],
    highlighted: true,
    ctaLabel: "Choose Business",
  },
  {
    id: "compliance-pro",
    name: "Compliance Pro",
    price: 7999, // review: Business + GSTR-9 (1,499) + advisory
    priceNote: "+ 18% GST and applicable Govt fee",
    description:
      "Full-year compliance cover for businesses that want annual filing and notice support handled end-to-end.",
    features: [
      "Everything in Business",
      "GSTR-9 annual return filing",
      "Input Tax Credit (ITC) advisory",
      "GST notice handling & response drafting",
      "Priority support (faster-than-standard response)",
    ],
    ctaLabel: "Choose Compliance Pro",
  },
];

