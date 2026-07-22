import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StickyLeadSidebar } from "@/components/StickyLeadSidebar";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd, faqPageSchema, serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import { getFaqsByIds } from "@/data/faqs";

export const metadata: Metadata = {
  title: "GST Compliance: ITC, Notices & Penalties",
  description:
    "GST compliance support for Indian businesses: ITC advisory, GST notice handling, penalty avoidance, and e-way bill support from Financial Sage's Compliance Pro plan.",
  alternates: { canonical: "/gst-compliance" },
};

const pageFaqIds = [
  "gst-notice-response",
  "gstr3a-notice",
  "gst-registration-cancellation-non-filing",
  "late-fee-gst-return",
  "what-is-itc",
  "itc-eligibility-conditions",
  "itc-blocked-items",
  "itc-mismatch-2a-2b",
  "itc-advisory-service",
  "e-way-bill-requirement",
  "cancel-gst-registration",
];

export default function GstCompliancePage() {
  const faqs = getFaqsByIds(pageFaqIds);
  const breadcrumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "GST Compliance", url: `${siteConfig.url}/gst-compliance` },
  ];

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: "GST Compliance",
            description: "ITC advisory, GST notice handling, and ongoing compliance support for Indian businesses.",
            url: `${siteConfig.url}/gst-compliance`,
          }),
          faqPageSchema(faqs),
          breadcrumbSchema(breadcrumbs),
        ]}
      />

      <Section>
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "GST Compliance", href: "/gst-compliance" }]} />
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <span className="eyebrow">GST Compliance</span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              GST Compliance: ITC, Notices & Penalty Avoidance
            </h1>
            <p className="mt-4 text-lg text-neutral-600">
              Registration and filing are just the start. Staying compliant means claiming input
              tax credit correctly, answering department notices on time, and steering clear of
              penalties. Our Compliance Pro plan covers all three.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">Input Tax Credit (ITC) Advisory</h2>
            <p className="mt-3 text-neutral-700">
              ITC lets you reduce the GST you owe on sales by the GST already paid on business
              purchases. To claim it, you need a valid tax invoice, the supplier must have filed
              their return and paid the tax, and the credit must reflect in your GSTR-2B. We
              reconcile your purchase register against GSTR-2B every month to catch mismatches before
              they become a notice.
            </p>
            <p className="mt-3 text-neutral-700">
              Some purchases are blocked from ITC entirely: motor vehicles for personal use, food and
              beverages, club memberships, and works contract services for immovable property, among
              others. We flag these during reconciliation so you don&apos;t over-claim by mistake.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">GST Notice Handling</h2>
            <p className="mt-3 text-neutral-700">
              GST notices have a fixed response window, commonly 7 to 15 days depending on the notice
              type, and non-response can lead to a best-judgment assessment or penalty. Common
              notices include GSTR-3A (for non-filing) and DRC-01C (for ITC mismatches with GSTR-2B).
              We read the notice, gather the requested information, and draft the response through
              the GST portal on your behalf.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">Penalties You Can Avoid</h2>
            <ul className="mt-3 space-y-2 text-neutral-700">
              <li>• Late filing fees (₹50/day regular, ₹20/day NIL returns), avoidable with reminders</li>
              <li>• 18% p.a. interest on delayed tax payment</li>
              <li>• Suo-motu cancellation of GSTIN after six months of continuous non-filing</li>
              <li>• 10% to 100% penalty for unregistered operation past the threshold</li>
            </ul>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">E-Way Bill Compliance</h2>
            <p className="mt-3 text-neutral-700">
              Goods movement above ₹50,000 in value requires a valid e-way bill generated before
              transport begins. We help set this up correctly, especially for businesses shipping
              inter-state or through third-party logistics partners.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">Cancelling GST Registration</h2>
            <p className="mt-3 text-neutral-700">
              If your business closes or falls below the threshold, GST registration can be
              cancelled, but all pending returns must be filed and a final GSTR-10 submitted first.
              We handle this wind-down for clients closing or restructuring their business.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">Why Financial Sage</h2>
            <p className="mt-3 text-neutral-700">
              Compliance Pro bundles GSTR-9 annual filing, monthly ITC reconciliation, and notice
              handling into one plan. See the full breakdown on our{" "}
              <Link href="/pricing" className="font-medium text-brand-700 underline">
                Pricing page
              </Link>
              .
            </p>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">Frequently Asked Questions</h2>
            <div className="mt-4">
              <FaqAccordion faqs={faqs} />
            </div>
          </div>

          <div>
            <StickyLeadSidebar source="gst-compliance-pillar" />
          </div>
        </div>
      </Section>
    </>
  );
}
