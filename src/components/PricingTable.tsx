import clsx from "clsx";
import { Button } from "@/components/Button";
import { pricingTiers } from "@/data/pricing";

export function PricingTable() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {pricingTiers.map((tier) => (
        <div
          key={tier.id}
          className={clsx(
            "flex flex-col rounded-2xl border p-6",
            tier.highlighted
              ? "border-brand-600 bg-brand-50 shadow-md"
              : "border-neutral-200 bg-white",
          )}
        >
          {tier.highlighted && (
            <span className="mb-3 inline-block w-fit rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
              Most Popular
            </span>
          )}
          <h3 className="text-xl font-bold text-neutral-900">{tier.name}</h3>
          <p className="mt-1 text-sm text-neutral-600">{tier.description}</p>
          <div className="mt-4">
            <span className="text-3xl font-extrabold text-neutral-900">₹{tier.price.toLocaleString("en-IN")}</span>
            <span className="ml-1 text-sm text-neutral-500">{tier.priceNote}</span>
          </div>
          <ul className="mt-5 space-y-2 text-sm text-neutral-700">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <span className="mt-0.5 text-accent-500">✓</span>
                {feature}
              </li>
            ))}
          </ul>
          <Button
            href="/contact"
            variant={tier.highlighted ? "primary" : "outline"}
            className="mt-6 w-full"
          >
            {tier.ctaLabel}
          </Button>
        </div>
      ))}
    </div>
  );
}
