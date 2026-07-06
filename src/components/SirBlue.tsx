import Image from "next/image";

import type { Dictionary } from "@/i18n/get-dictionary";
import { assets } from "@/lib/assets";
import { abrilFatface, inter, montserrat } from "@/lib/fonts";

type SirBlueProps = {
  dict: Dictionary["sirBlue"];
};

const SIR_BLUE_POSES = [
  { src: assets.images.sirBluePose01, width: 322, height: 440 },
  { src: assets.images.sirBluePose02, width: 322, height: 440 },
  { src: assets.images.sirBluePose03, width: 322, height: 440 },
  { src: assets.images.sirBluePose04, width: 322, height: 440 },
  { src: assets.images.sirBluePose05, width: 322, height: 440 },
  { src: assets.images.sirBluePose06, width: 322, height: 440 },
  { src: assets.images.sirBluePose07, width: 322, height: 440 },
  { src: assets.images.sirBluePose08, width: 322, height: 440 },
] as const;

export function SirBlue({ dict }: SirBlueProps) {
  return (
    <section className="bg-black">
      <div className="relative w-full lg:aspect-[1024/266]">
        <Image
          src={assets.images.sirBlueBg}
          alt=""
          width={1024}
          height={266}
          priority
          unoptimized
          className="block h-auto w-full max-w-none lg:absolute lg:inset-0 lg:h-full lg:w-full lg:object-cover lg:object-left"
          sizes="100vw"
          aria-hidden
        />

        <div className="relative z-10 px-4 py-8 lg:absolute lg:inset-0 lg:px-0 lg:py-0">
          <div className="mx-auto w-full max-w-[240px] text-center lg:absolute lg:left-[44%] lg:top-1/2 lg:max-w-[210px] lg:-translate-x-1/2 lg:-translate-y-1/2 xl:max-w-[230px]">
            <h2
              className={`${montserrat.className} text-[clamp(1.75rem,5vw,2.25rem)] font-bold leading-none tracking-wide text-[#B3B3B3] underline underline-offset-4`}
            >
              {dict.title}
            </h2>
            <p
              className={`${abrilFatface.className} mt-1 text-xs font-normal uppercase tracking-[0.12em] text-brand-blue sm:text-sm`}
            >
              {dict.subtitle}
            </p>

            <p
              className={`${inter.className} mt-3 text-xs leading-relaxed text-[#B3B3B3] sm:mt-4 sm:text-sm lg:mt-2.5 lg:text-[11px] lg:leading-5`}
            >
              {dict.paragraph}
            </p>

            <p
              className={`${inter.className} mt-4 text-xs font-semibold uppercase tracking-widest text-brand-blue sm:mt-5 sm:text-sm lg:mt-3 lg:text-[11px]`}
            >
              {dict.tagline}
              <span className="text-[#7DBAF8]">{dict.tagline2}</span>
            </p>
          </div>

          <div className="mx-auto mt-6  grid w-full max-w-md grid-cols-4 grid-rows-2 gap-1.5 sm:max-w-lg sm:gap-2 lg:absolute lg:right-[1.25%] lg:top-1/2 lg:mt-0 lg:w-[41%] lg:max-w-[540px] lg:-translate-y-1/2 lg:gap-1 xl:right-[2%] xl:gap-1.5">
            {SIR_BLUE_POSES.map((pose, index) => (
              <div
                key={pose.src}
                className="overflow-hidden rounded-xl bg-black"
              >
                <Image
                  src={pose.src}
                  alt={`${dict.title} ${index + 1}`}
                  width={pose.width}
                  height={pose.height}
                  unoptimized
                  className="aspect-322/440 h-auto w-full rounded-xl object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
