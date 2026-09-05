// The Phase 2 worklist: what is written, what is published, and what has to be
// checked before anything can be published.
//
// contentStatus is the indexation gate — generateStaticParams filters on
// "ready", so a draft state has no route, no sitemap entry and no internal
// link. This report is what you work through to move one across.
//
// Run: npm run content:status

import { states } from "@/data/geo/states";
import { allStatePages, stateServiceIds } from "@/data/services/copy";

let readyTotal = 0;
let draftTotal = 0;
let verifyTotal = 0;

for (const serviceId of stateServiceIds) {
  const pages = allStatePages(serviceId);
  const ready = pages.filter((p) => p.copy.contentStatus === "ready");
  const draft = pages.filter((p) => p.copy.contentStatus === "draft");
  readyTotal += ready.length;
  draftTotal += draft.length;

  console.log(`\n=== ${serviceId} ===`);
  console.log(
    `  ${ready.length} ready (live), ${draft.length} draft (no route), ` +
      `${states.length - pages.length} states with no copy written yet\n`,
  );

  for (const { state, copy } of draft) {
    verifyTotal += copy.verify.length;
    console.log(`  ${state.name} — draft, ${copy.verify.length} item(s) to check:`);
    for (const item of copy.verify) console.log(`      [ ] ${item}`);
  }

  const missing = states.filter((s) => !pages.some((p) => p.state.slug === s.slug));
  if (missing.length > 0) {
    console.log(`\n  No copy yet (${missing.length}): ${missing.map((s) => s.name).join(", ")}`);
  }
}

console.log(
  `\n${readyTotal} state page(s) live, ${draftTotal} drafted and gated, ` +
    `${verifyTotal} verification item(s) blocking publication.\n`,
);
if (readyTotal === 0) {
  console.log("No state page is live. That is correct while every entry is draft.\n");
}
