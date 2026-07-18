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

// Edit prices here — this file is the single place pricing is defined.
export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: 399,
    priceNote: "+ applicable Govt fee",
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
    price: 2999,
    priceNote: "+ applicable Govt/GST fee",
    description:
      "Registration plus a full year of return filing, for businesses that want to file and forget.",
    features: [
      "Everything in Starter",
      "12 months of GSTR-1 & GSTR-3B filing (up to 100 transactions/month)",
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
    price: 5999,
    priceNote: "+ applicable Govt/GST fee",
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

export const monthlyFilingFrom = 299;
