# Guide for translators

Thank you for helping make Fusion accessible in more languages.

You do **not** need to be a programmer. Most of your work is editing text files under `content/`.

If you only want to translate and get stuck on setup, open an Issue or ask a maintainer — we will help.

## What you can translate

1. **Documentation pages** — MDX files in `content/docs/`
2. **UI strings** — JSON files in `content/locales/` (home page buttons, labels, …)

English (`en`) is the source language. New languages copy from English, then translate.

## Setup (once)

```bash
git clone https://github.com/cipherunits/fusion-docs.git
cd fusion-docs
pnpm install
pnpm dev
```

Site: [http://localhost:3000](http://localhost:3000)

You need [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/).

## Adding a new language

Example: Persian (`fa`).

### 1. Tell the project about the language

Ask a maintainer, or in your PR update `src/lib/i18n.ts`:

```ts
languages: ['en', 'fa'],
```

And, if the language is right-to-left:

```ts
export const localeDirection = {
  en: 'ltr',
  fa: 'rtl',
};
```

### 2. UI strings

Copy both namespaces:

```text
content/locales/en/common.json
→ content/locales/{lang}/common.json

content/locales/en/fumadocs-ui.json
→ content/locales/{lang}/fumadocs-ui.json
```

- `common.json` — home page, nav links, custom labels
- `fumadocs-ui.json` — language display name, Search, TOC, theme switcher, …

Translate the **values** only. Keep the keys unchanged:

```json
{
  "welcome": "…translated…",
  "openDocs": "…translated…"
}
```

### 3. Documentation pages

Docs live in **locale folders**, same idea as `content/locales/`:

```text
content/docs/en/python/v1/getting-started.mdx   # English (source)
content/docs/fa/python/v1/getting-started.mdx   # Persian (optional)
content/docs/ru/python/v1/getting-started.mdx   # Russian (optional)
```

**Fallback:** If a page is missing under `fa/` or `ru/`, the site shows the English page. You can ship English-only docs; other locales catch up later.

Workflow:

1. Copy the English folder/file under `content/docs/en/...`.
2. Paste into `content/docs/{lang}/...` with the same path.
3. Translate titles, descriptions, and body text.
4. Leave code blocks, commands, package names, and API identifiers as in English.

## Translation rules

- Keep the original meaning.
- Do **not** translate code, commands, file paths, or API/type names.
- Keep Markdown / MDX structure (headings, lists, links, fences).
- Keep links working.
- Prefer consistent technical wording across pages.
- Do not ship raw machine translation without a human pass.

Good:

````md
Install with:

```bash
pip install cipherunits-fusion
```
````

The command stays in English; only the surrounding sentence is translated.

## Check your work

1. Run `pnpm dev`.
2. Open `/fa` (or your locale) and the docs pages you changed.
3. Confirm layout (especially RTL), links, and that code still looks correct.

## Branch, commit, PR

```bash
git checkout -b i18n/fa-getting-started
git add .
git commit -m "i18n: add Persian getting started"
git push -u origin HEAD
```

Then open a Pull Request. In the description, mention:

- Language code
- Which pages / JSON files you translated
- Anything reviewers should double-check

## Need help?

Open an Issue on [fusion-docs](https://github.com/cipherunits/fusion-docs/issues) with the language you want to add. Maintainers can enable the locale and review your first PR with you.

Back to the main [README](./README.md).
