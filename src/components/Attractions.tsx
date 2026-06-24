import Image from "next/image";

import type { Dictionary } from "@/i18n/get-dictionary";
import { assets } from "@/lib/assets";
import { abrilFatface, inter } from "@/lib/fonts";

const ICONS = {
  grill: assets.icons.grill,
  guitar: assets.icons.guitar,
  podcast: assets.icons.podcast,
  speaker: assets.icons.speaker,
  motor: assets.icons.motor,
  exhibitor: assets.icons.exhibitor,
} as const;

type AttractionIcon = keyof typeof ICONS;

type AttractionsProps = {
  dict: Dictionary["attractions"];
};

export function Attractions({ dict }: AttractionsProps) {
  return (
    <section id="atracoes" className="bg-black">
      <div className="mx-auto w-full max-w-[1440px] px-3 py-6 lg:px-5 lg:py-8">
        <header className="text-center">
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <Image
              src={assets.icons.star}
              alt=""
              width={126}
              height={126}
              aria-hidden
              className="h-10 w-10 shrink-0 sm:h-12 sm:w-12 lg:h-14 lg:w-14"
            />
            <h2
              className={`${abrilFatface.className} text-[clamp(2rem,5vw,3.5rem)] font-normal tracking-wide text-white`}
            >
              {dict.title}
            </h2>
            <Image
              src={assets.icons.star}
              alt=""
              width={126}
              height={126}
              aria-hidden
              className="h-10 w-10 shrink-0 sm:h-12 sm:w-12 lg:h-14 lg:w-14"
            />
          </div>
          <p
            className={`${inter.className} mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-white sm:mt-5 sm:text-sm lg:text-base`}
          >
            {dict.subtitle}
          </p>
        </header>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:mt-12 lg:grid-cols-6 lg:gap-3">
          {dict.items.map((item) => {
            const iconSrc = ICONS[item.icon as AttractionIcon];

            return (
              <article
                key={item.icon}
                className="flex flex-col overflow-hidden rounded-sm border border-brand-gray/50"
              >
                <div
                  className="aspect-[4/3] bg-[#0a1628] bg-linear-to-br from-brand-blue/20 via-[#0a1628] to-black"
                  aria-hidden
                />

                <div className={`${inter.className} flex flex-1 flex-col px-3 pb-4 pt-4 sm:px-4`}>
                  <h3 className="font-bebas text-sm leading-tight tracking-[0.06em] sm:text-base">
                    <span className="block text-white">{item.titleLine1}</span>
                    <span className="block text-brand-blue">{item.titleLine2}</span>
                  </h3>

                  <p className="mt-2 text-[10px] leading-snug text-white/90 sm:text-xs">
                    {item.description}
                  </p>

                  <div className="mt-4 flex flex-1 items-end justify-center sm:mt-5">
                    <Image
                      src={iconSrc}
                      alt={item.iconAlt}
                      width={260}
                      height={310}
                      className="h-16 w-auto object-contain sm:h-20 lg:h-[5.5rem]"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
