import { ReactNode } from "react";
import Link from "next/link";
import { Section } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export interface ToolSection {
  label: string;
  href: string;
}

const gstToolsSection: ToolSection = { label: "GST Tools", href: "/gst-tools" };

export function ToolPageShell({
  title,
  description,
  slug,
  // Defaults keep every existing /gst-tools page rendering exactly as before.
  // /tax-tools pages pass their own section and call to action.
  section = gstToolsSection,
  ctaLabel = "Talk to a GST expert",
  ctaHref = "/gst-registration",
  footnote,
  children,
}: {
  title: string;
  description: string;
  slug: string;
  section?: ToolSection;
  ctaLabel?: string;
  ctaHref?: string;
  footnote?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Section>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: section.label, href: section.href },
          { name: title, href: `${section.href}/${slug}` },
        ]}
      />
      <span className="eyebrow mt-4">Free Tools</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-lg text-neutral-600">{description}</p>

      <div className="mt-8 max-w-xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-card">
        {children}
      </div>

      {footnote && <div className="mt-6 max-w-2xl text-sm text-neutral-500">{footnote}</div>}

      <p className="mt-6 text-sm text-neutral-500">
        Need help beyond a calculation?{" "}
        <Link href={ctaHref} className="font-medium text-brand-700 underline">
          {ctaLabel}
        </Link>
        .
      </p>
    </Section>
  );
}
