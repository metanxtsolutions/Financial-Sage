// Reports pages whose source has changed since the date recorded for them.
//
// The dates in src/data/content-dates.ts and in each guide's frontmatter are
// what the site publishes as "Last updated", dateModified and <lastmod>. They
// are written by hand, on purpose, so that they move only when the copy does.
// The cost of that is that someone can change a page and forget the date. This
// is the check for it: it reads git history for the file behind each page and
// lists every page where the file is newer than the date.
//
// It reports and exits 0. A newer file is a question, not a failure: the commit
// may have restyled the page without changing a word. If so, add its hash to
// scripts/content-dates-ignore.txt. If the copy did change, update the date.
//
// Run: npm run content:dates            (report)
//      npm run content:dates -- --strict (exit 1 if anything is listed, for CI)

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { clusterDates, pageDates } from "@/data/content-dates";
import { getAllPosts } from "@/lib/blog";

const strict = process.argv.includes("--strict");
const ignoreFile = path.join(import.meta.dirname, "content-dates-ignore.txt");
const ignored = new Set(
  readFileSync(ignoreFile, "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^[0-9a-f]{40}$/.test(line)),
);

const git = (args: string[]) =>
  execFileSync("git", args, { encoding: "utf8", maxBuffer: 1 << 28 });

const isDirty = (file: string) => git(["status", "--porcelain", "--", file]).trim() !== "";

/** Date of the newest commit to touch the file, skipping ignored commits. */
function lastChanged(file: string): string | undefined {
  const commits = git(["log", "--format=%H %cs", "--", file]).trim().split("\n").filter(Boolean);
  for (const commit of commits) {
    const [hash, date] = commit.split(" ");
    if (!ignored.has(hash)) return date;
  }
  return undefined;
}

/**
 * For a data file holding many pages: the newest line of each entry, by git
 * blame. An entry runs from its `slug: "..."` line to the next one.
 */
function lastChangedPerEntry(file: string): Map<string, string> {
  const blame = git(["blame", "--line-porcelain", "--ignore-revs-file", ignoreFile, file]);
  const newest = new Map<string, string>();
  let date = "";
  let slug: string | undefined;
  let seconds = 0;
  for (const line of blame.split("\n")) {
    if (line.startsWith("committer-time ")) seconds = Number(line.slice("committer-time ".length));
    else if (line.startsWith("committer-tz ")) {
      // Shift to the committer's own zone so the date matches `git log`.
      const tz = line.slice("committer-tz ".length);
      const offset = (tz.startsWith("-") ? -1 : 1) * (Number(tz.slice(1, 3)) * 3600 + Number(tz.slice(3, 5)) * 60);
      date = new Date((seconds + offset) * 1000).toISOString().slice(0, 10);
    } else if (line.startsWith("\t")) {
      const match = line.match(/^\t\s*slug:\s*"([^"]+)"/);
      if (match) slug = match[1];
      if (slug && date > (newest.get(slug) ?? "")) newest.set(slug, date);
    }
  }
  return newest;
}

interface Row {
  page: string;
  recorded: string;
  changed: string;
  where: string;
}

const stale: Row[] = [];
const uncommitted: string[] = [];
let checked = 0;

function check(page: string, recorded: string, file: string, changed: string | undefined, where: string) {
  checked++;
  if (isDirty(file)) uncommitted.push(`${page}  (${file})`);
  if (changed && changed > recorded) stale.push({ page, recorded, changed, where });
}

// Cluster pages share one data file, so they are dated per entry.
const clusterFile = "src/data/gst-clusters.ts";
const clusterChanged = lastChangedPerEntry(clusterFile);
const clusterPaths = new Set(Object.keys(clusterDates).map((slug) => `/${slug}`));

for (const [page, recorded] of Object.entries(pageDates)) {
  if (clusterPaths.has(page)) {
    check(page, recorded, clusterFile, clusterChanged.get(page.slice(1)), "src/data/content-dates.ts");
    continue;
  }
  const file = `src/app${page}/page.tsx`;
  if (!existsSync(file)) {
    console.error(`No route file for "${page}" (looked for ${file}). Remove it from src/data/content-dates.ts or fix the path.`);
    process.exit(1);
  }
  check(page, recorded, file, lastChanged(file), "src/data/content-dates.ts");
}

for (const post of getAllPosts()) {
  const file = `content/gst-guides/${post.slug}.mdx`;
  check(`/gst-guides/${post.slug}`, post.updated ?? post.date, file, lastChanged(file), `"updated" in ${file}`);
}

console.log(`\nChecked ${checked} dated pages against git history (${ignored.size} commits ignored).\n`);

if (uncommitted.length > 0) {
  console.log(`Uncommitted changes (${uncommitted.length}). If the copy changed, set the date before committing:`);
  for (const line of uncommitted) console.log(`  ~ ${line}`);
  console.log("");
}

if (stale.length === 0) {
  console.log("Every recorded date is at least as new as the page's source.\n");
} else {
  console.log(`Source is newer than the recorded date (${stale.length}):`);
  const width = Math.max(...stale.map((row) => row.page.length));
  for (const row of stale) {
    console.log(`  ${row.page.padEnd(width)}  recorded ${row.recorded}  changed ${row.changed}  -> ${row.where}`);
  }
  console.log("\nFor each: if the copy changed, update the date. If only the template or styling");
  console.log("changed, add the commit to scripts/content-dates-ignore.txt.\n");
  if (strict) process.exit(1);
}
