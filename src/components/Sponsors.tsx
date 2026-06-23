import type { Dictionary } from "@/i18n/get-dictionary";
import { abrilFatface, inter } from "@/lib/fonts";

type SponsorsProps = {
  dict: Dictionary["sponsors"];
};

const LOGO_PLACEHOLDER_COUNT = 16;

export function Sponsors({ dict }: SponsorsProps) {
  return (
    <section id="patrocinadores" className="bg-black">
      <div className="mx-auto w-full max-w-[1440px] px-3 py-10 sm:px-6 lg:px-10 lg:py-14">
        <h2
          className={`${abrilFatface.className} text-center text-[clamp(1.5rem,4.5vw,3rem)] font-normal leading-tight tracking-wide`}
        >
          <span className="text-brand-blue">{dict.heading.blue1}</span>
          <span className="text-white">{dict.heading.white1}</span>
          <br />
          <span className="text-brand-blue">{dict.heading.blue2}</span>
          <span className="text-white">{dict.heading.white2}</span>
        </h2>

        <div
          className={`${inter.className} mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 lg:mt-12`}
        >
          {Array.from({ length: LOGO_PLACEHOLDER_COUNT }, (_, index) => (
            <div
              key={index}
              className="flex min-h-16 items-center justify-center rounded-sm border border-white/15 px-3 py-4 text-center text-[10px] font-semibold uppercase tracking-[0.08em] text-white/70 sm:min-h-20 sm:text-xs"
            >
              {dict.logoPlaceholder}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
