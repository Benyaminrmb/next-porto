# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with Turbopack (http://localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Start production server
```

## Architecture

This is a Next.js 15 portfolio site using the App Router with internationalization (English/Farsi).

### Routing Structure

```
app/
├── layout.tsx              # Root layout (fonts, metadata)
├── assets/globals.scss     # Global styles with Tailwind utilities
└── [locale]/               # Dynamic locale routing (en, fa)
    ├── layout.tsx          # Locale layout with NextIntlClientProvider
    ├── client-layout.tsx   # Client wrapper (ThemeProvider, Header, Footer)
    └── page.tsx            # Home page composing section components
```

### Key Directories

- **components/sections/**: Page sections (hero-clean, about-clean, projects-clean, etc.)
- **components/ui/**: shadcn/ui components (Button, Card, Badge, Tabs, etc.)
- **components/main/**: Layout components (header, footer)
- **messages/**: Translation files (en.json, fa.json)
- **data/data.json**: Portfolio content (projects, experience, contact info)
- **store/app.ts**: Zustand store for drawer state and nav links
- **lib/data.ts**: Server-side data loading with TypeScript types

### Internationalization (next-intl)

- Locales: `en` (default), `fa` (RTL)
- Config: `i18n.ts` defines locale loading
- Middleware: `middleware.ts` handles locale routing
- Translations accessed via `useTranslations()` hook

### Styling Patterns

Custom utility classes in `globals.scss`:
- `.section-padding` - Consistent vertical spacing
- `.section-container` - Max-width container with responsive padding

Theme uses CSS custom properties (HSL) with `next-themes` for dark mode toggle.

### Data Flow

1. `lib/data.ts` loads `data/data.json` server-side
2. Page components receive data as props
3. Section components render with typed props

### Tech Stack

- Next.js 15 (App Router, Turbopack)
- TypeScript
- Tailwind CSS + SCSS
- shadcn/ui (Radix UI primitives)
- Zustand (minimal state)
- next-intl (i18n)
- next-themes (dark mode)
- Framer Motion + GSAP (animations)
- Lucide React + Tabler Icons
