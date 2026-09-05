// Resolves the "@/*" -> "src/*" tsconfig path alias for scripts run under
// Node's native TypeScript support, so the checks below import exactly the same
// modules the app imports. No build step, no extra dependency.
import { existsSync } from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const CANDIDATES = ["", ".ts", ".tsx", "/index.ts", "/index.tsx"];

export function resolve(specifier, context, next) {
  if (specifier.startsWith("@/")) {
    const base = path.join(ROOT, "src", specifier.slice(2));
    for (const ext of CANDIDATES) {
      const candidate = base + ext;
      if (existsSync(candidate)) {
        return next(pathToFileURL(candidate).href, context);
      }
    }
    throw new Error(`alias-loader: could not resolve "${specifier}" under src/`);
  }
  return next(specifier, context);
}
