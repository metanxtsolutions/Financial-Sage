"use client";

import { useMemo, useState } from "react";

const rates = [0, 0.25, 3, 5, 12, 18, 28];

export function ReverseGstCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState(18);

  const result = useMemo(() => {
    const total = parseFloat(amount);
    if (!total || total <= 0) return null;
    const base = total / (1 + rate / 100);
    const gstAmount = total - base;
    return {
      base: Math.round(base * 100) / 100,
      gstAmount: Math.round(gstAmount * 100) / 100,
      total: Math.round(total * 100) / 100,
    };
  }, [amount, rate]);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-neutral-700">
        GST-Inclusive Amount (₹)
        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 11800"
          className="mt-1 w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none"
        />
      </label>

      <label className="block text-sm font-medium text-neutral-700">
        GST Rate
        <select
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="mt-1 w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none"
        >
          {rates.map((r) => (
            <option key={r} value={r}>
              {r}%
            </option>
          ))}
        </select>
      </label>

      {result && (
        <div className="space-y-2 rounded-lg bg-neutral-50 p-4 text-sm">
          <div className="flex justify-between"><span className="text-neutral-600">Base Price (before GST)</span><span className="font-semibold">₹{result.base.toLocaleString("en-IN")}</span></div>
          <div className="flex justify-between"><span className="text-neutral-600">GST Amount ({rate}%)</span><span className="font-semibold">₹{result.gstAmount.toLocaleString("en-IN")}</span></div>
          <div className="flex justify-between border-t border-neutral-200 pt-2 text-base"><span className="font-semibold text-neutral-900">Total (unchanged)</span><span className="font-bold text-brand-700">₹{result.total.toLocaleString("en-IN")}</span></div>
        </div>
      )}
    </div>
  );
}
