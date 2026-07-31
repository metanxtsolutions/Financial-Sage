import type { Metadata } from "next";
import { ItrWizardLoader } from "@/components/itr/ItrWizardLoader";

export const metadata: Metadata = {
  title: "File Your ITR",
  robots: { index: false, follow: false },
};

export default function ItrFilingApplyPage() {
  return (
    <div className="min-h-screen bg-white">
      <ItrWizardLoader />
    </div>
  );
}
