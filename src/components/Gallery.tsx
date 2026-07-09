import type { Dictionary } from "@/i18n/get-dictionary";
import { abrilFatface, inter } from "@/lib/fonts";

import { GalleryCarousel } from "./GalleryCarousel";

type GalleryProps = {
  dict: Dictionary["gallery"];
};

const SLIDE_COUNT = 38;

export function Gallery({ dict }: GalleryProps) {
  return (
    <section id="galeria" className="overflow-hidden bg-black">
      <div className="w-full py-12 sm:py-14 lg:py-16">
        <header className="px-5 text-center sm:px-6 lg:px-10">
          <h2
            className={`${abrilFatface.className} text-[clamp(1.5rem,4.5vw,3rem)] font-normal leading-tight tracking-wide`}
          >
            <span className="text-[#B3B3B3]">{dict.heading.white}</span>
            <span className="text-[#0E7AEB]">{dict.heading.blue}</span>
          </h2>
          <p
            className={`${inter.className} mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#B3B3B3] sm:mt-5 sm:text-sm lg:text-base`}
          >
            {dict.subtitle}
          </p>
        </header>

        <div className="relative mt-8 w-full sm:mt-10 lg:mt-12">
          <GalleryCarousel imageAlt={dict.imageAlt} slideCount={SLIDE_COUNT} />
        </div>
      </div>
    </section>
  );
}
