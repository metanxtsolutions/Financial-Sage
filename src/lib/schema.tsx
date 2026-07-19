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

export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
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
    areaServed: {
      "@type": "Country",
      name: "India",
    },
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
