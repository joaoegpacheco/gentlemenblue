"use client";

import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { Attractions } from "@/components/Attractions";
import { Structure } from "@/components/Structure";
import type { Dictionary } from "@/i18n/get-dictionary";

type AttractionsStructureScrollProps = {
  attractionsDict: Dictionary["attractions"];
  structureDict: Dictionary["structure"];
};

const OVERLAP_MOBILE_VH = 12;
const OVERLAP_DESKTOP_VH = 40;

export function AttractionsStructureScroll({
  attractionsDict,
  structureDict,
}: AttractionsStructureScrollProps) {
  const structureRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [overlapVh, setOverlapVh] = useState(OVERLAP_MOBILE_VH);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const sync = () => {
      setOverlapVh(media.matches ? OVERLAP_DESKTOP_VH : OVERLAP_MOBILE_VH);
    };

    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const { scrollYProgress } = useScroll({
    target: structureRef,
    offset: ["start end", "start 0.12"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    [`${overlapVh}vh`, `${overlapVh}vh`, "0vh"],
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
              : { y, marginTop: `-${overlapVh}vh` }
          }
          className="relative z-10 shadow-[0_-32px_64px_rgba(0,0,0,0.55)]"
        >
          <Structure dict={structureDict} />
        </m.div>
      </div>
    </LazyMotion>
  );
}
