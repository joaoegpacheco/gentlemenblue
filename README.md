# Gentlemen Blue

Landing page for **Gentlemen Blue** — the 5th edition of the annual event organized by Gentlemen Moto Club to raise awareness about prostate cancer and support healthcare institutions focused on prevention and treatment.

**Live site:** [gentlemenblue.com.br](https://gentlemenblue.com.br/)

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [pnpm](https://pnpm.io/) for package management

## Features

- **Internationalization** — Portuguese (`/pt-br`), English (`/en-us`), and Spanish (`/es-es`) with JSON dictionaries
- **Locale detection** — automatic redirect based on `Accept-Language` and `NEXT_LOCALE` cookie via `src/proxy.ts` (Next.js 16 proxy convention)
- **Responsive landing sections**
  1. **Hero** — full-viewport intro with background video, animated logo, navigation, event details, CTAs, and countdown to November 7, 2026
  2. **Movement** — “more than an event” section with character illustration and copy
  3. **Attractions** — event highlights grid with icons
  4. **Structure** — venue map, floor plan modal, and inspiring numbers stats
  5. **Sir Blue** — official mascot feature with background artwork
  6. **Sponsors** — auto-scrolling marquee of sponsor logo slots (placeholder labels)
  7. **Gallery** — horizontal carousel of photos from previous editions with a “view full gallery” CTA
  8. **Store** — official merchandise showcase with product images and “buy now” CTA
  9. **FAQ** — accordion with expandable questions and answers
  10. **Contact** — contact form UI (name, email, phone, message)
  11. **Footer** — save-the-date banner, animated logo, social links, partner logos, and copyright
- **Animated logo** — bounce animation with canvas flame particles on Hero and Footer logos; respects `prefers-reduced-motion`
- **Sponsors marquee** — infinite auto-scroll loop with wheel, drag, and touch interaction (pauses on user input)
- **Navigation** — sticky header with desktop links and mobile hamburger menu
- **Optimized assets** — WebP images in `public/images/`, icons in `public/icons/`, and hero video in `public/videos/`
- **Custom favicon** — site logo (`public/images/logo.webp`), with `/favicon.ico` redirecting to the logo

## Typography

| Section / usage | Font |
| --- | --- |
| Hero titles | Empera / Empera Vintage (local) |
| Hero UI text | Bebas Neue, Montserrat |
| Movement title | Abril Fatface |
| Movement body | Inter |
| Attractions title | Abril Fatface |
| Attractions body | Inter |
| Structure title | Abril Fatface |
| Structure body / stats | Inter, Bebas Neue |
| Sir Blue title | Bebas Neue |
| Sir Blue body | Inter |
| Sponsors title | Abril Fatface |
| Sponsors marquee | Inter |
| Gallery title | Abril Fatface |
| Gallery subtitle / CTA | Inter, Bebas Neue |
| Store title | Abril Fatface |
| Store subtitle / CTA | Inter, Bebas Neue |
| FAQ title | Abril Fatface |
| FAQ accordion | Inter |
| Contact title | Bebas Neue |
| Contact form / note | Montserrat, Inter |
| Footer save-the-date | Empera, Montserrat |
| Other UI | Poppins (available) |

Google Fonts are loaded via `next/font` in `src/lib/fonts.ts`. For Hero titles to render correctly, add the local font files:

```
public/fonts/Empera.woff2
public/fonts/EmperaVintage.woff2
```

These files are not committed to the repository; only `public/fonts/.gitkeep` is tracked.

## Getting started

### Prerequisites

- Node.js 20+
- pnpm

### Install and run

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects to `/pt-br`, `/en-us`, or `/es-es` based on your browser language.

### Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm start` | Serve production build |
| `pnpm lint` | Run ESLint |
| `pnpm lint:fix` | Run ESLint with auto-fix |

## Project structure

```
src/
├── app/
│   ├── [locale]/              # Locale-scoped routes (pt-br, en-us, es-es)
│   │   ├── layout.tsx         # Layout, metadata, fonts
│   │   └── page.tsx           # Home page
│   ├── globals.css            # Global styles, design tokens, and animations
│   └── layout.tsx             # Root layout passthrough
├── components/
│   ├── Hero.tsx               # Hero section with background video
│   ├── Header.tsx             # Site navigation (desktop + mobile)
│   ├── Countdown.tsx          # Event countdown timer
│   ├── AnimatedLogo.tsx       # Logo with bounce + flame canvas (client component)
│   ├── Movement.tsx           # Movement section
│   ├── Attractions.tsx        # Attractions section
│   ├── Structure.tsx          # Event structure + stats
│   ├── StructureBlueprintDialog.tsx  # Floor plan modal
│   ├── SirBlue.tsx            # Sir Blue mascot section
│   ├── Sponsors.tsx           # Sponsors section
│   ├── SponsorsMarquee.tsx    # Auto-scrolling sponsor marquee (client component)
│   ├── Gallery.tsx            # Gallery section
│   ├── GalleryCarousel.tsx    # Gallery horizontal carousel (client component)
│   ├── Store.tsx              # Official store / merchandise section
│   ├── Faq.tsx                # FAQ section
│   ├── FaqAccordion.tsx       # FAQ accordion (client component)
│   ├── Contact.tsx            # Contact form section
│   └── Footer.tsx             # Footer with social links and partners
├── i18n/
│   ├── config.ts              # Locale configuration
│   ├── get-dictionary.ts      # Dictionary loader
│   ├── get-locale.ts          # Accept-Language detection
│   └── dictionaries/          # pt-br.json, en-us.json, es-es.json
├── lib/
│   ├── fonts.ts               # Google Font definitions
│   └── logoFlameCanvas.ts     # Canvas flame particle effect for AnimatedLogo
└── proxy.ts                   # Locale redirect proxy (Next.js 16)

public/
├── images/                    # WebP images (hero logo, movement, structure, gallery, store, footer, partners)
├── icons/                     # WebP icons (attractions, stars, social) and FAQ SVG icons
├── videos/                    # Hero background video
└── fonts/                     # Local Empera font files (required for Hero titles)
```

## Assets

| Path | Usage |
| --- | --- |
| `public/images/logo.webp` | Logo and favicon |
| `public/videos/hero-video.mp4` | Hero background video |
| `public/images/movement-character.webp` | Movement section character |
| `public/images/structure-blueprint.webp` | Structure section background / floor plan |
| `public/images/structure-map.webp` | Isometric venue map |
| `public/images/sir-blue-bg.webp` | Sir Blue section background |
| `public/images/gallery-placeholder.webp` | Gallery carousel slide placeholder |
| `public/images/store-products-grid.webp` | Store products overview |
| `public/images/store-shirt-details.webp` | Store t-shirt details and measurements |
| `public/images/footer-banner.webp` | Footer save-the-date banner |
| `public/images/weareon.webp` | We Are On partner logo |
| `public/images/j2p.webp` | J2P partner logo |
| `public/icons/*.webp` | Attraction card icons, section stars, and social media icons |
| `public/icons/faq-expand.svg` | FAQ accordion expand icon |
| `public/icons/faq-collapse.svg` | FAQ accordion collapse icon |

## Design tokens

Brand colors are defined in `src/app/globals.css`:

- **Blue** — `#0E7AEB`
- **Gray** — `#CCCCCC`
- **Dark background** — `#0a1628` (Hero), `#000000` (sections)

Logo and marquee animations are also defined in `globals.css` (`logo-jump`, `logo-animate-bounce`, `sponsors-marquee-scroller`).

## License

MIT — see [package.json](package.json).

## Author

João Pacheco
