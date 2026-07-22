import clsx from "clsx";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { pricingTiers } from "@/data/pricing";

export function PricingTable() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-center">
      {pricingTiers.map((tier) => (
        <div
          key={tier.id}
          className={clsx(
            "relative flex flex-col rounded-2xl border p-6 transition-all duration-200",
            tier.highlighted
              ? "z-10 border-2 border-gold-500 bg-white shadow-card-hover md:-my-3 md:scale-105 md:p-8"
              : "border-neutral-200 bg-white shadow-card hover:-translate-y-1 hover:shadow-card-hover",
          )}
        >
          {tier.highlighted && (
            <Badge tone="gold" variant="solid" className="absolute -top-3 left-1/2 -translate-x-1/2 shadow-card">
              Most Popular
            </Badge>
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
