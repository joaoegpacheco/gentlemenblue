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

        <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-6 pb-5 pt-0 min-h-0 lg:px-10 lg:pb-6">
          <div className="flex min-h-0 flex-1 flex-col justify-between lg:max-w-[540px]">
            <div>
              <AnimatedLogo
                alt={dict.hero.logoAlt}
                width={204}
                height={294}
                priority
                className="w-16 sm:w-20 lg:w-[5.5rem]"
              />

              <h1 className="leading-[0.85] tracking-wide">
                <span className="font-title block text-[clamp(2rem,4.2vw,3.75rem)] text-white">
                  GENTLEMEN
                </span>
                <span className="font-title-vintage -mt-1 block text-[clamp(2.75rem,9vw,7.5rem)] text-brand-blue lg:-mt-2">
                  BLUE
                </span>
              </h1>

              <div className="flex items-center gap-3 sm:gap-4">
                <span
                  aria-hidden
                  className="h-px w-10 shrink-0 bg-brand-blue sm:w-14"
                />
                <p className="font-bebas text-sm tracking-[0.14em] text-white">
                  {dict.hero.tagline}
                </p>
              </div>

              <div className="grid grid-cols-3 items-end gap-4">
                <div className="mt-2 flex flex-col gap-0.5 sm:gap-1">
                  <p
                    className={`${inter.className} text-sm font-bold leading-tight tracking-[0.04em] text-white`}
                  >
                    {date.primary}
                  </p>
                  <p className="font-montserrat text-[10px] leading-tight tracking-[0.06em] text-brand-gray uppercase sm:text-xs lg:text-sm">
                    {date.secondary}
                  </p>
                </div>

                <div className="flex flex-col gap-0.5 sm:gap-1">
                  <p
                    className={`${inter.className} text-sm font-bold leading-tight tracking-[0.04em] text-white sm:text-base lg:text-lg`}
                  >
                    {time.primary}
                  </p>
                  <p className="font-montserrat text-[10px] leading-tight tracking-[0.06em] text-brand-gray uppercase sm:text-xs lg:text-sm">
                    {time.secondary}
                  </p>
                </div>

                <div className="mt-2 flex flex-col gap-1 sm:gap-1.5">
                  <Image
                    src={assets.images.armazemGaragem}
                    alt={location.primary}
                    width={169}
                    height={107}
                    priority
                    unoptimized
                    className="h-auto w-auto max-h-[4rem] max-w-[7rem] object-contain object-left"
                  />
                  <p className="font-montserrat text-[10px] leading-tight tracking-[0.06em] text-brand-gray uppercase sm:text-xs lg:text-sm">
                    {location.secondary}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center sm:gap-4 lg:mt-7">
                <Link
                  href="#contato"
                  className="inline-flex items-center justify-center rounded-full bg-brand-blue px-8 py-3 font-bebas text-xs tracking-[0.12em] text-white transition-opacity hover:opacity-90 sm:text-sm lg:text-base"
                >
                  {dict.hero.wantToParticipate}
                </Link>
                <Link
                  href="#contato"
                  className="inline-flex items-center justify-center rounded-full border border-white/70 px-8 py-3 font-bebas text-xs tracking-[0.12em] text-white transition-colors hover:bg-white/10 sm:text-sm lg:text-base"
                >
                  {dict.hero.becomeSponsor}
                </Link>
              </div>
            </div>

            <div className="mt-6 shrink-0 lg:mt-4">
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
