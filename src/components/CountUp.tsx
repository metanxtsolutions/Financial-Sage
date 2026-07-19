"use client";

import { useEffect, useRef, useState } from "react";

// Animates the leading integer in a label (e.g. "150+" counts 0..150 and keeps
// the "+" suffix; "40-50" counts the first number and keeps "-50" as a suffix).
export function CountUp({ label, className }: { label: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>(label.replace(/^\d+/, "0"));
  const match = label.match(/^(\d+)(.*)$/);

  useEffect(() => {
    const node = ref.current;
    if (!node || !match) return;

    const target = parseInt(match[1], 10);
    const suffix = match[2];
    let started = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const duration = 900;
          const start = performance.now();

          function tick(now: number) {
            const progress = Math.min(Math.max((now - start) / duration, 0), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(target * eased);
            setDisplay(`${value}${suffix}`);
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!match) {
    return (
      <span ref={ref} className={className}>
        {label}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
