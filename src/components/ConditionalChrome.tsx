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

  return (
    <>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
