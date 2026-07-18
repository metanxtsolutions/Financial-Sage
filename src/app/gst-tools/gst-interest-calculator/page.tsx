import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { InterestCalculator } from "@/components/tools/InterestCalculator";

export const metadata: Metadata = {
  title: "GST Interest Calculator",
  description: "Estimate interest owed on GST tax paid after the due date, at the standard 18% per annum rate.",
  alternates: { canonical: "/gst-tools/gst-interest-calculator" },
};

export default function InterestCalculatorPage() {
  return (
    <ToolPageShell
      title="GST Interest Calculator"
      description="Estimate the interest owed when GST tax is paid after the due date, at the standard 18% per annum rate."
      slug="gst-interest-calculator"
    >
      <InterestCalculator />
    </ToolPageShell>
  );
}
