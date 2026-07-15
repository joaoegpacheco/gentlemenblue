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
      <p className="mb-[clamp(0.4rem,1vh,1.25rem)] font-bebas text-[clamp(0.75rem,0.6vw+0.55vh,1.875rem)] tracking-[0.15em] text-white">
        {dict.label}
      </p>
      <div className="grid grid-cols-4 gap-[clamp(0.4rem,1vw,1.25rem)]">
        {units.map(({ key, label }) => (
          <div
            key={key}
            className="flex h-[clamp(2.75rem,8.5vh,12rem)] flex-col items-center justify-center rounded-sm border border-white/50 bg-black/20 px-1 py-1 sm:px-2 [@media(max-height:640px)]:h-[2.5rem]"
          >
            <span className="font-bebas text-[clamp(1.25rem,1.6vw+1.6vh,5.5rem)] leading-none text-white">
              {formatUnit(timeLeft[key], key)}
            </span>
            <span className="mt-0.5 font-montserrat text-[clamp(0.45rem,0.4vw+0.35vh,1.35rem)] tracking-wider text-brand-gray sm:mt-1">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
