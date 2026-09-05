"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { serviceCategories, getServicesByCategory } from "@/data/other-services";

const PREVIEW_COUNT = 8;

// Tabbed browser for the 70-odd services outside the core GST pages. A flat
// grid of everything is unreadable at this size; tabs let someone find their
// category in one glance and see what sits under it without leaving the page.
export function ServiceExplorer() {
  const [activeId, setActiveId] = useState(serviceCategories[0]?.id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = serviceCategories.findIndex((c) => c.id === activeId);
  const active = serviceCategories[activeIndex];
  if (!active) return null;

  const services = getServicesByCategory(active.id);
  const preview = services.slice(0, PREVIEW_COUNT);

  // Arrow keys move between tabs, which is what a tablist is expected to do.
  function onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    const lastIndex = serviceCategories.length - 1;
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") nextIndex = activeIndex === lastIndex ? 0 : activeIndex + 1;
    else if (event.key === "ArrowLeft") nextIndex = activeIndex === 0 ? lastIndex : activeIndex - 1;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = lastIndex;

    if (nextIndex === null) return;
    event.preventDefault();
    setActiveId(serviceCategories[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Service categories"
        className="flex flex-wrap gap-2 border-b border-neutral-200 pb-4"
      >
        {serviceCategories.map((category, index) => {
          const isActive = category.id === active.id;
          return (
            <button
              key={category.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`service-tab-${category.id}`}
              aria-selected={isActive}
              aria-controls={`service-panel-${category.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(category.id)}
              onKeyDown={onKeyDown}
              className={clsx(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                isActive
                  ? "bg-brand-600 text-white shadow-[0_8px_20px_-10px_rgba(37,71,230,0.8)]"
                  : "border border-neutral-200 bg-white text-neutral-700 hover:border-brand-300 hover:text-brand-700",
              )}
            >
              {category.title}
              <span className={clsx("ml-2 text-xs", isActive ? "text-white/70" : "text-neutral-400")}>
                {getServicesByCategory(category.id).length}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`service-panel-${active.id}`}
        aria-labelledby={`service-tab-${active.id}`}
        tabIndex={0}
        className="mt-6 focus-visible:outline-none"
      >
        <p className="max-w-2xl text-neutral-600">{active.blurb}</p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map((service) => (
            <Link
              key={service.slug}
              href={`/other-services/${service.slug}`}
              className="group flex flex-col rounded-xl border border-neutral-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card-hover"
            >
              <span className="text-sm font-semibold text-neutral-900 group-hover:text-brand-700">
                {service.title}
              </span>
              <span className="mt-auto pt-3 text-xs font-semibold text-brand-700">
                From ₹{service.startingPrice}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-6">
          <Link
            href={`/services/${active.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline"
          >
            {services.length > PREVIEW_COUNT
              ? `See all ${services.length} in ${active.title}`
              : `More on ${active.title}`}
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
