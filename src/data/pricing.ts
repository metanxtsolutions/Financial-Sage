export interface PricingTier {
  id: string;
  name: string;
  price: number;
  /** Billing basis shown next to the price, e.g. "one-time". */
  billing: string;
  /** What the plan's contents cost bought one by one, when it is a bundle. */
  separatePrice?: number;
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

/** Digital signature certificates (Vsign), priced per certificate with the USB
 *  token, verification support and courier included. 18% GST is extra. */
export const dscPrices = [
  { id: "sign-1y", type: "Class 3 Individual (Sign Only)", validity: "1 Year", price: 2499 },
  { id: "sign-2y", type: "Class 3 Individual (Sign Only)", validity: "2 Years", price: 3499 },
  { id: "sign-3y", type: "Class 3 Individual (Sign Only)", validity: "3 Years", price: 5499 },
  { id: "sign-encrypt-1y", type: "Class 3 Individual (Sign + Encrypt)", validity: "1 Year", price: 6000 },
  { id: "sign-encrypt-2y", type: "Class 3 Individual (Sign + Encrypt)", validity: "2 Years", price: 9000 },
] as const;
export const dscFrom = Math.min(...dscPrices.map((d) => d.price));
export const DSC_INCLUSIONS = [
  "Official Vsign certificate",
  "USB token",
  "eKYC and video verification support",
  "Doorstep courier delivery",
  "Complete setup assistance",
];
export const DSC_TIMELINE = { processing: "1–2 working days", delivery: "2–3 working days" } as const;
export type DscTypeId = (typeof dscPrices)[number]["id"];
export const dscTypeIds = dscPrices.map((d) => d.id) as [DscTypeId, ...DscTypeId[]];

/** What a DSC order charges, in paise. Unlike the other services, DSC is paid
 *  online with 18% GST added at checkout, since the price list states it is
 *  not GST inclusive. */
export function dscCharge(id: DscTypeId) {
  const dsc = dscPrices.find((d) => d.id === id)!;
  const price = dsc.price * 100;
  const gst = Math.round(price * 0.18);
  return { dsc, price, gst, total: price + gst };
}

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
  "fssai-state-licence": { amount: 1999, from: true, note: "Government licence fee extra" },
  "fssai-central-licence": { amount: 2999, from: true, note: "Government licence fee extra" },
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
  "gst-amendment": { amount: 499 },
  "gstr-9-annual-return": { amount: 1499, from: true },
  "gst-notice-reply": { amount: 1499, from: true },
  "gst-reconciliation": { amount: 999, from: true },

  // Not in the owner's price list. Set against comparable Indian providers
  // (e.g. IndiaFilings Section 8 at ₹2,899 + GST, trademark objection replies
  // around ₹2,999) and kept in line with the listed prices above.
  "section-8-company-registration": { amount: 4999, from: true, note: "Government fees and stamp duty extra" },
  "public-limited-company-registration": { amount: 9999, from: true, note: "Government fees and stamp duty extra" },
  "nidhi-company-registration": { amount: 9999, from: true, note: "Government fees and stamp duty extra" },
  "producer-company-registration": { amount: 9999, from: true, note: "Government fees and stamp duty extra" },
  "indian-subsidiary-registration": { amount: 6999, from: true, note: "Government fees and stamp duty extra" },
  "startup-india-registration": { amount: 1999 },
  "ad-code-registration": { amount: 999 },
  "shop-and-establishment-registration": { amount: 999, from: true, note: "State government fee extra" },
  "professional-tax-registration": { amount: 999, from: true, note: "State government fee extra" },
  "iso-certification": { amount: 2999, from: true, note: "Certification body fee extra" },
  "bis-registration": { amount: 9999, from: true, note: "BIS and lab testing fees extra" },
  "trade-licence": { amount: 999, from: true, note: "Municipal fee extra" },
  "psara-licence": { amount: 9999, from: true, note: "Government fees extra" },
  "drug-licence": { amount: 4999, from: true, note: "Government fees extra" },
  "cdsco-registration": { amount: 9999, from: true, note: "Government fees extra" },
  "apeda-registration": { amount: 1499, note: "Government fee extra" },
  "rcmc-registration": { amount: 1499, note: "Export promotion council fee extra" },
  "ngo-darpan-registration": { amount: 999 },
  "12a-80g-registration": { amount: 2999, from: true },
  "itr-7-filing": { amount: 2999, from: true },
  "pf-return-filing": { amount: 999, unit: "/month", from: true },
  "advance-tax-planning": { amount: 499, unit: "/session" },
  "dir-3-kyc": { amount: 499, unit: " per director", note: "MCA late fee extra where applicable" },
  "form-inc-20a": { amount: 999, note: "MCA filing fee extra" },
  "appointment-of-auditor-adt-1": { amount: 999, note: "MCA filing fee extra" },
  "nidhi-company-compliance": { amount: 4999, from: true },
  "ngo-annual-compliance": { amount: 4999, from: true },
  "partnership-firm-tax-return": { amount: 1999, from: true },
  "trademark-objection-reply": { amount: 2999 },
  "trademark-opposition": { amount: 4999, from: true, note: "Government fees extra" },
  "trademark-renewal": { amount: 1999, unit: " per class", note: "Government fees extra" },
  "copyright-registration": { amount: 2999, note: "Government fees extra" },
  "patent-registration": { amount: 9999, from: true, note: "Government fees extra" },
  "design-registration": { amount: 2999, note: "Government fees extra" },
  "change-company-name": { amount: 2999, from: true, note: "MCA fees extra" },
  "change-registered-office": { amount: 1999, from: true, note: "MCA fees extra" },
  "change-in-director": { amount: 1999, from: true, note: "MCA fees extra" },
  "removal-of-director": { amount: 1999, from: true, note: "MCA fees extra" },
  "add-designated-partner": { amount: 1999, from: true, note: "MCA fees extra" },
  "change-in-llp-agreement": { amount: 1999, from: true, note: "MCA fees and stamp duty extra" },
  "increase-authorised-capital": { amount: 1999, from: true, note: "MCA fees and stamp duty extra" },
  "transfer-of-shares": { amount: 1999, from: true, note: "Stamp duty extra" },
  "convert-partnership-to-llp": { amount: 4999, from: true, note: "MCA fees extra" },
  "close-private-limited-company": { amount: 4999, from: true, note: "MCA fees extra" },
  "close-llp": { amount: 3999, from: true, note: "MCA fees extra" },
  "additional-place-of-business-gst": { amount: 499 },
  "gst-lut-filing": { amount: 499 },
  "gst-refund-application": { amount: 2999, from: true },
  "gst-e-invoice-setup": { amount: 1499 },
  "e-way-bill-registration": { amount: 499 },
  "digital-signature-certificate": { amount: dscFrom, from: true, note: "USB token and courier included" },
};

