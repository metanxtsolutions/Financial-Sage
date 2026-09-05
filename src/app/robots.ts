import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { sitemapGroups } from "@/lib/sitemap-urls";

// Replaces next-sitemap's generated public/robots.txt. Lists the per-service
// sitemaps individually as well as the index, because Search Console will
// happily read either and the explicit list makes the split visible in the
// robots file itself.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The ITR wizard is a multi-step form behind a payment, not a landing
        // page, and the API routes are not documents.
        disallow: ["/api/", "/itr-filing/apply"],
      },
    ],
    sitemap: [
      `${siteConfig.url}/sitemap.xml`,
      ...sitemapGroups.map((g) => `${siteConfig.url}/sitemap/${g.id}.xml`),
    ],
    host: siteConfig.url,
  };
}
