"use client";

import { useMemo, useState } from "react";

function rupees(value: number) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

export function HraCalculator() {
  const [basic, setBasic] = useState("");
  const [da, setDa] = useState("");
  const [hraReceived, setHraReceived] = useState("");
  const [rentPaid, setRentPaid] = useState("");
  const [isMetro, setIsMetro] = useState(true);

  const result = useMemo(() => {
    const basicPay = Number(basic);
    const dearnessAllowance = Number(da) || 0;
    const hra = Number(hraReceived);
    const rent = Number(rentPaid);
    if (!basicPay || !hra || !rent) return null;

    // Salary for HRA purposes is basic plus dearness allowance (to the extent
    // it forms part of retirement benefits) plus any commission on turnover.
    const salary = basicPay + dearnessAllowance;

    const actualHra = hra;
    const rentOverTenPercent = Math.max(0, rent - 0.1 * salary);
    const percentOfSalary = (isMetro ? 0.5 : 0.4) * salary;

    const exempt = Math.max(0, Math.min(actualHra, rentOverTenPercent, percentOfSalary));

    return {
      actualHra,
      rentOverTenPercent,
      percentOfSalary,
      exempt,
      taxable: Math.max(0, hra - exempt),
      isMetro,
    };
  }, [basic, da, hraReceived, rentPaid, isMetro]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setIsMetro(true)}
          aria-pressed={isMetro}
          className={`rounded-lg border px-3 py-2 text-sm font-medium ${isMetro ? "border-brand-600 bg-brand-50 text-brand-700" : "border-neutral-200 text-neutral-600"}`}
        >
          Metro City
        </button>
        <button
          type="button"
          onClick={() => setIsMetro(false)}
          aria-pressed={!isMetro}
          className={`rounded-lg border px-3 py-2 text-sm font-medium ${!isMetro ? "border-brand-600 bg-brand-50 text-brand-700" : "border-neutral-200 text-neutral-600"}`}
        >
          Non-Metro
        </button>
      </div>

      {[
        { label: "Annual Basic Salary (₹)", value: basic, set: setBasic, placeholder: "e.g. 600000" },
        { label: "Annual Dearness Allowance (₹)", value: da, set: setDa, placeholder: "0 if not applicable" },
        { label: "Annual HRA Received (₹)", value: hraReceived, set: setHraReceived, placeholder: "e.g. 240000" },
        { label: "Annual Rent Paid (₹)", value: rentPaid, set: setRentPaid, placeholder: "e.g. 300000" },
      ].map((field) => (
        <label key={field.label} className="block text-sm font-medium text-neutral-700">
          {field.label}
          <input
            type="number"
            inputMode="numeric"
            min="0"
            value={field.value}
            onChange={(e) => field.set(e.target.value)}
            placeholder={field.placeholder}
            className="mt-1 w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none"
          />
        </label>
      ))}

      {result && (
        <div className="space-y-2 rounded-lg bg-neutral-50 p-4 text-sm">
          <div className="font-semibold text-neutral-900">The exemption is the least of these three</div>
          <div className="flex justify-between"><span className="text-neutral-600">Actual HRA received</span><span>{rupees(result.actualHra)}</span></div>
          <div className="flex justify-between"><span className="text-neutral-600">Rent paid minus 10% of salary</span><span>{rupees(result.rentOverTenPercent)}</span></div>
          <div className="flex justify-between">
            <span className="text-neutral-600">{result.isMetro ? "50%" : "40%"} of salary</span>
            <span>{rupees(result.percentOfSalary)}</span>
          </div>
          <div className="flex justify-between border-t border-neutral-200 pt-2 text-base">
            <span className="font-semibold text-neutral-900">Exempt HRA</span>
            <span className="font-bold text-brand-700">{rupees(result.exempt)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Taxable portion of HRA</span>
            <span className="font-semibold">{rupees(result.taxable)}</span>
          </div>
        </div>
      )}

      <p className="text-xs text-neutral-500">
        HRA exemption under Section 10(13A) is available in the old regime only. Metro means
        Delhi, Mumbai, Kolkata, or Chennai. Salary here is basic pay plus dearness allowance
        forming part of retirement benefits, plus any commission on turnover.
      </p>
    </div>
  );
}
