import type { Dictionary } from "@/i18n/get-dictionary";
import { inter } from "@/lib/fonts";

type ContactProps = {
  dict: Dictionary["contact"];
};

const FIELD_CLASS =
  "w-full border-0 border-b border-brand-blue bg-transparent pb-2 font-montserrat text-sm font-light text-white outline-none placeholder:text-white/40 focus:border-brand-blue";

const TITLE_CLASS =
  "font-bebas col-start-1 row-start-1 text-[clamp(2rem,5vw,3.5rem)] leading-none tracking-[0.05em] whitespace-nowrap";

export function Contact({ dict }: ContactProps) {
  return (
    <section id="contato" className="bg-black">
      <div
        className={`${inter.className} mx-auto flex w-full max-w-[960px] flex-col items-center gap-12 px-4 py-12 sm:px-6 sm:py-14 lg:flex-row lg:items-start lg:justify-center lg:gap-16 lg:py-16`}
      >
        <div className="flex w-full max-w-84 flex-col items-center text-center sm:max-w-88 lg:flex-1">
          <div className="w-max max-w-full overflow-visible">
            <div className="grid place-items-center overflow-visible">
              <p
                aria-hidden
                className={`${TITLE_CLASS} z-0 origin-bottom scale-[1.15] -translate-y-2 text-transparent [-webkit-text-stroke:2px_#0e7aeb] sm:-translate-y-2.5`}
              >
                {dict.title}
              </p>
              <h2 className={`${TITLE_CLASS} relative z-10 text-white`}>
                {dict.title}
              </h2>
            </div>
          </div>

          <div className="mt-10 space-y-0.5 font-montserrat text-[clamp(0.625rem,1.5vw,0.75rem)] font-light uppercase leading-relaxed tracking-[0.05em] text-white sm:mt-12">
            {dict.noteLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <form
          className="flex w-full max-w-84 flex-col gap-7 sm:max-w-88 lg:flex-1 lg:gap-8"
          action="#"
          method="post"
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
