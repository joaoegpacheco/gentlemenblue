import type { Dictionary } from "@/i18n/get-dictionary";
import { abrilFatface } from "@/lib/fonts";

import { SponsorsMarquee } from "./SponsorsMarquee";

type SponsorsProps = {
  dict: Dictionary["sponsors"];
};

export function Sponsors({ dict }: SponsorsProps) {
  return (
    <section id="patrocinadores" className="overflow-hidden bg-black">
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

        <SponsorsMarquee label={dict.logoPlaceholder} />
      </div>
    </section>
  );
}
