import Image from "next/image";
import Link from "next/link";

import type { Dictionary } from "@/i18n/get-dictionary";
import { assets } from "@/lib/assets";
import { getCountdownSnapshot } from "@/lib/countdown";
import { inter } from "@/lib/fonts";
import { SYMPLA_EVENT_URL } from "@/lib/links";

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

        <div className="mx-auto flex w-full min-h-0 max-w-[1440px] flex-1 flex-col justify-between px-[clamp(1.25rem,2.5vw,5rem)] pb-[clamp(1.75rem,4vh,5rem)] pt-0 lg:justify-center 2xl:max-w-[1800px] min-[2560px]:max-w-[2400px] min-[3840px]:max-w-[3000px]">
          <div className="flex min-h-0 w-full max-w-full flex-1 flex-col justify-between gap-[clamp(1.25rem,4vh,3.5rem)] lg:flex-none lg:justify-start lg:max-w-max [@media(max-height:640px)]:gap-2">
            <div className="flex min-h-0 flex-col gap-[clamp(0.65rem,2.8vh,2.75rem)] [@media(max-height:640px)]:gap-1.5">
              <AnimatedLogo
                alt={dict.hero.logoAlt}
                width={204}
                height={294}
                priority
                className="w-[clamp(3.5rem,5.5vw+4vh,18rem)] shrink-0 [@media(max-height:640px)]:w-[clamp(2.5rem,4vh,4.5rem)]"
              />

              <h1 className="shrink-0 leading-[0.85] tracking-wide">
                <span className="font-title block text-[clamp(1.55rem,2.4vw+1.8vh,9.5rem)] text-white [@media(max-height:640px)]:text-[clamp(1.2rem,4.5vh,2.25rem)]">
                  GENTLEMEN
                </span>
                <span className="font-title-vintage -mt-[0.02em] block text-[clamp(2.85rem,8vw+4.5vh,30rem)] text-brand-blue [@media(max-height:640px)]:text-[clamp(2.1rem,9vh,4.25rem)]">
                  BLUE
                </span>
              </h1>

              <div className="flex shrink-0 items-center gap-[clamp(0.6rem,1.4vw,1.5rem)]">
                <span
                  aria-hidden
                  className="h-px w-[clamp(1.75rem,3.5vw,6rem)] shrink-0 bg-brand-blue"
                />
                <p className="font-bebas text-[clamp(0.85rem,0.75vw+0.75vh,3rem)] tracking-[0.12em] text-white">
                  {dict.hero.tagline}
                </p>
              </div>

              <div className="grid shrink-0 grid-cols-3 items-end gap-2 sm:gap-[clamp(0.5rem,1.5vw,2rem)] lg:grid-cols-[auto_auto_auto] lg:w-max lg:max-w-full lg:gap-[clamp(1.25rem,2.5vw,3.5rem)]">
                <div className="flex min-w-0 items-start gap-1.5 overflow-hidden sm:gap-2.5 lg:min-w-max lg:overflow-visible">
                  <Image
                    src={assets.icons.calendar}
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden
                    className="mt-0.5 h-[clamp(0.85rem,0.7vw+0.55vh,1.75rem)] w-[clamp(0.85rem,0.7vw+0.55vh,1.75rem)] shrink-0"
                  />
                  <div className="flex min-w-0 flex-col gap-0.5 sm:gap-1">
                    <p
                      className={`${inter.className} text-[0.7rem] font-bold leading-tight tracking-[0.02em] text-white break-words sm:text-[clamp(0.85rem,0.75vw+0.75vh,3rem)] sm:tracking-[0.04em] lg:whitespace-nowrap lg:break-normal`}
                    >
                      {date.primary}
                    </p>
                    <p className="font-montserrat text-[0.55rem] leading-tight tracking-[0.04em] text-brand-gray uppercase break-words sm:text-[clamp(0.65rem,0.5vw+0.45vh,1.75rem)] sm:tracking-[0.06em] lg:whitespace-nowrap lg:break-normal">
                      {date.secondary}
                    </p>
                  </div>
                </div>

                <div className="flex min-w-0 items-end gap-1.5 overflow-hidden sm:gap-2.5 lg:min-w-max lg:overflow-visible">
                  <Image
                    src={assets.icons.clock}
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden
                    className="mt-0.5 h-[clamp(0.85rem,0.7vw+0.55vh,1.75rem)] w-[clamp(0.85rem,0.7vw+0.55vh,1.75rem)] shrink-0"
                  />
                  <div className="flex min-w-0 flex-col gap-0.5 sm:gap-1">
                    <p
                      className={`${inter.className} text-[0.7rem] font-bold leading-tight tracking-[0.02em] text-white break-words sm:text-[clamp(0.85rem,0.8vw+0.75vh,3rem)] sm:tracking-[0.04em] lg:whitespace-nowrap lg:break-normal`}
                    >
                      {time.primary}
                    </p>
                    <p className="font-montserrat text-[0.55rem] leading-tight tracking-[0.04em] text-brand-gray uppercase break-words sm:text-[clamp(0.65rem,0.5vw+0.45vh,1.75rem)] sm:tracking-[0.06em] lg:whitespace-nowrap lg:break-normal">
                      {time.secondary}
                    </p>
                  </div>
                </div>

                <div className="flex min-w-0 items-end gap-1.5 overflow-hidden sm:gap-2.5 lg:min-w-max lg:overflow-visible">
                  <Image
                    src={assets.icons.location}
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden
                    className="mb-0.5 h-[clamp(0.85rem,0.7vw+0.55vh,1.75rem)] w-[clamp(0.85rem,0.7vw+0.55vh,1.75rem)] shrink-0"
                  />
                  <div className="flex min-w-0 flex-col gap-1 sm:gap-1.5">
                    <Image
                      src={assets.images.armazemGaragem}
                      alt={location.primary}
                      width={169}
                      height={107}
                      priority
                      unoptimized
                      className="h-auto w-auto max-h-8 max-w-[4.5rem] object-contain object-left sm:max-h-[clamp(2.75rem,5.5vh+1.5vw,12rem)] sm:max-w-[clamp(5rem,10vw+2.5vh,18rem)] [@media(max-height:640px)]:max-h-[2.25rem] [@media(max-height:640px)]:max-w-[5rem]"
                    />
                    <p className="font-montserrat text-[0.55rem] leading-tight tracking-[0.04em] text-brand-gray uppercase break-words sm:text-[clamp(0.65rem,0.5vw+0.45vh,1.75rem)] sm:tracking-[0.06em] lg:whitespace-nowrap lg:break-normal">
                      {location.secondary}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-[clamp(0.85rem,1.4vw,1.5rem)] [@media(max-height:640px)]:gap-1.5">
                <Link
                  href={SYMPLA_EVENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-brand-blue px-[clamp(1.5rem,2.4vw,4.5rem)] py-[clamp(0.65rem,1.1vh+0.25vw,1.75rem)] font-bebas text-[clamp(0.85rem,0.7vw+0.55vh,2.25rem)] tracking-[0.12em] text-white transition-opacity hover:opacity-90"
                >
                  {dict.hero.wantToParticipate}
                </Link>
                <Link
                  href="#contato"
                  className="inline-flex items-center justify-center rounded-full border border-white/70 px-[clamp(1.5rem,2.4vw,4.5rem)] py-[clamp(0.65rem,1.1vh+0.25vw,1.75rem)] font-bebas text-[clamp(0.85rem,0.7vw+0.55vh,2.25rem)] tracking-[0.12em] text-white transition-colors hover:bg-white/10"
                >
                  {dict.hero.becomeSponsor}
                </Link>
              </div>
            </div>

            <div className="shrink-0 pt-[clamp(0.35rem,1.2vh,1rem)]">
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
