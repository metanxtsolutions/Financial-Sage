import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

// Open Graph for every page, built from the page's own canonical.
//
// Next merges metadata shallowly: a page that sets `openGraph` replaces the
// layout's block wholesale, and a page that does not inherits it wholesale.
// Both halves of that bit this site. The layout carried `url: siteConfig.url`,
// so every page that inherited it told Facebook, LinkedIn, WhatsApp and any
// answer engine reading og:url that it was the homepage. The guides set their
// own block to get `type: article`, and so lost og:image, og:site_name and
// og:locale, which the layout had been supplying.
//
// withOpenGraph() closes both: the shared fields are spread into every page's
// own block, and og:url is derived from alternates.canonical so the two can
// never disagree.

type OpenGraph = NonNullable<Metadata["openGraph"]>;

export const ogImageAlt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const ogImageSize = { width: 1200, height: 630 } as const;

/** Absolute URL for a site path. "/" is the bare origin, matching the canonical. */
export function absoluteUrl(path: string): string {
  return path === "/" ? siteConfig.url : `${siteConfig.url}${path}`;
}

/**
 * Fields every page shares. Deliberately has no `url`: a shared og:url is
 * exactly the bug described above.
 *
 * The image is the generated card at src/app/opengraph-image.tsx. It has to be
 * named here because the file convention only reaches pages that inherit the
 * layout's openGraph block, and after this change no page does.
 */
export const sharedOpenGraph = {
  type: "website",
  locale: "en_IN",
  siteName: siteConfig.name,
  images: [{ url: "/opengraph-image", type: "image/png", alt: ogImageAlt, ...ogImageSize }],
} satisfies OpenGraph;

/**
 * Wrap a page's metadata to add its Open Graph block. og:title and
 * og:description are left unset on purpose: Next fills them from `title` and
 * `description`, so they cannot drift from what the page declares.
 *
 * Throws at build time when the page has no canonical path, because a page
 * without one would silently fall back to having no og:url at all.
 */
export function withOpenGraph(meta: Metadata, og: OpenGraph = {}): Metadata {
  const canonical = meta.alternates?.canonical;
  if (typeof canonical !== "string" || !canonical.startsWith("/")) {
    throw new Error(
      `withOpenGraph() needs alternates.canonical as a site path starting with "/". Got: ${JSON.stringify(canonical)}`,
    );
  }
  return {
    ...meta,
    openGraph: { ...sharedOpenGraph, url: absoluteUrl(canonical), ...og } as OpenGraph,
  };
}
