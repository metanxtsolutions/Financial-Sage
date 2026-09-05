import type { Metadata } from "next";
import Link from "next/link";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { HraCalculator } from "@/components/tools/HraCalculator";

export const metadata: Metadata = {
  title: "HRA Exemption Calculator: How Much House Rent Allowance Is Tax Free",
  description:
    "Free HRA calculator. Enter your basic salary, HRA, and rent paid to see the exempt amount under Section 10(13A), with the three-way test shown in full.",
  alternates: { canonical: "/tax-tools/hra-calculator" },
};

export default function HraCalculatorPage() {
  return (
    <ToolPageShell
      title="HRA Exemption Calculator"
      description="Work out how much of your house rent allowance is exempt from tax under Section 10(13A), and how much stays taxable."
      slug="hra-calculator"
      section={{ label: "Income Tax Tools", href: "/tax-tools" }}
      ctaLabel="Get your ITR filed"
      ctaHref="/itr-filing"
      footnote={
        <>
          HRA exemption applies in the old regime only, so run the numbers through the{" "}
          <Link href="/tax-tools/income-tax-calculator" className="font-medium text-brand-700 underline">
            income tax calculator
          </Link>{" "}
          before deciding which regime to pick. If your annual rent crosses ₹1 lakh you will also
          need your landlord&apos;s PAN.
        </>
      }
    >
      <HraCalculator />
    </ToolPageShell>
  );
}
