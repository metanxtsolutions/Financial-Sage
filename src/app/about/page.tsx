import type { Metadata } from "next";
import Link from "next/link";
import { Section, Container } from "@/components/Container";
import { siteConfig } from "@/lib/site-config";
import { whyFinancialSage } from "@/data/services";

export const metadata: Metadata = {
  title: "About Financial Sage",
  description: "Financial Sage is India's GST registration and compliance specialist for MSMEs — transparent pricing, WhatsApp-first support, Pan-India coverage.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <Section>
      <Container className="max-w-3xl px-0">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">About {siteConfig.name}</h1>
        <p className="mt-4 text-lg text-neutral-600">
          {siteConfig.name} is India&apos;s GST registration and compliance specialist for MSMEs.
          GST is the entire focus of what we do — not one of twenty services competing for
          attention, but the thing we&apos;ve built our entire process around.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-neutral-900">Why We Exist</h2>
        <p className="mt-3 text-neutral-700">
          Most GST consultancies treat registration and filing as one line item among dozens of
          legal services. We went the other way: build deep expertise in one thing, keep pricing
          transparent, and stay reachable on the channel small business owners already use —
          WhatsApp.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-neutral-900">Where We Stand Today</h2>
        <ul className="mt-3 grid grid-cols-1 gap-3 text-neutral-700 sm:grid-cols-3">
          <li className="rounded-lg border border-neutral-200 p-4">
            <div className="text-2xl font-extrabold text-brand-700">{siteConfig.stats.registrations}</div>
            <div className="text-sm text-neutral-600">GST registrations completed</div>
          </li>
          <li className="rounded-lg border border-neutral-200 p-4">
            <div className="text-2xl font-extrabold text-brand-700">{siteConfig.stats.activeClients}</div>
            <div className="text-sm text-neutral-600">Active monthly filing clients</div>
          </li>
          <li className="rounded-lg border border-neutral-200 p-4">
            <div className="text-2xl font-extrabold text-brand-700">{siteConfig.stats.enquiries}</div>
            <div className="text-sm text-neutral-600">Business enquiries handled</div>
          </li>
        </ul>
        <p className="mt-3 text-sm text-neutral-500">
          We&apos;re a focused, growing GST practice — not the biggest name in the market, but one
          that answers the phone and knows your filing history.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-neutral-900">How We Work</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {whyFinancialSage.map((item) => (
            <div key={item.title} className="rounded-lg bg-neutral-50 p-4">
              <div className="font-semibold text-neutral-900">{item.title}</div>
              <div className="mt-1 text-sm text-neutral-600">{item.body}</div>
            </div>
          ))}
        </div>

        <h2 className="mt-10 text-2xl font-bold text-neutral-900">Beyond GST</h2>
        <p className="mt-3 text-neutral-700">
          We also help with company registration, trademark filing, ITR, and MSME/Udyam
          registration — as secondary services alongside our core GST practice. See{" "}
          <Link href="/other-services" className="font-medium text-brand-700 underline">
            Other Services
          </Link>{" "}
          for details.
        </p>
      </Container>
    </Section>
  );
}
