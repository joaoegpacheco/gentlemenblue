import Image from "next/image";

type GalleryCarouselProps = {
  imageAlt: string;
  slideCount: number;
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

export function GalleryCarousel({ imageAlt, slideCount }: GalleryCarouselProps) {
  const slides = Array.from({ length: slideCount }, (_, index) => SLIDE_SIZES[index % SLIDE_SIZES.length]);

  return (
    <div className="flex snap-x snap-mandatory gap-2.5 overflow-x-auto scroll-smooth px-5 pb-2 sm:gap-4 sm:px-6 lg:gap-5 lg:px-10 2xl:gap-6 min-[2560px]:gap-8 min-[3840px]:gap-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {slides.map((size, index) => (
        <article
          key={index}
          className={`relative shrink-0 snap-start overflow-hidden rounded-lg ${SIZE_CLASS[size]}`}
        >
          <Image
            src={gallerySrc(index)}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 88vw, (max-width: 1024px) 72vw, 52vw"
            className="object-cover"
          />
        </article>
      ))}
    </div>
  );
}
