import { siteConfig } from "@/lib/site-config";
import type { Faq } from "@/data/faqs";
import type { PricingTier } from "@/data/pricing";
import { authorPath, type Author } from "@/data/authors";
import { getSources, type SourceId } from "@/data/sources";

// JSON-LD builders. Deliberately excludes Review/AggregateRating schema,
// our testimonials are sample/placeholder content, and marking them up as
// schema.org Reviews would violate Google's structured data policies for
// fake/unverified reviews. Add that once real client reviews exist.

// One identifier per entity, so every page's markup points at the same
// organisation and the same website instead of describing a fresh, unnamed one
// each time. Two nodes that share an @id are read as one entity, which is how
// the Organization and ProfessionalService blocks below describe a single firm.
const ORG_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

/** A reference to the firm, for provider / publisher / author / brand. */
const orgRef = () => ({
  "@type": "Organization",
  "@id": ORG_ID,
  name: siteConfig.name,
  url: siteConfig.url,
});

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phoneE164,
    description: siteConfig.tagline,
    areaServed: "IN",
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: siteConfig.phoneE164,
    email: siteConfig.email,
    priceRange: "₹₹",
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    description: siteConfig.tagline,
  };
}

// The area a Service page actually covers. Every location page used to emit
// areaServed: India regardless of the place it was about, which told search
// engines the Kolkata page and the national page served the same area - the one
// signal a location page exists to send. Levels nest through containedInPlace.
export type AreaServed =
  | { level: "country" }
  | { level: "state"; state: string }
  | { level: "city"; city: string; state: string }
  | { level: "locality"; locality: string; city: string; state: string };

const INDIA = { "@type": "Country", name: "India" } as const;

function areaServedNode(area: AreaServed): object {
  switch (area.level) {
    case "country":
      return INDIA;
    case "state":
      return { "@type": "State", name: area.state, containedInPlace: INDIA };
    case "city":
      return {
        "@type": "City",
        name: area.city,
        containedInPlace: { "@type": "State", name: area.state, containedInPlace: INDIA },
      };
    case "locality":
      return {
        "@type": "Place",
        name: area.locality,
        containedInPlace: {
          "@type": "City",
          name: area.city,
          containedInPlace: { "@type": "State", name: area.state, containedInPlace: INDIA },
        },
      };
  }
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.tagline,
    inLanguage: "en-IN",
    publisher: orgRef(),
  };
}

/**
 * The official pages a piece of content rests on, as schema.org citations.
 * Mirrors the visible Sources block; never emit one without the other.
 */
function citationNodes(ids: readonly SourceId[] | undefined) {
  if (!ids || ids.length === 0) return {};
  return {
    citation: getSources(ids).map((source) => ({
      "@type": "WebPage",
      name: source.title,
      url: source.url,
      publisher: { "@type": "Organization", name: source.publisher },
    })),
  };
}

export function personSchema(author: Author) {
  return {
    "@type": "Person",
    "@id": `${siteConfig.url}${authorPath(author)}`,
    name: author.name,
    jobTitle: author.jobTitle,
    description: author.bio,
    url: `${siteConfig.url}${authorPath(author)}`,
    worksFor: orgRef(),
    ...(author.knowsAbout.length > 0 ? { knowsAbout: author.knowsAbout } : {}),
    ...(author.credentials.length > 0
      ? {
          hasCredential: author.credentials.map((name) => ({
            "@type": "EducationalOccupationalCredential",
            name,
          })),
        }
      : {}),
    ...(author.sameAs.length > 0 ? { sameAs: author.sameAs } : {}),
  };
}

/**
 * WebPage for a pillar or cluster page. Service describes what is sold; this
 * describes the document, which is where a modification date and the sources
 * belong.
 */
export function webPageSchema(opts: {
  name: string;
  description: string;
  url: string;
  /** "YYYY-MM-DD" from src/data/content-dates.ts. */
  dateModified?: string;
  sources?: readonly SourceId[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": opts.url,
    url: opts.url,
    name: opts.name,
    description: opts.description,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    publisher: orgRef(),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    ...citationNodes(opts.sources),
  };
}

/**
 * HowTo for a page that already shows its steps as a numbered list. The steps
 * passed here must be the ones on the page, in the same order.
 *
 * Google retired the HowTo rich result in 2023, so this earns no special
 * listing there. It is emitted because it states the procedure as data, which
 * is what lets an assistant repeat the steps in order rather than paraphrase
 * the prose around them.
 */
export function howToSchema(opts: {
  name: string;
  description?: string;
  url: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    ...(opts.description ? { description: opts.description } : {}),
    url: opts.url,
    inLanguage: "en-IN",
    step: opts.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/** A free calculator or lookup tool that runs in the browser. */
export function webApplicationSchema(opts: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    inLanguage: "en-IN",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: 0, priceCurrency: "INR" },
    provider: orgRef(),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  /** Defaults to the whole of India, which is correct for pillar pages only. */
  areaServed?: AreaServed;
  /**
   * Starting price in INR. Emitted as an AggregateOffer lowPrice rather than a
   * fixed Offer price, because the site advertises "from ₹X" and a single
   * `price` would assert a precision we do not have.
   */
  priceFrom?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: orgRef(),
    areaServed: areaServedNode(opts.areaServed ?? { level: "country" }),
    ...(opts.priceFrom
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "INR",
            lowPrice: opts.priceFrom,
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  /** Only pass this when the post was actually revised. */
  dateModified?: string;
  /** A named person from src/data/authors.ts. Omitted, the firm is the author. */
  author?: Author;
  /** Set together, and only for a guide that person has actually reviewed. */
  reviewedBy?: Author;
  reviewed?: string;
  sources?: readonly SourceId[];
  /**
   * CSS selectors for the parts of the page that answer the question on their
   * own: the short answer and the key takeaways. Marks them as the passage to
   * quote or read aloud.
   */
  speakable?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    // reviewedBy and lastReviewed are properties of the page, not the article,
    // so they sit on the WebPage the article is the main entity of.
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": opts.url,
      isPartOf: { "@id": WEBSITE_ID },
      ...(opts.reviewedBy && opts.reviewed
        ? { reviewedBy: personSchema(opts.reviewedBy), lastReviewed: opts.reviewed }
        : {}),
    },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: opts.author ? personSchema(opts.author) : orgRef(),
    publisher: orgRef(),
    inLanguage: "en-IN",
    ...citationNodes(opts.sources),
    ...(opts.speakable && opts.speakable.length > 0
      ? { speakable: { "@type": "SpeakableSpecification", cssSelector: opts.speakable } }
      : {}),
  };
}

export function faqPageSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function pricingOfferSchema(tiers: PricingTier[]) {
  return tiers.map((tier) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${siteConfig.name} ${tier.name} Plan`,
    description: tier.description,
    brand: orgRef(),
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/pricing`,
      priceCurrency: "INR",
      price: tier.price,
      availability: "https://schema.org/InStock",
    },
  }));
}

/**
 * ItemList for a catalogue or index page. Describes what the page actually
 * enumerates, which is what lets an answer engine say "they offer N services"
 * without guessing from the HTML.
 */
export function itemListSchema(opts: {
  name: string;
  url: string;
  items: { name: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: opts.name,
    url: opts.url,
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

/** AboutPage / ContactPage, tying the page to the organisation entity. */
export function orgPageSchema(opts: { type: "AboutPage" | "ContactPage"; name: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": opts.type,
    name: opts.name,
    url: opts.url,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: {
      ...orgRef(),
      email: siteConfig.email,
      telephone: siteConfig.phoneE164,
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
