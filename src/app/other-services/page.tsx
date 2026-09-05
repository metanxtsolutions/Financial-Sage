import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Container";
import { otherServices, serviceCategories, getServicesByCategory } from "@/data/other-services";

export const metadata: Metadata = {
  title: "Business Services: Registration, Licences, Tax, ROC & Trademark",
  description:
    "Company and LLP registration, FSSAI and IEC licences, income tax and TDS filing, ROC annual compliance, trademark and patent work, and specialist GST jobs. Filed by Financial Sage.",
  alternates: { canonical: "/other-services" },
};

export default function OtherServicesPage() {
  return (
    <Section>
      <span className="eyebrow">Services</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
        Business & Compliance Services
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-neutral-600">
        GST is our specialisation, and it keeps its own{" "}
        <Link href="/gst-registration" className="font-medium text-brand-700 underline">
          dedicated pages
        </Link>
        . Everything below is an adjacent statutory service we file on the same document-first,
        WhatsApp-friendly process, with {otherServices.length} services across{" "}
        {serviceCategories.length} categories. Each category has its own page explaining what
        applies to whom.
      </p>

      <nav aria-label="Service categories" className="mt-8 flex flex-wrap gap-2">
        {serviceCategories.map((category) => (
          <a
            key={category.id}
            href={`#${category.id}`}
            className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-brand-300 hover:text-brand-700"
          >
            {category.title}
          </a>
        ))}
      </nav>

      {serviceCategories.map((category) => {
        const services = getServicesByCategory(category.id);
        if (services.length === 0) return null;

        return (
          <section key={category.id} id={category.id} className="mt-14 scroll-mt-24">
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
              <Link href={`/services/${category.slug}`} className="hover:text-brand-700">
                {category.title}
              </Link>
            </h2>
            <p className="mt-2 max-w-2xl text-neutral-600">{category.blurb}</p>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/other-services/${service.slug}`}
                  className="flex flex-col rounded-xl border border-neutral-200 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <h3 className="font-semibold text-neutral-900">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-neutral-600">{service.summary}</p>
                  <p className="mt-3 text-sm font-semibold text-brand-700">
                    From ₹{service.startingPrice}
                  </p>
                </Link>
              ))}
            </div>

            <Link
              href={`/services/${category.slug}`}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline"
            >
              More about {category.title}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </section>
        );
      })}
    </Section>
  );
}
