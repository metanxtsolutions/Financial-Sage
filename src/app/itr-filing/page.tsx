import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "File Your Income Tax Return in Minutes",
  description:
    "Simple, secure, expert-assisted ITR filing. Pick your ITR type, pay ₹999, upload your documents, and our tax expert takes it from there.",
  alternates: { canonical: "/itr-filing" },
};

const benefits = ["Expert Filing", "Maximum Refund", "Secure Document Upload", "Dedicated Support"];

export default function ItrFilingLandingPage() {
  const price = siteConfig.pricingFrom.itrFilingWizard;

  return (
    <Section className="bg-white">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-itr-navy-500 sm:text-4xl">
          File Your Income Tax Return in Minutes
        </h1>
        <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-itr-green-600">
          Simple • Secure • Expert Assisted
        </p>

        <Link
          href="/itr-filing/apply"
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-itr-green-500 px-6 py-4 text-base font-bold text-white transition-colors hover:bg-itr-green-600 sm:w-auto sm:px-10"
        >
          Start Filing
        </Link>

        <div className="mt-8 rounded-3xl border border-neutral-200 bg-white p-6 shadow-card">
          <div className="text-3xl font-extrabold text-itr-navy-500">₹{price} Only</div>
          <div className="text-sm text-neutral-500">(All Inclusive)</div>
          <ul className="mt-4 space-y-2 text-left">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm text-neutral-700">
                <span className="text-itr-green-500">✓</span> {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
