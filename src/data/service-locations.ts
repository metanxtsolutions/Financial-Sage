// Programmatic location pages for services other than GST.
//
// Geography lives in one place (src/data/cities.ts) and is shared with the
// /gst-registration city pages, so a new city is added once. What varies per
// service is the copy: each entry below has to say something true about that
// city for that particular service, otherwise these are nine near-identical
// pages with a name swapped in, which is exactly what search engines discount.

import type { Faq } from "@/data/faqs";
import { cities, type CityEntry } from "@/data/cities";

export type LocationServiceId = "company-registration" | "itr-filing";

export interface LocationService {
  id: LocationServiceId;
  /** URL prefix, e.g. /company-registration/maharashtra/mumbai */
  routeBase: string;
  label: string;
  /** Where the main service page lives, for breadcrumbs and cross-links. */
  pillarHref: string;
  pillarLabel: string;
  startingPrice: number;
  /** The label in running prose. Not derivable by lower-casing "ITR Filing". */
  labelLower: string;
  /** Heading over the local-demand paragraph. ITR filers are mostly
      individuals, so "for X Businesses" would be wrong there. */
  audienceHeading: (city: string) => string;
  /** Lead sidebar wording, so an ITR page doesn't ask for GST registration. */
  ctaHeading: string;
  ctaBlurb: string;
  ctaSubmitLabel: string;
  /** Shown under the H1 on every city page for this service. */
  howWeWork: string[];
}

export const locationServices: Record<LocationServiceId, LocationService> = {
  "company-registration": {
    id: "company-registration",
    routeBase: "/company-registration",
    label: "Company Registration",
    pillarHref: "/other-services/company-registration",
    pillarLabel: "company registration guide",
    startingPrice: 999,
    labelLower: "company registration",
    audienceHeading: (city) => `Company Registration for ${city} Businesses`,
    ctaHeading: "Talk to an Incorporation Expert",
    ctaBlurb:
      "Free consultation. We check name availability and your registered-office documents before anything is filed.",
    ctaSubmitLabel: "Start Company Registration",
    howWeWork: [
      "Name availability checked against the MCA register and existing trademarks before we file",
      "Digital signatures arranged for every director, with video KYC done remotely",
      "SPICe+ filed with MOA and AOA drafted for your actual business objects, not a template",
      "PAN, TAN and the Certificate of Incorporation delivered together, with an INC-20A reminder",
    ],
  },
  "itr-filing": {
    id: "itr-filing",
    routeBase: "/itr-filing",
    label: "ITR Filing",
    pillarHref: "/itr-filing",
    pillarLabel: "ITR filing service",
    startingPrice: 999,
    labelLower: "ITR filing",
    audienceHeading: (city) => `Who We File For in ${city}`,
    ctaHeading: "Talk to a Tax Expert",
    ctaBlurb:
      "Free consultation. We reconcile your AIS, compare both regimes, and file under whichever costs you less.",
    ctaSubmitLabel: "File My Return",
    howWeWork: [
      "Form 26AS and the Annual Information Statement reconciled against what you actually earned",
      "The right ITR form picked for your income mix, so the return is not treated as defective",
      "Old and new regime both computed, and we file under whichever leaves you better off",
      "E-verification handled, then refund tracked until it reaches your bank account",
    ],
  },
};

export interface LocationCopy {
  citySlug: string;
  /** Opening paragraph. Must be specific to this city and this service. */
  intro: string;
  /** Who locally needs this, and what usually trips them up. */
  demand: string;
  /** FAQ shown first on this city's page, picked to match the local mix. */
  featuredFaqId: string;
}

