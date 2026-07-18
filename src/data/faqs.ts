export interface Faq {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
}

export type FaqCategory =
  | "gst-basics"
  | "registration"
  | "documents"
  | "fees-timeline"
  | "return-filing"
  | "compliance-penalties"
  | "itc"
  | "ecommerce-freelancers"
  | "tools"
  | "financial-sage";

export const faqCategoryLabels: Record<FaqCategory, string> = {
  "gst-basics": "GST Basics",
  registration: "GST Registration",
  documents: "Documents & Eligibility",
  "fees-timeline": "Fees & Timeline",
  "return-filing": "GST Return Filing",
  "compliance-penalties": "Compliance & Penalties",
  itc: "Input Tax Credit (ITC)",
  "ecommerce-freelancers": "GST for E-commerce & Freelancers",
  tools: "GST Tools",
  "financial-sage": "About Financial Sage",
};

export const faqs: Faq[] = [
  // ---------- GST Basics ----------
  {
    id: "what-is-gst",
    category: "gst-basics",
    question: "What is GST?",
    answer:
      "GST (Goods and Services Tax) is a single, destination-based indirect tax levied on the supply of goods and services in India. It replaced multiple central and state taxes like VAT, service tax, and excise duty with one unified tax structure.",
  },
  {
    id: "what-is-gstin",
    category: "gst-basics",
    question: "What is GSTIN?",
    answer:
      "GSTIN (Goods and Services Tax Identification Number) is a unique 15-digit alphanumeric code assigned to every business registered under GST. It is state-specific and PAN-based — the first 2 digits represent the state code, the next 10 are your PAN, followed by entity and checksum digits.",
  },
  {
    id: "gst-vs-old-tax",
    category: "gst-basics",
    question: "How is GST different from the earlier tax system?",
    answer:
      "Before GST, businesses dealt with separate VAT, service tax, excise duty, and entry tax regimes, each with its own registration and filing process. GST consolidates these into one tax with one registration, one return-filing system, and input tax credit that flows across the supply chain.",
  },
  {
    id: "types-of-gst",
    category: "gst-basics",
    question: "What are CGST, SGST, IGST, and UTGST?",
    answer:
      "CGST (Central GST) and SGST (State GST) apply on intra-state sales — the tax is split equally between the central and state governments. IGST (Integrated GST) applies on inter-state sales and imports, collected by the centre and apportioned to the destination state. UTGST applies instead of SGST for supplies within a Union Territory without its own legislature.",
  },
  {
    id: "who-collects-gst",
    category: "gst-basics",
    question: "Who is responsible for collecting and paying GST?",
    answer:
      "The registered supplier collects GST from the customer at the time of sale and deposits it with the government after adjusting eligible input tax credit. Under the reverse charge mechanism, in specific cases the recipient of goods/services pays GST directly instead of the supplier.",
  },
  {
    id: "gst-composition-scheme",
    category: "gst-basics",
    question: "What is the GST Composition Scheme?",
    answer:
      "The Composition Scheme lets small taxpayers (turnover up to ₹1.5 crore for goods, ₹50 lakh for services in most states) pay GST at a lower flat rate on turnover instead of the standard rate, and file quarterly returns instead of monthly. In exchange, they cannot claim input tax credit or charge GST separately to customers. It suits small retailers, traders, and restaurants with straightforward operations.",
  },
  {
    id: "gst-rate-slabs",
    category: "gst-basics",
    question: "What are the GST rate slabs?",
    answer:
      "GST rates are commonly structured as 0%, 5%, 12%, 18%, and 28%, depending on the good or service (with some items attracting cess on top). Rates are notified by the GST Council and can change — always confirm the current HSN/SAC-wise rate before invoicing. Our GST tools include an HSN/SAC search to help you check applicable rates.",
  },

  // ---------- Registration ----------
  {
    id: "who-needs-gst-registration",
    category: "registration",
    question: "Who needs to register for GST?",
    answer:
      "Any business supplying goods with annual turnover above ₹40 lakh (₹20 lakh in special-category states), or supplying services with turnover above ₹20 lakh (₹10 lakh in special-category states), must register for GST. Registration is also mandatory regardless of turnover for inter-state suppliers, e-commerce sellers, casual taxable persons, and those liable under reverse charge.",
  },
  {
    id: "voluntary-gst-registration",
    category: "registration",
    question: "Can I register for GST voluntarily even if I'm below the threshold?",
    answer:
      "Yes. Voluntary registration is allowed even if your turnover is below the threshold. Many freelancers and small businesses register voluntarily to claim input tax credit, work with GST-registered clients, or sell on marketplaces that require a GSTIN.",
  },
  {
    id: "gst-registration-threshold-states",
    category: "registration",
    question: "What are the exact turnover thresholds for GST registration?",
    answer:
      "For goods: ₹40 lakh in most states, ₹20 lakh in special-category states (like most North-Eastern and hill states). For services: ₹20 lakh in most states, ₹10 lakh in special-category states. If you supply both goods and services, the goods threshold generally applies once services stay within limits — we'll check your specific case during the free consultation.",
  },
  {
    id: "multiple-state-registration",
    category: "registration",
    question: "Do I need separate GST registration for each state I operate in?",
    answer:
      "Yes. GST registration is state-specific. If your business has a place of operation, warehouse, or branch in more than one state, you need a separate GSTIN for each state, even under the same PAN.",
  },
  {
    id: "gst-for-home-business",
    category: "registration",
    question: "Can I register for GST using my home address?",
    answer:
      "Yes, a residential address can be used as the principal place of business for GST registration, provided you can furnish an address proof such as an electricity bill, property tax receipt, or a rent agreement with a no-objection certificate (NOC) from the owner.",
  },
  {
    id: "gst-registration-rejection",
    category: "registration",
    question: "What happens if my GST application gets rejected?",
    answer:
      "The GST officer typically raises a clarification query if documents are incomplete or inconsistent, and you get a chance to respond within the stipulated time. If the application is rejected outright, you can file a fresh application. We review your documents before filing precisely to avoid this back-and-forth.",
  },
  {
    id: "cancel-gst-registration",
    category: "registration",
    question: "Can I cancel my GST registration later if I close my business?",
    answer:
      "Yes. You can apply for cancellation of GST registration if your business closes, turnover falls below the threshold, or ownership changes. All pending returns must be filed and dues cleared before cancellation is approved, and a final return (GSTR-10) is required after cancellation.",
  },
  {
    id: "gst-registration-multiple-businesses",
    category: "registration",
    question: "Can I have multiple GST registrations for different businesses under the same PAN?",
    answer:
      "Yes. If you run multiple business verticals in the same state, you can opt for separate GST registrations for each vertical under the same PAN, or register them together under a single GSTIN — whichever suits your accounting and billing needs.",
  },

  // ---------- Documents & Eligibility ----------
  {
    id: "documents-proprietorship",
    category: "documents",
    question: "What documents are needed for GST registration as a sole proprietor?",
    answer:
      "PAN and Aadhaar of the proprietor, a passport-size photograph, address proof of the business place (electricity bill/rent agreement + NOC), and bank account details (cancelled cheque or bank statement showing the account holder's name, account number, and IFSC).",
  },
  {
    id: "documents-partnership",
    category: "documents",
    question: "What documents are needed for GST registration for a partnership or LLP?",
    answer:
      "Partnership deed or LLP agreement, PAN of the firm/LLP, PAN and Aadhaar of all partners, proof of the principal place of business, bank account proof, and the LLP incorporation certificate (for LLPs). At least one partner needs a digital signature for LLP applications.",
  },
  {
    id: "documents-private-limited",
    category: "documents",
    question: "What documents are needed for GST registration for a private or public limited company?",
    answer:
      "Certificate of Incorporation, company PAN, MOA and AOA, PAN and Aadhaar of all directors, board resolution authorising a signatory, digital signature certificate (DSC) of the authorised signatory, proof of registered office, and bank account proof.",
  },
  {
    id: "documents-huf",
    category: "documents",
    question: "What documents are needed for GST registration for a HUF (Hindu Undivided Family)?",
    answer:
      "PAN of the HUF, PAN and Aadhaar of the Karta (head of the family), a declaration/deed identifying the Karta, address proof of the business premises, and bank account proof of the HUF.",
  },
  {
    id: "documents-foreign-company",
    category: "documents",
    question: "What documents are needed for GST registration for a foreign company or non-resident taxable person?",
    answer:
      "Passport of the authorised signatory (in place of PAN, for non-residents), proof of business establishment in India (or a tax identification/registration number from the home country), a self-attested copy of the certificate of incorporation issued in another country, address proof, and bank account details of an Indian bank.",
  },
  {
    id: "digital-signature-needed",
    category: "documents",
    question: "Do I need a digital signature (DSC) for GST registration?",
    answer:
      "A DSC is mandatory for companies and LLPs. Proprietorships and partnerships can complete GST registration using Aadhaar-based e-signature (OTP) instead, which is simpler and doesn't require purchasing a DSC.",
  },
  {
    id: "address-proof-options",
    category: "documents",
    question: "What counts as valid address proof for GST registration?",
    answer:
      "Any one of: latest electricity/water bill, property tax receipt, municipal khata copy, or a registered sale deed for owned premises. For rented premises, a rent/lease agreement along with the owner's NOC and one utility bill in the owner's name is required. For shared or co-working spaces, a consent letter along with the owner's ID and utility bill usually works.",
  },
  {
    id: "photo-signature-requirements",
    category: "documents",
    question: "Are there specific photo or format requirements for uploading documents?",
    answer:
      "Yes — photographs must be in JPEG format (up to 100 KB), and most documents (PDF/JPEG) must be under 1 MB (some under 500 KB for specific categories). We handle formatting and compression of your documents as part of our filing service so you don't have to worry about upload errors.",
  },

  // ---------- Fees & Timeline ----------
  {
    id: "govt-fee-gst-registration",
    category: "fees-timeline",
    question: "Is there a government fee for GST registration?",
    answer:
      "No, GST registration itself is free of cost on the government portal. What you pay us covers document preparation, application filing, error-free submission, and follow-up with the GST department until your GSTIN is issued — our GST Registration plan starts from ₹399.",
  },
  {
    id: "how-long-gst-registration-takes",
    category: "fees-timeline",
    question: "How long does GST registration take?",
    answer:
      "Once you share your documents and complete payment, we prepare and file your application within 24 hours. After filing, the GST department typically issues the GSTIN within 3–7 working days if there are no clarification queries — occasionally it can take longer if the officer requests additional documents.",
  },
  {
    id: "arn-meaning",
    category: "fees-timeline",
    question: "What is an ARN and what do I do with it?",
    answer:
      "ARN (Application Reference Number) is generated immediately after you submit your GST application. It lets you track your application status on the GST portal in real time. We monitor your ARN status for you and update you as soon as there's movement.",
  },
  {
    id: "gst-certificate-download",
    category: "fees-timeline",
    question: "How do I get my GST registration certificate?",
    answer:
      "Once approved, the GST certificate (Form REG-06) is generated automatically on the GST portal and can be downloaded from your GST login. We send you a digital copy directly as soon as it's issued, along with your GSTIN and login credentials guidance.",
  },
  {
    id: "physical-verification-needed",
    category: "fees-timeline",
    question: "Will a GST officer visit my premises for verification?",
    answer:
      "Physical verification is not done for most straightforward applications processed via Aadhaar authentication. It may be triggered if Aadhaar authentication fails, if there are discrepancies in documents, or for specific risk categories — in which case the officer visits the declared business address before approval.",
  },

  // ---------- Return Filing ----------
  {
    id: "gstr1-vs-gstr3b",
    category: "return-filing",
    question: "What is the difference between GSTR-1 and GSTR-3B?",
    answer:
      "GSTR-1 is a monthly/quarterly statement of all outward supplies (sales) — it feeds your buyers' input tax credit. GSTR-3B is a monthly summary return where you declare total sales, purchases, tax liability, and pay the net GST due. Both must be filed even if there's no business activity in a period (as a NIL return).",
  },
  {
    id: "gst-return-due-dates",
    category: "return-filing",
    question: "What are the due dates for GST return filing?",
    answer:
      "For monthly filers: GSTR-1 is due on the 11th of the following month, and GSTR-3B is due on the 20th. Quarterly filers under the QRMP scheme file GSTR-1 by the 13th of the month after the quarter and GSTR-3B by the 22nd or 24th (depending on state), with monthly tax payment via a challan in between. Our GST due-date checker tool keeps these dates handy.",
  },
  {
    id: "qrmp-scheme",
    category: "return-filing",
    question: "What is the QRMP scheme?",
    answer:
      "QRMP (Quarterly Return, Monthly Payment) lets taxpayers with turnover up to ₹5 crore file GSTR-1 and GSTR-3B quarterly while still paying tax monthly through a simple challan. It reduces filing frequency without delaying tax payment to the government.",
  },
  {
    id: "nil-return-filing",
    category: "return-filing",
    question: "Do I need to file a return if I had no sales in a month?",
    answer:
      "Yes. Even with zero business activity, a NIL GSTR-1 and GSTR-3B must be filed for every applicable period. Skipping this still attracts late fees, and can lead to your registration being flagged for cancellation if returns are pending for a prolonged period.",
  },
  {
    id: "gstr9-annual-return",
    category: "return-filing",
    question: "What is GSTR-9 and who needs to file it?",
    answer:
      "GSTR-9 is the annual return that consolidates all monthly/quarterly returns filed during the financial year. It is mandatory for regular taxpayers above a government-notified turnover threshold and optional (but advisable) below it. Our Compliance Pro plan includes GSTR-9 filing.",
  },
  {
    id: "e-way-bill-requirement",
    category: "return-filing",
    question: "When is an e-way bill required?",
    answer:
      "An e-way bill is required for the movement of goods valued above ₹50,000 (single invoice or consolidated) when transported by road, rail, air, or vessel — whether it's a sale, transfer, or return of goods. It must be generated before the goods start moving and carried along with the consignment.",
  },
  {
    id: "revising-filed-return",
    category: "return-filing",
    question: "Can I revise a GST return after filing it?",
    answer:
      "GST returns can't be revised once filed. Instead, corrections for errors or omissions are made in the return of a subsequent period (for example, correcting a GSTR-1 entry from March in the following month's GSTR-1), subject to the annual amendment cut-off date.",
  },

  // ---------- Compliance & Penalties ----------
  {
    id: "penalty-not-registering",
    category: "compliance-penalties",
    question: "What is the penalty for not registering under GST when required?",
    answer:
      "Operating without mandatory GST registration attracts a penalty of 10% of the tax due (minimum ₹10,000), or 100% of the tax due in cases of deliberate evasion. Beyond the monetary penalty, unregistered businesses also lose out on input tax credit and can't legally invoice GST-registered clients.",
  },
  {
    id: "late-fee-gst-return",
    category: "compliance-penalties",
    question: "What is the late fee for filing GST returns late?",
    answer:
      "The standard late fee is ₹50 per day of delay (₹25 CGST + ₹25 SGST) for regular returns, and ₹20 per day (₹10 + ₹10) for NIL returns, subject to a government-notified maximum cap that depends on turnover. Interest at 18% per annum also applies on any tax paid late. Our GST late fee and interest calculators estimate this instantly.",
  },
  {
    id: "gst-notice-response",
    category: "compliance-penalties",
    question: "What should I do if I receive a GST notice?",
    answer:
      "Don't ignore it — GST notices have a fixed response window (commonly 7–15 days depending on the notice type), and non-response can lead to a best-judgment assessment or penalty. Read the notice section carefully, gather the requested documents, and respond through the GST portal. Our Compliance Pro plan includes notice handling and drafting support.",
  },
  {
    id: "gstr3a-notice",
    category: "compliance-penalties",
    question: "What is a GSTR-3A notice?",
    answer:
      "GSTR-3A is a notice issued to taxpayers who have not filed their GST returns by the due date, asking them to file within 15 days. Continued non-filing can lead to a best-judgment tax assessment by the officer based on available information, which is usually higher than your actual liability.",
  },
  {
    id: "gst-registration-cancellation-non-filing",
    category: "compliance-penalties",
    question: "Can my GST registration be cancelled for not filing returns?",
    answer:
      "Yes. If returns remain unfiled for a continuous period specified under GST rules (commonly six months for regular taxpayers, or a set number of consecutive periods for composition taxpayers), the officer can suo-motu cancel your GST registration after issuing a show-cause notice.",
  },
  {
    id: "common-registration-mistakes",
    category: "compliance-penalties",
    question: "What are common mistakes businesses make during GST registration?",
    answer:
      "The most frequent ones we see: mismatched name/address across PAN and address proof, uploading blurry or oversized documents, choosing the wrong business constitution type, missing the authorised signatory's digital signature/e-sign, and selecting incorrect HSN/SAC codes for the principal business activity — each of which can delay approval or trigger a clarification notice.",
  },
  {
    id: "common-filing-mistakes",
    category: "compliance-penalties",
    question: "What are common mistakes businesses make while filing GST returns?",
    answer:
      "Common errors include mismatched sales figures between GSTR-1 and GSTR-3B, claiming ineligible input tax credit, missing reverse-charge liability, forgetting to file NIL returns, and late payment of tax leading to avoidable interest. We reconcile these figures before every filing to catch mismatches early.",
  },

  // ---------- ITC ----------
  {
    id: "what-is-itc",
    category: "itc",
    question: "What is Input Tax Credit (ITC)?",
    answer:
      "Input Tax Credit lets a registered business reduce the GST it owes on sales by the GST it already paid on business purchases (inputs, input services, and capital goods). This prevents the same value from being taxed multiple times as goods move through the supply chain.",
  },
  {
    id: "itc-eligibility-conditions",
    category: "itc",
    question: "What are the conditions to claim ITC?",
    answer:
      "You need a valid tax invoice, the goods/services must actually be received, the supplier must have filed their GSTR-1 and paid the tax to the government, and you must file your own return within the prescribed time. ITC also reflects in your GSTR-2B statement, which should be reconciled with your purchase records.",
  },
  {
    id: "itc-blocked-items",
    category: "itc",
    question: "On what purchases is ITC blocked?",
    answer:
      "ITC is blocked (not claimable) on items like motor vehicles for personal use, food and beverages, employee health/life insurance (unless mandated by law), club memberships, works contract services for construction of immovable property (with exceptions), and goods/services used for personal consumption.",
  },
  {
    id: "itc-mismatch-2a-2b",
    category: "itc",
    question: "What happens if my ITC claim doesn't match GSTR-2B?",
    answer:
      "A mismatch between the ITC you claim in GSTR-3B and what shows up in your auto-generated GSTR-2B can trigger a system-generated notice (like DRC-01C) asking you to explain or reverse the excess credit. This usually happens when your supplier hasn't filed their return or reported the invoice correctly.",
  },
  {
    id: "itc-advisory-service",
    category: "itc",
    question: "Do you help with ITC reconciliation and advisory?",
    answer:
      "Yes — our Compliance Pro plan includes ongoing ITC advisory, where we review your purchase register against GSTR-2B each month, flag mismatches before filing, and advise on credits you may be missing or wrongly claiming.",
  },

  // ---------- GST for E-commerce & Freelancers ----------
  {
    id: "gst-for-freelancers",
    category: "ecommerce-freelancers",
    question: "Do freelancers need GST registration?",
    answer:
      "Freelancers providing services (design, writing, development, consulting, etc.) need GST registration once their annual turnover crosses ₹20 lakh (₹10 lakh in special-category states). Many freelancers also register voluntarily below this threshold to work with GST-registered clients or claim ITC on business expenses like software subscriptions and equipment.",
  },
  {
    id: "gst-for-amazon-flipkart-sellers",
    category: "ecommerce-freelancers",
    question: "Do I need GST registration to sell on Amazon or Flipkart?",
    answer:
      "Yes. GST registration is mandatory for anyone selling goods through an e-commerce marketplace like Amazon, Flipkart, or Meesho, regardless of turnover. Marketplaces also deduct TCS (Tax Collected at Source) at 1% on your sales, which you can claim as credit against your GST liability.",
  },
  {
    id: "gst-for-shopify-own-website-sellers",
    category: "ecommerce-freelancers",
    question: "Do I need GST if I sell through my own Shopify/website store?",
    answer:
      "If you sell directly through your own website (not via a marketplace operator), standard GST registration thresholds apply based on turnover (₹40 lakh for goods, ₹20 lakh for services) rather than the marketplace-specific mandatory rule — but registering early is still advisable if you plan to scale or sell inter-state.",
  },
  {
    id: "gst-for-exporters",
    category: "ecommerce-freelancers",
    question: "How does GST apply to exports and import/export businesses?",
    answer:
      "Exports of goods and services are treated as 'zero-rated' supplies under GST — you can either export under a Letter of Undertaking (LUT) without paying GST and claim a refund of accumulated ITC, or pay IGST on export and claim a refund of the tax paid. Imports attract IGST at the point of customs clearance, which can usually be claimed as ITC.",
  },
  {
    id: "gst-for-restaurants",
    category: "ecommerce-freelancers",
    question: "What GST rate applies to restaurants?",
    answer:
      "Standalone restaurants (not part of a hotel with room tariff above the notified threshold) typically pay GST at 5% without ITC. Restaurants inside high-tariff hotels attract 18% with ITC available. Rates can be revised by the GST Council, so we confirm the applicable rate for your specific setup during onboarding.",
  },
  {
    id: "gst-for-consultants-professionals",
    category: "ecommerce-freelancers",
    question: "Do consultants, doctors, and architects need GST registration?",
    answer:
      "Professional service providers like consultants, architects, and company secretaries need GST registration once turnover crosses ₹20 lakh (₹10 lakh in special-category states). Healthcare services by doctors and clinics are largely exempt from GST, but registration may still be required if the practice sells taxable products (e.g., a pharmacy) or provides other taxable services alongside.",
  },

  // ---------- Tools ----------
  {
    id: "how-gst-calculator-works",
    category: "tools",
    question: "How does the GST calculator work?",
    answer:
      "Enter the base amount and the applicable GST rate — our calculator instantly shows the GST amount, the CGST/SGST (or IGST) split, and the final invoice value. It works both ways: add GST to a base price, or extract the GST already included in a final price.",
  },
  {
    id: "reverse-gst-calculator-use",
    category: "tools",
    question: "When should I use the reverse GST calculator?",
    answer:
      "Use the reverse calculator when you have a GST-inclusive price (e.g., an MRP or invoice total) and need to find the base price and GST amount hidden within it — common for retail pricing, marketplace payouts, and expense reconciliation.",
  },
  {
    id: "hsn-sac-search-tool",
    category: "tools",
    question: "What is the HSN/SAC code search tool for?",
    answer:
      "HSN (Harmonized System of Nomenclature) codes classify goods, and SAC (Services Accounting Code) codes classify services, for GST purposes. Our search tool helps you find the correct code and applicable GST rate for your product or service so your invoices and returns stay accurate.",
  },
  {
    id: "gstin-validator-tool",
    category: "tools",
    question: "How does the GSTIN format validator work?",
    answer:
      "It checks whether a 15-digit GSTIN follows the correct structure — state code, PAN, entity code, and checksum digit — and flags obviously invalid numbers. It's a quick format sanity-check; for full verification of an active, real GSTIN, cross-check on the official GST portal.",
  },
  {
    id: "are-tools-free",
    category: "tools",
    question: "Are Financial Sage's GST tools free to use?",
    answer:
      "Yes, all our GST calculators and lookup tools are completely free, with no login or signup required. We built them to help any Indian business — client or not — handle everyday GST calculations correctly.",
  },

  // ---------- About Financial Sage ----------
  {
    id: "why-choose-financial-sage",
    category: "financial-sage",
    question: "Why should I choose Financial Sage over a larger competitor?",
    answer:
      "We focus exclusively on GST — it's not one of twenty services we offer, it's the only thing we do well. That means transparent, published pricing (not hidden behind a 'get a quote' form), a real response within 40 minutes during business hours, and a dedicated expert who actually knows your filing history, rather than a call-centre queue.",
  },
  {
    id: "how-financial-sage-communicates",
    category: "financial-sage",
    question: "How do I communicate with my GST expert at Financial Sage?",
    answer:
      "We're WhatsApp-first — you can share documents, ask questions, and get filing updates directly on WhatsApp, which is faster than email for most of our clients. Phone and email support are also available.",
  },
  {
    id: "does-financial-sage-serve-pan-india",
    category: "financial-sage",
    question: "Does Financial Sage serve businesses across India?",
    answer:
      "Yes, our GST registration and filing services are fully remote and available Pan-India — you don't need to be in any specific city. Documents and signatures are handled digitally (Aadhaar e-sign or DSC), so location doesn't slow anything down.",
  },
  {
    id: "how-many-clients-financial-sage",
    category: "financial-sage",
    question: "How experienced is Financial Sage with GST?",
    answer:
      "We've completed 150+ GST registrations and currently manage monthly filings for 40–50 active clients, with over 800 business enquiries handled to date. We're a focused, growing GST practice — not the biggest name in the market, but one that answers the phone and knows your file.",
  },
  {
    id: "what-if-i-need-help-after-registration",
    category: "financial-sage",
    question: "Does Financial Sage help after GST registration, or just with the registration itself?",
    answer:
      "Both. Beyond one-time registration, our Business and Compliance Pro plans cover ongoing monthly/quarterly return filing, annual returns, ITC advisory, and notice handling — so you have one point of contact for GST instead of juggling registration and filing separately.",
  },
  {
    id: "can-financial-sage-help-with-other-registrations",
    category: "financial-sage",
    question: "Does Financial Sage also help with company registration, trademark, or ITR filing?",
    answer:
      "Yes, as secondary services alongside our core GST practice — see our Other Services page for company/LLP/OPC registration, MSME/Udyam registration, trademark filing, ITR filing, and ROC annual compliance. GST remains our specialisation, so these are handled with the same document-first, WhatsApp-friendly process.",
  },
  {
    id: "payment-refund-policy",
    category: "financial-sage",
    question: "What is Financial Sage's refund policy if my application isn't approved?",
    answer:
      "Our service fee covers the effort of preparing and filing your application correctly the first time. If a GST officer raises a clarification, we handle the response at no extra cost. Talk to our team about your specific situation — we'll always be upfront about what's recoverable versus what's a government-side delay outside our control.",
  },
];

export function getFaqsByCategory(category: FaqCategory): Faq[] {
  return faqs.filter((faq) => faq.category === category);
}

export function getFaqsByIds(ids: string[]): Faq[] {
  const map = new Map(faqs.map((f) => [f.id, f]));
  return ids.map((id) => map.get(id)).filter((f): f is Faq => Boolean(f));
}
