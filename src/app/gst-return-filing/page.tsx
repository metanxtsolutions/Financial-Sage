import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StickyLeadSidebar } from "@/components/StickyLeadSidebar";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd, faqPageSchema, serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import { getFaqsByIds } from "@/data/faqs";
import { monthlyFilingFrom } from "@/data/pricing";

export const metadata: Metadata = {
  title: "GST Return Filing — GSTR-1, GSTR-3B & GSTR-9",
  description:
    "Monthly and quarterly GST return filing (GSTR-1, GSTR-3B, GSTR-9) for Indian businesses, starting from ₹299. On-time filing, reconciled before submission.",
  alternates: { canonical: "/gst-return-filing" },
};

const pageFaqIds = [
  "gstr1-vs-gstr3b",
  "gst-return-due-dates",
  "qrmp-scheme",
  "nil-return-filing",
  "gstr9-annual-return",
  "e-way-bill-requirement",
  "revising-filed-return",
  "late-fee-gst-return",
  "common-filing-mistakes",
];

const returnTypes = [
  { name: "GSTR-1", body: "Monthly/quarterly statement of outward supplies (sales) — feeds your buyers' input tax credit." },
  { name: "GSTR-3B", body: "Monthly summary return declaring sales, purchases, tax liability, and net GST payment." },
  { name: "GSTR-9", body: "Annual return consolidating all monthly/quarterly filings for the financial year." },
  { name: "GSTR-9C", body: "Reconciliation statement required alongside GSTR-9 above a notified turnover threshold." },
];

export default function GstReturnFilingPage() {
  const faqs = getFaqsByIds(pageFaqIds);
  const breadcrumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "GST Return Filing", url: `${siteConfig.url}/gst-return-filing` },
  ];

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: "GST Return Filing",
            description: "Monthly, quarterly, and annual GST return filing for Indian businesses.",
            url: `${siteConfig.url}/gst-return-filing`,
          }),
          faqPageSchema(faqs),
          breadcrumbSchema(breadcrumbs),
        ]}
      />

      <Section className="pb-6 pt-8">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "GST Return Filing", href: "/gst-return-filing" }]} />
      </Section>

      <Section className="pt-0">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              GST Return Filing — Monthly, Quarterly & Annual
            </h1>
            <p className="mt-4 text-lg text-neutral-600">
              Every GST-registered business must file returns on a fixed schedule — regardless of
              whether there was any sale in that period. Our GST filing plans start from ₹{monthlyFilingFrom}{" "}
              per return, with every filing reconciled against your purchase and sales data before
              submission.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">Overview of GST Returns</h2>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {returnTypes.map((t) => (
                <div key={t.name} className="rounded-lg border border-neutral-200 p-4">
                  <div className="font-semibold text-neutral-900">{t.name}</div>
                  <div className="mt-1 text-sm text-neutral-600">{t.body}</div>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">Due Dates</h2>
            <ul className="mt-3 space-y-2 text-neutral-700">
              <li>• <strong>GSTR-1</strong>: 11th of the following month (monthly filers)</li>
              <li>• <strong>GSTR-3B</strong>: 20th of the following month (monthly filers)</li>
              <li>• <strong>QRMP filers</strong>: GSTR-1 by the 13th, GSTR-3B by the 22nd/24th after the quarter, with monthly tax payment via challan</li>
              <li>• <strong>GSTR-9</strong>: annual, by the government-notified due date each year (commonly December 31 following the financial year)</li>
            </ul>
            <p className="mt-3 text-neutral-700">
              Use our{" "}
              <Link href="/gst-tools/gst-due-date-checker" className="font-medium text-brand-700 underline">
                GST due-date checker tool
              </Link>{" "}
              to keep these handy, or let us send you filing reminders as part of any paid plan.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">The QRMP Scheme</h2>
            <p className="mt-3 text-neutral-700">
              Businesses with turnover up to ₹5 crore can opt for QRMP (Quarterly Return, Monthly
              Payment) — filing GSTR-1 and GSTR-3B quarterly while still paying tax monthly via a
              simple challan. It reduces filing frequency without delaying tax payment to the
              government.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">NIL Returns</h2>
            <p className="mt-3 text-neutral-700">
              Even with zero business activity in a period, a NIL GSTR-1 and GSTR-3B must still be
              filed. Skipping this attracts late fees and can put your registration at risk of
              cancellation if pending for a prolonged period.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">E-Way Bills</h2>
            <p className="mt-3 text-neutral-700">
              An e-way bill is required for movement of goods valued above ₹50,000 by road, rail,
              air, or vessel. It must be generated before the goods start moving. We help set up and
              validate e-way bills as part of our filing plans.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">Late Fees & Interest</h2>
            <p className="mt-3 text-neutral-700">
              Late filing attracts ₹50/day (₹25 CGST + ₹25 SGST) for regular returns, or ₹20/day for
              NIL returns, subject to a turnover-based cap — plus 18% per annum interest on any tax
              paid late. Try our{" "}
              <Link href="/gst-tools/gst-late-fee-calculator" className="font-medium text-brand-700 underline">
                late fee calculator
              </Link>{" "}
              and{" "}
              <Link href="/gst-tools/gst-interest-calculator" className="font-medium text-brand-700 underline">
                interest calculator
              </Link>{" "}
              to estimate what you owe.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">Common Filing Mistakes</h2>
            <ul className="mt-3 space-y-2 text-neutral-700">
              <li>• Mismatched sales figures between GSTR-1 and GSTR-3B</li>
              <li>• Claiming ineligible input tax credit</li>
              <li>• Missing reverse-charge liability</li>
              <li>• Forgetting to file NIL returns</li>
              <li>• Late tax payment leading to avoidable interest</li>
            </ul>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">Why Financial Sage</h2>
            <p className="mt-3 text-neutral-700">
              We reconcile your GSTR-1 and GSTR-3B figures every month before filing, track your due
              dates so you never file late, and flag ITC mismatches against GSTR-2B proactively — see
              our{" "}
              <Link href="/pricing" className="font-medium text-brand-700 underline">
                Business and Compliance Pro plans
              </Link>
              .
            </p>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">Frequently Asked Questions</h2>
            <div className="mt-4">
              <FaqAccordion faqs={faqs} />
            </div>
          </div>

          <div>
            <StickyLeadSidebar source="gst-return-filing-pillar" />
          </div>
        </div>
      </Section>
    </>
  );
}
