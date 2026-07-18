"use client";

import { useMemo, useState } from "react";

export function LateFeeCalculator() {
  const [dueDate, setDueDate] = useState("");
  const [filingDate, setFilingDate] = useState("");
  const [returnType, setReturnType] = useState<"regular" | "nil">("regular");

  const result = useMemo(() => {
    if (!dueDate || !filingDate) return null;
    const due = new Date(dueDate);
    const filed = new Date(filingDate);
    const daysLate = Math.max(0, Math.round((filed.getTime() - due.getTime()) / 86_400_000));
    const perDay = returnType === "nil" ? 20 : 50;
    const fee = daysLate * perDay;
    return { daysLate, fee };
  }, [dueDate, filingDate, returnType]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setReturnType("regular")}
          className={`rounded-lg border px-3 py-2 text-sm font-medium ${returnType === "regular" ? "border-brand-600 bg-brand-50 text-brand-700" : "border-neutral-200 text-neutral-600"}`}
        >
          Regular Return
        </button>
        <button
          type="button"
          onClick={() => setReturnType("nil")}
          className={`rounded-lg border px-3 py-2 text-sm font-medium ${returnType === "nil" ? "border-brand-600 bg-brand-50 text-brand-700" : "border-neutral-200 text-neutral-600"}`}
        >
          NIL Return
        </button>
      </div>

      <label className="block text-sm font-medium text-neutral-700">
        Due Date
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="mt-1 w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none"
        />
      </label>

      <label className="block text-sm font-medium text-neutral-700">
        Actual (or Expected) Filing Date
        <input
          type="date"
          value={filingDate}
          onChange={(e) => setFilingDate(e.target.value)}
          className="mt-1 w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none"
        />
      </label>

      {result && (
        <div className="space-y-2 rounded-lg bg-neutral-50 p-4 text-sm">
          <div className="flex justify-between"><span className="text-neutral-600">Days Late</span><span className="font-semibold">{result.daysLate}</span></div>
          <div className="flex justify-between border-t border-neutral-200 pt-2 text-base"><span className="font-semibold text-neutral-900">Estimated Late Fee</span><span className="font-bold text-brand-700">₹{result.fee.toLocaleString("en-IN")}</span></div>
        </div>
      )}

      <p className="text-xs text-neutral-500">
        Based on the standard ₹50/day (regular) or ₹20/day (NIL) late fee, subject to a
        government-notified maximum cap that depends on turnover — confirm the exact cap on the GST
        portal before payment.
      </p>
    </div>
  );
}
