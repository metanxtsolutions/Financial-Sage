import type { Metadata } from "next";
import { ServiceLocationPage } from "@/components/ServiceLocationPage";
import { getLocationPage, getLocationPages } from "@/data/service-locations";

// Programmatic city pages for company registration. Copy lives in
// src/data/service-locations.ts; add a city there and it appears here.
export const dynamicParams = false;

export function generateStaticParams() {
  return getLocationPages("company-registration").map(({ city }) => ({
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
  const page = getLocationPage("company-registration", state, city);
  if (!page) return {};
  const { city: entry } = page;
  return {
    title: {
      absolute: `Company Registration in ${entry.city}, ${entry.state} | Financial Sage`,
    },
    description: `Register a private limited company in ${entry.city} online. Name approval, DSC, SPICe+ filing, PAN and TAN, from ₹999. Filed by Financial Sage.`,
    alternates: { canonical: `/company-registration/${entry.stateSlug}/${entry.citySlug}` },
  };
}

export default async function CompanyRegistrationCityPage({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}) {
  const { state, city } = await params;
  return <ServiceLocationPage serviceId="company-registration" stateSlug={state} citySlug={city} />;
}
