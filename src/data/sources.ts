// Official sources the site links to, and which page cites which.
//
// WHY THIS EXISTS
// The site stated government fees, turnover thresholds, due dates and tax slabs
// on more than a hundred pages and linked to none of the places those figures
// are published. A reader could not check a claim, and an answer engine
// choosing between two pages that say the same thing prefers the one that
// shows where it came from.
//
// WHAT A SOURCE HERE MEANS
// "This is where the government publishes the rule", not "we checked this page
// against it on a given day". Where a figure has actually been checked, that is
// recorded separately with its date (see `ratesVerified` in tax-rates.ts) and
// shown as its own line.
//
// Every URL below was requested and answered on 28 September 2026. Government
// sites move pages without redirects, so prefer a portal's front door or a
// long-lived section over a deep link, and re-check when adding one.

export interface Source {
  /** What the link is, in the words a reader would use. */
  title: string;
  /** The body that publishes it. */
  publisher: string;
  url: string;
}

const CBIC = "Central Board of Indirect Taxes and Customs (CBIC)";
const GSTN = "Goods and Services Tax Network (GSTN)";
const ITD = "Income Tax Department, Government of India";

export const sources = {
  "gst-portal": { title: "GST Portal", publisher: GSTN, url: "https://www.gst.gov.in/" },
  "gst-search-taxpayer": {
    title: "Search a taxpayer by GSTIN",
    publisher: GSTN,
    url: "https://services.gst.gov.in/services/searchtp",
  },
  "cbic-gst": { title: "GST Acts, rules and notifications", publisher: CBIC, url: "https://cbic-gst.gov.in/" },
  "cbic-gst-rates": {
    title: "GST rates for goods and services",
    publisher: CBIC,
    url: "https://cbic-gst.gov.in/gst-goods-services-rates.html",
  },
  "gst-council": { title: "GST Council", publisher: "GST Council Secretariat", url: "https://gstcouncil.gov.in/" },
  "eway-bill": {
    title: "E-Way Bill System",
    publisher: "Goods and Services Tax, Government of India",
    url: "https://ewaybillgst.gov.in/",
  },
  "e-invoice": {
    title: "e-Invoice System",
    publisher: "Goods and Services Tax, Government of India",
    url: "https://einvoice1.gst.gov.in/",
  },
  "income-tax": { title: "Income Tax e-Filing portal", publisher: ITD, url: "https://www.incometax.gov.in/iec/foportal/" },
  "income-tax-salaried": {
    title: "Salaried individuals: slabs, rebate, surcharge and applicable returns",
    publisher: ITD,
    url: "https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-1",
  },
  traces: {
    title: "TRACES, the TDS reconciliation and correction system",
    publisher: ITD,
    url: "https://www.tdscpc.gov.in/",
  },
  mca: { title: "Ministry of Corporate Affairs", publisher: "Government of India", url: "https://www.mca.gov.in/" },
  "startup-india": {
    title: "Startup India",
    publisher: "Department for Promotion of Industry and Internal Trade (DPIIT)",
    url: "https://www.startupindia.gov.in/",
  },
  rbi: { title: "Reserve Bank of India", publisher: "Reserve Bank of India", url: "https://www.rbi.org.in/" },
  "ip-india": {
    title: "Intellectual Property India",
    publisher: "Office of the Controller General of Patents, Designs and Trade Marks",
    url: "https://ipindia.gov.in/",
  },
  udyam: {
    title: "Udyam Registration",
    publisher: "Ministry of Micro, Small and Medium Enterprises",
    url: "https://udyamregistration.gov.in/",
  },
  fssai: {
    title: "FoSCoS, the food licensing and registration system",
    publisher: "Food Safety and Standards Authority of India (FSSAI)",
    url: "https://foscos.fssai.gov.in/",
  },
  dgft: { title: "Directorate General of Foreign Trade", publisher: "Ministry of Commerce and Industry", url: "https://www.dgft.gov.in/" },
  icegate: { title: "ICEGATE, the customs e-commerce gateway", publisher: CBIC, url: "https://www.icegate.gov.in/" },
  bis: { title: "Bureau of Indian Standards", publisher: "Bureau of Indian Standards", url: "https://www.bis.gov.in/" },
  psara: { title: "PSARA licensing portal", publisher: "Ministry of Home Affairs", url: "https://psara.gov.in/" },
  cdsco: {
    title: "Central Drugs Standard Control Organisation",
    publisher: "Ministry of Health and Family Welfare",
    url: "https://cdsco.gov.in/",
  },
  apeda: {
    title: "APEDA",
    publisher: "Agricultural and Processed Food Products Export Development Authority",
    url: "https://apeda.gov.in/",
  },
  "ngo-darpan": { title: "NGO Darpan", publisher: "NITI Aayog", url: "https://ngodarpan.gov.in/" },
  epfo: {
    title: "Employees' Provident Fund Organisation",
    publisher: "Ministry of Labour and Employment",
    url: "https://www.epfo.gov.in/",
  },
} as const satisfies Record<string, Source>;

