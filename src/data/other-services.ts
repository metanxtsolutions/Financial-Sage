// Secondary services — footer-only, low emphasis. GST remains the core focus;
// these exist so we don't turn away adjacent-service enquiries.

export interface OtherService {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  startingPrice: number;
  bullets: string[];
}

export const otherServices: OtherService[] = [
  {
    slug: "company-registration",
    title: "Private Limited Company Registration",
    metaTitle: "Private Limited Company Registration | Financial Sage",
    metaDescription: "Register your Private Limited company online — MOA/AOA drafting, DIN, DSC, and incorporation certificate, starting from ₹999.",
    summary: "End-to-end incorporation of a Private Limited company, including name approval, MOA/AOA drafting, and PAN/TAN application.",
    startingPrice: 999,
    bullets: ["Name reservation (RUN)", "MOA & AOA drafting", "DIN & DSC for directors", "PAN & TAN application", "Certificate of Incorporation"],
  },
  {
    slug: "llp-registration",
    title: "LLP Registration",
    metaTitle: "LLP Registration Online | Financial Sage",
    metaDescription: "Register a Limited Liability Partnership online — LLP agreement drafting, DPIN, and incorporation, starting from ₹999.",
    summary: "LLP incorporation for professional practices and small businesses that want limited liability without full corporate compliance.",
    startingPrice: 999,
    bullets: ["Name reservation", "LLP agreement drafting", "Designated Partner Identification Number (DPIN)", "Certificate of Incorporation", "PAN & TAN application"],
  },
  {
    slug: "opc-registration",
    title: "One Person Company (OPC) Registration",
    metaTitle: "OPC Registration Online | Financial Sage",
    metaDescription: "Register a One Person Company online — for solo founders who want a corporate structure with limited liability, starting from ₹999.",
    summary: "Incorporate a One Person Company — a single-owner structure with the liability protection of a private limited company.",
    startingPrice: 999,
    bullets: ["Name reservation", "Nominee appointment", "MOA & AOA drafting", "Certificate of Incorporation", "PAN & TAN application"],
  },
  {
    slug: "partnership-firm-registration",
    title: "Partnership Firm Registration",
    metaTitle: "Partnership Firm Registration | Financial Sage",
    metaDescription: "Draft and register a partnership deed for your firm, starting from ₹999.",
    summary: "Partnership deed drafting and (optional) registration with the Registrar of Firms.",
    startingPrice: 999,
    bullets: ["Partnership deed drafting", "PAN application for the firm", "Registrar of Firms registration (optional)", "Bank account opening support"],
  },
  {
    slug: "sole-proprietorship-registration",
    title: "Sole Proprietorship Registration",
    metaTitle: "Sole Proprietorship Registration | Financial Sage",
    metaDescription: "Set up your sole proprietorship the right way — Udyam registration, GST, and current account support, starting from ₹999.",
    summary: "Basic registrations needed to formally set up a sole proprietorship — Udyam/MSME registration, shop & establishment license guidance, and current account documentation.",
    startingPrice: 999,
    bullets: ["Udyam (MSME) registration", "Shop & Establishment guidance", "Current account opening documents", "GST registration (if applicable)"],
  },
  {
    slug: "msme-udyam-registration",
    title: "MSME / Udyam Registration",
    metaTitle: "MSME Udyam Registration Online | Financial Sage",
    metaDescription: "Register your business under Udyam (MSME) to access government schemes, collateral-free loans, and delayed-payment protection, starting from ₹999.",
    summary: "Udyam registration to formally classify your business as a Micro, Small, or Medium Enterprise and unlock MSME-specific benefits.",
    startingPrice: 999,
    bullets: ["Udyam certificate", "Access to MSME loan schemes", "Delayed payment protection under MSME Act", "Government tender eligibility"],
  },
  {
    slug: "trademark-registration",
    title: "Trademark Registration",
    metaTitle: "Trademark Registration Online | Financial Sage",
    metaDescription: "Protect your brand name and logo with trademark registration — class search, application filing, and objection support, starting from ₹999.",
    summary: "Trademark search and application filing to protect your brand name, logo, or tagline nationally.",
    startingPrice: 999,
    bullets: ["Trademark class search", "Application filing (TM-A)", "Objection/opposition support", "Renewal reminders"],
  },
  {
    slug: "itr-filing",
    title: "ITR Filing",
    metaTitle: "Income Tax Return (ITR) Filing | Financial Sage",
    metaDescription: "Individual and business income tax return filing, with deduction planning, starting from ₹299.",
    summary: "Income tax return filing for individuals, freelancers, and businesses, including applicable deductions and advance tax planning.",
    startingPrice: 299,
    bullets: ["Income & deduction review", "ITR form selection & filing", "Advance tax estimation", "Notice/refund follow-up"],
  },
  {
    slug: "roc-annual-filing",
    title: "ROC Annual Filing",
    metaTitle: "ROC Annual Filing for Companies & LLPs | Financial Sage",
    metaDescription: "Annual ROC compliance for Private Limited companies and LLPs — AOC-4, MGT-7, and LLP Form 11/8, starting from ₹999.",
    summary: "Mandatory annual compliance filings with the Registrar of Companies for Private Limited companies and LLPs.",
    startingPrice: 999,
    bullets: ["AOC-4 (financial statements)", "MGT-7 (annual return)", "LLP Form 11 & Form 8", "Director KYC (DIR-3 KYC)"],
  },
];

export function getOtherService(slug: string): OtherService | undefined {
  return otherServices.find((s) => s.slug === slug);
}
