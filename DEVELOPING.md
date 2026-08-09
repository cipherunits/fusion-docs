# Guide for developers

This repo is the Fusion Framework documentation site: **Next.js**, **Fumadocs**, **Tailwind**, and **i18n**.

For translation-only work, see [TRANSLATING.md](./TRANSLATING.md).

## Stack

| Piece | Role |
| --- | --- |
| Next.js 16 (App Router) | App & routing (`src/app`) |
| Fumadocs | Docs layout, MDX, search |
| i18next + Fumadocs i18n | UI strings + locale-aware docs |
| Tailwind CSS 4 | Styling |
| pnpm 11.5.2 | Package manager |

## Requirements

- Node.js (LTS recommended)
- pnpm **11.5.2** (see `packageManager` in `package.json`)

```bash
node --version
pnpm --version
```

## Setup

```bash
git clone https://github.com/cipherunits/fusion-docs.git
cd fusion-docs
pnpm install
pnpm dev
```

App: [http://localhost:3000](http://localhost:3000) (default locale under `/en`).

## Scripts

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Development server |
| `pnpm build` | Production build |
| `pnpm start` | Serve production build |
| `pnpm lint` | ESLint |
| `pnpm lint:fix` | ESLint with autofix |
| `pnpm typecheck` | TypeScript (`tsc --noEmit`) |
| `pnpm check` | Banner + typecheck + lint |
| `pnpm clean` | Remove `.next` / caches |

Before a PR, prefer:

```bash
pnpm check
pnpm build
```

## Project map

```text
src/
  app/                 # Routes: /[lang], /[lang]/docs, …
  components/          # UI + home particles, docs widgets
  lib/                 # i18n, source loader, docs helpers, layout options
content/
  docs/                # MDX docs by product + version
  locales/{lang}/      # UI JSON namespaces (e.g. common.json)
public/                # Static assets
pnpm-workspace.yaml    # pnpm allowBuilds, etc.
```

Important entry points:

- `src/lib/i18n.ts` — locales list and text direction
- `src/lib/source.ts` — Fumadocs content loader
- `src/lib/layout.shared.tsx` — nav title, links, UI locale display names
- `src/lib/docs.ts` — product / version helpers
- `src/proxy.ts` — i18n middleware

## Content & versions

Docs live under:

```text
content/docs/{product}/{version}/…
```

Products today: `typescript`, `python`, `csharp`.  
Register versions in `src/lib/docs.ts` when you add a new version folder.

Locale files for docs use the **dot** parser:

```text
getting-started.mdx      # en (default)
getting-started.fa.mdx   # fa
```

UI copy:

```text
content/locales/{lang}/{namespace}.json
```

Loaded via `@content/locales/...` (see `src/lib/i18next`).

## Adding a locale (code side)

1. Extend `languages` in `src/lib/i18n.ts`.
2. Set `localeDirection` (`ltr` / `rtl`).
3. Add display name in `src/lib/layout.shared.tsx` translations.
4. Add `content/locales/{lang}/common.json` (and other namespaces as needed).
5. Add `*.{lang}.mdx` / `meta.{lang}.json` under `content/docs` as required.

## Branching & commits

Do not commit feature work directly on `main`.

```bash
git checkout -b feat/home-responsive
# or fix/…, docs/…, i18n/…
```

Commit style examples:

```text
feat: soft-focus overlay on home particles
fix: allow @tsparticles/engine builds on Vercel
docs: clarify python getting started
i18n: wire fa locale in i18n config
```

## Pull requests

```bash
git push -u origin HEAD
```

Open a PR with:

- What changed and why
- How you tested (`pnpm check`, `pnpm build`, browser checks)
- Screenshots for UI changes

## Notes for CI / Vercel

pnpm 11 requires explicit approval for dependency build scripts in `pnpm-workspace.yaml` (`allowBuilds`). If install fails with `ERR_PNPM_IGNORED_BUILDS`, add or set the package there (do not leave placeholder values).

## Thank you

Improvements to UX, a11y, performance, docs tooling, and SDK guides all count. Welcome aboard.

Back to the main [README](./README.md).
