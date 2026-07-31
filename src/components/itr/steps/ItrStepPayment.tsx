"use client";

import { useState } from "react";
import { RazorpayCheckoutButton } from "@/components/RazorpayCheckoutButton";
import { siteConfig } from "@/lib/site-config";

const paymentMethods = ["UPI", "Cards", "Net Banking", "Wallets"];

export function ItrStepPayment({
  applicationId,
  onPaid,
}: {
  applicationId: string;
  onPaid: () => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const price = siteConfig.pricingFrom.itrFilingWizard;

  async function handleSuccess(result: { orderId: string; paymentId: string; signature: string }) {
    try {
      const res = await fetch("/api/itr/mark-paid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId,
          razorpay_order_id: result.orderId,
          razorpay_payment_id: result.paymentId,
          razorpay_signature: result.signature,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Payment could not be confirmed");
      }
      onPaid();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment could not be confirmed. Contact support.");
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-itr-navy-500">Payment</h1>
      <p className="mt-1 text-sm text-neutral-500">One payment, everything included.</p>

      <div className="mt-5 rounded-2xl border border-neutral-200 bg-white p-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-500">ITR Filing Service</span>
          <span className="font-semibold text-neutral-900">₹{price}</span>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3">
          <span className="font-semibold text-neutral-900">Total</span>
          <span className="text-xl font-extrabold text-itr-navy-500">₹{price}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {paymentMethods.map((method) => (
          <span
            key={method}
            className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600"
          >
            {method}
          </span>
        ))}
      </div>

      <div className="mt-5">
        <RazorpayCheckoutButton
          amount={price}
          label={`Pay Now — ₹${price}`}
          description="Financial Sage ITR Filing"
          receipt={applicationId}
          themeColor="#3f8f2c"
          variant="outline"
          className="w-full rounded-xl !border-itr-green-500 !bg-itr-green-500 px-5 py-3.5 text-sm font-semibold !text-white hover:!bg-itr-green-600"
          onSuccess={handleSuccess}
        />
      </div>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  );
}