const companyRegistrationCopy: LocationCopy[] = [
  {
    citySlug: "kolkata",
    intro:
      "Incorporations from Kolkata are filed with the Registrar of Companies at Kolkata, which covers all of West Bengal. A large share of the work here is converting long-running family partnerships and proprietorships into a private limited company, usually because a bank or a large customer has started asking for one.",
    demand:
      "Trading houses around Burrabazar, jute and tea exporters, and Salt Lake IT firms make up most of the incorporation volume. The usual sticking point is the registered office: businesses operating out of a family property often have no rent agreement, so we arrange the owner NOC and utility-bill proof the ROC will accept.",
    featuredFaqId: "cr-registered-office",
  },
  {
    citySlug: "delhi",
    intro:
      "Delhi sees more new incorporations than almost anywhere else in India, filed through the Registrar of Companies at Delhi. The volume cuts both ways: name approval is competitive, and a proposed name that resembles an existing company or a registered trademark gets rejected, costing you a resubmission and a week.",
    demand:
      "Wholesale traders in Chandni Chowk and Karol Bagh, export houses, and corporate service firms incorporate here in numbers. Many run from residential or shared addresses, so we check the registered-office documentation before filing rather than after a resubmission notice.",
    featuredFaqId: "cr-name-approval",
  },
  {
    citySlug: "mumbai",
    intro:
      "Companies in Mumbai are incorporated through the Registrar of Companies at Mumbai. Stamp duty on the MOA and on authorised share capital is set by Maharashtra rather than centrally, so the total cost of incorporating here differs from the same company set up in Gujarat or Karnataka.",
    demand:
      "Finance and media businesses, textile and diamond traders in South Mumbai, and import-export firms drive most of the work. Founders here often plan an early funding round, so we size authorised capital with the first raise in mind rather than filing the minimum and paying again to increase it.",
    featuredFaqId: "cr-capital",
  },
  {
    citySlug: "bangalore",
    intro:
      "Bangalore incorporations go through the Registrar of Companies at Bangalore, and they are rarely just about compliance. Most founders here are incorporating because an investor, an accelerator, or an enterprise customer will not proceed with a proprietorship or an LLP.",
    demand:
      "Software and SaaS startups, IT-services consultancies, and biotech firms make up the bulk of it. Because the next step is usually DPIIT recognition and then a priced round, we draft the MOA objects and the shareholding to survive due diligence instead of needing amendment six months later.",
    featuredFaqId: "cr-startup-india",
  },
  {
    citySlug: "hyderabad",
    intro:
      "Hyderabad companies are incorporated through the Registrar of Companies at Hyderabad. The city's split between pharmaceutical manufacturing and IT services shows up in the paperwork, because a manufacturer's objects clause and licensing path look nothing like a services company's.",
    demand:
      "Pharma manufacturers and exporters, HITEC City IT-services firms, and established trading businesses in the old city each need different follow-on registrations. We flag which ones apply, so a manufacturer is not left discovering a licence requirement after incorporation.",
    featuredFaqId: "cr-objects",
  },
  {
    citySlug: "pune",
    intro:
      "Pune incorporations are filed with the Registrar of Companies at Pune, and Maharashtra's stamp duty on authorised capital applies here exactly as it does in Mumbai. Many Pune companies are set up as the Indian arm of an existing group rather than as a first venture.",
    demand:
      "Auto-component manufacturers, engineering firms, and IT businesses along Hinjewadi and Kharadi account for most incorporations. Group structures are common, so shareholding between a holding entity and the new company is worth getting right at incorporation rather than restructuring later.",
    featuredFaqId: "cr-directors",
  },
  {
    citySlug: "chennai",
    intro:
      "Chennai companies are incorporated through the Registrar of Companies at Chennai. The city has an unusually high share of Indian subsidiaries of foreign parents, which adds apostilled documents and a longer document-collection stage to an otherwise standard incorporation.",
    demand:
      "Automotive and auto-component manufacturers, IT-services firms, and textile and leather exporters incorporate here regularly. Where a foreign parent is involved we plan the FEMA and FC-GPR reporting at incorporation, because that filing has a deadline that runs from the first inward remittance.",
    featuredFaqId: "cr-foreign-director",
  },
  {
    citySlug: "ahmedabad",
    intro:
      "Ahmedabad incorporations are filed with the Registrar of Companies at Ahmedabad, covering Gujarat. Much of the work here is generational: family trading and manufacturing businesses formalising into a private limited company as the next generation takes over or as they start exporting.",
    demand:
      "Textile mills and traders, chemical and pharma manufacturers, and diamond and gem exporters make up most incorporations. Where the business already holds GST registration and an IEC in a proprietor's name, we sequence the transfer to the new company so trading is not interrupted.",
    featuredFaqId: "cr-conversion",
  },
  {
    citySlug: "bhubaneswar",
    intro:
      "Companies in Bhubaneswar are incorporated through the Registrar of Companies at Cuttack, which covers Odisha. Incorporation here is often driven by eligibility rather than scale, because state MSME schemes and government tenders increasingly ask for a registered company.",
    demand:
      "IT-services and BPO firms in the tech-park corridor, along with retail and trading businesses serving the wider Odisha market, form most of our client base here. We usually pair incorporation with Udyam registration, since that is what unlocks the schemes people are incorporating for.",
    featuredFaqId: "cr-timeline",
  },
];

