// Shape of per-place copy for a service, for every level below the pillar.
//
// The indexation gate lives here. `contentStatus` starts at "draft" and
// generateStaticParams filters on "ready", so a place that has not been through
// the pre-publish QA has no route at all — it cannot be crawled, cannot be
// indexed, and cannot be linked to by accident. Nothing flips to "ready" from a
// generation run; a human moves it, after clearing `verify`.

export type ContentStatus = "draft" | "ready";

export interface StateCopy {
  stateSlug: string;

  /**
   * 70-110 words. The single differentiating paragraph, and the reason this
   * page is allowed to exist. It must open with something true about doing this
   * service in this state, not about the state.
   */
  intro: string;

  /**
   * 3-5 concrete statutory bullets: professional tax, stamp duty, Shops &
   * Establishments, GST state code, RoC office. Concrete figures wherever they
   * exist — and a `VERIFY:` prefix wherever they do not yet.
   */
  statutory: string[];

  /** Which offices and authorities actually process this here. */
  jurisdiction: string;

  /** The all-in cost in this state and why it differs. null where it genuinely doesn't. */
  costNote: string | null;

  /**
   * Real delivery proof for this state, or null. Never invented, never a client
   * count we cannot stand behind — this is the one source a competitor cannot
   * copy, and the one that does the most damage if it is fiction.
   */
  proof: string | null;

  faqIds: string[];

  contentStatus: ContentStatus;

  /** Figures a human must check against source before contentStatus may become "ready". */
  verify: string[];
}
