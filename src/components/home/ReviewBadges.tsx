import { reviewSources } from "@/data/trust";

function Stars({ rating }: { rating: string }) {
  const value = Number(rating);
  const rounded = Number.isFinite(value) ? Math.round(value) : 0;
  return (
    <span aria-hidden="true" className="text-gold-400">
      {"★".repeat(Math.min(5, rounded))}
      <span className="text-white/25">{"★".repeat(Math.max(0, 5 - rounded))}</span>
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
