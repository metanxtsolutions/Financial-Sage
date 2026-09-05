// Module resolution for scripts run under Node's native TypeScript support, so
// the checks import exactly the same modules the app imports. No build step and
// no extra dependency.
//
// Two things Node's ESM resolver will not do on its own and TypeScript expects:
//   - the "@/*" -> "src/*" tsconfig path alias
//   - extensionless specifiers ("./types", "@/data/services/copy") resolving to
//     a .ts/.tsx file or to a directory's index.ts
import { statSync } from "node:fs";
import { pathToFileURL, fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
// "" first, so an explicit extension in the specifier always wins.
const CANDIDATES = ["", ".ts", ".tsx", ".mjs", ".js", "/index.ts", "/index.tsx"];

// isFile(), not existsSync(): a bare directory path matches "" and would
// otherwise be handed back as a directory import, which ESM rejects.
function firstFile(base) {
  for (const ext of CANDIDATES) {
    const candidate = base + ext;
    if (statSync(candidate, { throwIfNoEntry: false })?.isFile()) return candidate;
  }
  return null;
}

export function resolve(specifier, context, next) {
  if (specifier.startsWith("@/")) {
    const resolved = firstFile(path.join(ROOT, "src", specifier.slice(2)));
    if (!resolved) throw new Error(`alias-loader: could not resolve "${specifier}" under src/`);
    return next(pathToFileURL(resolved).href, context);
  }

  if ((specifier.startsWith("./") || specifier.startsWith("../")) && context.parentURL?.startsWith("file:")) {
    const resolved = firstFile(path.resolve(path.dirname(fileURLToPath(context.parentURL)), specifier));
    if (resolved) return next(pathToFileURL(resolved).href, context);
  }

  return next(specifier, context);
}
