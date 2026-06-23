import Image from "next/image";

import type { Dictionary } from "@/i18n/get-dictionary";
import { abrilFatface } from "@/lib/fonts";

import { FaqAccordion } from "./FaqAccordion";

type FaqProps = {
  dict: Dictionary["faq"];
};

export function Faq({ dict }: FaqProps) {
  return (
    <section id="faq" className="bg-black">
      <div className="mx-auto w-full max-w-[1440px] px-3 py-2 sm:px-6 lg:px-10 lg:py-4">
        <header className="text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-5">
            <Image
              src="/icons/star.webp"
              alt=""
              width={126}
              height={126}
              aria-hidden
              className="h-9 w-9 shrink-0 sm:h-11 sm:w-11 lg:h-12 lg:w-12"
            />
            <h2
              className={`${abrilFatface.className} text-[clamp(1.5rem,4vw,2.75rem)] font-normal leading-tight tracking-wide`}
            >
              <span className="text-white">{dict.heading.white}</span>
              <span className="text-brand-blue">{dict.heading.blue}</span>
            </h2>
            <Image
              src="/icons/star.webp"
              alt=""
              width={126}
              height={126}
              aria-hidden
              className="h-9 w-9 shrink-0 sm:h-11 sm:w-11 lg:h-12 lg:w-12"
            />
          </div>
        </header>

        <div className="mt-10 sm:mt-12 lg:mt-14">
          <FaqAccordion items={dict.items} />
        </div>
      </div>
    </section>
  );
}
