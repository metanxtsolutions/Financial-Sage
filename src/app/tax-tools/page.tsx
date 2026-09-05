import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Container";
import { siteConfig } from "@/lib/site-config";
import { taxTools } from "@/data/tax-tools";
import { taxYear } from "@/data/tax-rates";

export const metadata: Metadata = {
  title: "Free Income Tax Tools & Calculators",
  description:
    "Free income tax calculator comparing the old and new regimes, and an HRA exemption calculator. No login required.",
  alternates: { canonical: "/tax-tools" },
};

export default function TaxToolsPage() {
  return (
    <Section>
      <span className="eyebrow">Free Tools</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">Income Tax Tools</h1>
      <p className="mt-4 max-w-2xl text-lg text-neutral-600">
        Free income tax calculators for FY {taxYear.financialYear} (AY {taxYear.assessmentYear}).
        No login, no cost. Built and maintained by {siteConfig.name}.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {taxTools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tax-tools/${tool.slug}`}
            className="group rounded-xl border border-neutral-200 bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <h2 className="flex items-center justify-between font-semibold text-neutral-900">
              {tool.title}
              <span className="text-neutral-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-brand-600">→</span>
            </h2>
            <p className="mt-2 text-sm text-neutral-600">{tool.description}</p>
          </Link>
        ))}
      </div>

      <p className="mt-10 text-sm text-neutral-600">
        Looking for GST calculators instead?{" "}
        <Link href="/gst-tools" className="font-medium text-brand-700 underline">
          See our GST tools
        </Link>
        . Ready to file?{" "}
        <Link href="/itr-filing" className="font-medium text-brand-700 underline">
          Start your ITR
        </Link>
        .
      </p>
    </Section>
  );
}
