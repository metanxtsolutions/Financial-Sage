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
      <Section className="hero-dark relative -mt-16 overflow-hidden pt-28 sm:pt-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(60% 55% at 35% 25%, black, transparent 80%)",
          }}
        />
        <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <span className="eyebrow eyebrow-light">GST specialists for Indian MSMEs</span>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              GST, <span className="text-gradient-light">done for you.</span>
              <br />
              From ₹399.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/70">
              Most CAs charge ₹10,000 or more a year and still leave you confused about ITC. We
              register, file, and explain everything over WhatsApp, real replies in{" "}
              {siteConfig.responseTime}.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                href="/gst-registration"
                variant="primary"
                className="group px-6 py-3.5 text-base"
              >
                Get GST from ₹399
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Button>
              <Button href="/contact" variant="ghostDark">
                Talk to a GST Expert
              </Button>
            </div>

            <div className="mt-10 flex max-w-xl flex-wrap gap-x-10 gap-y-5 border-t border-white/10 pt-7">
              {trustStats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-heading text-2xl font-extrabold text-white">
                    <CountUp label={stat.value} />
                  </div>
                  <div className="mt-0.5 text-xs leading-tight text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-5 rounded-[2rem] bg-brand-gradient opacity-25 blur-3xl"
            />
            <div className="relative rounded-2xl bg-white p-6 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.5)] sm:p-7">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-accent-500" />
                <span className="text-xs font-semibold uppercase tracking-wide text-accent-600">
                  Free consultation
                </span>
              </div>
              <h2 className="mt-3 font-heading text-xl font-bold text-neutral-900">
                Get your GST sorted
              </h2>
              <p className="mt-1 text-sm text-neutral-600">
                Tell us about your business, and we&apos;ll take it from there.
              </p>
              <div className="mt-5">
                <LeadForm source="homepage-hero" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Core GST services */}
      <Section>
        <ScrollReveal>
          <span className="eyebrow">What we do</span>
          <h2 className="mt-3 text-3xl font-bold text-neutral-900 sm:text-4xl">Core GST Services</h2>
          <p className="mt-2 max-w-2xl text-neutral-600">Everything you need to register and stay compliant. Nothing you don&apos;t.</p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreServices.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-[0_8px_20px_-8px_rgba(79,70,229,0.6)]">
                  <Icon name={service.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold text-neutral-900">{service.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{service.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  Learn more <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      {/* Why Financial Sage */}
      <Section className="bg-neutral-50">
        <ScrollReveal>
          <span className="eyebrow">Why us</span>
          <h2 className="mt-3 text-3xl font-bold text-neutral-900 sm:text-4xl">Why Financial Sage</h2>
          <p className="mt-2 max-w-2xl text-neutral-600">You focus on business. We handle compliance.</p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyFinancialSage.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-neutral-200/60 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
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
          <span className="eyebrow">Who it&apos;s for</span>
          <h2 className="mt-3 text-3xl font-bold text-neutral-900 sm:text-4xl">Who Needs GST Registration?</h2>
          <p className="mt-2 max-w-2xl text-neutral-600">
            If you run any of these, GST registration probably already applies to you. Tap yours to see the specifics.
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
          <span className="eyebrow">How it works</span>
          <h2 className="mt-3 text-3xl font-bold text-neutral-900 sm:text-4xl">Three steps, that&apos;s it</h2>
          <div className="relative mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div
              aria-hidden="true"
              className="absolute top-[26px] right-0 left-0 hidden h-0.5 bg-gradient-to-r from-brand-200 via-violet-400 to-brand-200 sm:block"
              style={{ marginInline: "16.6%" }}
            />
            {processSteps.map((step, i) => (
              <div key={step.title} className="relative rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-card">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient font-heading text-base font-bold text-white shadow-[0_8px_20px_-8px_rgba(79,70,229,0.6)]">
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
          <span className="eyebrow">Pricing</span>
          <h2 className="mt-3 text-3xl font-bold text-neutral-900 sm:text-4xl">Transparent Pricing</h2>
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
          <span className="eyebrow">Sample client feedback</span>
          <h2 className="mt-3 text-3xl font-bold text-neutral-900 sm:text-4xl">What MSMEs Say</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="relative rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-card">
                <span className="text-gradient font-heading text-5xl leading-none" aria-hidden="true">
                  &ldquo;
                </span>
                <p className="-mt-3 text-sm text-neutral-700">{t.quote}</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white">
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
          <span className="eyebrow">Answers</span>
          <h2 className="mt-3 text-3xl font-bold text-neutral-900 sm:text-4xl">Frequently Asked Questions</h2>
          <div className="mt-8 max-w-3xl">
            <FaqAccordion faqs={homeFaqs} />
          </div>
          <div className="mt-6">
            <Button href="/faq" variant="outline">See All FAQs</Button>
          </div>
        </ScrollReveal>
      </Section>

      {/* Final CTA */}
      <Section className="py-16 sm:py-20 lg:py-24">
        <div className="bg-brand-gradient relative overflow-hidden rounded-3xl px-8 py-12 shadow-[0_30px_60px_-24px_rgba(79,70,229,0.55)] sm:px-12 sm:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(24rem 18rem at 90% -20%, rgba(255,255,255,0.7), transparent 60%), radial-gradient(20rem 16rem at 0% 120%, rgba(255,255,255,0.5), transparent 55%)",
            }}
          />
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Stop paying CA prices for GST.</h2>
              <p className="mt-2 text-white/80">Free consultation. Transparent pricing. Filed within 24 hours.</p>
            </div>
            <Link
              href="/gst-registration"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              Get GST from ₹399 <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
