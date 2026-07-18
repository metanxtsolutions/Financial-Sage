import type { Metadata } from "next";
import { Section } from "@/components/Container";
import { PricingTable } from "@/components/PricingTable";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd, faqPageSchema } from "@/lib/schema";
import { getFaqsByIds } from "@/data/faqs";
import { monthlyFilingFrom } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Pricing — Transparent GST Registration & Filing Plans",
  description: `GST registration from ₹399, monthly filing from ₹${monthlyFilingFrom}. No hidden fees, published pricing for every plan.`,
  alternates: { canonical: "/pricing" },
};

const faqIds = ["govt-fee-gst-registration", "payment-refund-policy", "how-long-gst-registration-takes"];

export default function PricingPage() {
  const faqs = getFaqsByIds(faqIds);
  return (
    <>
      <JsonLd data={faqPageSchema(faqs)} />
      <Section>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">Transparent Pricing</h1>
        <p className="mt-4 max-w-2xl text-lg text-neutral-600">
          No &quot;request a quote&quot; forms — every plan is priced and published here. Standalone
          monthly GST filing (without a bundled registration) starts from ₹{monthlyFilingFrom}.
        </p>

        <div className="mt-10">
          <PricingTable />
        </div>

        <p className="mt-6 text-sm text-neutral-500">
          All plans exclude applicable government/GST fees, which are paid directly to the
          department where applicable. GST registration itself has no government fee.
        </p>

        <h2 className="mt-14 text-2xl font-bold text-neutral-900">Pricing FAQs</h2>
        <div className="mt-4 max-w-3xl">
          <FaqAccordion faqs={faqs} />
        </div>
      </Section>
    </>
  );
}
