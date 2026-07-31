import type { Metadata } from "next";
import { Section } from "@/components/Container";
import { RazorpayCheckoutButton } from "@/components/RazorpayCheckoutButton";

export const metadata: Metadata = {
  title: "Razorpay Checkout Test",
  robots: { index: false, follow: false },
};

export default function RazorpayTestPage() {
  return (
    <Section>
      <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
        Razorpay Checkout Test
      </h1>
      <p className="mt-4 max-w-xl text-lg text-neutral-600">
        Standalone test page for the Razorpay Standard Checkout integration. Not linked from
        navigation, not indexed. Uses test-mode keys, so no real money moves.
      </p>

      <div className="mt-8 max-w-sm rounded-2xl border border-neutral-200 bg-white p-6 shadow-card">
        <div className="text-sm font-semibold text-neutral-900">Test payment</div>
        <div className="mt-1 text-3xl font-extrabold text-neutral-900">₹1</div>
        <p className="mt-2 text-sm text-neutral-500">
          Use Razorpay&apos;s test card 4111 1111 1111 1111, any future expiry, any CVV.
        </p>
        <div className="mt-4">
          <RazorpayCheckoutButton amount={1} label="Pay ₹1 (test)" className="w-full" />
        </div>
      </div>
    </Section>
  );
}
