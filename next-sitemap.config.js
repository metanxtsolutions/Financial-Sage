// next-sitemap runs as plain Node/CJS after `next build`, so we can't import
// the .ts data files directly, so re-derive the same lists here instead.
// Keep these arrays in sync with src/data/*.ts if you add new entries.

const fs = require("fs");
const path = require("path");

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

// The service catalogue is large and changes often, so rather than keeping a
// duplicate list here (which silently went stale last time), read the slugs
// straight out of the data file. next-sitemap runs as CJS and can't import a
// .ts module, so we scrape the `slug:` literals instead.
// Pull slugs out of the data file. Each list is scoped to its own array,
// because `serviceCategories` and `otherServices` both use `slug:` at the same
// indentation - a single regex over the file would mix them and emit URLs that
// 404.
function arrayBlock(source, declaration, file) {
  const match = source.match(
    new RegExp(`export const ${declaration}[^=]*= \\[([\\s\\S]*?)\\n\\];`),
  );
  if (!match) {
    throw new Error(
      `next-sitemap: could not find ${declaration} in ${file}. Pages would be missing.`,
    );
  }
  return match[1];
}

function slugsIn(block) {
  return [...block.matchAll(/^\s{4}slug: "([^"]+)"/gm)].map((m) => m[1]);
}

const otherServicesSource = fs.readFileSync(
  path.join(__dirname, "src", "data", "other-services.ts"),
  "utf8",
);

const otherServiceSlugs = slugsIn(
  arrayBlock(otherServicesSource, "otherServices", "other-services.ts"),
);

const serviceCategorySlugs = slugsIn(
  arrayBlock(otherServicesSource, "serviceCategories", "other-services.ts"),
);

if (otherServiceSlugs.length === 0 || serviceCategorySlugs.length === 0) {
  throw new Error("next-sitemap: no service or category slugs found in other-services.ts.");
}

const blogSlugs = [
  "gst-registration-checklist-2026", "gstr1-vs-gstr3b-explained", "gst-for-first-time-amazon-sellers",
];

// Location pages for services other than GST. Derived from the same data file
// the routes use, so a new city appears in the sitemap automatically.
const serviceLocationPaths = (() => {
  const citiesSource = fs.readFileSync(
    path.join(__dirname, "src", "data", "cities.ts"),
    "utf8",
  );
  const stateBySlug = {};
  for (const m of citiesSource.matchAll(
    /stateSlug: "([^"]+)",\s*city: "[^"]+",\s*citySlug: "([^"]+)"/g,
  )) {
    stateBySlug[m[2]] = m[1];
  }

  const source = fs.readFileSync(
    path.join(__dirname, "src", "data", "service-locations.ts"),
    "utf8",
  );

  // Each service's copy array maps to the route base declared alongside it.
  const services = [
    ["companyRegistrationCopy", "/company-registration"],
    ["itrFilingCopy", "/itr-filing"],
  ];

  const paths = [];
  for (const [varName, routeBase] of services) {
    const block = source.match(
      new RegExp(`const ${varName}: LocationCopy\\[\\] = \\[([\\s\\S]*?)\\n\\];`),
    );
    if (!block) {
      throw new Error(
        `next-sitemap: could not find ${varName} in src/data/service-locations.ts. ` +
          "Location pages would be missing from the sitemap.",
      );
    }
    for (const m of block[1].matchAll(/citySlug: "([^"]+)"/g)) {
      const stateSlug = stateBySlug[m[1]];
      if (!stateSlug) {
        throw new Error(`next-sitemap: city slug "${m[1]}" is not present in cities.ts.`);
      }
      paths.push(`${routeBase}/${stateSlug}/${m[1]}`);
    }
  }
  return paths;
})();

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.financialsage.co.in",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/api/*", "/login*", "/itr-filing/apply"],
  additionalPaths: async () => [
    ...clusterSlugs.map((slug) => ({ loc: `/${slug}` })),
    ...cityPaths.map(([state, city]) => ({ loc: `/gst-registration/${state}/${city}` })),
    ...otherServiceSlugs.map((slug) => ({ loc: `/other-services/${slug}` })),
    ...serviceCategorySlugs.map((slug) => ({ loc: `/services/${slug}` })),
    ...blogSlugs.map((slug) => ({ loc: `/gst-guides/${slug}` })),
    ...serviceLocationPaths.map((loc) => ({ loc })),
  ],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};
