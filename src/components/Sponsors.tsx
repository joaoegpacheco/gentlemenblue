import type { Dictionary } from "@/i18n/get-dictionary";
import { assets } from "@/lib/assets";
import { abrilFatface } from "@/lib/fonts";

import { SponsorsMarquee } from "./SponsorsMarquee";

type SponsorsProps = {
  dict: Dictionary["sponsors"];
};

const SPONSOR_LOGOS = [
  {
    src: assets.images.sponsorGentlemenBrasil,
    altKey: "gentlemenBrasil" as const,
    width: 560,
    height: 753,
  },
  {
    src: assets.images.weareon,
    altKey: "weareon" as const,
    width: 298,
    height: 172,
  },
  {
    src: assets.images.j2p,
    altKey: "j2p" as const,
    width: 321,
    height: 162,
  },
  {
    src: assets.images.armazemGaragem,
    altKey: "armazemGaragem" as const,
    width: 100,
    height: 100,
  },
  {
    src: assets.images.sicredi,
    altKey: "sicredi" as const,
    width: 100,
    height: 100,
  },
  {
    src: assets.images.sponsorBackstageFormaturas,
    altKey: "backstageFormaturas" as const,
    width: 447,
    height: 447,
  },
] as const;

export function Sponsors({ dict }: SponsorsProps) {
  return (
    <section id="patrocinadores" className="overflow-hidden bg-black">
      <div className="w-full py-12 sm:py-14 lg:py-16">
        <h2
          className={`${abrilFatface.className} px-5 text-center text-[clamp(1.5rem,4.5vw,3rem)] font-normal leading-tight tracking-wide sm:px-6 lg:px-10`}
        >
          <span className="text-[#0E7AEB]">{dict.heading.blue1}</span>
          <span className="text-[#B3B3B3]">{dict.heading.white1}</span>
          <br />
          <span className="text-[#0E7AEB]">{dict.heading.blue2}</span>
          <span className="text-[#B3B3B3]">{dict.heading.white2}</span>
        </h2>

        <SponsorsMarquee
          logos={SPONSOR_LOGOS.map(({ src, altKey, width, height }) => ({
            src,
            alt: dict.logos[altKey],
            width,
            height,
          }))}
        />
      </div>
    </section>
  );
}
