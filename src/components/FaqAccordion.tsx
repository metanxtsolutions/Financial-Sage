"use client";

import { useState } from "react";
import type { Faq } from "@/data/faqs";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <div className="divide-y divide-neutral-200 rounded-xl border border-neutral-200">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : faq.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
            >
              {faq.question}
              <span className="shrink-0 text-neutral-400">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-sm text-neutral-600">{faq.answer}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
