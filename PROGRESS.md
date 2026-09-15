# PROGRESS.md

Running log of work done, session by session. Update this at the **end of every session** before stopping — this is how the next AI agent session (or human) picks up context quickly without re-reading the entire codebase.

Each entry should answer: what did I do, what decisions did I make and why, what's broken/incomplete, what should happen next.

---

## How to Use This File

- Add a new dated entry at the **top** (reverse chronological — newest first).
- Reference `TASKS.md` phase/task numbers instead of re-describing the whole task.
- Record **decisions and reasoning**, not just actions — e.g., "chose Cloudinary over UploadThing because X" is useful; "added image upload" alone is not.
- Record **open questions or blockers** clearly so they're not lost.
- Keep entries concise — this is a log, not documentation (permanent docs belong in `PRD.md`/`ARCHITECTURE.md`/`DATABASE.md`).

---

## Entry Template

```
## [YYYY-MM-DD] — Session N

**Completed (TASKS.md refs):**
- Phase X: <task> — brief note if any deviation from the plan

**Decisions made:**
- <decision> — <why>

**Blockers / open questions:**
- <anything unresolved that the next session needs to address>

**Docs updated:**
- <e.g., updated DATABASE.md to add a field> or "none"

**Next up:**
- <the next task(s) in TASKS.md to tackle>
```

---

## Log

## [2026-09-15] — Rebrand to Code With Android + docs refresh

**Completed (TASKS.md refs):**
- Rebrand to Code With Android: site brand `Code With Android` + short `CWA` + `by Safayet` in `index.html` (title, description, `og:title`/`og:description`/`og:site_name`, `og:image` → `/og-image.jpeg`, twitter `title`/`description`), `SiteNav` logo + footer, all 6 pages `useDocumentMeta`, `README.md`
- Docs refresh: `AGENTS.md` / `README.md` / `ARCHITECTURE.md` / `PRD.md` / `TECH_STACK.md` / `TASKS.md` / `CHANGELOG.md` — new brand headers, clarified web-dev-*using*-phone (not app dev), fixed stale refs (`src/routes/` → `src/pages/`, `__root.tsx` → `App.tsx`, component count, `public/` assets, pruned-dep list)
- TASKS.md: checked off prune-`ui/*` box (superseded by full delete in cleanup); added rebrand section; CHANGELOG.md: added Unreleased rebrand entry
- Verified: grep shows zero `Android Dev Studio` / `Android Web Dev` in `src/`, `index.html`, md files

**Decisions made:**
- Kept `awd-progress-v1` storage key and `package.json` name `android-dev-studio` as legacy ids (renaming breaks saved progress / rewrites history) — noted as such in TASKS/CHANGELOG
- Kept CHANGELOG/TASKS history intact, added new Unreleased entries instead of rewriting past entries
- Metadata/docs only — no UI, functionality, or architecture changes, no new deps

**Blockers / open questions:**
- Cannot run `npm run lint` / `typecheck` / `build` — `node_modules` not installed (`eslint`/`tsc` not found); verification was grep-only, needs a full `npm i` + verify pass
- `noUnusedLocals` / `noUnusedParameters` still `false` in `tsconfig.json` — enabling untouched pending decision
- P2 polish still open: per-route `canonical`, `manifest`, JSON-LD; larger accordion targets; `HardwareChecker` reset-`checked`-on-change; self-host Google Fonts; deep-linkable steps / more sim commands / PWA
- `README.md` still carries Lovable boilerplate — full setup/deploy docs pending

**Docs updated:**
- All 7 md files (see above); `PROGRESS.md` this entry

**Next up:**
- `npm i` then `npm run lint` + `npm run typecheck` + `npm run build` to verify rebrand cleanly
- P2 polish in TASKS.md (canonical/manifest/JSON-LD first), then README deploy-docs rewrite

---

## [Unreleased] — Project Kickoff

**Completed:**
- Created initial planning docs: `PRD.md`, `TECH_STACK.md`, `ARCHITECTURE.md`, `DATABASE.md`, `AGENTS.md`, `TASKS.md`, `README.md`, `PROGRESS.md`.

**Decisions made:**
- No customer authentication in MVP — guest checkout only, to minimize friction for the target audience. Admin dashboard added with simple auth for product/category/order management, since the store owner needs a way to manage products and view orders without developer involvement.
- Cart implemented client-side (Zustand + localStorage) rather than a server-persisted cart table, since there's no customer account to attach a server cart to.
- Product variants and coupon codes modeled in the schema but not wired into any UI/logic — deferred to post-MVP, but schema is future-proofed to avoid a breaking migration later.
- Delivery charges stored in a `Settings` table (not hardcoded) so the store owner can adjust them without a code deploy.
- Prices/totals are always recalculated server-side at checkout — client-submitted values are never trusted, to prevent tampering.

**Blockers / open questions:**
- Final accent color (pink vs. violet) not yet locked — to be decided during UI implementation.
- Image storage provider (Cloudinary vs. UploadThing) not yet finalized — pick one during Phase 0/10 setup.
- WhatsApp business number not yet provided — needed before Phase 1 (floating button) and Phase 5 (inquiry button) can be wired up for real.
- Database hosting provider (Neon vs. Supabase vs. Vercel Postgres) not yet chosen.

**Docs updated:**
- N/A — this is the initial creation.

**Next up:**
- Phase 0 in `TASKS.md`: project setup (Next.js init, Tailwind config, Prisma init, first migration).
- 