"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/Button";
import { siteConfig, whatsappLink, defaultWhatsappMessage } from "@/lib/site-config";

const businessTypes = [
  "Sole Proprietorship",
  "Partnership",
  "LLP",
  "Private Limited Company",
  "Freelancer",
  "E-commerce Seller",
  "Other",
];

interface LeadFormProps {
  source: string;
  compact?: boolean;
}

export function LeadForm({ source, compact = false }: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const params = new URLSearchParams(window.location.search);

    const payload = {
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      businessType: String(data.get("businessType") || ""),
      city: String(data.get("city") || ""),
      message: String(data.get("message") || ""),
      source,
      pageUrl: window.location.href,
      companyWebsite: String(data.get("companyWebsite") || ""),
      utmSource: params.get("utm_source") || "",
      utmMedium: params.get("utm_medium") || "",
      utmCampaign: params.get("utm_campaign") || "",
    };

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setError("Network error. Please try again, or reach us on WhatsApp.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-accent-500/30 bg-accent-500/5 p-6 text-center">
        <p className="text-lg font-semibold text-neutral-900">Thanks, we&apos;ve got your details.</p>
        <p className="mt-1 text-sm text-neutral-600">
          We respond within {siteConfig.responseTime} during business hours. Want a faster reply?
        </p>
        <Button
          href={whatsappLink(defaultWhatsappMessage)}
          variant="whatsapp"
          className="mt-4"
        >
          Chat on WhatsApp
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Honeypot field, hidden from real users via CSS (not display:none) so basic bots that skip hidden fields still get caught */}
      <input
        type="text"
        name="companyWebsite"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <div className={compact ? "grid grid-cols-1 gap-3" : "grid grid-cols-1 gap-3 sm:grid-cols-2"}>
        <div>
          <label htmlFor={`${source}-name`} className="sr-only">
            Full Name
          </label>
          <input
            id={`${source}-name`}
            name="name"
            required
            placeholder="Full Name"
            className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          />
        </div>
        <div>
          <label htmlFor={`${source}-phone`} className="sr-only">
            Phone Number
          </label>
          <input
            id={`${source}-phone`}
            name="phone"
            required
            placeholder="Phone Number"
            className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          />
        </div>
        <div>
          <label htmlFor={`${source}-email`} className="sr-only">
            Email (optional)
          </label>
          <input
            id={`${source}-email`}
            name="email"
            type="email"
            placeholder="Email (optional)"
            className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          />
        </div>
        <div>
          <label htmlFor={`${source}-businessType`} className="sr-only">
            Business Type
          </label>
          <select
            id={`${source}-businessType`}
            name="businessType"
            defaultValue=""
            className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm text-neutral-700 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          >
            <option value="" disabled>
              Business Type
            </option>
            {businessTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${source}-city`} className="sr-only">
            City
          </label>
          <input
            id={`${source}-city`}
            name="city"
            placeholder="City"
            className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          />
        </div>
      </div>

      {error && (
        <p role="alert" aria-live="polite" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <Button type="submit" disabled={status === "submitting"} className="w-full">
        {status === "submitting" ? "Submitting…" : "Start GST Registration"}
      </Button>

      <p className="text-center text-xs text-neutral-500">
        We respond within {siteConfig.responseTime} during business hours.
      </p>
    </form>
  );
}
