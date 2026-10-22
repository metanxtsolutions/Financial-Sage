import type { Metadata } from "next";
import { withOpenGraph } from "@/lib/metadata";
import Link from "next/link";
import { ReactNode } from "react";
import { Section } from "@/components/Container";
import { LeadForm } from "@/components/LeadForm";
import { PricingTable } from "@/components/PricingTable";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Icon, type IconName } from "@/components/Icon";
import { CountUp } from "@/components/CountUp";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Marquee } from "@/components/home/Marquee";
import { TrustLogos } from "@/components/home/TrustLogos";
import { ReviewBadges } from "@/components/home/ReviewBadges";
import { ServiceExplorer } from "@/components/home/ServiceExplorer";
import { ComparisonTable } from "@/components/home/ComparisonTable";
import { TrustSafety } from "@/components/home/TrustSafety";
import { JsonLd, faqPageSchema } from "@/lib/schema";
import { siteConfig, whatsappLink, defaultWhatsappMessage } from "@/lib/site-config";
import { coreServices, whoNeedsGst, processSteps, whyFinancialSage } from "@/data/services";
import { serviceCategories, otherServices } from "@/data/other-services";
import { testimonials } from "@/data/testimonials";
import { getFaqsByIds } from "@/data/faqs";

export const metadata: Metadata = withOpenGraph({
  title: { absolute: `${siteConfig.name}: GST Registration & Filing Made Simple for Indian Businesses` },
  description:
    "Expert-assisted GST registration and filing for Indian MSMEs. GST registration from ₹399, transparent pricing, Pan-India coverage, response within 40 minutes.",
  alternates: { canonical: "/" },
});

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
  { value: "24 Hrs", label: "GST Turnaround" },
];

// Every line here restates something the site already commits to elsewhere
// (pricing, response time, service count); no new claims.
const aboutPoints: { title: string; body: string; icon: IconName }[] = [
  {
    title: "What we do",
    body: `GST registration, returns, notices and annual filings for MSMEs, plus ${otherServices.length} other compliance services.`,
    icon: "document-check",
  },
  {
    title: "How we price",
    body: "Published, fixed fees. GST registration is ₹399 plus 18% GST, and the government charges nothing.",
    icon: "tag",
  },
  {
    title: "How we work",
    body: `WhatsApp-first and fully remote, with real replies in ${siteConfig.responseTime} during business hours.`,
    icon: "chat",
  },
];

function SectionHeading({
  eyebrow,
  title,
  intro,
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className={light ? "eyebrow eyebrow-ember-light" : "eyebrow eyebrow-ember"}>{eyebrow}</span>
      <h2
        className={
          light
            ? "mt-3 text-3xl font-bold text-white sm:text-[2.75rem] sm:leading-[1.1]"
            : "mt-3 text-3xl font-bold text-neutral-900 sm:text-[2.75rem] sm:leading-[1.1]"
        }
      >
        {title}
      </h2>
      {intro && <p className={light ? "mt-4 text-white/65" : "mt-4 text-neutral-600"}>{intro}</p>}
    </div>
  );
}

const primaryPill =
  "group inline-flex items-center justify-center gap-2 rounded-full bg-ember-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_-10px_rgba(239,106,38,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-ember-700";
const darkPill =
  "inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-white/40 hover:bg-white/10";

