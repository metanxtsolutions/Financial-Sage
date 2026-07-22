import { ReactNode } from "react";
import Link from "next/link";
import { Section } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export function ToolPageShell({
  title,
  description,
  slug,
  children,
}: {
  title: string;
  description: string;
  slug: string;
  children: ReactNode;
}) {
  return (
    <Section>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "GST Tools", href: "/gst-tools" },
          { name: title, href: `/gst-tools/${slug}` },
        ]}
      />
      <span className="eyebrow mt-4">Free Tools</span>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-lg text-neutral-600">{description}</p>

      <div className="mt-8 max-w-xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-card">
        {children}
      </div>

      <p className="mt-6 text-sm text-neutral-500">
        Need help beyond a calculation?{" "}
        <Link href="/gst-registration" className="font-medium text-brand-700 underline">
          Talk to a GST expert
        </Link>
        .
      </p>
    </Section>
  );
}