/** One-off advisory session, not tied to a catalogue page. */
export const businessConsultation = { amount: 499, unit: "/session" } as const;

/** Overseas incorporations depend on the jurisdiction's own government and
 *  agent fees, so these are quoted after a consultation, not priced from ₹X. */
export const QUOTED_CATEGORY = "international";

/** "From ₹1,999/month" style label shared by every price display. */
export function formatPrice(p: Pick<ServicePrice, "amount" | "unit" | "from">): string {
  return `${p.from ? "From " : ""}₹${p.amount.toLocaleString("en-IN")}${p.unit ?? ""}`;
}

// Bundles are priced from the a-la-carte prices so the saving is real and
// checkable: registration + 12 months of the up-to-10-invoice filing band,
// then GSTR-9 and one notice reply on top.
const businessSeparate = gstRegistrationPrice + 12 * gstFilingPlans[1].price; // 6,387
const complianceProSeparate =
  businessSeparate + servicePrices["gstr-9-annual-return"].amount + servicePrices["gst-notice-reply"].amount; // 9,385

/** No government fee applies to GST registration or to filing returns. */
export const TIER_TAX_NOTE = "+ 18% GST. No government fee for GST registration or returns.";

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: gstRegistrationPrice,
    billing: "one-time",
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
    price: 5999,
    billing: "one-time, covers 12 months",
    separatePrice: businessSeparate,
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
    price: 7999,
    billing: "one-time, covers 12 months",
    separatePrice: complianceProSeparate,
    description:
      "Full-year compliance cover for businesses that want annual filing and notice support handled end-to-end.",
    features: [
      "Everything in Business",
      "GSTR-9 annual return filing",
      "Input Tax Credit (ITC) advisory",
      "Reply to one GST notice, drafted and filed",
      "Priority support (faster-than-standard response)",
    ],
    ctaLabel: "Choose Compliance Pro",
  },
];

