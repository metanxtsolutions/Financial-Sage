import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StickyLeadSidebar } from "@/components/StickyLeadSidebar";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd, faqPageSchema, serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import { getClusterBySlug, getClusterSlugs } from "@/data/gst-clusters";
import { getFaqsByIds } from "@/data/faqs";

// Programmatic GST topical cluster. See src/data/gst-clusters.ts for the
// single source of truth. dynamicParams is false, so any slug not in that
// file 404s instead of silently rendering.
export const dynamicParams = false;

export function generateStaticParams() {
  return getClusterSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cluster = getClusterBySlug(slug);
  if (!cluster) return {};
  return {
    title: { absolute: cluster.metaTitle },
    description: cluster.metaDescription,
    alternates: { canonical: `/${cluster.slug}` },
  };
}

export default async function ClusterPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cluster = getClusterBySlug(slug);
  if (!cluster) notFound();

  const faqs = getFaqsByIds(cluster.faqIds);
  const related = cluster.relatedSlugs
    .map((s) => getClusterBySlug(s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const breadcrumbs = [
    { name: "Home", url: siteConfig.url },
    { name: "GST Registration", url: `${siteConfig.url}/gst-registration` },
    { name: cluster.h1, url: `${siteConfig.url}/${cluster.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: cluster.h1,
            description: cluster.metaDescription,
            url: `${siteConfig.url}/${cluster.slug}`,
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
            { name: cluster.h1, href: `/${cluster.slug}` },
          ]}
        />
        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <span className="eyebrow">GST Registration</span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">{cluster.h1}</h1>
            <p className="mt-4 text-lg text-neutral-600">{cluster.intro}</p>

            <div className="mt-8 grid grid-cols-1 gap-4">
              {cluster.highlights.map((h) => (
                <div
                  key={h.title}
                  className="rounded-lg border border-neutral-200 border-l-4 border-l-brand-500 bg-white p-5 shadow-card"
                >
                  <div className="font-semibold text-neutral-900">{h.title}</div>
                  <div className="mt-1 text-sm text-neutral-600">{h.body}</div>
                </div>
              ))}
            </div>

            {faqs.length > 0 && (
              <>
                <h2 className="mt-10 text-2xl font-bold text-neutral-900">Frequently Asked Questions</h2>
                <div className="mt-4">
                  <FaqAccordion faqs={faqs} />
                </div>
              </>
            )}

            {related.length > 0 && (
              <>
                <h2 className="mt-10 text-2xl font-bold text-neutral-900">Related Reading</h2>
                <ul className="mt-3 flex flex-wrap gap-3">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/${r.slug}`}
                        className="inline-block rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:border-brand-500 hover:text-brand-700"
                      >
                        {r.h1}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <p className="mt-8 text-sm text-neutral-500">
              For the full GST registration walkthrough, covering eligibility, documents, fees, and
              penalties, see our main{" "}
              <Link href="/gst-registration" className="font-medium text-brand-700 underline">
                GST Registration guide
              </Link>
              .
            </p>
          </div>

          <div>
            <StickyLeadSidebar source={`cluster-${cluster.slug}`} />
          </div>
        </div>
      </Section>
    </>
  );
}
