import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { GstinValidator } from "@/components/tools/GstinValidator";

export const metadata: Metadata = {
  title: "GSTIN Format Validator",
  description: "Check whether a 15-digit GSTIN follows the correct format — state code, PAN, entity code, and checksum.",
  alternates: { canonical: "/gst-tools/gstin-validator" },
};

export default function GstinValidatorPage() {
  return (
    <ToolPageShell
      title="GSTIN Format Validator"
      description="Paste a GSTIN to check whether it follows the correct 15-character structure."
      slug="gstin-validator"
    >
      <GstinValidator />
    </ToolPageShell>
  );
}
