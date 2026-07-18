// Basic in-memory rate limiting for the lead form. Good enough to stop naive
// bots/spam bursts; note it resets per server instance/cold start, so it is
// not a substitute for a real rate-limiting service at high scale.

const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(key, timestamps);
  return timestamps.length > MAX_REQUESTS;
}
