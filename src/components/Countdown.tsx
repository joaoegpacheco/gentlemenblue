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
      <p className="mb-1.5 font-bebas text-[10px] tracking-[0.15em] text-white sm:mb-2 sm:text-xs 2xl:mb-3 2xl:text-base min-[2560px]:mb-4 min-[2560px]:text-xl min-[3840px]:text-2xl">
        {dict.label}
      </p>
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5 2xl:gap-3 min-[2560px]:gap-4">
        {units.map(({ key, label }) => (
          <div
            key={key}
            className="flex h-[clamp(2.75rem,8vh,4.5rem)] flex-col items-center justify-center rounded-sm border border-white/50 bg-black/20 px-1 py-1.5 sm:px-2 sm:py-2 2xl:h-24 min-[2560px]:h-32 min-[3840px]:h-40"
          >
            <span className="font-bebas text-lg leading-none text-white sm:text-2xl lg:text-3xl 2xl:text-5xl min-[2560px]:text-6xl min-[3840px]:text-7xl">
              {formatUnit(timeLeft[key], key)}
            </span>
            <span className="mt-0.5 font-montserrat text-[7px] tracking-wider text-brand-gray sm:mt-1 sm:text-[9px] 2xl:mt-1.5 2xl:text-sm min-[2560px]:text-base min-[3840px]:text-lg">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
