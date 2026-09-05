"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import type { SearchEntry } from "@/lib/search-index";

const MAX_RESULTS = 8;

/**
 * Header search over the whole site. The index arrives as a prop built on the
 * server, so this component only has to filter it.
 *
 * Matching is a simple case-insensitive substring on the title, with entries
 * whose title starts with the query ranked first. Nothing cleverer is
 * warranted at ~180 entries, and a fuzzy library would cost more bundle than
 * the index itself.
 */
export function SiteSearch({ index, onHero }: { index: SearchEntry[]; onHero: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const matches = index.filter((e) => e.title.toLowerCase().includes(q));
    matches.sort((a, b) => {
      const aStarts = a.title.toLowerCase().startsWith(q) ? 0 : 1;
      const bStarts = b.title.toLowerCase().startsWith(q) ? 0 : 1;
      if (aStarts !== bStarts) return aStarts - bStarts;
      return a.title.length - b.title.length;
    });
    return matches.slice(0, MAX_RESULTS);
  }, [query, index]);

  // Reset the highlighted row whenever the result set changes.
  const [lastQuery, setLastQuery] = useState(query);
  if (query !== lastQuery) {
    setLastQuery(query);
    setActive(0);
  }

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Cmd/Ctrl+K opens it, Escape closes it.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function go(href: string) {
    setOpen(false);
    setQuery("");
    router.push(href);
  }

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (results.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      go(results[active].href);
    }
  }

  return (
    <>
      <button
        type="button"
        aria-label="Search the site"
        onClick={() => setOpen(true)}
        className={clsx(
          "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
          onHero ? "text-white/70 hover:bg-white/10 hover:text-white" : "text-neutral-500 hover:bg-neutral-100 hover:text-brand-700",
        )}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-neutral-900/40 px-4 pt-[12vh] backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-card-hover"
          >
            <div className="flex items-center gap-3 border-b border-neutral-200 px-4">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true" className="shrink-0 text-neutral-400">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Search services, tools, guides, cities…"
                aria-label="Search services, tools, guides and cities"
                className="w-full bg-transparent py-4 text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
              />
              <kbd className="hidden shrink-0 rounded border border-neutral-200 px-1.5 py-0.5 text-[10px] font-medium text-neutral-400 sm:block">
                Esc
              </kbd>
            </div>

            {query.trim().length >= 2 && (
              <ul className="max-h-[52vh] overflow-y-auto py-2">
                {results.length === 0 && (
                  <li className="px-4 py-6 text-center text-sm text-neutral-500">
                    Nothing matched “{query.trim()}”. Try a service name, a form number, or a city.
                  </li>
                )}
                {results.map((entry, i) => (
                  <li key={entry.href}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(entry.href)}
                      className={clsx(
                        "flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left",
                        i === active ? "bg-brand-50" : "hover:bg-neutral-50",
                      )}
                    >
                      <span className="text-sm font-medium text-neutral-900">{entry.title}</span>
                      <span className="shrink-0 text-xs text-neutral-400">{entry.group}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {query.trim().length < 2 && (
              <p className="px-4 py-5 text-sm text-neutral-500">
                Type at least two characters. Everything is searchable: {index.length} services,
                tools, guides and city pages.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