const itrFilingCopy: LocationCopy[] = [
  {
    citySlug: "kolkata",
    intro:
      "Most ITR work in Kolkata is business income rather than salary: proprietors, partnership firms, and family trading concerns, where the return has to agree with books that were not kept with filing in mind.",
    demand:
      "Traders and small manufacturers here often qualify for presumptive taxation under Section 44AD, which is simpler and usually cheaper than maintaining full books. We check eligibility first, because switching in and out of the presumptive scheme has consequences that last five years.",
    featuredFaqId: "itr-presumptive",
  },
  {
    citySlug: "delhi",
    intro:
      "Delhi returns tend to be the complicated kind: business income alongside salary, more than one house property, and rental income that has to be reported correctly to survive a mismatch check against the Annual Information Statement.",
    demand:
      "Traders, consultants, and professionals with income from several sources make up most of the work. Where there is more than one house property the return moves from ITR-1 to ITR-2, and filing the wrong form is the single most common reason a return comes back as defective.",
    featuredFaqId: "itr-which-form",
  },
  {
    citySlug: "mumbai",
    intro:
      "Mumbai returns are dominated by capital gains. Between listed shares, mutual funds, and performance bonuses paid partly in stock, a Mumbai salary package rarely fits on ITR-1.",
    demand:
      "Finance and media professionals make up much of the volume. Short-term and long-term gains are taxed differently and have to be reported separately, and the broker statement almost never lines up with the AIS on its own, so reconciling the two is most of the work.",
    featuredFaqId: "itr-capital-gains",
  },
  {
    citySlug: "bangalore",
    intro:
      "Bangalore has India's highest concentration of salaried employees holding stock in a foreign parent company, and that single fact changes the return. RSUs and ESOPs in a US or European parent trigger foreign asset reporting.",
    demand:
      "Tech employees with vested RSUs must disclose those holdings in Schedule FA, and the disclosure is required even when nothing was sold and no gain arose. Missing it carries penalties well out of proportion to the tax involved, so it is the first thing we check on a Bangalore return.",
    featuredFaqId: "itr-esop",
  },
  {
    citySlug: "hyderabad",
    intro:
      "Hyderabad returns split between IT-sector salary with equity components and pharma-sector professionals, and the two need quite different treatment.",
    demand:
      "As in Bangalore, employees holding stock in a foreign parent need Schedule FA disclosure whether or not they sold anything. Pharma consultants billing on contract are usually better off under presumptive taxation for professionals, which we check rather than assume.",
    featuredFaqId: "itr-esop",
  },
  {
    citySlug: "pune",
    intro:
      "Pune returns come mostly from salaried employees in IT and the auto sector, and the recurring question is not how to file but which regime to file under.",
    demand:
      "With home loan interest, HRA, and 80C investments in play, the old regime still wins for a good number of Pune filers, and loses badly for others. We compute both before filing rather than defaulting to the new regime because it is the default.",
    featuredFaqId: "itr-regime",
  },
  {
    citySlug: "chennai",
    intro:
      "Chennai returns run from manufacturing-sector salary to professionals with foreign remittances, and the latter brings in tax residency and double-taxation questions that a standard salary return never raises.",
    demand:
      "Employees on overseas assignments and professionals billing foreign clients need residential status determined before anything else, because it decides what income is taxable in India at all. Foreign tax credit claims need Form 67 filed before the return.",
    featuredFaqId: "itr-foreign-income",
  },
  {
    citySlug: "ahmedabad",
    intro:
      "Ahmedabad returns are largely business returns: trading firms, textile units, and exporters, where the income tax return has to sit consistently alongside GST filings that the department can already see.",
    demand:
      "Mismatches between turnover declared in GST returns and turnover in the income tax return are a common trigger for scrutiny. We reconcile the two before filing, which is straightforward at filing time and expensive to explain afterwards.",
    featuredFaqId: "itr-gst-mismatch",
  },
  {
    citySlug: "bhubaneswar",
    intro:
      "Bhubaneswar returns are mostly straightforward salaried filings for government, PSU, and IT-services employees, with a growing share of small-business returns.",
    demand:
      "For a single-employer salary with standard deductions the return is simple, and the value is in getting the regime choice right and the refund tracked. Where there is a second income from tuition, consultancy, or a small trade, that has to be declared even if no TDS was deducted on it.",
    featuredFaqId: "itr-refund",
  },
];

