import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { sitemapGroups, urlsForGroup } from "@/lib/sitemap-urls";

// Replaces next-sitemap.config.js.
//
// The old config ran as CJS after `next build`, so it could not import the .ts
// data files and regex-scraped `slug:` literals out of them instead. Its own
// comments record that going stale twice: a duplicated cluster list drifted, and
// a hardcoded blog list drifted. This route runs as TypeScript inside the build,
// imports the same modules the pages import, and so cannot drift by
// construction — a new city or guide is in the sitemap the moment it exists.
//
// generateSitemaps() emits one file per service, so Search Console's coverage
// report answers "which service's location pages are not indexing" instead of
// giving one undifferentiated number across the whole site. Output lives at
// /sitemap/<id>.xml; /sitemap.xml is a sitemap index over them, so the URL
// already submitted to Search Console keeps working.

export async function generateSitemaps() {
  return sitemapGroups.map((group) => ({ id: group.id }));
}

export default async function sitemap(props: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const id = await props.id;
  return urlsForGroup(id).map(({ path, priority, changeFrequency }) => ({
    url: `${siteConfig.url}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
