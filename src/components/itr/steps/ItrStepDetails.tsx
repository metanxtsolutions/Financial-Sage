"use client";

import { FormEvent, useState } from "react";
import type { ItrType } from "@/components/itr/ItrWizard";

interface DetailsValue {
  name: string;
  phone: string;
  email: string;
  pan: string;
  state: string;
}

export function ItrStepDetails({
  itrType,
  initial,
  onBack,
  onContinue,
}: {
  itrType: ItrType;
  initial: DetailsValue;
  onBack: () => void;
  onContinue: (details: DetailsValue, applicationId: string) => void;
}) {
  const [values, setValues] = useState(initial);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof DetailsValue>(key: K, value: DetailsValue[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/itr/create-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itrType, ...values, pan: values.pan.toUpperCase(), consent }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Could not save your details");
      }
      onContinue(values, data.applicationId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="button" onClick={onBack} className="text-sm font-medium text-neutral-500 hover:text-itr-navy-500">
        ← Change ITR type
      </button>
      <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-itr-navy-500">Basic Details</h1>
      <p className="mt-1 text-sm text-neutral-500">Just enough to get started - nothing else.</p>

      <div className="mt-5 space-y-3">
        <input
          required
          placeholder="Full Name *"
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:border-itr-green-500 focus:outline-none focus:ring-2 focus:ring-itr-green-500/30"
        />
        <input
          required
          type="tel"
          placeholder="Mobile Number *"
          value={values.phone}
          onChange={(e) => set("phone", e.target.value)}
          className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:border-itr-green-500 focus:outline-none focus:ring-2 focus:ring-itr-green-500/30"
        />
        <input
          required
          type="email"
          placeholder="Email Address *"
          value={values.email}
          onChange={(e) => set("email", e.target.value)}
          className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:border-itr-green-500 focus:outline-none focus:ring-2 focus:ring-itr-green-500/30"
        />
        <input
          required
          placeholder="PAN Number *"
          maxLength={10}
          value={values.pan}
          onChange={(e) => set("pan", e.target.value.toUpperCase())}
          className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm uppercase focus:border-itr-green-500 focus:outline-none focus:ring-2 focus:ring-itr-green-500/30"
        />
        <input
          placeholder="State"
          value={values.state}
          onChange={(e) => set("state", e.target.value)}
          className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:border-itr-green-500 focus:outline-none focus:ring-2 focus:ring-itr-green-500/30"
        />
      </div>

      <label className="mt-4 flex items-start gap-2 text-sm text-neutral-600">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5"
        />
        I agree to the Terms &amp; Privacy Policy
      </label>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 w-full rounded-xl bg-itr-green-500 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-itr-green-600 disabled:opacity-50"
      >
        {submitting ? "Saving…" : "Continue"}
      </button>
    </form>
  );
}
