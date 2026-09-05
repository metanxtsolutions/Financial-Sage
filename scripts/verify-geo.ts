// Prints the VERIFY backlog across the geo dataset.
//
// Every statutory figure in src/data/geo is written as a claim a human still has
// to check against the source. Nothing built on an unchecked claim may flip to
// contentStatus "ready": a page that ranks and hands a business owner the wrong
// professional-tax number costs more than the page earns.
//
// Run: npm run verify:geo

import { states } from "@/data/geo/states";
import { geoCities } from "@/data/geo/cities";

let outstanding = 0;

console.log("\n=== STATES — statutory facts awaiting verification ===\n");
for (const state of states) {
  if (state.verify.length === 0) continue;
  outstanding += state.verify.length;
  console.log(`${state.name}  (GST code ${state.gstStateCode}, ${state.rocOffice})`);
  for (const item of state.verify) console.log(`    [ ] ${item}`);
  console.log("");
}

const citiesNeedingWork = geoCities.filter((c) => (c.verify?.length ?? 0) > 0);
console.log("=== CITIES — local material awaiting research ===\n");
for (const city of citiesNeedingWork) {
  outstanding += city.verify!.length;
  console.log(`${city.name}, ${city.stateSlug}  (tier ${city.tier})`);
  for (const item of city.verify!) console.log(`    [ ] ${item}`);
}

const notPageReady = geoCities.filter((c) => c.hubs.length === 0 || c.sectors.length === 0);
console.log("\n=== NOT PAGE-READY — no hubs or no sectors, so no page ===\n");
console.log(
  notPageReady.length === 0
    ? "  (none)"
    : notPageReady.map((c) => `  ${c.name} (${c.stateSlug})`).join("\n"),
);

console.log(`\n${outstanding} item(s) outstanding across ${states.length} states and ${geoCities.length} cities.`);
console.log(`${notPageReady.length} of ${geoCities.length} cities are not page-ready.\n`);
