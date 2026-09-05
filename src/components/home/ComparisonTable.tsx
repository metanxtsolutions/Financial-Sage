import { comparisonRows } from "@/data/trust";
import { siteConfig } from "@/lib/site-config";

function Tick() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4 shrink-0 text-accent-600">
      <path d="M4 10.5l4 4 8-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Cross() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4 shrink-0 text-neutral-400">
      <path d="M5.5 5.5l9 9M14.5 5.5l-9 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

// A real table, not a grid of divs: this is tabular data and screen readers
// should get the row/column relationships. It scrolls inside its own container
// so the page body never scrolls sideways on a narrow screen.
export function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-card">
      <table className="w-full min-w-[640px] border-collapse text-left">
        <caption className="sr-only">
          {siteConfig.name} compared with a traditional CA retainer
        </caption>
        <thead>
          <tr className="border-b border-neutral-200 bg-neutral-50">
            <th scope="col" className="px-5 py-4 text-xs font-semibold tracking-wide text-neutral-500 uppercase">
              &nbsp;
            </th>
            <th scope="col" className="px-5 py-4 text-sm font-bold text-brand-700">
              {siteConfig.name}
            </th>
            <th scope="col" className="px-5 py-4 text-sm font-semibold text-neutral-500">
              A traditional CA retainer
            </th>
          </tr>
        </thead>
        <tbody>
          {comparisonRows.map((row) => (
            <tr key={row.dimension} className="border-b border-neutral-100 last:border-b-0">
              <th scope="row" className="px-5 py-4 align-top text-sm font-semibold text-neutral-900">
                {row.dimension}
              </th>
              <td className="px-5 py-4 align-top">
                <div className="flex gap-2.5">
                  <Tick />
                  <span className="text-sm text-neutral-700">{row.ours}</span>
                </div>
              </td>
              <td className="px-5 py-4 align-top">
                <div className="flex gap-2.5">
                  <Cross />
                  <span className="text-sm text-neutral-500">{row.theirs}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
