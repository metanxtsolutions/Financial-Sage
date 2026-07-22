import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StickyLeadSidebar } from "@/components/StickyLeadSidebar";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd, faqPageSchema, serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import { cities, getCity } from "@/data/cities";
import { getFaqsByIds } from "@/data/faqs";

// Programmatic city pages. See src/data/cities.ts for the single source of
// truth. Add more state/city entries there to scale to hundreds of pages
// with no template changes.
export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ state: c.stateSlug, city: c.citySlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}): Promise<Metadata> {
  const { state, city } = await params;
  const entry = getCity(state, city);
  if (!entry) return {};
  return {
    title: { absolute: `GST Registration in ${entry.city}, ${entry.state} | Financial Sage` },
    description: `Apply for GST registration in ${entry.city} online. Documents, process, and fees explained. Financial Sage files within 24 hours, Pan-India.`,
    alternates: { canonical: `/gst-registration/${entry.stateSlug}/${entry.citySlug}` },
  };
}

export default async function CityGstPage({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}) {
  const { state, city } = await params;
  const entry = getCity(state, city);
  if (!entry) notFound();

  const siblingCities = cities.filter(
    (c) => c.stateSlug === entry.stateSlug && c.citySlug !== entry.citySlug,
  );

  const faqIds = [
    entry.featuredFaqId,
    "how-long-gst-registration-takes",
    "govt-fee-gst-registration",
    "does-financial-sage-serve-pan-india",
  ];
  const faqs = getFaqsByIds(faqIds);
  const breadcrumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "GST Registration", url: `${siteConfig.url}/gst-registration` },
    { name: entry.city, url: `${siteConfig.url}/gst-registration/${entry.stateSlug}/${entry.citySlug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: `GST Registration in ${entry.city}`,
            description: `GST registration service for businesses in ${entry.city}, ${entry.state}.`,
            url: `${siteConfig.url}/gst-registration/${entry.stateSlug}/${entry.citySlug}`,
          }),
          faqPageSchema(faqs),
          breadcrumbSchema(breadcrumbs),
        ]}
      />

      <Section>
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "GST Registration", href: "/gst-registration" },
            { name: entry.city, href: `/gst-registration/${entry.stateSlug}/${entry.citySlug}` },
          ]}
        />
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              GST Registration in {entry.city}, {entry.state}
            </h1>
            <p className="mt-4 text-lg text-neutral-600">
              Financial Sage helps businesses in {entry.city} register for GST fully online, with no
              visit to a tax office. {entry.localNote} We file your application within 24
              hours of receiving documents and payment, and track it through to GSTIN issuance.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">
              Who in {entry.city} Needs GST Registration?
            </h2>
            <p className="mt-3 text-neutral-700">
              Any business in {entry.city} supplying goods with turnover above ₹40 lakh, or services
              above ₹20 lakh, must register for GST, wherever in {entry.state} they
              operate. E-commerce sellers and inter-state suppliers based in {entry.city} must
              register regardless of turnover. {entry.localSectors}
            </p>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">How We Work With {entry.city} Businesses</h2>
            <ul className="mt-3 space-y-2 text-neutral-700">
              <li>• Document collection over WhatsApp or email, with no office visit</li>
              <li>• Application filed within 24 hours of receiving documents and payment</li>
              <li>• Real-time ARN tracking until your GSTIN is issued</li>
              <li>• Ongoing monthly/quarterly filing support once registered</li>
            </ul>
            <p className="mt-4 text-sm text-neutral-500">
              This page covers registration specific to {entry.city}. For the full documents
              checklist, fee breakdown, and step-by-step process, see our{" "}
              <Link href="/gst-registration" className="font-medium text-brand-700 underline">
                GST registration guide
              </Link>
              .
            </p>

            {siblingCities.length > 0 && (
              <>
                <h2 className="mt-10 text-2xl font-bold text-neutral-900">Also Serving {entry.state}</h2>
                <p className="mt-3 text-neutral-700">
                  We also handle GST registration for businesses elsewhere in {entry.state}:
                </p>
                <ul className="mt-3 space-y-2 text-neutral-700">
                  {siblingCities.map((sibling) => (
                    <li key={sibling.citySlug}>
                      •{" "}
                      <Link
                        href={`/gst-registration/${sibling.stateSlug}/${sibling.citySlug}`}
                        className="font-medium text-brand-700 underline"
                      >
                        GST Registration in {sibling.city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">Frequently Asked Questions</h2>
            <div className="mt-4">
              <FaqAccordion faqs={faqs} />
            </div>
          </div>

          <div>
            <StickyLeadSidebar source={`city-${entry.stateSlug}-${entry.citySlug}`} />
          </div>
        </div>
      </Section>
    </>
  );
}
