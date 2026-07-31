"use client";

import { useState } from "react";
import Script from "next/script";
import { Button } from "@/components/Button";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: (response: { error?: { description?: string } }) => void) => void;
    };
  }
}

interface RazorpayVerifyResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayCheckoutButtonProps {
  /** Amount in rupees (not paise) - the component converts to paise itself. */
  amount: number;
  label?: string;
  name?: string;
  description?: string;
  className?: string;
}

export function RazorpayCheckoutButton({
  amount,
  label = "Pay Now",
  name = "Financial Sage",
  description = "GST service payment",
  className,
}: RazorpayCheckoutButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);

  async function handlePay() {
    setStatus("loading");
    setError(null);

    try {
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Math.round(amount * 100), currency: "INR" }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData.error || "Could not start payment");
      }

      const razorpayCheckout = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name,
        description,
        order_id: orderData.order_id,
        handler: async (response: RazorpayVerifyResponse) => {
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(verifyData.error || "Payment could not be verified");
            }
            setPaymentId(response.razorpay_payment_id);
            setStatus("success");
          } catch (err) {
            setStatus("error");
            setError(
              err instanceof Error
                ? `${err.message}. Contact support if money was deducted.`
                : "Payment could not be verified. Contact support if money was deducted.",
            );
          }
        },
        modal: {
          ondismiss: () => {
            setStatus((current) => (current === "loading" ? "idle" : current));
          },
        },
        theme: { color: "#4f46e5" },
      });

      razorpayCheckout.on("payment.failed", (response) => {
        setStatus("error");
        setError(response.error?.description || "Payment failed. Please try again.");
      });

      razorpayCheckout.open();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-accent-500/30 bg-accent-500/5 p-6 text-center">
        <p className="text-lg font-semibold text-neutral-900">Payment received.</p>
        <p className="mt-1 text-sm text-neutral-600">Payment ID: {paymentId}</p>
      </div>
    );
  }

  return (
    <div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" onLoad={() => setScriptReady(true)} />
      <Button
        type="button"
        onClick={handlePay}
        disabled={status === "loading" || !scriptReady}
        variant="primary"
        className={className}
      >
        {status === "loading" ? "Processing…" : label}
      </Button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
