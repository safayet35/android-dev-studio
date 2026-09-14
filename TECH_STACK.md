# TECH_STACK — Android Dev Studio

Based on `package.json`, `vite.config.ts`, `tsconfig.json`, `components.json`, `index.html`, `src/*`.

## 1. Core

| Layer | Package / version | Use |
|---|---|---|
| UI | `react@^19.2.0`, `react-dom@^19.2.0` | All pages/components, `react-jsx` |
| Routing | `react-router-dom@^7.18.3` | `BrowserRouter`, `Routes`/`Route`, `Link`/`NavLink`, `useLocation` (`ScrollToTop`) |
| Icons | `lucide-react` | `Check`, `Copy` only |
| Build | `vite@8.1.5`, `@vitejs/plugin-react@^5.2.0`, `vite-tsconfig-paths@^6.0.2` | Dev/build/preview (`vite`, `vite build`, `vite preview`), `@/*` → `src/*` |
| TS | `typescript@^5.8.3`, `target ES2022`, `moduleResolution Bundler`, `strict:true`, `@/*` → `src/*` | `tsconfig.json` |
| Lint/format | `eslint@^9.32.0`, `typescript-eslint`, `eslint-plugin-react-hooks/refresh/prettier`, `prettier@^3.7.3` | `npm run lint`, `npm run typecheck` (`tsc --noEmit`), `npm run format` |

No SSR, no Nitro, no TanStack packages, no react-query. Output is a static SPA in `dist/`; `public/_redirects` provides the SPA fallback on Cloudflare Pages.

## 2. Styling / UI

- `tailwindcss@^4.2.1`, `@tailwindcss/vite@^4.2.1`, `tw-animate-css@^1.3.4`, `clsx@^2.1.1`, `tailwind-merge@^3.5.0`, `class-variance-authority@^0.7.1`
- Fonts (static links in `index.html`): `Space Grotesk` (display), `DM Sans` (sans), `JetBrains Mono` (mono)

## 3. Removed in cleanup (were installed but unused)

Deleted `src/components/ui/*` (46 shadcn files) and pruned ~40 packages: all `@radix-ui/*`, `@hookform/resolvers`, `class-variance-authority`, `clsx`, `cmdk`, `date-fns`, `embla-carousel-react`, `input-otp`, `react-day-picker`, `react-hook-form`, `react-resizable-panels`, `recharts`, `sonner`, `tailwind-merge`, `tw-animate-css`, `vaul`, `zod`, plus `src/lib/utils.ts` (`cn()`), `src/hooks/use-mobile.tsx`, `components.json`. CSS shrank ~76kB → ~22kB.

## 4. Scripts & targets

- `dev: vite`, `build: vite build`, `build:dev: vite build --mode development`, `preview: vite preview`, `lint: eslint .`, `typecheck: tsc --noEmit`, `format: prettier --write .`
- `overrides: { rolldown: 1.2.1 }`. No test/CI scripts.
- Removed in the React Router migration: `@tanstack/react-router`, `@tanstack/react-start`, `@tanstack/router-plugin`, `@tanstack/react-query` (zero hooks used), `nitro`, `@lovable.dev/vite-tanstack-config`, `src/routeTree.gen.ts`, `src/router.tsx`, `src/start.ts`, `src/server.ts`, `src/routes/*`, `src/lib/error-capture.ts`, `src/lib/error-page.ts`.
