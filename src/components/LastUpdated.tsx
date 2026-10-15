import clsx from "clsx";
import { requirePageDate } from "@/data/content-dates";
import { formatDate } from "@/lib/dates";

// The visible half of a page's freshness signal. The date comes from
// src/data/content-dates.ts, never from the clock, so it only moves when
// someone records that the copy changed.
export function LastUpdated({
  path,
  label = "Last updated",
  className,
}: {
  path: string;
  label?: string;
  className?: string;
}) {
  const date = requirePageDate(path);
  return (
    <p className={clsx("text-sm text-neutral-500", className)}>
      {label} <time dateTime={date}>{formatDate(date)}</time>
    </p>
  );
}
