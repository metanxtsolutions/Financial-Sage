import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Container";
import { Button } from "@/components/Button";
import { LeadForm } from "@/components/LeadForm";
import { PricingTable } from "@/components/PricingTable";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Icon } from "@/components/Icon";
import { CountUp } from "@/components/CountUp";
import { ScrollReveal } from "@/components/ScrollReveal";
import { JsonLd, faqPageSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import { coreServices, whoNeedsGst, processSteps, whyFinancialSage } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { getFaqsByIds } from "@/data/faqs";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name}: GST Registration & Filing Made Simple for Indian Businesses` },
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

const trustStats = [
  { value: siteConfig.stats.registrations, label: "GST Registrations" },
  { value: siteConfig.stats.activeClients, label: "Active Monthly Clients" },
  { value: "Pan-India", label: "Coverage" },
  { value: "24 Hrs", label: "GST turnaround" },
];

export default function HomePage() {
  const homeFaqs = getFaqsByIds(homeFaqIds);

  return (
    <>
      <JsonLd data={faqPageSchema(homeFaqs)} />

      {/* Hero */}
      <Section className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white pt-12 sm:pt-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(var(--color-brand-200) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage: "linear-gradient(to bottom, black, transparent 85%)",
          }}
        />
        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
              GST Registration &amp; Filing Made Simple for Indian Businesses
            </h1>
            <p className="mt-5 max-w-xl text-lg text-neutral-600">
              Expert-assisted GST registration and monthly filing for MSMEs, freelancers, and
              e-commerce sellers. Transparent pricing, Pan-India coverage, and a real reply
              within {siteConfig.responseTime} during business hours.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/gst-registration" variant="primary">
                Start GST Registration from ₹399
              </Button>
              <Button href="/contact" variant="outline">
                Talk to a GST Expert
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {trustStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-full border border-brand-200 bg-white/80 px-4 py-2 shadow-card backdrop-blur"
                >
                  <span className="font-heading text-sm font-bold text-brand-700">
                    <CountUp label={stat.value} />
                  </span>
                  <span className="ml-1.5 text-xs text-neutral-500">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-card">
            <h2 className="text-lg font-bold text-neutral-900">Get a free GST consultation</h2>
            <p className="mt-1 text-sm text-neutral-600">Tell us about your business, and we&apos;ll take it from there.</p>
            <div className="mt-4">
              <LeadForm source="homepage-hero" />
            </div>
          </div>
        </div>
      </Section>

      {/* Core GST services */}
      <Section>
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Core GST Services</h2>
          <p className="mt-2 max-w-2xl text-neutral-600">Everything you need to register and stay compliant. Nothing you don&apos;t.</p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreServices.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group rounded-xl border border-neutral-200 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon name={service.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold text-neutral-900">{service.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{service.description}</p>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      {/* Why Financial Sage */}
      <Section className="bg-neutral-50">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Why Financial Sage</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyFinancialSage.map((item) => (
              <div
                key={item.title}
                className="rounded-xl bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-500/10 text-accent-600">
                  <Icon name={item.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-1 text-sm text-neutral-600">{item.body}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      {/* Who needs GST */}
      <Section>
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Who Needs GST Registration?</h2>
          <p className="mt-2 max-w-2xl text-neutral-600">
            If you run any of these businesses, GST registration probably applies to you. Tap yours to see the specifics.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {whoNeedsGst.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors duration-200 hover:border-brand-500 hover:bg-brand-50 hover:text-brand-700"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      {/* Process */}
      <Section className="bg-neutral-50">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">How It Works</h2>
          <div className="relative mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div
              aria-hidden="true"
              className="absolute top-[22px] right-0 left-0 hidden h-0.5 bg-brand-200 sm:block"
              style={{ marginInline: "16.6%" }}
            />
            {processSteps.map((step, i) => (
              <div key={step.title} className="relative rounded-xl bg-white p-6 shadow-card">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 font-heading text-sm font-bold text-white">
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
        </ScrollReveal>
      </Section>

      {/* Pricing */}
      <Section>
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Transparent Pricing</h2>
          <p className="mt-2 max-w-2xl text-neutral-600">No hidden fees, no &quot;request a quote&quot; forms.</p>
          <div className="mt-8">
            <PricingTable />
          </div>
          <p className="mt-4 text-center text-sm text-neutral-500">
            See the full breakdown on our <Link href="/pricing" className="font-medium text-brand-700 underline">Pricing page</Link>.
          </p>
        </ScrollReveal>
      </Section>

      {/* Testimonials */}
      <Section className="bg-neutral-50">
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">What MSMEs Say</h2>
          <p className="mt-1 text-xs uppercase tracking-wide text-neutral-400">Sample client feedback</p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="relative rounded-xl bg-white p-6 shadow-card">
                <span className="font-heading text-4xl leading-none text-brand-100" aria-hidden="true">
                  &ldquo;
                </span>
                <p className="-mt-2 text-sm text-neutral-700">{t.quote}</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-neutral-900">{t.name}</div>
                    <div className="text-xs text-neutral-500">{t.business} · {t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      {/* FAQ teaser */}
      <Section>
        <ScrollReveal>
          <h2 className="text-3xl font-bold text-neutral-900 sm:text-4xl">Frequently Asked Questions</h2>
          <div className="mt-8 max-w-3xl">
            <FaqAccordion faqs={homeFaqs} />
          </div>
          <div className="mt-6">
            <Button href="/faq" variant="outline">See All FAQs</Button>
          </div>
        </ScrollReveal>
      </Section>

      {/* Final CTA */}
      <Section className="bg-brand-700">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to get GST-registered?</h2>
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
