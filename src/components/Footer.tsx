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
    <footer className="bg-navy text-white/60">
      <Container className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
        <div className="col-span-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ember-600 text-sm font-bold text-white">
              FS
            </span>
            <span className="font-heading text-lg font-bold text-white">{siteConfig.name}</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-white/60">{siteConfig.tagline}</p>
          <p className="mt-4 text-sm text-white/60">
            {siteConfig.phoneDisplay}
            <br />
            {siteConfig.email}
          </p>
        </div>

        <div>
          <div className="text-sm font-semibold text-white">GST &amp; Tax</div>
          <ul className="mt-3 space-y-2">
            {gstLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-ember-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold text-white">Company</div>
          <ul className="mt-3 space-y-2">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-ember-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 sm:col-span-4">
          <div className="flex flex-wrap items-baseline gap-x-3">
            <div className="text-sm font-semibold text-white">Business & Compliance Services</div>
            <Link href="/other-services" className="text-sm text-ember-300 hover:underline">
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
                    href={`/services/${category.slug}`}
                    className="text-xs font-semibold tracking-wide text-white uppercase hover:text-ember-300"
                  >
                    {category.title}
                  </Link>
                  <ul className="mt-2 space-y-1.5">
                    {services.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/other-services/${service.slug}`}
                          className="text-sm text-white/60 transition-colors hover:text-ember-300"
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

      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col gap-3 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            <Link href="/refund-policy" className="hover:text-white">Refund Policy</Link>
          </div>
          <p>{siteConfig.legalNote}</p>
        </Container>
      </div>
    </footer>
  );
}
