import Link from "next/link";
import { safetyPoints } from "@/data/trust";
import { siteConfig } from "@/lib/site-config";

// Published so a client has something concrete to check a suspicious approach
// against. Deliberately specific: a generic "we take security seriously" block
// gives someone being defrauded nothing to test a caller against.
export function TrustSafety() {
  if (safetyPoints.length === 0) return null;

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {safetyPoints.map((point) => (
          <div
            key={point.title}
            className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-card"
          >
            <div className="flex items-start gap-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="mt-0.5 h-5 w-5 shrink-0 text-accent-600"
              >
                <path
                  d="M12 3l7 3v5.5c0 4.2-2.9 8.1-7 9.5-4.1-1.4-7-5.3-7-9.5V6l7-3z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 12l2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div>
                <h3 className="font-semibold text-neutral-900">{point.title}</h3>
                <p className="mt-1 text-sm text-neutral-600">{point.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-gold-400/40 bg-gold-400/10 px-6 py-5">
        <h3 className="font-semibold text-neutral-900">
          If someone demands a fee for an approval in our name
        </h3>
        <p className="mt-1 text-sm text-neutral-700">
          Do not pay. Call us on{" "}
          <a href={`tel:${siteConfig.phoneE164}`} className="font-medium text-brand-700 underline">
            {siteConfig.phoneDisplay}
          </a>{" "}
          and check. You can report financial fraud in India on the cybercrime helpline{" "}
          <a href="tel:1930" className="font-medium text-brand-700 underline">
            1930
          </a>{" "}
          or at{" "}
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-700 underline"
          >
            cybercrime.gov.in
          </a>
          . To check whether a GSTIN quoted to you is real, use our{" "}
          <Link href="/gst-tools/gstin-validator" className="font-medium text-brand-700 underline">
            GSTIN validator
          </Link>{" "}
          — it is free and needs no login.
        </p>
      </div>
    </div>
  );
}
