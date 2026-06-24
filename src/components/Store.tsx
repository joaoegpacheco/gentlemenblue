import Image from "next/image";
import Link from "next/link";

import type { Dictionary } from "@/i18n/get-dictionary";
import { assets } from "@/lib/assets";
import { abrilFatface, inter } from "@/lib/fonts";

type StoreProps = {
  dict: Dictionary["store"];
};

function StoreCartIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M6 6h15l-1.5 9h-12L6 6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M6 6 5 3H2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="19" r="1.5" fill="currentColor" />
      <circle cx="17" cy="19" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function Store({ dict }: StoreProps) {
  return (
    <section id="loja" className="overflow-hidden bg-black">
      <div className="mx-auto w-full max-w-[1440px] px-3 pb-10 sm:px-6 lg:px-10 lg:pb-14">
        <header className="text-center">
          <h2
            className={`${abrilFatface.className} text-[clamp(1.5rem,4.5vw,3rem)] font-normal leading-tight tracking-wide`}
          >
            <span className="text-white">{dict.heading.white}</span>
            <span className="text-brand-blue">{dict.heading.blue}</span>
          </h2>
          <p
            className={`${inter.className} mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-brand-blue sm:mt-5 sm:text-sm lg:text-base`}
          >
            {dict.hashtag}
          </p>
        </header>

        <div className="mt-10 space-y-3 sm:mt-12 sm:space-y-4 lg:mt-14">
          <Image
            src={assets.images.storeProductsGrid}
            alt={dict.productsGridAlt}
            width={1024}
            height={289}
            className="h-auto w-full"
            sizes="(max-width: 1440px) 100vw, 1440px"
          />
          <Image
            src={assets.images.storeShirtDetails}
            alt={dict.shirtDetailsAlt}
            width={1024}
            height={828}
            className="h-auto w-full"
            sizes="(max-width: 1440px) 100vw, 1440px"
          />
        </div>

        <div className="mt-10 flex justify-center sm:mt-12 lg:mt-14">
          <Link
            href={dict.buyNowHref}
            className="inline-flex items-center gap-3 rounded-xl bg-brand-blue px-8 py-3 font-bebas text-sm tracking-[0.12em] text-white transition-opacity hover:opacity-90 sm:px-10 sm:py-3.5 sm:text-base"
          >
            {dict.buyNow}
            <StoreCartIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
