import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StickyLeadSidebar } from "@/components/StickyLeadSidebar";
import { getOtherService, otherServices } from "@/data/other-services";

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

  return (
    <Section>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Other Services", href: "/other-services" },
          { name: service.title, href: `/other-services/${service.slug}` },
        ]}
      />
      <div className="mt-4 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">{service.title}</h1>
          <p className="mt-4 text-lg text-neutral-600">{service.summary}</p>
          <p className="mt-4 text-xl font-bold text-brand-700">From ₹{service.startingPrice}</p>

          <h2 className="mt-8 text-xl font-bold text-neutral-900">What&apos;s Included</h2>
          <ul className="mt-3 space-y-2 text-neutral-700">
            {service.bullets.map((b) => (
              <li key={b}>• {b}</li>
            ))}
          </ul>

          <p className="mt-8 text-sm text-neutral-500">
            This is a secondary service alongside our core GST practice. If your business also
            needs GST registration, see our{" "}
            <Link href="/gst-registration" className="font-medium text-brand-700 underline">
              GST Registration
            </Link>{" "}
            page.
          </p>
        </div>
        <div>
          <StickyLeadSidebar source={`other-service-${service.slug}`} />
        </div>
      </div>
    </Section>
  );
}
