// Income tax slab and rate data - the single source of truth for every tax
// calculator on the site.
//
// VERIFIED 5 September 2026 against the Income Tax Department's own figures
// for AY 2026-27 ("Salaried Individuals for AY 2026-27" on incometax.gov.in).
// Every slab boundary, the 87A rebate under both regimes, all four surcharge
// bands including the 25% new-regime cap, and the 4% cess were checked against
// that page; the Rs 75,000 standard deduction is s.16(ia) as amended by the
// Finance Act 2025.
//
// Budget 2026 left the slabs unchanged, so the same figures apply to
// FY 2026-27 as well - hence `alsoApplies` below.
//
// !! STILL RE-CHECK AFTER EACH BUDGET !!
// Slabs, the rebate, the standard deduction and surcharge thresholds are all
// the annual Budget's to change. When the next one lands, update this file and
// bump the years below; every calculator picks the change up automatically.
//
// SEPARATE ISSUE, NOT ABOUT THESE NUMBERS: the Income Tax Act 2025 replaces
// the 1961 Act for income earned from 1 April 2026 and renumbers nearly every
// section. These rates are unaffected, but section references in user-facing
// copy (87A, 115BAC, 10(13A), 44AD, 234B/234C, Form 10-IEA and the like) are
// correct only for returns under the 1961 Act - that is, up to FY 2025-26.
// They will need remapping before FY 2026-27 returns are filed in 2027.

export const taxYear = {
  financialYear: "2025-26",
  assessmentYear: "2026-27",
  /** Later years the same rates are known to apply to, unchanged. */
  alsoApplies: "2026-27",
} as const;

export interface Slab {
  /** Income above this amount is taxed at `rate`. */
  from: number;
  /** Exclusive upper bound, or null for the top slab. */
  to: number | null;
  /** Marginal rate as a fraction, e.g. 0.05 for 5%. */
  rate: number;
}

export interface RegimeConfig {
  id: "new" | "old";
  label: string;
  slabs: Slab[];
  /** Standard deduction available to salaried taxpayers and pensioners. */
  standardDeduction: number;
  /** Section 87A: full rebate of tax where total income is at or below the limit. */
  rebate: { incomeLimit: number; maxRebate: number };
  /** Whether the common Chapter VI-A deductions (80C, 80D and so on) apply. */
  allowsDeductions: boolean;
}

export const regimes: Record<"new" | "old", RegimeConfig> = {
  new: {
    id: "new",
    label: "New Regime",
    slabs: [
      { from: 0, to: 400_000, rate: 0 },
      { from: 400_000, to: 800_000, rate: 0.05 },
      { from: 800_000, to: 1_200_000, rate: 0.1 },
      { from: 1_200_000, to: 1_600_000, rate: 0.15 },
      { from: 1_600_000, to: 2_000_000, rate: 0.2 },
      { from: 2_000_000, to: 2_400_000, rate: 0.25 },
      { from: 2_400_000, to: null, rate: 0.3 },
    ],
    standardDeduction: 75_000,
    rebate: { incomeLimit: 1_200_000, maxRebate: 60_000 },
    allowsDeductions: false,
  },
  old: {
    id: "old",
    label: "Old Regime",
    slabs: [
      { from: 0, to: 250_000, rate: 0 },
      { from: 250_000, to: 500_000, rate: 0.05 },
      { from: 500_000, to: 1_000_000, rate: 0.2 },
      { from: 1_000_000, to: null, rate: 0.3 },
    ],
    standardDeduction: 50_000,
    rebate: { incomeLimit: 500_000, maxRebate: 12_500 },
    allowsDeductions: true,
  },
};

/** Health & education cess, applied on tax plus surcharge. */
export const cessRate = 0.04;

/**
 * Surcharge on tax, by total income. The new regime caps surcharge at 25%,
 * the old regime goes to 37%.
 */
export const surchargeBands: { threshold: number; new: number; old: number }[] = [
  { threshold: 5_000_000, new: 0.1, old: 0.1 },
  { threshold: 10_000_000, new: 0.15, old: 0.15 },
  { threshold: 20_000_000, new: 0.25, old: 0.25 },
  { threshold: 50_000_000, new: 0.25, old: 0.37 },
];

export function surchargeRate(taxableIncome: number, regime: "new" | "old"): number {
  let rate = 0;
  for (const band of surchargeBands) {
    if (taxableIncome > band.threshold) rate = band[regime];
  }
  return rate;
}

export interface TaxComputation {
  taxableIncome: number;
  slabTax: number;
  rebate: number;
  surcharge: number;
  cess: number;
  totalTax: number;
  /** Effective rate against gross income, as a percentage. */
  effectiveRate: number;
}

/**
 * Compute tax for one regime. `deductions` is ignored for the new regime,
 * which does not allow Chapter VI-A deductions.
 *
 * Surcharge is applied without marginal relief, so figures just above a
 * surcharge threshold read slightly high. That is disclosed on the page.
 */
export function computeTax({
  grossIncome,
  deductions,
  isSalaried,
  regime,
}: {
  grossIncome: number;
  deductions: number;
  isSalaried: boolean;
  regime: "new" | "old";
}): TaxComputation {
  const config = regimes[regime];

  const standardDeduction = isSalaried ? config.standardDeduction : 0;
  const chapterVia = config.allowsDeductions ? deductions : 0;
  const taxableIncome = Math.max(0, grossIncome - standardDeduction - chapterVia);

  let slabTax = 0;
  for (const slab of config.slabs) {
    if (taxableIncome <= slab.from) break;
    const upper = slab.to === null ? taxableIncome : Math.min(taxableIncome, slab.to);
    slabTax += (upper - slab.from) * slab.rate;
  }

  const rebate =
    taxableIncome <= config.rebate.incomeLimit
      ? Math.min(slabTax, config.rebate.maxRebate)
      : 0;

  const taxAfterRebate = Math.max(0, slabTax - rebate);
  const surcharge = taxAfterRebate * surchargeRate(taxableIncome, regime);
  const cess = (taxAfterRebate + surcharge) * cessRate;
  const totalTax = Math.round(taxAfterRebate + surcharge + cess);

  return {
    taxableIncome,
    slabTax: Math.round(slabTax),
    rebate: Math.round(rebate),
    surcharge: Math.round(surcharge),
    cess: Math.round(cess),
    totalTax,
    effectiveRate: grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0,
  };
}
