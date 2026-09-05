import Link from "next/link";
import { Container } from "@/components/Container";
import { siteConfig } from "@/lib/site-config";
import { serviceCategories, getServicesByCategory } from "@/data/other-services";

const gstLinks = [
  { label: "GST Registration", href: "/gst-registration" },
  { label: "GST Return Filing", href: "/gst-return-filing" },
  { label: "GST Compliance", href: "/gst-compliance" },
  { label: "ITR Filing", href: "/itr-filing" },
  { label: "GST Tools", href: "/gst-tools" },
  { label: "Income Tax Tools", href: "/tax-tools" },
  { label: "GST Guides", href: "/gst-guides" },
  { label: "FAQs", href: "/faq" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
  { label: "Client Login", href: siteConfig.loginUrl },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <Container className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
        <div className="col-span-2">
          <div className="text-lg font-bold text-brand-700">{siteConfig.name}</div>
          <p className="mt-2 max-w-xs text-sm text-neutral-600">{siteConfig.tagline}</p>
          <p className="mt-4 text-sm text-neutral-600">
            {siteConfig.phoneDisplay}
            <br />
            {siteConfig.email}
          </p>
        </div>

        <div>
          <div className="text-sm font-semibold text-neutral-900">GST &amp; Tax</div>
          <ul className="mt-3 space-y-2">
            {gstLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-neutral-600 hover:text-brand-700">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold text-neutral-900">Company</div>
          <ul className="mt-3 space-y-2">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-neutral-600 hover:text-brand-700">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 sm:col-span-4">
          <div className="flex flex-wrap items-baseline gap-x-3">
            <div className="text-sm font-semibold text-neutral-900">Business & Compliance Services</div>
            <Link href="/other-services" className="text-sm text-brand-700 hover:underline">
              View all
            </Link>
          </div>

          {/* Grouped by category so the footer stays scannable as the
              catalogue grows. Each category shows its first six services and
              links through to the full list. */}
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
            {serviceCategories.map((category) => {
              const services = getServicesByCategory(category.id).slice(0, 6);
              if (services.length === 0) return null;

              return (
                <div key={category.id}>
                  <Link
                    href={`/other-services#${category.id}`}
                    className="text-xs font-semibold tracking-wide text-neutral-900 uppercase hover:text-brand-700"
                  >
                    {category.title}
                  </Link>
                  <ul className="mt-2 space-y-1.5">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/other-services/${service.slug}`}
                          className="text-sm text-neutral-600 hover:text-brand-700"
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

      </Container>

      <div className="border-t border-neutral-200 py-6">
        <Container className="flex flex-col gap-3 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/privacy-policy" className="hover:text-brand-700">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-700">Terms of Service</Link>
            <Link href="/refund-policy" className="hover:text-brand-700">Refund Policy</Link>
          </div>
          <p>{siteConfig.legalNote}</p>
        </Container>
      </div>
    </footer>
  );
}
