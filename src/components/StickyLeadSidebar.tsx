import { LeadForm } from "@/components/LeadForm";

// Defaults match the GST wording this sidebar has always used, so every
// existing caller is unchanged. Pages for other services pass their own, since
// "Start GST Registration" on an ITR page is a conversion leak.
export function StickyLeadSidebar({
  source,
  heading = "Talk to a GST Expert",
  blurb = "Free consultation. We respond fast and file within 24 hours of receiving your documents.",
  submitLabel,
}: {
  source: string;
  heading?: string;
  blurb?: string;
  submitLabel?: string;
}) {
  return (
    <div className="lg:sticky lg:top-24">
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-card">
        <h3 className="text-lg font-bold text-neutral-900">{heading}</h3>
        <p className="mt-1 text-sm text-neutral-600">{blurb}</p>
        <div className="mt-4">
          <LeadForm source={source} compact submitLabel={submitLabel} />
        </div>
      </div>
    </div>
  );
}
