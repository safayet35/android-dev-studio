# PRD — Code With Android (CWA)

## 1. Goal

Code With Android by Safayet — interactive, mobile-first guide that takes a user from a blank Android phone to a running web app using only the phone. Teaches web development *using* an Android phone, not Android app development. No laptop required.

Source of truth: `README.md` + implemented routes in `src/pages/` + `src/App.tsx`.

## 2. Users

- Phone-only learners (no PC, low budget, students).
- Beginners who need copy-paste commands, plain-language definitions, and safe practice.
- Constraints assumed: 2–12 GB RAM, limited storage, small screen, Android 7–15, arm64/arm32.

## 3. Features (as implemented)

| Feature | Route | Data source | Status |
|---|---|---|---|
| Hero + module overview + tool teaser | `/` (`HomePage.tsx`) | `modules`, `toolPairs` | Done |
| Hardware compatibility checker (RAM/storage/Android/chip → Ready/Good/Limited + notes) | `/#checker` (`HardwareChecker.tsx`) | local scoring `verdict()` | Done |
| Setup tutorials: Termux, Node, Acode, Git, React+Vite, Next.js — 20 steps with copyable commands + notes | `/setup` (`SetupPage.tsx`) | `modules`, `allSteps` | Done |
| Progress checklist persisted to localStorage | `/setup` (`use-progress.ts`, key `awd-progress-v1`) | step `id`s | Done |
| PC vs Android tool comparison (8 cards: Terminal, Editor, Runtime, Git, Devtools, DB, Containers, Deploys) | `/tools` (`ToolsPage.tsx`) | `toolPairs`, `gap: same\|close\|workaround` | Done |
| Terminal simulator (safe Termux imitation: `help, pkg, node, npm, git, ls, pwd, whoami, vite scaffold, dev server, clear`) | `/terminal` (`TerminalSim.tsx`) | `respond()` | Done |
| Searchable troubleshooting hub (9 issues, tag filter + accordion + commands) | `/troubleshooting` (`TroubleshootingPage.tsx`) | `issues` | Done |
| Developer glossary (20 terms, search + category filter, sorted) | `/glossary` (`GlossaryPage.tsx`) | `glossary` | Done |
| App shell: sticky nav, footer, 404 | `App.tsx` | — | Done |
| SEO per-route `useDocumentMeta` + site meta in `index.html` + `robots.txt` allow-all | all routes | — | Done |

## 4. MVP scope

In scope: static content, client-side interactivity, localStorage, simulated terminal. Out of scope (and currently absent): backend, DB, auth, analytics, API routes, server functions, i18n, offline/PWA, user accounts, comments.

MVP is met — all 7 content features from `README.md` exist.

## 5. Non-goals / constraints

- Dark-only UI (oklch tokens in `styles.css`). No light mode.
- No real terminal execution — `TerminalSim` is string-matched mock.
- Content lives in `src/lib/content.ts`, not a CMS. Step `id`s are a stable API.

## 6. Future direction (not started)

- Prune dead `ui/*` + unused deps; extract `FilterChip`/`Card` to remove duplication.
- SEO: `canonical`, `sitemap.xml` loc prefix on deploy, JSON-LD (`og:image` + `og:site_name` + twitter tags done).
- A11y: skip-link, `aria-live` terminal output, focus management.
- Fix known issues in `TASKS.md` (duplicate `key={cmd}`, magic `top-[57px]`, `activeProps` merge).
- Optional: PWA/offline, more sim commands, deep-linkable setup steps (`/setup#termux` exists via `id={slug}`).
