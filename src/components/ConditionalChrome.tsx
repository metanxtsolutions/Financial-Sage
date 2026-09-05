"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { MobileStickyCta } from "@/components/MobileStickyCta";

// Keeps Footer and MobileStickyCta as plain server components while still
// hiding them on the ITR landing page and wizard flow (see Header.tsx and
// MainContent.tsx, which keep the header on the landing page but still gate
// it off during the wizard itself).
export function ConditionalChrome() {
  const pathname = usePathname();
  // Hidden on the ITR landing page and throughout the wizard, but NOT on the
  // /itr-filing/[state]/[city] pages - those are ordinary SEO pages and need
  // the footer's internal links.
  const isItrLanding = pathname === "/itr-filing";
  const isItrWizard = pathname?.startsWith("/itr-filing/apply");
  if (isItrLanding || isItrWizard) return null;

  // On mobile the sticky bar is the most visible call to action on the page,
  // and "Talk to a GST Expert" is wrong on the 80-odd non-GST service pages.
  // GST paths keep the original wording; everything else gets a neutral one.
  const isGstContext =
    pathname === "/" ||
    pathname?.startsWith("/gst-") ||
    pathname?.startsWith("/other-services/gst-") ||
    pathname === "/services/specialist-gst";

  const cta = isGstContext
    ? { label: "Talk to a GST Expert", href: "/gst-registration" }
    : { label: "Talk to an Expert", href: "/contact" };

  return (
    <>
      <Footer />
      <MobileStickyCta label={cta.label} href={cta.href} />
    </>
  );
}
