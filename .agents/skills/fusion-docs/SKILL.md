---
name: fusion-docs
description: >-
  Maintains Fusion Framework documentation across English (en), Persian (fa),
  and Russian (ru). Use when adding, editing, translating, or reviewing MDX
  docs, meta.json nav, content/locales UI strings, architecture/CLI/language
  guides, or any content under content/docs or content/locales in fusion-docs.
---

# Fusion Docs

You are editing the **fusion-docs** site (Next.js + Fumadocs). English is the source language; **every docs change must ship for `en`, `fa`, and `ru`**.

## Hard rules

1. **Always tri-lingual** — when adding or updating a docs page or `meta.json`, update the same relative path under all three:
   - `content/docs/en/...`
   - `content/docs/fa/...`
   - `content/docs/ru/...`
2. **UI strings** — when changing nav, home, GUI, or SEO copy, update matching keys in `content/locales/{en,fa,ru}/` (`common.json`, `fumadocs-ui.json`, `gui.json`, `home.json`, `seo.json`).
3. **Align `meta.json` `pages` lists** across locales for the same product/version folder. Do not leave a page in one locale’s nav but missing in another.
4. **Do not invent APIs** — verify behavior against `/home/ehsan/fusion-framework` and `/home/ehsan/fusion-tool` (or their GitHub mirrors) before documenting. Prefer reading source, examples, and tests over guessing.
5. **Correct package / product names** (never invent alternatives):

   | Ecosystem | Name |
   | --- | --- |
   | PyPI / npm | `fusion-framework` |
   | Python import | `fusion_framework` |
   | NuGet | `Fusion-Framework` |
   | C# namespace | `FusionFramework` |
   | CLI / tool | Fusion Tool (`fusion` binary) from `fusion-tool` |
   | Config | `fusion-framework.toml` |

   ❌ Wrong: `cipherunits-fusion`, `@fusion/*`, invented npm scopes, wrong NuGet IDs.

6. **Version in URLs** — product links include the version segment (`v1`), e.g. `./architecture/v1/fma`, `/en/docs/python/v1/router`. Missing-version redirects exist but prefer correct links.
7. **Translate prose only** — keep code, commands, paths, package names, type/API identifiers, and fence languages in English. Translate `title` / `description` frontmatter and body prose.
8. **No stub drift** — do not ship a translated page that documents a different or outdated API than English. If `ru` is still catching up on an older tree, **bring it up to en** when you touch that product area (add missing pages + meta), do not leave wrong install commands or deleted APIs.

## Content layout

```text
content/docs/{lang}/{product}/v1/{page}.mdx
content/docs/{lang}/{product}/v1/meta.json    # pages[] + description = package release
content/docs/{lang}/{product}/meta.json       # root: true, pages: ["v1"]
content/docs/{lang}/meta.json                 # top nav order
content/locales/{lang}/*.json                 # UI namespaces
content/locales/meta.json                     # locale registry (en/fa/ru)
```

Products today: `architecture`, `cli`, `python`, `typescript`, `csharp`.

## Nav / learning path

- Top-level `content/docs/{lang}/meta.json` order (en/fa): `index`, `architecture`, `cli`, `python`, `typescript`, `csharp`. Keep `ru` aligned when editing nav.
- Version folder `meta.json` `description` holds the published package version string (e.g. `"1.2.6"`). Keep it consistent with the framework release you are documenting.
- Language guides typically order: `index` → `getting-started` → `router` → `custom-http-routes` → `pagination` → `config` → `middleware` → `status` → `headers` (+ Python `swagger`, `async`).
- Architecture overview learning path (see `content/docs/en/index.mdx`): architecture → workspace → FMA → what-Fusion-is-not → CLI → language getting-started → router/middleware/config → packages → best-practices/troubleshooting.
- When adding a page, insert it in the same `pages` index position in **all** locale `meta.json` files.

## New page checklist

```text
- [ ] Wrote/updated en MDX (source of truth)
- [ ] Wrote/updated fa MDX (same path, translated prose)
- [ ] Wrote/updated ru MDX (same path, translated prose)
- [ ] Updated meta.json pages[] for en, fa, and ru
- [ ] Links include /v1/ (or relative …/v1/…)
- [ ] Code samples match fusion-framework / fusion-tool source
- [ ] Package names correct (table above)
- [ ] If UI copy changed → locales en + fa + ru
```

## MDX conventions

- Frontmatter: `title`, `description` (translated per locale).
- Prefer relative links within docs; include version folder in product paths.
- Shared assets (e.g. versioning chart) may live beside `index.mdx` per locale — keep paths working for each locale folder.
- Do not leave TODO/stub pages that contradict English.

## Common gaps to avoid

When extending language or architecture docs, ensure these topics exist in **en + fa + ru** (not only en/fa):

- `custom-http-routes`, `headers`, `status`, `pagination`
- Architecture: `workspace`, cross-cutting HTTP docs, glossary / practices pages when present in en
- CLI: `command`, `modules`, `update`, desktop/vscode as in en meta

Russian often lags — **adding `ru` is part of the task**, not optional follow-up, unless the user explicitly scopes to one locale (still note the gap).

## Verification sources

| Topic | Check here |
| --- | --- |
| Binding APIs, status/headers/pagination | `/home/ehsan/fusion-framework` |
| `fusion init`, modules, install scripts | `/home/ehsan/fusion-tool` |
| Locale registry / direction | `content/locales/meta.json`, `src/lib/i18n.ts` |
| Translator workflow | `TRANSLATING.md` |
| App / build workflow | `DEVELOPING.md` |

## Before finishing

1. Diff paths: every touched `content/docs/en/...` file has siblings under `fa/` and `ru/`.
2. Diff `meta.json` `pages` arrays for equality across the three locales (same entries, same order).
3. Spot-check install/import lines for the package-name table.
4. For app-code changes (not content-only), follow `DEVELOPING.md` (`pnpm check` / `pnpm build` before PR).

## Additional resources

- Package names, meta templates, and link patterns: [reference.md](reference.md)
