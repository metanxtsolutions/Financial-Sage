"use client";

import { useMemo, useState } from "react";
import { searchHsnSac } from "@/data/hsn-sac";

export function HsnSacSearchTool() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchHsnSac(query).slice(0, 15), [query]);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-neutral-700">
        Search by code or product/service name
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. laptop, restaurant, consulting, 9983"
          className="mt-1 w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none"
        />
      </label>

      {query && results.length === 0 && (
        <p className="text-sm text-neutral-500">No matches in our reference list. Check the official CBIC rate finder for an exhaustive search.</p>
      )}

      {results.length > 0 && (
        <div className="divide-y divide-neutral-200 rounded-lg border border-neutral-200">
          {results.map((r) => (
            <div key={r.code} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
              <div>
                <span className="font-mono font-semibold text-neutral-900">{r.code}</span>
                <span className="ml-2 text-xs uppercase text-neutral-400">{r.type}</span>
                <div className="text-neutral-600">{r.description}</div>
              </div>
              <div className="shrink-0 font-semibold text-brand-700">{r.gstRate}</div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-neutral-500">
        * Rates marked with an asterisk vary by sub-category or conditions (e.g. ITC availed vs
        not). This is a reference subset, not exhaustive, so confirm on the official CBIC rate finder
        for final classification.
      </p>
    </div>
  );
}
