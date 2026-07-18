"use client";

import { useMemo, useState } from "react";

const ANNUAL_RATE = 18;

export function InterestCalculator() {
  const [taxAmount, setTaxAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [paymentDate, setPaymentDate] = useState("");

  const result = useMemo(() => {
    const tax = parseFloat(taxAmount);
    if (!tax || tax <= 0 || !dueDate || !paymentDate) return null;
    const due = new Date(dueDate);
    const paid = new Date(paymentDate);
    const daysLate = Math.max(0, Math.round((paid.getTime() - due.getTime()) / 86_400_000));
    const interest = (tax * (ANNUAL_RATE / 100) * daysLate) / 365;
    return { daysLate, interest: Math.round(interest * 100) / 100 };
  }, [taxAmount, dueDate, paymentDate]);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-neutral-700">
        Tax Amount Paid Late (₹)
        <input
          type="number"
          min="0"
          value={taxAmount}
          onChange={(e) => setTaxAmount(e.target.value)}
          placeholder="e.g. 25000"
          className="mt-1 w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none"
        />
      </label>

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
        Actual Payment Date
        <input
          type="date"
          value={paymentDate}
          onChange={(e) => setPaymentDate(e.target.value)}
          className="mt-1 w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none"
        />
      </label>

      {result && (
        <div className="space-y-2 rounded-lg bg-neutral-50 p-4 text-sm">
          <div className="flex justify-between"><span className="text-neutral-600">Days Late</span><span className="font-semibold">{result.daysLate}</span></div>
          <div className="flex justify-between border-t border-neutral-200 pt-2 text-base"><span className="font-semibold text-neutral-900">Estimated Interest ({ANNUAL_RATE}% p.a.)</span><span className="font-bold text-brand-700">₹{result.interest.toLocaleString("en-IN")}</span></div>
        </div>
      )}

      <p className="text-xs text-neutral-500">
        Based on the standard 18% per annum interest rate on delayed GST tax payment, calculated on
        a simple daily basis.
      </p>
    </div>
  );
}
