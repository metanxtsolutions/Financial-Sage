export interface ClusterPage {
  slug: string;
  type: "topic" | "business-type";
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  highlights: { title: string; body: string }[];
  faqIds: string[];
  relatedSlugs: string[];
}

export const clusterPages: ClusterPage[] = [
  // ---------------- Topic pages ----------------
  {
    slug: "gst-registration-online",
    type: "topic",
    h1: "GST Registration Online — Apply From Anywhere in India",
    metaTitle: "GST Registration Online | Apply in Minutes | Financial Sage",
    metaDescription:
      "Apply for GST registration online with Financial Sage. Share documents on WhatsApp, we file within 24 hours. GST registration starts from ₹399.",
    intro:
      "GST registration online means you never have to visit a tax office or stand in a queue. The entire process — document collection, application filing, and Aadhaar-based verification — happens digitally. At Financial Sage, you share your documents over WhatsApp or email, we prepare and file your application within 24 hours, and you track approval status until your GSTIN is issued.",
    highlights: [
      {
        title: "100% remote process",
        body: "No physical visit needed for most applications — Aadhaar OTP e-signature replaces the need for a digital signature certificate for proprietorships and partnerships.",
      },
      {
        title: "Document pickup over WhatsApp",
        body: "Send scanned copies or clear photos of your documents on WhatsApp — we handle formatting, compression, and upload.",
      },
      {
        title: "Real-time ARN tracking",
        body: "We monitor your Application Reference Number (ARN) and notify you the moment the department raises a query or approves your GSTIN.",
      },
    ],
    faqIds: [
      "who-needs-gst-registration",
      "how-long-gst-registration-takes",
      "digital-signature-needed",
      "govt-fee-gst-registration",
    ],
    relatedSlugs: ["gst-registration-process", "gst-registration-documents", "gst-registration-fees"],
  },
  {
    slug: "gst-registration-fees",
    type: "topic",
    h1: "GST Registration Fees — Government Cost vs Service Cost Explained",
    metaTitle: "GST Registration Fees & Charges in India | Financial Sage",
    metaDescription:
      "GST registration has zero government fee. See exactly what Financial Sage charges — GST registration service starts from ₹399, transparently, with no hidden costs.",
    intro:
      "A lot of confusion around 'GST registration fees' comes from mixing up two different things: the government charges nothing to issue a GSTIN, but preparing an error-free application, handling document formatting, and following up with the department takes real expertise — that's the service fee you pay a consultant. We keep ours published and transparent, starting at ₹399, with no surprise add-ons at the end.",
    highlights: [
      {
        title: "Government fee: ₹0",
        body: "GST registration on the official portal has no government fee for standard applications — anyone telling you otherwise is likely padding their invoice.",
      },
      {
        title: "Our service fee: from ₹399",
        body: "Covers consultation, document review, application filing, and follow-up until GSTIN issuance. See our full Pricing page for what's included at each tier.",
      },
      {
        title: "No hidden charges",
        body: "If a clarification notice is raised by the department, we handle the response as part of your original fee — not as a separate billable event.",
      },
    ],
    faqIds: ["govt-fee-gst-registration", "how-long-gst-registration-takes", "payment-refund-policy"],
    relatedSlugs: ["gst-registration-online", "gst-registration-process", "gst-registration-documents"],
  },
  {
    slug: "gst-registration-process",
    type: "topic",
    h1: "GST Registration Process — Step-by-Step Timeline",
    metaTitle: "GST Registration Process in India: Step-by-Step | Financial Sage",
    metaDescription:
      "Understand the complete GST registration process from consultation to GSTIN issuance. See how Financial Sage handles each step within 24 hours of receiving your documents.",
    intro:
      "The GST registration process has clear stages, and knowing what happens at each one helps you avoid delays. Below is exactly how we walk every client through it — from your first message to holding a GSTIN certificate.",
    highlights: [
      {
        title: "1. Free consultation",
        body: "We confirm you need (or should opt for) GST registration, and identify which documents apply to your business constitution.",
      },
      {
        title: "2. Document collection",
        body: "You share documents over WhatsApp; we review them for completeness and flag anything unclear before filing — this is where most delays get avoided.",
      },
      {
        title: "3. Application filing",
        body: "We complete Form REG-01 on the GST portal with your details and submit it along with the reviewed documents.",
      },
      {
        title: "4. ARN generation & verification",
        body: "You receive an Application Reference Number instantly. Aadhaar-based e-KYC verification happens online in most cases.",
      },
      {
        title: "5. GSTIN issued",
        body: "Once approved, your GSTIN and REG-06 certificate are generated on the portal — usually within 3–7 working days of filing.",
      },
      {
        title: "6. Post-registration support",
        body: "We help you set up invoicing correctly and walk you through your first return filing due date so nothing is missed.",
      },
    ],
    faqIds: ["how-long-gst-registration-takes", "arn-meaning", "physical-verification-needed", "gst-certificate-download"],
    relatedSlugs: ["gst-registration-online", "gst-registration-documents", "gst-registration-status"],
  },
  {
    slug: "gst-registration-documents",
    type: "topic",
    h1: "Documents Required for GST Registration",
    metaTitle: "Documents Required for GST Registration | Financial Sage",
    metaDescription:
      "Full checklist of documents required for GST registration by entity type — proprietorship, partnership, LLP, private limited, and HUF.",
    intro:
      "The exact documents needed for GST registration depend on your business constitution. Here's the full checklist by entity type — the same one our team uses to review your application before filing, so nothing gets missed.",
    highlights: [
      { title: "Sole Proprietorship", body: "PAN & Aadhaar of proprietor, photograph, business address proof, bank account proof." },
      { title: "Partnership / LLP", body: "Partnership deed / LLP agreement, PAN of firm, PAN & Aadhaar of all partners, address proof, bank proof, DSC for LLP." },
      { title: "Private / Public Limited Company", body: "Certificate of Incorporation, MOA/AOA, company PAN, director PAN/Aadhaar, board resolution, DSC, address & bank proof." },
      { title: "HUF", body: "PAN of HUF, PAN & Aadhaar of Karta, HUF declaration/deed, address & bank proof." },
      { title: "Foreign Company / NRTP", body: "Passport of authorised signatory, incorporation proof from home country, Indian address & bank proof." },
    ],
    faqIds: ["documents-proprietorship", "documents-partnership", "documents-private-limited", "documents-huf", "digital-signature-needed", "address-proof-options"],
    relatedSlugs: ["gst-registration-process", "gst-registration-online", "gst-registration-for-private-limited"],
  },
  {
    slug: "gst-registration-status",
    type: "topic",
    h1: "Check GST Registration Status (ARN Tracking)",
    metaTitle: "GST Registration Status Check by ARN | Financial Sage",
    metaDescription:
      "Learn how to track your GST registration status using your ARN, what each status means, and what to do if your application is stuck in clarification.",
    intro:
      "Once you submit a GST application, you get an ARN (Application Reference Number) to track its progress on the official GST portal. Clients working with us don't need to check this manually — we track every ARN and notify you the moment something changes.",
    highlights: [
      { title: "Pending for Processing", body: "Your application has been submitted and is awaiting review by the GST officer." },
      { title: "Pending for Clarification", body: "The officer needs additional information or documents — this must be answered within the stated deadline, usually 7 days." },
      { title: "Approved", body: "Your GSTIN has been generated and the REG-06 certificate is available for download." },
      { title: "Rejected", body: "The application was not approved, usually due to unresolved clarification — a fresh application is needed." },
    ],
    faqIds: ["arn-meaning", "gst-registration-rejection", "how-long-gst-registration-takes"],
    relatedSlugs: ["gst-registration-process", "gst-registration-certificate", "gst-registration-online"],
  },
  {
    slug: "gst-registration-certificate",
    type: "topic",
    h1: "GST Registration Certificate (Form REG-06)",
    metaTitle: "GST Registration Certificate: What It Is & How to Download | Financial Sage",
    metaDescription:
      "Understand what the GST registration certificate (Form REG-06) contains, how to download it, and why you need it for invoicing and compliance.",
    intro:
      "The GST registration certificate — officially Form REG-06 — is the document that confirms your business is legally registered under GST. It's generated automatically on the GST portal once your application is approved, and you'll need it for opening a current bank account, applying for loans, and onboarding with B2B clients and marketplaces.",
    highlights: [
      { title: "What it contains", body: "Your GSTIN, legal and trade name, business constitution, principal place of business, and the date of registration validity." },
      { title: "How to download it", body: "Log in to the GST portal with your credentials and download it from the 'View/Download Certificate' section — we send clients a copy directly as soon as it's issued." },
      { title: "Where you'll need it", body: "Current account opening, business loan applications, marketplace seller onboarding, and vendor empanelment with larger companies." },
    ],
    faqIds: ["gst-certificate-download", "arn-meaning"],
    relatedSlugs: ["gst-registration-status", "gst-registration-process"],
  },

  // ---------------- Business-type pages ----------------
  {
    slug: "gst-registration-for-freelancers",
    type: "business-type",
    h1: "GST Registration for Freelancers",
    metaTitle: "GST Registration for Freelancers in India | Financial Sage",
    metaDescription:
      "Do freelancers need GST registration? Learn the turnover threshold, benefits of voluntary registration, and how Financial Sage handles it for designers, writers, and developers.",
    intro:
      "Freelance designers, writers, developers, and consultants often assume GST doesn't apply to them — but once your annual income from services crosses ₹20 lakh (₹10 lakh in special-category states), registration becomes mandatory. Many freelancers also register voluntarily earlier to invoice international or GST-registered clients correctly and claim ITC on their laptop, software, and co-working expenses.",
    highlights: [
      { title: "Mandatory threshold", body: "₹20 lakh turnover for services (₹10 lakh in special-category states) — after which registration is compulsory." },
      { title: "Why register early", body: "Claim ITC on business tools and subscriptions, and satisfy clients who require a GSTIN on your invoice before paying." },
      { title: "Exports of services", body: "Freelancers serving overseas clients can often export services under LUT without charging GST, while still being able to claim ITC refunds." },
    ],
    faqIds: ["gst-for-freelancers", "voluntary-gst-registration", "gst-for-exporters"],
    relatedSlugs: ["gst-registration-for-consultants", "gst-registration-online", "gst-registration-for-ecommerce"],
  },
  {
    slug: "gst-registration-for-amazon-sellers",
    type: "business-type",
    h1: "GST Registration for Amazon Sellers",
    metaTitle: "GST Registration for Amazon Sellers in India | Financial Sage",
    metaDescription:
      "GST registration is mandatory to sell on Amazon India, regardless of turnover. Learn the process, TCS deduction, and how we get sellers registered fast.",
    intro:
      "Amazon requires every seller — regardless of turnover — to have a valid GSTIN before they can list products. Amazon also deducts 1% TCS (Tax Collected at Source) on your sales, which shows up as credit in your electronic cash ledger and can be used to pay your GST liability.",
    highlights: [
      { title: "Mandatory regardless of turnover", body: "Unlike regular businesses, marketplace sellers must register for GST from day one, even for a single product listing." },
      { title: "TCS reconciliation", body: "1% TCS deducted by Amazon must be reconciled monthly against your GSTR-1/3B and claimed via GSTR-2X where applicable." },
      { title: "Multi-state warehousing", body: "If Amazon stores your inventory in fulfillment centres across states, you may need GST registration in each of those states too." },
    ],
    faqIds: ["gst-for-amazon-flipkart-sellers", "multiple-state-registration"],
    relatedSlugs: ["gst-registration-for-shopify-sellers", "gst-registration-for-ecommerce", "gst-registration-online"],
  },
  {
    slug: "gst-registration-for-shopify-sellers",
    type: "business-type",
    h1: "GST Registration for Shopify & D2C Website Sellers",
    metaTitle: "GST Registration for Shopify Sellers in India | Financial Sage",
    metaDescription:
      "Selling on your own Shopify or D2C website? Learn when GST registration is required and how to set up compliant invoicing from day one.",
    intro:
      "If you sell directly through your own Shopify store or D2C website rather than through a marketplace operator, GST registration follows the standard turnover thresholds — ₹40 lakh for goods — rather than the marketplace-mandatory rule. That said, most D2C brands register early since payment gateways and logistics partners increasingly ask for a GSTIN before onboarding.",
    highlights: [
      { title: "Standard thresholds apply", body: "₹40 lakh turnover for goods (₹20 lakh for services) — no marketplace-style mandatory-from-day-one rule for your own website." },
      { title: "Payment gateway & logistics onboarding", body: "Razorpay, Shiprocket, and similar partners commonly require a GSTIN during KYC, even before you hit the threshold." },
      { title: "Inter-state shipping", body: "Selling to customers across state lines is common for D2C brands and requires correct IGST invoicing once registered." },
    ],
    faqIds: ["gst-for-shopify-own-website-sellers", "gst-for-amazon-flipkart-sellers"],
    relatedSlugs: ["gst-registration-for-amazon-sellers", "gst-registration-for-ecommerce", "gst-registration-for-startups"],
  },
  {
    slug: "gst-registration-for-restaurants",
    type: "business-type",
    h1: "GST Registration for Restaurants & Food Businesses",
    metaTitle: "GST Registration for Restaurants in India | Financial Sage",
    metaDescription:
      "GST rates and registration rules for restaurants, cafes, and cloud kitchens — including the 5% vs 18% rate distinction and FSSAI-linked compliance.",
    intro:
      "Restaurants, cafes, and cloud kitchens need GST registration once turnover crosses ₹40 lakh (₹20 lakh for special-category states) — or earlier if you opt for voluntary registration to work with food-delivery platforms like Zomato and Swiggy, which typically require a GSTIN for onboarding.",
    highlights: [
      { title: "5% vs 18% GST rate", body: "Most standalone restaurants pay 5% GST without ITC; restaurants within higher-tariff hotels pay 18% with ITC available." },
      { title: "Food delivery platform GST", body: "Since 2022, food-delivery aggregators like Swiggy and Zomato collect and deposit GST on restaurant sales made through their platform in certain cases — we help you reconcile this correctly." },
      { title: "Composition scheme option", body: "Small restaurants under ₹1.5 crore turnover can opt for the Composition Scheme for simpler quarterly filing at a flat rate." },
    ],
    faqIds: ["gst-for-restaurants", "gst-composition-scheme"],
    relatedSlugs: ["gst-registration-online", "gst-registration-for-startups"],
  },
  {
    slug: "gst-registration-for-doctors",
    type: "business-type",
    h1: "GST Registration for Doctors & Clinics",
    metaTitle: "GST Registration for Doctors and Clinics | Financial Sage",
    metaDescription:
      "Are healthcare services GST-exempt? Learn when doctors, clinics, and diagnostic centres need GST registration for allied taxable services.",
    intro:
      "Healthcare services provided by doctors, clinics, and hospitals are largely exempt from GST. However, registration can still become necessary if your practice also sells taxable goods (like a pharmacy counter or diagnostic products) or offers services beyond core healthcare — such as cosmetic procedures not linked to an illness, which are taxable.",
    highlights: [
      { title: "Core healthcare: exempt", body: "Diagnosis, treatment, and care services provided by a clinical establishment or registered medical practitioner are exempt from GST." },
      { title: "Taxable exceptions", body: "Cosmetic and plastic surgery not related to a medical condition, and sale of medicines/products beyond prescribed treatment, attract GST." },
      { title: "Mixed practices", body: "A clinic running a pharmacy or diagnostic lab alongside consultation services often needs GST registration for the taxable portion of revenue." },
    ],
    faqIds: ["gst-for-consultants-professionals"],
    relatedSlugs: ["gst-registration-for-consultants", "gst-registration-online"],
  },
  {
    slug: "gst-registration-for-consultants",
    type: "business-type",
    h1: "GST Registration for Consultants & Professional Service Providers",
    metaTitle: "GST Registration for Consultants in India | Financial Sage",
    metaDescription:
      "Management, IT, HR, and financial consultants — learn when GST registration becomes mandatory and how it affects invoicing to corporate clients.",
    intro:
      "Consultants across management, IT, HR, legal, and financial advisory need GST registration once annual turnover crosses ₹20 lakh (₹10 lakh in special-category states). Corporate clients typically insist on a GSTIN before releasing payment against your invoice, since they need it to claim their own input tax credit.",
    highlights: [
      { title: "B2B invoicing", body: "Corporate clients almost always need your GSTIN on the invoice to claim ITC — unregistered consultants can lose out on larger contracts for this reason." },
      { title: "Reverse charge awareness", body: "Certain services (like those from an unregistered supplier to a registered business, or specific notified services) fall under reverse charge, where the recipient pays GST directly." },
      { title: "Multi-client, multi-state work", body: "Consultants serving clients across states should register correctly to charge IGST where applicable, rather than CGST/SGST." },
    ],
    faqIds: ["gst-for-consultants-professionals", "who-needs-gst-registration"],
    relatedSlugs: ["gst-registration-for-freelancers", "gst-registration-for-startups"],
  },
  {
    slug: "gst-registration-for-import-export",
    type: "business-type",
    h1: "GST Registration for Import & Export Businesses",
    metaTitle: "GST Registration for Import/Export Businesses | Financial Sage",
    metaDescription:
      "Understand GST, IGST, and LUT requirements for import and export businesses, and how zero-rated supply and refunds work under GST.",
    intro:
      "Import/export businesses deal with GST differently from domestic traders. Exports are treated as 'zero-rated supplies' — you can export under a Letter of Undertaking (LUT) without charging GST and claim a refund of accumulated input tax credit, or pay IGST upfront and claim it back. Imports attract IGST at customs, generally available as ITC.",
    highlights: [
      { title: "LUT for exports", body: "Filing a Letter of Undertaking annually lets you export goods/services without paying GST upfront, improving cash flow significantly." },
      { title: "IGST on imports", body: "Import of goods attracts IGST at the point of customs clearance, in addition to basic customs duty — this IGST is generally available as ITC." },
      { title: "Refund claims", body: "Exporters can claim GST refunds on accumulated ITC or IGST paid on exports — a process we help structure correctly to avoid processing delays." },
    ],
    faqIds: ["gst-for-exporters"],
    relatedSlugs: ["gst-registration-for-startups", "gst-registration-online"],
  },
  {
    slug: "gst-registration-for-startups",
    type: "business-type",
    h1: "GST Registration for Startups",
    metaTitle: "GST Registration for Startups in India | Financial Sage",
    metaDescription:
      "When should a startup register for GST? Learn about voluntary registration, investor due-diligence requirements, and setting up compliant billing from day one.",
    intro:
      "Startups often need GST registration earlier than the turnover threshold suggests — investors and enterprise clients typically expect a GSTIN during due diligence, and voluntary early registration lets you claim ITC on software subscriptions, cloud hosting, and office expenses from the start.",
    highlights: [
      { title: "Investor & client due diligence", body: "A clean GST registration and filing history is often checked during funding rounds and enterprise vendor onboarding." },
      { title: "ITC on early-stage spend", body: "Claim input tax credit on SaaS tools, cloud infrastructure, and office setup costs from your very first invoice." },
      { title: "Choosing the right entity first", body: "GST registration follows your business constitution — we can help align this with your Private Limited, LLP, or Proprietorship registration." },
    ],
    faqIds: ["voluntary-gst-registration", "who-needs-gst-registration"],
    relatedSlugs: ["gst-registration-for-private-limited", "gst-registration-for-ecommerce"],
  },
  {
    slug: "gst-registration-for-ecommerce",
    type: "business-type",
    h1: "GST Registration for E-commerce Sellers",
    metaTitle: "GST Registration for E-commerce Sellers | Financial Sage",
    metaDescription:
      "Selling online — via marketplace or your own store? See the GST rules that apply, TCS deduction, and multi-state registration considerations.",
    intro:
      "E-commerce covers everything from marketplace sellers on Amazon and Flipkart to independent D2C brands on Shopify. The common thread: GST compliance gets more complex than a typical offline business because of TCS deductions, multi-state fulfilment, and inter-state shipping — all of which we help set up correctly from registration onward.",
    highlights: [
      { title: "Marketplace sellers: mandatory GST", body: "Selling via a marketplace operator requires GST registration regardless of turnover, plus monthly TCS reconciliation." },
      { title: "Own-website sellers: threshold-based", body: "Standard turnover thresholds apply, though early registration is common for payment gateway and logistics onboarding." },
      { title: "Multi-state fulfilment", body: "Using fulfilment centres or 3PL warehouses across states may require additional state-wise GST registrations." },
    ],
    faqIds: ["gst-for-amazon-flipkart-sellers", "gst-for-shopify-own-website-sellers", "multiple-state-registration"],
    relatedSlugs: ["gst-registration-for-amazon-sellers", "gst-registration-for-shopify-sellers"],
  },
  {
    slug: "gst-registration-for-private-limited",
    type: "business-type",
    h1: "GST Registration for Private Limited Companies",
    metaTitle: "GST Registration for Private Limited Company | Financial Sage",
    metaDescription:
      "Documents, DSC requirements, and process for GST registration of a Private Limited company in India.",
    intro:
      "A Private Limited company needs a digital signature certificate (DSC) of an authorised director for GST registration, along with incorporation documents and a board resolution. Since company structures are scrutinised more closely, having documents formatted correctly the first time avoids repeated clarification notices.",
    highlights: [
      { title: "DSC is mandatory", body: "Unlike proprietorships, companies cannot use Aadhaar e-sign alone — a Class 3 DSC of the authorised signatory is required." },
      { title: "Board resolution", body: "A resolution authorising a specific director or officer to sign and file the GST application is a standard requirement." },
      { title: "Registered office proof", body: "Address proof must match the registered office recorded with the Ministry of Corporate Affairs (MCA)." },
    ],
    faqIds: ["documents-private-limited", "digital-signature-needed"],
    relatedSlugs: ["gst-registration-documents", "gst-registration-for-startups"],
  },
  {
    slug: "gst-registration-for-llp",
    type: "business-type",
    h1: "GST Registration for LLPs (Limited Liability Partnerships)",
    metaTitle: "GST Registration for LLP in India | Financial Sage",
    metaDescription:
      "Step-by-step GST registration guide for LLPs — documents, DSC requirements, and how partner details are verified.",
    intro:
      "LLPs need GST registration using the LLP agreement, incorporation certificate, and PAN/Aadhaar of all designated partners. Like companies, LLPs require a digital signature certificate for filing — we help identify which partner should be the authorised signatory to keep the process quick.",
    highlights: [
      { title: "LLP agreement required", body: "The registered LLP agreement establishes the business structure and partner details needed for the application." },
      { title: "DSC for designated partner", body: "At least one designated partner needs a valid DSC to sign the GST application digitally." },
      { title: "PAN of the LLP, not partners", body: "The GSTIN is based on the LLP's own PAN — individual partner PANs are used only for identity verification." },
    ],
    faqIds: ["documents-partnership", "digital-signature-needed"],
    relatedSlugs: ["gst-registration-for-partnership", "gst-registration-for-private-limited"],
  },
  {
    slug: "gst-registration-for-proprietorship",
    type: "business-type",
    h1: "GST Registration for Sole Proprietorship",
    metaTitle: "GST Registration for Sole Proprietorship | Financial Sage",
    metaDescription:
      "The simplest GST registration path — documents, Aadhaar e-sign process, and timeline for sole proprietors in India.",
    intro:
      "Sole proprietorship is the simplest business structure to register for GST — there's no DSC requirement, and Aadhaar-based e-signature makes the entire process fully digital. Most proprietorship applications we file are approved within a week when documents are in order.",
    highlights: [
      { title: "No DSC needed", body: "Aadhaar OTP e-signature is sufficient — no need to purchase or maintain a digital signature certificate." },
      { title: "Minimal documents", body: "Just PAN, Aadhaar, a photograph, address proof, and bank details — the fastest entity type to register." },
      { title: "Trade name flexibility", body: "You can register under a trade name different from your personal name, useful for branding your business separately." },
    ],
    faqIds: ["documents-proprietorship", "gst-for-home-business"],
    relatedSlugs: ["gst-registration-online", "gst-registration-for-freelancers"],
  },
  {
    slug: "gst-registration-for-partnership",
    type: "business-type",
    h1: "GST Registration for Partnership Firms",
    metaTitle: "GST Registration for Partnership Firm | Financial Sage",
    metaDescription:
      "Documents and process for GST registration of a traditional (non-LLP) partnership firm in India.",
    intro:
      "A traditional partnership firm (registered or unregistered under the Indian Partnership Act) needs the partnership deed, PAN of the firm, and PAN/Aadhaar of all partners for GST registration. Unlike LLPs, a standard partnership firm doesn't require a DSC — Aadhaar e-sign by an authorised partner is sufficient.",
    highlights: [
      { title: "Partnership deed", body: "The deed establishes profit-sharing ratio, partner details, and business activity — required whether the firm is registered with the Registrar of Firms or not." },
      { title: "No DSC required", body: "Aadhaar e-sign by any authorised partner works, unlike LLPs and companies." },
      { title: "Authorised signatory letter", body: "A simple letter of authorisation naming which partner will sign and manage GST filings speeds up processing." },
    ],
    faqIds: ["documents-partnership"],
    relatedSlugs: ["gst-registration-for-llp", "gst-registration-for-proprietorship"],
  },
];

export function getClusterBySlug(slug: string): ClusterPage | undefined {
  return clusterPages.find((c) => c.slug === slug);
}

export function getClusterSlugs(): string[] {
  return clusterPages.map((c) => c.slug);
}
