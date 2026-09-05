import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // generateSitemaps() reserves /sitemap.xml without serving it, so the
        // sitemap index is served from /sitemap-index.xml and surfaced at the
        // URL Search Console already has. See src/app/sitemap-index.xml/route.ts.
        source: "/sitemap.xml",
        destination: "/sitemap-index.xml",
      },
    ];
  },
  async redirects() {
    return [
      {
        // /services exists only as a parent of the category hubs, so send the
        // bare path to the full catalogue.
        source: "/services",
        destination: "/other-services",
        permanent: true,
      },
      {
        // /company-registration exists only as a parent of the city pages
        // below it, so send the bare path to the actual service page.
        source: "/company-registration",
        destination: "/other-services/company-registration",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
