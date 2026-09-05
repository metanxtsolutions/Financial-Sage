import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StickyLeadSidebar } from "@/components/StickyLeadSidebar";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd, faqPageSchema, serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import {
  getLocationFaqs,
  getLocationPage,
  getLocationPages,
  locationServices,
  type LocationServiceId,
} from "@/data/service-locations";

// Shared body for every non-GST location page. The route files under
// /company-registration and /itr-filing are thin wrappers around this, so a
// change to the layout lands on both at once.
export function ServiceLocationPage({
  serviceId,
  stateSlug,
  citySlug,
}: {
  serviceId: LocationServiceId;
  stateSlug: string;
  citySlug: string;
}) {
  const service = locationServices[serviceId];
  const page = getLocationPage(serviceId, stateSlug, citySlug);
  if (!page) notFound();

  const { city, copy } = page;
  const href = `${service.routeBase}/${city.stateSlug}/${city.citySlug}`;

  const siblingCities = getLocationPages(serviceId).filter(
    (p) => p.city.stateSlug === city.stateSlug && p.city.citySlug !== city.citySlug,
  );
  const otherCities = getLocationPages(serviceId).filter(
    (p) => p.city.stateSlug !== city.stateSlug,
  );

  const faqs = getLocationFaqs(serviceId, copy.featuredFaqId);
  const breadcrumbs = [
    { name: "Home", url: siteConfig.url },
    { name: service.label, url: `${siteConfig.url}${service.pillarHref}` },
    { name: city.city, url: `${siteConfig.url}${href}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: `${service.label} in ${city.city}`,
            description: `${service.label} for businesses and individuals in ${city.city}, ${city.state}.`,
            url: `${siteConfig.url}${href}`,
            areaServed: { level: "city", city: city.city, state: city.state },
          }),
          faqPageSchema(faqs),
          breadcrumbSchema(breadcrumbs),
        ]}
      />

      <Section>
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: service.label, href: service.pillarHref },
            { name: city.city, href },
          ]}
        />
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <span className="eyebrow">{service.label}</span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              {service.label} in {city.city}, {city.state}
            </h1>
            <p className="mt-4 text-lg text-neutral-600">{copy.intro}</p>
            <p className="mt-4 text-xl font-bold text-brand-700">From ₹{service.startingPrice}</p>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">
              {service.audienceHeading(city.city)}
            </h2>
            <p className="mt-3 text-neutral-700">{copy.demand}</p>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">How We Work</h2>
            <ul className="mt-3 space-y-2 text-neutral-700">
              {service.howWeWork.map((step) => (
                <li key={step}>• {step}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-neutral-500">
              This page covers {service.labelLower} specifically for {city.city}. For the
              full inclusions and document checklist, see our{" "}
              <Link href={service.pillarHref} className="font-medium text-brand-700 underline">
                {service.pillarLabel}
              </Link>
              .
            </p>

            {siblingCities.length > 0 && (
              <>
                <h2 className="mt-10 text-2xl font-bold text-neutral-900">
                  Also Serving {city.state}
                </h2>
                <ul className="mt-3 space-y-2 text-neutral-700">
                  {siblingCities.map(({ city: sibling }) => (
                    <li key={sibling.citySlug}>
                      •{" "}
                      <Link
                        href={`${service.routeBase}/${sibling.stateSlug}/${sibling.citySlug}`}
                        className="font-medium text-brand-700 underline"
                      >
                        {service.label} in {sibling.city}
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

            {otherCities.length > 0 && (
              <>
                <h2 className="mt-10 text-2xl font-bold text-neutral-900">
                  {service.label} Elsewhere in India
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {otherCities.map(({ city: other }) => (
                    <Link
                      key={`${other.stateSlug}-${other.citySlug}`}
                      href={`${service.routeBase}/${other.stateSlug}/${other.citySlug}`}
                      className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-brand-300 hover:text-brand-700"
                    >
                      {other.city}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          <div>
            <StickyLeadSidebar
              source={`${serviceId}-${city.stateSlug}-${city.citySlug}`}
              heading={service.ctaHeading}
              blurb={service.ctaBlurb}
              submitLabel={service.ctaSubmitLabel}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
