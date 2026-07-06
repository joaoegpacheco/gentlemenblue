"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type SponsorLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type SponsorsMarqueeProps = {
  logos: SponsorLogo[];
  itemCount?: number;
};

const DEFAULT_ITEM_COUNT = 16;
const AUTO_SCROLL_SPEED = 0.55;
const INTERACTION_PAUSE_MS = 2500;

function SponsorLogoSlot({
  src,
  alt,
  width,
  height,
}: SponsorLogo) {
  return (
    <div className="flex h-16 w-[140px] shrink-0 items-center justify-center px-3 sm:h-20 sm:w-[180px] lg:w-[200px]">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        className="max-h-full max-w-full object-contain"
      />
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
  logos,
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

  const sequence = Array.from({ length: itemCount }, (_, index) => {
    const logo = logos[index % logos.length];
    return { ...logo, id: `${logo.alt}-${index}` };
  });
  const loop = [...sequence, ...sequence];

  return (
    <div className="relative left-1/2 mt-10 w-screen max-w-none -translate-x-1/2 mask-[linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] lg:mt-12">
      <div
        ref={scrollerRef}
        className="sponsors-marquee-scroller overflow-x-auto overscroll-x-contain scroll-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex w-max gap-4 px-3 sm:gap-6 sm:px-6 lg:px-10">
          {loop.map((logo, position) => (
            <SponsorLogoSlot
              key={`${logo.id}-${position}`}
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
