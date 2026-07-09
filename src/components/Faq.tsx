import Image from "next/image";

import type { Dictionary } from "@/i18n/get-dictionary";
import { assets } from "@/lib/assets";
import { abrilFatface } from "@/lib/fonts";

import { FaqAccordion } from "./FaqAccordion";

type FaqProps = {
  dict: Dictionary["faq"];
};

export function Faq({ dict }: FaqProps) {
  return (
    <section id="faq" className="overflow-x-clip bg-black">
      <div className="mx-auto w-full max-w-[1440px] px-5 py-12 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
        <header className="text-center">
          <div className="flex items-center justify-center gap-2.5 sm:gap-5">
            <Image
              src={assets.icons.star}
              alt=""
              width={126}
              height={126}
              aria-hidden
              className="h-7 w-7 shrink-0 sm:h-11 sm:w-11 lg:h-12 lg:w-12"
            />
            <h2
              className={`${abrilFatface.className} text-[clamp(1.35rem,5.5vw,2.75rem)] font-normal leading-tight tracking-wide`}
            >
              <span className="text-[#B3B3B3]">{dict.heading.white}</span>
              <span className="text-[#0E7AEB]">{dict.heading.blue}</span>
            </h2>
            <Image
              src={assets.icons.star}
              alt=""
              width={126}
              height={126}
              aria-hidden
              className="h-7 w-7 shrink-0 sm:h-11 sm:w-11 lg:h-12 lg:w-12"
            />
          </div>
        </header>

        <div className="mt-8 sm:mt-10 lg:mt-14">
          <FaqAccordion items={dict.items} />
        </div>
      </div>
    </section>
  );
}