export type SourceId = keyof typeof sources;

export function getSources(ids: readonly SourceId[]): (Source & { id: SourceId })[] {
  return ids.map((id) => ({ id, ...sources[id] }));
}

export function isSourceId(value: string): value is SourceId {
  return value in sources;
}

// ---------------------------------------------------------------------------
// Which page cites what
// ---------------------------------------------------------------------------

const GST: SourceId[] = ["gst-portal", "cbic-gst"];

/** Pillars and other hand-written pages, by path. */
export const pageSources: Record<string, SourceId[]> = {
  "/gst-registration": ["gst-portal", "cbic-gst", "gst-council"],
  "/gst-return-filing": ["gst-portal", "cbic-gst", "eway-bill"],
  "/gst-compliance": ["gst-portal", "cbic-gst", "eway-bill"],
  "/faq": ["gst-portal", "cbic-gst", "eway-bill"],
};

/** Every GST registration cluster, city and state page. */
export const gstRegistrationSources: SourceId[] = GST;

/** City and state pages for the two non-GST location services. */
export const locationServiceSources: Record<"company-registration" | "itr-filing", SourceId[]> = {
  "company-registration": ["mca"],
  "itr-filing": ["income-tax"],
};

/** Calculators and lookup tools, by slug. */
export const toolSources: Record<string, SourceId[]> = {
  "gst-calculator": ["cbic-gst-rates"],
  "reverse-gst-calculator": ["cbic-gst-rates"],
  "gst-late-fee-calculator": ["cbic-gst", "gst-portal"],
  "gst-interest-calculator": ["cbic-gst", "gst-portal"],
  "gst-due-date-checker": ["gst-portal", "cbic-gst"],
  "gstin-validator": ["gst-search-taxpayer"],
  "hsn-sac-search": ["cbic-gst-rates"],
  "income-tax-calculator": ["income-tax-salaried", "income-tax"],
  "hra-calculator": ["income-tax"],
};

// Service catalogue: a default per category, overridden per service where a
// more specific regulator exists. An empty list is a decision, not a gap: shop
// and establishment, professional tax and trade licences are issued by states
// and municipalities, and ISO certificates by private bodies, so there is no
// single official page to point at.
const categorySources: Record<string, SourceId[]> = {
  "company-incorporation": ["mca"],
  "roc-compliance": ["mca"],
  "business-changes": ["mca"],
  "tax-filing": ["income-tax"],
  ipr: ["ip-india"],
  "gst-specialist": GST,
  // Setting up abroad is Overseas Direct Investment under FEMA, reported
  // through a bank in India, which is the Indian rule these pages describe.
  international: ["rbi"],
  licences: [],
};

const serviceSourceOverrides: Record<string, SourceId[]> = {
  "startup-india-registration": ["startup-india", "mca"],
  "indian-subsidiary-registration": ["mca", "rbi"],
  "msme-udyam-registration": ["udyam"],
  "fssai-registration": ["fssai"],
  "fssai-state-licence": ["fssai"],
  "fssai-central-licence": ["fssai"],
  "import-export-code": ["dgft"],
  "rcmc-registration": ["dgft"],
  "ad-code-registration": ["icegate"],
  "bis-registration": ["bis"],
  "psara-licence": ["psara"],
  "drug-licence": ["cdsco"],
  "cdsco-registration": ["cdsco"],
  "apeda-registration": ["apeda"],
  "ngo-darpan-registration": ["ngo-darpan"],
  "12a-80g-registration": ["income-tax"],
  "tds-return-filing": ["income-tax", "traces"],
  "pf-return-filing": ["epfo"],
  "partnership-firm-tax-return": ["income-tax"],
  "ngo-annual-compliance": ["income-tax", "mca"],
  "bookkeeping-and-accounting": [],
  "gst-e-invoice-setup": ["e-invoice", "cbic-gst"],
  "e-way-bill-registration": ["eway-bill", "cbic-gst"],
};

export function sourcesForService(slug: string, category: string): SourceId[] {
  return serviceSourceOverrides[slug] ?? categorySources[category] ?? [];
}

export function sourcesForCategory(category: string): SourceId[] {
  return categorySources[category] ?? [];
}
