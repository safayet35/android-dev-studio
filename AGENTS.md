<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# AGENTS.md — Android Dev Studio

Static educational site: turn an Android phone into a web dev machine (Termux, Acode, Node, Git, React/Vite, Next.js). No backend, DB, auth, or API.

## Commands

- `npm run dev` — local dev (plain Vite SPA + React Router)
- `npm run build` — static production build to `dist/`
- `npm run build:dev` — build in development mode
- `npm run preview` — preview built output
- `npm run lint` — eslint (must pass before push)
- `npm run typecheck` — `tsc --noEmit`
- `npm run format` — prettier write
- No test or CI scripts exist. Do not assume them.

## Structure

- `index.html` — SPA entry (site-wide meta, `#root`, `/src/main.tsx`).
- `src/main.tsx` — `StrictMode` + `BrowserRouter` + `App` + `styles.css`.
- `src/App.tsx` — app shell (`SiteNav`, `Routes`, `SiteFooter`, `ScrollToTop`, 404 `*` route, error boundary).
- `src/pages/HomePage.tsx|SetupPage.tsx|ToolsPage.tsx|TerminalPage.tsx|TroubleshootingPage.tsx|GlossaryPage.tsx` — the only 6 pages. Plain components using `useDocumentMeta`.
- `src/components/PageHeader.tsx|SiteNav.tsx|CommandBlock.tsx|HardwareChecker.tsx|TerminalSim.tsx|FilterChip.tsx|Card.tsx|SearchInput.tsx|ExtensionCard.tsx` — custom components. Reuse these, don't duplicate.
- `src/components/ui/*` — 46 shadcn new-york files, ~40 unused. Do not add new ones without removing unused.
- `src/lib/content.ts` — ALL page data: `modules` (6, 20 steps), `toolPairs` (8), `issues` (9), `glossary` (20). Edit content here.
- `src/hooks/use-progress.ts` — localStorage key `awd-progress-v1`. Step `id`s are stable API; never rename.
- `src/hooks/use-document-meta.ts` — per-page `document.title` + description/og tags (client-side; no SSR).
- `src/styles.css` — Tailwind v4 dark-only oklch tokens + `grid-backdrop` utility + `--nav-h`.
- `public/robots.txt|sitemap.xml|_redirects|favicon.ico` — static only (`_redirects` gives SPA fallback on Cloudflare Pages).

## Safe-modify rules

1. `vite.config.ts` is plain Vite (`react`, `tailwindcss`, `tsconfigPaths` plugins). Do not re-add TanStack Start/Router, Nitro, or the Lovable wrapper.
2. NEVER rewrite pushed git history (see Lovable banner). Separate commits, no amend/squash/force-push.
3. NEVER rename step `id`s in `content.ts` or storage key `awd-progress-v1` — breaks saved user progress.
4. Routes: add file in `src/pages/*.tsx` as a plain component + `<Route path>` in `App.tsx` + `useDocumentMeta({title, description, ogTitle, ogDescription})`. Do not create `src/routes/`, `src/pages/` nesting, `app/`, `_app`.
5. Styling: use existing tokens (`bg-background/card/secondary/terminal`, `text-foreground/muted-foreground/primary/accent`, `border-border`). Dark-only; no light mode. Use `min-w-0/truncate` + `grid-cols-[minmax(0,1fr)_auto]` to prevent mobile overflow (mobile-first).
6. State: local `useState/useMemo` only. No react-query. `useIsMobile` in `use-mobile.tsx` is currently unused.
7. Content edits: keep types `Step/Module/ToolPair/Issue` in `content.ts`. Commands are `string[]` rendered by `CommandBlock`.
8. A11y: keep skip-link, `aria-pressed/expanded/label`, `role=log/progressbar/status`, `fieldset/legend` patterns on interactive controls.
9. SEO is client-side (no SSR): site meta lives in `index.html`; every page must call `useDocumentMeta` (see `HomePage.tsx`).
10. Verify with `npm run lint` and `npm run typecheck` after changes. No dead deps: `recharts`, `react-day-picker`, `embla-carousel`, `vaul`, `cmdk`, `zod`, `react-hook-form` are installed but unused — do not import them for new features.
