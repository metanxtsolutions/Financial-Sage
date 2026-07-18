import { LeadForm } from "@/components/LeadForm";

export function StickyLeadSidebar({ source }: { source: string }) {
  return (
    <div className="lg:sticky lg:top-24">
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-neutral-900">Talk to a GST Expert</h3>
        <p className="mt-1 text-sm text-neutral-600">
          Free consultation. We respond fast and file within 24 hours of receiving your documents.
        </p>
        <div className="mt-4">
          <LeadForm source={source} compact />
        </div>
      </div>
    </div>
  );
}
