import type { Metadata } from "next";
import Link from "next/link";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { IncomeTaxCalculator } from "@/components/tools/IncomeTaxCalculator";
import { taxYear } from "@/data/tax-rates";

export const metadata: Metadata = {
  title: `Income Tax Calculator FY ${taxYear.financialYear}: Old vs New Regime`,
  description:
    "Free income tax calculator. Enter your income and deductions to compare tax under the old and new regimes, with a full slab-by-slab breakdown.",
  alternates: { canonical: "/tax-tools/income-tax-calculator" },
};

export default function IncomeTaxCalculatorPage() {
  return (
    <ToolPageShell
      title="Income Tax Calculator"
      description={`Compare your income tax under the old and new regimes for FY ${taxYear.financialYear}, and see which one leaves you better off.`}
      slug="income-tax-calculator"
      section={{ label: "Income Tax Tools", href: "/tax-tools" }}
      ctaLabel="Get your ITR filed"
      ctaHref="/itr-filing"
      footnote={
        <>
          The new regime is the default from FY 2023-24 onward. You can still opt into the old
          regime, and salaried taxpayers may switch each year. Once you know which regime suits
          you,{" "}
          <Link href="/itr-filing" className="font-medium text-brand-700 underline">
            file your return
          </Link>{" "}
          from ₹999.
        </>
      }
    >
      <IncomeTaxCalculator />
    </ToolPageShell>
  );
}
