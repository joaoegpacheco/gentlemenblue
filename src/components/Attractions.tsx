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

const PHOTOS = {
  grill: assets.images.attractionChurrasco,
  guitar: assets.images.attractionBandas,
  podcast: assets.images.attractionPodcast,
  speaker: assets.images.attractionPalestras,
  motor: assets.images.attractionHarley,
  exhibitor: assets.images.attractionExpositores,
} as const;

type AttractionIcon = keyof typeof ICONS;

type AttractionsProps = {
  dict: Dictionary["attractions"];
};

function AttractionCard({
  item,
  iconSrc,
  photoSrc,
}: {
  item: Dictionary["attractions"]["items"][number];
  iconSrc: (typeof ICONS)[AttractionIcon];
  photoSrc: (typeof PHOTOS)[AttractionIcon];
}) {
  return (
    <article className="attraction-neon-border relative flex aspect-[568/1024] flex-col rounded-sm bg-black">
      <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
        <Image
          src={photoSrc}
          alt=""
          fill
          sizes="(max-width: 768px) 50vw, 16vw"
          className="object-cover object-top"
          aria-hidden
        />
      </div>

      <div
        className={`${inter.className} relative z-10 flex flex-1 flex-col items-center px-2 pb-3 pt-[76%] text-center sm:px-3 sm:pb-4 lg:pt-[78%]`}
      >
        <h3 className="font-bebas text-[clamp(0.75rem,2.2vw,1rem)] leading-tight tracking-[0.06em]">
          <span className="block text-[#B3B3B3]">{item.titleLine1}</span>
          <span className="block text-[#0E7AEB]">{item.titleLine2}</span>
        </h3>

        <p className="mt-2 max-w-[14rem] text-[9px] leading-snug text-white/90 sm:text-[10px] lg:text-[11px]">
          {item.description}
        </p>

        <div className="mt-auto flex w-full justify-center pt-3 sm:pt-4">
          <Image
            src={iconSrc}
            alt={item.iconAlt}
            width={260}
            height={310}
            className="h-[4.5rem] w-auto object-contain sm:h-20 lg:h-[5.5rem]"
          />
        </div>
      </div>
    </article>
  );
}

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
              className={`${abrilFatface.className} text-[clamp(2rem,5vw,3.5rem)] font-normal tracking-wide text-[#B3B3B3]`}
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
            className={`${inter.className} mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#B3B3B3] sm:mt-5 sm:text-sm lg:text-base`}
          >
            {dict.subtitle}
          </p>
        </header>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:mt-12 lg:grid-cols-6 lg:gap-3">
          {dict.items.map((item) => {
            const icon = item.icon as AttractionIcon;

            return (
              <AttractionCard
                key={item.icon}
                item={item}
                iconSrc={ICONS[icon]}
                photoSrc={PHOTOS[icon]}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
