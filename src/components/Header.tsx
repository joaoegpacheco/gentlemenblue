"use client";

import Link from "next/link";
import { useState } from "react";

import type { Dictionary } from "@/i18n/get-dictionary";
import { SYMPLA_EVENT_URL } from "@/lib/links";

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
      <div className="mx-auto flex max-w-[1440px] items-center justify-end gap-[clamp(0.75rem,1.2vw,1.5rem)] px-[clamp(1.25rem,2.5vw,5rem)] py-[clamp(0.5rem,1.2vh,2rem)] lg:justify-between 2xl:max-w-[1800px] min-[2560px]:max-w-[2400px] min-[3840px]:max-w-[3000px] [@media(max-height:640px)]:py-1.5">
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
          className="hidden flex-1 items-center justify-center gap-x-[clamp(1rem,1.6vw,2.75rem)] lg:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-bebas text-[clamp(0.95rem,0.95vw+0.45vh,2.75rem)] tracking-[0.12em] transition-colors hover:text-brand-blue ${
                link.active ? "text-brand-blue" : "text-brand-gray"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href={SYMPLA_EVENT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden shrink-0 items-center justify-center rounded-full bg-brand-blue px-[clamp(1.5rem,2vw,3.5rem)] py-[clamp(0.6rem,0.9vh+0.2vw,1.25rem)] font-bebas text-[clamp(0.75rem,0.65vw+0.35vh,2rem)] tracking-[0.12em] text-white transition-opacity hover:opacity-90 lg:inline-flex"
        >
          {dict.wantToParticipate}
        </Link>

        <Link
          href={SYMPLA_EVENT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-brand-blue px-[clamp(1rem,3vw,1.5rem)] py-[clamp(0.5rem,1.2vw,0.75rem)] font-bebas text-[clamp(0.75rem,2.2vw,0.875rem)] tracking-[0.12em] text-white transition-opacity hover:opacity-90 lg:hidden"
        >
          {dict.participate}
        </Link>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-nav"
          aria-label={dict.mobileNav}
          className="border-t border-brand-gray/20 bg-black/90 px-[clamp(1.25rem,4vw,1.5rem)] py-[clamp(1.25rem,3vw,1.5rem)] backdrop-blur-sm lg:hidden"
        >
          <ul className="flex flex-col gap-[clamp(0.85rem,2.5vw,1.25rem)]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-bebas text-[clamp(1.35rem,4.5vw,1.75rem)] tracking-[0.12em] transition-colors hover:text-brand-blue ${
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
