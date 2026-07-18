import type { Metadata } from "next";
import Link from "next/link";
import { Section, Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { LeadForm } from "@/components/LeadForm";
import { PricingTable } from "@/components/PricingTable";
import { FaqAccordion } from "@/components/FaqAccordion";
import { JsonLd, faqPageSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import { coreServices, whoNeedsGst, processSteps, whyFinancialSage } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { getFaqsByIds } from "@/data/faqs";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} — GST Registration & Filing Made Simple for Indian Businesses` },
  description:
    "Expert-assisted GST registration and filing for Indian MSMEs. GST registration from ₹399, transparent pricing, Pan-India coverage, response within 40 minutes.",
  alternates: { canonical: "/" },
};

const homeFaqIds = [
  "who-needs-gst-registration",
  "govt-fee-gst-registration",
  "how-long-gst-registration-takes",
  "why-choose-financial-sage",
  "does-financial-sage-serve-pan-india",
  "what-if-i-need-help-after-registration",
];

export default function HomePage() {
  const homeFaqs = getFaqsByIds(homeFaqIds);

  return (
    <>
      <JsonLd data={faqPageSchema(homeFaqs)} />

      {/* Hero */}
      <Section className="bg-gradient-to-b from-brand-50 to-white pt-12 sm:pt-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              GST Registration & Filing Made Simple for Indian Businesses
            </h1>
            <p className="mt-4 max-w-xl text-lg text-neutral-600">
              Expert-assisted GST registration and monthly filing for MSMEs, freelancers, and
              e-commerce sellers — transparent pricing, Pan-India coverage, and a real response
              within {siteConfig.responseTime} during business hours.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/gst-registration" variant="primary">
                Start GST Registration from ₹399
              </Button>
              <Button href="/contact" variant="outline">
                Talk to a GST Expert
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-neutral-900">Get a free GST consultation</h2>
            <p className="mt-1 text-sm text-neutral-600">Tell us about your business — we&apos;ll take it from there.</p>
            <div className="mt-4">
              <LeadForm source="homepage-hero" />
            </div>
          </div>
        </div>
      </Section>

      {/* Trust bar */}
      <div className="border-y border-neutral-200 bg-neutral-900">
        <Container className="grid grid-cols-2 gap-6 py-8 text-center sm:grid-cols-4">
          {[
            { value: siteConfig.stats.registrations, label: "GST Registrations" },
            { value: siteConfig.stats.activeClients, label: "Active Monthly Clients" },
            { value: "Pan-India", label: "Coverage" },
            { value: siteConfig.responseTime, label: "Avg. Response Time" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-extrabold text-white">{stat.value}</div>
              <div className="mt-1 text-xs text-neutral-400">{stat.label}</div>
            </div>
          ))}
        </Container>
      </div>

      {/* Core GST services */}
      <Section>
        <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">Core GST Services</h2>
        <p className="mt-2 max-w-2xl text-neutral-600">Everything you need to register and stay compliant — nothing you don&apos;t.</p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coreServices.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="rounded-xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <h3 className="font-semibold text-neutral-900">{service.title}</h3>
              <p className="mt-2 text-sm text-neutral-600">{service.description}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Why Financial Sage */}
      <Section className="bg-neutral-50">
        <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">Why Financial Sage</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyFinancialSage.map((item) => (
            <div key={item.title} className="rounded-xl bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-neutral-900">{item.title}</h3>
              <p className="mt-1 text-sm text-neutral-600">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Who needs GST */}
      <Section>
        <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">Who Needs GST Registration?</h2>
        <p className="mt-2 max-w-2xl text-neutral-600">
          If you run any of these businesses, GST registration probably applies to you — tap yours to see the specifics.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {whoNeedsGst.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:border-brand-500 hover:text-brand-700"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section className="bg-neutral-50">
        <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">How It Works</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {processSteps.map((step, i) => (
            <div key={step.title} className="rounded-xl bg-white p-6 shadow-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                {i + 1}
              </div>
              <h3 className="mt-4 font-semibold text-neutral-900">{step.title}</h3>
              <p className="mt-1 text-sm text-neutral-600">{step.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-neutral-600">
          Registration is typically completed within 24 hours of receiving your documents and
          payment, with GSTIN issuance taking up to a few working days for government approval. See
          the full{" "}
          <Link href="/gst-registration-process" className="font-medium text-brand-700 underline">
            step-by-step GST registration process
          </Link>
          .
        </p>
      </Section>

      {/* Pricing */}
      <Section>
        <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">Transparent Pricing</h2>
        <p className="mt-2 max-w-2xl text-neutral-600">No hidden fees, no &quot;request a quote&quot; forms.</p>
        <div className="mt-8">
          <PricingTable />
        </div>
        <p className="mt-4 text-center text-sm text-neutral-500">
          See the full breakdown on our <Link href="/pricing" className="font-medium text-brand-700 underline">Pricing page</Link>.
        </p>
      </Section>

      {/* Testimonials */}
      <Section className="bg-neutral-50">
        <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">What MSMEs Say</h2>
        <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">Sample client feedback</p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-xl bg-white p-6 shadow-sm">
              <p className="text-sm text-neutral-700">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-4 text-sm font-semibold text-neutral-900">{t.name}</div>
              <div className="text-xs text-neutral-500">{t.business} · {t.city}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ teaser */}
      <Section>
        <h2 className="text-2xl font-bold text-neutral-900 sm:text-3xl">Frequently Asked Questions</h2>
        <div className="mt-8 max-w-3xl">
          <FaqAccordion faqs={homeFaqs} />
        </div>
        <div className="mt-6">
          <Button href="/faq" variant="outline">See All FAQs</Button>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="bg-brand-700">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to get GST-registered?</h2>
            <p className="mt-2 text-brand-100">Free consultation. Transparent pricing. Filed within 24 hours.</p>
          </div>
          <Button href="/gst-registration" variant="whatsapp">
            Start GST Registration
          </Button>
        </div>
      </Section>
    </>
  );
}
