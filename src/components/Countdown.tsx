"use client";

import { useEffect, useState } from "react";

import type { Dictionary } from "@/i18n/get-dictionary";

const EVENT_DATE = new Date("2026-11-07T11:00:00-03:00");

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type CountdownProps = {
  dict: Dictionary["countdown"];
};

function getTimeLeft(): TimeLeft {
  const diff = EVENT_DATE.getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function formatUnit(value: number, key: keyof TimeLeft): string {
  if (key === "days") {
    return String(value);
  }

  return String(value).padStart(2, "0");
}

export function Countdown({ dict }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  const units = [
    { key: "days" as const, label: dict.days },
    { key: "hours" as const, label: dict.hours },
    { key: "minutes" as const, label: dict.minutes },
    { key: "seconds" as const, label: dict.seconds },
  ];

  useEffect(() => {
    setTimeLeft(getTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
              {timeLeft ? formatUnit(timeLeft[key], key) : "--"}
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
