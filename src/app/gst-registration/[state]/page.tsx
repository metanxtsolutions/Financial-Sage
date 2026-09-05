import type { Metadata } from "next";
import { StateLocationPage } from "@/components/StateLocationPage";
import { getPublishedState, publishedStates } from "@/data/services/copy";

// L1 state page for gst-registration. Six lines of routing; everything else is
// shared. Adding a state is a data change in
// src/data/services/copy/gst-registration.ts, not a template change.
export const dynamicParams = false;

// The indexation gate. publishedStates() filters on contentStatus === "ready",
// so a state whose statutory figures are still unverified has no route at all.
export function generateStaticParams() {
  return publishedStates("gst-registration").map(({ state }) => ({ state: state.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const page = getPublishedState("gst-registration", state);
  if (!page) return {};
  return {
    title: { absolute: `GST Registration in ${page.state.name} | Financial Sage` },
    description: `Everything specific to registering for GST in ${page.state.name} — the state rules, which office handles it, and what it costs. Filed online by Financial Sage.`,
    alternates: { canonical: `/gst-registration/${page.state.slug}` },
  };
}

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  return <StateLocationPage serviceId="gst-registration" stateSlug={state} />;
}
