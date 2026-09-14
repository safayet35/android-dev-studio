# CHANGELOG — Android Dev Studio

Format: Keep a Changelog (`Added/Changed/Fixed/Removed`). Dates UTC.

## [Unreleased — cleanup]

### Removed

- `src/components/ui/*` (46 files), `src/lib/utils.ts`, `src/hooks/use-mobile.tsx`, `components.json`; ~40 unused packages (Radix set, form/chart/date/carousel/toast libs, cva/clsx/tailwind-merge, tw-animate-css); dead CSS tokens, `server-only` eslint rule.
- Bundle effect: CSS ~76kB → ~22kB. Verified `tsc`/build clean, all routes boot.

## [Unreleased — Acode extensions]

### Added

- `acodeExtensions` (6 placeholders) + `ExtensionCard` grid inside the `acode-plugins` setup step; icons in `public/extensions/*.svg` (lazy-loaded, letter-avatar fallback).

## [Unreleased — npm-only content]

### Changed

- Replaced all pnpm references with npm: `node-pnpm` step is now "Speed up npm installs", React/Next.js scaffolds use `npm create`/`npm install`/`npm run`, `slow-install` fix uses `npm cache verify`, `TerminalSim` is npm-only, pnpm glossary term deleted (19 terms). Step `id: node-pnpm` kept so saved progress survives.

## [Unreleased — React Router migration]

### Changed (BREAKING: no SSR)

- Replaced TanStack Start/Router SSR with a static React Router SPA: `index.html` + `src/main.tsx` (`BrowserRouter`) + `src/App.tsx` (`Routes`, `ScrollToTop`, error boundary, `*` 404). Routes moved `src/routes/*` → `src/pages/*Page.tsx` as plain components.
- Per-page SEO is now client-side via `useDocumentMeta` (title/description/og tags); site meta lives in `index.html`.
- `SiteNav` uses `NavLink isActive`; home module cards link via `to={{pathname: "/setup", hash: slug}}`.
- `vite.config.ts` is plain Vite (`react`, `tailwindcss`, `tsconfigPaths`); scripts are plain `vite` commands; build output is static `dist/` + `public/_redirects` SPA fallback.

### Removed

- `@tanstack/react-router`, `@tanstack/react-start`, `@tanstack/router-plugin`, `@tanstack/react-query` (zero hooks used), `nitro`, `@lovable.dev/vite-tanstack-config`.
- `src/routeTree.gen.ts`, `src/router.tsx`, `src/start.ts`, `src/server.ts`, `src/routes/*`, `src/lib/error-capture.ts`, `src/lib/error-page.ts`.

### Added

- `react-router-dom`, `src/hooks/use-document-meta.ts`, `public/_redirects`.

### Verified

- `tsc --noEmit` clean, new-file eslint clean, `vite build` clean (static `dist/`), zero TanStack refs in `src`/`index.html`/`vite.config`/`package.json`.

## [Unreleased — previous refactor]

### Fixed

- `CommandBlock`: unique row keys, timer cleanup on unmount, clipboard availability guard.
- `useProgress`: functional `toggle` (no stale closure), `JSON.parse` shape validation.
- `TerminalSim`: file list in `useRef` (no module singleton), stable row keys, fixed scroll, `role=log aria-live=polite`.
- `setup`: sticky progress uses `top-[var(--nav-h)]` token instead of magic `57px`.
- `SiteNav`: active link keeps base classes, active state uses `text-primary`.
- `HardwareChecker`: `scroll-mt-24` anchor, result focus on check.

### Added

- `src/components/FilterChip.tsx`, `SearchInput.tsx`, `Card.tsx`; migrated `HardwareChecker`, `troubleshooting`, `glossary`, `terminal`.
- `public/sitemap.xml` (prefix locs with production origin on deploy); robots `Sitemap:` ref.
- `__root`: `theme-color`, `og:image`, skip-link, `main#content`.
- `package.json`: `typecheck: tsc --noEmit`; renamed to `android-dev-studio`.

### Verified

- Touched-file eslint clean, `tsc --noEmit` clean, `vite build` clean. Full-repo eslint still reports pre-existing prettier drift in untouched files (`content.ts`, `index.tsx`, `tools.tsx`, etc.).

## [Docs] — documentation system

- Added: `AGENTS.md` (expanded), `PRD.md`, `ARCHITECTURE.md`, `TECH_STACK.md`, `TASKS.md`, `CHANGELOG.md`. No source changes.

## [0.1.0] — 2026-09-13 (baseline audit)

Current codebase snapshot — no behavior changes in this entry.

### Added

- 6 file routes: `/` (hero + `HardwareChecker` + module grid), `/setup` (6 modules / 20 steps + progress), `/tools` (8 `toolPairs`), `/terminal` (`TerminalSim` + reading guide), `/troubleshooting` (9 `issues` search/filter), `/glossary` (20 terms search/filter).
- Components: `PageHeader`, `SiteNav` + `SiteFooter`, `CommandBlock` (clipboard), `HardwareChecker` (score → Ready/Good/Limited), `TerminalSim` (string-matched mock).
- Data: `src/lib/content.ts` (`modules`, `allSteps`, `toolPairs`, `issues`, `glossary`); `src/hooks/use-progress.ts` (`awd-progress-v1`); `src/hooks/use-mobile.tsx` (unused `useIsMobile`).
- Shell: `__root.tsx` (nav/outlet/footer, 404/500, per-route `head()` SEO), `router.tsx` (`QueryClient`, unused queries), `start.ts` (error + CSRF middleware), `server.ts` (SSR error normalization), `routeTree.gen.ts` (generated).
- Styling: Tailwind v4 dark-only oklch theme, `Space Grotesk` / `DM Sans` / `JetBrains Mono`, `grid-backdrop` utility; 46 shadcn `new-york` `ui/*` files (mostly unused).
- Static: `public/robots.txt` (allow-all), `public/favicon.ico`.

### Notes

- Stack: `react@19.2`, `@tanstack/react-start@1.168.32`, `@tanstack/react-router@1.170.18`, `vite@8.1.5`, `tailwindcss@4.2.1`, `@lovable.dev/vite-tanstack-config@2.20.0`, `nitro@3-beta` (Cloudflare default).
- No backend, DB, auth, API, tests, typecheck, or CI. Scripts: `dev, build, build:dev, preview, lint, format`.
- Known issues recorded in `TASKS.md` (P0: `CommandBlock` key, sticky offset, `activeProps`, `TerminalSim` singleton, `useProgress` closure).
