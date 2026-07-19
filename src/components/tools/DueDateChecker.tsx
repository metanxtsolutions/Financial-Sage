"use client";

import { useMemo, useState } from "react";

function nextOccurrence(day: number, from: Date): Date {
  const candidate = new Date(from.getFullYear(), from.getMonth(), day);
  if (candidate < from) {
    candidate.setMonth(candidate.getMonth() + 1);
  }
  return candidate;
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export function DueDateChecker() {
  const [filerType, setFilerType] = useState<"monthly" | "qrmp">("monthly");

  const dates = useMemo(() => {
    const today = new Date();
    if (filerType === "monthly") {
      return [
        { label: "GSTR-1", date: nextOccurrence(11, today) },
        { label: "GSTR-3B", date: nextOccurrence(20, today) },
      ];
    }
    return [
      { label: "GSTR-1 (quarterly)", date: nextOccurrence(13, today) },
      { label: "GSTR-3B (quarterly)", date: nextOccurrence(22, today) },
      { label: "PMT-06 (monthly tax payment)", date: nextOccurrence(25, today) },
    ];
  }, [filerType]);

  const gstr9 = useMemo(() => {
    const today = new Date();
    const fyEndYear = today.getMonth() >= 3 ? today.getFullYear() + 1 : today.getFullYear();
    return new Date(fyEndYear, 11, 31);
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setFilerType("monthly")}
          className={`rounded-lg border px-3 py-2 text-sm font-medium ${filerType === "monthly" ? "border-brand-600 bg-brand-50 text-brand-700" : "border-neutral-200 text-neutral-600"}`}
        >
          Monthly Filer
        </button>
        <button
          type="button"
          onClick={() => setFilerType("qrmp")}
          className={`rounded-lg border px-3 py-2 text-sm font-medium ${filerType === "qrmp" ? "border-brand-600 bg-brand-50 text-brand-700" : "border-neutral-200 text-neutral-600"}`}
        >
          QRMP Filer
        </button>
      </div>

      <div className="space-y-2 rounded-lg bg-neutral-50 p-4 text-sm">
        {dates.map((d) => (
          <div key={d.label} className="flex justify-between">
            <span className="text-neutral-600">{d.label}</span>
            <span className="font-semibold text-neutral-900">{formatDate(d.date)}</span>
          </div>
        ))}
        <div className="flex justify-between border-t border-neutral-200 pt-2">
          <span className="text-neutral-600">GSTR-9 (annual, indicative)</span>
          <span className="font-semibold text-neutral-900">{formatDate(gstr9)}</span>
        </div>
      </div>

      <p className="text-xs text-neutral-500">
        Dates shown follow the standard 11th/20th (monthly) or 13th/22nd/25th (QRMP) pattern. The
        government can extend specific due dates by notification, so confirm on the GST portal
        before a filing deadline.
      </p>
    </div>
  );
}
