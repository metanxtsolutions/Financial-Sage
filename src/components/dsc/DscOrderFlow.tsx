"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { PayUCheckoutButton } from "@/components/PayUCheckoutButton";
import { DSC_INCLUSIONS, DSC_TIMELINE, dscCharge, dscPrices, type DscTypeId } from "@/data/pricing";
import { siteConfig } from "@/lib/site-config";

interface Details {
  name: string;
  phone: string;
  email: string;
  pan: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface DscOrderState {
  step: "details" | "pay" | "done";
  dscType: DscTypeId;
  details: Details;
  orderId: string | null;
  /** Set when PayU sends the buyer back without a confirmed payment. */
  paymentError?: "failed" | "error";
}

const STORAGE_KEY = "dsc-order-progress";

const emptyDetails: Details = { name: "", phone: "", email: "", pan: "", address: "", city: "", state: "", pincode: "" };

const rupees = (paise: number) =>
  `₹${(paise / 100).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function isDscType(value: string | null): value is DscTypeId {
  return dscPrices.some((d) => d.id === value);
}

// Restores saved progress, then reconciles it against a return trip from
// PayU (a full-page redirect, so this remounts fresh). Same approach as
// restoreWizardState in ItrWizard.tsx, and safe for the same reason: this
// component only ever renders on the client. It only reads the URL; the
// query string is cleared in an effect, because replaceState during render
// updates Next's router mid-render and breaks the second StrictMode call.
function restoreOrderState(): DscOrderState {
  let base: DscOrderState = { step: "details", dscType: dscPrices[0].id, details: emptyDetails, orderId: null };
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) base = { ...base, ...JSON.parse(saved) };
  } catch {
    // Corrupt/unavailable storage - just start fresh.
  }

  try {
    const params = new URLSearchParams(window.location.search);
    const payuStatus = params.get("payu");
    const returnedOrderId = params.get("orderId");
    const requestedType = params.get("type");

    if (payuStatus) {
      const orderId = returnedOrderId ?? base.orderId;
      if (payuStatus === "success" && orderId) return { ...base, orderId, step: "done", paymentError: undefined };
      return { ...base, orderId, step: orderId ? "pay" : "details", paymentError: payuStatus === "failed" ? "failed" : "error" };
    }

    // Arriving from a "Buy" link on the price list picks that certificate,
    // unless an order is already waiting for payment.
    if (isDscType(requestedType) && base.step === "details") {
      return { ...base, dscType: requestedType };
    }
  } catch {
    // URL unavailable - fall through with whatever was saved.
  }

  return base;
}

export function DscOrderFlow() {
  const [order, setOrder] = useState<DscOrderState>(restoreOrderState);

  useEffect(() => {
    if (window.location.search) window.history.replaceState(null, "", window.location.pathname);
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
    } catch {
      // Storage full or disabled - auto-save is a nicety, not required.
    }
  }, [order]);

  const patch = (update: Partial<DscOrderState>) => setOrder((current) => ({ ...current, ...update }));

  return (
    <div className="mx-auto max-w-2xl">
      <span className="eyebrow">Digital Signature Certificate</span>
      {order.step === "details" && (
        <DscDetailsStep
          dscType={order.dscType}
          initial={order.details}
          onTypeChange={(dscType) => patch({ dscType })}
          onContinue={(details, orderId) => patch({ details, orderId, step: "pay", paymentError: undefined })}
        />
      )}
      {order.step === "pay" && order.orderId && (
        <DscPayStep
          orderId={order.orderId}
          dscType={order.dscType}
          details={order.details}
          paymentError={order.paymentError}
          onEdit={() => patch({ step: "details", orderId: null, paymentError: undefined })}
        />
      )}
      {order.step === "done" && order.orderId && (
        <DscDoneStep
          orderId={order.orderId}
          onNewOrder={() => setOrder({ step: "details", dscType: order.dscType, details: order.details, orderId: null })}
        />
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30";

function DscDetailsStep({
  dscType,
  initial,
  onTypeChange,
  onContinue,
}: {
  dscType: DscTypeId;
  initial: Details;
  onTypeChange: (dscType: DscTypeId) => void;
  onContinue: (details: Details, orderId: string) => void;
}) {
  const [values, setValues] = useState(initial);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const charge = dscCharge(dscType);

  function set<K extends keyof Details>(key: K, value: Details[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/dsc/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dscType, ...values, pan: values.pan.toUpperCase(), consent }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Could not save your order");
      }
      onContinue(values, data.orderId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900">Buy a Class 3 DSC</h1>
      <p className="mt-2 text-neutral-600">
        Choose your certificate, tell us who it is for and where to send the token, then pay online.
      </p>

      <fieldset className="mt-8">
        <legend className="text-base font-bold text-neutral-900">1. Choose your certificate</legend>
        <div className="mt-3 space-y-2">
          {dscPrices.map((dsc) => (
            <label
              key={dsc.id}
              className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border px-4 py-3 text-sm transition-colors ${
                dsc.id === dscType ? "border-brand-500 bg-brand-50" : "border-neutral-200 bg-white hover:border-brand-300"
              }`}
            >
              <span className="flex items-center gap-3">
                <input
                  type="radio"
                  name="dscType"
                  value={dsc.id}
                  checked={dsc.id === dscType}
                  onChange={() => onTypeChange(dsc.id)}
                />
                <span>
                  <span className="font-medium text-neutral-900">{dsc.type}</span>
                  <span className="block text-neutral-500">{dsc.validity}, USB token included</span>
                </span>
              </span>
              <span className="shrink-0 font-semibold text-neutral-900">₹{dsc.price.toLocaleString("en-IN")}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="text-base font-bold text-neutral-900">2. Certificate holder</legend>
        <p className="mt-1 text-sm text-neutral-500">Enter the name exactly as it appears on the PAN card.</p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input required placeholder="Full name as on PAN *" autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} className={`${inputClass} sm:col-span-2`} />
          <input required placeholder="PAN *" maxLength={10} value={values.pan} onChange={(e) => set("pan", e.target.value.toUpperCase())} className={`${inputClass} uppercase`} />
          <input required type="tel" placeholder="Mobile number (Aadhaar-linked) *" autoComplete="tel" value={values.phone} onChange={(e) => set("phone", e.target.value)} className={inputClass} />
          <input required type="email" placeholder="Email address *" autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)} className={`${inputClass} sm:col-span-2`} />
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="text-base font-bold text-neutral-900">3. Token delivery address</legend>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <textarea required rows={2} placeholder="House / flat, street, area *" autoComplete="street-address" value={values.address} onChange={(e) => set("address", e.target.value)} className={`${inputClass} sm:col-span-2`} />
          <input required placeholder="City *" autoComplete="address-level2" value={values.city} onChange={(e) => set("city", e.target.value)} className={inputClass} />
          <input required placeholder="State *" autoComplete="address-level1" value={values.state} onChange={(e) => set("state", e.target.value)} className={inputClass} />
          <input required inputMode="numeric" maxLength={6} placeholder="PIN code *" autoComplete="postal-code" value={values.pincode} onChange={(e) => set("pincode", e.target.value.replace(/\D/g, ""))} className={inputClass} />
        </div>
      </fieldset>

      <label className="mt-6 flex items-start gap-2 text-sm text-neutral-600">
        <input type="checkbox" required checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
        <span>
          I agree to the{" "}
          <Link href="/terms" className="font-medium text-brand-700 underline">Terms</Link>,{" "}
          <Link href="/privacy-policy" className="font-medium text-brand-700 underline">Privacy Policy</Link> and{" "}
          <Link href="/refund-policy" className="font-medium text-brand-700 underline">Refund Policy</Link>
        </span>
      </label>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-xl bg-brand-600 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
      >
        {submitting ? "Saving…" : `Continue to payment - ${rupees(charge.total)} incl. GST`}
      </button>
    </form>
  );
}

