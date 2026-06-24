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
    <div className="mx-auto flex w-full max-w-[592px] flex-col gap-3">
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
              className="flex w-full cursor-pointer items-center gap-4 p-6 text-left"
            >
              <span className="min-w-0 flex-1 text-xl font-medium leading-8 text-white">
                {item.question}
              </span>
              <Image
                src={isOpen ? assets.icons.faqCollapse : assets.icons.faqExpand}
                alt=""
                width={24}
                height={24}
                aria-hidden
                className="h-6 w-6 shrink-0"
              />
            </button>

            {isOpen ? (
              <div className="px-6 pb-6">
                <p className="text-base leading-6 text-white/60">{item.answer}</p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
