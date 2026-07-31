"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const timeline = ["Document Verification", "Expert Review", "ITR Filing", "Acknowledgement Shared"];

interface ApplicationSummary {
  id: string;
  itrType: string;
  name: string;
  status: string;
  amount: number;
  documents: { category: string; fileName: string }[];
}

export function ItrStepDone({ applicationId, onExit }: { applicationId: string; onExit: () => void }) {
  const [tracking, setTracking] = useState<ApplicationSummary | null>(null);
  const [trackError, setTrackError] = useState<string | null>(null);

  async function handleTrack() {
    setTrackError(null);
    try {
      const res = await fetch(`/api/itr/application/${applicationId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not load application status");
      setTracking(data);
    } catch (err) {
      setTrackError(err instanceof Error ? err.message : "Could not load application status");
    }
  }

  async function handleReceipt() {
    const res = await fetch(`/api/itr/application/${applicationId}`);
    const data: ApplicationSummary = await res.json();
    if (!res.ok) return;

    const lines = [
      "FINANCIAL SAGE - PAYMENT RECEIPT",
      "================================",
      `Application ID: ${data.id}`,
      `Name: ${data.name}`,
      `ITR Type: ${data.itrType.replace("_", "-")}`,
      `Amount Paid: ₹${(data.amount / 100).toFixed(2)}`,
      `Status: ${data.status.replaceAll("_", " ")}`,
      "",
      "Thank you for choosing Financial Sage.",
    ].join("\n");

    const blob = new Blob([lines], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `financial-sage-receipt-${data.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-itr-green-500 text-3xl text-white">
        ✓
      </div>
      <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-itr-navy-500">Payment Successful</h1>
      <p className="mt-1 text-sm text-neutral-600">Documents uploaded successfully.</p>
      <p className="mx-auto mt-3 max-w-sm text-sm text-neutral-500">
        Our tax expert will review your documents and start filing your Income Tax Return.
      </p>

      <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 text-left">
        <div className="flex items-center gap-2 text-sm font-semibold text-itr-green-600">
          <span className="h-2 w-2 rounded-full bg-itr-green-500" />
          Within 2 Hours
        </div>
        <div className="mt-3 space-y-2 border-l-2 border-neutral-100 pl-4">
          {timeline.map((label) => (
            <div key={label} className="text-sm text-neutral-600">
              {label}
            </div>
          ))}
        </div>
      </div>

      {tracking && (
        <div className="mt-4 rounded-2xl border border-itr-green-500 bg-itr-green-50 p-4 text-left text-sm">
          <div className="font-semibold text-neutral-900">Status: {tracking.status.replaceAll("_", " ")}</div>
          <div className="mt-1 text-neutral-600">{tracking.documents.length} document(s) received</div>
        </div>
      )}
      {trackError && <p className="mt-2 text-sm text-red-600">{trackError}</p>}

      <div className="mt-6 space-y-2">
        <button
          type="button"
          onClick={handleTrack}
          className="w-full rounded-xl border border-itr-navy-500 px-5 py-3 text-sm font-semibold text-itr-navy-500 hover:bg-itr-navy-500 hover:text-white"
        >
          Track Application
        </button>
        <button
          type="button"
          onClick={handleReceipt}
          className="w-full rounded-xl border border-neutral-200 px-5 py-3 text-sm font-semibold text-neutral-700 hover:border-neutral-300"
        >
          Download Payment Receipt
        </button>
        <Link
          href="/"
          onClick={onExit}
          className="block w-full rounded-xl px-5 py-3 text-sm font-semibold text-neutral-500 hover:text-neutral-700"
        >
          Back to Home
        </Link>
      </div>

      <p className="mt-4 text-xs text-neutral-400">
        Questions? WhatsApp us at {siteConfig.phoneDisplay}.
      </p>
    </div>
  );
}
