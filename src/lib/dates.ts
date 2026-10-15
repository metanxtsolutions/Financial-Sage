// Date formatting for anything shown to a reader.
//
// Content dates are stored as plain "YYYY-MM-DD". new Date() parses those as
// midnight UTC, so formatting in the build machine's own zone can print the
// previous day west of Greenwich. Pinning the zone to UTC prints the date that
// was written.
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** The later of two "YYYY-MM-DD" dates. Plain string comparison is correct for this format. */
export function laterDate(a: string | undefined, b: string | undefined): string | undefined {
  if (!a) return b;
  if (!b) return a;
  return a > b ? a : b;
}
