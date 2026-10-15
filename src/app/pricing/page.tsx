import type { Metadata } from "next";
import { Section } from "@/components/Container";
import { PricingTable } from "@/components/PricingTable";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd, faqPageSchema, pricingOfferSchema } from "@/lib/schema";
import { getFaqsByIds } from "@/data/faqs";
import { gstFilingPlans, gstRegistrationPrice, monthlyFilingFrom, pricingTiers, PRICE_DISCLOSURE } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Pricing: Transparent GST Registration & Filing Plans",
  description: `GST registration from ₹${gstRegistrationPrice}, monthly filing from ₹${monthlyFilingFrom}. No hidden fees, published pricing for every plan.`,
  alternates: { canonical: "/pricing" },
};

const faqIds = ["govt-fee-gst-registration", "payment-refund-policy", "how-long-gst-registration-takes"];

export default function PricingPage() {
  const faqs = getFaqsByIds(faqIds);
  return (
    <>
      <JsonLd data={[faqPageSchema(faqs), ...pricingOfferSchema(pricingTiers)]} />
      <Section>
        <span className="eyebrow">Pricing</span>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">Transparent Pricing</h1>
        <p className="mt-4 max-w-2xl text-lg text-neutral-600">
          No &quot;request a quote&quot; forms. Every plan is priced and published here. Standalone
          monthly GST filing, without a bundled registration, starts from ₹{monthlyFilingFrom}.
        </p>

        <h2 className="sr-only">Choose Your Plan</h2>
        <div className="mt-10">
          <PricingTable />
        </div>

        <h2 className="mt-14 text-2xl font-bold text-neutral-900">Monthly GST Return Filing</h2>
        <p className="mt-2 max-w-2xl text-neutral-600">
          Billed per month, per GSTIN. Pick the band that matches your invoices in a month.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {gstFilingPlans.map((plan) => (
            <div key={plan.id} className="rounded-2xl border border-neutral-200 bg-white p-5">
              <h3 className="text-base font-bold text-neutral-900">{plan.label}</h3>
              <p className="mt-1 text-sm text-neutral-500">{plan.volume}</p>
              <p className="mt-3 text-2xl font-extrabold text-neutral-900">
                ₹{plan.price.toLocaleString("en-IN")}
                <span className="ml-1 text-sm font-medium text-neutral-500">/month</span>
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-neutral-500">
          Above 50 invoices a month, or for annual return (GSTR-9, from ₹1,499), notice replies
          (from ₹1,499) and reconciliation (from ₹999), we quote from these starting prices once we
          see the volume.
        </p>

        <p className="mt-6 text-sm text-neutral-500">
          {PRICE_DISCLOSURE} The bundled plans above are one-time prices covering the services
          listed in each plan. All plans exclude applicable government/GST fees, which are paid directly to the
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
