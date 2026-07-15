"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type GalleryCarouselProps = {
  imageAlt: string;
  slideCount: number;
  previousLabel: string;
  nextLabel: string;
  closeLabel: string;
};

const SLIDE_SIZES = ["lg", "md", "sm", "lg", "sm", "sm", "sm", "lg"] as const;

const SIZE_CLASS: Record<(typeof SLIDE_SIZES)[number], string> = {
  lg: "h-[42vw] max-h-[520px] w-[88vw] sm:h-[38vw] sm:w-[72vw] lg:h-[min(42vw,520px)] lg:max-h-none lg:w-[52vw] 2xl:h-[min(38vw,640px)] 2xl:w-[48vw] min-[2560px]:h-[min(36vw,780px)] min-[2560px]:w-[44vw] min-[3840px]:h-[min(34vw,980px)] min-[3840px]:w-[40vw]",
  md: "h-[42vw] max-h-[520px] w-[72vw] sm:h-[38vw] sm:w-[48vw] lg:h-[min(42vw,520px)] lg:max-h-none lg:w-[34vw] 2xl:h-[min(38vw,640px)] 2xl:w-[32vw] min-[2560px]:h-[min(36vw,780px)] min-[2560px]:w-[30vw] min-[3840px]:h-[min(34vw,980px)] min-[3840px]:w-[28vw]",
  sm: "h-[42vw] max-h-[520px] w-[72vw] sm:h-[38vw] sm:w-[50vw] lg:h-[min(42vw,520px)] lg:max-h-none lg:w-[36vw] 2xl:h-[min(38vw,640px)] 2xl:w-[34vw] min-[2560px]:h-[min(36vw,780px)] min-[2560px]:w-[32vw] min-[3840px]:h-[min(34vw,980px)] min-[3840px]:w-[30vw]",
};

