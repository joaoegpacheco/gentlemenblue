import Link from "next/link";

import type { Dictionary } from "@/i18n/get-dictionary";
import { abrilFatface, inter } from "@/lib/fonts";

import { GalleryCarousel } from "./GalleryCarousel";

type GalleryProps = {
  dict: Dictionary["gallery"];
};

const SLIDE_COUNT = 8;

export function Gallery({ dict }: GalleryProps) {
  return (
    <section id="galeria" className="overflow-hidden bg-black">
      <div className="mx-auto w-full max-w-[1440px] px-3 pb-5 sm:px-6 lg:px-10 lg:pb-10">
        <header className="text-center">
          <h2
            className={`${abrilFatface.className} text-[clamp(1.5rem,4.5vw,3rem)] font-normal leading-tight tracking-wide`}
          >
            <span className="text-white">{dict.heading.white}</span>
            <span className="text-brand-blue">{dict.heading.blue}</span>
          </h2>
          <p
            className={`${inter.className} mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-white sm:mt-5 sm:text-sm lg:text-base`}
          >
            {dict.subtitle}
          </p>
        </header>

        <div className="relative mt-10 lg:mt-12">
          <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2 px-3 sm:px-6 lg:px-10">
            <GalleryCarousel imageAlt={dict.imageAlt} slideCount={SLIDE_COUNT} />
          </div>
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <Link
            href={dict.viewFullGalleryHref}
            className="inline-flex items-center justify-center rounded-full bg-brand-blue px-8 py-2.5 font-bebas text-sm tracking-[0.12em] text-white transition-opacity hover:opacity-90 sm:px-10 sm:py-3 sm:text-base"
          >
            {dict.viewFullGallery}
          </Link>
        </div>
      </div>
    </section>
  );
}
