import Link from "next/link";
import { Container } from "@/components/Container";
import { siteConfig } from "@/lib/site-config";
import { otherServices } from "@/data/other-services";

const gstLinks = [
  { label: "GST Registration", href: "/gst-registration" },
  { label: "GST Return Filing", href: "/gst-return-filing" },
  { label: "GST Compliance", href: "/gst-compliance" },
  { label: "GST Tools", href: "/gst-tools" },
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
          <div className="text-sm font-semibold text-neutral-900">GST Services</div>
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
          <div className="text-sm font-semibold text-neutral-900">Other Services</div>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/other-services" className="text-sm text-neutral-600 hover:text-brand-700">
                All Other Services
              </Link>
            </li>
            {otherServices.map((service) => (
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
