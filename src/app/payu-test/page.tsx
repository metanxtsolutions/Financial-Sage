import type { Metadata } from "next";
import { Section } from "@/components/Container";
import { PayUCheckoutButton } from "@/components/PayUCheckoutButton";

export const metadata: Metadata = {
  title: "PayU Checkout Test",
  robots: { index: false, follow: false },
};

export default function PayUTestPage() {
  return (
    <Section>
      <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
        PayU Checkout Test
      </h1>
      <p className="mt-4 max-w-xl text-lg text-neutral-600">
        Standalone test page for the PayU Hosted Checkout integration. Not linked from
        navigation, not indexed. Uses test-mode keys, so no real money moves.
      </p>

      <div className="mt-8 max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 shadow-card">
        <div className="text-sm font-semibold text-neutral-900">Test payment</div>
        <div className="mt-1 text-3xl font-extrabold text-neutral-900">₹1</div>
        <p className="mt-2 text-sm text-neutral-500">
          You&apos;ll be redirected to PayU&apos;s hosted test page to complete the payment.
        </p>
        <div className="mt-4">
          <PayUCheckoutButton
            amount={1}
            name="Test User"
            email="test@example.com"
            phone="9999999999"
            label="Pay ₹1 (test)"
            className="w-full"
          />
        </div>
      </div>
    </Section>
  );
}
