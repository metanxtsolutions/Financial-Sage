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
  title: "GST Registration Online in India — Documents, Fees & Process",
  description:
    "Complete guide to GST registration in India: eligibility, turnover thresholds, documents by entity type, fees, process, and penalties. Registration starts from ₹399.",
  alternates: { canonical: "/gst-registration" },
};

const pageFaqIds = [
  "who-needs-gst-registration",
  "voluntary-gst-registration",
  "gst-registration-threshold-states",
  "multiple-state-registration",
  "gst-for-home-business",
  "gst-registration-rejection",
  "digital-signature-needed",
  "govt-fee-gst-registration",
  "how-long-gst-registration-takes",
  "arn-meaning",
  "physical-verification-needed",
  "penalty-not-registering",
  "common-registration-mistakes",
];

const documentsByEntity = [
  {
    entity: "Sole Proprietor",
    documents: "PAN & Aadhaar of proprietor, photograph, business address proof, bank account proof.",
  },
  {
    entity: "Partnership / LLP",
    documents: "Partnership deed / LLP agreement, PAN of firm, PAN & Aadhaar of all partners, address proof, bank proof, DSC (for LLP).",
  },
  {
    entity: "HUF",
    documents: "PAN of HUF, PAN & Aadhaar of Karta, HUF declaration/deed, address & bank proof.",
  },
  {
    entity: "Private / Public Company",
    documents: "Certificate of Incorporation, MOA/AOA, company PAN, director PAN/Aadhaar, board resolution, DSC, address & bank proof.",
  },
  {
    entity: "Foreign Company",
    documents: "Passport of authorised signatory, incorporation proof from home country, Indian address & bank proof.",
  },
];

const processSteps = [
  { title: "Free consultation", body: "We confirm whether you need or should opt for GST registration and identify the right document checklist for your entity type." },
  { title: "Document collection", body: "Share documents over WhatsApp or email — we review for completeness before filing to avoid delays." },
  { title: "Application filing", body: "We complete and submit Form REG-01 on the GST portal along with your reviewed documents." },
  { title: "ARN & verification", body: "You get an Application Reference Number instantly; Aadhaar e-KYC verification typically happens online." },
  { title: "GSTIN issued", body: "Once approved, your GSTIN and REG-06 certificate are generated — usually within 3–7 working days." },
  { title: "Post-registration support", body: "We help you set up compliant invoicing and flag your first return due date." },
];

