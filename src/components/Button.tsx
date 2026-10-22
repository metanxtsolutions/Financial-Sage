import Link from "next/link";
import clsx from "clsx";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "whatsapp" | "outline" | "ghostDark";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-ember-600 text-white shadow-[0_10px_28px_-10px_rgba(239,106,38,0.7)] hover:-translate-y-0.5 hover:bg-ember-700 hover:shadow-[0_16px_36px_-10px_rgba(239,106,38,0.75)]",
  secondary:
    "bg-navy text-white shadow-card hover:bg-neutral-800 hover:shadow-card-hover hover:-translate-y-0.5",
  whatsapp:
    "bg-accent-500 text-white shadow-card hover:bg-accent-600 hover:shadow-card-hover hover:-translate-y-0.5",
  outline:
    "border border-neutral-200 bg-white/70 text-neutral-900 backdrop-blur hover:border-ember-300 hover:bg-white hover:-translate-y-0.5",
  ghostDark:
    "border border-white/20 bg-white/10 text-white backdrop-blur hover:border-white/40 hover:bg-white/15 hover:-translate-y-0.5",
};

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function Button({
  children,
  href,
  variant = "primary",
  className,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none",
    variantClasses[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
