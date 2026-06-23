import Image from "next/image";
import Link from "next/link";

import type { Dictionary } from "@/i18n/get-dictionary";

import { Countdown } from "./Countdown";
import { Header } from "./Header";

type HeroProps = {
  dict: Dictionary;
};

export function Hero({ dict }: HeroProps) {
  const eventDetails = [
    dict.hero.eventDetails.date,
    dict.hero.eventDetails.time,
    dict.hero.eventDetails.location,
  ];

  return (
    <section
      id="evento"
      className="relative min-h-[100vw] bg-[#0a1628] lg:h-screen lg:max-h-screen lg:min-h-0 lg:overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero-bg.webp"
          alt=""
          fill
          priority
          className="object-cover object-[72%_center] lg:object-[right_center]"
          sizes="100vw"
        />

        <div
          className="absolute inset-0 bg-linear-to-r from-[#0a1628]/92 via-[#0a1628]/45 to-transparent"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-[#0a1628]/80 via-transparent to-[#0a1628]/20"
        />
      </div>

      <div className="relative z-10 flex min-h-[100vw] flex-col lg:h-full lg:min-h-0">
        <Header dict={dict.header} />

        <div className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-6 pb-6 pt-0 min-h-0 lg:px-10 lg:pb-8">
          <div className="flex min-h-0 flex-1 flex-col max-w-3xl">
            <Image
              src="/images/logo.webp"
              alt={dict.hero.logoAlt}
              width={204}
              height={294}
              priority
              className="mb-3 h-auto w-[4.5rem] sm:mb-4 sm:w-20 lg:mb-5 lg:w-[5.5rem]"
            />

            <h1 className="leading-[0.85] tracking-wide">
              <span
                className="font-title block text-[clamp(2.25rem,5.5vw,4.5rem)] text-white"
              >
                GENTLEMEN
              </span>
              <span
                className="font-title-vintage -mt-1 block text-[clamp(3.5rem,11vw,9rem)] text-brand-blue lg:-mt-2"
              >
                BLUE
              </span>
            </h1>

            <div className="mt-3 flex items-center gap-3 sm:mt-4 sm:gap-4">
              <span
                aria-hidden
                className="h-px w-10 shrink-0 bg-brand-blue sm:w-14"
              />
              <p className="font-bebas text-sm tracking-[0.14em] text-white sm:text-base lg:text-lg">
                {dict.hero.tagline}
              </p>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 sm:mt-6 sm:gap-6 lg:mt-8">
              {eventDetails.map((detail) => (
                <div key={detail.primary} className="space-y-0.5 sm:space-y-1">
                  <p className="font-bebas text-[10px] leading-tight tracking-[0.08em] text-white sm:text-sm lg:text-base">
                    {detail.primary}
                  </p>
                  <p className="font-montserrat text-[8px] leading-tight tracking-[0.06em] text-brand-gray sm:text-xs lg:text-sm">
                    {detail.secondary}
                  </p>
                </div>
              ))}
            </div>

            <div
              id="participar"
              className="mt-4 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:items-center sm:gap-3 lg:mt-8"
            >
              <Link
                href="#participar"
                className="inline-flex items-center justify-center rounded-full bg-brand-blue px-6 py-2.5 font-bebas text-xs tracking-[0.12em] text-white transition-opacity hover:opacity-90 sm:px-8 sm:py-3 sm:text-sm lg:text-base"
              >
                {dict.hero.wantToParticipate}
              </Link>
              <Link
                href="#patrocinadores"
                className="inline-flex items-center justify-center rounded-full border border-brand-gray px-6 py-2.5 font-bebas text-xs tracking-[0.12em] text-white transition-colors hover:bg-white/10 sm:px-8 sm:py-3 sm:text-sm lg:text-base"
              >
                {dict.hero.becomeSponsor}
              </Link>
            </div>

            <div className="mt-5 flex flex-1 flex-col justify-end min-h-0 sm:mt-6 lg:mt-4">
              <Countdown dict={dict.countdown} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
