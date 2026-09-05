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
// Review badges. Real figures from the Google Business Profile, supplied by
// the owner. Keep them in step with the live profile: a rating shown here that
// no longer matches the one a visitor finds on Google is worse than showing
// nothing at all.
//
// `href` is intentionally absent until the public profile URL is added. A
// checkable claim beats an unverifiable one, so add the g.page or Maps link
// and the badge becomes a link to it automatically.
//
// NOTE: deliberately NOT marked up as AggregateRating JSON-LD. Google does not
// permit self-serving aggregate-rating markup for an Organization or
// LocalBusiness, and ratings aggregated from Google itself may not be marked
// up on your own site. Displaying the number is fine; marking it up risks a
// manual action. Same reasoning as the note atop src/data/testimonials.ts.
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

export const reviewSources: ReviewSource[] = [
  {
    id: "google",
    label: "Google Reviews",
    rating: "4.8",
    count: "63",
  },
];

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
