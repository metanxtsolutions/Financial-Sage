import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { GstCalculator } from "@/components/tools/GstCalculator";

export const metadata: Metadata = {
  title: "GST Calculator — Add or Remove GST Online",
  description: "Free GST calculator — add GST to a base amount or remove GST from a final price, with CGST/SGST or IGST split.",
  alternates: { canonical: "/gst-tools/gst-calculator" },
};

export default function GstCalculatorPage() {
  return (
    <ToolPageShell
      title="GST Calculator"
      description="Add GST to a base amount, or remove GST already included in a final price — with CGST/SGST or IGST split."
      slug="gst-calculator"
    >
      <GstCalculator />
    </ToolPageShell>
  );
}
