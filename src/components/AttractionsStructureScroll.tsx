"use client";

import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import { Attractions } from "@/components/Attractions";
import { Structure } from "@/components/Structure";
import type { Dictionary } from "@/i18n/get-dictionary";

type AttractionsStructureScrollProps = {
  attractionsDict: Dictionary["attractions"];
  structureDict: Dictionary["structure"];
};

/** Quanto Structure sobrepõe Attractions ao final da animação. */
const STRUCTURE_OVERLAP_VH = 40;

export function AttractionsStructureScroll({
  attractionsDict,
  structureDict,
}: AttractionsStructureScrollProps) {
  const structureRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: structureRef,
    offset: ["start end", "start 0.12"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    [`${STRUCTURE_OVERLAP_VH}vh`, `${STRUCTURE_OVERLAP_VH}vh`, "0vh"],
  );

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative">
        <div className="relative z-0">
          <Attractions dict={attractionsDict} />
        </div>

        <m.div
          ref={structureRef}
          style={
            prefersReducedMotion
              ? undefined
              : { y, marginTop: `-${STRUCTURE_OVERLAP_VH}vh` }
          }
          className="relative z-10 shadow-[0_-32px_64px_rgba(0,0,0,0.55)]"
        >
          <Structure dict={structureDict} />
        </m.div>
      </div>
    </LazyMotion>
  );
}
