"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Container } from "@/components/Container";
import { SiteSearch } from "@/components/SiteSearch";
import { siteConfig } from "@/lib/site-config";
import type { SearchEntry } from "@/lib/search-index";
import { serviceCategories, getServicesByCategory } from "@/data/other-services";
import { cities } from "@/data/cities";
import { tools } from "@/data/tools";
import { taxTools } from "@/data/tax-tools";

type MenuId = "gst" | "services" | "tools";

// Category nouns rather than page names. The previous nav repeated the word
// "GST" five times across eight items while 90 services hid behind one
// dropdown; this puts GST first and largest, and lets the catalogue breathe.
const menus: { id: MenuId; label: string; href: string }[] = [
  { id: "gst", label: "GST", href: "/gst-registration" },
  { id: "services", label: "Services", href: "/other-services" },
  { id: "tools", label: "Tools", href: "/gst-tools" },
];

const plainLinks = [
  { label: "Guides", href: "/gst-guides" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

function PanelColumn({ title, href, children }: { title: string; href: string; children: ReactNode }) {
  return (
    <div>
      <Link
        href={href}
        className="text-xs font-semibold tracking-wide text-neutral-900 uppercase hover:text-brand-700"
      >
        {title}
      </Link>
      <ul className="mt-2.5 space-y-1.5">{children}</ul>
    </div>
  );
}

function PanelLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-neutral-600 hover:text-brand-700">
        {children}
      </Link>
    </li>
  );
}

