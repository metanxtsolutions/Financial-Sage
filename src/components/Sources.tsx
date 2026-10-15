import clsx from "clsx";
import { getSources, type SourceId } from "@/data/sources";
import { formatDate } from "@/lib/dates";

// Where the rules on a page are officially published.
//
// The wording is careful about what it claims. Listing a source says "this is
// the government's own page for this", which is always true. It does not say
// the figures on the page were checked against it. That second claim is made
// only through `verified`, which takes a real date from the data file that
// records the check.
//
// Renders nothing for an empty list, so a template can pass whatever
// src/data/sources.ts returns without checking it first.
export function Sources({
  ids,
  verified,
  className,
}: {
  ids: readonly SourceId[];
  /** A recorded check of this page's figures against one of the sources. */
  verified?: { date: string; what: string; against: SourceId };
  className?: string;
}) {
  if (ids.length === 0) return null;
  const list = getSources(ids);
  const against = verified ? list.find((s) => s.id === verified.against) : undefined;

  return (
    <section
      aria-labelledby="sources-heading"
      className={clsx("rounded-xl border border-neutral-200 bg-neutral-50 p-5", className)}
    >
      <h2 id="sources-heading" className="text-base font-bold text-neutral-900">
        Official sources
      </h2>
      <p className="mt-1 text-sm text-neutral-600">
        The rules, rates and deadlines described here are set by the government and do change.
        This is where they are officially published:
      </p>
      <ul className="mt-3 space-y-2 text-sm">
        {list.map((source) => (
          <li key={source.id}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-700 underline"
            >
              {source.title}
            </a>
            <span className="text-neutral-500">, {source.publisher}</span>
          </li>
        ))}
      </ul>
      {verified && against && (
        <p className="mt-3 text-sm text-neutral-600">
          {verified.what} last checked against the {against.publisher.split(",")[0]}&apos;s
          published figures on <time dateTime={verified.date}>{formatDate(verified.date)}</time>.
        </p>
      )}
    </section>
  );
}
