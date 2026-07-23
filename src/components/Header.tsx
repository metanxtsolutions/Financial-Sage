"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { label: "GST Registration", href: "/gst-registration" },
  { label: "GST Return Filing", href: "/gst-return-filing" },
  { label: "GST Compliance", href: "/gst-compliance" },
  { label: "GST Tools", href: "/gst-tools" },
  { label: "GST Guides", href: "/gst-guides" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The dark hero only exists on the homepage. Elsewhere, or once the user
  // has scrolled past it, the header is always solid.
  const onHero = pathname === "/" && !scrolled && !open;

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-40 backdrop-blur transition-colors duration-300",
        onHero
          ? "border-b border-white/10 bg-transparent backdrop-blur-none"
          : "border-b border-neutral-200 bg-white/95",
        scrolled && "shadow-card",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 whitespace-nowrap"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient text-sm font-bold text-white shadow-[0_6px_16px_-6px_rgba(79,70,229,0.6)]">
            FS
          </span>
          <span
            className={clsx(
              "font-heading text-lg font-bold tracking-tight transition-colors duration-300",
              onHero ? "text-white" : "text-neutral-900",
            )}
          >
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-4 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "text-sm font-medium whitespace-nowrap transition-colors duration-300",
                onHero ? "text-white/75 hover:text-white" : "text-neutral-700 hover:text-brand-700",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <Link
            href={siteConfig.loginUrl}
            className={clsx(
              "text-sm font-medium whitespace-nowrap transition-colors duration-300",
              onHero ? "text-white/75 hover:text-white" : "text-neutral-700 hover:text-brand-700",
            )}
          >
            Client Login
          </Link>
          <Button href="/gst-registration" variant="primary" className="px-4 py-2.5 whitespace-nowrap">
            Talk to GST Expert
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
          className={clsx(
            "flex h-10 w-10 items-center justify-center rounded-md border transition-colors duration-300 xl:hidden",
            onHero ? "border-white/30 text-white" : "border-neutral-200 text-neutral-900",
          )}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-neutral-200 bg-white xl:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-2 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={siteConfig.loginUrl}
              className="rounded-md px-2 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
            >
              Client Login
            </Link>
            <div className="mt-2 px-2">
              <Button href="/gst-registration" variant="primary" className="w-full">
                Talk to GST Expert
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
