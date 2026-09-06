# Guide for developers

Official docs site for **[Fusion Framework](https://cipherunit.xyz)** — **Next.js 16**, **Fumadocs**, **Tailwind CSS 4**, and **tri-lingual i18n** (`en` / `fa` / `ru`).

Translators: see **[TRANSLATING.md](./TRANSLATING.md)**.  
Contributors using Cursor agents: see **[`.agents/skills/`](./.agents/skills/)** for detailed workflows.

## Stack

| Piece | Role |
| --- | --- |
| Next.js 16 (App Router) | Routes under `src/app/[lang]/…` |
| React 19 + React Compiler | UI (`src/components`) |
| Fumadocs | MDX docs, sidebar, search |
| i18next + Fumadocs i18n | UI strings + locale-aware docs |
| Tailwind CSS 4 + shadcn / Base UI | Styling via `src/app/styles/globals.css` |
| pnpm 11.5.2 | Package manager (`packageManager` in `package.json`) |
| Husky + commitlint | Commit message enforcement |

Path aliases (`tsconfig.json`): `@/*` → `src/*`, `@content/*` → `content/*`.

## Requirements & setup

- **Node.js** LTS recommended
- **pnpm 11.5.2** — match `packageManager` in `package.json`

```bash
git clone https://github.com/cipherunits/fusion-docs.git
cd fusion-docs
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) (default locale: `/en`).

## Scripts

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Development server |
| `pnpm check` | CipherScope banner + typecheck + lint |
| `pnpm typecheck` | TypeScript (`tsc --noEmit`) |
| `pnpm lint` / `pnpm lint:fix` | ESLint |
| `pnpm commitlint` | Validate a commit message (used by Husky) |
| `pnpm clean` | Remove `.next`, `out`, caches |

Before a PR:

```bash
pnpm check
pnpm exec next build
```

## Repository map

```text
content/
  docs/{en,fa,ru}/           # MDX docs (en = source of truth)
  locales/{en,fa,ru}/        # UI JSON namespaces
  locales/meta.json          # Locale registry (names, dir, ogLocale)
src/
  app/[lang]/                # home, docs, gui, og, api/search
  app/styles/globals.css     # Design tokens — single source for colors
  components/                # docs/, gui/, home/, ui/
  lib/                       # i18n, source loader, docs helpers, SEO
public/                      # fonts, images
.agents/skills/              # Agent workflows (fusion-docs, translate, git-commit, …)
.cursor/                     # Cursor rules + skill mirrors
commitlint.config.mjs        # Commit message rules
pnpm-workspace.yaml          # pnpm allowBuilds (not a monorepo)
```

### Key entry points

| File | Purpose |
| --- | --- |
| `src/lib/locales-registry.ts` | Reads `content/locales/meta.json` |
| `src/lib/i18n.ts` | Fumadocs locale routing + fallback |
| `src/lib/source.ts` | MDX content loader |
| `src/lib/docs.ts` | Product / version discovery from page tree |
| `src/lib/layout.shared.tsx` | Nav title and links |
| `src/proxy.ts` | Locale middleware |

## Documentation content

### Layout

```text
content/docs/{lang}/meta.json                    # top nav order
content/docs/{lang}/{product}/meta.json          # product root (icon, pages: ["v1"])
content/docs/{lang}/{product}/v1/meta.json       # sidebar pages[]; description = release
content/docs/{lang}/{product}/v1/{page}.mdx
```

**Products today:** `architecture`, `cli`, `python`, `typescript`, `csharp` (each versioned under `v1/`).

**URLs:** `/{lang}/docs/{product}/{version}/{page}` — always include the version segment (`v1`).

Products and versions are **discovered from the page tree**, not hard-coded in `src/lib/docs.ts`.

### Tri-lingual rule

When you add or change docs or nav, update the **same relative path** under all three:

- `content/docs/en/…`
- `content/docs/fa/…`
- `content/docs/ru/…`

Keep `meta.json` `pages[]` lists **identical** across locales (translate `title` / `description` only).

### Package names (do not invent alternatives)

| Ecosystem | Name |
| --- | --- |
| PyPI / npm | `fusion-framework` |
| Python import | `fusion_framework` |
| NuGet | `Fusion-Framework` |
| C# namespace | `FusionFramework` |
| CLI | Fusion Tool (`fusion` binary) from `fusion-tool` |
| Config file | `fusion-framework.toml` |

Verify APIs against [fusion-framework](https://github.com/cipherunits/fusion-framework) and [fusion-tool](https://github.com/cipherunits/fusion-tool) — do not guess.

### New docs page checklist

```text
- [ ] Updated en MDX (source of truth)
- [ ] Updated fa + ru MDX (translated prose only)
- [ ] Updated meta.json pages[] in en, fa, ru (same order)
- [ ] Links include v1 (or relative …/v1/…)
- [ ] Code samples match framework / tool source
- [ ] Package names from table above
- [ ] UI copy changed → content/locales/{en,fa,ru}/
```

Deep reference: [`.agents/skills/fusion-docs/SKILL.md`](./.agents/skills/fusion-docs/SKILL.md).

## UI strings

Namespaces under `content/locales/{lang}/`:

| File | Contents |
| --- | --- |
| `common.json` | Nav, shared labels |
| `home.json` | Home page copy |
| `gui.json` | Desktop app download page |
| `seo.json` | SEO titles / descriptions |
| `fumadocs-ui.json` | Fumadocs chrome (search, TOC, theme) |

Loaded via `@content/locales/…` (see `src/lib/i18next/`). Update **all locales** when changing UI copy.

## Styling & components

- Tokens live in `src/app/styles/globals.css` — use CSS variables / Tailwind token classes.
- Do **not** hardcode HEX, RGB, or HSL in components.
- Reuse patterns from `src/components/ui/` (shadcn + CVA). See [`.agents/skills/ui-ux-design-system-compliance/SKILL.md`](./.agents/skills/ui-ux-design-system-compliance/SKILL.md).

## Adding a locale

1. Add an entry to `content/locales/meta.json` (`name`, `dir`, `ogLocale`).
2. Create `content/locales/{lang}/` — copy all JSON namespaces from `en`.
3. Add `content/docs/{lang}/` — copy from `en` and translate.
4. No code change in `src/lib/i18n.ts` is required; locales are auto-discovered.

## Branching & commits

Do not commit feature work directly on `main`.

```bash
git checkout -b feat/home-responsive
# or fix/…, docs/…, i18n/…
```

Commit messages are enforced by **commitlint** (`commitlint.config.mjs` + `.husky/commit-msg`).

Format: `<type>: <subject>` — header max **100** characters, subject starts lowercase.

| Type | Typical use |
| --- | --- |
| `feat` | New app behavior |
| `fix` | Bug fix |
| `docs` | Documentation content |
| `i18n` | Translations / locale JSON |
| `ci` / `chore` / `build` | Tooling, deps, hooks |

Examples:

```text
feat: add version select to docs sidebar
fix: allow @tsparticles/engine builds on Vercel
docs: clarify python getting started
i18n: wire fa locale in i18n config
```

Validate locally: `echo "docs: my subject" | pnpm exec commitlint`

Full guide: [`.agents/skills/git-commit/SKILL.md`](./.agents/skills/git-commit/SKILL.md).

## Pull requests

```bash
git push -u origin HEAD
```

Include in the PR description:

- What changed and **why**
- How you tested (`pnpm check`, `pnpm exec next build`, browser checks)
- Screenshots for UI changes
- Locales touched (`en` / `fa` / `ru`)

## CI / Vercel notes

pnpm 11 requires explicit build-script approval in `pnpm-workspace.yaml` (`allowBuilds`). If install fails with `ERR_PNPM_IGNORED_BUILDS`, add the package there with a real `true`/`false` value.

---

Improvements to UX, a11y, performance, docs tooling, and SDK guides all count. Welcome aboard.

Back to [README](./README.md).
