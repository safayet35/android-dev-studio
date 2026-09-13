# TASKS — Android Dev Studio

## Completed (verified in codebase)

- [x] 6 routes with `head()` SEO: `/`, `/setup`, `/tools`, `/terminal`, `/troubleshooting`, `/glossary`
- [x] App shell: `SiteNav`, `SiteFooter`, 404, 500 (`__root.tsx`)
- [x] `HardwareChecker` scoring (RAM/storage/Android/chip → 3 levels + notes)
- [x] 6 setup modules / 20 steps with `CommandBlock` copy (`content.ts`, `setup.tsx`)
- [x] `useProgress` localStorage persistence (`awd-progress-v1`)
- [x] 8 `toolPairs` comparison cards (`tools.tsx`)
- [x] `TerminalSim` mock (`help, pkg, node, npm, git, ls, pwd, whoami, vite, dev, clear`) — npm-only
- [x] pnpm → npm swap (step `node-pnpm` retitled, all commands npm-only, pnpm glossary term deleted; step `id` kept for saved progress)
- [x] 9 `issues` search + tag + accordion (`troubleshooting.tsx`)
- [x] 20-term `glossary` search + category + sort (`glossary.tsx`)
- [x] Dark-only Tailwind v4 oklch theme + `grid-backdrop` + mobile-first overflow guards
- [x] SSR plumbing: `start.ts` (error+CSRF middleware), `server.ts` (h3 error normalization), `router.tsx`
- [x] `robots.txt` allow-all, `favicon.ico`

## Current (documentation baseline)

- [x] Repository audit (read-only, no source changes)
- [x] `AGENTS.md` / `PRD.md` / `ARCHITECTURE.md` / `TECH_STACK.md` / `TASKS.md` / `CHANGELOG.md`

## Completed — Acode extension section

- [x] `AcodeExtension` type + 6 placeholder entries in `content.ts`; `ExtensionCard` with image fallback; grid inside `acode-plugins` step; `public/extensions/*.svg` placeholders (263B each, lazy-loaded)

## Completed — React Router migration (static SPA, BrowserRouter)

- [x] Added `react-router-dom`, `index.html`, `src/main.tsx`, `src/App.tsx` (`ScrollToTop`, error boundary, `*` 404)
- [x] Migrated 6 routes to `src/pages/*Page.tsx` plain components + `useDocumentMeta`
- [x] `SiteNav` on `NavLink isActive`; home hash links via `to={{pathname, hash}}`
- [x] Plain `vite.config.ts` (`react`, `tailwindcss`, `tsconfigPaths`); scripts are plain `vite` commands
- [x] Deleted `routeTree.gen.ts`, `router.tsx`, `start.ts`, `server.ts`, `routes/*`, `error-capture/page`
- [x] Removed `@tanstack/*` (4), `nitro`, `@lovable.dev/vite-tanstack-config`; reinstall (-79 pkgs)
- [x] Added `public/_redirects` SPA fallback; zero TanStack refs in `src`/`index.html`/`vite.config`/`package.json`
- [x] Verified: `tsc` clean, new-file eslint clean, `vite build` → static `dist/`

## Completed — refactor (approved scope)

- [x] P0: `CommandBlock` unique keys + timer cleanup + clipboard guard
- [x] P0: `setup.tsx` sticky uses `top-[var(--nav-h)]` (`--nav-h: 57px` in `styles.css`)
- [x] P0: `SiteNav` `activeProps` keeps base classes, active uses `text-primary`
- [x] P0: `TerminalSim` files in `useRef`, stable keys, `scrollIntoView(false)`, `role=log aria-live`
- [x] P0: `useProgress` functional `toggle` + `JSON.parse` shape validation (key `awd-progress-v1` unchanged)
- [x] Dedupe: new `FilterChip` / `SearchInput` / `Card` in `src/components/`; migrated `HardwareChecker`, `troubleshooting`, `glossary`, `terminal`
- [x] `package.json`: renamed to `android-dev-studio`, added `typecheck: tsc --noEmit` (no dep changes)
- [x] SEO/a11y minimal: `theme-color` + `og:image` in `__root`, skip-link + `main#content`, `public/sitemap.xml` + robots `Sitemap:`, `HardwareChecker` `scroll-mt-24` + result focus
- [x] Verified: touched-file eslint clean, `tsc --noEmit` clean, `vite build` clean

## Planned — remaining (explicitly deferred)

- [ ] Prune `src/components/ui/*` (~40 unused of 46) and unused deps (`recharts, react-day-picker, embla-carousel, vaul, cmdk, zod, react-hook-form, input-otp, date-fns, sonner`)
- [ ] Consider enabling `noUnusedLocals` + `@typescript-eslint/no-unused-vars`
- [ ] Replace generic `README.md` Lovable template with real setup/deploy docs

## Planned — P2 polish (remaining)

- [ ] SEO: per-route `canonical` with production origin, `manifest`, JSON-LD (prefix `sitemap.xml` locs on deploy)
- [ ] A11y: larger accordion targets (skip-link, `aria-live`, result focus done)
- [ ] `HardwareChecker`: reset `checked` on answer change; reconsider defaults (4/16/13/arm64)
- [ ] Fonts: `display=swap` already set; consider self-hosting to remove render-blocking Google Fonts
- [ ] Optional features: deep-linkable steps, more sim commands (`cd, mkdir, pnpm install`), PWA/offline
