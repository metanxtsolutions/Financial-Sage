// Trust and comparison content for the homepage.
//
// Two blocks here are deliberately EMPTY and must be filled in with real data
// before they will render anything. Nothing on this site should display social
// proof that has not actually been earned, so each component returns null when
// its data is missing rather than showing a placeholder.

import { siteConfig } from "@/lib/site-config";

// ---------------------------------------------------------------------------
// Marquee: short, checkable facts. Every one of these is already claimed
// elsewhere on the site, so keep them in sync with src/lib/site-config.ts.
// ---------------------------------------------------------------------------

export const marqueeItems: string[] = [
  `${siteConfig.stats.registrations} GST registrations filed`,
  `${siteConfig.stats.activeClients} active monthly clients`,
  "Filed within 24 hours of your documents",
  `Real replies in ${siteConfig.responseTime}`,
  "Pan-India, fully remote",
  "WhatsApp-first onboarding",
  "Plans from ₹999",
  "No hidden fees, no quote forms",
];

// ---------------------------------------------------------------------------
// Review badges.
//
// !! EMPTY BY DESIGN — FILL THIS IN !!
// Add your real Google Business Profile rating and review count here and the
// badge row appears on the homepage. Leave it empty and nothing renders.
//
//   { id: "google", label: "Google Reviews", rating: "4.8", count: "127",
//     href: "https://g.page/r/..." }
//
// NOTE: do NOT add AggregateRating JSON-LD off the back of this without
// verifying the numbers against the live profile. See the comment at the top
// of src/data/testimonials.ts — this codebase deliberately avoids review
// schema it cannot stand behind.
// ---------------------------------------------------------------------------

export interface ReviewSource {
  id: string;
  label: string;
  /** e.g. "4.8" */
  rating: string;
  /** e.g. "127" */
  count: string;
  /** Link to the public profile, so the claim is checkable. */
  href?: string;
}

export const reviewSources: ReviewSource[] = [];

// ---------------------------------------------------------------------------
// Trust logo strip.
//
// !! EMPTY BY DESIGN — FILL THIS IN !!
// Drop the image files into /public/logos/ and list them here. Only use logos
// you actually have the right to display: a regulator's logo implies approval
// you may not have, and a publication's logo implies coverage that has to be
// real.
//
//   { src: "/logos/msme.svg", alt: "MSME registered", width: 120, height: 40 }
// ---------------------------------------------------------------------------

export interface TrustLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const trustLogos: TrustLogo[] = [];

/** Heading for the logo strip, only used when trustLogos is non-empty. */
export const trustLogosHeading = "Recognised by";

// ---------------------------------------------------------------------------
// Comparison table. Every claim below is one the site already makes on the
// pricing page or in src/data/services.ts.
// ---------------------------------------------------------------------------

export interface ComparisonRow {
  dimension: string;
  ours: string;
  theirs: string;
}

export const comparisonRows: ComparisonRow[] = [
  {
    dimension: "What it costs",
    ours: "Plans from ₹999, published on the pricing page",
    theirs: "₹10,000 or more a year on retainer, quoted case by case",
  },
  {
    dimension: "How you reach us",
    ours: "WhatsApp, on the phone you already use all day",
    theirs: "Office visits and phone calls during office hours",
  },
  {
    dimension: "How fast you hear back",
    ours: `Replies in ${siteConfig.responseTime} during business hours`,
    theirs: "Whenever the CA gets to your file",
  },
  {
    dimension: "Turnaround",
    ours: "Filed within 24 hours of receiving documents and payment",
    theirs: "Dependent on the practice's workload that week",
  },
  {
    dimension: "What you pay for",
    ours: "One price covering the whole job, stated upfront",
    theirs: "Separate charges added per task as they come up",
  },
  {
    dimension: "Where your documents live",
    ours: "Uploaded once, tracked through to completion",
    theirs: "Emailed back and forth, or carried in physically",
  },
];
