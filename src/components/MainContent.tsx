"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import type { ReactNode } from "react";

export function MainContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // The ITR wizard hides the fixed Header (see Header.tsx), so it doesn't
  // need the pt-16 that compensates for the header's height elsewhere.
  const isItrWizard = pathname?.startsWith("/itr-filing/apply");

  return (
    <main id="main-content" className={clsx("flex-1", !isItrWizard && "pt-16")}>
      {children}
    </main>
  );
}
