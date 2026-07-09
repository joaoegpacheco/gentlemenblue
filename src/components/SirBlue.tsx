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
    <section className="overflow-x-clip bg-black">
      <div className="relative w-full overflow-hidden lg:aspect-[1024/266] 2xl:aspect-[1024/320] min-[2560px]:aspect-[1024/380] min-[3840px]:aspect-[1024/480]">
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

        <div className="relative z-10 px-5 py-12 sm:px-6 sm:py-14 lg:absolute lg:inset-0 lg:px-0 lg:py-0">
          <div className="mx-auto w-full max-w-[280px] text-center sm:max-w-[300px] lg:absolute lg:left-[42%] lg:top-1/2 lg:max-w-[210px] lg:-translate-x-1/2 lg:-translate-y-1/2 xl:max-w-[240px] 2xl:left-[52%] 2xl:max-w-[520px] min-[2560px]:left-[58%] min-[2560px]:max-w-[780px] min-[3840px]:left-[68%] min-[3840px]:max-w-[1300px]">
            <h2
              className={`${montserrat.className} text-[clamp(1.75rem,5vw,2.25rem)] font-bold leading-none tracking-wide text-[#B3B3B3] underline underline-offset-4 2xl:text-6xl 2xl:underline-offset-8 min-[2560px]:text-8xl min-[2560px]:underline-offset-[14px] min-[3840px]:text-[18rem] min-[3840px]:underline-offset-[36px]`}
            >
              {dict.title}
            </h2>
            <p
              className={`${abrilFatface.className} mt-1 text-xs font-normal uppercase tracking-[0.12em] text-brand-blue sm:text-sm 2xl:mt-3 2xl:text-3xl min-[2560px]:mt-5 min-[2560px]:text-5xl min-[3840px]:mt-10 min-[3840px]:text-8xl`}
            >
              {dict.subtitle}
            </p>

            <p
              className={`${inter.className} mt-3 text-sm leading-relaxed text-[#B3B3B3] sm:mt-4 sm:text-sm lg:mt-2.5 lg:text-[11px] lg:leading-5 2xl:mt-5 2xl:text-2xl 2xl:leading-9 min-[2560px]:mt-7 min-[2560px]:text-4xl min-[2560px]:leading-[1.4] min-[3840px]:mt-12 min-[3840px]:text-7xl min-[3840px]:leading-[1.3]`}
            >
              {dict.paragraph}
            </p>

            <p
              className={`${inter.className} mt-4 text-xs font-semibold uppercase tracking-widest text-brand-blue sm:mt-5 sm:text-sm lg:mt-3 lg:text-[11px] 2xl:mt-6 2xl:text-2xl min-[2560px]:mt-9 min-[2560px]:text-4xl min-[3840px]:mt-16 min-[3840px]:text-7xl`}
            >
              {dict.tagline}
              <span className="text-[#7DBAF8]">{dict.tagline2}</span>
            </p>
          </div>

          <div className="mx-auto mt-8 grid w-full max-w-md grid-cols-4 grid-rows-2 gap-1.5 sm:mt-10 sm:max-w-lg sm:gap-2 lg:absolute lg:right-[1.5%] lg:top-1/2 lg:mt-0 lg:w-[42%] lg:max-w-[560px] lg:-translate-y-1/2 lg:gap-1.5 xl:right-[2%] xl:max-w-[600px] 2xl:right-[2.5%] 2xl:w-[46%] 2xl:max-w-[900px] 2xl:gap-3 min-[2560px]:right-[3%] min-[2560px]:w-[48%] min-[2560px]:max-w-[1300px] min-[2560px]:gap-5 min-[3840px]:right-[3.5%] min-[3840px]:w-[50%] min-[3840px]:max-w-[2000px] min-[3840px]:gap-7">
            {SIR_BLUE_POSES.map((pose, index) => (
              <div
                key={pose.src}
                className="overflow-hidden rounded-xl bg-black 2xl:rounded-2xl min-[2560px]:rounded-3xl min-[3840px]:rounded-[2rem]"
              >
                <Image
                  src={pose.src}
                  alt={`${dict.title} ${index + 1}`}
                  width={pose.width}
                  height={pose.height}
                  unoptimized
                  className="aspect-322/440 h-auto w-full rounded-[inherit] object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
