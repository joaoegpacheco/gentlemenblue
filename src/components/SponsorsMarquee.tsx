"use client";

import { useEffect, useRef } from "react";

import { inter } from "@/lib/fonts";

type SponsorsMarqueeProps = {
  label: string;
  itemCount?: number;
};

const DEFAULT_ITEM_COUNT = 16;
const AUTO_SCROLL_SPEED = 0.55;
const INTERACTION_PAUSE_MS = 2500;

function SponsorLogoSlot({ label }: { label: string }) {
  return (
    <div
      className={`${inter.className} flex h-16 w-[140px] shrink-0 items-center justify-center rounded-sm border border-white/15 px-3 py-4 text-center text-[10px] font-semibold uppercase tracking-[0.08em] text-white/70 sm:h-20 sm:w-[180px] sm:text-xs lg:w-[200px]`}
    >
      {label}
    </div>
  );
}

function normalizeScrollLoop(scroller: HTMLDivElement) {
  const loopWidth = scroller.scrollWidth / 2;
  if (loopWidth <= 0) return;

  if (scroller.scrollLeft >= loopWidth) {
    scroller.scrollLeft -= loopWidth;
  } else if (scroller.scrollLeft < 0) {
    scroller.scrollLeft += loopWidth;
  }
}

export function SponsorsMarquee({
  label,
  itemCount = DEFAULT_ITEM_COUNT,
}: SponsorsMarqueeProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);
  const resumeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let animationFrame = 0;

    const pauseAutoScroll = () => {
      isPausedRef.current = true;

      if (resumeTimeoutRef.current !== null) {
        window.clearTimeout(resumeTimeoutRef.current);
      }

      resumeTimeoutRef.current = window.setTimeout(() => {
        isPausedRef.current = false;
      }, INTERACTION_PAUSE_MS);
    };

    const tick = () => {
      if (!isPausedRef.current && !prefersReducedMotion) {
        scroller.scrollLeft += AUTO_SCROLL_SPEED;
        normalizeScrollLoop(scroller);
      }

      animationFrame = window.requestAnimationFrame(tick);
    };

    const onScrollerScroll = () => {
      normalizeScrollLoop(scroller);
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
        pauseAutoScroll();
        return;
      }

      scroller.scrollLeft += event.deltaY;
      normalizeScrollLoop(scroller);
      pauseAutoScroll();
      event.preventDefault();
    };

    const onPointerDown = () => pauseAutoScroll();
    const onTouchStart = () => pauseAutoScroll();

    animationFrame = window.requestAnimationFrame(tick);
    scroller.addEventListener("scroll", onScrollerScroll, { passive: true });
    scroller.addEventListener("wheel", onWheel, { passive: false });
    scroller.addEventListener("pointerdown", onPointerDown);
    scroller.addEventListener("touchstart", onTouchStart, { passive: true });

    return () => {
      window.cancelAnimationFrame(animationFrame);

      if (resumeTimeoutRef.current !== null) {
        window.clearTimeout(resumeTimeoutRef.current);
      }

      scroller.removeEventListener("scroll", onScrollerScroll);
      scroller.removeEventListener("wheel", onWheel);
      scroller.removeEventListener("pointerdown", onPointerDown);
      scroller.removeEventListener("touchstart", onTouchStart);
    };
  }, []);

  const indices = Array.from({ length: itemCount }, (_, index) => index);
  const loop = [...indices, ...indices];

  return (
    <div className="relative left-1/2 mt-10 w-screen max-w-none -translate-x-1/2 mask-[linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] lg:mt-12">
      <div
        ref={scrollerRef}
        className="sponsors-marquee-scroller overflow-x-auto overscroll-x-contain scroll-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex w-max gap-4 px-3 sm:gap-6 sm:px-6 lg:px-10">
          {loop.map((index, position) => (
            <SponsorLogoSlot key={`${index}-${position}`} label={label} />
          ))}
        </div>
      </div>
    </div>
  );
}
