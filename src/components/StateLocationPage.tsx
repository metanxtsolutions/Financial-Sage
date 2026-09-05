import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StickyLeadSidebar } from "@/components/StickyLeadSidebar";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd, faqPageSchema, serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import { getFaqsByIds } from "@/data/faqs";
import { getService } from "@/data/services/registry";
import { getPublishedState, type StateServiceId } from "@/data/services/copy";
import { citiesInState } from "@/data/geo/cities";
import { districtsInState, districtTableReady, hasOwnPage } from "@/data/geo/districts";
import { cityPath, statePath } from "@/lib/geo";
import { cities as gstCities } from "@/data/cities";
import { getLocationPages } from "@/data/service-locations";

// The L1 state page, shared by every service that has one.
//
// This layer carries the differentiation the whole programme rests on: the
// statutory section is genuinely per-state, and every city page beneath it
// inherits that difference by linking up rather than restating it. Sections with
// no data for a given state are omitted entirely rather than rendered empty —
// a half-filled section is worse than a missing one.

/** Which city pages actually exist under this service, so we never link to a 404. */
function publishedCitySlugs(serviceId: StateServiceId, stateSlug: string): Set<string> {
  if (serviceId === "gst-registration") {
    return new Set(gstCities.filter((c) => c.stateSlug === stateSlug).map((c) => c.citySlug));
  }
  return new Set(
    getLocationPages("company-registration")
      .filter(({ city }) => city.stateSlug === stateSlug)
      .map(({ city }) => city.citySlug),
  );
}

export function StateLocationPage({
  serviceId,
  stateSlug,
}: {
  serviceId: StateServiceId;
  stateSlug: string;
}) {
  const page = getPublishedState(serviceId, stateSlug);
  const service = getService(serviceId);
  if (!page || !service) notFound();

  const { state, copy } = page;
  const href = statePath(service.routeBase, state);

  const livingCitySlugs = publishedCitySlugs(serviceId, state.slug);
  const linkedCities = citiesInState(state.slug).filter((c) => livingCitySlugs.has(c.slug));

  // Districts without a page of their own are listed, not linked. That is the
  // point of the table: it is useful content, and it passes crawl signal
  // downward without spawning a thin URL for a district nobody searches.
  const districts = districtsInState(state.slug);
  const showDistrictTable = districtTableReady(state.slug);

  const faqs = getFaqsByIds(copy.faqIds);

  const breadcrumbs = [
    { name: "Home", url: siteConfig.url },
    { name: service.label, url: `${siteConfig.url}${service.pillarHref}` },
    { name: state.name, url: `${siteConfig.url}${href}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: `${service.label} in ${state.name}`,
            description: `${service.label} for businesses across ${state.name}, including the statutory requirements specific to the state.`,
            url: `${siteConfig.url}${href}`,
            areaServed: { level: "state", state: state.name },
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
            { name: state.name, href },
          ]}
        />

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <span className="eyebrow">{service.label}</span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              {service.label} in {state.name}
            </h1>
            <p className="mt-4 text-lg text-neutral-600">{copy.intro}</p>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">
              What Differs in {state.name}
            </h2>
            <ul className="mt-3 space-y-2 text-neutral-700">
              {copy.statutory.map((point) => (
                <li key={point}>• {point}</li>
              ))}
            </ul>

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">
              Which Office Handles It
            </h2>
            <p className="mt-3 text-neutral-700">{copy.jurisdiction}</p>

            {copy.costNote && (
              <>
                <h2 className="mt-10 text-2xl font-bold text-neutral-900">
                  What It Costs in {state.name}
                </h2>
                <p className="mt-3 text-neutral-700">{copy.costNote}</p>
              </>
            )}

            {copy.proof && (
              <>
                <h2 className="mt-10 text-2xl font-bold text-neutral-900">
                  Our Work in {state.name}
                </h2>
                <p className="mt-3 text-neutral-700">{copy.proof}</p>
              </>
            )}

            <p className="mt-8 text-sm text-neutral-500">
              This page covers what is specific to {state.name}. For the documents
              checklist, the full process and our fees, see our{" "}
              <Link href={service.pillarHref} className="font-medium text-brand-700 underline">
                {service.labelLower} guide
              </Link>
              .
            </p>

            {linkedCities.length > 0 && (
              <>
                <h2 className="mt-10 text-2xl font-bold text-neutral-900">
                  Cities We Serve in {state.name}
                </h2>
                <ul className="mt-3 space-y-2 text-neutral-700">
                  {linkedCities.map((city) => (
                    <li key={city.slug}>
                      •{" "}
                      <Link
                        href={cityPath(service.routeBase, city)}
                        className="font-medium text-brand-700 underline"
                      >
                        {service.label} in {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {showDistrictTable && (
              <>
                <h2 className="mt-10 text-2xl font-bold text-neutral-900">
                  Districts of {state.name}
                </h2>
                <p className="mt-3 text-neutral-700">
                  We handle {service.labelLower} for businesses in every district of{" "}
                  {state.name}, remotely. Districts with a page of their own are linked.
                </p>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[420px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-neutral-200 text-neutral-500">
                        <th className="py-2 pr-4 font-medium">District</th>
                        <th className="py-2 font-medium">Main commercial town</th>
                      </tr>
                    </thead>
                    <tbody>
                      {districts.map((district) => {
                        const linked = hasOwnPage(district) && livingCitySlugs.has(district.slug);
                        return (
                          <tr key={district.slug} className="border-b border-neutral-100">
                            <td className="py-2 pr-4 text-neutral-700">
                              {linked ? (
                                <Link
                                  href={cityPath(service.routeBase, {
                                    stateSlug: district.stateSlug,
                                    slug: district.slug,
                                  })}
                                  className="font-medium text-brand-700 underline"
                                >
                                  {district.name}
                                </Link>
                              ) : (
                                district.name
                              )}
                            </td>
                            <td className="py-2 text-neutral-600">{district.hqTown}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            <h2 className="mt-10 text-2xl font-bold text-neutral-900">
              Frequently Asked Questions
            </h2>
            <div className="mt-4">
              <FaqAccordion faqs={faqs} />
            </div>
          </div>

          <div>
            <StickyLeadSidebar source={`state-${serviceId}-${state.slug}`} />
          </div>
        </div>
      </Section>
    </>
  );
}
