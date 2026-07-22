import clsx from "clsx";
import { ReactNode } from "react";

type Tone = "gold" | "brand" | "neutral";
type Variant = "solid" | "outline";

const toneClasses: Record<Tone, Record<Variant, string>> = {
  gold: {
    // Dark ink text, not white: white-on-gold-500 fails WCAG AA contrast (~2.3:1).
    solid: "bg-gold-500 text-neutral-900",
    outline: "border border-gold-500 text-gold-600",
  },
  brand: {
    solid: "bg-brand-600 text-white",
    outline: "border border-brand-200 text-brand-600",
  },
  neutral: {
    solid: "bg-neutral-900 text-white",
    outline: "border border-neutral-200 text-neutral-600",
  },
};

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  variant?: Variant;
  className?: string;
}

export function Badge({ children, tone = "neutral", variant = "outline", className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex w-fit items-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold",
        toneClasses[tone][variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
