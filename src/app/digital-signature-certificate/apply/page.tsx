import type { Metadata } from "next";
import { Section } from "@/components/Container";
import { DscOrderLoader } from "@/components/dsc/DscOrderLoader";

export const metadata: Metadata = {
  title: "Buy a Digital Signature Certificate",
  robots: { index: false, follow: false },
};

export default function DscApplyPage() {
  return (
    <Section>
      <DscOrderLoader />
    </Section>
  );
}
