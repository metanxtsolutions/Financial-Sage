import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { DueDateChecker } from "@/components/tools/DueDateChecker";

export const metadata: Metadata = {
  title: "GST Due Date Checker",
  description: "Check your next GSTR-1, GSTR-3B, and GSTR-9 due dates for monthly or QRMP filing.",
  alternates: { canonical: "/gst-tools/gst-due-date-checker" },
};

export default function DueDateCheckerPage() {
  return (
    <ToolPageShell
      title="GST Due Date Checker"
      description="See your next GSTR-1, GSTR-3B, and GSTR-9 due dates based on whether you file monthly or under QRMP."
      slug="gst-due-date-checker"
    >
      <DueDateChecker />
    </ToolPageShell>
  );
}
