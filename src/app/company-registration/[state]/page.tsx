import type { Metadata } from "next";
import { StateLocationPage } from "@/components/StateLocationPage";
import { getPublishedState, publishedStates } from "@/data/services/copy";

// L1 state page for company-registration. Six lines of routing; everything else is
// shared. Adding a state is a data change in
// src/data/services/copy/company-registration.ts, not a template change.
export const dynamicParams = false;

// The indexation gate. publishedStates() filters on contentStatus === "ready",
// so a state whose statutory figures are still unverified has no route at all.
export function generateStaticParams() {
  return publishedStates("company-registration").map(({ state }) => ({ state: state.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const page = getPublishedState("company-registration", state);
  if (!page) return {};
  return {
    title: { absolute: `Company Registration in ${page.state.name} | Financial Sage` },
    description: `Everything specific to incorporating a company in ${page.state.name} — the state rules, which office handles it, and what it costs. Filed online by Financial Sage.`,
    alternates: { canonical: `/company-registration/${page.state.slug}` },
  };
}

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  return <StateLocationPage serviceId="company-registration" stateSlug={state} />;
}
