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
    <article className="attraction-neon-border relative flex h-full min-h-0 aspect-[568/1024] flex-col overflow-hidden rounded-sm bg-black">
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
        className={`${inter.className} relative z-10 flex min-h-0 flex-1 flex-col items-center px-1.5 pb-2.5 pt-[76%] text-center sm:px-3 sm:pb-4 lg:pt-[78%]`}
      >
        <h3 className="shrink-0 font-bebas text-[clamp(0.7rem,3.2vw,1rem)] leading-tight tracking-[0.06em]">
          <span className="block text-[#B3B3B3]">{item.titleLine1}</span>
          <span className="block text-[#0E7AEB]">{item.titleLine2}</span>
        </h3>

        <p className="mt-1.5 line-clamp-4 max-w-[14rem] flex-1 text-[8px] leading-snug text-white/90 sm:mt-2 sm:line-clamp-5 sm:text-[10px] lg:text-[11px]">
          {item.description}
        </p>

        <div className="mt-auto flex w-full shrink-0 justify-center pt-2 sm:pt-4">
          <Image
            src={iconSrc}
            alt={item.iconAlt}
            width={260}
            height={310}
            className="h-14 w-auto object-contain sm:h-20 lg:h-[5.5rem]"
          />
        </div>
      </div>
    </article>
  );
}

export function Attractions({ dict }: AttractionsProps) {
  return (
    <section id="atracoes" className="overflow-x-clip bg-black">
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-24 pt-12 sm:px-6 sm:pb-28 sm:pt-14 lg:px-10 lg:pb-36 lg:pt-16">
        <header className="text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-6">
            <Image
              src={assets.icons.star}
              alt=""
              width={126}
              height={126}
              aria-hidden
              className="h-8 w-8 shrink-0 sm:h-12 sm:w-12 lg:h-14 lg:w-14"
            />
            <h2
              className={`${abrilFatface.className} text-[clamp(1.75rem,7vw,3.5rem)] font-normal tracking-wide text-[#B3B3B3]`}
            >
              {dict.title}
            </h2>
            <Image
              src={assets.icons.star}
              alt=""
              width={126}
              height={126}
              aria-hidden
              className="h-8 w-8 shrink-0 sm:h-12 sm:w-12 lg:h-14 lg:w-14"
            />
          </div>
          <p
            className={`${inter.className} mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#B3B3B3] sm:mt-5 sm:text-sm lg:text-base`}
          >
            {dict.subtitle}
          </p>
        </header>

        <div className="mt-8 grid grid-cols-2 items-stretch gap-2.5 sm:mt-10 sm:gap-4 md:grid-cols-3 lg:mt-12 lg:grid-cols-6 lg:gap-3">
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
