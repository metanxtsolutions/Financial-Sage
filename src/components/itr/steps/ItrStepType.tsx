"use client";

import { useState } from "react";
import type { ItrType } from "@/components/itr/ItrWizard";

const itrTypes: { type: ItrType; title: string; subtitle: string; points: string[] }[] = [
  {
    type: "ITR_1",
    title: "ITR-1",
    subtitle: "For Salaried Individuals",
    points: ["Salary Income", "One House Property", "Interest Income"],
  },
  {
    type: "ITR_2",
    title: "ITR-2",
    subtitle: "Salary, Capital Gains & More",
    points: ["Salary", "Capital Gains", "More than One House", "Foreign Assets"],
  },
  {
    type: "ITR_3",
    title: "ITR-3",
    subtitle: "Business & Professional Income",
    points: ["Business Income", "Professional Income", "Freelancers"],
  },
  {
    type: "ITR_4",
    title: "ITR-4",
    subtitle: "Presumptive Income",
    points: ["Presumptive Income", "Freelancers", "Small Businesses", "Professionals"],
  },
];

// Two yes/no questions, walked as a small decision tree - good enough for a
// quick nudge, not a substitute for the expert's actual recommendation
// (which the result copy says explicitly).
const FIRST_QUESTION = "Do you run a business or work as a freelancer/professional?";
const BUSINESS_QUESTION = "Is your income taxed on a presumptive basis (no detailed books of account)?";
const SALARY_QUESTION = "Do you have capital gains, more than one house property, or foreign assets?";

function HelpMeChoose({ onPick }: { onPick: (type: ItrType) => void }) {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  function answer(yes: boolean) {
    setAnswers((current) => [...current, yes]);
  }

  const isBusiness = answers[0];
  const recommendation: ItrType | null =
    answers.length < 2 ? null : isBusiness ? (answers[1] ? "ITR_4" : "ITR_3") : answers[1] ? "ITR_2" : "ITR_1";

  const currentQuestion = answers.length === 0 ? FIRST_QUESTION : isBusiness ? BUSINESS_QUESTION : SALARY_QUESTION;

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-4 w-full rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-4 text-center text-sm font-medium text-neutral-600 transition-colors hover:border-itr-green-500 hover:text-itr-green-600"
      >
        Not sure which one? <span className="font-semibold">Help me choose</span>
      </button>
    );
  }

  return (
    <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-5">
      {recommendation ? (
        <div className="text-center">
          <p className="text-sm text-neutral-500">Based on your answers, you likely need</p>
          <p className="mt-1 text-2xl font-extrabold text-itr-navy-500">{recommendation.replace("_", "-")}</p>
          <button
            type="button"
            onClick={() => onPick(recommendation as ItrType)}
            className="mt-4 w-full rounded-xl bg-itr-green-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-itr-green-600"
          >
            Select {recommendation.replace("_", "-")}
          </button>
          <p className="mt-3 text-xs text-neutral-400">
            This is a quick guide, not tax advice. Our expert confirms the right form after reviewing your details.
          </p>
        </div>
      ) : (
        <div>
          <p className="text-sm font-medium text-neutral-900">{currentQuestion}</p>
          <div className="mt-3 flex gap-3">
            <button
              type="button"
              onClick={() => answer(true)}
              className="flex-1 rounded-xl border border-neutral-200 py-2.5 text-sm font-semibold text-neutral-700 hover:border-itr-green-500 hover:text-itr-green-600"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => answer(false)}
              className="flex-1 rounded-xl border border-neutral-200 py-2.5 text-sm font-semibold text-neutral-700 hover:border-itr-green-500 hover:text-itr-green-600"
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function ItrStepType({
  selected,
  onSelect,
}: {
  selected: ItrType | null;
  onSelect: (type: ItrType) => void;
}) {
  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-itr-navy-500">Select Your ITR Type</h1>
      <p className="mt-1 text-sm text-neutral-500">Pick the one that matches your income sources.</p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {itrTypes.map((item) => (
          <div
            key={item.type}
            className={`rounded-2xl border-2 p-5 transition-colors ${
              selected === item.type ? "border-itr-green-500 bg-itr-green-50" : "border-neutral-200 bg-white"
            }`}
          >
            <div className="text-lg font-extrabold text-itr-navy-500">{item.title}</div>
            <div className="mt-0.5 text-sm text-neutral-500">{item.subtitle}</div>
            <ul className="mt-3 space-y-1">
              {item.points.map((p) => (
                <li key={p} className="text-sm text-neutral-700">
                  • {p}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => onSelect(item.type)}
              className="mt-4 w-full rounded-xl bg-itr-navy-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-itr-navy-700"
            >
              Select
            </button>
          </div>
        ))}
      </div>

      <HelpMeChoose onPick={onSelect} />
    </div>
  );
}
