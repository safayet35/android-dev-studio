# ARCHITECTURE — Android Dev Studio

## 1. Overview

Plain Vite SPA with React Router. No SSR, no data fetching, no backend. Flow: `index.html` → `src/main.tsx` (`StrictMode` + `BrowserRouter`) → `src/App.tsx` (shell + `Routes`) → page in `src/pages/`. All page data imported statically from `src/lib/content.ts`.

## 2. Routing

- React Router `BrowserRouter` (history API, clean URLs). Host must serve `index.html` for unknown paths — see `public/_redirects` (Cloudflare Pages SPA fallback).
- `src/App.tsx`: `ScrollToTop` (scroll to top on pathname change, jump to `#hash` element when present), `RouteErrorBoundary` (reports via `reportLovableError`, retry remounts children), `NotFound` on `path="*"`.

| Path | File | Notes |
|---|---|---|
| `/` | `src/pages/HomePage.tsx` | Hero + `HardwareChecker`, links to `/setup#<slug>` via `to={{pathname, hash}}` |
| `/setup` | `src/pages/SetupPage.tsx` | 6 modules / 20 steps, per-module `id={slug}` anchors |
| `/tools` | `src/pages/ToolsPage.tsx` | 8 comparison cards |
| `/terminal` | `src/pages/TerminalPage.tsx` | `TerminalSim` + explainer `Card` |
| `/troubleshooting` | `src/pages/TroubleshootingPage.tsx` | Search + tag filter + accordion |
| `/glossary` | `src/pages/GlossaryPage.tsx` | Search + category filter, sorted |

## 3. Components

- `PageHeader({eyebrow,title,intro})` — bordered card header used by 5 pages.
- `SiteNav.tsx` — `SiteNav` (sticky, `NavLink` with `isActive` → `text-primary` vs `text-muted-foreground`) + `SiteFooter`.
- `CommandBlock({commands:string[]})` — terminal-styled rows with `$` prefix + clipboard copy (1600ms check feedback, timer cleanup).
- `HardwareChecker` — `Answers{ram,storage,android,chip}` + `verdict()` score→`Ready/Good/Limited` + `FilterChip` buttons. Result `role=status`, focused on check, `scroll-mt-24` anchor.
- `TerminalSim` — `respond(cmd, files):Line[]` string matcher + `lines/value` state, `role=log aria-live=polite` output, form submit.
- `FilterChip/SearchInput/Card` — shared primitives in `src/components/` (not `ui/`).
- No `ui/` folder — shadcn/Radix set was deleted (zero live importers). Shared primitives live directly in `src/components/`.

## 4. State & data

- `lib/content.ts`: `Step{id,title,body,commands?,note?}`, `Module{slug,title,tagline,minutes,steps}`, `ToolPair{task,pc,android,gap,detail}`, `Issue{id,title,symptoms,fix,commands?,tags[]}`, glossary `{term,definition,category}`. Counts: 6 modules / 20 steps / 8 pairs / 9 issues / 20 terms.
- `hooks/use-progress.ts`: `done:string[]` + `loaded` + `toggle/reset/isDone`, localStorage `awd-progress-v1`, functional updates, shape-validated parse.
- `hooks/use-document-meta.ts`: sets `document.title` + description/`og:title`/`og:description` per page, restores on unmount. No SSR — SEO is client-side.
- `hooks/use-mobile.tsx` (`useIsMobile`) — exists, unused.
- `lib/lovable-error-reporting.ts`: `reportLovableError` used by the error boundary.

## 5. Styling / layout

- `styles.css`: Tailwind v4 (`@import tailwindcss`, `@theme inline` token bridge), dark-only `:root` oklch palette + `--nav-h: 57px`, `grid-backdrop` utility. Fonts via Google Fonts link in `index.html`.
- Patterns: `max-w-3xl/5xl` centered, `rounded-2xl border-border bg-card`, mobile-first `sm:` breakpoints, overflow guards (`min-w-0`, `truncate`, `minmax(0,1fr)` grids).

## 6. Where to implement new features

- New page → `src/pages/<Name>.tsx` plain component + `useDocumentMeta` + `<Route path>` in `App.tsx`. Never create `src/routes/`, file-based routing is gone.
- New tutorial content → add `Module/Step` objects in `lib/content.ts` (keep `id` unique, kebab-case, never rename old ones).
- New troubleshooting/glossary entry → append to `issues`/`glossary` arrays (tags lowercase, sorted where applicable).
- New interactive widget → `src/components/<Name>.tsx`, local state only; reuse `CommandBlock`/`FilterChip`/`SearchInput`/`Card`.
- Global layout/SEO → `index.html` (site meta) + `App.tsx` (shell). Per-page SEO → `useDocumentMeta`.
- Styling → extend `styles.css` tokens/utilities, use existing `bg-background/card/secondary/terminal` scale.
