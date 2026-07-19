import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Container";
import { otherServices } from "@/data/other-services";

export const metadata: Metadata = {
  title: "Other Services — Company Registration, Trademark, ITR & More",
  description: "Secondary business services from Financial Sage alongside our core GST practice: company/LLP registration, trademark, ITR filing, and ROC compliance.",
  alternates: { canonical: "/other-services" },
};

export default function OtherServicesPage() {
  return (
    <Section>
      <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">Other Services</h1>
      <p className="mt-4 max-w-2xl text-lg text-neutral-600">
        GST is our specialisation — these are secondary services we offer alongside it, with the
        same document-first, WhatsApp-friendly process.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {otherServices.map((service) => (
          <Link
            key={service.slug}
            href={`/other-services/${service.slug}`}
            className="flex flex-col rounded-xl border border-neutral-200 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <h2 className="font-semibold text-neutral-900">{service.title}</h2>
            <p className="mt-2 flex-1 text-sm text-neutral-600">{service.summary}</p>
            <p className="mt-3 text-sm font-semibold text-brand-700">From ₹{service.startingPrice}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
