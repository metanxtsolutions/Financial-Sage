// The single source of every indexable URL on the site.
//
// Shared by src/app/sitemap.ts, src/app/sitemap.xml/route.ts (the index) and
// scripts/check-sitemap-parity.ts, so the sitemap, the index and the parity
// check can never disagree with each other.
//
// Grouping is per service, deliberately: a coverage report split by service is
// actionable ("company-registration city pages are not indexing"), and a single
// site-wide number is not.

import { clusterPages } from "@/data/gst-clusters";
import { otherServices, serviceCategories } from "@/data/other-services";
import { cities } from "@/data/cities";
import { getLocationPages } from "@/data/service-locations";
import { getAllPostSlugs } from "@/lib/blog";
import { publishedStates } from "@/data/services/copy";
import { cityPath, statePath } from "@/lib/geo";

type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export interface SitemapUrl {
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
}

export interface SitemapGroup {
  id: string;
  label: string;
  urls: () => SitemapUrl[];
}

const url = (
  path: string,
  priority = 0.7,
  changeFrequency: ChangeFrequency = "monthly",
): SitemapUrl => ({ path, priority, changeFrequency });

// Hand-maintained pages. These are the only paths in this file that are not
// derived from a data module, because they have no data module — each one is a
// route file with bespoke content.
const staticPaths: SitemapUrl[] = [
  url("/", 1.0, "weekly"),
  url("/about", 0.6),
  url("/contact", 0.6),
  url("/faq", 0.6),
  url("/pricing", 0.8),
  url("/other-services", 0.7),
  url("/gst-guides", 0.7, "weekly"),
  url("/gst-tools", 0.7),
  url("/tax-tools", 0.7),
  url("/gst-tools/gst-calculator", 0.6),
  url("/gst-tools/reverse-gst-calculator", 0.6),
  url("/gst-tools/gst-interest-calculator", 0.6),
  url("/gst-tools/gst-late-fee-calculator", 0.6),
  url("/gst-tools/gst-due-date-checker", 0.6),
  url("/gst-tools/gstin-validator", 0.6),
  url("/gst-tools/hsn-sac-search", 0.6),
  url("/tax-tools/income-tax-calculator", 0.6),
  url("/tax-tools/hra-calculator", 0.6),
  url("/privacy-policy", 0.3, "yearly"),
  url("/terms", 0.3, "yearly"),
  url("/refund-policy", 0.3, "yearly"),
];

export const sitemapGroups: SitemapGroup[] = [
  {
    id: "core",
    label: "Static pages, tools and the service catalogue",
    urls: () => [
      ...staticPaths,
      ...serviceCategories.map((c) => url(`/services/${c.slug}`, 0.7)),
      ...otherServices.map((s) => url(`/other-services/${s.slug}`, 0.7)),
    ],
  },
  {
    id: "gst-registration",
    label: "GST registration pillar, topical cluster and city pages",
    urls: () => [
      url("/gst-registration", 1.0, "weekly"),
      ...clusterPages.map((c) => url(`/${c.slug}`, 0.8)),
      // State pages rank above their cities in the hierarchy and carry the
      // statutory differentiation, so they get the higher priority of the two.
      // Only "ready" states appear here — a draft state has no route to point at.
      ...publishedStates("gst-registration").map(({ state }) =>
        url(statePath("/gst-registration", state), 0.9),
      ),
      ...cities.map((c) =>
        url(cityPath("/gst-registration", { stateSlug: c.stateSlug, slug: c.citySlug }), 0.8),
      ),
    ],
  },
  {
    id: "company-registration",
    label: "Company registration city pages",
    urls: () => [
      ...publishedStates("company-registration").map(({ state }) =>
        url(statePath("/company-registration", state), 0.9),
      ),
      ...getLocationPages("company-registration").map(({ city }) =>
        url(cityPath("/company-registration", { stateSlug: city.stateSlug, slug: city.citySlug }), 0.8),
      ),
    ],
  },
  {
    id: "itr-filing",
    label: "ITR filing pillar and city pages",
    urls: () => [
      url("/itr-filing", 0.9, "weekly"),
      ...getLocationPages("itr-filing").map(({ city }) =>
        url(cityPath("/itr-filing", { stateSlug: city.stateSlug, slug: city.citySlug }), 0.8),
      ),
    ],
  },
  {
    id: "gst-filing",
    label: "GST return filing and compliance pillars",
    urls: () => [url("/gst-return-filing", 0.9), url("/gst-compliance", 0.9)],
  },
  {
    id: "guides",
    label: "GST guides",
    urls: () => getAllPostSlugs().map((slug) => url(`/gst-guides/${slug}`, 0.7, "weekly")),
  },
];

export function urlsForGroup(id: string): SitemapUrl[] {
  const group = sitemapGroups.find((g) => g.id === id);
  if (!group) {
    // dynamicParams is effectively false for sitemaps too: an unknown id is a
    // bug in generateSitemaps, not something to paper over with an empty file.
    throw new Error(`Unknown sitemap group "${id}". Known groups: ${sitemapGroups.map((g) => g.id).join(", ")}`);
  }
  return group.urls();
}

/** Every indexable path on the site, deduplicated. Used by the parity check. */
export function allSitemapPaths(): string[] {
  const seen = new Set<string>();
  for (const group of sitemapGroups) {
    for (const { path } of group.urls()) seen.add(path);
  }
  return [...seen].sort();
}
