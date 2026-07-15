"use client";

import type { FormEvent } from "react";

import type { Dictionary } from "@/i18n/get-dictionary";
import { blackHanSans, inter } from "@/lib/fonts";

type ContactProps = {
  dict: Dictionary["contact"];
};

const WHATSAPP_NUMBER = "5541998142003";

const FIELD_CLASS =
  "w-full border-0 border-b border-brand-blue bg-transparent pb-2 font-montserrat text-sm font-light text-white outline-none placeholder:text-white/40 focus:border-brand-blue";

const TITLE_CLASS = `${blackHanSans.className} col-start-1 row-start-1 text-center text-[clamp(2rem,10vw,40px)] leading-none tracking-[0.05em]`;

function buildWhatsAppUrl(
  dict: Dictionary["contact"],
  data: { name: string; email: string; phone: string; message: string },
) {
  const text = [
    dict.whatsappIntro,
    "",
    `${dict.fields.name}: ${data.name}`,
    `${dict.fields.email}: ${data.email}`,
    `${dict.fields.phone}: ${data.phone}`,
    "",
    `${dict.fields.message}:`,
    data.message,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function Contact({ dict }: ContactProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const url = buildWhatsAppUrl(dict, {
      name: formData.get("name")?.toString().trim() ?? "",
      email: formData.get("email")?.toString().trim() ?? "",
      phone: formData.get("phone")?.toString().trim() ?? "",
      message: formData.get("message")?.toString().trim() ?? "",
    });

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contato" className="overflow-x-clip bg-black">
      <div
        className={`${inter.className} mx-auto flex w-full max-w-[960px] flex-col items-center gap-10 px-5 py-12 sm:gap-12 sm:px-6 sm:py-14 lg:flex-row lg:items-center lg:justify-center lg:gap-16 lg:px-10 lg:py-16`}
      >
        <div className="flex min-h-40 w-full max-w-md flex-col items-center justify-center overflow-hidden text-center sm:min-h-48 sm:max-w-lg lg:min-h-56 lg:max-w-xl lg:flex-1">
          <div className="w-max max-w-full">
            <div className="grid place-items-center">
              <p
                aria-hidden
                className={`${TITLE_CLASS} z-0 origin-bottom scale-[1.08] -translate-y-1.5 text-transparent [-webkit-text-stroke:2px_#0e7aeb] sm:scale-[1.12] sm:-translate-y-2.5`}
              >
                <span className="block whitespace-nowrap">{dict.titleLine1}</span>
                <span className="block whitespace-nowrap">{dict.titleLine2}</span>
              </p>
              <h2 className={`${TITLE_CLASS} relative z-10 text-white`}>
                <span className="block whitespace-nowrap">{dict.titleLine1}</span>
                <span className="block whitespace-nowrap">{dict.titleLine2}</span>
              </h2>
            </div>
          </div>

          {/* <div className="mt-10 space-y-0.5 font-montserrat text-[clamp(0.625rem,1.5vw,0.75rem)] font-light uppercase leading-relaxed tracking-[0.05em] text-white sm:mt-12">
            {dict.noteLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div> */}
        </div>

        <form
          className="flex w-full max-w-sm flex-col gap-6 sm:max-w-88 sm:gap-7 lg:flex-1 lg:gap-8"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="contact-name"
              className="font-montserrat text-sm font-extralight lowercase tracking-wide text-white"
            >
              {dict.fields.name}
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              className={`${FIELD_CLASS} mt-2`}
            />
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="font-montserrat text-sm font-extralight lowercase tracking-wide text-white"
            >
              {dict.fields.email}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              className={`${FIELD_CLASS} mt-2`}
            />
          </div>

          <div>
            <label
              htmlFor="contact-phone"
              className="font-montserrat text-sm font-extralight lowercase tracking-wide text-white"
            >
              {dict.fields.phone}
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className={`${FIELD_CLASS} mt-2`}
            />
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="font-montserrat text-sm font-extralight lowercase tracking-wide text-white"
            >
              {dict.fields.message}
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              className={`${FIELD_CLASS} mt-2 resize-none`}
            />
          </div>

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-brand-blue px-10 py-2.5 font-bebas text-sm tracking-[0.12em] text-white transition-opacity hover:opacity-90 sm:px-12 sm:py-3"
            >
              {dict.submit}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
