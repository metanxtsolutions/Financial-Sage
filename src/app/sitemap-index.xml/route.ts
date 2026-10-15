import { siteConfig } from "@/lib/site-config";
import { lastModifiedForGroup, sitemapGroups } from "@/lib/sitemap-urls";

// The sitemap index, served at /sitemap.xml via a rewrite in next.config.ts.
//
// Why the indirection: generateSitemaps() publishes the per-service files at
// /sitemap/<id>.xml and reserves /sitemap.xml for the metadata convention
// without ever serving anything there, so a route handler at /sitemap.xml is
// rejected at build time as a conflict. /sitemap.xml is the URL already
// submitted to Search Console and referenced from robots.txt, so it is rewritten
// here rather than orphaned, and an index over per-service files is what a site
// with multiple sitemaps should serve there anyway.

export const dynamic = "force-static";

export function GET() {
  // <lastmod> is the newest recorded content date inside the file, and is left
  // out for a group with none. It used to be the build time.
  const entries = sitemapGroups
    .map((group) => {
      const lastmod = lastModifiedForGroup(group.id);
      return [
        "  <sitemap>",
        `    <loc>${siteConfig.url}/sitemap/${group.id}.xml</loc>`,
        ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
        "  </sitemap>",
      ].join("\n");
    })
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</sitemapindex>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
}
