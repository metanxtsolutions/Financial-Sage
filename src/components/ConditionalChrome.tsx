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
  if (pathname?.startsWith("/itr-filing")) return null;

  return (
    <>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
