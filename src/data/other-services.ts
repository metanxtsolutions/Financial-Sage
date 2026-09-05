// Service catalogue for everything outside the core GST pillar pages.
//
// GST remains the specialisation and keeps its own top-level pages
// (/gst-registration, /gst-return-filing, /gst-compliance). Everything here is
// an adjacent statutory service, grouped into categories so the catalogue stays
// navigable as it grows and so each category can own its own long-tail search
// intent. Each category also has a hub page at /services/[slug].

import type { Faq } from "@/data/faqs";

export type ServiceCategoryId =
  | "company-incorporation"
  | "licences"
  | "tax-filing"
  | "roc-compliance"
  | "ipr"
  | "business-changes"
  | "international"
  | "gst-specialist";

export interface ServiceCategory {
  id: ServiceCategoryId;
  /** URL segment for the hub page at /services/[slug]. */
  slug: string;
  title: string;
  /** One-line summary, used in navigation and on the catalogue index. */
  blurb: string;

  // --- Hub page content. A hub that only repeats the service list is a thin
  // --- duplicate of the catalogue section it came from, so each one carries
  // --- its own heading, intro and decision guidance.
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** Two or three sentences setting up the category. */
  intro: string;
  /** The question someone browsing this category is actually trying to answer. */
  guidance: { heading: string; body: string; points: string[] };
  faqs: Faq[];
  ctaHeading: string;
  ctaSubmitLabel: string;
}

