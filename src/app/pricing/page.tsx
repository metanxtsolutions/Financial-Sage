import type { Metadata } from "next";
import { withOpenGraph } from "@/lib/metadata";
import { Section } from "@/components/Container";
import { PricingTable } from "@/components/PricingTable";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd, faqPageSchema, pricingOfferSchema } from "@/lib/schema";
import { getFaqsByIds } from "@/data/faqs";
import Link from "next/link";
import {
  businessConsultation,
  formatPrice,
  gstFilingPlans,
  gstRegistrationPrice,
  itrWizardPrices,
  monthlyFilingFrom,
  pricingTiers,
  PRICE_DISCLOSURE,
} from "@/data/pricing";
import { formatServicePrice, getServicesByCategory, serviceCategories } from "@/data/other-services";

export const metadata: Metadata = withOpenGraph({
  title: "Pricing: Transparent GST Registration & Filing Plans",
  description: `GST registration from ₹${gstRegistrationPrice}, monthly filing from ₹${monthlyFilingFrom}. No hidden fees, published pricing for every plan.`,
  alternates: { canonical: "/pricing" },
});

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
          Above 50 invoices a month we quote from the 26 to 50 band once we see the volume.
        </p>

        <h2 className="mt-14 text-2xl font-bold text-neutral-900">Every Service, Priced</h2>
        <p className="mt-2 max-w-2xl text-neutral-600">
          One-time fees unless a billing period is shown. &quot;From&quot; means the final fee
          depends on scope, which we confirm in writing before starting.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PriceGroup
            title="GST & Income Tax Essentials"
            rows={[
              { name: "GST Registration", href: "/gst-registration", price: `₹${gstRegistrationPrice}` },
              { name: "GST Nil Return Filing", href: "/gst-return-filing", price: `₹${monthlyFilingFrom}/month` },
              { name: "ITR, salaried (ITR-1)", href: "/itr-filing", price: `₹${itrWizardPrices.ITR_1}` },
              { name: "ITR with capital gains or F&O", href: "/itr-filing", price: `From ₹${itrWizardPrices.ITR_2.toLocaleString("en-IN")}` },
              { name: "Business Consultation", href: "/contact", price: formatPrice(businessConsultation) },
            ]}
          />
          {serviceCategories.map((category) => (
            <PriceGroup
              key={category.id}
              title={category.title}
              rows={getServicesByCategory(category.id).map((service) => ({
                name: service.title,
                href: `/other-services/${service.slug}`,
                price: formatServicePrice(service),
              }))}
            />
          ))}
        </div>

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

function PriceGroup({ title, rows }: { title: string; rows: { name: string; href: string; price: string }[] }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
      <h3 className="text-base font-bold text-neutral-900">{title}</h3>
      <ul className="mt-3 divide-y divide-neutral-100">
        {rows.map((row) => (
          <li key={row.href + row.name} className="flex items-baseline justify-between gap-4 py-2 text-sm">
            <Link href={row.href} className="text-neutral-700 hover:text-brand-700">
              {row.name}
            </Link>
            <span className="shrink-0 font-semibold text-neutral-900">{row.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
