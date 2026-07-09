import Image from "next/image";
import Link from "next/link";

import type { Dictionary } from "@/i18n/get-dictionary";
import { assets } from "@/lib/assets";
import { getCountdownSnapshot } from "@/lib/countdown";
import { inter } from "@/lib/fonts";

import { AnimatedLogo } from "./AnimatedLogo";
import { Countdown } from "./Countdown";
import { Header } from "./Header";
import { HeroBackground } from "./HeroBackground";

type HeroProps = {
  dict: Dictionary;
};

export function Hero({ dict }: HeroProps) {
  const { date, time, location } = dict.hero.eventDetails;

  return (
    <section
      id="evento"
      className="relative h-dvh max-h-dvh overflow-hidden bg-[#0a1628]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <HeroBackground />

        <div className="absolute inset-0 bg-linear-to-r from-[#0a1628]/95 via-[#0a1628]/55 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a1628]/85 via-transparent to-[#0a1628]/15" />
      </div>

      <div className="relative z-10 flex h-full min-h-0 flex-col">
        <Header dict={dict.header} />

        <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-5 pb-4 pt-0 min-h-0 sm:px-6 sm:pb-5 lg:px-10 lg:pb-6 2xl:max-w-[1800px] 2xl:px-14 2xl:pb-8 min-[2560px]:max-w-[2400px] min-[2560px]:px-16 min-[2560px]:pb-10 min-[3840px]:max-w-[3000px] min-[3840px]:px-20 min-[3840px]:pb-12">
          <div className="flex min-h-0 flex-1 flex-col justify-between gap-4 sm:gap-5 lg:max-w-[540px] lg:gap-6 2xl:max-w-[1024px] 2xl:justify-around 2xl:gap-8 min-[2560px]:max-w-[980px] min-[2560px]:gap-10 min-[3840px]:max-w-[1200px] min-[3840px]:gap-12">
            <div className="flex flex-col gap-2.5 sm:gap-3.5 lg:gap-4 2xl:gap-5 min-[2560px]:gap-6">
              <AnimatedLogo
                alt={dict.hero.logoAlt}
                width={204}
                height={294}
                priority
                className="w-14 sm:w-20 lg:w-[5.5rem] 2xl:w-32 min-[2560px]:w-40 min-[3840px]:w-52"
              />

              <h1 className="leading-[0.85] tracking-wide">
                <span className="font-title block text-[clamp(1.85rem,8vw,3.75rem)] text-white 2xl:text-[5.5rem] min-[2560px]:text-[7.5rem] min-[3840px]:text-[10rem]">
                  GENTLEMEN
                </span>
                <span className="font-title-vintage -mt-1 block text-[clamp(2.5rem,14vw,7.5rem)] text-brand-blue lg:-mt-2 2xl:-mt-3 2xl:text-[11rem] min-[2560px]:-mt-4 min-[2560px]:text-[15rem] min-[3840px]:-mt-5 min-[3840px]:text-[20rem]">
                  BLUE
                </span>
              </h1>

              <div className="flex items-center gap-2.5 sm:gap-4 2xl:gap-5">
                <span
                  aria-hidden
                  className="h-px w-8 shrink-0 bg-brand-blue sm:w-14 2xl:w-16 min-[2560px]:w-20"
                />
                <p className="font-bebas text-xs tracking-[0.12em] text-white sm:text-sm 2xl:text-2xl min-[2560px]:text-3xl min-[3840px]:text-4xl">
                  {dict.hero.tagline}
                </p>
              </div>

              <div className="grid grid-cols-3 items-end gap-2 sm:gap-4 2xl:gap-5 min-[2560px]:gap-6">
                <div className="flex min-w-0 flex-col gap-0.5 sm:gap-1">
                  <p
                    className={`${inter.className} text-xs font-bold leading-tight tracking-[0.04em] text-white sm:text-sm 2xl:text-2xl min-[2560px]:text-3xl min-[3840px]:text-4xl`}
                  >
                    {date.primary}
                  </p>
                  <p className="font-montserrat text-[9px] leading-tight tracking-[0.06em] text-brand-gray uppercase sm:text-xs lg:text-sm 2xl:text-lg min-[2560px]:text-xl min-[3840px]:text-2xl">
                    {date.secondary}
                  </p>
                </div>

                <div className="flex min-w-0 flex-col gap-0.5 sm:gap-1">
                  <p
                    className={`${inter.className} text-xs font-bold leading-tight tracking-[0.04em] text-white sm:text-base lg:text-lg 2xl:text-2xl min-[2560px]:text-3xl min-[3840px]:text-4xl`}
                  >
                    {time.primary}
                  </p>
                  <p className="font-montserrat text-[9px] leading-tight tracking-[0.06em] text-brand-gray uppercase sm:text-xs lg:text-sm 2xl:text-lg min-[2560px]:text-xl min-[3840px]:text-2xl">
                    {time.secondary}
                  </p>
                </div>

                <div className="flex min-w-0 flex-col gap-1 sm:gap-1.5">
                  <Image
                    src={assets.images.armazemGaragem}
                    alt={location.primary}
                    width={169}
                    height={107}
                    priority
                    unoptimized
                    className="h-auto w-auto max-h-[3rem] max-w-[5.5rem] object-contain object-left sm:max-h-[4rem] sm:max-w-[7rem] 2xl:max-h-[5.5rem] 2xl:max-w-[10rem] min-[2560px]:max-h-[7rem] min-[2560px]:max-w-[12rem] min-[3840px]:max-h-[9rem] min-[3840px]:max-w-[15rem]"
                  />
                  <p className="font-montserrat text-[9px] leading-tight tracking-[0.06em] text-brand-gray uppercase sm:text-xs lg:text-sm 2xl:text-lg min-[2560px]:text-xl min-[3840px]:text-2xl">
                    {location.secondary}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-4 2xl:gap-5">
                <Link
                  href="#contato"
                  className="inline-flex items-center justify-center rounded-full bg-brand-blue px-6 py-2.5 font-bebas text-xs tracking-[0.12em] text-white transition-opacity hover:opacity-90 sm:px-8 sm:py-3 sm:text-sm lg:text-base 2xl:px-11 2xl:py-4 2xl:text-xl min-[2560px]:px-14 min-[2560px]:py-5 min-[2560px]:text-2xl min-[3840px]:px-16 min-[3840px]:py-6 min-[3840px]:text-3xl"
                >
                  {dict.hero.wantToParticipate}
                </Link>
                <Link
                  href="#contato"
                  className="inline-flex items-center justify-center rounded-full border border-white/70 px-6 py-2.5 font-bebas text-xs tracking-[0.12em] text-white transition-colors hover:bg-white/10 sm:px-8 sm:py-3 sm:text-sm lg:text-base 2xl:px-11 2xl:py-4 2xl:text-xl min-[2560px]:px-14 min-[2560px]:py-5 min-[2560px]:text-2xl min-[3840px]:px-16 min-[3840px]:py-6 min-[3840px]:text-3xl"
                >
                  {dict.hero.becomeSponsor}
                </Link>
              </div>
            </div>

            <div className="shrink-0">
              <Countdown
                dict={dict.countdown}
                initialTimeLeft={getCountdownSnapshot()}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
