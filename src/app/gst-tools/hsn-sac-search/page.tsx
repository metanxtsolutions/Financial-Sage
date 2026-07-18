import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { HsnSacSearchTool } from "@/components/tools/HsnSacSearch";

export const metadata: Metadata = {
  title: "HSN/SAC Code Search & GST Rate Lookup",
  description: "Search HSN codes for goods and SAC codes for services to find the applicable GST rate.",
  alternates: { canonical: "/gst-tools/hsn-sac-search" },
};

export default function HsnSacSearchPage() {
  return (
    <ToolPageShell
      title="HSN/SAC Code Search"
      description="Find the right HSN (goods) or SAC (services) code and its indicative GST rate."
      slug="hsn-sac-search"
    >
      <HsnSacSearchTool />
    </ToolPageShell>
  );
}
