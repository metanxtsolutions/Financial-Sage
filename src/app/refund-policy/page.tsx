import type { Metadata } from "next";
import { Section, Container } from "@/components/Container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Financial Sage's refund policy for GST registration, filing, and compliance services.",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <Section>
      <Container className="max-w-3xl px-0">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">Refund Policy</h1>
        <p className="mt-2 text-sm text-neutral-500">Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>

        <p className="mt-6 text-neutral-700">
          Our fee covers the professional work of reviewing your documents, preparing your
          application, and filing it correctly — not the outcome of a government decision, which is
          outside our control. This policy explains when a refund applies.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-neutral-900">Before We Start Work</h2>
        <p className="mt-3 text-neutral-700">
          If you cancel before we&apos;ve begun preparing or filing your application, you&apos;re
          entitled to a full refund of the service fee paid.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-neutral-900">After Filing</h2>
        <p className="mt-3 text-neutral-700">
          Once we&apos;ve filed your application or return, the service fee is considered earned,
          since the work it covers — document review and filing — is complete. If the GST
          department raises a clarification or the application is rejected for reasons outside our
          error, we handle the response or re-filing at no additional charge as part of the original
          engagement.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-neutral-900">Our Error</h2>
        <p className="mt-3 text-neutral-700">
          If an application is rejected due to a clear error on our part (for example, an incorrect
          detail we entered despite accurate information being provided to us), we will re-file at
          no additional cost, and a partial or full refund will be considered on a case-by-case
          basis.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-neutral-900">Government Fees</h2>
        <p className="mt-3 text-neutral-700">
          Where a government/GST fee is charged separately and paid directly to the department, our
          refund policy does not apply to that amount — refunds of government fees, where
          applicable, are subject to the department&apos;s own rules.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-neutral-900">How to Request a Refund</h2>
        <p className="mt-3 text-neutral-700">
          Email{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-medium text-brand-700 underline">
            {siteConfig.email}
          </a>{" "}
          with your name and payment details. We aim to resolve refund requests within 7–10
          business days.
        </p>
      </Container>
    </Section>
  );
}