// Order here is the order they appear in navigation and on /other-services.
// The `faqs` below are scoped to hub pages and never enter the global `faqs`
// array, so they don't show on /faq; the category field on them is nominal.
export const serviceCategories: ServiceCategory[] = [
  {
    id: "company-incorporation",
    slug: "company-incorporation",
    title: "Company & Entity Registration",
    blurb: "Pick a legal structure and get incorporated, from a one-person company to a subsidiary of a foreign parent.",
    h1: "Company & Entity Registration in India",
    metaTitle: "Company Registration in India: Pvt Ltd, LLP, OPC & More | Financial Sage",
    metaDescription: "Register a private limited company, LLP, OPC, or partnership firm. Compare structures, see what each one costs to run, and get incorporated from ₹999.",
    intro:
      "The structure you incorporate under decides how much compliance you carry every year, how easily you can raise money, and whether your personal assets are exposed. It is far cheaper to choose correctly now than to convert later.",
    guidance: {
      heading: "Which structure should you choose?",
      body: "There is no single best answer, only the one that fits how you intend to trade and who you intend to raise money from. In practice the choice comes down to four questions.",
      points: [
        "Are you raising external investment? Investors expect a private limited company. Almost no institutional investor will put money into an LLP or a proprietorship.",
        "How much annual compliance can you carry? A private limited company files AOC-4, MGT-7 and holds board meetings every year. An LLP is lighter. A proprietorship has none of it.",
        "Is limited liability the point? A proprietorship and a partnership expose personal assets. An LLP, OPC and private limited company do not.",
        "Are you on your own? A private limited company needs two directors and two shareholders. A One Person Company gives a solo founder the same protection with a nominee instead.",
      ],
    },
    faqs: [
      {
        id: "cat-inc-which",
        category: "financial-sage",
        question: "Private limited or LLP?",
        answer:
          "Take a private limited company if you plan to raise investment, issue shares to a co-founder, or sell to enterprise customers who check the register. Take an LLP if it is a professional practice or a stable trading business with no outside investors, since the annual compliance is lighter and there is no dividend distribution to plan around.",
      },
      {
        id: "cat-inc-cost",
        category: "financial-sage",
        question: "What does incorporation actually cost?",
        answer:
          "Our fee starts at ₹999. On top of that sit government fees and stamp duty, and stamp duty is set by the state, so the same company costs a different amount to incorporate in Maharashtra than in Gujarat. We quote both parts before filing rather than after.",
      },
      {
        id: "cat-inc-convert",
        category: "financial-sage",
        question: "Can I convert later if I choose wrong?",
        answer:
          "Yes, and it is a common route: a partnership converts into an LLP, or a proprietorship incorporates as a private limited company. But conversion means fresh GST registration, a new PAN, moving bank accounts and contracts, and its own filing fees, so it is worth a few minutes of thought now.",
      },
    ],
    ctaHeading: "Not sure which structure fits?",
    ctaSubmitLabel: "Get a Recommendation",
  },
  {
    id: "licences",
    slug: "licences-and-certifications",
    title: "Licences & Certifications",
    blurb: "The sector licences and certifications a business needs before it can legally trade, import, or manufacture.",
    h1: "Business Licences & Certifications",
    metaTitle: "Business Licences in India: FSSAI, IEC, BIS, ISO & More | Financial Sage",
    metaDescription: "FSSAI, Import Export Code, AD Code, BIS, ISO, trade licence, drug licence and more. Find which licences your sector needs and get them filed from ₹999.",
    intro:
      "Most licences are triggered by what you sell and where you sell it, not by how big you are. A single food stall needs FSSAI registration; so does a company turning over crores, just at a different tier. Trading without the licence your sector requires carries penalties that dwarf the cost of getting one.",
    guidance: {
      heading: "Which licences apply to you?",
      body: "Work from your activity rather than from a list. These are the usual triggers.",
      points: [
        "Handling food in any form, including a home kitchen or a cloud kitchen: FSSAI, at the basic, state, or central tier depending on turnover and whether you cross state lines.",
        "Importing or exporting: an Import Export Code from DGFT, plus AD Code registration at each port you ship from, or customs will not generate your shipping bill.",
        "Manufacturing a product under a mandatory standard, particularly electronics: BIS registration under CRS, or FMCS if the factory is outside India.",
        "Operating from commercial premises at all: a Shop & Establishment registration, and in many municipalities a trade licence on top.",
        "Selling to government or applying for MSME schemes: Udyam registration, which is free of statutory fee and quick.",
      ],
    },
    faqs: [
      {
        id: "cat-lic-which",
        category: "financial-sage",
        question: "How do I know which licences I need?",
        answer:
          "Tell us your activity, your state, and whether you sell across state lines or abroad. Those three facts determine almost all of it. We would rather tell you that you need fewer licences than you feared than sell you ones that do not apply.",
      },
      {
        id: "cat-lic-expiry",
        category: "financial-sage",
        question: "Do licences expire?",
        answer:
          "Most do. FSSAI runs one to five years, trade licences are usually annual, IEC does not expire but must be updated every year to stay active. Lapsing is the common failure, so we track renewal dates for anything we file for you.",
      },
      {
        id: "cat-lic-penalty",
        category: "financial-sage",
        question: "What happens if I trade without one?",
        answer:
          "It varies by statute and can be severe. Operating a food business without FSSAI registration carries penalties and the risk of the premises being sealed; exporting without an IEC simply is not possible, since customs will block the consignment. Getting the licence first is always cheaper.",
      },
    ],
    ctaHeading: "Tell us your sector",
    ctaSubmitLabel: "Check What I Need",
  },
  {
    id: "tax-filing",
    slug: "income-tax-and-tds",
    title: "Income Tax & TDS",
    blurb: "Return filing, TDS compliance, and notice handling for individuals, firms, and companies.",
    h1: "Income Tax & TDS Filing",
    metaTitle: "Income Tax Return & TDS Filing Services | Financial Sage",
    metaDescription: "ITR-1 through ITR-7, quarterly TDS returns, PF and ESI filing, advance tax planning and notice responses. Filed and reconciled from ₹299.",
    intro:
      "Most filing problems are not arithmetic. They are the wrong form, a mismatch against the Annual Information Statement, or a deadline missed by a week. All three are avoidable, and all three are expensive to fix after the fact.",
    guidance: {
      heading: "Getting the return right the first time",
      body: "A return that is filed but defective is worse than one filed late, because the clock keeps running while you fix it.",
      points: [
        "Pick the form from your income mix, not from last year. Adding capital gains or a second house property moves you off ITR-1, and filing ITR-1 anyway gets the return marked defective.",
        "Reconcile against the AIS and Form 26AS before filing. The department already has that data, and a mismatch is the most common reason a query lands.",
        "Compute both regimes. The new regime is the default, which is not the same as it being the cheaper one for you.",
        "Report losses even when there is no tax to pay. Reporting them is what lets you carry them forward against future gains.",
      ],
    },
    faqs: [
      {
        id: "cat-tax-form",
        category: "financial-sage",
        question: "Which ITR form do I need?",
        answer:
          "Salary with one house property up to ₹50 lakh is ITR-1. Capital gains, more than one property, or foreign assets move you to ITR-2. Business or professional income is ITR-3, or ITR-4 under presumptive taxation. Trusts and NGOs file ITR-7. We pick it from your actual income rather than assuming.",
      },
      {
        id: "cat-tax-deadline",
        category: "financial-sage",
        question: "What if I have missed the deadline?",
        answer:
          "A belated return can still be filed, with a fee under Section 234F and interest on unpaid tax. What you lose is the ability to carry forward most losses. Filing late is always better than not filing, and the sooner the smaller the interest.",
      },
      {
        id: "cat-tax-notice",
        category: "financial-sage",
        question: "I have received a notice. What now?",
        answer:
          "Most notices are routine. A 143(1) intimation is usually an arithmetic or TDS mismatch and is resolved by responding on the portal. Send it to us and we will tell you what it actually is before you worry about it.",
      },
    ],
    ctaHeading: "Talk to a Tax Expert",
    ctaSubmitLabel: "Get My Return Filed",
  },
  {
    id: "roc-compliance",
    slug: "roc-compliance",
    title: "ROC & Annual Compliance",
    blurb: "The recurring filings that keep a registered company or LLP in good standing with the Registrar.",
    h1: "ROC & Annual Compliance",
    metaTitle: "ROC Annual Compliance for Companies & LLPs | Financial Sage",
    metaDescription: "AOC-4, MGT-7, LLP Form 11 and Form 8, DIR-3 KYC, INC-20A and auditor appointment. Annual ROC compliance filed on time from ₹999.",
    intro:
      "Annual compliance is the part founders forget, because nothing appears to go wrong when it is skipped. The penalties accrue quietly, per day, against the company and its directors personally, and they do not lapse.",
    guidance: {
      heading: "What a registered entity owes every year",
      body: "The obligations start at incorporation, not at your first rupee of revenue. A dormant company still files.",
      points: [
        "A private limited company files AOC-4 with its financial statements and MGT-7 with its annual return, appoints an auditor in ADT-1, and holds board meetings that have to be minuted.",
        "An LLP files Form 11 and Form 8. Late filing carries ₹100 per day, per form, with no ceiling, which is how dormant LLPs end up owing more than they ever earned.",
        "Every director files DIR-3 KYC each year. Miss it and the DIN is deactivated, which blocks every other filing until it is restored.",
        "A newly incorporated company must file INC-20A within 180 days before it can legally commence business or borrow.",
      ],
    },
    faqs: [
      {
        id: "cat-roc-dormant",
        category: "financial-sage",
        question: "My company is dormant. Do I still have to file?",
        answer:
          "Yes. Filing obligations follow registration, not activity. A company with no revenue still files AOC-4 and MGT-7, and an LLP still files Form 11 and Form 8. If you are genuinely done with the entity, striking it off is cheaper than leaving it to accrue penalties.",
      },
      {
        id: "cat-roc-penalty",
        category: "financial-sage",
        question: "How bad are the late filing penalties?",
        answer:
          "For an LLP, ₹100 per day per form with no upper limit, which compounds fast across two forms and several years. For companies, additional fees scale with how late you are, and persistent default can lead to directors being disqualified.",
      },
      {
        id: "cat-roc-behind",
        category: "financial-sage",
        question: "I am several years behind. Can it be fixed?",
        answer:
          "Usually yes. Pending filings are brought up to date in order, penalties are quantified so you know the number before committing, and DINs are reactivated where they have been deactivated. It is rarely as bad as people expect once it is laid out.",
      },
    ],
    ctaHeading: "Behind on filings?",
    ctaSubmitLabel: "Get a Compliance Check",
  },
  {
    id: "ipr",
    slug: "trademark-and-ip",
    title: "Trademark & Intellectual Property",
    blurb: "Protect the brand name, logo, design, or invention your business is built on.",
    h1: "Trademark & Intellectual Property",
    metaTitle: "Trademark Registration, Copyright & Patent Filing | Financial Sage",
    metaDescription: "Trademark search and registration, objection replies, oppositions and renewals, plus copyright, patent and design filing. From ₹999.",
    intro:
      "Registering a company name does not protect it. The MCA register and the trademark register are separate, and it is the trademark that stops someone else trading under your name. Businesses usually discover this when somebody else files first.",
    guidance: {
      heading: "What protects what",
      body: "The four rights cover different things, and applying for the wrong one protects nothing.",
      points: [
        "A trademark protects a name, logo, or tagline used in trade, within the classes you register it in. Register in the classes you actually trade in.",
        "Copyright protects an original work: software, writing, artwork, music, film. It exists on creation, but registration gives you a dated public record to rely on in a dispute.",
        "A patent protects an invention, and only if it is new. Publishing or selling before filing can destroy novelty, so file before you launch.",
        "A design registration protects how a product looks: its shape, pattern, or ornamentation, for up to fifteen years.",
      ],
    },
    faqs: [
      {
        id: "cat-ipr-company-name",
        category: "financial-sage",
        question: "I registered my company name. Is it protected?",
        answer:
          "No. Company name approval only stops another company registering an identical name at the MCA. It does not stop a business trading under your brand, and it does not stop someone else registering it as a trademark. The two registers are independent.",
      },
      {
        id: "cat-ipr-timeline",
        category: "financial-sage",
        question: "How long does a trademark take?",
        answer:
          "You can use the ™ symbol as soon as the application is filed. Registration itself commonly takes a year or more, longer if an examination report or an opposition is raised. The filing date is what secures your priority, so filing early matters more than the wait.",
      },
      {
        id: "cat-ipr-objection",
        category: "financial-sage",
        question: "I have received a trademark objection.",
        answer:
          "That is routine and not a refusal. You have thirty days to reply to the examination report, after which the application is treated as abandoned. We draft the reply against the specific grounds raised and file it on the IP India portal.",
      },
    ],
    ctaHeading: "Protect your brand",
    ctaSubmitLabel: "Start a Trademark Search",
  },
  {
    id: "business-changes",
    slug: "business-changes",
    title: "Business Changes & Closure",
    blurb: "Change what is on record with the Registrar, restructure ownership, or wind a company down cleanly.",
    h1: "Business Changes & Closure",
    metaTitle: "Change Company Name, Directors, Address or Close a Company | Financial Sage",
    metaDescription: "Name and address changes, director appointments and removals, share transfers, capital increases, conversions and strike off. Filed from ₹999.",
    intro:
      "Almost every change to a registered entity has a filing attached to it, and most of them run on a thirty-day clock from the date of the decision, not the date you get round to it. Missing the window turns a routine filing into a penalty.",
    guidance: {
      heading: "Changes that carry a deadline",
      body: "The board resolution is the start of the clock, not the end of the job.",
      points: [
        "Appointing or removing a director: DIR-12 within 30 days. A resigning director files DIR-11 separately in their own name.",
        "Changing the LLP agreement, including capital or profit share: Form 3 within 30 days, with stamp duty set by the state.",
        "Transferring shares: an SH-4 instrument, stamped, board-approved, and the register of members updated. Without that, the transfer is not effective.",
        "Closing down: strike off in STK-2 for a company or Form 24 for an LLP, and both require pending annual filings to be cleared first.",
      ],
    },
    faqs: [
      {
        id: "cat-chg-name",
        category: "financial-sage",
        question: "What is involved in changing my company name?",
        answer:
          "Name availability, a special resolution filed in MGT-14, and approval in INC-24, after which a fresh incorporation certificate is issued. The part people forget is downstream: GST, PAN, bank accounts, licences and contracts all carry the old name and each needs updating.",
      },
      {
        id: "cat-chg-close",
        category: "financial-sage",
        question: "Is it worth formally closing a company I no longer use?",
        answer:
          "Almost always. An unused company keeps accruing filing obligations and penalties against you personally as a director. Strike off costs once; leaving it dormant costs every year, indefinitely.",
      },
      {
        id: "cat-chg-address",
        category: "financial-sage",
        question: "Does moving office need a filing?",
        answer:
          "Yes, in INC-22. Within the same city it is straightforward. Moving to another state additionally needs regional director approval in INC-23, which takes longer and should be planned before you sign a new lease.",
      },
    ],
    ctaHeading: "Need to change something on record?",
    ctaSubmitLabel: "Request a Callback",
  },
  {
    id: "international",
    slug: "international-company-registration",
    title: "International Business Setup",
    blurb: "Incorporate outside India, from a UAE free zone to a US corporation, with the Indian-side reporting handled too.",
    h1: "International Company Registration",
    metaTitle: "International Company Registration: UAE, Singapore, US, UK | Financial Sage",
    metaDescription: "Set up a company abroad from India. UAE mainland and free zone, Singapore, USA, UK, Canada, Australia, Saudi Arabia and more, with FEMA and ODI reporting handled.",
    intro:
      "Indian businesses incorporate abroad for three reasons: to invoice overseas customers in their own currency, to hold intellectual property closer to their market, or because a distributor or platform will not contract with an Indian entity. The overseas incorporation is only half the job. The Indian side, an Overseas Direct Investment filing with your bank under FEMA, is the half people forget.",
    guidance: {
      heading: "Choosing a jurisdiction",
      body: "Pick for where your customers and your banking are, not for the headline tax rate. A structure you cannot open a bank account for is worth nothing.",
      points: [
        "Selling into the Gulf: a UAE company. Mainland if you need to trade inside the UAE market, a free zone if you are invoicing outside it. Both now allow full foreign ownership.",
        "Selling to enterprise customers in Asia: Singapore. Full foreign ownership and S$1 minimum capital, but the law requires at least one director ordinarily resident in Singapore at all times.",
        "Raising US venture capital or selling to US companies: a Delaware C-Corporation. Selling services without raising money: an LLC is usually simpler and cheaper.",
        "Trading in Europe: the UK is the fastest and cheapest to form with no minimum capital, while a German GmbH carries a €25,000 share capital requirement and mandatory notarisation.",
        "Every one of these needs substance. Regulators and banks both look for a real office, real activity and clean KYC before they will open an account.",
      ],
    },
    faqs: [
      {
        id: "cat-intl-odi",
        category: "financial-sage",
        question: "What do I have to file in India?",
        answer:
          "Investing in a company abroad is Overseas Direct Investment under FEMA. It is routed through your authorised dealer bank, reported in Form FC, and followed by an Annual Performance Report for as long as you hold the stake. Skipping it is the most common and most expensive mistake, and we handle this side alongside the incorporation.",
      },
      {
        id: "cat-intl-bank",
        category: "financial-sage",
        question: "Will I be able to open a bank account?",
        answer:
          "This is the real constraint, not the incorporation. Banks apply their own KYC and want to see genuine substance: an office, an activity they understand, and a clear explanation of where money comes from. A company with no substance can be incorporated and still fail at the banking stage, so we plan for it from the start.",
      },
      {
        id: "cat-intl-visit",
        category: "financial-sage",
        question: "Do I need to travel?",
        answer:
          "Often not. Several jurisdictions allow remote incorporation with notarised and apostilled documents. Some banks still insist on meeting a director in person, and Germany requires notarisation of the formation deed. We tell you which category yours falls into before you commit.",
      },
    ],
    ctaHeading: "Setting up abroad?",
    ctaSubmitLabel: "Discuss My Structure",
  },
  {
    id: "gst-specialist",
    slug: "specialist-gst",
    title: "Specialist GST Work",
    blurb: "One-off GST jobs that sit outside a monthly filing plan. Our core GST pages cover registration and returns.",
    h1: "Specialist GST Services",
    metaTitle: "GST Cancellation, Revocation, LUT, Refunds & E-Invoicing | Financial Sage",
    metaDescription: "One-off GST work: cancellation and revocation, LUT filing for exporters, refund claims, e-invoicing setup, e-way bill registration and place-of-business amendments.",
    intro:
      "These are the GST jobs that fall outside a monthly filing plan: closing a registration, getting a cancelled one back, claiming a refund, or setting up e-invoicing after crossing the threshold. If you need registration or ongoing returns instead, those have their own pages.",
    guidance: {
      heading: "The ones that are time-sensitive",
      body: "Several of these carry a window that closes, and missing it turns a form into a much longer process.",
      points: [
        "A Letter of Undertaking has to be refiled at the start of every financial year. Without it in force, an exporter has to pay IGST upfront and claim it back.",
        "Revocation of a cancelled registration must be applied for within the prescribed window after the cancellation order, and pending returns have to be cleared first.",
        "A final return in GSTR-10 is due within three months of a cancellation order, and it is commonly missed because the business has already stopped trading.",
        "An additional place of business must be added before you store stock or invoice from it, not after.",
      ],
    },
    faqs: [
      {
        id: "cat-gst-vs-core",
        category: "financial-sage",
        question: "Is this different from your main GST service?",
        answer:
          "Yes. Registration and monthly or quarterly return filing are our core practice and have their own pages. This category covers one-off jobs, usually triggered by something specific: an export order, a cancellation order, or crossing the e-invoicing threshold.",
      },
      {
        id: "cat-gst-cancelled",
        category: "financial-sage",
        question: "My GSTIN was cancelled by the officer. Can I get it back?",
        answer:
          "Usually, through revocation in REG-21, but only inside the prescribed window and only after the pending returns and dues that triggered the cancellation are cleared. The sooner you start the better, since the window is not generous.",
      },
      {
        id: "cat-gst-refund",
        category: "financial-sage",
        question: "How long does a GST refund take?",
        answer:
          "Once RFD-01 is filed with complete annexures, sanction commonly follows within a couple of months. Most delay comes from a deficiency memo in RFD-03, which restarts the process, so getting the reconciliation right at filing is what actually determines the speed.",
      },
    ],
    ctaHeading: "Talk to a GST Expert",
    ctaSubmitLabel: "Get Help With GST",
  },
];

