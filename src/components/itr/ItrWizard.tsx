"use client";

import { useEffect, useState } from "react";
import { ItrProgressBar } from "@/components/itr/ItrProgressBar";
import { ItrStepType } from "@/components/itr/steps/ItrStepType";
import { ItrStepDetails } from "@/components/itr/steps/ItrStepDetails";
import { ItrStepPayment } from "@/components/itr/steps/ItrStepPayment";
import { ItrStepUpload } from "@/components/itr/steps/ItrStepUpload";
import { ItrStepDone } from "@/components/itr/steps/ItrStepDone";

export type ItrType = "ITR_1" | "ITR_2" | "ITR_3" | "ITR_4";

export interface ItrWizardState {
  step: 1 | 2 | 3 | 4 | 5;
  itrType: ItrType | null;
  name: string;
  phone: string;
  email: string;
  pan: string;
  state: string;
  applicationId: string | null;
  paymentFailed?: boolean;
}

const STORAGE_KEY = "itr-wizard-progress";

const initialState: ItrWizardState = {
  step: 1,
  itrType: null,
  name: "",
  phone: "",
  email: "",
  pan: "",
  state: "",
  applicationId: null,
};

// Reads any saved progress synchronously, then reconciles it against a
// return trip from PayU's hosted checkout (a full-page redirect, so this
// component remounts fresh - there's no other hook to catch that return).
// Safe as a lazy useState initializer only because this component is loaded
// with { ssr: false } (see src/app/itr-filing/apply/page.tsx) - it never
// runs on the server, so there's no server/client markup to mismatch, and
// reading window.location here is a one-time client bootstrap, not a render
// side effect that needs an effect of its own.
function restoreWizardState(): ItrWizardState {
  let base: ItrWizardState = initialState;
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) base = JSON.parse(saved);
  } catch {
    // Corrupt/unavailable storage - just start fresh.
  }

  try {
    const params = new URLSearchParams(window.location.search);
    const payuStatus = params.get("payu");
    const returnedAppId = params.get("applicationId");

    if (payuStatus && (!returnedAppId || base.applicationId === returnedAppId)) {
      window.history.replaceState(null, "", window.location.pathname);
      if (payuStatus === "success") {
        return { ...base, step: 4, paymentFailed: false };
      }
      return { ...base, step: 3, paymentFailed: true };
    }
  } catch {
    // URL unavailable - fall through with whatever was saved.
  }

  return base;
}

export function ItrWizard() {
  const [wizard, setWizard] = useState<ItrWizardState>(restoreWizardState);

  // Auto-save progress: a user who accidentally closes the tab mid-flow
  // (before payment) picks up where they left off instead of starting over.
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(wizard));
    } catch {
      // Storage full or disabled - auto-save is a nicety, not required.
    }
  }, [wizard]);

  function patch(update: Partial<ItrWizardState>) {
    setWizard((current) => ({ ...current, ...update }));
  }

  function goToStep(step: ItrWizardState["step"]) {
    patch({ step });
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:py-12">
      <div className="mb-8">
        <ItrProgressBar current={wizard.step} />
      </div>

      {wizard.step === 1 && (
        <ItrStepType
          selected={wizard.itrType}
          onSelect={(itrType) => patch({ itrType, step: 2 })}
        />
      )}

      {wizard.step === 2 && wizard.itrType && (
        <ItrStepDetails
          itrType={wizard.itrType}
          initial={{ name: wizard.name, phone: wizard.phone, email: wizard.email, pan: wizard.pan, state: wizard.state }}
          onBack={() => goToStep(1)}
          onContinue={(details, applicationId) => patch({ ...details, applicationId, step: 3 })}
        />
      )}

      {wizard.step === 3 && wizard.applicationId && (
        <ItrStepPayment
          applicationId={wizard.applicationId}
          name={wizard.name}
          email={wizard.email}
          phone={wizard.phone}
          paymentFailed={wizard.paymentFailed}
        />
      )}

      {wizard.step === 4 && wizard.applicationId && wizard.itrType && (
        <ItrStepUpload applicationId={wizard.applicationId} itrType={wizard.itrType} onDone={() => goToStep(5)} />
      )}

      {wizard.step === 5 && wizard.applicationId && (
        <ItrStepDone
          applicationId={wizard.applicationId}
          onExit={() => {
            try {
              sessionStorage.removeItem(STORAGE_KEY);
            } catch {
              // Nothing to clean up if storage isn't available.
            }
          }}
        />
      )}
    </div>
  );
}
