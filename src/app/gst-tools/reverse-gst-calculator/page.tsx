import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ReverseGstCalculator } from "@/components/tools/ReverseGstCalculator";

export const metadata: Metadata = {
  title: "Reverse GST Calculator: Find Base Price from a GST-Inclusive Amount",
  description: "Free reverse GST calculator. Enter a GST-inclusive price and instantly find the base price and GST amount within it.",
  alternates: { canonical: "/gst-tools/reverse-gst-calculator" },
};

export default function ReverseGstCalculatorPage() {
  return (
    <ToolPageShell
      title="Reverse GST Calculator"
      description="Have a GST-inclusive amount and need the base price? Enter the total and rate to see the split."
      slug="reverse-gst-calculator"
    >
      <ReverseGstCalculator />
    </ToolPageShell>
  );
}
