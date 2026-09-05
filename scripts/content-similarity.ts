// The differentiation gate.
//
// Pairwise 5-gram Jaccard similarity across the location pages of each service.
// Above the ceiling the build fails, because near-duplicate location pages do
// not compete as N pages — Google deduplicates them before ranking is
// considered, and they spend crawl budget you would rather spend elsewhere.
//
// Two deliberate choices about what gets compared:
//
//  1. Only the DIFFERENTIATING copy is measured — the per-place intro, the local
//     demand paragraph, the sector mix. Shared components (documents, process,
//     pricing) are excluded on purpose: they are the boilerplate a reader
//     genuinely wants, and including them would drown the signal in text that is
//     identical by design. Duplication is only a problem when the differentiating
//     sections are also duplicated, and that is exactly what this measures.
//
//  2. Place names are MASKED before comparison. The rule this enforces is "no
//     sentence may be reachable by find-replacing a place name in another page's
//     sentence", so the check replaces every city name, state name, slug and
//     alias with a single token first. Two pages that differ only by their place
//     name score 1.0 here, which is the honest answer.
//
// Run: npm run check:similarity

import { cities } from "@/data/cities";
import { getLocationPages, locationServiceIds } from "@/data/service-locations";
import { geoCities } from "@/data/geo/cities";
import { states } from "@/data/geo/states";

const CEILING = 0.65;
const NGRAM = 5;
const WORST_PAIRS_SHOWN = 20;

interface Doc {
  id: string;
  text: string;
  /** Place names to mask out before comparing. */
  placeNames: string[];
}

interface ServiceDocs {
  service: string;
  docs: Doc[];
}

function placeNamesFor(stateSlug: string, citySlug: string, cityName: string, stateName: string): string[] {
  const geoCity = geoCities.find((c) => c.slug === citySlug);
  const state = states.find((s) => s.slug === stateSlug);
  return [
    cityName,
    stateName,
    citySlug.replace(/-/g, " "),
    stateSlug.replace(/-/g, " "),
    ...(geoCity?.aliases ?? []).map((a) => a.replace(/-/g, " ")),
    ...(state?.aliases ?? []).map((a) => a.replace(/-/g, " ")),
    ...(geoCity?.hubs ?? []),
  ].filter(Boolean);
}

function collect(): ServiceDocs[] {
  const out: ServiceDocs[] = [];

  out.push({
    service: "gst-registration",
    docs: cities.map((c) => ({
      id: `/gst-registration/${c.stateSlug}/${c.citySlug}`,
      text: [c.localNote, c.localSectors].join(" "),
      placeNames: placeNamesFor(c.stateSlug, c.citySlug, c.city, c.state),
    })),
  });

  for (const serviceId of locationServiceIds) {
    out.push({
      service: serviceId,
      docs: getLocationPages(serviceId).map(({ city, copy }) => ({
        id: `/${serviceId}/${city.stateSlug}/${city.citySlug}`,
        text: [copy.intro, copy.demand].join(" "),
        placeNames: placeNamesFor(city.stateSlug, city.citySlug, city.city, city.state),
      })),
    });
  }

  return out;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalise(doc: Doc): string[] {
  let text = doc.text;
  // Longest first, so "Navi Mumbai" is masked before "Mumbai" can partially match.
  for (const name of [...doc.placeNames].sort((a, b) => b.length - a.length)) {
    text = text.replace(new RegExp(escapeRegExp(name), "gi"), " PLACE ");
  }
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function ngrams(words: string[], n: number): Set<string> {
  const set = new Set<string>();
  for (let i = 0; i + n <= words.length; i++) set.add(words.slice(i, i + n).join(" "));
  return set;
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 1;
  let shared = 0;
  for (const gram of a) if (b.has(gram)) shared++;
  return shared / (a.size + b.size - shared);
}

const results: { service: string; a: string; b: string; score: number }[] = [];
const thin: string[] = [];

for (const { service, docs } of collect()) {
  const grams = docs.map((doc) => {
    const words = normalise(doc);
    if (words.length < NGRAM * 4) thin.push(`${doc.id} (${words.length} words of differentiating copy)`);
    return { id: doc.id, set: ngrams(words, NGRAM) };
  });

  for (let i = 0; i < grams.length; i++) {
    for (let j = i + 1; j < grams.length; j++) {
      results.push({
        service,
        a: grams[i].id,
        b: grams[j].id,
        score: jaccard(grams[i].set, grams[j].set),
      });
    }
  }
}

results.sort((x, y) => y.score - x.score);

console.log(`\nPairwise ${NGRAM}-gram Jaccard, place names masked. Ceiling ${CEILING}.\n`);
console.log(`Worst ${Math.min(WORST_PAIRS_SHOWN, results.length)} of ${results.length} pairs:\n`);
for (const r of results.slice(0, WORST_PAIRS_SHOWN)) {
  const flag = r.score > CEILING ? "FAIL" : "ok  ";
  console.log(`  ${flag}  ${r.score.toFixed(3)}  ${r.a}\n              ${r.b}`);
}

if (thin.length > 0) {
  console.log(`\nThin differentiating copy (under ${NGRAM * 4} words), which is its own problem:`);
  for (const id of thin) console.log(`  - ${id}`);
}

const failures = results.filter((r) => r.score > CEILING);
console.log(`\n${failures.length} pair(s) above the ${CEILING} ceiling.\n`);
process.exit(failures.length > 0 ? 1 : 0);
