import type { Metadata } from "next";
import { Section, Container } from "@/components/Container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Financial Sage collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <Section>
      <Container className="max-w-3xl px-0">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-neutral-500">Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>

        <p className="mt-6 text-neutral-700">
          This policy explains what information {siteConfig.name} collects when you use this
          website or engage us for GST registration, filing, or related services, and how we use
          and protect it.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-neutral-900">Information We Collect</h2>
        <ul className="mt-3 space-y-2 text-neutral-700">
          <li>• Contact details you submit through our enquiry/lead forms: name, phone number, email, business type, and city.</li>
          <li>• Business and compliance documents you share with us to provide GST registration or filing services (e.g. PAN, Aadhaar, address proof, bank details).</li>
          <li>• Basic usage data collected via analytics tools (see &quot;Cookies &amp; Analytics&quot; below).</li>
        </ul>

        <h2 className="mt-10 text-2xl font-bold text-neutral-900">How We Use Your Information</h2>
        <ul className="mt-3 space-y-2 text-neutral-700">
          <li>• To respond to your enquiry and provide the GST registration, filing, or compliance service you&apos;ve requested.</li>
          <li>• To communicate with you about your application status, due dates, and account matters, including over WhatsApp, phone, and email.</li>
          <li>• To improve our website and services.</li>
        </ul>
        <p className="mt-3 text-neutral-700">We do not sell your personal information to third parties.</p>

        <h2 className="mt-10 text-2xl font-bold text-neutral-900">Where Your Information Is Stored</h2>
        <p className="mt-3 text-neutral-700">
          Enquiry details submitted through this website are stored in a secure, access-controlled
          database. Documents you share for filing purposes are used solely to complete your GST
          registration or filing and are not retained longer than necessary for that purpose and
          applicable record-keeping requirements.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-neutral-900">Third-Party Services</h2>
        <p className="mt-3 text-neutral-700">
          We use third-party providers to operate this website and deliver our services, including
          email delivery (for enquiry notifications), WhatsApp (for client communication), hosting
          infrastructure, and analytics (Google Analytics/Tag Manager and Vercel Analytics, where
          enabled). These providers process data only as needed to perform their function for us.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-neutral-900">Cookies &amp; Analytics</h2>
        <p className="mt-3 text-neutral-700">
          This site may use cookies and similar technologies for basic analytics to understand how
          visitors use the site. You can disable cookies in your browser settings; this may affect
          some site functionality.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-neutral-900">Your Rights</h2>
        <p className="mt-3 text-neutral-700">
          You can request access to, correction of, or deletion of your personal information held
          by us by contacting us at{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-medium text-brand-700 underline">
            {siteConfig.email}
          </a>
          .
        </p>

        <h2 className="mt-10 text-2xl font-bold text-neutral-900">Changes to This Policy</h2>
        <p className="mt-3 text-neutral-700">
          We may update this policy from time to time. The &quot;Last updated&quot; date at the top
          reflects the most recent revision.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-neutral-900">Contact</h2>
        <p className="mt-3 text-neutral-700">
          Questions about this policy can be sent to{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-medium text-brand-700 underline">
            {siteConfig.email}
          </a>{" "}
          or {siteConfig.phoneDisplay}.
        </p>
      </Container>
    </Section>
  );
}
