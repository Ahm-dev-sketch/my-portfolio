# Mutiah Ulfa Sitompul — Portfolio

Bilingual (English / Indonesian), single-page professional portfolio for Mutiah Ulfa Sitompul: Information Systems graduate with experience in administration, HR operations, data management, and UI/UX and frontend work.

## Stack

- Next.js 16 (App Router, React Server Components)
- TypeScript
- Tailwind CSS v4 (CSS-first theme tokens in `src/app/globals.css`)
- Motion for React (`motion/react`) — short, purposeful animation
- Lucide React icons
- `next/font` (Inter)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

```bash
npm run dev     # development server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
npx tsc --noEmit  # type check
```

No environment variables are required. The site is fully static.

## Project structure

```text
src/
├── app/                  # layout, page, global styles, metadata, OG image
├── components/
│   ├── layout/           # Navbar, Footer
│   ├── sections/         # Hero, About, Experience, Projects, Education, Skills, Contact
│   ├── ui/               # Button, SectionHeading, LanguageSwitcher, ProjectCard, Reveal
│   └── providers/        # LanguageProvider
├── data/
│   ├── portfolio.ts      # profile, experience, projects, education, skills
│   └── translations.ts   # all English + Indonesian copy
├── hooks/                # useLanguage
├── lib/                  # small utilities
└── types/                # shared types
```

## Content editing

All content lives in two typed files:

- `src/data/portfolio.ts` — factual records (experience, projects, education, skill groups).
- `src/data/translations.ts` — interface copy and section text for both languages.

`TranslationContent` in `src/types/portfolio.ts` is the contract: both `en` and `id` must implement every field, so a missing translation is a type error rather than a silent fallback.

Localized records use `Record<Language, string>` (`{ en, id }`) so a record cannot be translated in one language only.

## Bilingual behavior

- Default language: English.
- The `EN / ID` switcher updates all copy without a page reload and persists the choice in `localStorage`.
- `LanguageProvider` keeps `<html lang>` in sync with the active language.

## Accessibility

- Semantic landmarks and heading order, skip link to main content.
- Visible `:focus-visible` states on every interactive element.
- Keyboard-operable navigation, mobile menu closes on Escape / backdrop / link selection.
- `prefers-reduced-motion` disables reveal and scroll animation.
- No information conveyed by color alone; external links announce that they open a new tab.

## Deployment (Vercel)

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Keep the detected defaults: framework Next.js, build `npm run build`, output handled automatically.
4. Deploy. No environment variables or database are needed.

Any Node-compatible static host works as well (`npm run build && npm run start`).

## Security

Security headers (CSP, HSTS, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, frame protection, COOP) are applied in `next.config.ts`. The CSP profile is selected by Next's config **phase**, not `NODE_ENV` — see the implementation note before changing it. Audit findings and residual risks are documented in [`docs/security-audit-report.md`](docs/security-audit-report.md).

## Content integrity

The portfolio deliberately contains no invented employers, job titles, metrics, certificates, awards, testimonials, project results, or contact details. Organizational positions are labeled as organizational roles. Project visuals are abstract type-based graphics, not screenshots or stock imagery. No resume download is offered because no verified PDF exists.
