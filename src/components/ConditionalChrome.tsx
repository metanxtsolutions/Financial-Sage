"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { MobileStickyCta } from "@/components/MobileStickyCta";

// Keeps Footer and MobileStickyCta as plain server components while still
// hiding them during the focused ITR wizard flow (see Header.tsx and
// MainContent.tsx for the same gate applied to the header/main padding).
export function ConditionalChrome() {
  const pathname = usePathname();
  if (pathname?.startsWith("/itr-filing/apply")) return null;

  return (
    <>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
