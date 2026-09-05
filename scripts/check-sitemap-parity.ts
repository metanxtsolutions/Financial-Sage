// Proves the App Router sitemap did not drop anything next-sitemap used to emit.
//
// The migration's one real risk is a silently missing URL: a page that is
// indexed today, disappears from the sitemap, and is quietly dropped over the
// following weeks. This diffs the new URL set against a snapshot of the last
// next-sitemap output.
//
// Additions are reported and allowed — new pages are the point. Removals fail,
// because a URL leaving the sitemap should always be a decision, never a
// side effect.
//
// Run: npm run check:sitemap

import { readFileSync } from "node:fs";
import path from "node:path";
import { allSitemapPaths, sitemapGroups } from "@/lib/sitemap-urls";

const baselineFile = path.join(import.meta.dirname, "sitemap-baseline.txt");
const baseline = new Set(
  readFileSync(baselineFile, "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#")),
);

const current = new Set(allSitemapPaths());

const removed = [...baseline].filter((p) => !current.has(p)).sort();
const added = [...current].filter((p) => !baseline.has(p)).sort();

console.log("\nSitemap groups:");
for (const group of sitemapGroups) {
  console.log(`  /sitemap/${group.id}.xml  ${String(group.urls().length).padStart(4)} URLs  — ${group.label}`);
}
console.log(`  ${" ".repeat(String(current.size).length)}       ${current.size} unique URLs total (baseline: ${baseline.size})\n`);

if (added.length > 0) {
  console.log(`Added since the baseline (${added.length}):`);
  for (const p of added) console.log(`  + ${p}`);
  console.log("");
}

if (removed.length > 0) {
  console.log(`MISSING from the new sitemap (${removed.length}):`);
  for (const p of removed) console.log(`  - ${p}`);
  console.log("\nEach of these is a URL next-sitemap used to publish. Either restore it,");
  console.log("or remove it from scripts/sitemap-baseline.txt with a note saying why.\n");
  process.exit(1);
}

console.log("No URLs dropped.\n");
