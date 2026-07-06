"use client";

import { useEffect, useState } from "react";

import type { Dictionary } from "@/i18n/get-dictionary";
import { getCountdownSnapshot, type TimeLeft } from "@/lib/countdown";

type CountdownProps = {
  dict: Dictionary["countdown"];
  initialTimeLeft: TimeLeft;
};

function formatUnit(value: number, key: keyof TimeLeft): string {
  if (key === "days") {
    return String(value);
  }

  return String(value).padStart(2, "0");
}

export function Countdown({ dict, initialTimeLeft }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getCountdownSnapshot());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const units = [
    { key: "days" as const, label: dict.days },
    { key: "hours" as const, label: dict.hours },
    { key: "minutes" as const, label: dict.minutes },
    { key: "seconds" as const, label: dict.seconds },
  ];

  return (
    <div className="w-full">
      <p className="mb-2 font-bebas text-[10px] tracking-[0.15em] text-white sm:text-xs">
        {dict.label}
      </p>
      <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
        {units.map(({ key, label }) => (
          <div
            key={key}
            className="flex h-[clamp(3.25rem,9vh,4.5rem)] flex-col items-center justify-center rounded-sm border border-white/50 bg-black/20 px-1.5 py-2 sm:px-2"
          >
            <span className="font-bebas text-xl leading-none text-white sm:text-2xl lg:text-3xl">
              {formatUnit(timeLeft[key], key)}
            </span>
            <span className="mt-1 font-montserrat text-[8px] tracking-wider text-brand-gray sm:text-[9px]">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