function DscPayStep({
  orderId,
  dscType,
  details,
  paymentError,
  onEdit,
}: {
  orderId: string;
  dscType: DscTypeId;
  details: Details;
  paymentError?: "failed" | "error";
  onEdit: () => void;
}) {
  const { dsc, price, gst, total } = dscCharge(dscType);

  return (
    <div>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900">Review and pay</h1>

      <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 text-sm">
        <div className="flex items-start justify-between gap-4">
          <span className="text-neutral-700">
            {dsc.type}, {dsc.validity}
            <span className="block text-neutral-500">USB token, verification support and courier included</span>
          </span>
          <span className="shrink-0 font-semibold text-neutral-900">{rupees(price)}</span>
        </div>
        <div className="mt-2 flex justify-between text-neutral-700">
          <span>GST (18%)</span>
          <span>{rupees(gst)}</span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3">
          <span className="font-semibold text-neutral-900">Total</span>
          <span className="text-xl font-extrabold text-neutral-900">{rupees(total)}</span>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-5 text-sm text-neutral-700">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-neutral-900">{details.name}</h2>
          <button type="button" onClick={onEdit} className="font-medium text-brand-700 hover:underline">
            Edit
          </button>
        </div>
        <p className="mt-1">PAN {details.pan} · {details.phone} · {details.email}</p>
        <p className="mt-1 text-neutral-500">
          Deliver to: {details.address}, {details.city}, {details.state} {details.pincode}
        </p>
      </div>

      {paymentError === "failed" && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          Payment did not go through. Please try again.
        </p>
      )}
      {paymentError === "error" && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          We could not confirm your payment. If money left your account, do not pay again: contact
          us on {siteConfig.phoneDisplay} with order ID {orderId}.
        </p>
      )}

      <div className="mt-5">
        <PayUCheckoutButton
          initiate={{ url: "/api/dsc/pay", body: { orderId } }}
          label={`Pay ${rupees(total)}`}
          className="w-full"
        />
      </div>
      <p className="mt-3 text-center text-xs text-neutral-500">
        UPI, cards, net banking and wallets, through PayU&apos;s secure checkout.
      </p>
    </div>
  );
}

