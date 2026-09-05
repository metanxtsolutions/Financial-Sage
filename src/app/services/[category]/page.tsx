import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StickyLeadSidebar } from "@/components/StickyLeadSidebar";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd, faqPageSchema, breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import {
  getServicesByCategory,
  getServiceCategoryBySlug,
  serviceCategories,
} from "@/data/other-services";

// Hub page per service category. These sit at /services/[category] rather than
// under /other-services because that path's single dynamic segment is already
// taken by the 74 service detail pages, and those URLs are live.
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const entry = getServiceCategoryBySlug(category);
  if (!entry) return {};
  return {
    title: { absolute: entry.metaTitle },
    description: entry.metaDescription,
    alternates: { canonical: `/services/${entry.slug}` },
  };
}

export default async function ServiceCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const entry = getServiceCategoryBySlug(category);
  if (!entry) notFound();

  const services = getServicesByCategory(entry.id);
  const siblings = serviceCategories.filter((c) => c.id !== entry.id);
  const isGstCategory = entry.id === "gst-specialist";

  const breadcrumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "Services", url: `${siteConfig.url}/other-services` },
    { name: entry.title, url: `${siteConfig.url}/services/${entry.slug}` },
  ];

  return (
    <>
      <JsonLd data={[faqPageSchema(entry.faqs), breadcrumbSchema(breadcrumbs)]} />

      <Section>
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Services", href: "/other-services" },
            { name: entry.title, href: `/services/${entry.slug}` },
          ]}
        />

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <span className="eyebrow">Services</span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              {entry.h1}
            </h1>
            <p className="mt-4 text-lg text-neutral-600">{entry.intro}</p>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">{entry.guidance.heading}</h2>
            <p className="mt-3 text-neutral-700">{entry.guidance.body}</p>
            <ul className="mt-4 space-y-3">
              {entry.guidance.points.map((point) => (
                <li key={point} className="flex gap-3 text-neutral-700">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-2xl font-bold text-neutral-900">
              {entry.title} Services ({services.length})
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/other-services/${service.slug}`}
                  className="group flex flex-col rounded-xl border border-neutral-200 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card-hover"
                >
                  <span className="font-semibold text-neutral-900 group-hover:text-brand-700">
                    {service.title}
                  </span>
                  <span className="mt-2 flex-1 text-sm text-neutral-600">{service.summary}</span>
                  <span className="mt-3 text-sm font-semibold text-brand-700">
                    From ₹{service.startingPrice}
                  </span>
                </Link>
              ))}
            </div>

            {isGstCategory && (
              <p className="mt-6 rounded-xl border border-brand-100 bg-brand-50 px-5 py-4 text-sm text-brand-800">
                Looking for GST registration or monthly return filing instead? Those are our core
                practice:{" "}
                <Link href="/gst-registration" className="font-semibold underline">
                  GST Registration
                </Link>{" "}
                and{" "}
                <Link href="/gst-return-filing" className="font-semibold underline">
                  GST Return Filing
                </Link>
                .
              </p>
            )}

            <h2 className="mt-12 text-2xl font-bold text-neutral-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-4">
              <FaqAccordion faqs={entry.faqs} />
            </div>

            <h2 className="mt-12 text-2xl font-bold text-neutral-900">Other Service Categories</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {siblings.map((sibling) => (
                <Link
                  key={sibling.id}
                  href={`/services/${sibling.slug}`}
                  className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-brand-300 hover:text-brand-700"
                >
                  {sibling.title}
                </Link>
              ))}
              <Link
                href="/other-services"
                className="rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 transition-colors hover:border-brand-300"
              >
                All services
              </Link>
            </div>
          </div>

          <div>
            <StickyLeadSidebar
              source={`category-${entry.id}`}
              heading={entry.ctaHeading}
              blurb="Free consultation. Tell us what your business does and we'll tell you exactly what applies."
              submitLabel={entry.ctaSubmitLabel}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
