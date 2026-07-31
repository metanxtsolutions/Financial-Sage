"use client";

import dynamic from "next/dynamic";

// Client-only: this is a purely interactive, noindex flow (step state, file
// uploads, the Razorpay SDK) with no SEO value in server-rendering it, and
// skipping SSR here means the sessionStorage-restored step never has to
// reconcile against a mismatched server-rendered version. `ssr: false` is
// only allowed inside a Client Component, hence this thin wrapper - the page
// itself stays a Server Component so it can export metadata.
const ItrWizard = dynamic(() => import("@/components/itr/ItrWizard").then((m) => m.ItrWizard), {
  ssr: false,
});

export function ItrWizardLoader() {
  return <ItrWizard />;
}
