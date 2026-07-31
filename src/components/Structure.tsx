import Image from "next/image";

import type { Dictionary } from "@/i18n/get-dictionary";
import { assets } from "@/lib/assets";
import { abrilFatface, inter } from "@/lib/fonts";

import { StructureBlueprintDialog } from "./StructureBlueprintDialog";
import { StructureStatValue } from "./StructureStatValue";

type StructureProps = {
  dict: Dictionary["structure"];
};

export function Structure({ dict }: StructureProps) {
  return (
    <section id="estrutura" className="overflow-x-clip bg-black">
      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-0 w-full overflow-hidden">
          <Image
            src={assets.images.structureBlueprint}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[left_center]"
            aria-hidden
          />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-6 px-5 py-12 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)] lg:gap-4 lg:px-10 lg:py-16">
          <div className={`${inter.className} lg:pr-4`}>
            <h2 className={`${abrilFatface.className} leading-[1.05] tracking-wide`}>
              <span className="block text-xl text-[#BDBDBD] sm:text-2xl lg:text-[1.75rem]">
                {dict.heading.line1}
              </span>
              <span className="mt-1 block text-[clamp(1.875rem,4.8vw,3.25rem)] text-brand-blue lg:mt-2 lg:text-[3rem]">
                {dict.heading.line2}
              </span>
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#BDBDBD] sm:mt-5 sm:text-base lg:mt-6 lg:text-[15px] lg:leading-7">
              {dict.description}
            </p>

            <StructureBlueprintDialog
              label={dict.viewBlueprint}
              imageAlt={dict.blueprintAlt}
              closeLabel={dict.closeBlueprint}
            />
          </div>

          <div className="w-full">
            <Image
              src={assets.images.structureMap}
              alt={dict.mapAlt}
              width={1024}
              height={682}
              className="h-auto w-full"
              sizes="(max-width: 1024px) 100vw, 64vw"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-5 pb-12 pt-10 sm:px-6 sm:pb-14 lg:px-10 lg:pb-16 lg:pt-14">
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
            <h3
              className={`${abrilFatface.className} text-[clamp(1.35rem,5.5vw,2.75rem)] font-normal tracking-wide`}
            >
              <span className="text-[#BDBDBD]">{dict.stats.titlePrefix} </span>
              <span className="text-brand-blue">{dict.stats.titleHighlight}</span>
            </h3>
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

        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:mt-10 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
          {dict.stats.items.map((item) => (
            <article
              key={item.label}
              className={`${inter.className} flex min-h-[8.5rem] flex-col items-center justify-center rounded-sm border border-white/25 bg-[#0E7AEB]/5 px-2.5 py-4 text-center sm:min-h-[10.5rem] sm:px-4 sm:py-6`}
            >
              <div>
                <StructureStatValue
                  value={item.value}
                  className={`${inter.className} text-[clamp(2rem,4.5vw,2.85rem)] font-bold leading-none items-center text-white`}
                />
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-white sm:text-sm">
                  {item.label}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
