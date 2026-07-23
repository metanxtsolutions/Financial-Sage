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
    h1: "GST Registration Online, From Anywhere in India",
    metaTitle: "GST Registration Online | Apply in Minutes | Financial Sage",
    metaDescription:
      "Apply for GST registration online with Financial Sage. Share documents on WhatsApp and we file within 24 hours. GST registration starts from ₹999.",
    intro:
      "Online GST registration means no tax-office visit and no queue. Document collection, application filing, and Aadhaar verification all happen digitally. You send your documents over WhatsApp or email, we prepare and file your application within 24 hours, and you can track approval right up to the moment your GSTIN is issued.",
    highlights: [
      {
        title: "100% remote process",
        body: "No physical visit for most applications. Aadhaar OTP e-signature replaces the digital signature certificate for proprietorships and partnerships.",
      },
      {
        title: "Document pickup over WhatsApp",
        body: "Send scanned copies or clear photos on WhatsApp. We handle the formatting, compression, and upload.",
      },
      {
        title: "Real-time ARN tracking",
        body: "We watch your Application Reference Number (ARN) and tell you the moment the department raises a query or approves your GSTIN.",
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
    h1: "GST Registration Fees: Government Cost vs Service Cost",
    metaTitle: "GST Registration Fees & Charges in India | Financial Sage",
    metaDescription:
      "GST registration has no government fee. See exactly what Financial Sage charges. GST registration starts from ₹999, published upfront, with no hidden costs.",
    intro:
      "Most confusion around 'GST registration fees' comes from mixing up two things. The government charges nothing to issue a GSTIN. What you pay a consultant is for preparing an error-free application, formatting documents correctly, and following up with the department. Our fee for that is published and starts at ₹999, with no surprise add-ons at the end.",
    highlights: [
      {
        title: "Government fee: ₹0",
        body: "Standard GST registration on the official portal carries no government fee. Anyone telling you otherwise is padding their invoice.",
      },
      {
        title: "Our service fee: from ₹999",
        body: "Covers consultation, document review, filing, and follow-up until your GSTIN is issued. See the Pricing page for what each tier includes.",
      },
      {
        title: "No hidden charges",
        body: "If the department raises a clarification, we handle the response as part of your original fee, not as a separate charge.",
      },
    ],
    faqIds: ["govt-fee-gst-registration", "how-long-gst-registration-takes", "payment-refund-policy"],
    relatedSlugs: ["gst-registration-online", "gst-registration-process", "gst-registration-documents"],
  },
  {
    slug: "gst-registration-process",
    type: "topic",
    h1: "The GST Registration Process, Step by Step",
    metaTitle: "GST Registration Process in India: Step-by-Step | Financial Sage",
    metaDescription:
      "The complete GST registration process from consultation to GSTIN issuance, and how Financial Sage handles each step within 24 hours of your documents.",
    intro:
      "GST registration moves through clear stages, and knowing what happens at each one helps you avoid delays. Here is exactly how we walk every client through it, from the first message to a GSTIN certificate in hand.",
    highlights: [
      {
        title: "1. Free consultation",
        body: "We confirm you need GST registration, or should opt in, and identify which documents apply to your business type.",
      },
      {
        title: "2. Document collection",
        body: "You share documents over WhatsApp. We review them for completeness and flag anything unclear before filing, which is where most delays get avoided.",
      },
      {
        title: "3. Application filing",
        body: "We complete Form REG-01 on the GST portal with your details and submit it with the reviewed documents.",
      },
      {
        title: "4. ARN and verification",
        body: "You get an Application Reference Number instantly. Aadhaar e-KYC verification happens online in most cases.",
      },
      {
        title: "5. GSTIN issued",
        body: "Once approved, your GSTIN and REG-06 certificate appear on the portal, usually within 3 to 7 working days of filing.",
      },
      {
        title: "6. Post-registration support",
        body: "We help you set up invoicing correctly and flag your first return due date so nothing slips.",
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
      "The full checklist of documents required for GST registration by entity type: proprietorship, partnership, LLP, private limited, and HUF.",
    intro:
      "The documents you need depend on your business type. Here is the full checklist, the same one our team runs through to review your application before filing, so nothing gets missed.",
    highlights: [
      { title: "Sole Proprietorship", body: "PAN and Aadhaar of the proprietor, a photograph, business address proof, and bank account proof." },
      { title: "Partnership / LLP", body: "Partnership deed or LLP agreement, firm PAN, PAN and Aadhaar of all partners, address proof, bank proof, and a DSC for LLPs." },
      { title: "Private / Public Limited Company", body: "Certificate of Incorporation, MOA/AOA, company PAN, director PAN/Aadhaar, board resolution, DSC, address proof, and bank proof." },
      { title: "HUF", body: "PAN of the HUF, PAN and Aadhaar of the Karta, HUF declaration/deed, address proof, and bank proof." },
      { title: "Foreign Company / NRTP", body: "Passport of the authorised signatory, incorporation proof from the home country, and Indian address and bank proof." },
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
      "How to track your GST registration status by ARN, what each status means, and what to do if your application is stuck in clarification.",
    intro:
      "After you submit a GST application, you get an ARN (Application Reference Number) to track its progress on the official GST portal. Clients working with us never have to check this by hand. We track every ARN and tell you the moment something changes.",
    highlights: [
      { title: "Pending for Processing", body: "Your application has been submitted and is waiting for the GST officer to review it." },
      { title: "Pending for Clarification", body: "The officer needs more information or documents. This must be answered by the stated deadline, usually 7 days." },
      { title: "Approved", body: "Your GSTIN has been generated and the REG-06 certificate is ready to download." },
      { title: "Rejected", body: "The application was not approved, usually because a clarification went unanswered. A fresh application is needed." },
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
      "What the GST registration certificate (Form REG-06) contains, how to download it, and why you need it for invoicing and compliance.",
    intro:
      "The GST registration certificate, officially Form REG-06, confirms that your business is registered under GST. It is generated automatically on the GST portal once your application is approved. You will need it to open a current account, apply for loans, and onboard with B2B clients and marketplaces.",
    highlights: [
      { title: "What it contains", body: "Your GSTIN, legal and trade name, business type, principal place of business, and the registration validity date." },
      { title: "How to download it", body: "Log in to the GST portal and download it from the 'View/Download Certificate' section. We send clients a copy directly as soon as it is issued." },
      { title: "Where you'll need it", body: "Opening a current account, business loan applications, marketplace seller onboarding, and vendor empanelment with larger companies." },
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
      "Do freelancers need GST registration? The turnover threshold, why voluntary registration helps, and how Financial Sage handles it for designers, writers, and developers.",
    intro:
      "Freelance designers, writers, developers, and consultants often assume GST doesn't apply to them. Once your annual income from services crosses ₹20 lakh (₹10 lakh in special-category states), registration is mandatory. Many freelancers register earlier by choice, to invoice international or GST-registered clients cleanly and to claim ITC on their laptop, software, and co-working costs.",
    highlights: [
      { title: "Mandatory threshold", body: "₹20 lakh turnover for services (₹10 lakh in special-category states), after which registration is compulsory." },
      { title: "Why register early", body: "Claim ITC on your tools and subscriptions, and satisfy clients who ask for a GSTIN on your invoice before they pay." },
      { title: "Exports of services", body: "Freelancers with overseas clients can often export under LUT without charging GST, while still claiming ITC refunds." },
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
      "GST registration is mandatory to sell on Amazon India, whatever your turnover. The process, TCS deduction, and how we get sellers registered fast.",
    intro:
      "Amazon requires every seller to have a valid GSTIN before listing products, whatever their turnover. Amazon also deducts 1% TCS (Tax Collected at Source) on your sales. That amount shows up as credit in your electronic cash ledger and can go toward your GST liability.",
    highlights: [
      { title: "Mandatory whatever your turnover", body: "Unlike regular businesses, marketplace sellers must register for GST from day one, even for a single listing." },
      { title: "TCS reconciliation", body: "The 1% TCS Amazon deducts has to be reconciled monthly against your GSTR-1 and GSTR-3B, and claimed via GSTR-2X where it applies." },
      { title: "Multi-state warehousing", body: "If Amazon stores your inventory in fulfilment centres across states, you may need GST registration in each of those states." },
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
      "Selling on your own Shopify or D2C website? When GST registration is required, and how to set up compliant invoicing from day one.",
    intro:
      "If you sell directly through your own Shopify store or D2C website rather than a marketplace, GST registration follows the standard turnover thresholds (₹40 lakh for goods) rather than the marketplace rule. Even so, most D2C brands register early, because payment gateways and logistics partners increasingly ask for a GSTIN before onboarding.",
    highlights: [
      { title: "Standard thresholds apply", body: "₹40 lakh turnover for goods (₹20 lakh for services). There's no marketplace-style rule that forces registration from day one on your own website." },
      { title: "Payment gateway & logistics onboarding", body: "Razorpay, Shiprocket, and similar partners often ask for a GSTIN during KYC, even before you reach the threshold." },
      { title: "Inter-state shipping", body: "Shipping across state lines is routine for D2C brands and calls for correct IGST invoicing once you're registered." },
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
      "GST rates and registration rules for restaurants, cafes, and cloud kitchens, covering the 5% vs 18% rate distinction and FSSAI-linked compliance.",
    intro:
      "Restaurants, cafes, and cloud kitchens need GST registration once turnover crosses ₹40 lakh (₹20 lakh for special-category states). Many register earlier by choice to work with food-delivery platforms like Zomato and Swiggy, which usually ask for a GSTIN at onboarding.",
    highlights: [
      { title: "5% vs 18% GST rate", body: "Most standalone restaurants pay 5% GST without ITC. Restaurants inside higher-tariff hotels pay 18% with ITC available." },
      { title: "Food delivery platform GST", body: "Since 2022, aggregators like Swiggy and Zomato collect and deposit GST on restaurant sales made through their platform in certain cases. We help you reconcile it correctly." },
      { title: "Composition scheme option", body: "Small restaurants under ₹1.5 crore turnover can opt for the Composition Scheme, with simpler quarterly filing at a flat rate." },
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
      "Are healthcare services GST-exempt? When doctors, clinics, and diagnostic centres need GST registration for allied taxable services.",
    intro:
      "Healthcare services from doctors, clinics, and hospitals are largely exempt from GST. Registration can still be needed if your practice sells taxable goods, such as a pharmacy counter or diagnostic products, or offers services beyond core healthcare, like cosmetic procedures unrelated to an illness, which are taxable.",
    highlights: [
      { title: "Core healthcare: exempt", body: "Diagnosis, treatment, and care from a clinical establishment or registered medical practitioner are exempt from GST." },
      { title: "Taxable exceptions", body: "Cosmetic and plastic surgery unrelated to a medical condition, and the sale of medicines or products beyond prescribed treatment, attract GST." },
      { title: "Mixed practices", body: "A clinic running a pharmacy or diagnostic lab alongside consultations often needs GST registration for the taxable part of its revenue." },
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
      "Management, IT, HR, and financial consultants: when GST registration becomes mandatory, and how it affects invoicing to corporate clients.",
    intro:
      "Consultants across management, IT, HR, legal, and financial advisory need GST registration once annual turnover crosses ₹20 lakh (₹10 lakh in special-category states). Corporate clients usually want a GSTIN before they release payment against your invoice, since they need it to claim their own input tax credit.",
    highlights: [
      { title: "B2B invoicing", body: "Corporate clients almost always need your GSTIN on the invoice to claim ITC. Unregistered consultants often lose larger contracts for this reason." },
      { title: "Reverse charge awareness", body: "Some services fall under reverse charge, where the recipient pays GST directly, such as supplies from an unregistered vendor to a registered business, or specific notified services." },
      { title: "Multi-client, multi-state work", body: "Consultants serving clients across states should register correctly so they charge IGST where it applies, rather than CGST/SGST." },
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
      "GST, IGST, and LUT requirements for import and export businesses, and how zero-rated supply and refunds work under GST.",
    intro:
      "Import and export businesses handle GST differently from domestic traders. Exports count as 'zero-rated supplies'. You can export under a Letter of Undertaking (LUT) without charging GST and claim a refund of accumulated input tax credit, or pay IGST upfront and claim it back. Imports attract IGST at customs, which is usually available as ITC.",
    highlights: [
      { title: "LUT for exports", body: "Filing a Letter of Undertaking each year lets you export goods and services without paying GST upfront, which helps cash flow considerably." },
      { title: "IGST on imports", body: "Imported goods attract IGST at customs clearance, on top of basic customs duty. That IGST is usually available as ITC." },
      { title: "Refund claims", body: "Exporters can claim GST refunds on accumulated ITC or on IGST paid on exports. We structure the claim to avoid processing delays." },
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
      "When should a startup register for GST? Voluntary registration, investor due-diligence expectations, and setting up compliant billing from day one.",
    intro:
      "Startups often need GST registration sooner than the turnover threshold suggests. Investors and enterprise clients expect a GSTIN during due diligence, and registering early lets you claim ITC on software subscriptions, cloud hosting, and office costs from the start.",
    highlights: [
      { title: "Investor & client due diligence", body: "A clean GST registration and filing history is often checked during funding rounds and enterprise vendor onboarding." },
      { title: "ITC on early-stage spend", body: "Claim input tax credit on SaaS tools, cloud infrastructure, and office setup from your very first invoice." },
      { title: "Choosing the right entity first", body: "GST registration follows your business type. We can align it with your Private Limited, LLP, or Proprietorship registration." },
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
      "Selling online, via a marketplace or your own store? The GST rules that apply, TCS deduction, and multi-state registration to plan for.",
    intro:
      "E-commerce runs from marketplace sellers on Amazon and Flipkart to independent D2C brands on Shopify. The common thread is that GST compliance gets more involved than a typical offline business, thanks to TCS deductions, multi-state fulfilment, and inter-state shipping. We set all of it up correctly from registration onward.",
    highlights: [
      { title: "Marketplace sellers: mandatory GST", body: "Selling through a marketplace requires GST registration whatever your turnover, plus monthly TCS reconciliation." },
      { title: "Own-website sellers: threshold-based", body: "Standard turnover thresholds apply, though many register early for payment gateway and logistics onboarding." },
      { title: "Multi-state fulfilment", body: "Using fulfilment centres or 3PL warehouses across states can call for additional state-wise GST registrations." },
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
      "Documents, DSC requirements, and the process for GST registration of a Private Limited company in India.",
    intro:
      "A Private Limited company needs a digital signature certificate (DSC) from an authorised director for GST registration, along with incorporation documents and a board resolution. Company applications are scrutinised more closely, so formatting the documents correctly the first time avoids repeated clarification notices.",
    highlights: [
      { title: "DSC is mandatory", body: "Unlike proprietorships, companies cannot rely on Aadhaar e-sign alone. A Class 3 DSC of the authorised signatory is required." },
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
      "A step-by-step GST registration guide for LLPs: documents, DSC requirements, and how partner details are verified.",
    intro:
      "LLPs register for GST using the LLP agreement, incorporation certificate, and PAN/Aadhaar of all designated partners. Like companies, LLPs need a digital signature certificate to file. We help pick which partner should be the authorised signatory to keep things moving.",
    highlights: [
      { title: "LLP agreement required", body: "The registered LLP agreement sets out the business structure and partner details the application needs." },
      { title: "DSC for designated partner", body: "At least one designated partner needs a valid DSC to sign the GST application digitally." },
      { title: "PAN of the LLP, not partners", body: "The GSTIN is based on the LLP's own PAN. Individual partner PANs are used only for identity verification." },
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
      "The simplest GST registration path: documents, the Aadhaar e-sign process, and timeline for sole proprietors in India.",
    intro:
      "Sole proprietorship is the simplest business structure to register for GST. There's no DSC requirement, and Aadhaar-based e-signature keeps the whole process digital. Most proprietorship applications we file are approved within a week when the documents are in order.",
    highlights: [
      { title: "No DSC needed", body: "Aadhaar OTP e-signature is enough. There's no need to buy or maintain a digital signature certificate." },
      { title: "Minimal documents", body: "Just PAN, Aadhaar, a photograph, address proof, and bank details. It's the fastest entity type to register." },
      { title: "Trade name flexibility", body: "You can register under a trade name that differs from your personal name, handy for branding the business separately." },
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
      "A traditional partnership firm, registered or unregistered under the Indian Partnership Act, needs the partnership deed, firm PAN, and PAN/Aadhaar of all partners for GST registration. Unlike LLPs, a standard partnership firm doesn't need a DSC. Aadhaar e-sign by an authorised partner is enough.",
    highlights: [
      { title: "Partnership deed", body: "The deed sets out the profit-sharing ratio, partner details, and business activity. It's required whether or not the firm is registered with the Registrar of Firms." },
      { title: "No DSC required", body: "Aadhaar e-sign by any authorised partner works, unlike with LLPs and companies." },
      { title: "Authorised signatory letter", body: "A short letter naming which partner will sign and manage GST filings speeds up processing." },
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
