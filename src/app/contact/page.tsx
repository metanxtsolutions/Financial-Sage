import type { Metadata } from "next";
import { Section, Container } from "@/components/Container";
import { LeadForm } from "@/components/LeadForm";
import { Button } from "@/components/Button";
import { siteConfig, whatsappLink, defaultWhatsappMessage } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Financial Sage for GST registration and filing on WhatsApp, phone, email, or the form below.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Section>
      <Container className="grid grid-cols-1 gap-10 px-0 lg:grid-cols-2">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">Contact Us</h1>
          <p className="mt-4 text-lg text-neutral-600">
            We respond within {siteConfig.responseTime} during business hours. WhatsApp is the
            fastest way to reach us.
          </p>

          <div className="mt-8 space-y-4">
            <Button href={whatsappLink(defaultWhatsappMessage)} variant="whatsapp" className="w-full sm:w-auto">
              Chat on WhatsApp
            </Button>
            <div className="text-neutral-700">
              <div className="font-semibold">Phone</div>
              <a href={`tel:${siteConfig.phoneE164}`} className="text-brand-700">{siteConfig.phoneDisplay}</a>
            </div>
            <div className="text-neutral-700">
              <div className="font-semibold">Email</div>
              <a href={`mailto:${siteConfig.email}`} className="text-brand-700">{siteConfig.email}</a>
            </div>
            <div className="text-neutral-700">
              <div className="font-semibold">Coverage</div>
              <p className="text-sm text-neutral-600">Pan-India, fully remote, no office visit required.</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-card">
          <h2 className="text-lg font-bold text-neutral-900">Send us your details</h2>
          <p className="mt-1 text-sm text-neutral-600">We&apos;ll reach out to understand your requirement.</p>
          <div className="mt-4">
            <LeadForm source="contact-page" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
