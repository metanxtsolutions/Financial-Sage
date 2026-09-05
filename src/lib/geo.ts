// Path construction for location pages, in one place.
//
// The reason this is not an inline template string: three UTs (Delhi,
// Chandigarh, Puducherry) are the same thing as their principal city, so the
// naive /service/state/city form produces /gst-registration/delhi/delhi — a
// doubled segment nobody would type or link to. Those render one level up.

import { getState, states, type StateEntry } from "@/data/geo/states";
import { type GeoCity } from "@/data/geo/cities";

export type LocationLevel = "pillar" | "state" | "city" | "locality";

export interface Place {
  level: LocationLevel;
  stateSlug: string;
  citySlug?: string;
  localitySlug?: string;
}

/** True where the territory and its principal city are the same place. */
export function isSingleSegment(stateSlug: string): boolean {
  return getState(stateSlug)?.singleSegment === true;
}

/**
 * Whether the L1 state routes (/service/<state>) exist yet.
 *
 * This is the switch for the singleSegment migration, and it is deliberately a
 * constant rather than a silent behaviour change. Delhi's city page is live and
 * indexed at /gst-registration/delhi/delhi today. Collapsing it to
 * /gst-registration/delhi before the state route renders would put a 404 in the
 * sitemap and drop a page that currently earns.
 *
 * Flip to true in Phase 2, in the same change that:
 *   1. ships src/app/<service>/[state]/page.tsx for every localisable service,
 *   2. adds the permanent redirects from doubledSegmentPaths() to next.config.ts,
 *   3. re-runs `npm run check:sitemap` to confirm the swap is the only diff.
 */
export const STATE_ROUTES_LIVE = false;

/**
 * The canonical path for a place under a service.
 *
 * A city page in a singleSegment UT collapses onto its state path, because the
 * two would otherwise be the same page at two URLs.
 */
export function locationPath(routeBase: string, place: Place): string {
  const { stateSlug, citySlug, localitySlug } = place;
  if (STATE_ROUTES_LIVE && isSingleSegment(stateSlug)) {
    return localitySlug
      ? `${routeBase}/${stateSlug}/${localitySlug}`
      : `${routeBase}/${stateSlug}`;
  }
  if (localitySlug && citySlug) return `${routeBase}/${stateSlug}/${citySlug}/${localitySlug}`;
  if (citySlug) return `${routeBase}/${stateSlug}/${citySlug}`;
  return `${routeBase}/${stateSlug}`;
}

export function cityPath(routeBase: string, city: Pick<GeoCity, "stateSlug" | "slug">): string {
  return locationPath(routeBase, {
    level: "city",
    stateSlug: city.stateSlug,
    citySlug: city.slug,
  });
}

export function statePath(routeBase: string, state: Pick<StateEntry, "slug">): string {
  return locationPath(routeBase, { level: "state", stateSlug: state.slug });
}

/**
 * Every doubled path that a singleSegment UT would otherwise have produced, so
 * next.config.ts can emit a permanent redirect for each. These URLs are live
 * today (/gst-registration/delhi/delhi is indexed), so they must be redirected
 * rather than dropped — see the migration note in src/app/sitemap.ts.
 */
export function doubledSegmentPaths(routeBase: string): { from: string; to: string }[] {
  return states
    .filter((s) => s.singleSegment)
    .map((s) => ({
      from: `${routeBase}/${s.slug}/${s.slug}`,
      to: `${routeBase}/${s.slug}`,
    }));
}
