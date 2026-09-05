// Service registry — the other half of the page budget.
//
// Page count is the product of two scores: this file's `locationTier` per
// service, and the fixed location ladder (T0 pillar -> T1 metros -> T2 states ->
// T3 tier-2 cities -> T4 district HQs -> T5 metro localities). Multiplying them
// deliberately, rather than discovering the total after the fact, is the whole
// point of the exercise.
//
// A service earns a higher tier only if BOTH tests pass: people actually search
// "<service> in <city>", AND the delivery or the rules genuinely differ by
// place. "It would be nice to rank for it" is not one of the tests. Every tier
// here has been argued down wherever the local-intent case was weak — 300 pages
// that rank beat 3,000 that do not.

export type LocationTier = 0 | 1 | 2 | 3;

export interface ServiceEntry {
  id: string;
  routeBase: string;
  label: string;
  /** The label as it reads in running prose — not derivable by lower-casing. */
  labelLower: string;
  pillarHref: string;
  headKeyword: string;
  /**
   * 3 = jurisdiction genuinely differs by state AND strong local intent -> down to metro localities
   * 2 = real local intent, moderate jurisdictional variance            -> down to city
   * 1 = some local intent, delivery identical everywhere               -> state pages only
   * 0 = no local intent (tools, calculators, informational)            -> pillar only, NEVER localise
   */
  locationTier: LocationTier;
  startingPrice: number | null;
  /** The actual jurisdictional reason, or null for tier 0/1. Not a marketing line. */
  whyLocationMatters: string | null;
}

