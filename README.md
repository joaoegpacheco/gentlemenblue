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
- **Locale detection** — automatic redirect based on `Accept-Language` and `NEXT_LOCALE` cookie via `src/proxy.ts`
- **Responsive landing sections**
  1. **Hero** — full-viewport intro with navigation, event details, CTAs, and countdown
  2. **Movement** — “more than an event” section with character illustration and copy
  3. **Attractions** — event highlights grid with icons
  4. **Structure** — venue map, floor plan modal, and inspiring numbers stats
  5. **Sir Blue** — official mascot feature with background artwork
  6. **Sponsors** — sponsors, supporters, and official partners logo grid
- **Optimized assets** — WebP images in `public/images/` and icons in `public/icons/`
- **Custom favicon** — site logo (`public/images/logo.webp`)

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
| Sponsors body | Inter |
| Other UI | Poppins (available) |

Google Fonts are loaded via `next/font` in `src/lib/fonts.ts`. For Hero titles to render correctly, add the local font files:

```
public/fonts/Empera.woff2
public/fonts/EmperaVintage.woff2
```

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
│   ├── globals.css            # Global styles and design tokens
│   └── layout.tsx             # Root layout passthrough
├── components/
│   ├── Hero.tsx               # Hero section
│   ├── Header.tsx             # Site navigation
│   ├── Countdown.tsx          # Event countdown timer
│   ├── Movement.tsx           # Movement section
│   ├── Attractions.tsx        # Attractions section
│   ├── Structure.tsx          # Event structure + stats
│   ├── StructureBlueprintDialog.tsx  # Floor plan modal
│   ├── SirBlue.tsx            # Sir Blue mascot section
│   └── Sponsors.tsx           # Sponsors section
├── i18n/
│   ├── config.ts              # Locale configuration
│   ├── get-dictionary.ts      # Dictionary loader
│   ├── get-locale.ts          # Accept-Language detection
│   └── dictionaries/          # pt-br.json, en-us.json, es-es.json
├── lib/
│   └── fonts.ts               # Google Font definitions
└── proxy.ts                   # Locale redirect middleware

public/
├── images/                    # WebP images (hero, movement, structure, sir-blue)
├── icons/                     # WebP icons (attractions, stars)
└── fonts/                     # Local Empera font files (required for Hero)
```

## Assets

| Path | Usage |
| --- | --- |
| `public/images/logo.webp` | Logo and favicon |
| `public/images/hero-bg.webp` | Hero background |
| `public/images/movement-character.webp` | Movement section character |
| `public/images/structure-blueprint.webp` | Structure section background / floor plan |
| `public/images/structure-map.webp` | Isometric venue map |
| `public/images/sir-blue-bg.webp` | Sir Blue section background |
| `public/icons/*.webp` | Attraction card icons and section stars |

## Design tokens

Brand colors are defined in `src/app/globals.css`:

- **Blue** — `#0E7AEB`
- **Gray** — `#CCCCCC`

## License

MIT — see [package.json](package.json).

## Author

João Pacheco
