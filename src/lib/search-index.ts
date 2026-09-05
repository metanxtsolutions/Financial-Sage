// Build-time search index for the header search.
//
// Everything on this site is statically known, so the index is assembled on
// the server at build time and handed to the client as a prop. That keeps the
// blog's filesystem reads out of the client bundle and means the index can
// never drift from the data that generates the pages.

import { cities } from "@/data/cities";
import { otherServices, serviceCategories } from "@/data/other-services";
import { getLocationPages, locationServices, locationServiceIds } from "@/data/service-locations";
import { tools } from "@/data/tools";
import { taxTools } from "@/data/tax-tools";
import { getAllPosts } from "@/lib/blog";

export type SearchGroup = "GST" | "Services" | "Tools" | "Guides" | "Locations" | "Pages";

export interface SearchEntry {
  title: string;
  href: string;
  group: SearchGroup;
}

export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  // Core GST pages, which stay the primary practice.
  entries.push(
    { title: "GST Registration", href: "/gst-registration", group: "GST" },
    { title: "GST Return Filing", href: "/gst-return-filing", group: "GST" },
    { title: "GST Compliance", href: "/gst-compliance", group: "GST" },
    { title: "ITR Filing", href: "/itr-filing", group: "GST" },
  );

  for (const category of serviceCategories) {
    entries.push({ title: category.title, href: `/services/${category.slug}`, group: "Services" });
  }

  for (const service of otherServices) {
    entries.push({ title: service.title, href: `/other-services/${service.slug}`, group: "Services" });
  }

  for (const tool of tools) {
    entries.push({ title: tool.title, href: `/gst-tools/${tool.slug}`, group: "Tools" });
  }
  for (const tool of taxTools) {
    entries.push({ title: tool.title, href: `/tax-tools/${tool.slug}`, group: "Tools" });
  }

  for (const post of getAllPosts()) {
    entries.push({ title: post.title, href: `/gst-guides/${post.slug}`, group: "Guides" });
  }

  // GST city pages, then the city pages for the other location services.
  for (const city of cities) {
    entries.push({
      title: `GST Registration in ${city.city}`,
      href: `/gst-registration/${city.stateSlug}/${city.citySlug}`,
      group: "Locations",
    });
  }
  for (const id of locationServiceIds) {
    const service = locationServices[id];
    for (const { city } of getLocationPages(id)) {
      entries.push({
        title: `${service.label} in ${city.city}`,
        href: `${service.routeBase}/${city.stateSlug}/${city.citySlug}`,
        group: "Locations",
      });
    }
  }

  entries.push(
    { title: "Pricing", href: "/pricing", group: "Pages" },
    { title: "All Services", href: "/other-services", group: "Pages" },
    { title: "GST Tools", href: "/gst-tools", group: "Pages" },
    { title: "Income Tax Tools", href: "/tax-tools", group: "Pages" },
    { title: "GST Guides", href: "/gst-guides", group: "Pages" },
    { title: "FAQs", href: "/faq", group: "Pages" },
    { title: "About Us", href: "/about", group: "Pages" },
    { title: "Contact", href: "/contact", group: "Pages" },
  );

  return entries;
}