export default function GstRegistrationPage() {
  const faqs = getFaqsByIds(pageFaqIds);
  const breadcrumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "GST Registration", url: `${siteConfig.url}/gst-registration` },
  ];

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: "GST Registration",
            description: "Expert-assisted GST registration for Indian businesses, starting from ₹399.",
            url: `${siteConfig.url}/gst-registration`,
          }),
          faqPageSchema(faqs),
          breadcrumbSchema(breadcrumbs),
        ]}
      />

      <Section>
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "GST Registration", href: "/gst-registration" }]} />
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              GST Registration Online in India
            </h1>
            <p className="mt-4 text-lg text-neutral-600">
              GST registration is the process of enrolling your business under India&apos;s Goods and
              Services Tax system and obtaining a GSTIN. Financial Sage handles the entire process —
              from document review to GSTIN issuance — starting from ₹399, with filing completed
              within 24 hours of receiving your documents and payment.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">What is GST & GSTIN?</h2>
            <p className="mt-3 text-neutral-700">
              GST (Goods and Services Tax) is India&apos;s unified indirect tax on the supply of goods
              and services. Every business registered under GST is issued a GSTIN — a unique
              15-digit, state-specific, PAN-based identification number used on every invoice,
              return, and payment.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">Who Needs GST Registration?</h2>
            <p className="mt-3 text-neutral-700">Registration is mandatory once your turnover crosses:</p>
            <ul className="mt-3 space-y-2 text-neutral-700">
              <li>• <strong>₹40 lakh</strong> for suppliers of goods (₹20 lakh in special-category states)</li>
              <li>• <strong>₹20 lakh</strong> for suppliers of services (₹10 lakh in special-category states)</li>
            </ul>
            <p className="mt-3 text-neutral-700">
              Registration is mandatory regardless of turnover for inter-state suppliers, e-commerce
              sellers, casual taxable persons, and businesses liable under reverse charge. Many
              freelancers and small businesses also register voluntarily below the threshold to claim
              input tax credit or work with GST-registered clients.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">Benefits of GST Registration</h2>
            <ul className="mt-3 grid grid-cols-1 gap-2 text-neutral-700 sm:grid-cols-2">
              <li>• Legal recognition as a supplier of goods/services</li>
              <li>• Ability to claim input tax credit (ITC)</li>
              <li>• Eligibility to sell on e-commerce marketplaces</li>
              <li>• Easier access to business loans and current accounts</li>
              <li>• Ability to do inter-state business without restriction</li>
              <li>• Improved credibility with B2B clients</li>
            </ul>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">Types of GST</h2>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { name: "CGST", body: "Central GST — collected by the central government on intra-state sales." },
                { name: "SGST", body: "State GST — collected by the state government on intra-state sales, alongside CGST." },
                { name: "IGST", body: "Integrated GST — collected on inter-state sales and imports." },
                { name: "UTGST", body: "Union Territory GST — applies instead of SGST in Union Territories without their own legislature." },
              ].map((t) => (
                <div key={t.name} className="rounded-lg border border-neutral-200 bg-white p-4 shadow-card">
                  <div className="font-semibold text-neutral-900">{t.name}</div>
                  <div className="mt-1 text-sm text-neutral-600">{t.body}</div>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">Documents Required, By Entity Type</h2>
            <div className="mt-4 overflow-x-auto rounded-lg border border-neutral-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-neutral-50 text-neutral-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Entity Type</th>
                    <th className="px-4 py-3 font-semibold">Documents Required</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {documentsByEntity.map((row) => (
                    <tr key={row.entity}>
                      <td className="px-4 py-3 font-medium text-neutral-900 align-top whitespace-nowrap">{row.entity}</td>
                      <td className="px-4 py-3 text-neutral-600">{row.documents}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-neutral-500">
              See the full{" "}
              <Link href="/gst-registration-documents" className="font-medium text-brand-700 underline">
                documents checklist page
              </Link>{" "}
              for format requirements and address-proof specifics.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">Step-by-Step Registration Process</h2>
            <ol className="mt-4 space-y-4">
              {processSteps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">{step.title}</div>
                    <div className="text-sm text-neutral-600">{step.body}</div>
                  </div>
                </li>
              ))}
            </ol>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">Fees & Timeline</h2>
            <p className="mt-3 text-neutral-700">
              The government charges <strong>zero fee</strong> for GST registration. Our service fee
              starts from <strong>₹399</strong> and covers consultation, document review, filing, and
              follow-up. We file your application within 24 hours of receiving documents and payment;
              GSTIN issuance typically takes 3–7 working days depending on the department&apos;s review.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">Penalties for Non-Compliance</h2>
            <p className="mt-3 text-neutral-700">
              Operating without mandatory GST registration attracts a penalty of 10% of the tax due
              (minimum ₹10,000), or 100% of the tax due in cases of deliberate evasion — on top of
              losing the ability to claim input tax credit or legally invoice GST-registered clients.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">Common Mistakes to Avoid</h2>
            <ul className="mt-3 space-y-2 text-neutral-700">
              <li>• Name/address mismatches between PAN and address proof</li>
              <li>• Blurry or oversized document uploads</li>
              <li>• Choosing the wrong business constitution type</li>
              <li>• Missing DSC/e-sign from the authorised signatory</li>
              <li>• Incorrect HSN/SAC code for the principal business activity</li>
            </ul>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">Why Financial Sage</h2>
            <p className="mt-3 text-neutral-700">
              We review every document before filing to avoid clarification notices, track your ARN
              proactively instead of leaving you to check the portal, and stay reachable on WhatsApp
              throughout — all at a transparent, published price.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">Frequently Asked Questions</h2>
            <div className="mt-4">
              <FaqAccordion faqs={faqs} />
            </div>
          </div>

          <div>
            <StickyLeadSidebar source="gst-registration-pillar" />
          </div>
        </div>
      </Section>
    </>
  );
}
