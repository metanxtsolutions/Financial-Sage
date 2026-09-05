"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { siteConfig } from "@/lib/site-config";
import { serviceCategories, getServicesByCategory } from "@/data/other-services";

const navLinks = [
  { label: "GST Registration", href: "/gst-registration" },
  { label: "GST Return Filing", href: "/gst-return-filing" },
  { label: "GST Compliance", href: "/gst-compliance" },
  { label: "GST Tools", href: "/gst-tools" },
  { label: "GST Guides", href: "/gst-guides" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Any navigation closes whatever was open, so no menu survives a route
  // change. Adjusting during render (rather than in an effect) avoids the
  // extra pass that would briefly paint the old menu over the new page, and
  // it catches back/forward navigation too.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }

  // Escape closes the mega menu, and a click outside it does the same. Both
  // are only wired up while it is actually open.
  useEffect(() => {
    if (!servicesOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setServicesOpen(false);
    }
    function onPointerDown(event: MouseEvent) {
      if (!servicesRef.current?.contains(event.target as Node)) setServicesOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [servicesOpen]);

  // The dark hero only exists on the homepage. Elsewhere, or once the user
  // has scrolled past it, the header is always solid. An open mega menu also
  // forces the solid treatment so the panel has something to sit against.
  const onHero = pathname === "/" && !scrolled && !open && !servicesOpen;

  // The ITR wizard is a focused, distraction-free flow - no site nav during
  // the actual filing steps. The /itr-filing landing page keeps the normal
  // header.
  if (pathname?.startsWith("/itr-filing/apply")) return null;

  const linkClass = clsx(
    "text-sm font-medium whitespace-nowrap transition-colors duration-300",
    onHero ? "text-white/75 hover:text-white" : "text-neutral-700 hover:text-brand-700",
  );

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-40 backdrop-blur transition-colors duration-300",
        onHero
          ? "bg-transparent px-4 py-2 backdrop-blur-none sm:px-6 lg:px-8"
          : "border-b border-neutral-200 bg-white/95",
        scrolled && "shadow-card",
      )}
    >
      {/* Over the hero the bar becomes a floating pill. The py-2 outside plus
          h-12 inside adds back up to the 64px the layout's pt-16 assumes, so
          nothing shifts when it turns solid on scroll. */}
      <div
        className={clsx(
          "mx-auto flex w-full max-w-7xl items-center justify-between gap-4 transition-all duration-300",
          onHero
            ? "h-12 rounded-full border border-white/15 bg-white/[0.07] px-5 backdrop-blur-md"
            : "h-16 px-4 sm:px-6 lg:px-8",
        )}
      >
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
          {navLinks.slice(0, 3).map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}

          <div
            ref={servicesRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            {/* A link rather than a toggle: hovering or tabbing to it opens the
                panel, and activating it goes to the full catalogue. A toggle
                here fought the hover - the pointer had already opened the
                panel, so the click only ever closed it again. */}
            <Link
              href="/other-services"
              aria-expanded={servicesOpen}
              aria-controls="services-mega-menu"
              onFocus={() => setServicesOpen(true)}
              className={clsx(linkClass, "flex items-center gap-1")}
            >
              Services
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
                className={clsx("transition-transform duration-200", servicesOpen && "rotate-180")}
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {servicesOpen && (
              <div
                id="services-mega-menu"
                className="absolute top-full left-1/2 z-50 w-[min(72rem,calc(100vw-4rem))] -translate-x-1/2 pt-3"
              >
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-card-hover">
                  <div className="grid grid-cols-4 gap-x-6 gap-y-7">
                    {serviceCategories.map((category) => {
                      const services = getServicesByCategory(category.id).slice(0, 7);
                      const total = getServicesByCategory(category.id).length;
                      if (services.length === 0) return null;

                      return (
                        <div key={category.id}>
                          <Link
                            href={`/services/${category.slug}`}
                            className="text-xs font-semibold tracking-wide text-neutral-900 uppercase hover:text-brand-700"
                          >
                            {category.title}
                          </Link>
                          <ul className="mt-2.5 space-y-1.5">
                            {services.map((service) => (
                              <li key={service.slug}>
                                <Link
                                  href={`/other-services/${service.slug}`}
                                  className="text-sm text-neutral-600 hover:text-brand-700"
                                >
                                  {service.title}
                                </Link>
                              </li>
                            ))}
                            {total > services.length && (
                              <li>
                                <Link
                                  href={`/services/${category.slug}`}
                                  className="text-sm font-medium text-brand-700 hover:underline"
                                >
                                  +{total - services.length} more
                                </Link>
                              </li>
                            )}
                          </ul>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-neutral-200 pt-4">
                    <p className="text-sm text-neutral-500">
                      Free calculators:{" "}
                      <Link href="/gst-tools" className="font-medium text-brand-700 hover:underline">
                        GST tools
                      </Link>{" "}
                      and{" "}
                      <Link href="/tax-tools" className="font-medium text-brand-700 hover:underline">
                        income tax tools
                      </Link>
                      .
                    </p>
                    <Link href="/other-services" className="text-sm font-semibold text-brand-700 hover:underline">
                      View all services →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {navLinks.slice(3).map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <Link href={siteConfig.loginUrl} className={linkClass}>
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
        <div id="mobile-nav" className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-neutral-200 bg-white xl:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-2 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* On mobile the catalogue is far too long to list in full, so this
                expands to the seven categories and hands off to /other-services. */}
            <button
              type="button"
              aria-expanded={mobileServicesOpen}
              aria-controls="mobile-services"
              onClick={() => setMobileServicesOpen((v) => !v)}
              className="flex items-center justify-between rounded-md px-2 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
            >
              Services
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
                className={clsx("transition-transform duration-200", mobileServicesOpen && "rotate-180")}
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {mobileServicesOpen && (
              <div id="mobile-services" className="mb-1 ml-2 flex flex-col gap-0.5 border-l border-neutral-200 pl-3">
                {serviceCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/services/${category.slug}`}
                    className="rounded-md px-2 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-brand-700"
                    onClick={() => setOpen(false)}
                  >
                    {category.title}
                    <span className="ml-1.5 text-xs text-neutral-400">
                      {getServicesByCategory(category.id).length}
                    </span>
                  </Link>
                ))}
                <Link
                  href="/other-services"
                  className="rounded-md px-2 py-2 text-sm font-semibold text-brand-700 hover:bg-neutral-50"
                  onClick={() => setOpen(false)}
                >
                  View all services →
                </Link>
              </div>
            )}

            {navLinks.slice(3).map((link) => (
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
