"use client";

import Image from "next/image";
import { useState } from "react";

import { assets } from "@/lib/assets";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto flex w-full max-w-[592px] flex-col gap-2.5 sm:gap-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={item.question}
            className={`overflow-hidden rounded bg-white/5 ${isOpen ? "flex flex-col gap-2" : ""}`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center gap-3 p-4 text-left sm:gap-4 sm:p-6"
            >
              <span className="min-w-0 flex-1 text-base font-medium leading-snug text-white sm:text-xl sm:leading-8">
                {item.question}
              </span>
              <Image
                src={isOpen ? assets.icons.faqCollapse : assets.icons.faqExpand}
                alt=""
                width={24}
                height={24}
                aria-hidden
                className="h-5 w-5 shrink-0 sm:h-6 sm:w-6"
              />
            </button>

            {isOpen ? (
              <div className="px-4 pb-4 sm:px-6 sm:pb-6">
                <p className="text-sm leading-6 text-white/60 sm:text-base">
                  {item.answer}
                </p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
