import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { LateFeeCalculator } from "@/components/tools/LateFeeCalculator";

export const metadata: Metadata = {
  title: "GST Late Fee Calculator",
  description: "Estimate the late fee for filing GSTR-1 or GSTR-3B after the due date, for a regular or NIL return.",
  alternates: { canonical: "/gst-tools/gst-late-fee-calculator" },
};

export default function LateFeeCalculatorPage() {
  return (
    <ToolPageShell
      title="GST Late Fee Calculator"
      description="Enter your due date and (expected) filing date to estimate the late fee for GSTR-1 or GSTR-3B."
      slug="gst-late-fee-calculator"
    >
      <LateFeeCalculator />
    </ToolPageShell>
  );
}
