import Image from "next/image";
import Link from "next/link";

import type { Dictionary } from "@/i18n/get-dictionary";
import { assets, socialIcons } from "@/lib/assets";
import { abrilFatface, inter } from "@/lib/fonts";

import { AnimatedLogo } from "./AnimatedLogo";

type FooterProps = {
  dict: Dictionary["footer"];
};

const SOCIAL_LINKS = [
  {
    key: "instagram" as const,
    icon: socialIcons.instagram,
    href: "https://www.instagram.com/gentlemenmotoclube/",
  },
  {
    key: "facebook" as const,
    icon: socialIcons.facebook,
    href: "https://www.facebook.com/gentlemencuritiba/",
  },
  {
    key: "spotify" as const,
    icon: socialIcons.spotify,
    href: "https://open.spotify.com/playlist/4t1RUngIW1mRvJNH9eBt70?si=m1ZtVa6FTDWqFzJYJfEEkQ",
  },
  {
    key: "whatsapp" as const,
    icon: socialIcons.whatsapp,
    href: "https://wa.me/5541998142003",
  },
] as const;

export function Footer({ dict }: FooterProps) {
  return (
    <footer className="overflow-x-clip bg-black">
      <div className="@container relative w-full overflow-hidden">
        <Image
          src={assets.images.footerBanner}
          alt=""
          width={1024}
          height={453}
          unoptimized
          className="block h-auto w-full max-w-none"
          sizes="100vw"
          priority
          aria-hidden
        />

        <div className="absolute inset-0 mt-8 flex sm:mt-12 md:mt-16">
          <div
            className={`${abrilFatface.className} flex w-[58%] flex-col items-center px-[2cqw] text-center`}
          >
            <div className="flex items-center justify-center gap-[0.55cqw]">
              <span
                aria-hidden
                className="text-[clamp(8px,1.56cqw,18px)] leading-none text-brand-blue"
              >
                ★
              </span>
              <p className="text-[clamp(8px,1.56cqw,50px)] tracking-[0.18em] text-[#B3B3B3]">
                {dict.saveTheDate.label}
              </p>
              <span
                aria-hidden
                className="text-[clamp(8px,1.56cqw,18px)] leading-none text-brand-blue"
              >
                ★
              </span>
            </div>
            <p className="mt-[0.35cqw] text-[clamp(20px,5.27cqw,100px)] leading-[0.95] tracking-[0.02em] text-[#B3B3B3]">
              {dict.saveTheDate.date}
            </p>
            <p className="mt-[0.65cqw] text-[clamp(8px,1.37cqw,50px)] tracking-[0.06em] text-[#B3B3B3]">
              {dict.saveTheDate.location}
            </p>
            <p className="font-montserrat mt-[0.75cqw] text-[clamp(7px,1.17cqw,30px)] font-semibold uppercase leading-snug tracking-[0.04em] text-brand-blue">
              {dict.saveTheDate.taglineLine1}
              <br />
              {dict.saveTheDate.taglineLine2}
            </p>
          </div>
        </div>
      </div>

      <div
        className={`${inter.className} mx-auto w-full max-w-[1440px] px-5 py-10 sm:px-6 sm:py-10 lg:px-10 lg:py-12`}
      >
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          <div className="flex justify-center overflow-hidden lg:justify-start">
            <AnimatedLogo
              alt={dict.logoAlt}
              width={204}
              height={294}
              className="w-20 sm:w-28 lg:w-32"
              flameVariant="footer"
            />
          </div>

          <div className="flex flex-col items-center gap-3.5 sm:gap-4">
            <p className="text-sm text-brand-gray sm:text-base">
              {dict.followUs}
            </p>
            <div className="flex items-center gap-3 sm:gap-3.5">
              {SOCIAL_LINKS.map(({ key, icon, href }) => (
                <Link
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={dict.social[key]}
                  className="transition-opacity hover:opacity-80"
                >
                  <Image
                    src={icon}
                    alt=""
                    width={70}
                    height={70}
                    className="h-7 w-7 sm:h-8 sm:w-8"
                    aria-hidden
                  />
                </Link>
              ))}
            </div>
            <p className="text-center text-xs text-brand-gray sm:text-sm">
              {dict.copyright}
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 sm:gap-8 lg:justify-end">
            <Link
              href={dict.partnerLinks.weareon}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={dict.weareonAlt}
            >
              <Image
                src={assets.images.weareon}
                alt={dict.weareonAlt}
                width={298}
                height={172}
                className="h-auto w-24 sm:w-32"
              />
            </Link>
            <Link
              href={dict.partnerLinks.j2p}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={dict.j2pAlt}
            >
              <Image
                src={assets.images.j2p}
                alt={dict.j2pAlt}
                width={321}
                height={162}
                className="h-auto w-14 sm:w-20"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
