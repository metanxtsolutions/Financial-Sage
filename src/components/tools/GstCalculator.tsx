"use client";

import { useMemo, useState } from "react";

const rates = [0, 0.25, 3, 5, 12, 18, 28];

export function GstCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState(18);
  const [mode, setMode] = useState<"exclusive" | "inclusive">("exclusive");
  const [supplyType, setSupplyType] = useState<"intra" | "inter">("intra");

  const result = useMemo(() => {
    const value = parseFloat(amount);
    if (!value || value <= 0) return null;

    let base: number;
    let gstAmount: number;
    let total: number;

    if (mode === "exclusive") {
      base = value;
      gstAmount = (value * rate) / 100;
      total = base + gstAmount;
    } else {
      total = value;
      base = value / (1 + rate / 100);
      gstAmount = total - base;
    }

    return {
      base: Math.round(base * 100) / 100,
      gstAmount: Math.round(gstAmount * 100) / 100,
      total: Math.round(total * 100) / 100,
      cgst: Math.round((gstAmount / 2) * 100) / 100,
      sgst: Math.round((gstAmount / 2) * 100) / 100,
    };
  }, [amount, rate, mode]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setMode("exclusive")}
          className={`rounded-lg border px-3 py-2 text-sm font-medium ${mode === "exclusive" ? "border-brand-600 bg-brand-50 text-brand-700" : "border-neutral-200 text-neutral-600"}`}
        >
          Add GST
        </button>
        <button
          type="button"
          onClick={() => setMode("inclusive")}
          className={`rounded-lg border px-3 py-2 text-sm font-medium ${mode === "inclusive" ? "border-brand-600 bg-brand-50 text-brand-700" : "border-neutral-200 text-neutral-600"}`}
        >
          Remove GST
        </button>
      </div>

      <label className="block text-sm font-medium text-neutral-700">
        {mode === "exclusive" ? "Base Amount (₹)" : "GST-Inclusive Amount (₹)"}
        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g. 10000"
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

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setSupplyType("intra")}
          className={`rounded-lg border px-3 py-2 text-sm font-medium ${supplyType === "intra" ? "border-brand-600 bg-brand-50 text-brand-700" : "border-neutral-200 text-neutral-600"}`}
        >
          Intra-state (CGST+SGST)
        </button>
        <button
          type="button"
          onClick={() => setSupplyType("inter")}
          className={`rounded-lg border px-3 py-2 text-sm font-medium ${supplyType === "inter" ? "border-brand-600 bg-brand-50 text-brand-700" : "border-neutral-200 text-neutral-600"}`}
        >
          Inter-state (IGST)
        </button>
      </div>

      {result && (
        <div className="space-y-2 rounded-lg bg-neutral-50 p-4 text-sm">
          <div className="flex justify-between"><span className="text-neutral-600">Base Amount</span><span className="font-semibold">₹{result.base.toLocaleString("en-IN")}</span></div>
          {supplyType === "intra" ? (
            <>
              <div className="flex justify-between"><span className="text-neutral-600">CGST ({rate / 2}%)</span><span className="font-semibold">₹{result.cgst.toLocaleString("en-IN")}</span></div>
              <div className="flex justify-between"><span className="text-neutral-600">SGST ({rate / 2}%)</span><span className="font-semibold">₹{result.sgst.toLocaleString("en-IN")}</span></div>
            </>
          ) : (
            <div className="flex justify-between"><span className="text-neutral-600">IGST ({rate}%)</span><span className="font-semibold">₹{result.gstAmount.toLocaleString("en-IN")}</span></div>
          )}
          <div className="flex justify-between border-t border-neutral-200 pt-2 text-base"><span className="font-semibold text-neutral-900">Total</span><span className="font-bold text-brand-700">₹{result.total.toLocaleString("en-IN")}</span></div>
        </div>
      )}
    </div>
  );
}