export const serviceRegistry: ServiceEntry[] = [
  {
    id: "gst-registration",
    routeBase: "/gst-registration",
    label: "GST Registration",
    labelLower: "GST registration",
    pillarHref: "/gst-registration",
    headKeyword: "gst registration",
    locationTier: 3,
    startingPrice: 999,
    whyLocationMatters:
      "The GSTIN itself encodes the state — its first two digits are the state code — and the application is processed by that state's jurisdictional officer, division and range. Registration is also per-state, so a business supplying from two states needs two registrations.",
  },
  {
    id: "company-registration",
    routeBase: "/company-registration",
    label: "Company Registration",
    labelLower: "company registration",
    pillarHref: "/other-services/company-registration",
    headKeyword: "company registration",
    locationTier: 3,
    startingPrice: 999,
    whyLocationMatters:
      "Stamp duty on the MOA and on authorised share capital is set by the state, not centrally, so the same company costs a different amount to incorporate in Maharashtra than in Gujarat or Karnataka. The filing also goes to a specific Registrar of Companies office by state.",
  },
  {
    id: "itr-filing",
    routeBase: "/itr-filing",
    label: "ITR Filing",
    labelLower: "ITR filing",
    pillarHref: "/itr-filing",
    headKeyword: "itr filing",
    locationTier: 2,
    startingPrice: 999,
    // Argued down from 3. Income tax is wholly central: the slabs, the forms and
    // the portal are identical in every state. The only genuine local hook is the
    // assessing ward/circle, which most filers never interact with. Local intent
    // is real ("ITR filing near me"), jurisdictional variance is thin. City is
    // the deepest level this justifies; localities would be doorway pages.
    whyLocationMatters:
      "Income tax law is central, so the only genuine local variable is the assessing ward or circle a filer sits under. Local intent is strong but jurisdictional variance is thin — city is the deepest defensible level.",
  },
  {
    id: "shop-and-establishment-registration",
    routeBase: "/other-services/shop-and-establishment-registration",
    label: "Shop and Establishment Registration",
    labelLower: "shop and establishment registration",
    pillarHref: "/other-services/shop-and-establishment-registration",
    headKeyword: "shop and establishment registration",
    locationTier: 2,
    startingPrice: null,
    whyLocationMatters:
      "This is a state act end to end: a different statute, portal, fee and renewal cycle in every state, and in several states the registration is issued by the municipal body rather than the state.",
  },
  {
    id: "professional-tax-registration",
    routeBase: "/other-services/professional-tax-registration",
    label: "Professional Tax Registration",
    labelLower: "professional tax registration",
    pillarHref: "/other-services/professional-tax-registration",
    headKeyword: "professional tax registration",
    locationTier: 2,
    startingPrice: null,
    whyLocationMatters:
      "Professional tax is levied by some states and not others, under a different act with different slabs in each that does. A page for a state that does not levy it is genuinely useful and is content no competitor bothers to write.",
  },
  {
    id: "trademark-registration",
    routeBase: "/other-services/trademark-registration",
    label: "Trademark Registration",
    labelLower: "trademark registration",
    pillarHref: "/other-services/trademark-registration",
    headKeyword: "trademark registration",
    locationTier: 2,
    startingPrice: null,
    whyLocationMatters:
      "Applications are filed at one of five regional Trade Marks Registry offices — Delhi, Mumbai, Kolkata, Chennai and Ahmedabad — determined by the applicant's principal place of business. Real variance, but only five buckets, so state is where it bottoms out in practice.",
  },
  {
    id: "fssai-state-licence",
    routeBase: "/other-services/fssai-state-licence",
    label: "FSSAI State Licence",
    labelLower: "FSSAI state licence",
    pillarHref: "/other-services/fssai-state-licence",
    headKeyword: "fssai state licence",
    locationTier: 2,
    startingPrice: null,
    whyLocationMatters:
      "The state licence is issued by the state's own food safety commissionerate, and whether a business needs the state or the central licence turns on turnover and on where it operates.",
  },
  {
    id: "gst-return-filing",
    routeBase: "/gst-return-filing",
    label: "GST Return Filing",
    labelLower: "GST return filing",
    pillarHref: "/gst-return-filing",
    headKeyword: "gst return filing",
    locationTier: 1,
    startingPrice: 299,
    // Argued down from 2: returns are filed on a central portal to a central
    // schedule. Nothing about GSTR-1 or GSTR-3B differs in Pune versus Patna.
    whyLocationMatters: null,
  },
  {
    id: "gst-compliance",
    routeBase: "/gst-compliance",
    label: "GST Compliance",
    labelLower: "GST compliance",
    pillarHref: "/gst-compliance",
    headKeyword: "gst compliance services",
    locationTier: 1,
    startingPrice: null,
    whyLocationMatters: null,
  },
  {
    id: "msme-udyam-registration",
    routeBase: "/other-services/msme-udyam-registration",
    label: "MSME / Udyam Registration",
    labelLower: "Udyam registration",
    pillarHref: "/other-services/msme-udyam-registration",
    headKeyword: "udyam registration",
    locationTier: 1,
    startingPrice: null,
    // Argued down from 2: Udyam is a single central portal, free, Aadhaar-linked,
    // identical everywhere. Only state MSME incentive schemes differ, and that is
    // a guide, not a location page.
    whyLocationMatters: null,
  },
  {
    id: "import-export-code",
    routeBase: "/other-services/import-export-code",
    label: "Import Export Code",
    labelLower: "IEC registration",
    pillarHref: "/other-services/import-export-code",
    headKeyword: "import export code registration",
    locationTier: 1,
    startingPrice: null,
    whyLocationMatters: null,
  },
  {
    id: "gst-tools",
    routeBase: "/gst-tools",
    label: "GST Tools",
    labelLower: "GST tools",
    pillarHref: "/gst-tools",
    headKeyword: "gst calculator",
    locationTier: 0,
    startingPrice: null,
    // Tier 0 and permanently so. "GST calculator in Pune" is not a query anyone
    // types. These are link magnets and stay national.
    whyLocationMatters: null,
  },
  {
    id: "tax-tools",
    routeBase: "/tax-tools",
    label: "Tax Tools",
    labelLower: "tax tools",
    pillarHref: "/tax-tools",
    headKeyword: "income tax calculator",
    locationTier: 0,
    startingPrice: null,
    whyLocationMatters: null,
  },
];

/** Services that may have location pages at all. Tier 0 never appears here. */
export const localisableServices = serviceRegistry.filter((s) => s.locationTier >= 1);

/** Services whose location pages are actually built today. */
export const servicesWithLivePages = ["gst-registration", "company-registration", "itr-filing"];

export function getService(id: string): ServiceEntry | undefined {
  return serviceRegistry.find((s) => s.id === id);
}

/** Deepest location level a tier permits. The rollout never goes past this. */
export function deepestLevel(tier: LocationTier): "pillar" | "state" | "city" | "locality" {
  if (tier === 0) return "pillar";
  if (tier === 1) return "state";
  if (tier === 2) return "city";
  return "locality";
}

/** Hard ceiling from the roadmap. Above this, the programme needs new evidence, not new ambition. */
export const PAGE_CEILING = 700;