export function Header({ searchIndex }: { searchIndex: SearchEntry[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<MenuId | null>(null);
  const [mobileMenu, setMobileMenu] = useState<MenuId | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Adjusting during render rather than in an effect: no extra pass, and it
  // catches back/forward navigation too.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
    setMenu(null);
    setMobileMenu(null);
  }

  useEffect(() => {
    if (!menu) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenu(null);
    }
    function onPointerDown(event: MouseEvent) {
      if (!navRef.current?.contains(event.target as Node)) setMenu(null);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [menu]);

  const onHero = pathname === "/" && !scrolled && !open && !menu;

  if (pathname?.startsWith("/itr-filing/apply")) return null;

  const linkClass = clsx(
    "text-sm font-medium whitespace-nowrap transition-colors duration-300",
    onHero ? "text-white/75 hover:text-white" : "text-neutral-700 hover:text-brand-700",
  );

  const gstCities = cities.slice(0, 9);
  const gstSpecialist = getServicesByCategory("gst-specialist").slice(0, 5);

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
      <div
        className={clsx(
          "mx-auto flex w-full max-w-7xl items-center justify-between gap-4 transition-all duration-300",
          onHero
            ? "h-12 rounded-full border border-white/15 bg-white/[0.07] px-5 backdrop-blur-md"
            : "h-16 px-4 sm:px-6 lg:px-8",
        )}
      >
        <Link href="/" className="flex shrink-0 items-center gap-2 whitespace-nowrap">
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

        <nav ref={navRef} className="hidden items-center gap-5 lg:flex">
          {menus.map((m) => (
            <div
              key={m.id}
              className="relative"
              onMouseEnter={() => setMenu(m.id)}
              onMouseLeave={() => setMenu(null)}
            >
              <Link
                href={m.href}
                aria-expanded={menu === m.id}
                aria-controls={`menu-${m.id}`}
                onFocus={() => setMenu(m.id)}
                className={clsx(linkClass, "flex items-center gap-1")}
              >
                {m.label}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                  className={clsx("transition-transform duration-200", menu === m.id && "rotate-180")}
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>

              {menu === m.id && (
                <div
                  id={`menu-${m.id}`}
                  className={clsx(
                    "absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3",
                    m.id === "services" ? "w-[min(72rem,calc(100vw-4rem))]" : "w-[min(46rem,calc(100vw-4rem))]",
                  )}
                >
                  <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-card-hover">
                    {m.id === "gst" && (
                      <div className="grid grid-cols-3 gap-x-6 gap-y-7">
                        <PanelColumn title="GST Services" href="/gst-registration">
                          <PanelLink href="/gst-registration">GST Registration</PanelLink>
                          <PanelLink href="/gst-return-filing">GST Return Filing</PanelLink>
                          <PanelLink href="/gst-compliance">GST Compliance</PanelLink>
                          <PanelLink href="/itr-filing">ITR Filing</PanelLink>
                        </PanelColumn>
                        <PanelColumn title="Specialist GST Work" href="/services/specialist-gst">
                          {gstSpecialist.map((s) => (
                            <PanelLink key={s.slug} href={`/other-services/${s.slug}`}>
                              {s.title}
                            </PanelLink>
                          ))}
                        </PanelColumn>
                        <PanelColumn title="GST by City" href="/gst-registration">
                          {gstCities.map((c) => (
                            <PanelLink key={c.citySlug} href={`/gst-registration/${c.stateSlug}/${c.citySlug}`}>
                              {c.city}
                            </PanelLink>
                          ))}
                        </PanelColumn>
                      </div>
                    )}

                    {m.id === "services" && (
                      <div className="grid grid-cols-4 gap-x-6 gap-y-7">
                        {serviceCategories.map((category) => {
                          const list = getServicesByCategory(category.id);
                          const preview = list.slice(0, 6);
                          return (
                            <PanelColumn
                              key={category.id}
                              title={category.title}
                              href={`/services/${category.slug}`}
                            >
                              {preview.map((s) => (
                                <PanelLink key={s.slug} href={`/other-services/${s.slug}`}>
                                  {s.title}
                                </PanelLink>
                              ))}
                              {list.length > preview.length && (
                                <li>
                                  <Link
                                    href={`/services/${category.slug}`}
                                    className="text-sm font-medium text-brand-700 hover:underline"
                                  >
                                    +{list.length - preview.length} more
                                  </Link>
                                </li>
                              )}
                            </PanelColumn>
                          );
                        })}
                      </div>
                    )}

                    {m.id === "tools" && (
                      <div className="grid grid-cols-2 gap-x-6 gap-y-7">
                        <PanelColumn title="GST Tools" href="/gst-tools">
                          {tools.map((t) => (
                            <PanelLink key={t.slug} href={`/gst-tools/${t.slug}`}>
                              {t.title}
                            </PanelLink>
                          ))}
                        </PanelColumn>
                        <PanelColumn title="Income Tax Tools" href="/tax-tools">
                          {taxTools.map((t) => (
                            <PanelLink key={t.slug} href={`/tax-tools/${t.slug}`}>
                              {t.title}
                            </PanelLink>
                          ))}
                        </PanelColumn>
                      </div>
                    )}

                    <div className="mt-6 flex items-center justify-between border-t border-neutral-200 pt-4">
                      <p className="text-sm text-neutral-500">
                        Not sure what you need? We&apos;ll tell you on a call, free.
                      </p>
                      <Link href={m.href} className="text-sm font-semibold text-brand-700 hover:underline">
                        View all &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {plainLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <SiteSearch index={searchIndex} onHero={onHero} />

          <a
            href={`tel:${siteConfig.phoneE164}`}
            className={clsx(
              "hidden items-center gap-1.5 text-sm font-medium whitespace-nowrap transition-colors xl:flex",
              onHero ? "text-white/75 hover:text-white" : "text-neutral-700 hover:text-brand-700",
            )}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.58 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.58 3.6a1 1 0 01-.25 1z" />
            </svg>
            {siteConfig.phoneDisplay}
          </a>

          <Link
            href={siteConfig.loginUrl}
            className={clsx(
              "rounded-full border px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
              onHero
                ? "border-white/30 text-white/85 hover:border-white/60 hover:text-white"
                : "border-neutral-300 text-neutral-700 hover:border-brand-400 hover:text-brand-700",
            )}
          >
            Login
          </Link>

          {/* Gold rather than brand violet. On the dark hero a violet button sits
              on a violet-tinted ground and recedes; this is the only warm colour
              on the page, so it reads as the one thing to click. */}
          <Link
            href="/gst-registration"
            className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-4 py-2 text-sm font-bold whitespace-nowrap text-ink shadow-[0_8px_20px_-8px_rgba(224,160,0,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-400"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.58 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.58 3.6a1 1 0 01-.25 1z" />
            </svg>
            Talk to an Expert
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <SiteSearch index={searchIndex} onHero={onHero} />
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            className={clsx(
              "flex h-10 w-10 items-center justify-center rounded-md border transition-colors duration-300",
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
      </div>

      {open && (
        <div id="mobile-nav" className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-neutral-200 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-3">
            {menus.map((m) => (
              <div key={m.id}>
                <button
                  type="button"
                  aria-expanded={mobileMenu === m.id}
                  onClick={() => setMobileMenu((v) => (v === m.id ? null : m.id))}
                  className="flex w-full items-center justify-between rounded-md px-2 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                >
                  {m.label}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                    className={clsx("transition-transform duration-200", mobileMenu === m.id && "rotate-180")}
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {mobileMenu === m.id && (
                  <div className="mb-1 ml-2 flex flex-col gap-0.5 border-l border-neutral-200 pl-3">
                    {m.id === "gst" && (
                      <>
                        <Link href="/gst-registration" className="rounded-md px-2 py-2 text-sm text-neutral-600" onClick={() => setOpen(false)}>GST Registration</Link>
                        <Link href="/gst-return-filing" className="rounded-md px-2 py-2 text-sm text-neutral-600" onClick={() => setOpen(false)}>GST Return Filing</Link>
                        <Link href="/gst-compliance" className="rounded-md px-2 py-2 text-sm text-neutral-600" onClick={() => setOpen(false)}>GST Compliance</Link>
                        <Link href="/itr-filing" className="rounded-md px-2 py-2 text-sm text-neutral-600" onClick={() => setOpen(false)}>ITR Filing</Link>
                      </>
                    )}
                    {m.id === "services" &&
                      serviceCategories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/services/${category.slug}`}
                          className="rounded-md px-2 py-2 text-sm text-neutral-600"
                          onClick={() => setOpen(false)}
                        >
                          {category.title}
                          <span className="ml-1.5 text-xs text-neutral-400">
                            {getServicesByCategory(category.id).length}
                          </span>
                        </Link>
                      ))}
                    {m.id === "tools" && (
                      <>
                        <Link href="/gst-tools" className="rounded-md px-2 py-2 text-sm text-neutral-600" onClick={() => setOpen(false)}>GST Tools</Link>
                        <Link href="/tax-tools" className="rounded-md px-2 py-2 text-sm text-neutral-600" onClick={() => setOpen(false)}>Income Tax Tools</Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}

            {plainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-2 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <a href={`tel:${siteConfig.phoneE164}`} className="rounded-md px-2 py-2 text-sm font-medium text-brand-700">
              {siteConfig.phoneDisplay}
            </a>
            <Link href={siteConfig.loginUrl} className="rounded-md px-2 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
              Login
            </Link>
            <div className="mt-2 px-2">
              <Link
                href="/gst-registration"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold-500 px-4 py-3 text-sm font-bold text-ink"
                onClick={() => setOpen(false)}
              >
                Talk to an Expert
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