interface OrderSummary {
  id: string;
  dscLabel: string;
  name: string;
  status: string;
  amount: number;
  payuTxnId: string | null;
}

function DscDoneStep({ orderId, onNewOrder }: { orderId: string; onNewOrder: () => void }) {
  const [summary, setSummary] = useState<OrderSummary | null>(null);

  useEffect(() => {
    fetch(`/api/dsc/order/${orderId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then(setSummary)
      .catch(() => setSummary(null));
  }, [orderId]);

  return (
    <div>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-neutral-900">Payment received</h1>
      <p className="mt-2 text-neutral-600">
        Thank you{summary ? `, ${summary.name}` : ""}. Your order ID is{" "}
        <span className="font-semibold text-neutral-900">{orderId}</span>. A confirmation from PayU is
        on its way to your email.
      </p>

      {summary && (
        <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 text-sm text-neutral-700">
          <p>{summary.dscLabel}</p>
          <p className="mt-1">Amount paid: <span className="font-semibold text-neutral-900">{rupees(summary.amount)}</span> (incl. 18% GST)</p>
          {summary.payuTxnId && <p className="mt-1 text-neutral-500">Transaction: {summary.payuTxnId}</p>}
        </div>
      )}

      <h2 className="mt-8 text-lg font-bold text-neutral-900">What happens next</h2>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-neutral-700">
        <li>We contact you on your mobile to start the eKYC and video verification.</li>
        <li>Your certificate is issued within {DSC_TIMELINE.processing} of verification.</li>
        <li>The USB token is couriered to your address in {DSC_TIMELINE.delivery}, and we help you set it up.</li>
      </ol>
      <p className="mt-4 text-sm text-neutral-500">Included: {DSC_INCLUSIONS.join(" · ")}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700">
          Back to home
        </Link>
        <button
          type="button"
          onClick={onNewOrder}
          className="rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 hover:border-brand-300"
        >
          Order another DSC
        </button>
      </div>
    </div>
  );
}
