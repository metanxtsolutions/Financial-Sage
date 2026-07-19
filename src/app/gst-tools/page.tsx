import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Container";
import { siteConfig } from "@/lib/site-config";
import { tools } from "@/data/tools";

export const metadata: Metadata = {
  title: "Free GST Tools & Calculators",
  description:
    "Free GST calculator, reverse GST calculator, late fee & interest calculators, HSN/SAC search, GSTIN validator, and due-date checker. No login required.",
  alternates: { canonical: "/gst-tools" },
};

export default function GstToolsPage() {
  return (
    <Section>
      <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">GST Tools</h1>
      <p className="mt-4 max-w-2xl text-lg text-neutral-600">
        Free calculators and lookup tools for everyday GST tasks. No login, no cost. Built and
        maintained by {siteConfig.name}.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/gst-tools/${tool.slug}`}
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
    </Section>
  );
}
