"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button";

type ButtonVariant = "primary" | "secondary" | "whatsapp" | "outline" | "ghostDark";

interface PayUFields {
  action: string;
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  udf1: string;
  surl: string;
  furl: string;
  hash: string;
}

interface PayUCheckoutButtonProps {
  /** Amount in rupees. */
  amount: number;
  name: string;
  email: string;
  phone: string;
  productinfo?: string;
  /** Opaque value PayU echoes back untouched in its postback, e.g. an application id to reconcile later. */
  udf1?: string;
  label?: string;
  className?: string;
  /** Base Button variant. Use "outline" (not "primary") when overriding colors via
   * className - "primary" paints a background-image gradient that sits on top of
   * and hides any background-color override, no matter the class order. */
  variant?: ButtonVariant;
}

export function PayUCheckoutButton({
  amount,
  name,
  email,
  phone,
  productinfo = "Financial Sage Payment",
  udf1,
  label = "Pay Now",
  className,
  variant = "primary",
}: PayUCheckoutButtonProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState<PayUFields | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // PayU's hosted checkout is a full-page redirect (a POSTed HTML form),
  // not a JS modal - once the fields come back from our own server (which
  // holds the salt), auto-submit the hidden form to navigate away.
  useEffect(() => {
    if (fields) formRef.current?.submit();
  }, [fields]);

  async function handlePay() {
    setStatus("loading");
    setError(null);

    try {
      const res = await fetch("/api/payu/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, name, email, phone, productinfo, udf1 }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Could not start payment");
      }
      setFields(data);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <div>
      {fields && (
        <form ref={formRef} action={fields.action} method="post" className="hidden">
          <input type="hidden" name="key" value={fields.key} />
          <input type="hidden" name="txnid" value={fields.txnid} />
          <input type="hidden" name="amount" value={fields.amount} />
          <input type="hidden" name="productinfo" value={fields.productinfo} />
          <input type="hidden" name="firstname" value={fields.firstname} />
          <input type="hidden" name="email" value={fields.email} />
          <input type="hidden" name="phone" value={fields.phone} />
          <input type="hidden" name="udf1" value={fields.udf1} />
          <input type="hidden" name="surl" value={fields.surl} />
          <input type="hidden" name="furl" value={fields.furl} />
          <input type="hidden" name="hash" value={fields.hash} />
        </form>
      )}
      <Button
        type="button"
        onClick={handlePay}
        disabled={status === "loading"}
        variant={variant}
        className={className}
      >
        {status === "loading" ? "Redirecting…" : label}
      </Button>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
