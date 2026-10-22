"use client";

import dynamic from "next/dynamic";

// Client-only for the same reason as ItrWizardLoader: the flow restores its
// step from sessionStorage and the PayU return URL, which only exist in the
// browser, and a noindex checkout gains nothing from server rendering.
const DscOrderFlow = dynamic(() => import("@/components/dsc/DscOrderFlow").then((m) => m.DscOrderFlow), {
  ssr: false,
});

export function DscOrderLoader() {
  return <DscOrderFlow />;
}
