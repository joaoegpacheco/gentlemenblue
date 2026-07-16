"use client";

import { useState, type FormEvent } from "react";

import type { Dictionary } from "@/i18n/get-dictionary";
import { blackHanSans, inter } from "@/lib/fonts";

type ContactProps = {
  dict: Dictionary["contact"];
};

type SubmitStatus = "idle" | "sending" | "success" | "error";

const FIELD_CLASS =
  "w-full border-0 border-b border-brand-blue bg-transparent pb-2 font-montserrat text-sm font-light text-white outline-none placeholder:text-white/40 focus:border-brand-blue";

const TITLE_CLASS = `${blackHanSans.className} col-start-1 row-start-1 text-center text-[clamp(2rem,10vw,40px)] leading-none tracking-[0.05em]`;

export function Contact({ dict }: ContactProps) {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name")?.toString().trim() ?? "",
      email: formData.get("email")?.toString().trim() ?? "",
      phone: formData.get("phone")?.toString().trim() ?? "",
      message: formData.get("message")?.toString().trim() ?? "",
    };

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
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
              required
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
              required
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
              required
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
              required
              className={`${FIELD_CLASS} mt-2 resize-none`}
            />
          </div>

          <div className="flex flex-col items-end gap-3 pt-1">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center rounded-full bg-brand-blue px-10 py-2.5 font-bebas text-sm tracking-[0.12em] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:px-12 sm:py-3"
            >
              {status === "sending" ? dict.sending : dict.submit}
            </button>

            {status === "success" ? (
              <p className="font-montserrat text-sm font-light text-brand-blue">
                {dict.success}
              </p>
            ) : null}

            {status === "error" ? (
              <p className="font-montserrat text-sm font-light text-red-400">
                {dict.error}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
