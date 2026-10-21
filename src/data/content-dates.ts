// When each page's copy last changed. The single source for the visible
// "Last updated" line, schema.org dateModified, and <lastmod> in the sitemap.
//
// WHY THIS IS A HAND-KEPT LIST AND NOT new Date()
// The sitemap and the three legal pages used to stamp themselves with the build
// time, so every deploy claimed the whole site had changed that minute. A date
// that is always "today" carries no information, and Google says it stops
// trusting <lastmod> from a site whose values do not track real changes. A page
// with no entry here simply publishes no date, which is the honest default.
//
// WHERE THE VALUES CAME FROM
// Seeded on 28 September 2026 from git history: the last commit that touched
// the page's route file, or for a cluster page the newest line of its entry in
// src/data/gst-clusters.ts according to git blame. Commits that only changed
// the template around the copy (this file's own introduction included) were
// not counted.
//
// KEEPING IT TRUE
// Change a page's copy, change its date here in the same commit.
// `npm run content:dates` lists every page whose source has changed since the
// date recorded for it.
//
// Guides are not listed: a guide's dates live in its own frontmatter
// (`date`, and `updated` once it has been revised).

const pillars: Record<string, string> = {
  "/gst-registration": "2026-10-15",
  "/gst-return-filing": "2026-10-15",
  "/gst-compliance": "2026-07-22",
  "/itr-filing": "2026-10-15",
};

const legal: Record<string, string> = {
  "/privacy-policy": "2026-07-19",
  "/refund-policy": "2026-07-20",
  "/terms": "2026-07-23",
};

// Keyed by cluster slug, which is also the URL path without the leading slash.
export const clusterDates: Record<string, string> = {
  "gst-registration-online": "2026-10-15",
  "gst-registration-fees": "2026-10-15",
  "gst-registration-process": "2026-07-20",
  "gst-registration-documents": "2026-07-20",
  "gst-registration-status": "2026-07-20",
  "gst-registration-certificate": "2026-07-20",
  "gst-registration-for-freelancers": "2026-07-20",
  "gst-registration-for-amazon-sellers": "2026-07-20",
  "gst-registration-for-shopify-sellers": "2026-07-20",
  "gst-registration-for-restaurants": "2026-07-20",
  "gst-registration-for-doctors": "2026-07-20",
  "gst-registration-for-consultants": "2026-07-20",
  "gst-registration-for-import-export": "2026-07-20",
  "gst-registration-for-startups": "2026-07-20",
  "gst-registration-for-ecommerce": "2026-07-20",
  "gst-registration-for-private-limited": "2026-07-20",
  "gst-registration-for-llp": "2026-07-20",
  "gst-registration-for-proprietorship": "2026-07-20",
  "gst-registration-for-partnership": "2026-07-20",
};

export const pageDates: Record<string, string> = {
  ...pillars,
  ...legal,
  ...Object.fromEntries(Object.entries(clusterDates).map(([slug, date]) => [`/${slug}`, date])),
};

/** The recorded date for a path, or undefined when the page publishes none. */
export function getPageDate(path: string): string | undefined {
  return pageDates[path];
}

/**
 * For a page that renders a "Last updated" line. Throws at build time rather
 * than dropping the line, so a new cluster page cannot ship without a date by
 * accident.
 */
export function requirePageDate(path: string): string {
  const date = pageDates[path];
  if (!date) {
    throw new Error(
      `No date recorded for "${path}". Add it to src/data/content-dates.ts with the date its copy was written or last changed.`,
    );
  }
  return date;
}