export function getServiceCategory(id: ServiceCategoryId): ServiceCategory | undefined {
  return serviceCategories.find((c) => c.id === id);
}

export function getServiceCategoryBySlug(slug: string): ServiceCategory | undefined {
  return serviceCategories.find((c) => c.slug === slug);
}

export interface OtherService {
  slug: string;
  category: ServiceCategoryId;
  /**
   * Optional at-a-glance facts, rendered as a small table above the
   * inclusions. Added for the international pages, where the entity type,
   * regulator and ownership rule are the first things anyone wants.
   */
  facts?: { label: string; value: string }[];
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  startingPrice: number;
  bullets: string[];
}

export const otherServices: OtherService[] = [
  // ---------------------------------------------------------------------
  // Company & Entity Registration
  // ---------------------------------------------------------------------
  {
    slug: "company-registration",
    category: "company-incorporation",
    title: "Private Limited Company Registration",
    metaTitle: "Private Limited Company Registration | Financial Sage",
    metaDescription: "Register your Private Limited company online. MOA/AOA drafting, DIN, DSC, and incorporation certificate from ₹999.",
    summary: "Full incorporation of a Private Limited company, covering name approval, MOA/AOA drafting, and PAN/TAN application.",
    startingPrice: 999,
    bullets: ["Name reservation (RUN)", "MOA & AOA drafting", "DIN & DSC for directors", "PAN & TAN application", "Certificate of Incorporation"],
  },
  {
    slug: "llp-registration",
    category: "company-incorporation",
    title: "LLP Registration",
    metaTitle: "LLP Registration Online | Financial Sage",
    metaDescription: "Register a Limited Liability Partnership online. LLP agreement drafting, DPIN, and incorporation from ₹999.",
    summary: "LLP incorporation for professional practices and small businesses that want limited liability without full corporate compliance.",
    startingPrice: 999,
    bullets: ["Name reservation", "LLP agreement drafting", "Designated Partner Identification Number (DPIN)", "Certificate of Incorporation", "PAN & TAN application"],
  },
  {
    slug: "opc-registration",
    category: "company-incorporation",
    title: "One Person Company (OPC) Registration",
    metaTitle: "OPC Registration Online | Financial Sage",
    metaDescription: "Register a One Person Company online, for solo founders who want a corporate structure with limited liability. From ₹999.",
    summary: "Incorporate a One Person Company, a single-owner structure with the liability protection of a private limited company.",
    startingPrice: 999,
    bullets: ["Name reservation", "Nominee appointment", "MOA & AOA drafting", "Certificate of Incorporation", "PAN & TAN application"],
  },
  {
    slug: "partnership-firm-registration",
    category: "company-incorporation",
    title: "Partnership Firm Registration",
    metaTitle: "Partnership Firm Registration | Financial Sage",
    metaDescription: "Draft and register a partnership deed for your firm, starting from ₹999.",
    summary: "Partnership deed drafting and (optional) registration with the Registrar of Firms.",
    startingPrice: 999,
    bullets: ["Partnership deed drafting", "PAN application for the firm", "Registrar of Firms registration (optional)", "Bank account opening support"],
  },
  {
    slug: "sole-proprietorship-registration",
    category: "company-incorporation",
    title: "Sole Proprietorship Registration",
    metaTitle: "Sole Proprietorship Registration | Financial Sage",
    metaDescription: "Set up your sole proprietorship the right way. Udyam registration, GST, and current-account support from ₹999.",
    summary: "The registrations you need to set up a sole proprietorship properly: Udyam/MSME registration, shop & establishment licence guidance, and current-account documentation.",
    startingPrice: 999,
    bullets: ["Udyam (MSME) registration", "Shop & Establishment guidance", "Current account opening documents", "GST registration (if applicable)"],
  },
  {
    slug: "section-8-company-registration",
    category: "company-incorporation",
    title: "Section 8 Company Registration",
    metaTitle: "Section 8 Company Registration for NGOs | Financial Sage",
    metaDescription: "Register a Section 8 (not-for-profit) company. Licence application, MOA/AOA drafting, and incorporation from ₹999.",
    summary: "Incorporation of a not-for-profit company under Section 8 of the Companies Act, the structure most NGOs use when they want corporate credibility and access to CSR funding.",
    startingPrice: 999,
    bullets: ["Section 8 licence application (INC-12)", "Name reservation", "MOA & AOA drafting for charitable objects", "Certificate of Incorporation", "Guidance on 12A/80G next steps"],
  },
  {
    slug: "public-limited-company-registration",
    category: "company-incorporation",
    title: "Public Limited Company Registration",
    metaTitle: "Public Limited Company Registration | Financial Sage",
    metaDescription: "Incorporate a Public Limited company with a minimum of seven members and three directors. Full ROC filing support from ₹999.",
    summary: "Incorporation of a Public Limited company, for businesses that intend to raise capital from the public or list in future.",
    startingPrice: 999,
    bullets: ["Name reservation", "MOA & AOA drafting", "DIN & DSC for all directors", "Certificate of Incorporation", "Post-incorporation compliance briefing"],
  },
  {
    slug: "nidhi-company-registration",
    category: "company-incorporation",
    title: "Nidhi Company Registration",
    metaTitle: "Nidhi Company Registration Online | Financial Sage",
    metaDescription: "Register a Nidhi company for member-based lending and savings. Incorporation plus NDH-4 guidance from ₹999.",
    summary: "Incorporation of a Nidhi company, the mutual-benefit structure used for borrowing and lending among members without an RBI licence.",
    startingPrice: 999,
    bullets: ["Name reservation", "MOA & AOA drafting", "Certificate of Incorporation", "Member and capital requirement planning", "NDH-4 declaration guidance"],
  },
  {
    slug: "producer-company-registration",
    category: "company-incorporation",
    title: "Producer Company Registration",
    metaTitle: "Farmer Producer Company (FPC) Registration | Financial Sage",
    metaDescription: "Register a Farmer Producer Company with ten or more producer members. Incorporation and compliance setup from ₹999.",
    summary: "Incorporation of a Producer Company for groups of farmers or primary producers who want to aggregate, process, and market collectively.",
    startingPrice: 999,
    bullets: ["Name reservation", "MOA & AOA drafting for producer objects", "DIN & DSC for directors", "Certificate of Incorporation", "Member onboarding documentation"],
  },
  {
    slug: "indian-subsidiary-registration",
    category: "company-incorporation",
    title: "Indian Subsidiary Registration",
    metaTitle: "Indian Subsidiary Company Registration for Foreign Parents | Financial Sage",
    metaDescription: "Set up an Indian subsidiary of a foreign company. Incorporation, FEMA reporting, and RBI compliance from ₹999.",
    summary: "Incorporation of an Indian subsidiary for a foreign parent company, including the FEMA and RBI reporting that follows the first inward remittance.",
    startingPrice: 999,
    bullets: ["Name reservation", "Apostilled document handling", "MOA & AOA drafting", "Certificate of Incorporation", "FC-GPR filing guidance for share allotment"],
  },
  {
    slug: "startup-india-registration",
    category: "company-incorporation",
    title: "Startup India (DPIIT) Recognition",
    metaTitle: "Startup India DPIIT Recognition | Financial Sage",
    metaDescription: "Get DPIIT recognition under Startup India for tax benefits, self-certification, and tender relaxations. From ₹999.",
    summary: "DPIIT recognition under the Startup India scheme, which unlocks self-certification on labour laws, tender relaxations, and eligibility for the 80-IAC tax holiday.",
    startingPrice: 999,
    bullets: ["Eligibility assessment", "Innovation write-up drafting", "DPIIT application filing", "Recognition certificate", "Briefing on 80-IAC and Section 56 exemptions"],
  },

  // ---------------------------------------------------------------------
  // Licences & Certifications
  // ---------------------------------------------------------------------
  {
    slug: "msme-udyam-registration",
    category: "licences",
    title: "MSME / Udyam Registration",
    metaTitle: "MSME Udyam Registration Online | Financial Sage",
    metaDescription: "Register your business under Udyam (MSME) to access government schemes, collateral-free loans, and delayed-payment protection, starting from ₹999.",
    summary: "Udyam registration to classify your business as a Micro, Small, or Medium Enterprise and open up MSME benefits.",
    startingPrice: 999,
    bullets: ["Udyam certificate", "Access to MSME loan schemes", "Delayed payment protection under MSME Act", "Government tender eligibility"],
  },
  {
    slug: "fssai-registration",
    category: "licences",
    title: "FSSAI Registration (Basic)",
    metaTitle: "FSSAI Basic Registration for Food Businesses | Financial Sage",
    metaDescription: "Get your FSSAI basic registration for a food business with turnover under ₹12 lakh. Application and certificate from ₹999.",
    summary: "FSSAI basic registration for small food businesses, home kitchens, and stalls with annual turnover below ₹12 lakh.",
    startingPrice: 999,
    bullets: ["Eligibility and category check", "Form A application filing", "Document preparation", "FSSAI registration certificate", "Renewal reminders"],
  },
  {
    slug: "fssai-state-licence",
    category: "licences",
    title: "FSSAI State Licence",
    metaTitle: "FSSAI State Licence for Food Businesses | Financial Sage",
    metaDescription: "Apply for an FSSAI state licence for food businesses with turnover between ₹12 lakh and ₹20 crore. From ₹999.",
    summary: "FSSAI state licence for restaurants, cloud kitchens, and manufacturers operating in a single state with turnover between ₹12 lakh and ₹20 crore.",
    startingPrice: 999,
    bullets: ["Form B application filing", "Layout and equipment documentation", "Food safety management plan", "State licence certificate", "Renewal and annual return reminders"],
  },
  {
    slug: "fssai-central-licence",
    category: "licences",
    title: "FSSAI Central Licence",
    metaTitle: "FSSAI Central Licence Application | Financial Sage",
    metaDescription: "Apply for an FSSAI central licence for large or multi-state food businesses, importers, and exporters. From ₹999.",
    summary: "FSSAI central licence for food businesses operating across states, importing, exporting, or crossing ₹20 crore in turnover.",
    startingPrice: 999,
    bullets: ["Form B application filing", "Multi-state premises documentation", "Import/export category mapping", "Central licence certificate", "Annual return (Form D1) support"],
  },
  {
    slug: "import-export-code",
    category: "licences",
    title: "Import Export Code (IEC)",
    metaTitle: "IEC Registration Online | Import Export Code | Financial Sage",
    metaDescription: "Get your Import Export Code from DGFT, the mandatory licence for any business importing into or exporting out of India. From ₹999.",
    summary: "IEC registration with the DGFT, the ten-digit code every business needs before it can legally import into or export out of India.",
    startingPrice: 999,
    bullets: ["DGFT application filing", "Digital signature coordination", "Bank certificate handling", "IEC certificate", "Annual IEC update filing"],
  },
  {
    slug: "ad-code-registration",
    category: "licences",
    title: "AD Code Registration",
    metaTitle: "AD Code Registration for Exporters | Financial Sage",
    metaDescription: "Register your bank's AD Code at the port or ICD so your export shipping bills clear customs. From ₹999.",
    summary: "AD Code registration at the ports and ICDs you ship from, without which customs will not generate your shipping bill.",
    startingPrice: 999,
    bullets: ["AD Code letter from your bank", "Port and ICD registration", "ICEGATE profile linking", "Multi-port registration", "Shipping bill troubleshooting"],
  },
  {
    slug: "shop-and-establishment-registration",
    category: "licences",
    title: "Shop & Establishment Registration",
    metaTitle: "Shop and Establishment Licence (Gumasta) | Financial Sage",
    metaDescription: "Register your shop, office, or commercial establishment under your state's Shops & Establishments Act. From ₹999.",
    summary: "Shop & Establishment registration, the state licence that legitimises a commercial premises and is usually the first thing a bank asks for on a current account.",
    startingPrice: 999,
    bullets: ["State-specific application filing", "Employer and employee particulars", "Premises documentation", "Registration certificate", "Renewal reminders"],
  },
  {
    slug: "professional-tax-registration",
    category: "licences",
    title: "Professional Tax Registration",
    metaTitle: "Professional Tax Registration (PTEC & PTRC) | Financial Sage",
    metaDescription: "Register for professional tax as an employer (PTRC) or an individual professional (PTEC) in your state. From ₹999.",
    summary: "Professional tax enrolment and registration in states that levy it, covering both the employer certificate (PTRC) and the individual enrolment certificate (PTEC).",
    startingPrice: 999,
    bullets: ["PTEC enrolment certificate", "PTRC employer registration", "State slab mapping", "Monthly/annual return filing", "Late payment interest calculation"],
  },
  {
    slug: "iso-certification",
    category: "licences",
    title: "ISO Certification",
    metaTitle: "ISO Certification for Indian Businesses | Financial Sage",
    metaDescription: "Get ISO 9001, 14001, or 27001 certified through an accredited body. Gap assessment to certificate, from ₹999.",
    summary: "ISO certification support across the common standards, from gap assessment and documentation through to the audit with an accredited certification body.",
    startingPrice: 999,
    bullets: ["Standard selection (9001 / 14001 / 27001 and others)", "Gap assessment", "Documentation and manual drafting", "Audit coordination", "Certificate issuance"],
  },
  {
    slug: "bis-registration",
    category: "licences",
    title: "BIS Registration",
    metaTitle: "BIS Registration & ISI Mark Certification | Financial Sage",
    metaDescription: "Register your product with the Bureau of Indian Standards under CRS or FMCS, including ISI mark certification. From ₹999.",
    summary: "BIS registration for products that fall under a mandatory standard, covering the CRS scheme for electronics and the FMCS route for foreign manufacturers.",
    startingPrice: 999,
    bullets: ["Product and standard mapping", "Sample testing at a BIS lab", "CRS or FMCS application filing", "ISI mark / registration certificate", "Renewal support"],
  },
  {
    slug: "trade-licence",
    category: "licences",
    title: "Trade Licence",
    metaTitle: "Municipal Trade Licence Application | Financial Sage",
    metaDescription: "Apply for the municipal trade licence your local body requires before you can operate commercially. From ₹999.",
    summary: "Trade licence application with your municipal corporation, the local-body permission required before a commercial activity can be carried on from a premises.",
    startingPrice: 999,
    bullets: ["Municipality and category identification", "Application filing", "Premises and NOC documentation", "Trade licence certificate", "Annual renewal"],
  },
  {
    slug: "psara-licence",
    category: "licences",
    title: "PSARA Licence",
    metaTitle: "PSARA Licence for Private Security Agencies | Financial Sage",
    metaDescription: "Get a PSARA licence to run a private security agency, including police verification and training tie-ups. From ₹999.",
    summary: "PSARA licence for private security agencies, covering the controlling authority application, police verification, and the mandatory training-institute tie-up.",
    startingPrice: 999,
    bullets: ["Controlling authority application", "Police verification coordination", "Training institute MoU", "State-wise licence filing", "Renewal support"],
  },
  {
    slug: "drug-licence",
    category: "licences",
    title: "Drug Licence",
    metaTitle: "Drug Licence for Pharmacies & Wholesalers | Financial Sage",
    metaDescription: "Apply for a retail or wholesale drug licence from your state drug control authority. From ₹999.",
    summary: "Retail and wholesale drug licence applications with the state drug control authority, including the pharmacist and premises requirements inspectors check.",
    startingPrice: 999,
    bullets: ["Retail or wholesale category assessment", "Pharmacist and premises documentation", "Form 19/20 application filing", "Inspection preparation", "Licence certificate"],
  },
  {
    slug: "cdsco-registration",
    category: "licences",
    title: "CDSCO Registration",
    metaTitle: "CDSCO Registration for Medical Devices & Cosmetics | Financial Sage",
    metaDescription: "Register medical devices, cosmetics, or drugs for import with CDSCO on the SUGAM portal. From ₹999.",
    summary: "CDSCO registration and import licensing for medical devices, cosmetics, and drugs, filed through the SUGAM portal.",
    startingPrice: 999,
    bullets: ["Device or product classification", "SUGAM portal application", "Technical dossier compilation", "Import licence (Form MD-14/15)", "Post-approval compliance"],
  },
  {
    slug: "apeda-registration",
    category: "licences",
    title: "APEDA Registration",
    metaTitle: "APEDA RCMC Registration for Agri Exporters | Financial Sage",
    metaDescription: "Register with APEDA to export scheduled agricultural and processed food products from India. From ₹999.",
    summary: "APEDA registration-cum-membership for exporters of scheduled agricultural and processed food products, which also unlocks APEDA's export incentive schemes.",
    startingPrice: 999,
    bullets: ["Product schedule verification", "RCMC application filing", "Bank and IEC documentation", "APEDA certificate", "Scheme and incentive briefing"],
  },
  {
    slug: "rcmc-registration",
    category: "licences",
    title: "RCMC Registration",
    metaTitle: "RCMC Registration with Export Promotion Councils | Financial Sage",
    metaDescription: "Get your Registration-cum-Membership Certificate from the right export promotion council for DGFT benefits. From ₹999.",
    summary: "RCMC registration with the export promotion council that covers your product line, a prerequisite for most DGFT export benefits.",
    startingPrice: 999,
    bullets: ["Council identification by product", "Application and fee handling", "IEC and bank documentation", "RCMC certificate", "Amendment and renewal support"],
  },
  {
    slug: "ngo-darpan-registration",
    category: "licences",
    title: "NGO Darpan Registration",
    metaTitle: "NGO Darpan Registration & Unique ID | Financial Sage",
    metaDescription: "Register your NGO on the NITI Aayog Darpan portal and get the Unique ID needed for government grants. From ₹999.",
    summary: "NGO Darpan registration with NITI Aayog, which issues the Unique ID that government ministries require before releasing any grant.",
    startingPrice: 999,
    bullets: ["Darpan portal application", "Office bearer KYC", "Registration document upload", "Unique ID issuance", "Profile update support"],
  },
  {
    slug: "12a-80g-registration",
    category: "licences",
    title: "12A & 80G Registration",
    metaTitle: "12A and 80G Registration for NGOs & Trusts | Financial Sage",
    metaDescription: "Get 12A registration for tax exemption and 80G so your donors can claim a deduction. Filed on Form 10A. From ₹999.",
    summary: "12A and 80G registration for trusts, societies, and Section 8 companies, giving the organisation income tax exemption and its donors a deduction.",
    startingPrice: 999,
    bullets: ["Form 10A / 10AB filing", "Activity and expenditure documentation", "Provisional and regular registration", "Departmental query response", "Renewal tracking"],
  },

  // ---------------------------------------------------------------------
  // Income Tax & TDS
  // ---------------------------------------------------------------------
  {
    slug: "itr-filing",
    category: "tax-filing",
    title: "ITR Filing",
    metaTitle: "Income Tax Return (ITR) Filing | Financial Sage",
    metaDescription: "Individual and business income tax return filing, with deduction planning, starting from ₹299.",
    summary: "Income tax return filing for individuals, freelancers, and businesses, with applicable deductions and advance tax planning.",
    startingPrice: 299,
    bullets: ["Income & deduction review", "ITR form selection & filing", "Advance tax estimation", "Notice/refund follow-up"],
  },
  {
    slug: "itr-1-filing",
    category: "tax-filing",
    title: "ITR-1 (Sahaj) Filing",
    metaTitle: "ITR-1 Sahaj Filing for Salaried Individuals | Financial Sage",
    metaDescription: "File ITR-1 for salary, one house property, and other income up to ₹50 lakh. Reviewed by a preparer, from ₹299.",
    summary: "ITR-1 filing for salaried individuals with income up to ₹50 lakh from salary, one house property, and other sources.",
    startingPrice: 299,
    bullets: ["Form 16 and AIS reconciliation", "Deduction review under the chosen regime", "Return preparation and e-filing", "E-verification support", "Refund tracking"],
  },
  {
    slug: "itr-2-filing",
    category: "tax-filing",
    title: "ITR-2 Filing",
    metaTitle: "ITR-2 Filing for Capital Gains & Multiple Properties | Financial Sage",
    metaDescription: "File ITR-2 if you have capital gains, more than one house property, or foreign income. From ₹299.",
    summary: "ITR-2 filing for individuals and HUFs with capital gains, multiple house properties, foreign assets, or income above the ITR-1 threshold.",
    startingPrice: 299,
    bullets: ["Capital gains computation", "House property income schedules", "Foreign asset and income reporting", "Return preparation and e-filing", "Refund tracking"],
  },
  {
    slug: "itr-3-filing",
    category: "tax-filing",
    title: "ITR-3 Filing",
    metaTitle: "ITR-3 Filing for Business & Professional Income | Financial Sage",
    metaDescription: "File ITR-3 for proprietors and professionals with business income, including books of account and audit checks. From ₹299.",
    summary: "ITR-3 filing for proprietors and professionals carrying on a business, including the profit and loss and balance sheet schedules.",
    startingPrice: 299,
    bullets: ["Profit & loss and balance sheet schedules", "Business income computation", "Audit applicability check", "Return preparation and e-filing", "Refund tracking"],
  },
  {
    slug: "itr-4-filing",
    category: "tax-filing",
    title: "ITR-4 (Sugam) Filing",
    metaTitle: "ITR-4 Sugam Filing for Presumptive Taxation | Financial Sage",
    metaDescription: "File ITR-4 under presumptive taxation (Section 44AD/44ADA) for small businesses and professionals. From ₹299.",
    summary: "ITR-4 filing under the presumptive taxation scheme, the simplest route for small businesses and professionals below the turnover limits of Section 44AD and 44ADA.",
    startingPrice: 299,
    bullets: ["Presumptive eligibility check", "44AD / 44ADA computation", "Turnover and receipt reconciliation", "Return preparation and e-filing", "Refund tracking"],
  },
  {
    slug: "itr-7-filing",
    category: "tax-filing",
    title: "ITR-7 Filing",
    metaTitle: "ITR-7 Filing for Trusts, NGOs & Societies | Financial Sage",
    metaDescription: "File ITR-7 for trusts, NGOs, political parties, and institutions claiming exemption. From ₹999.",
    summary: "ITR-7 filing for trusts, societies, Section 8 companies, and other entities claiming exemption under Sections 11 to 13.",
    startingPrice: 999,
    bullets: ["Exemption schedule preparation", "Corpus and application of income working", "Audit report (Form 10B) coordination", "Return preparation and e-filing", "Registration compliance check"],
  },
  {
    slug: "tds-return-filing",
    category: "tax-filing",
    title: "TDS Return Filing",
    metaTitle: "TDS Return Filing (24Q, 26Q, 27Q) | Financial Sage",
    metaDescription: "Quarterly TDS return filing with challan reconciliation and Form 16/16A generation. From ₹299.",
    summary: "Quarterly TDS return filing across Forms 24Q, 26Q, and 27Q, with challan reconciliation and certificate generation.",
    startingPrice: 299,
    bullets: ["Deduction and challan reconciliation", "24Q / 26Q / 27Q preparation", "Return upload and correction statements", "Form 16 and 16A generation", "Default and late fee resolution"],
  },
  {
    slug: "pf-return-filing",
    category: "tax-filing",
    title: "PF & ESI Return Filing",
    metaTitle: "PF and ESI Return Filing for Employers | Financial Sage",
    metaDescription: "Monthly PF (ECR) and ESI return filing, with challan generation and employee onboarding. From ₹299.",
    summary: "Monthly provident fund and ESI return filing for employers, including ECR upload, challan generation, and new-employee onboarding.",
    startingPrice: 299,
    bullets: ["Monthly ECR preparation and upload", "Challan generation and payment support", "New employee UAN and ESI onboarding", "Exit and settlement filings", "Inspection and notice support"],
  },
  {
    slug: "income-tax-notice-response",
    category: "tax-filing",
    title: "Income Tax Notice Response",
    metaTitle: "Income Tax Notice Reply & Representation | Financial Sage",
    metaDescription: "Received a 143(1), 139(9), or 148 notice? We read it, draft the response, and file it on the portal. From ₹999.",
    summary: "Reading, drafting, and filing responses to income tax notices, from a simple 143(1) intimation mismatch through to a scrutiny or reassessment notice.",
    startingPrice: 999,
    bullets: ["Notice interpretation and deadline mapping", "Document and evidence compilation", "Response drafting", "E-proceedings portal submission", "Follow-up until closure"],
  },
  {
    slug: "advance-tax-planning",
    category: "tax-filing",
    title: "Advance Tax Planning",
    metaTitle: "Advance Tax Calculation & Payment Planning | Financial Sage",
    metaDescription: "Estimate and schedule your quarterly advance tax so you avoid 234B and 234C interest. From ₹299.",
    summary: "Quarterly advance tax estimation and payment scheduling, so you avoid the interest that Sections 234B and 234C add for shortfalls and late instalments.",
    startingPrice: 299,
    bullets: ["Income projection for the year", "Instalment-wise liability computation", "Challan 280 payment support", "234B / 234C interest check", "Year-end true-up"],
  },

  // ---------------------------------------------------------------------
  // ROC & Annual Compliance
  // ---------------------------------------------------------------------
  {
    slug: "roc-annual-filing",
    category: "roc-compliance",
    title: "ROC Annual Filing",
    metaTitle: "ROC Annual Filing for Companies & LLPs | Financial Sage",
    metaDescription: "Annual ROC compliance for Private Limited companies and LLPs. AOC-4, MGT-7, and LLP Form 11/8 from ₹999.",
    summary: "Mandatory annual compliance filings with the Registrar of Companies for Private Limited companies and LLPs.",
    startingPrice: 999,
    bullets: ["AOC-4 (financial statements)", "MGT-7 (annual return)", "LLP Form 11 & Form 8", "Director KYC (DIR-3 KYC)"],
  },
  {
    slug: "private-limited-annual-compliance",
    category: "roc-compliance",
    title: "Private Limited Annual Compliance",
    metaTitle: "Annual Compliance Package for Private Limited Companies | Financial Sage",
    metaDescription: "A full-year compliance package for a Private Limited company: board meetings, statutory registers, AOC-4, MGT-7, and DIR-3 KYC. From ₹999.",
    summary: "A single package covering everything a Private Limited company must do in a financial year, from board meeting minutes through to the annual ROC filings.",
    startingPrice: 999,
    bullets: ["Board and AGM minutes drafting", "Statutory register maintenance", "AOC-4 and MGT-7 filing", "DIR-3 KYC for every director", "Auditor appointment (ADT-1)"],
  },
  {
    slug: "llp-annual-compliance",
    category: "roc-compliance",
    title: "LLP Annual Compliance",
    metaTitle: "LLP Annual Compliance: Form 11 & Form 8 | Financial Sage",
    metaDescription: "Annual LLP compliance including Form 11, Form 8, and the income tax return. Filed before the deadline, from ₹999.",
    summary: "Annual compliance for an LLP, covering Form 11, Form 8, and the LLP income tax return, filed well before the deadlines that carry ₹100-a-day penalties.",
    startingPrice: 999,
    bullets: ["Form 11 (annual return)", "Form 8 (statement of accounts & solvency)", "LLP income tax return", "DIR-3 KYC for designated partners", "Penalty exposure review"],
  },
  {
    slug: "dir-3-kyc",
    category: "roc-compliance",
    title: "DIR-3 KYC Filing",
    metaTitle: "DIR-3 KYC Filing for Directors | Financial Sage",
    metaDescription: "File DIR-3 KYC before 30 September and keep your DIN active. Reactivate a deactivated DIN too. From ₹999.",
    summary: "Annual DIR-3 KYC filing for every director and designated partner, plus reactivation where a DIN has already been deactivated.",
    startingPrice: 999,
    bullets: ["DIR-3 KYC or KYC-WEB filing", "DSC and OTP verification", "Deactivated DIN reactivation", "₹5,000 penalty handling where applicable", "Deadline reminders"],
  },
  {
    slug: "form-inc-20a",
    category: "roc-compliance",
    title: "Form INC-20A Filing",
    metaTitle: "Form INC-20A: Declaration of Commencement of Business | Financial Sage",
    metaDescription: "File INC-20A within 180 days of incorporation so your company can legally start business and borrow. From ₹999.",
    summary: "Declaration of commencement of business in Form INC-20A, due within 180 days of incorporation, without which a company cannot legally begin operations or borrow.",
    startingPrice: 999,
    bullets: ["Subscription money verification", "Bank statement documentation", "INC-20A preparation and filing", "Professional certification", "Late filing penalty assessment"],
  },
  {
    slug: "appointment-of-auditor-adt-1",
    category: "roc-compliance",
    title: "Auditor Appointment (ADT-1)",
    metaTitle: "Auditor Appointment Filing (Form ADT-1) | Financial Sage",
    metaDescription: "File ADT-1 within 15 days of appointing your statutory auditor. First appointment, reappointment, or casual vacancy. From ₹999.",
    summary: "Form ADT-1 filing for the appointment or reappointment of a statutory auditor, including appointments made to fill a casual vacancy.",
    startingPrice: 999,
    bullets: ["Board resolution drafting", "Auditor consent and eligibility certificate", "ADT-1 preparation and filing", "Casual vacancy handling", "Tenure and rotation tracking"],
  },
  {
    slug: "bookkeeping-and-accounting",
    category: "roc-compliance",
    title: "Bookkeeping & Accounting",
    metaTitle: "Outsourced Bookkeeping & Accounting Services | Financial Sage",
    metaDescription: "Monthly bookkeeping, bank reconciliation, and management accounts, kept ready for GST and income tax filing. From ₹999.",
    summary: "Monthly bookkeeping kept in a state where your GST returns, TDS returns, and annual accounts can all be filed from the same set of books.",
    startingPrice: 999,
    bullets: ["Purchase and sales entry", "Bank and card reconciliation", "GST-ready ledger maintenance", "Monthly P&L and balance sheet", "Year-end finalisation for audit"],
  },
  {
    slug: "nidhi-company-compliance",
    category: "roc-compliance",
    title: "Nidhi Company Compliance",
    metaTitle: "Nidhi Company Annual Compliance (NDH-1, NDH-3) | Financial Sage",
    metaDescription: "Annual Nidhi company compliance including NDH-1, NDH-3, and the standard ROC filings. From ₹999.",
    summary: "Annual compliance for a Nidhi company, covering the Nidhi-specific NDH returns alongside the usual ROC and income tax filings.",
    startingPrice: 999,
    bullets: ["NDH-1 (statutory compliance return)", "NDH-3 (half-yearly return)", "AOC-4 and MGT-7 filing", "Member and deposit ratio monitoring", "Income tax return"],
  },
  {
    slug: "ngo-annual-compliance",
    category: "roc-compliance",
    title: "NGO Annual Compliance",
    metaTitle: "Annual Compliance for NGOs, Trusts & Societies | Financial Sage",
    metaDescription: "Keep your NGO's exemptions intact with Form 10B audit, ITR-7, and annual filings. From ₹999.",
    summary: "Annual compliance for trusts, societies, and Section 8 companies, keeping the 12A and 80G exemptions intact and the registrations current.",
    startingPrice: 999,
    bullets: ["Form 10B / 10BB audit report", "ITR-7 filing", "Section 8 ROC filings where applicable", "Darpan and FCRA renewals", "Donation receipt and 80G statement (Form 10BD)"],
  },
  {
    slug: "partnership-firm-tax-return",
    category: "roc-compliance",
    title: "Partnership Firm Tax Return",
    metaTitle: "Partnership Firm Income Tax Return Filing | Financial Sage",
    metaDescription: "File your partnership firm's ITR-5 with partner remuneration and interest computed correctly. From ₹999.",
    summary: "Income tax return filing for a partnership firm, with partner remuneration and interest computed inside the Section 40(b) limits.",
    startingPrice: 999,
    bullets: ["Firm accounts finalisation", "Section 40(b) remuneration working", "ITR-5 preparation and filing", "Audit applicability check", "Partner capital account reconciliation"],
  },

  // ---------------------------------------------------------------------
  // Trademark & Intellectual Property
  // ---------------------------------------------------------------------
  {
    slug: "trademark-registration",
    category: "ipr",
    title: "Trademark Registration",
    metaTitle: "Trademark Registration Online | Financial Sage",
    metaDescription: "Protect your brand name and logo with trademark registration. Class search, application filing, and objection support from ₹999.",
    summary: "Trademark search and application filing to protect your brand name, logo, or tagline nationally.",
    startingPrice: 999,
    bullets: ["Trademark class search", "Application filing (TM-A)", "Objection/opposition support", "Renewal reminders"],
  },
  {
    slug: "trademark-objection-reply",
    category: "ipr",
    title: "Trademark Objection Reply",
    metaTitle: "Reply to a Trademark Examination Report | Financial Sage",
    metaDescription: "Got a trademark objection under Section 9 or 11? We draft and file the reply within the 30-day window. From ₹999.",
    summary: "Drafting and filing a reply to a trademark examination report, within the 30-day window after which the application is treated as abandoned.",
    startingPrice: 999,
    bullets: ["Examination report analysis", "Section 9 / 11 ground-by-ground reply", "Evidence of use compilation", "Reply filing on the IP India portal", "Show cause hearing representation"],
  },
  {
    slug: "trademark-opposition",
    category: "ipr",
    title: "Trademark Opposition",
    metaTitle: "Trademark Opposition & Counter-Statement | Financial Sage",
    metaDescription: "Oppose a conflicting mark, or defend yours with a counter-statement inside the two-month deadline. From ₹999.",
    summary: "Filing an opposition against a conflicting mark, or defending your own application with a counter-statement and evidence.",
    startingPrice: 999,
    bullets: ["Notice of opposition (Form TM-O)", "Counter-statement drafting", "Evidence affidavit preparation", "Hearing representation", "Settlement and coexistence advice"],
  },
  {
    slug: "trademark-renewal",
    category: "ipr",
    title: "Trademark Renewal",
    metaTitle: "Trademark Renewal Before Expiry | Financial Sage",
    metaDescription: "Renew your trademark every ten years, or restore a lapsed mark within the grace period. From ₹999.",
    summary: "Trademark renewal filing before the ten-year expiry, and restoration where a mark has already lapsed but is still inside the grace period.",
    startingPrice: 999,
    bullets: ["Renewal (Form TM-R) filing", "Expiry and grace period tracking", "Restoration of a lapsed mark", "Registration certificate update", "Ten-year renewal reminders"],
  },
  {
    slug: "copyright-registration",
    category: "ipr",
    title: "Copyright Registration",
    metaTitle: "Copyright Registration in India | Financial Sage",
    metaDescription: "Register copyright in software, literary work, artwork, music, or film with the Copyright Office. From ₹999.",
    summary: "Copyright registration for software, literary work, artistic work, music, and film, giving you a dated public record of authorship to rely on in a dispute.",
    startingPrice: 999,
    bullets: ["Work classification", "Form XIV application filing", "NOC and authorship documentation", "Objection and discrepancy response", "Registration certificate"],
  },
  {
    slug: "patent-registration",
    category: "ipr",
    title: "Patent Registration",
    metaTitle: "Patent Filing & Registration in India | Financial Sage",
    metaDescription: "Patent search, provisional or complete specification drafting, and filing with the Indian Patent Office. From ₹999.",
    summary: "Patent filing support from prior-art search and specification drafting through to examination response, with the provisional route available when you need an early priority date.",
    startingPrice: 999,
    bullets: ["Prior-art and patentability search", "Provisional or complete specification drafting", "Form 1 / 2 / 5 filing", "Request for examination", "First examination report response"],
  },
  {
    slug: "design-registration",
    category: "ipr",
    title: "Design Registration",
    metaTitle: "Industrial Design Registration in India | Financial Sage",
    metaDescription: "Protect the shape, pattern, or ornamentation of your product with a registered design. From ₹999.",
    summary: "Industrial design registration protecting the visual appearance of a product, its shape, configuration, pattern, or ornamentation, for up to fifteen years.",
    startingPrice: 999,
    bullets: ["Novelty search", "Class and Locarno classification", "Representation sheet preparation", "Form 1 application filing", "Objection response"],
  },

  // ---------------------------------------------------------------------
  // Business Changes & Closure
  // ---------------------------------------------------------------------
  {
    slug: "change-company-name",
    category: "business-changes",
    title: "Change Company Name",
    metaTitle: "Change a Private Limited Company Name | Financial Sage",
    metaDescription: "Change your company's registered name with RUN, MGT-14, and INC-24, and update every downstream registration. From ₹999.",
    summary: "Changing a company's registered name end to end, from name reservation through to updating the GST, PAN, and bank records that carry the old name.",
    startingPrice: 999,
    bullets: ["Name availability check (RUN)", "Special resolution and MGT-14", "INC-24 approval application", "Fresh incorporation certificate", "Downstream GST, PAN, and bank updates"],
  },
  {
    slug: "change-registered-office",
    category: "business-changes",
    title: "Change Registered Office",
    metaTitle: "Change of Registered Office Address Filing | Financial Sage",
    metaDescription: "Shift your registered office within a city, between cities, or across states. INC-22 and INC-23 filed for you. From ₹999.",
    summary: "Registered office address changes, whether within the same city, to another city in the same state, or across state lines where regional director approval is needed.",
    startingPrice: 999,
    bullets: ["Board or special resolution drafting", "INC-22 filing with premises proof", "INC-23 regional director application for interstate shifts", "MGT-14 where required", "GST and bank address updates"],
  },
  {
    slug: "change-in-director",
    category: "business-changes",
    title: "Add or Change a Director",
    metaTitle: "Director Appointment & Change Filing (DIR-12) | Financial Sage",
    metaDescription: "Appoint a new director or change an existing one, with DIN, DSC, and DIR-12 filed within 30 days. From ₹999.",
    summary: "Appointing a director or changing the particulars of an existing one, including DIN application where the appointee does not already hold one.",
    startingPrice: 999,
    bullets: ["DIN application (DIR-3) if needed", "Digital signature issuance", "Consent (DIR-2) and board resolution", "DIR-12 filing within 30 days", "Statutory register update"],
  },
  {
    slug: "removal-of-director",
    category: "business-changes",
    title: "Removal or Resignation of a Director",
    metaTitle: "Director Removal & Resignation Filing | Financial Sage",
    metaDescription: "Remove a director by shareholder resolution, or file a resignation via DIR-11 and DIR-12. From ₹999.",
    summary: "Removing a director under Section 169 or recording a resignation, with the DIR-11 and DIR-12 filings that make the change effective on the MCA record.",
    startingPrice: 999,
    bullets: ["Special notice and shareholder resolution", "Opportunity-to-be-heard compliance", "DIR-11 (resignation by the director)", "DIR-12 filing by the company", "Register of directors update"],
  },
  {
    slug: "add-designated-partner",
    category: "business-changes",
    title: "Add or Remove a Designated Partner",
    metaTitle: "Add or Remove an LLP Designated Partner | Financial Sage",
    metaDescription: "Admit or retire a designated partner in your LLP with Form 3 and Form 4, plus the supplementary agreement. From ₹999.",
    summary: "Admitting or retiring a designated partner in an LLP, including the supplementary agreement and the Form 3 and Form 4 filings.",
    startingPrice: 999,
    bullets: ["DPIN application if needed", "Supplementary LLP agreement drafting", "Form 4 (partner change) filing", "Form 3 (agreement change) filing", "Capital contribution adjustment"],
  },
  {
    slug: "change-in-llp-agreement",
    category: "business-changes",
    title: "Change in LLP Agreement",
    metaTitle: "LLP Agreement Amendment Filing (Form 3) | Financial Sage",
    metaDescription: "Amend your LLP agreement for capital, profit sharing, business activity, or partner rights. Form 3 filed within 30 days. From ₹999.",
    summary: "Amending an LLP agreement for changes in capital contribution, profit-sharing ratio, business activity, or partner rights, filed in Form 3 within 30 days.",
    startingPrice: 999,
    bullets: ["Supplementary deed drafting", "Stamp duty computation by state", "Partner consent documentation", "Form 3 filing within 30 days", "Master data verification"],
  },
  {
    slug: "increase-authorised-capital",
    category: "business-changes",
    title: "Increase Authorised Capital",
    metaTitle: "Increase Authorised Share Capital (SH-7) | Financial Sage",
    metaDescription: "Raise your company's authorised share capital with an MOA amendment and SH-7 filing. From ₹999.",
    summary: "Increasing authorised share capital so the company can issue more shares, including the MOA amendment and the stamp duty that varies by state.",
    startingPrice: 999,
    bullets: ["Board and shareholder resolutions", "MOA capital clause amendment", "SH-7 filing", "MGT-14 where required", "Stamp duty and ROC fee computation"],
  },
  {
    slug: "transfer-of-shares",
    category: "business-changes",
    title: "Transfer of Shares",
    metaTitle: "Share Transfer in a Private Limited Company | Financial Sage",
    metaDescription: "Transfer shares with SH-4, stamp duty, and board approval, and keep the register of members correct. From ₹999.",
    summary: "Share transfers in a private limited company, covering the SH-4 instrument, stamp duty, board approval, and the register updates that make the transfer valid.",
    startingPrice: 999,
    bullets: ["Share transfer deed (SH-4)", "Stamp duty computation", "Board resolution for approval", "Share certificate endorsement", "Register of members update"],
  },
  {
    slug: "convert-partnership-to-llp",
    category: "business-changes",
    title: "Convert a Partnership into an LLP",
    metaTitle: "Convert a Partnership Firm into an LLP | Financial Sage",
    metaDescription: "Convert your partnership firm into an LLP with Form 17, keeping continuity of assets and licences. From ₹999.",
    summary: "Conversion of a registered partnership firm into an LLP, so the business keeps trading while the partners gain limited liability.",
    startingPrice: 999,
    bullets: ["Partner and creditor consent", "Name reservation for the LLP", "Form 17 conversion application", "LLP agreement drafting", "Post-conversion PAN, GST, and bank updates"],
  },
  {
    slug: "close-private-limited-company",
    category: "business-changes",
    title: "Close a Private Limited Company",
    metaTitle: "Company Strike Off & Closure (Form STK-2) | Financial Sage",
    metaDescription: "Close a dormant company through the fast-track strike off route with Form STK-2, and stop the penalties accruing. From ₹999.",
    summary: "Fast-track strike off of a dormant company under Section 248, which stops annual filing penalties from continuing to accrue against the directors.",
    startingPrice: 999,
    bullets: ["Eligibility and pending filing review", "Board and shareholder resolutions", "Affidavits and indemnity bonds", "STK-2 filing", "Bank account closure documentation"],
  },
  {
    slug: "close-llp",
    category: "business-changes",
    title: "Close an LLP",
    metaTitle: "LLP Strike Off & Closure (Form 24) | Financial Sage",
    metaDescription: "Strike off a dormant LLP with Form 24, after clearing pending Form 8 and Form 11 filings. From ₹999.",
    summary: "Striking off a dormant LLP under Form 24, including the pending Form 8 and Form 11 filings the Registrar will insist on first.",
    startingPrice: 999,
    bullets: ["Pending Form 8 and Form 11 clearance", "Partner consent and affidavits", "Statement of accounts certification", "Form 24 filing", "Bank account closure documentation"],
  },

  // ---------------------------------------------------------------------
  // International Business Setup
  //
  // Facts here are deliberately limited to things that are stable and
  // checkable - entity type, regulator, the foreign-ownership rule. Fees and
  // tax rates move and are quoted per engagement rather than published here.
  // ---------------------------------------------------------------------
  {
    slug: "company-registration-in-dubai",
    category: "international",
    title: "Company Registration in Dubai (Mainland)",
    metaTitle: "Dubai Mainland Company Registration from India | Financial Sage",
    metaDescription: "Set up a UAE mainland company with 100% foreign ownership, trade licence, visa quota and corporate tax registration. FEMA and ODI reporting handled from India.",
    summary: "A UAE mainland company, which can trade freely inside the UAE market and bid for government contracts, now with full foreign ownership in most activities.",
    startingPrice: 999,
    facts: [
      { label: "Entity", value: "Limited Liability Company (LLC)" },
      { label: "Regulator", value: "Department of Economy and Tourism, Dubai" },
      { label: "Foreign ownership", value: "100% permitted in most activities" },
      { label: "Typical timeline", value: "2 to 4 weeks" },
    ],
    bullets: [
      "Activity selection and trade name reservation",
      "Initial approval and MOA drafting",
      "Trade licence issuance",
      "Establishment card and visa quota application",
      "Corporate tax registration and bank account introduction",
    ],
  },
  {
    slug: "dubai-free-zone-company-registration",
    category: "international",
    title: "Dubai Free Zone Company Registration",
    metaTitle: "Dubai Free Zone Company Setup from India | Financial Sage",
    metaDescription: "Register a UAE free zone company for invoicing outside the UAE. Free zone selection, licence, visas and Qualifying Free Zone Person assessment.",
    summary: "A free zone company, suited to businesses invoicing customers outside the UAE, with full foreign ownership and a lighter setup than mainland.",
    startingPrice: 999,
    facts: [
      { label: "Entity", value: "Free Zone Company or Establishment" },
      { label: "Regulator", value: "The relevant free zone authority" },
      { label: "Foreign ownership", value: "100%" },
      { label: "Typical timeline", value: "1 to 3 weeks" },
    ],
    bullets: [
      "Free zone selection against your activity and visa needs",
      "Trade name reservation and licence application",
      "Flexi-desk or office allocation",
      "Visa and Emirates ID processing",
      "Assessment of Qualifying Free Zone Person conditions",
    ],
  },
  {
    slug: "company-registration-in-singapore",
    category: "international",
    title: "Company Registration in Singapore",
    metaTitle: "Singapore Pte Ltd Registration from India | Financial Sage",
    metaDescription: "Incorporate a Singapore private limited company with ACRA. Full foreign ownership, S$1 minimum capital, resident director and corporate secretary arranged.",
    summary: "A Singapore private limited company, the usual choice for selling to enterprise customers across Asia, with full foreign ownership permitted.",
    startingPrice: 999,
    facts: [
      { label: "Entity", value: "Private Company Limited by Shares (Pte Ltd)" },
      { label: "Regulator", value: "ACRA" },
      { label: "Foreign ownership", value: "100%, minimum paid-up capital S$1" },
      { label: "Local requirement", value: "At least one director ordinarily resident in Singapore" },
    ],
    bullets: [
      "Name application and ACRA incorporation",
      "Resident director arrangement through a registered corporate service provider",
      "Company secretary appointment within the statutory window",
      "Registered office address",
      "Corporate bank account introduction",
    ],
  },
  {
    slug: "company-registration-in-usa",
    category: "international",
    title: "Company Registration in the USA",
    metaTitle: "US Company Registration (LLC or C-Corp) from India | Financial Sage",
    metaDescription: "Form a US LLC or Delaware C-Corporation from India. State filing, registered agent, EIN from the IRS, and the FEMA reporting on the Indian side.",
    summary: "A US LLC or Delaware C-Corporation, chosen according to whether you intend to raise US venture capital or simply invoice US customers.",
    startingPrice: 999,
    facts: [
      { label: "Entity", value: "LLC or C-Corporation" },
      { label: "Regulator", value: "Secretary of State of the chosen state" },
      { label: "Foreign ownership", value: "Permitted; no US residency required" },
      { label: "Also needed", value: "EIN from the IRS, and a registered agent" },
    ],
    bullets: [
      "Entity and state selection, with Delaware the default for a C-Corp",
      "Certificate of Formation or Incorporation filed",
      "Registered agent appointment",
      "EIN application with the IRS",
      "Operating agreement or bylaws drafted",
    ],
  },
  {
    slug: "company-registration-in-uk",
    category: "international",
    title: "Company Registration in the UK",
    metaTitle: "UK Company Registration from India | Financial Sage",
    metaDescription: "Register a UK private limited company with Companies House. No minimum capital, no residency requirement, registered office and HMRC registration included.",
    summary: "A UK private company limited by shares, the fastest and cheapest European incorporation, with no minimum capital and no director residency requirement.",
    startingPrice: 999,
    facts: [
      { label: "Entity", value: "Private Company Limited by Shares (Ltd)" },
      { label: "Regulator", value: "Companies House" },
      { label: "Foreign ownership", value: "100%; no residency requirement for directors" },
      { label: "Minimum capital", value: "None" },
    ],
    bullets: [
      "Name check and Companies House incorporation",
      "Registered office address in the UK",
      "Articles of association",
      "Person with significant control (PSC) register",
      "HMRC corporation tax registration",
    ],
  },
  {
    slug: "company-registration-in-canada",
    category: "international",
    title: "Company Registration in Canada",
    metaTitle: "Canada Company Registration from India | Financial Sage",
    metaDescription: "Incorporate federally or provincially in Canada. Province selection around director residency rules, registered agent, and business number registration.",
    summary: "Federal or provincial incorporation in Canada, with the province chosen around director-residency rules that differ across the country.",
    startingPrice: 999,
    facts: [
      { label: "Entity", value: "Corporation, federal or provincial" },
      { label: "Regulator", value: "Corporations Canada, or the province" },
      { label: "Foreign ownership", value: "Permitted" },
      { label: "Watch for", value: "Director residency rules vary by province" },
    ],
    bullets: [
      "Federal versus provincial assessment",
      "NUANS name search and reservation",
      "Articles of incorporation filed",
      "Registered office and agent",
      "Business Number and GST/HST registration",
    ],
  },
  {
    slug: "company-registration-in-australia",
    category: "international",
    title: "Company Registration in Australia",
    metaTitle: "Australia Pty Ltd Registration from India | Financial Sage",
    metaDescription: "Register an Australian proprietary limited company with ASIC, including the resident director requirement, ACN, ABN and GST registration.",
    summary: "An Australian proprietary limited company, which requires at least one director ordinarily resident in Australia.",
    startingPrice: 999,
    facts: [
      { label: "Entity", value: "Proprietary Limited (Pty Ltd)" },
      { label: "Regulator", value: "ASIC" },
      { label: "Foreign ownership", value: "Permitted" },
      { label: "Local requirement", value: "At least one Australian-resident director" },
    ],
    bullets: [
      "Company name availability and ASIC registration",
      "Resident director arrangement",
      "Australian Company Number (ACN)",
      "Australian Business Number (ABN) and GST registration",
      "Director Identification Number applications",
    ],
  },
  {
    slug: "company-registration-in-saudi-arabia",
    category: "international",
    title: "Company Registration in Saudi Arabia",
    metaTitle: "Saudi Arabia Company Registration (MISA Licence) | Financial Sage",
    metaDescription: "Set up in Saudi Arabia with a MISA investment licence, commercial registration, Chamber of Commerce membership and ZATCA registration.",
    summary: "A Saudi limited liability company under a MISA investment licence, with full foreign ownership permitted across most sectors.",
    startingPrice: 999,
    facts: [
      { label: "Entity", value: "Limited Liability Company" },
      { label: "Regulator", value: "Ministry of Investment (MISA)" },
      { label: "Foreign ownership", value: "100% permitted in most sectors" },
      { label: "Also needed", value: "Commercial registration and ZATCA registration" },
    ],
    bullets: [
      "MISA investment licence application",
      "Commercial registration (CR)",
      "Articles of association and notarisation",
      "Chamber of Commerce membership",
      "ZATCA tax and VAT registration",
    ],
  },
  {
    slug: "company-registration-in-qatar",
    category: "international",
    title: "Company Registration in Qatar",
    metaTitle: "Qatar Company Registration from India | Financial Sage",
    metaDescription: "Register a company in Qatar with the Ministry of Commerce and Industry, or in the Qatar Financial Centre. Full foreign ownership permitted in most sectors.",
    summary: "A Qatari limited liability company, or a QFC entity, with full foreign ownership permitted across most sectors.",
    startingPrice: 999,
    facts: [
      { label: "Entity", value: "Limited Liability Company, or QFC entity" },
      { label: "Regulator", value: "Ministry of Commerce and Industry, or the QFC" },
      { label: "Foreign ownership", value: "100% permitted in most sectors" },
      { label: "Typical timeline", value: "3 to 6 weeks" },
    ],
    bullets: [
      "Mainland versus Qatar Financial Centre assessment",
      "Trade name reservation and commercial registration",
      "Articles of association",
      "Trade licence and establishment card",
      "Tax registration",
    ],
  },
  {
    slug: "company-registration-in-oman",
    category: "international",
    title: "Company Registration in Oman",
    metaTitle: "Oman Company Registration from India | Financial Sage",
    metaDescription: "Register an Omani LLC with the Ministry of Commerce, Industry and Investment Promotion. Full foreign ownership permitted in most activities.",
    summary: "An Omani limited liability company, with full foreign ownership permitted in most activities under the Foreign Capital Investment Law.",
    startingPrice: 999,
    facts: [
      { label: "Entity", value: "Limited Liability Company (LLC)" },
      { label: "Regulator", value: "Ministry of Commerce, Industry and Investment Promotion" },
      { label: "Foreign ownership", value: "100% permitted in most activities" },
      { label: "Typical timeline", value: "3 to 5 weeks" },
    ],
    bullets: [
      "Activity selection and name reservation",
      "Commercial registration",
      "Chamber of Commerce membership",
      "Municipality and sector licences",
      "Tax card and VAT registration",
    ],
  },
  {
    slug: "company-registration-in-malaysia",
    category: "international",
    title: "Company Registration in Malaysia",
    metaTitle: "Malaysia Sdn Bhd Registration from India | Financial Sage",
    metaDescription: "Incorporate a Malaysian Sdn Bhd with SSM, including the resident director requirement, company secretary and tax registration.",
    summary: "A Malaysian Sendirian Berhad, the standard private limited structure, with foreign ownership permitted in most sectors.",
    startingPrice: 999,
    facts: [
      { label: "Entity", value: "Sendirian Berhad (Sdn Bhd)" },
      { label: "Regulator", value: "Companies Commission of Malaysia (SSM)" },
      { label: "Foreign ownership", value: "Permitted in most sectors" },
      { label: "Local requirement", value: "At least one resident director" },
    ],
    bullets: [
      "Name search and SSM incorporation",
      "Resident director arrangement",
      "Company secretary appointment",
      "Registered office address",
      "LHDN tax file registration",
    ],
  },
  {
    slug: "company-registration-in-germany",
    category: "international",
    title: "Company Registration in Germany",
    metaTitle: "Germany GmbH Registration from India | Financial Sage",
    metaDescription: "Form a German GmbH, including the €25,000 share capital requirement, notarisation, commercial register entry and trade office registration.",
    summary: "A German GmbH, the standard limited company, which carries a share capital requirement and mandatory notarisation of the formation deed.",
    startingPrice: 999,
    facts: [
      { label: "Entity", value: "GmbH" },
      { label: "Regulator", value: "Handelsregister (commercial register)" },
      { label: "Share capital", value: "€25,000, part payable on registration" },
      { label: "Watch for", value: "Formation deed must be notarised" },
    ],
    bullets: [
      "Entity choice between GmbH and the lower-capital UG",
      "Articles of association and notary appointment",
      "Blocked capital account for the share capital",
      "Commercial register entry",
      "Trade office and tax registration",
    ],
  },

  // ---------------------------------------------------------------------
  // Specialist GST work
  //
  // These are one-off GST jobs that fall outside a monthly filing plan. The
  // core GST pages (/gst-registration, /gst-return-filing, /gst-compliance)
  // remain the primary entry points and every page here links back to them.
  // ---------------------------------------------------------------------
  {
    slug: "gst-registration-cancellation",
    category: "gst-specialist",
    title: "GST Registration Cancellation",
    metaTitle: "Cancel or Surrender a GST Registration | Financial Sage",
    metaDescription: "Cancel a GST registration you no longer need, file the final GSTR-10, and stop late fees accruing. From ₹999.",
    summary: "Voluntary cancellation or surrender of a GSTIN, including the final return in GSTR-10 that has to be filed within three months of the cancellation order.",
    startingPrice: 999,
    bullets: ["Pending return clearance", "REG-16 cancellation application", "Input tax credit reversal working", "Final return (GSTR-10) filing", "Departmental query response"],
  },
  {
    slug: "gst-registration-revocation",
    category: "gst-specialist",
    title: "Revocation of Cancelled GST Registration",
    metaTitle: "Revoke a Cancelled GST Registration (REG-21) | Financial Sage",
    metaDescription: "GSTIN cancelled by the officer? Apply for revocation in REG-21 within the deadline and get your registration back. From ₹999.",
    summary: "Revocation of a GSTIN cancelled by the department, filed in REG-21 after the pending returns and dues that triggered the cancellation are cleared.",
    startingPrice: 999,
    bullets: ["Cancellation order analysis", "Pending return and tax dues clearance", "REG-21 revocation application", "Show cause response where issued", "Restoration confirmation"],
  },
  {
    slug: "additional-place-of-business-gst",
    category: "gst-specialist",
    title: "Add a Place of Business to GST",
    metaTitle: "Add an Additional Place of Business in GST (REG-14) | Financial Sage",
    metaDescription: "Add a warehouse, branch, or godown to your GST registration with a REG-14 amendment. From ₹999.",
    summary: "Adding an additional place of business to an existing GSTIN, which you must do before storing stock or invoicing from a new warehouse or branch.",
    startingPrice: 999,
    bullets: ["Premises document preparation", "REG-14 amendment filing", "Core field approval tracking", "Updated registration certificate", "E-way bill address alignment"],
  },
  {
    slug: "gst-lut-filing",
    category: "gst-specialist",
    title: "GST LUT Filing for Exporters",
    metaTitle: "LUT Filing in GST RFD-11 for Exporters | Financial Sage",
    metaDescription: "File your Letter of Undertaking so you can export without paying IGST. Filed fresh every financial year. From ₹999.",
    summary: "Letter of Undertaking filing in Form RFD-11, which lets an exporter ship without paying IGST upfront. It has to be refiled at the start of every financial year.",
    startingPrice: 999,
    bullets: ["Eligibility verification", "RFD-11 preparation and filing", "Witness and declaration documentation", "Acknowledgement reference number", "Annual refiling reminders"],
  },
  {
    slug: "gst-refund-application",
    category: "gst-specialist",
    title: "GST Refund Application",
    metaTitle: "GST Refund Claim Filing (RFD-01) | Financial Sage",
    metaDescription: "Claim a GST refund on exports, inverted duty structure, or excess cash ledger balance. Filed in RFD-01, from ₹999.",
    summary: "GST refund claims in Form RFD-01, covering export refunds, inverted duty structure accumulation, and excess balance sitting in the electronic cash ledger.",
    startingPrice: 999,
    bullets: ["Refund category and eligibility mapping", "Statement and invoice reconciliation", "RFD-01 filing with annexures", "Deficiency memo (RFD-03) response", "Sanction and disbursal follow-up"],
  },
  {
    slug: "gst-e-invoice-setup",
    category: "gst-specialist",
    title: "GST E-Invoicing Setup",
    metaTitle: "GST E-Invoicing Registration & Setup | Financial Sage",
    metaDescription: "Crossed the e-invoicing turnover threshold? We register you on the IRP and get IRN generation working. From ₹999.",
    summary: "E-invoicing setup for businesses that have crossed the turnover threshold, from IRP registration through to IRN and QR code generation working in your billing system.",
    startingPrice: 999,
    bullets: ["Applicability and turnover assessment", "IRP portal registration", "Billing software integration guidance", "IRN and QR code testing", "Staff walkthrough"],
  },
  {
    slug: "e-way-bill-registration",
    category: "gst-specialist",
    title: "E-Way Bill Registration",
    metaTitle: "E-Way Bill Portal Registration & Setup | Financial Sage",
    metaDescription: "Register on the e-way bill portal, set up sub-users for your transporters, and generate bills correctly. From ₹999.",
    summary: "E-way bill portal registration and setup, including the sub-user accounts your dispatch team and transporters need to generate bills themselves.",
    startingPrice: 999,
    bullets: ["Portal registration and credentials", "Transporter ID enrolment", "Sub-user creation for dispatch staff", "Distance and validity rules briefing", "Cancellation and extension support"],
  },
];

export function getOtherService(slug: string): OtherService | undefined {
  return otherServices.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: ServiceCategoryId): OtherService[] {
  return otherServices.filter((s) => s.category === category);
}

/** Other services in the same category, for the cross-links on a service page. */
export function getRelatedServices(slug: string, limit = 6): OtherService[] {
  const service = getOtherService(slug);
  if (!service) return [];
  return otherServices.filter((s) => s.category === service.category && s.slug !== slug).slice(0, limit);
}
