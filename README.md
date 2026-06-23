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

- **Internationalization** — Portuguese (`/pt-br`) and English (`/en-us`) with JSON dictionaries
- **Locale detection** — automatic redirect based on `Accept-Language` and `NEXT_LOCALE` cookie via `src/proxy.ts`
- **Responsive landing sections**
  - **Hero** — full-viewport intro with navigation, event details, CTAs, and countdown
  - **Movement** — “more than an event” section with character illustration and copy
- **Optimized assets** — WebP images in `public/images/`
- **Custom favicon** — site logo (`public/images/logo.webp`)

## Typography

| Usage | Font |
| --- | --- |
| Hero titles | Empera / Empera Vintage (local) |
| Hero UI text | Bebas Neue, Montserrat |
| Movement title | Abril Fatface |
| Movement body | Inter |
| Other UI | Poppins (available) |

Google Fonts are loaded via `next/font` in `src/lib/fonts.ts`. For the Hero titles to render correctly, add the local font files:

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

Open [http://localhost:3000](http://localhost:3000). The app redirects to `/pt-br` or `/en-us` based on your browser language.

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
│   ├── [locale]/          # Locale-scoped routes (pt-br, en-us)
│   │   ├── layout.tsx     # Layout, metadata, fonts
│   │   └── page.tsx       # Home page
│   ├── globals.css        # Global styles and design tokens
│   └── layout.tsx         # Root layout passthrough
├── components/
│   ├── Hero.tsx           # Hero section + header
│   ├── Header.tsx         # Site navigation
│   ├── Countdown.tsx      # Event countdown timer
│   └── Movement.tsx       # Second section
├── i18n/
│   ├── config.ts          # Locale configuration
│   ├── get-dictionary.ts  # Dictionary loader
│   ├── get-locale.ts      # Accept-Language detection
│   └── dictionaries/      # pt-br.json, en-us.json
├── lib/
│   └── fonts.ts           # Google Font definitions
└── proxy.ts               # Locale redirect middleware

public/
├── images/                # WebP assets (logo, hero, movement)
└── fonts/                 # Local Empera font files (required for Hero)
```

## Design tokens

Brand colors are defined in `src/app/globals.css`:

- **Blue** — `#0E7AEB`
- **Gray** — `#CCCCCC`

## License

MIT — see [package.json](package.json).

## Author

João Pacheco
