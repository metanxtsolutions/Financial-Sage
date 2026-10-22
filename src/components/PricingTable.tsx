import Link from "next/link";
import clsx from "clsx";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { pricingTiers, TIER_TAX_NOTE } from "@/data/pricing";

// "ember" is the homepage treatment: the featured plan becomes a dark navy
// card with an orange call to action. /pricing keeps the default.
export function PricingTable({ tone = "default" }: { tone?: "default" | "ember" }) {
  const ember = tone === "ember";

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-center">
      {pricingTiers.map((tier) => {
        const dark = ember && tier.highlighted;

        return (
          <div
            key={tier.id}
            className={clsx(
              "relative flex flex-col rounded-2xl border p-6 transition-all duration-200",
              dark
                ? "z-10 border-navy bg-navy text-white shadow-[0_30px_60px_-24px_rgba(10,15,31,0.6)] md:-my-3 md:scale-105 md:p-8"
                : tier.highlighted
                  ? "z-10 border-2 border-gold-500 bg-white shadow-card-hover md:-my-3 md:scale-105 md:p-8"
                  : "border-neutral-200 bg-white shadow-card hover:-translate-y-1 hover:shadow-card-hover",
              ember && "rounded-3xl",
            )}
          >
            {tier.highlighted &&
              (dark ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ember-600 px-3 py-1 text-xs font-semibold text-white shadow-card">
                  Most Popular
                </span>
              ) : (
                <Badge tone="gold" variant="solid" className="absolute -top-3 left-1/2 -translate-x-1/2 shadow-card">
                  Most Popular
                </Badge>
              ))}
            <h3 className={clsx("text-xl font-bold", dark ? "text-white" : "text-neutral-900")}>{tier.name}</h3>
            <p className={clsx("mt-1 text-sm", dark ? "text-white/65" : "text-neutral-600")}>{tier.description}</p>
            <div className="mt-4">
              <span className={clsx("text-3xl font-extrabold", dark ? "text-white" : "text-neutral-900")}>
                ₹{tier.price.toLocaleString("en-IN")}
              </span>
              <p className={clsx("mt-1 text-sm font-medium", dark ? "text-white/80" : "text-neutral-700")}>
                Paid {tier.billing}
              </p>
              {tier.separatePrice && (
                <p className={clsx("mt-1 text-sm", dark ? "text-white/60" : "text-neutral-500")}>
                  <s>₹{tier.separatePrice.toLocaleString("en-IN")}</s> if bought separately,{" "}
                  <span className={clsx("font-semibold", dark ? "text-ember-300" : "text-accent-600")}>
                    save ₹{(tier.separatePrice - tier.price).toLocaleString("en-IN")}
                  </span>
                </p>
              )}
              <p className={clsx("mt-1 text-xs", dark ? "text-white/50" : "text-neutral-500")}>{TIER_TAX_NOTE}</p>
            </div>
            <ul className={clsx("mt-5 space-y-2 text-sm", dark ? "text-white/80" : "text-neutral-700")}>
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span aria-hidden="true" className={clsx("mt-0.5", ember ? "text-ember-500" : "text-accent-500")}>
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            {ember ? (
              <Link
                href="/contact"
                className={clsx(
                  "mt-6 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-200",
                  dark ? "bg-ember-600 text-white hover:bg-ember-700" : "bg-navy text-white hover:bg-neutral-800",
                )}
              >
                {tier.ctaLabel}
              </Link>
            ) : (
              <Button
                href="/contact"
                variant={tier.highlighted ? "primary" : "outline"}
                className="mt-6 w-full"
              >
                {tier.ctaLabel}
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
