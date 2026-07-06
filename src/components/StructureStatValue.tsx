"use client";

import { useEffect, useRef, useState } from "react";

type ParsedStatValue = {
  prefix: string;
  target: number;
  suffix: string;
  padStart: number;
};

function parseStatValue(value: string): ParsedStatValue | null {
  const match = value.match(/^(\D*?)(\d+)(\D*)$/);
  if (!match) {
    return null;
  }

  const [, prefix, numStr, suffix] = match;

  return {
    prefix,
    target: Number.parseInt(numStr, 10),
    suffix,
    padStart: numStr.length,
  };
}

function formatStatValue(
  count: number,
  { prefix, suffix, padStart }: ParsedStatValue,
): string {
  const number = padStart > 0 ? String(count).padStart(padStart, "0") : String(count);
  return `${prefix}${number}${suffix}`;
}

type StructureStatValueProps = {
  value: string;
  className?: string;
};

const DURATION_MS = 1800;

export function StructureStatValue({ value, className }: StructureStatValueProps) {
  const parsed = parseStatValue(value);
  const ref = useRef<HTMLParagraphElement>(null);
  const [displayValue, setDisplayValue] = useState(
    parsed ? formatStatValue(0, parsed) : value,
  );
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!parsed || !ref.current) {
      return;
    }

    const element = ref.current;

    const animate = () => {
      if (hasAnimatedRef.current) {
        return;
      }

      hasAnimatedRef.current = true;
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        setDisplayValue(value);
        return;
      }

      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - start) / DURATION_MS, 1);
        const eased = 1 - (1 - progress) ** 3;
        const current = Math.round(eased * parsed.target);
        setDisplayValue(formatStatValue(current, parsed));

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [parsed, value]);

  return (
    <p ref={ref} className={className}>
      {displayValue}
    </p>
  );
}
