// State copy, keyed by service, plus the accessors that enforce the
// indexation gate.
//
// publishedStates() is the ONLY thing route files may call from
// generateStaticParams. It filters on contentStatus === "ready", so a state
// whose statutory figures have not been checked has no route, 404s, and cannot
// end up in the sitemap or the internal link graph. Draft is not "hidden" — it
// genuinely does not exist as a URL.

import { getState, type StateEntry } from "@/data/geo/states";
import { gstRegistrationStateCopy } from "./gst-registration";
import { companyRegistrationStateCopy } from "./company-registration";
import type { StateCopy } from "./types";

export type { StateCopy, ContentStatus } from "./types";

/** Services with a state layer. Both are locationTier 3 in the registry. */
export type StateServiceId = "gst-registration" | "company-registration";

export const stateServiceIds: StateServiceId[] = ["gst-registration", "company-registration"];

const stateCopyByService: Record<StateServiceId, StateCopy[]> = {
  "gst-registration": gstRegistrationStateCopy,
  "company-registration": companyRegistrationStateCopy,
};

export interface StatePage {
  state: StateEntry;
  copy: StateCopy;
}

function pair(copy: StateCopy): StatePage | null {
  const state = getState(copy.stateSlug);
  if (!state) {
    // A copy entry for a state that is not in the geo dataset is a typo, and a
    // silently missing page is exactly the failure this whole layer exists to
    // avoid. Fail the build rather than render nothing.
    throw new Error(
      `State copy references unknown state slug "${copy.stateSlug}". Add it to src/data/geo/states.ts or fix the slug.`,
    );
  }
  return { state, copy };
}

/** Every state with copy written, draft or ready. For the QA and verify reports. */
export function allStatePages(serviceId: StateServiceId): StatePage[] {
  return stateCopyByService[serviceId].flatMap((copy) => {
    const page = pair(copy);
    return page ? [page] : [];
  });
}

/** The indexation gate: only these get a route, a sitemap entry, or a link. */
export function publishedStates(serviceId: StateServiceId): StatePage[] {
  return allStatePages(serviceId).filter(({ copy }) => copy.contentStatus === "ready");
}

export function draftStates(serviceId: StateServiceId): StatePage[] {
  return allStatePages(serviceId).filter(({ copy }) => copy.contentStatus === "draft");
}

/** Resolves a published state only. A draft slug returns undefined, so the route 404s. */
export function getPublishedState(
  serviceId: StateServiceId,
  stateSlug: string,
): StatePage | undefined {
  return publishedStates(serviceId).find(({ state }) => state.slug === stateSlug);
}

export function isStateService(id: string): id is StateServiceId {
  return stateServiceIds.includes(id as StateServiceId);
}