// These FAQs are scoped to location pages and are never added to the global
// `faqs` array, so they don't appear on /faq. They're typed as `Faq` purely to
// satisfy FaqAccordion and faqPageSchema; the category is nominal.
const companyRegistrationFaqs: Faq[] = [
  {
    id: "cr-timeline",
    category: "financial-sage",
    question: "How long does company registration take?",
    answer:
      "Once we have your documents and the digital signatures are issued, filing takes a day. Approval usually follows within seven to ten working days, though the Registrar can raise a query that adds time. Digital signature issuance is the step most likely to hold things up, so we start it first.",
  },
  {
    id: "cr-name-approval",
    category: "financial-sage",
    question: "What happens if my company name is rejected?",
    answer:
      "A name is rejected if it is too close to an existing company or a registered trademark, or if it breaches the naming rules. We check both registers before filing and ask you for a second and third preference, so a rejection does not restart the process.",
  },
  {
    id: "cr-registered-office",
    category: "financial-sage",
    question: "Can I use my home address as the registered office?",
    answer:
      "Yes. A residential address is acceptable as a registered office. You will need a recent utility bill for the premises and a no-objection letter from the owner. If the property is rented, the rent agreement is used instead.",
  },
  {
    id: "cr-directors",
    category: "financial-sage",
    question: "How many directors and shareholders do I need?",
    answer:
      "A private limited company needs at least two directors and two shareholders, and the same two people can hold both roles. At least one director must be resident in India. If you are on your own, a One Person Company is the equivalent structure with a nominee instead of a second shareholder.",
  },
  {
    id: "cr-capital",
    category: "financial-sage",
    question: "How much authorised capital should I start with?",
    answer:
      "There is no statutory minimum. What matters is that increasing authorised capital later means another filing and more stamp duty, so if you expect to issue shares to an investor or a co-founder soon, it is usually cheaper to set it higher at incorporation than to raise it afterwards.",
  },
  {
    id: "cr-foreign-director",
    category: "financial-sage",
    question: "Can a foreign national or NRI be a director?",
    answer:
      "Yes, a foreign national or NRI can be a director and a shareholder. At least one director on the board must be resident in India. Documents signed outside India need to be notarised and apostilled, which is usually what determines the overall timeline.",
  },
  {
    id: "cr-objects",
    category: "financial-sage",
    question: "Does the objects clause in the MOA actually matter?",
    answer:
      "It does. The objects clause defines what the company is permitted to do, and banks, licensing authorities, and investors read it. A generic clause copied from a template can block a licence application or force an amendment later, so we draft it around what you actually intend to do.",
  },
  {
    id: "cr-startup-india",
    category: "financial-sage",
    question: "Should I apply for Startup India recognition after incorporating?",
    answer:
      "If you are building something new rather than running an established trade, DPIIT recognition is worth having. It enables self-certification on several labour and environmental laws, relaxes tender conditions, and is a prerequisite for the 80-IAC tax holiday. We handle it as a follow-on step.",
  },
  {
    id: "cr-conversion",
    category: "financial-sage",
    question: "I already run a proprietorship. What happens to my GST and IEC?",
    answer:
      "They do not carry over automatically, because the company is a new legal person. You will need fresh GST registration and an IEC in the company's name, and existing contracts and bank accounts need to be moved across. We sequence this so there is no gap in your ability to invoice.",
  },
];

