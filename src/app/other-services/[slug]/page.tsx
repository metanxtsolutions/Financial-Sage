import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StickyLeadSidebar } from "@/components/StickyLeadSidebar";
import {
  getOtherService,
  getRelatedServices,
  getServiceCategory,
  otherServices,
} from "@/data/other-services";
import { getLocationPages, hasLocationPages, locationServices } from "@/data/service-locations";

export const dynamicParams = false;

export function generateStaticParams() {
  return otherServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getOtherService(slug);
  if (!service) return {};
  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: `/other-services/${slug}` },
  };
}

export default async function OtherServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getOtherService(slug);
  if (!service) notFound();

  const category = getServiceCategory(service.category);
  const related = getRelatedServices(service.slug);
  const isGstSpecialist = service.category === "gst-specialist";

  // A few services have programmatic city pages beneath them. Linking to them
  // from here is what gets them crawled.
  const locationPages = hasLocationPages(service.slug) ? getLocationPages(service.slug) : [];
  const locationRouteBase = hasLocationPages(service.slug)
    ? locationServices[service.slug].routeBase
    : null;

  return (
    <Section>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/other-services" },
          ...(category ? [{ name: category.title, href: `/other-services#${category.id}` }] : []),
          { name: service.title, href: `/other-services/${service.slug}` },
        ]}
      />
      <div className="mt-4 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <span className="eyebrow">{category?.title ?? "Services"}</span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">{service.title}</h1>
          <p className="mt-4 text-lg text-neutral-600">{service.summary}</p>
          <p className="mt-4 text-xl font-bold text-brand-700">From ₹{service.startingPrice}</p>

          <h2 className="mt-8 text-xl font-bold text-neutral-900">What&apos;s Included</h2>
          <ul className="mt-3 space-y-2 text-neutral-700">
            {service.bullets.map((b) => (
              <li key={b}>• {b}</li>
            ))}
          </ul>

          {locationPages.length > 0 && locationRouteBase && (
            <>
              <h2 className="mt-10 text-xl font-bold text-neutral-900">Where We File</h2>
              <p className="mt-2 text-neutral-600">
                We work Pan-India. These cities have a page of their own covering local
                requirements:
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {locationPages.map(({ city }) => (
                  <Link
                    key={`${city.stateSlug}-${city.citySlug}`}
                    href={`${locationRouteBase}/${city.stateSlug}/${city.citySlug}`}
                    className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-brand-300 hover:text-brand-700"
                  >
                    {city.city}
                  </Link>
                ))}
              </div>
            </>
          )}

          {related.length > 0 && (
            <>
              <h2 className="mt-10 text-xl font-bold text-neutral-900">
                Also in {category?.title ?? "this category"}
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/other-services/${r.slug}`}
                    className="rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-700 transition-colors hover:border-brand-300 hover:text-brand-700"
                  >
                    {r.title}
                  </Link>
                ))}
              </div>
            </>
          )}

          <p className="mt-10 text-sm text-neutral-500">
            {isGstSpecialist ? (
              <>
                This is a one-off GST job. If you need ongoing monthly filing, see{" "}
                <Link href="/gst-return-filing" className="font-medium text-brand-700 underline">
                  GST Return Filing
                </Link>
                , or start with{" "}
                <Link href="/gst-registration" className="font-medium text-brand-700 underline">
                  GST Registration
                </Link>{" "}
                if you are not registered yet.
              </>
            ) : (
              <>
                This sits alongside our core GST practice. If your business also needs GST
                registration, see our{" "}
                <Link href="/gst-registration" className="font-medium text-brand-700 underline">
                  GST Registration
                </Link>{" "}
                page.
              </>
            )}
          </p>
        </div>
        <div>
          <StickyLeadSidebar
            source={`other-service-${service.slug}`}
            heading={`Talk to us about ${service.title}`}
            blurb="Free consultation. Tell us where your business is and we'll tell you exactly what's needed."
            submitLabel="Request a Callback"
          />
        </div>
      </div>
    </Section>
  );
}