function gallerySrc(index: number) {
  return `/images/gentlemenblueanteriores/gallery-${String(index + 1).padStart(2, "0")}.webp`;
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-5 w-5 sm:h-6 sm:w-6">
      <path
        d="M15 5L8 12L15 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-5 w-5 sm:h-6 sm:w-6">
      <path
        d="M9 5L16 12L9 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GalleryCarousel({
  imageAlt,
  slideCount,
  previousLabel,
  nextLabel,
  closeLabel,
}: GalleryCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isJumpingRef = useRef(false);
  const setWidthRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const slides = Array.from({ length: slideCount }, (_, index) => ({
    index,
    size: SLIDE_SIZES[index % SLIDE_SIZES.length],
  }));
  const loopSlides = [...slides, ...slides, ...slides];

  const measureSetWidth = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return 0;

    const items = scroller.querySelectorAll<HTMLElement>("[data-gallery-slide]");
    if (items.length < slideCount * 2) return 0;

    // Distance between the start of copy 0 and copy 1 — ignores padding.
    return items[slideCount].offsetLeft - items[0].offsetLeft;
  }, [slideCount]);

  const normalizeLoop = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || isJumpingRef.current) return;

    const setWidth = setWidthRef.current || measureSetWidth();
    if (setWidth <= 0) return;
    setWidthRef.current = setWidth;

    // Stay inside the middle copy; jump by full sets when leaving it.
    let nextLeft = scroller.scrollLeft;
    let guard = 0;
    while (nextLeft < setWidth * 0.5 && guard < 3) {
      nextLeft += setWidth;
      guard += 1;
    }
    while (nextLeft >= setWidth * 1.5 && guard < 6) {
      nextLeft -= setWidth;
      guard += 1;
    }

    if (Math.abs(nextLeft - scroller.scrollLeft) < 1) return;

    isJumpingRef.current = true;
    scroller.scrollLeft = nextLeft;
    requestAnimationFrame(() => {
      isJumpingRef.current = false;
    });
  }, [measureSetWidth]);

  const scrollByDirection = useCallback(
    (direction: -1 | 1) => {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      // Settle into the middle set before choosing the next slide.
      normalizeLoop();

      const items = Array.from(
        scroller.querySelectorAll<HTMLElement>("[data-gallery-slide]"),
      );
      if (items.length === 0) return;

      const viewportCenter = scroller.scrollLeft + scroller.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      items.forEach((item, index) => {
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const distance = Math.abs(itemCenter - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      const targetIndex = Math.min(
        Math.max(closestIndex + direction, 0),
        items.length - 1,
      );
      const target = items[targetIndex];
      if (!target) return;

      const left =
        target.offsetLeft - (scroller.clientWidth - target.offsetWidth) / 2;

      scroller.scrollTo({ left, behavior: "smooth" });
    },
    [normalizeLoop],
  );

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? current : (current - 1 + slideCount) % slideCount,
    );
  }, [slideCount]);

  const showNext = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? current : (current + 1) % slideCount,
    );
  }, [slideCount]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let scrollEndTimer = 0;

    const placeInMiddle = () => {
      const setWidth = measureSetWidth();
      if (setWidth <= 0) return;
      setWidthRef.current = setWidth;
      isJumpingRef.current = true;
      scroller.scrollLeft = setWidth;
      requestAnimationFrame(() => {
        isJumpingRef.current = false;
      });
    };

    placeInMiddle();

    // Normalize only after scrolling settles — mid-scroll jumps fight
    // smooth scrolling and cause the begin/end bounce loop.
    const onScroll = () => {
      if (isJumpingRef.current) return;
      window.clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(() => {
        normalizeLoop();
      }, 150);
    };

    const onScrollEnd = () => {
      window.clearTimeout(scrollEndTimer);
      normalizeLoop();
    };

    const onResize = () => {
      const previousSetWidth = setWidthRef.current;
      const nextSetWidth = measureSetWidth();
      if (nextSetWidth <= 0) return;

      if (previousSetWidth > 0) {
        const relative = scroller.scrollLeft / previousSetWidth;
        isJumpingRef.current = true;
        setWidthRef.current = nextSetWidth;
        scroller.scrollLeft = relative * nextSetWidth;
        requestAnimationFrame(() => {
          isJumpingRef.current = false;
          normalizeLoop();
        });
        return;
      }

      placeInMiddle();
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });
    scroller.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(scrollEndTimer);
      scroller.removeEventListener("scroll", onScroll);
      scroller.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("resize", onResize);
    };
  }, [measureSetWidth, normalizeLoop]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        showPrevious();
      } else if (event.key === "ArrowRight") {
        showNext();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, closeLightbox, showNext, showPrevious]);

  return (
    <>
      <div className="relative w-full">
        <div
          ref={scrollerRef}
          className="overflow-x-auto overscroll-x-contain pb-2 scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div
            ref={trackRef}
            className="flex w-max gap-2.5 px-5 sm:gap-4 sm:px-6 lg:gap-5 lg:px-10 2xl:gap-6 min-[2560px]:gap-8 min-[2560px]:px-10 min-[3840px]:gap-10"
          >
            {loopSlides.map((slide, position) => (
              <button
                key={`${slide.index}-${position}`}
                type="button"
                data-gallery-slide
                data-gallery-index={slide.index}
                onClick={() => openLightbox(slide.index)}
                className={`relative shrink-0 overflow-hidden rounded-lg text-left transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E7AEB] ${SIZE_CLASS[slide.size]}`}
                aria-label={`${imageAlt} ${slide.index + 1}`}
              >
                <Image
                  src={gallerySrc(slide.index)}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 640px) 88vw, (max-width: 1024px) 72vw, 52vw"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => scrollByDirection(-1)}
          aria-label={previousLabel}
          className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm transition-colors hover:bg-black/90 sm:left-4 sm:h-12 sm:w-12 lg:left-6"
        >
          <ChevronLeftIcon />
        </button>
        <button
          type="button"
          onClick={() => scrollByDirection(1)}
          aria-label={nextLabel}
          className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-sm transition-colors hover:bg-black/90 sm:right-4 sm:h-12 sm:w-12 lg:right-6"
        >
          <ChevronRightIcon />
        </button>
      </div>

      {activeIndex !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 sm:p-6"
          onClick={closeLightbox}
          role="presentation"
        >
          <button
            type="button"
            onClick={closeLightbox}
            aria-label={closeLabel}
            className="absolute right-4 top-4 z-20 text-sm font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-80 sm:right-6 sm:top-6"
          >
            {closeLabel}
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            aria-label={previousLabel}
            className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6 sm:h-12 sm:w-12"
          >
            <ChevronLeftIcon />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label={nextLabel}
            className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6 sm:h-12 sm:w-12"
          >
            <ChevronRightIcon />
          </button>

          <div
            className="relative flex h-[min(80vh,900px)] w-full max-w-5xl items-center justify-center"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${imageAlt} ${activeIndex + 1}`}
          >
            <Image
              src={gallerySrc(activeIndex)}
              alt={`${imageAlt} ${activeIndex + 1}`}
              width={1600}
              height={1200}
              className="max-h-[min(80vh,900px)] w-auto max-w-full rounded-sm object-contain"
              sizes="(max-width: 1024px) 92vw, 1024px"
              priority
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
