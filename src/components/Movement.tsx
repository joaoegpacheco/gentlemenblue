import Image from "next/image";

import type { Dictionary } from "@/i18n/get-dictionary";
import { assets } from "@/lib/assets";
import { abrilFatface, inter } from "@/lib/fonts";

type MovementProps = {
  dict: Dictionary["movement"];
};

export function Movement({ dict }: MovementProps) {
  return (
    <section id="movimento" className="bg-black">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-8 px-3 py-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12 lg:px-5 lg:py-3">
        <div className="mx-auto w-full max-w-[280px] sm:max-w-xs lg:mx-0 lg:max-w-[min(100%,22rem)] xl:max-w-[min(100%,26rem)]">
          <Image
            src={assets.images.movementCharacter}
            alt={dict.imageAlt}
            width={931}
            height={1024}
            className="h-auto w-full"
            sizes="(max-width: 1024px) 280px, 26rem"
          />
        </div>

        <div className={`${inter.className} flex flex-col justify-center`}>
          <h2
            className={`${abrilFatface.className} font-normal leading-tight tracking-wide`}
          >
            <span className="block text-2xl text-white sm:text-3xl lg:text-4xl">
              {dict.heading.line1}
            </span>
            <span className="mt-1 block text-[clamp(1.75rem,4.5vw,3.75rem)] text-white lg:mt-2">
              {dict.heading.line2Prefix}{" "}
              <span className="text-brand-blue">{dict.heading.line2Highlight}</span>
            </span>
          </h2>

          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.08em] text-brand-blue sm:mt-5 sm:text-base lg:text-lg">
            {dict.subheading}
          </p>

          <div className="mt-4 space-y-3 text-sm font-normal leading-relaxed text-white sm:mt-6 sm:space-y-4 sm:text-base lg:text-[15px] lg:leading-7">
            {dict.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.08em] text-brand-blue sm:mt-8 sm:text-base lg:text-lg">
            {dict.closing}
          </p>
        </div>
      </div>
    </section>
  );
}
