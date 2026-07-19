import Link from "next/link";
import clsx from "clsx";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "whatsapp" | "outline";

const variantClasses: Record<Variant, string> = {
  primary: "bg-brand-600 text-white shadow-card hover:bg-brand-700 hover:shadow-card-hover hover:-translate-y-0.5",
  secondary: "bg-neutral-900 text-white shadow-card hover:bg-neutral-700 hover:shadow-card-hover hover:-translate-y-0.5",
  whatsapp: "bg-accent-500 text-white shadow-card hover:bg-accent-600 hover:shadow-card-hover hover:-translate-y-0.5",
  outline: "border border-neutral-200 text-neutral-900 hover:border-brand-300 hover:bg-neutral-50",
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
    "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none",
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
