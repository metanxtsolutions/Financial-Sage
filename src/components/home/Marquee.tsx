import { marqueeItems } from "@/data/trust";

// A single scrolling strip of checkable facts. The track holds the list twice
// so the -50% translation loops seamlessly; the duplicate is hidden from
// assistive tech. Motion is disabled under prefers-reduced-motion (see
// globals.css), where it simply becomes a static, scrollable row.
export function Marquee() {
  if (marqueeItems.length === 0) return null;

  return (
    <div className="border-y border-neutral-200 bg-neutral-50 py-4">
      <div className="marquee">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center gap-8 pr-8"
            >
              {marqueeItems.map((item) => (
                <li key={item} className="flex items-center gap-2.5 whitespace-nowrap">
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  <span className="text-sm font-medium text-neutral-700">{item}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
