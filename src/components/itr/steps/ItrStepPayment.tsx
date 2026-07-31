"use client";

import { PayUCheckoutButton } from "@/components/PayUCheckoutButton";
import { siteConfig } from "@/lib/site-config";

const paymentMethods = ["UPI", "Cards", "Net Banking", "Wallets"];

export function ItrStepPayment({
  applicationId,
  name,
  email,
  phone,
  paymentFailed,
}: {
  applicationId: string;
  name: string;
  email: string;
  phone: string;
  paymentFailed?: boolean;
}) {
  const price = siteConfig.pricingFrom.itrFilingWizard;

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

      {paymentFailed && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          Payment did not go through. Please try again.
        </p>
      )}

      <div className="mt-5">
        <PayUCheckoutButton
          amount={price}
          name={name}
          email={email}
          phone={phone}
          productinfo="Financial Sage ITR Filing"
          udf1={applicationId}
          label={`Pay Now — ₹${price}`}
          variant="outline"
          className="w-full rounded-xl !border-itr-green-500 !bg-itr-green-500 px-5 py-3.5 text-sm font-semibold !text-white hover:!bg-itr-green-600"
        />
      </div>
    </div>
  );
}