const itrFilingFaqs: Faq[] = [
  {
    id: "itr-which-form",
    category: "financial-sage",
    question: "Which ITR form applies to me?",
    answer:
      "It depends on your income mix. Salary with one house property up to ₹50 lakh is ITR-1. Capital gains, more than one house property, or foreign assets move you to ITR-2. Business or professional income is ITR-3, or ITR-4 under presumptive taxation. Filing the wrong form gets the return marked defective, so we pick it from your actual income, not last year's form.",
  },
  {
    id: "itr-regime",
    category: "financial-sage",
    question: "Can I switch between the old and new regime?",
    answer:
      "If your income is salary only, you can choose each year at the time of filing. If you have business or professional income the choice is restricted and opting out of the new regime requires Form 10-IEA, which can only be exercised a limited number of times. We compute both before deciding.",
  },
  {
    id: "itr-capital-gains",
    category: "financial-sage",
    question: "Do I have to report gains from shares and mutual funds?",
    answer:
      "Yes, and separately for short-term and long-term. They must be reported even when the gain is below the exemption limit or where the sale made a loss, since reporting a loss is what allows you to carry it forward against future gains. Your broker's statement and the AIS rarely match exactly, so both get reconciled.",
  },
  {
    id: "itr-esop",
    category: "financial-sage",
    question: "How are RSUs and ESOPs in a foreign parent company taxed?",
    answer:
      "There are two events. At vesting or exercise the benefit is taxed as a perquisite through your salary. When you sell, the gain over that value is a capital gain. Separately, holding shares in a foreign company means disclosing them in Schedule FA, and that disclosure is required even if you never sold and made no gain.",
  },
  {
    id: "itr-presumptive",
    category: "financial-sage",
    question: "Should I file under presumptive taxation?",
    answer:
      "For many small traders and professionals it is simpler and results in less tax, and it removes the requirement to maintain detailed books. But once you opt out, you are barred from opting back in for five assessment years, so it is worth checking against your actual margins before choosing it.",
  },
  {
    id: "itr-foreign-income",
    category: "financial-sage",
    question: "I earn from abroad. What do I need to file?",
    answer:
      "Residential status decides what is taxable in India, so that is settled first. If you have paid tax abroad on the same income, foreign tax credit can be claimed under the applicable treaty, but Form 67 has to be filed before the return, not after. Foreign bank accounts and assets also need Schedule FA disclosure.",
  },
  {
    id: "itr-gst-mismatch",
    category: "financial-sage",
    question: "Does my income tax return have to match my GST returns?",
    answer:
      "The department can see both, and a turnover mismatch between them is a common trigger for a query. Differences are often legitimate, such as timing or supplies outside GST, but they need to be explainable. Reconciling before filing is far easier than reconstructing it in response to a notice.",
  },
  {
    id: "itr-refund",
    category: "financial-sage",
    question: "How long does a refund take?",
    answer:
      "Refunds usually arrive within a few weeks of e-verification, provided your bank account is pre-validated on the portal and the name matches your PAN. The most common cause of a delayed refund is an unvalidated or closed bank account, which we check before filing.",
  },
];

const copyByService: Record<LocationServiceId, LocationCopy[]> = {
  "company-registration": companyRegistrationCopy,
  "itr-filing": itrFilingCopy,
};

const faqsByService: Record<LocationServiceId, Faq[]> = {
  "company-registration": companyRegistrationFaqs,
  "itr-filing": itrFilingFaqs,
};

export interface LocationPage {
  city: CityEntry;
  copy: LocationCopy;
}

/** Every city that has a page for this service, in cities.ts order. */
export function getLocationPages(serviceId: LocationServiceId): LocationPage[] {
  return copyByService[serviceId].flatMap((copy) => {
    const city = cities.find((c) => c.citySlug === copy.citySlug);
    return city ? [{ city, copy }] : [];
  });
}

export function getLocationPage(
  serviceId: LocationServiceId,
  stateSlug: string,
  citySlug: string,
): LocationPage | undefined {
  return getLocationPages(serviceId).find(
    (p) => p.city.stateSlug === stateSlug && p.city.citySlug === citySlug,
  );
}

/**
 * FAQs for a city page: the city's featured question first, then two that are
 * common to every city for this service. Varying the first one keeps the nine
 * pages from carrying an identical FAQ block.
 */
export function getLocationFaqs(serviceId: LocationServiceId, featuredFaqId: string): Faq[] {
  const pool = faqsByService[serviceId];
  const featured = pool.find((f) => f.id === featuredFaqId);
  const common = pool.filter((f) => f.id !== featuredFaqId).slice(0, 2);
  return featured ? [featured, ...common] : pool.slice(0, 3);
}

/** Services that have location pages, for cross-linking from a service page. */
export const locationServiceIds = Object.keys(locationServices) as LocationServiceId[];

export function hasLocationPages(slug: string): slug is LocationServiceId {
  return locationServiceIds.includes(slug as LocationServiceId);
}
