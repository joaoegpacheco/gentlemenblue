"use client";

import Image from "next/image";

type GalleryCarouselProps = {
  imageAlt: string;
  slideCount: number;
};

const SLIDE_SIZES = ["lg", "md", "sm", "lg", "sm", "sm", "sm", "lg"] as const;

const SIZE_CLASS: Record<(typeof SLIDE_SIZES)[number], string> = {
  lg: "h-[280px] w-[85vw] sm:h-[340px] sm:w-[min(749px,72vw)] lg:h-[400px] lg:w-[749px]",
  md: "h-[280px] w-[72vw] sm:h-[340px] sm:w-[478px] lg:h-[400px] lg:w-[478px]",
  sm: "h-[280px] w-[72vw] sm:h-[340px] sm:w-[498px] lg:h-[400px] lg:w-[498px]",
};

export function GalleryCarousel({ imageAlt, slideCount }: GalleryCarouselProps) {
  const slides = Array.from({ length: slideCount }, (_, index) => SLIDE_SIZES[index % SLIDE_SIZES.length]);

  return (
    <div
      className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {slides.map((size, index) => (
        <article
          key={index}
          className={`relative shrink-0 snap-start overflow-hidden rounded-lg ${SIZE_CLASS[size]}`}
        >
          <Image
            src="/images/gallery-placeholder.webp"
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 85vw, 749px"
            className="object-cover"
          />
        </article>
      ))}
    </div>
  );
}
