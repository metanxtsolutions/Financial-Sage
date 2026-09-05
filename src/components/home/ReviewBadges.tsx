import { reviewSources } from "@/data/trust";

function Stars({ rating }: { rating: string }) {
  const value = Number(rating);
  // Fill proportionally rather than rounding. Rounding 4.8 up to five full
  // stars overstates the rating, which is the one thing a trust signal must
  // not do.
  const filled = Number.isFinite(value) ? Math.max(0, Math.min(100, (value / 5) * 100)) : 0;
  return (
    <span aria-hidden="true" className="relative inline-block leading-none whitespace-nowrap">
      <span className="text-white/25">★★★★★</span>
      <span
        className="absolute inset-y-0 left-0 overflow-hidden text-gold-400"
        style={{ width: `${filled}%` }}
      >
        ★★★★★
      </span>
    </span>
  );
}

// Renders nothing until real rating data is added to src/data/trust.ts.
// Placeholder social proof is worse than none.
export function ReviewBadges() {
  if (reviewSources.length === 0) return null;

  return (
    <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
      {reviewSources.map((source) => {
        const body = (
          <>
            <Stars rating={source.rating} />
            <span className="text-sm font-semibold text-white">{source.rating} out of 5</span>
            <span className="text-sm text-white/50">({source.count})</span>
          </>
        );

        return source.href ? (
          <a
            key={source.id}
            href={source.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg transition-opacity hover:opacity-80"
          >
            <span className="sr-only">{source.label}: </span>
            {body}
          </a>
        ) : (
          <div key={source.id} className="flex items-center gap-2">
            <span className="sr-only">{source.label}: </span>
            {body}
          </div>
        );
      })}
    </div>
  );
}
