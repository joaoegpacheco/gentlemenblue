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
    <div className="w-full max-w-md lg:max-w-lg">
      <p className="mb-2 font-bebas text-[10px] tracking-[0.15em] text-white sm:mb-3 sm:text-xs lg:text-sm">
        {dict.label}
      </p>
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {units.map(({ key, label }) => (
          <div
            key={key}
            className="flex flex-col items-center justify-center rounded-sm border border-brand-gray/60 bg-black/25 px-2 py-2.5 sm:px-3 sm:py-3 lg:px-4 lg:py-4"
          >
            <span className="font-bebas text-xl leading-none text-white sm:text-3xl lg:text-4xl">
              {formatUnit(timeLeft[key], key)}
            </span>
            <span className="mt-1 font-montserrat text-[9px] tracking-wider text-brand-gray sm:text-[10px] lg:text-xs">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