export default function HomePage() {
  const homeFaqs = getFaqsByIds(homeFaqIds);

  return (
    <div className="home-ember">
      <JsonLd data={faqPageSchema(homeFaqs)} />

      {/* Hero: centred headline on navy, warm glows, faint grid */}
      <section className="hero-ember relative -mt-16 overflow-hidden px-4 pt-36 pb-36 sm:px-6 sm:pt-44 sm:pb-44 lg:px-8">
        <div aria-hidden="true" className="grid-overlay pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
            <span aria-hidden="true" className="text-ember-400">
              ✦
            </span>
            GST specialists for Indian MSMEs
          </span>
          <h1 className="mt-7 text-[2.6rem] leading-[1.05] font-bold text-white sm:text-6xl lg:text-7xl">
            Get your GST registered
            <br />
            <span className="text-ember-gradient">at just ₹399.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/65 sm:text-lg">
            Most CAs charge ₹10,000 or more a year and still leave you confused about ITC. We
            register, file, and explain everything over WhatsApp, with real replies in{" "}
            {siteConfig.responseTime}. The government charges nothing for registration.
          </p>

          <div className="flex justify-center [&>div]:justify-center">
            <ReviewBadges />
          </div>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/gst-registration" className={primaryPill}>
              Get GST from ₹399
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
            <Link href="#pricing" className={darkPill}>
              See Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Stat card overlapping the bottom of the hero */}
      <section className="relative z-10 -mt-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-2 divide-neutral-200 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_30px_60px_-30px_rgba(10,15,31,0.35)] sm:grid-cols-4 sm:divide-x">
          {trustStats.map((stat, i) => (
            <div
              key={stat.label}
              className={
                i < 2
                  ? "border-b border-neutral-200 px-4 py-7 text-center sm:border-b-0"
                  : "px-4 py-7 text-center"
              }
            >
              <div className="font-heading text-2xl font-bold whitespace-nowrap text-neutral-900 sm:text-4xl">
                <CountUp label={stat.value} />
              </div>
              <div className="mt-1.5 text-xs text-neutral-500 sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Fact strip */}
      <div className="pt-16 sm:pt-20">
        <p className="mb-5 text-center text-[0.7rem] font-semibold tracking-[0.16em] text-neutral-400 uppercase">
          Trusted by MSMEs, freelancers and sellers across India
        </p>
        <Marquee />
      </div>
      <TrustLogos />

      {/* About */}
      <Section>
        <ScrollReveal>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow eyebrow-ember">About {siteConfig.name}</span>
              <h2 className="mt-3 text-3xl font-bold text-neutral-900 sm:text-[2.75rem] sm:leading-[1.1]">
                Built for businesses that would rather not think about GST.
              </h2>
              <p className="mt-5 text-neutral-600">
                Small businesses were paying CA retainers for work that is mostly routine, and still
                waiting days for an answer. We do the same statutory work on a different model:
                published prices, one dedicated expert, and updates on the app you already use.
              </p>
              <p className="mt-4 text-neutral-600">
                GST is the specialisation. When the business needs more, the same team handles that
                too.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {serviceCategories
                  .filter((category) => category.id !== "gst-specialist")
                  .map((category) => (
                    <Link
                      key={category.id}
                      href={`/services/${category.slug}`}
                      className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors duration-200 hover:border-ember-300 hover:bg-ember-50 hover:text-ember-700"
                    >
                      {category.title}
                    </Link>
                  ))}
              </div>
            </div>
            <div className="space-y-4">
              {aboutPoints.map((point) => (
                <div
                  key={point.title}
                  className="flex gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ember-50 text-ember-600">
                    <Icon name={point.icon} className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">{point.title}</h3>
                    <p className="mt-1 text-sm text-neutral-600">{point.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* Why us */}
      <Section className="bg-neutral-50">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Why Financial Sage"
            title="Eight commitments behind every filing"
            intro="You focus on the business. We handle the compliance."
          />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyFinancialSage.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-neutral-200/70 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-white">
                  <Icon name={item.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-1.5 text-sm text-neutral-600">{item.body}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      {/* Core GST services */}
      <Section>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Services"
            title="Everything you need to register and stay compliant"
            intro="Nothing you don't."
          />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {coreServices.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-ember-200 hover:shadow-card-hover"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ember-50 text-ember-600">
                  <Icon name={service.icon} className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-semibold text-neutral-900">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm text-neutral-600">{service.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ember-600">
                  Read more
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      {/* Everything beyond GST */}
      <Section className="bg-neutral-50">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Beyond GST"
            title="Everything else we file"
            intro="GST is the specialisation, but it is rarely the only thing a business needs. Pick a category to see what we handle."
          />
          <div className="mt-12">
            <ServiceExplorer />
          </div>
        </ScrollReveal>
      </Section>

      {/* Comparison */}
      <Section>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Compare your options"
            title="What you get instead of a retainer"
            intro="The same statutory work, done on a different operating model."
          />
          <div className="mt-12">
            <ComparisonTable />
          </div>
        </ScrollReveal>
      </Section>

      {/* Process: dark band with a vertical timeline */}
      <section className="relative overflow-hidden bg-navy px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div aria-hidden="true" className="grid-overlay pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-6xl">
          <ScrollReveal>
            <SectionHeading
              light
              eyebrow="Our process"
              title="From first message to GSTIN, in three steps"
            />
            <ol className="relative mx-auto mt-14 max-w-2xl">
              <div aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] w-px bg-white/15" />
              {processSteps.map((step, i) => (
                <li key={step.title} className="relative pb-12 pl-12 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute top-1 left-0 h-[15px] w-[15px] rounded-full border-[3px] border-navy bg-ember-500 ring-2 ring-ember-500/40"
                  />
                  <div className="text-xs font-semibold tracking-wide text-ember-300">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mt-1 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-white/65">{step.body}</p>
                  <ul className="mt-3 space-y-1.5">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2 text-sm text-white/55">
                        <span aria-hidden="true" className="text-ember-400">
                          ✓
                        </span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
            <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-white/55">
              Registration is typically completed within 24 hours of receiving your documents and
              payment, with GSTIN issuance taking up to a few working days for government approval.
              See the full{" "}
              <Link href="/gst-registration-process" className="font-medium text-ember-300 underline">
                step-by-step GST registration process
              </Link>
              .
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Who needs GST */}
      <Section>
        <ScrollReveal>
          <SectionHeading
            eyebrow="Who it's for"
            title="Who needs GST registration?"
            intro="If you run any of these, GST registration probably already applies to you. Tap yours to see the specifics."
          />
          <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
            {whoNeedsGst.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors duration-200 hover:border-ember-400 hover:bg-ember-50 hover:text-ember-700"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      {/* Testimonials */}
      <Section className="bg-neutral-50">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="What MSMEs say"
            intro="Sample client feedback, shown for illustration."
          />
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col rounded-3xl border border-neutral-200/70 bg-white p-7 shadow-card"
              >
                <span aria-hidden="true" className="font-heading text-5xl leading-none text-ember-400">
                  &ldquo;
                </span>
                <blockquote className="-mt-2 flex-1 text-[0.95rem] text-neutral-700">{t.quote}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-neutral-100 pt-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-neutral-900">{t.name}</div>
                    <div className="text-xs text-neutral-500">
                      {t.business} · {t.city}
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      {/* Pricing */}
      <Section id="pricing" className="scroll-mt-20">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Pricing"
            title="Plans built to grow with your business"
            intro={'Transparent pricing. No hidden fees, no "request a quote" forms.'}
          />
          <div className="mt-14">
            <PricingTable tone="ember" />
          </div>
          <p className="mt-8 text-center text-sm">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1 rounded-full border border-neutral-200 px-4 py-2 font-medium text-neutral-800 transition-colors hover:border-ember-300 hover:text-ember-700"
            >
              View full pricing details <span aria-hidden="true">&rarr;</span>
            </Link>
          </p>
        </ScrollReveal>
      </Section>

      {/* Safety. Placed before the FAQ so the reassurance lands next to the
          other questions a cautious first-time client is asking. */}
      <Section className="bg-neutral-50">
        <ScrollReveal>
          <SectionHeading
            eyebrow="How we keep you safe"
            title="What we will and will not ask you for"
            intro="People impersonate compliance firms to demand approval fees and portal passwords. Here is exactly how we work, so you can check any approach against it."
          />
          <div className="mt-12">
            <TrustSafety />
          </div>
        </ScrollReveal>
      </Section>

      {/* FAQ */}
      <Section>
        <ScrollReveal>
          <SectionHeading eyebrow="FAQ" title="Questions businesses ask us" />
          <div className="mx-auto mt-10 max-w-3xl">
            <FaqAccordion faqs={homeFaqs} />
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1 rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-800 transition-colors hover:border-ember-300 hover:text-ember-700"
            >
              See all FAQs <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </ScrollReveal>
      </Section>

      {/* Final CTA: dark card with the lead form */}
      <section className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
        <div className="hero-ember relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] px-6 py-12 sm:px-12 sm:py-16">
          <div aria-hidden="true" className="grid-overlay pointer-events-none absolute inset-0" />
          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-white sm:text-[2.75rem] sm:leading-[1.1]">
                Stop paying CA prices for GST.
              </h2>
              <p className="mt-4 text-white/65">
                Free consultation. Transparent pricing. Filed within 24 hours of your documents.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
                <Link href="/gst-registration" className={primaryPill}>
                  Get GST from ₹399
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
                <a
                  href={whatsappLink(defaultWhatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={darkPill}
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.6)] sm:p-7">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2 w-2 rounded-full bg-ember-500" />
                <span className="text-xs font-semibold tracking-wide text-ember-600 uppercase">
                  Free consultation
                </span>
              </div>
              <h3 className="mt-3 text-xl font-bold text-neutral-900">Get your GST sorted</h3>
              <p className="mt-1 text-sm text-neutral-600">
                Tell us about your business, and we&apos;ll take it from there.
              </p>
              <div className="mt-5">
                <LeadForm source="homepage-hero" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
