// District lookup — deliberately NOT a page source.
//
// India has roughly 780 districts, and the single most expensive mistake in a
// programmatic location build is treating that as 780 pages per service. Almost
// nobody searches a district name unless the district shares its name with the
// commercial city ("GST registration in Howrah", never "in Purba Bardhaman
// district"). So districts get one of three treatments:
//
//   1. District name IS the city name  -> it is already a city entry in
//      geo/cities.ts and gets a normal L2 page. `hasOwnPage` is derived, not
//      hand-maintained, so the two files cannot drift apart.
//   2. District with a distinct HQ town -> the HQ town may earn a city entry on
//      GSC evidence; the district itself is a table row.
//   3. Rural / low-demand district      -> a linked row in the district table on
//      its state page, forever. Never a standalone URL.
//
// The full 780-row table is a data-entry task, not a generation task: it is the
// one dataset here where a wrong row is cheap and a *fabricated* row is not.
// Rows are added as states reach Phase 2. `districtTableReady()` tells the state
// page whether it has enough rows to render the table at all.

import { geoCities } from "./cities";

export interface District {
  name: string;
  slug: string;
  stateSlug: string;
  /** The commercial town that actually serves the district. */
  hqTown: string;
}

/**
 * Districts entered so far. Only add rows you can source; an incomplete table on
 * a state page is fine, an inaccurate one is not.
 */
export const districts: District[] = [];

/**
 * A district has its own page only when a city entry with the same name exists.
 * Derived, so adding a city can never leave a stale `hasOwnPage: true` behind.
 */
export function hasOwnPage(district: Pick<District, "name" | "stateSlug">): boolean {
  return geoCities.some(
    (c) => c.stateSlug === district.stateSlug && c.districtName === district.name,
  );
}

export function districtsInState(stateSlug: string): District[] {
  return districts.filter((d) => d.stateSlug === stateSlug);
}

/** The state page renders its district table only once the state has real rows. */
export function districtTableReady(stateSlug: string): boolean {
  return districtsInState(stateSlug).length > 0;
}
