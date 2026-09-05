"use client";

import { useMemo, useState } from "react";
import { computeTax, regimes, taxYear } from "@/data/tax-rates";

function rupees(value: number) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

export function IncomeTaxCalculator() {
  const [income, setIncome] = useState("");
  const [deductions, setDeductions] = useState("");
  const [isSalaried, setIsSalaried] = useState(true);

  const result = useMemo(() => {
    const grossIncome = Number(income);
    if (!Number.isFinite(grossIncome) || grossIncome <= 0) return null;
    const chapterVia = Number(deductions) || 0;

    const newRegime = computeTax({ grossIncome, deductions: chapterVia, isSalaried, regime: "new" });
    const oldRegime = computeTax({ grossIncome, deductions: chapterVia, isSalaried, regime: "old" });
    const better: "new" | "old" = newRegime.totalTax <= oldRegime.totalTax ? "new" : "old";

    return {
      newRegime,
      oldRegime,
      better,
      saving: Math.abs(newRegime.totalTax - oldRegime.totalTax),
    };
  }, [income, deductions, isSalaried]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setIsSalaried(true)}
          aria-pressed={isSalaried}
          className={`rounded-lg border px-3 py-2 text-sm font-medium ${isSalaried ? "border-brand-600 bg-brand-50 text-brand-700" : "border-neutral-200 text-neutral-600"}`}
        >
          Salaried / Pensioner
        </button>
        <button
          type="button"
          onClick={() => setIsSalaried(false)}
          aria-pressed={!isSalaried}
          className={`rounded-lg border px-3 py-2 text-sm font-medium ${!isSalaried ? "border-brand-600 bg-brand-50 text-brand-700" : "border-neutral-200 text-neutral-600"}`}
        >
          Business / Other
        </button>
      </div>

      <label className="block text-sm font-medium text-neutral-700">
        Gross Annual Income (₹)
        <input
          type="number"
          inputMode="numeric"
          min="0"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="e.g. 1200000"
          className="mt-1 w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none"
        />
      </label>

      <label className="block text-sm font-medium text-neutral-700">
        Deductions under 80C, 80D and similar (₹)
        <input
          type="number"
          inputMode="numeric"
          min="0"
          value={deductions}
          onChange={(e) => setDeductions(e.target.value)}
          placeholder="e.g. 150000"
          className="mt-1 w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none"
        />
        <span className="mt-1 block text-xs font-normal text-neutral-500">
          Counted in the old regime only. The new regime does not allow these deductions.
        </span>
      </label>

      {result && (
        <>
          <div className="grid grid-cols-2 gap-3">
            {(["new", "old"] as const).map((id) => {
              const computation = id === "new" ? result.newRegime : result.oldRegime;
              const isBetter = result.better === id;
              return (
                <div
                  key={id}
                  className={`rounded-lg border p-4 ${isBetter ? "border-accent-500 bg-accent-500/5" : "border-neutral-200 bg-neutral-50"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-neutral-900">{regimes[id].label}</span>
                    {isBetter && (
                      <span className="rounded-full bg-accent-500 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white uppercase">
                        Lower
                      </span>
                    )}
                  </div>
                  <div className="mt-2 text-xl font-bold text-brand-700">{rupees(computation.totalTax)}</div>
                  <div className="mt-1 text-xs text-neutral-500">
                    {computation.effectiveRate.toFixed(1)}% of gross income
                  </div>
                </div>
              );
            })}
          </div>

          {result.saving > 0 && (
            <p className="rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-800">
              The <strong>{regimes[result.better].label.toLowerCase()}</strong> leaves you{" "}
              <strong>{rupees(result.saving)}</strong> better off this year.
            </p>
          )}

          <details className="rounded-lg border border-neutral-200">
            <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-neutral-700">
              See the full breakdown
            </summary>
            <div className="space-y-3 border-t border-neutral-200 px-4 py-3 text-sm">
              {(["new", "old"] as const).map((id) => {
                const c = id === "new" ? result.newRegime : result.oldRegime;
                return (
                  <div key={id}>
                    <div className="font-semibold text-neutral-900">{regimes[id].label}</div>
                    <div className="mt-1 space-y-1 text-neutral-600">
                      <div className="flex justify-between"><span>Taxable income</span><span>{rupees(c.taxableIncome)}</span></div>
                      <div className="flex justify-between"><span>Tax on slabs</span><span>{rupees(c.slabTax)}</span></div>
                      {c.rebate > 0 && (
                        <div className="flex justify-between"><span>Less: rebate u/s 87A</span><span>-{rupees(c.rebate)}</span></div>
                      )}
                      {c.surcharge > 0 && (
                        <div className="flex justify-between"><span>Surcharge</span><span>{rupees(c.surcharge)}</span></div>
                      )}
                      <div className="flex justify-between"><span>Health &amp; education cess (4%)</span><span>{rupees(c.cess)}</span></div>
                      <div className="flex justify-between border-t border-neutral-200 pt-1 font-semibold text-neutral-900">
                        <span>Total tax</span><span>{rupees(c.totalTax)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </details>
        </>
      )}

      <p className="text-xs text-neutral-500">
        Slabs for FY {taxYear.financialYear} (AY {taxYear.assessmentYear}). Surcharge is applied
        without marginal relief, so figures just above a surcharge threshold read slightly high.
        This is an estimate, not a filed computation.
      </p>
    </div>
  );
}
