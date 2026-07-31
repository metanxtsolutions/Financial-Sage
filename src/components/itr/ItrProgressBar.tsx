const steps = ["ITR Type", "Your Details", "Payment", "Documents", "Done"];

export function ItrProgressBar({ current }: { current: number }) {
  return (
    <div className="flex items-center">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isDone = stepNum < current;
        const isActive = stepNum === current;
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300 ${
                  isDone
                    ? "bg-itr-green-500 text-white"
                    : isActive
                      ? "bg-itr-navy-500 text-white"
                      : "bg-neutral-100 text-neutral-400"
                }`}
              >
                {isDone ? "✓" : stepNum}
              </div>
              <span
                className={`hidden text-xs font-medium sm:block ${
                  isActive ? "text-itr-navy-500" : "text-neutral-400"
                }`}
              >
                {label}
              </span>
            </div>
            {stepNum < steps.length && (
              <div
                className={`mx-2 h-0.5 flex-1 rounded-full transition-colors duration-300 ${
                  isDone ? "bg-itr-green-500" : "bg-neutral-100"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
