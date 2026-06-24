import Image from "next/image";

import type { Dictionary } from "@/i18n/get-dictionary";
import { assets } from "@/lib/assets";
import { inter } from "@/lib/fonts";

type SirBlueProps = {
  dict: Dictionary["sirBlue"];
};

export function SirBlue({ dict }: SirBlueProps) {
  return (
    <section className="bg-black">
      <div className="relative w-full lg:aspect-1024/265">
        <Image
          src={assets.images.sirBlueBg}
          alt=""
          width={1024}
          height={265}
          priority
          className="pointer-events-none block h-auto w-full max-w-none lg:absolute lg:inset-0 lg:h-full lg:w-full lg:object-cover lg:object-center"
          sizes="100vw"
          aria-hidden
        />

        <div
          className={`${inter.className} relative z-10 px-3 py-8 text-center sm:px-6 lg:absolute lg:left-[31%] lg:top-1/2 lg:max-w-60 lg:-translate-y-1/2 lg:px-0 lg:py-0 xl:max-w-66`}
        >
          <h2 className="font-bebas text-[clamp(2.5rem,6vw,3.5rem)] leading-none tracking-wide text-white">
            {dict.title}
          </h2>
          <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-brand-blue sm:text-base">
            {dict.subtitle}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white sm:mt-5 sm:text-base lg:mt-3 lg:text-[13px] lg:leading-6">
            {dict.paragraph}
          </p>

          <p className="mt-5 text-sm font-semibold uppercase tracking-widest text-brand-blue sm:mt-6 sm:text-base lg:mt-4 lg:text-sm">
            {dict.tagline}
          </p>
        </div>
      </div>
    </section>
  );
}
