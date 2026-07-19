import type { Metadata } from "next";
import Link from "next/link";
import { Section, Container } from "@/components/Container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern use of the Financial Sage website and our GST registration and compliance services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <Section>
      <Container className="max-w-3xl px-0">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">Terms of Service</h1>
        <p className="mt-2 text-sm text-neutral-500">Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>

        <p className="mt-6 text-neutral-700">
          These terms govern your use of the {siteConfig.name} website and our GST registration,
          filing, and compliance services. By engaging us, you agree to the terms below.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-neutral-900">Our Role</h2>
        <p className="mt-3 text-neutral-700">
          {siteConfig.name} is a private GST and business-compliance service provider. We are not a
          government body, and we do not control the GST department&apos;s review, approval, or
          processing timelines. Timelines we mention (such as 24-hour filing or 3 to 7 day GSTIN
          issuance) refer to our own turnaround, not a guarantee of government processing time.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-neutral-900">Client Responsibilities</h2>
        <ul className="mt-3 space-y-2 text-neutral-700">
          <li>• You are responsible for providing accurate, complete, and genuine documents and information.</li>
          <li>• Delays or rejections caused by incorrect, incomplete, or fraudulent information you provide are outside our control.</li>
          <li>• You are responsible for responding promptly to any request for additional information during your engagement.</li>
        </ul>

        <h2 className="mt-10 text-2xl font-bold text-neutral-900">Fees &amp; Payment</h2>
        <p className="mt-3 text-neutral-700">
          Our published fees (see the{" "}
          <Link href="/pricing" className="font-medium text-brand-700 underline">Pricing page</Link>) cover
          the professional service of preparing, reviewing, and filing your application or return.
          They are separate from any government/GST fee, which is paid directly where applicable.
          See our{" "}
          <Link href="/refund-policy" className="font-medium text-brand-700 underline">Refund Policy</Link>{" "}
          for what happens if a filing doesn&apos;t proceed.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-neutral-900">No Guarantee of Outcome</h2>
        <p className="mt-3 text-neutral-700">
          While we review every application before filing to minimise errors, final approval,
          rejection, or any query raised rests with the GST department and is outside our control.
          We will assist with clarifications and re-filing as part of our service where applicable.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-neutral-900">Limitation of Liability</h2>
        <p className="mt-3 text-neutral-700">
          To the extent permitted by law, {siteConfig.name}&apos;s liability for any claim arising
          from our services is limited to the fee paid for the specific service in question. We are
          not liable for indirect or consequential losses, or for delays and decisions made by
          government authorities.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-neutral-900">Governing Law</h2>
        <p className="mt-3 text-neutral-700">
          These terms are governed by the laws of India, without regard to conflict-of-law
          principles.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-neutral-900">Contact</h2>
        <p className="mt-3 text-neutral-700">
          Questions about these terms can be sent to{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-medium text-brand-700 underline">
            {siteConfig.email}
          </a>{" "}
          or {siteConfig.phoneDisplay}.
        </p>
      </Container>
    </Section>
  );
}
