import type { Metadata } from "next";
import { ServiceLocationPage } from "@/components/ServiceLocationPage";
import { getLocationPage, getLocationPages } from "@/data/service-locations";

// Programmatic city pages for ITR filing. These sit alongside /itr-filing
// (the landing page) and /itr-filing/apply (the wizard); both are single
// segments, so neither collides with this two-segment route.
export const dynamicParams = false;

export function generateStaticParams() {
  return getLocationPages("itr-filing").map(({ city }) => ({
    state: city.stateSlug,
    city: city.citySlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}): Promise<Metadata> {
  const { state, city } = await params;
  const page = getLocationPage("itr-filing", state, city);
  if (!page) return {};
  const { city: entry } = page;
  return {
    title: { absolute: `ITR Filing in ${entry.city}, ${entry.state} | Financial Sage` },
    description: `File your income tax return in ${entry.city} online. Old vs new regime compared, AIS reconciled, refund tracked. From ₹999 with Financial Sage.`,
    alternates: { canonical: `/itr-filing/${entry.stateSlug}/${entry.citySlug}` },
  };
}

export default async function ItrFilingCityPage({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}) {
  const { state, city } = await params;
  return <ServiceLocationPage serviceId="itr-filing" stateSlug={state} citySlug={city} />;
}
