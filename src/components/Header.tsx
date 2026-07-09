"use client";

import Link from "next/link";
import { useState } from "react";

import type { Dictionary } from "@/i18n/get-dictionary";

type HeaderProps = {
  dict: Dictionary["header"];
};

type NavLink = {
  href: string;
  label: string;
  active?: boolean;
};

export function Header({ dict }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks: NavLink[] = [
    { href: "#evento", label: dict.nav.event, active: true },
    { href: "#atracoes", label: dict.nav.attractions },
    // { href: "#programacao", label: dict.nav.schedule },
    { href: "#estrutura", label: dict.nav.structure },
    { href: "#patrocinadores", label: dict.nav.sponsors },
    { href: "#galeria", label: dict.nav.gallery },
    { href: "#faq", label: dict.nav.faq },
    { href: "#loja", label: dict.nav.store },
    { href: "#contato", label: dict.nav.contact },
  ];

  return (
    <header className="relative z-20 w-full">
      <div className="mx-auto flex max-w-[1440px] items-center justify-end gap-3 px-5 py-3 sm:gap-4 sm:px-6 lg:justify-between lg:px-10 lg:py-4 2xl:max-w-[1800px] 2xl:px-14 2xl:py-5 min-[2560px]:max-w-[2400px] min-[2560px]:px-16 min-[2560px]:py-6 min-[3840px]:max-w-[3000px] min-[3840px]:px-20 min-[3840px]:py-8">
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? dict.closeMenu : dict.openMenu}
          className="mr-auto flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>

        <nav
          aria-label={dict.mainNav}
          className="hidden flex-1 items-center justify-center gap-x-4 xl:gap-x-6 lg:flex 2xl:gap-x-7 min-[2560px]:gap-x-9 min-[3840px]:gap-x-11"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-bebas text-xs tracking-[0.12em] transition-colors hover:text-brand-blue xl:text-sm 2xl:text-base min-[2560px]:text-xl min-[3840px]:text-2xl ${
                link.active ? "text-brand-blue" : "text-brand-gray"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#contato"
          className="hidden shrink-0 items-center justify-center rounded-full bg-brand-blue px-6 py-2.5 font-bebas text-xs tracking-[0.12em] text-white transition-opacity hover:opacity-90 xl:px-7 xl:text-sm lg:inline-flex 2xl:px-9 2xl:py-3 2xl:text-base min-[2560px]:px-11 min-[2560px]:py-3.5 min-[2560px]:text-xl min-[3840px]:px-14 min-[3840px]:py-4 min-[3840px]:text-2xl"
        >
          {dict.wantToParticipate}
        </Link>

        <Link
          href="#contato"
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-brand-blue px-4 py-2 font-bebas text-xs tracking-[0.12em] text-white transition-opacity hover:opacity-90 lg:hidden"
        >
          {dict.participate}
        </Link>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-nav"
          aria-label={dict.mobileNav}
          className="border-t border-brand-gray/20 bg-black/90 px-5 py-5 backdrop-blur-sm sm:px-6 sm:py-6 lg:hidden"
        >
          <ul className="flex flex-col gap-3.5 sm:gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-bebas text-lg tracking-[0.12em] transition-colors hover:text-brand-blue ${
                    link.active ? "text-brand-blue" : "text-brand-gray"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
