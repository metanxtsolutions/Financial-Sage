import { siteConfig } from "@/lib/site-config";
import type { Faq } from "@/data/faqs";
import type { PricingTier } from "@/data/pricing";

// JSON-LD builders. Deliberately excludes Review/AggregateRating schema,
// our testimonials are sample/placeholder content, and marking them up as
// schema.org Reviews would violate Google's structured data policies for
// fake/unverified reviews. Add that once real client reviews exist.

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
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

export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
  /** Defaults to the whole of India, which is correct for pillar pages only. */
  areaServed?: AreaServed;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: areaServedNode(opts.areaServed ?? { level: "country" }),
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    mainEntityOfPage: { "@type": "WebPage", "@id": opts.url },
    datePublished: opts.datePublished,
    dateModified: opts.datePublished,
    // Posts are written by the firm rather than a named individual, so the
    // organisation is both author and publisher.
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    inLanguage: "en-IN",
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
    brand: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      url: `${siteConfig.url}/pricing`,
      priceCurrency: "INR",
      price: tier.price,
      availability: "https://schema.org/InStock",
    },
  }));
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
