# Guide for translators

Thank you for helping make Fusion accessible in more languages.

You do **not** need to be a programmer. Most work is editing text under `content/` — MDX docs and JSON UI strings.

**Source language:** English (`en`).  
**Active locales:** `en`, Persian (`fa`, RTL), Russian (`ru`).

If setup blocks you, open an [Issue](https://github.com/cipherunits/fusion-docs/issues) — maintainers will help.

## What you translate

| Area | Path | Format |
| --- | --- | --- |
| Documentation | `content/docs/{lang}/` | MDX (Markdown + frontmatter) |
| UI strings | `content/locales/{lang}/` | JSON key → value |
| Navigation labels | `meta.json` inside docs folders | JSON (`title`, `description` only) |

English under `content/docs/en/` and `content/locales/en/` is always the reference. Copy structure from English, then translate prose.

## Setup (once)

Requires [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) (project uses **11.5.2**).

```bash
git clone https://github.com/cipherunits/fusion-docs.git
cd fusion-docs
pnpm install
pnpm dev
```

Preview: [http://localhost:3000](http://localhost:3000)  
Persian: `/fa` · Russian: `/ru` · English: `/en`

## Folder layout

```text
content/docs/
  en/python/v1/getting-started.mdx    ← source
  fa/python/v1/getting-started.mdx    ← your translation
  ru/python/v1/getting-started.mdx

content/locales/
  en/common.json                      ← source
  fa/common.json
  ru/common.json
  meta.json                           ← locale registry (maintainers)
```

**Fallback:** If a page is missing in `fa/` or `ru/`, the site shows English for that page. You can translate incrementally — but aim to keep `meta.json` nav aligned across locales when you add pages.

## UI strings (`content/locales/{lang}/`)

Copy all namespaces from `en/` when starting a new locale:

| File | What it controls |
| --- | --- |
| `common.json` | Nav links, shared labels |
| `home.json` | Home page hero and buttons |
| `gui.json` | Fusion Tool desktop download page |
| `seo.json` | Page titles and meta descriptions |
| `fumadocs-ui.json` | Search, TOC, theme switcher, language names |

**Rules:**

- Translate **values** only — never rename keys.
- Keep JSON valid (quotes, commas, escaping).
- Use natural, professional technical language — not word-for-word machine translation.

Example — only values change:

```json
{
  "welcome": "…translated…",
  "openDocs": "…translated…"
}
```

## Documentation pages (MDX)

### Workflow

1. Find the English file under `content/docs/en/…`.
2. Create the same path under `content/docs/fa/…` or `content/docs/ru/…`.
3. Translate:
   - `title` and `description` in frontmatter (`---` block at top)
   - Body headings and paragraphs
4. Leave unchanged:
   - Code blocks and shell commands
   - Package names, API/type identifiers, file paths
   - Link targets (URLs) unless the path is locale-specific

### Frontmatter example

English source:

```mdx
---
title: Getting started
description: Install and run Fusion with Python
---

# Getting started
```

Persian — translate title, description, and prose; keep code fences in English:

```mdx
---
title: شروع به کار
description: نصب و اجرای Fusion با Python
---

# شروع به کار
```

### `meta.json` (navigation)

Each docs folder may contain `meta.json`. Translate human-readable fields only:

| Field | Translate? |
| --- | --- |
| `title` | Yes (when it is prose) |
| `description` | Yes (unless it is a version number like `"1.2.6"`) |
| `pages` | **No** — same slugs and order as English |
| `icon`, `root` | **No** |

Product names like **Fusion Tool** often stay in English.

## Translation rules

### Do translate

- Sentences, headings, table headers (prose cells)
- Button labels, tooltips, SEO descriptions
- Explanatory text around code samples

### Do not translate

- Code inside ` ``` ` fences
- Commands (`pip install fusion-framework`, `pnpm add …`)
- Package names: `fusion-framework`, `fusion_framework`, `Fusion-Framework`, `FusionFramework`
- Config filenames: `fusion-framework.toml`
- API names, types, HTTP paths, query parameters
- MDX component names and props

Good:

````md
نصب با دستور زیر:

```bash
pip install fusion-framework
```
````

Bad — wrong package name:

```bash
pip install cipherunits-fusion
```

### Quality

- Preserve meaning and tone — conversational-professional, not stiff or overly casual.
- Keep Markdown/MDX structure (heading levels, lists, tables, components).
- Use consistent terminology across pages (pick one Persian/Russian term per concept).
- For **Persian (`fa`)**: site is RTL — check layout after translating.
- For **Russian (`ru`)**: slightly more formal register is fine; do not incorrectly decline English API names inside sentences.

## Check your work

1. Run `pnpm dev`.
2. Open your locale (`/fa` or `/ru`) and every page you changed.
3. Confirm:
   - [ ] Layout looks correct (especially RTL for `fa`)
   - [ ] Links work
   - [ ] Code blocks unchanged
   - [ ] No leftover English paragraphs (except intentional technical terms)
   - [ ] Sidebar order matches English (`meta.json` `pages[]`)

## Branch, commit, pull request

```bash
git checkout -b i18n/fa-getting-started
git add content/docs/fa/... content/locales/fa/...
git commit -m "i18n: add Persian getting started"
git push -u origin HEAD
```

Commit messages must follow project rules (`commitlint.config.mjs`):

```text
<type>: <short subject in lowercase>
```

Use **`i18n`** for translation-only work. Examples:

```text
i18n: add Persian getting started
i18n: update Russian pagination guide
docs: fix English typo in router page
```

Header max length: **100** characters. Invalid messages are rejected by the git hook.

Open a Pull Request and include:

- Language code (`fa` / `ru`)
- Files or sections translated
- Anything reviewers should double-check (ambiguous terms, long pages partially done)

## Adding a new language

Today the site ships `en`, `fa`, and `ru`. For a **new** language, coordinate with maintainers:

1. Add locale to `content/locales/meta.json` (`name`, `dir`, `ogLocale`).
2. Copy all JSON namespaces from `en/`.
3. Copy `content/docs/en/` tree to `content/docs/{lang}/` and translate.

Maintainers handle any app wiring; locale discovery is automatic from `meta.json`.

## Need help?

- [fusion-docs Issues](https://github.com/cipherunits/fusion-docs/issues) — ask before large efforts
- Maintainers can review your first PR and suggest terminology

For automated / agent-assisted translation workflows, see [`.agents/skills/translate-docs/SKILL.md`](./.agents/skills/translate-docs/SKILL.md).

Back to [README](./README.md).
