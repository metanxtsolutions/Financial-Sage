// next-sitemap runs as plain Node/CJS after `next build`, so we can't import
// the .ts data files directly — re-derive the same lists here instead.
// Keep these arrays in sync with src/data/*.ts if you add new entries.

const clusterSlugs = [
  "gst-registration-online", "gst-registration-fees", "gst-registration-process",
  "gst-registration-documents", "gst-registration-status", "gst-registration-certificate",
  "gst-registration-for-freelancers", "gst-registration-for-amazon-sellers",
  "gst-registration-for-shopify-sellers", "gst-registration-for-restaurants",
  "gst-registration-for-doctors", "gst-registration-for-consultants",
  "gst-registration-for-import-export", "gst-registration-for-startups",
  "gst-registration-for-ecommerce", "gst-registration-for-private-limited",
  "gst-registration-for-llp", "gst-registration-for-proprietorship",
  "gst-registration-for-partnership",
];

const cityPaths = [
  ["west-bengal", "kolkata"], ["delhi", "delhi"], ["maharashtra", "mumbai"],
  ["karnataka", "bangalore"], ["telangana", "hyderabad"], ["maharashtra", "pune"],
  ["tamil-nadu", "chennai"], ["gujarat", "ahmedabad"], ["odisha", "bhubaneswar"],
];

const otherServiceSlugs = [
  "company-registration", "llp-registration", "opc-registration",
  "partnership-firm-registration", "sole-proprietorship-registration",
  "msme-udyam-registration", "trademark-registration", "itr-filing", "roc-annual-filing",
];

const blogSlugs = [
  "gst-registration-checklist-2026", "gstr1-vs-gstr3b-explained", "gst-for-first-time-amazon-sellers",
];

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://financialsage.co.in",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/api/*", "/login*"],
  additionalPaths: async () => [
    ...clusterSlugs.map((slug) => ({ loc: `/${slug}` })),
    ...cityPaths.map(([state, city]) => ({ loc: `/gst-registration/${state}/${city}` })),
    ...otherServiceSlugs.map((slug) => ({ loc: `/other-services/${slug}` })),
    ...blogSlugs.map((slug) => ({ loc: `/gst-guides/${slug}` })),
  ],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};
