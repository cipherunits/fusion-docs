---
name: translate-docs
description: >
  Activate when the user issues "translate" (or variants like "ترجمه کن",
  "/translate", "ترجمه مستندات", "translate docs"). Read English docs under
  content/docs/en and produce matching Persian (fa) and Russian (ru) versions
  in a conversational-professional, natural, localized tone — not word-for-word.
  Skip files whose English source is unchanged (idempotent). If only part of a
  file changed, retranslate only that part. Tracks sync via source-commit SHA.
---

# Translate Docs Skill

<!-- This file must live at: .agents/skills/translate-docs/SKILL.md -->

## Goal
Keep the project's multilingual docs in sync with the English source, at
human quality — fluent, professional, and native for each locale — not dry
machine translation.

## Folder layout (this repo)
```
content/docs/
  en/
    guide.mdx
    setup/intro.mdx
    cli/meta.json
  fa/
    guide.mdx
    setup/intro.mdx
    cli/meta.json
  ru/
    guide.mdx
    setup/intro.mdx
    cli/meta.json
```
- `content/docs/en` is the only **source of truth**. Never translate from fa or
  ru into en, even if the user asks.
- Folder structure and filenames under fa and ru must mirror en exactly (same
  relative path, same name; extension is usually `.mdx`).
- Create the fa or ru directory if it is missing.
- When `meta.json` changes in en, keep fa/ru aligned (see below).

### `meta.json` — what to translate
`meta.json` files drive nav. Translate only human-readable prose fields; leave
structural / machine fields identical to en.

| Field | Translate? | Notes |
| --- | --- | --- |
| `title` | Yes (when prose) | e.g. `"Architecture"` → `"معماری"` / `"Архитектура"` |
| `description` | Yes (when prose) | Leave alone if it is a version string (e.g. `"1.2.6"`) |
| `pages` | **No** | Same slugs/order as en |
| `icon` | **No** | Icon name string |
| `root` | **No** | Boolean |
| `sourceCommit` | **No** | Tracking only (fa/ru); see Workflow — not present in en |

Example — English source (`content/docs/en/cli/meta.json`):

```json
{
  "title": "Fusion Tool",
  "description": "Command-line interface",
  "icon": "Terminal",
  "root": true,
  "pages": ["v1"]
}
```

Persian counterpart (`content/docs/fa/cli/meta.json`) — only `description`
(and prose `title` when applicable) changes:

```json
{
  "title": "Fusion Tool",
  "description": "رابط خط فرمان",
  "icon": "Terminal",
  "root": true,
  "pages": ["v1"]
}
```

Russian counterpart (`content/docs/ru/cli/meta.json`):

```json
{
  "title": "Fusion Tool",
  "description": "Интерфейс командной строки",
  "icon": "Terminal",
  "root": true,
  "pages": ["v1"]
}
```

## Trigger
These commands should invoke this skill:
- `translate`
- `/translate`
- `translate docs` / `ترجمه مستندات`
- `translate <path-or-filename>` → translate only that file or folder

If no argument is given, walk all of `content/docs/en`.

## Workflow

### 1. Discover changes (git-based differential)
Change detection is **git-based**, not timestamp-based. Each translated fa/ru
file records the English commit it was last synced from via a hidden HTML
comment at the top of the file (after frontmatter if present):

```html
<!-- source-commit: <full-sha> -->
```

Example at the top of an MDX file with frontmatter:

```mdx
---
title: Getting started
description: Install and run Fusion
---
<!-- source-commit: a1b2c3d4e5f678901234567890abcdef12345678 -->

# Getting started
...
```

For `meta.json` (JSON cannot contain HTML comments), store the same SHA as a
non-translated string field named `sourceCommit` (update after every sync;
never translate this value):

```json
{
  "sourceCommit": "a1b2c3d4e5f678901234567890abcdef12345678",
  "title": "Fusion Tool",
  "description": "رابط خط فرمان",
  "icon": "Terminal",
  "root": true,
  "pages": ["v1"]
}
```

**Per English file** under `content/docs/en/**/*.{md,mdx,json}` (and matching
paths when the user scoped the command):

1. Resolve the counterpart paths under `fa/` and `ru/`.
2. Get the **current English commit SHA for that path**:
   ```bash
   git log -1 --format=%H -- content/docs/en/<relative-path>
   ```
3. Decide for each locale (`fa`, then `ru`) independently:

   **(a) Full translation** — if the counterpart is missing, or it has no
   `<!-- source-commit: … -->` (MDX) / `sourceCommit` (`meta.json`):
   - Translate the whole file.
   - Write/update the marker to the SHA from step 2.

   **(b) Differential translation** — if the marker exists, call:
   ```bash
   git diff <source-commit>..HEAD -- content/docs/en/<relative-path>
   ```
   where `<source-commit>` is the SHA from the marker.
   - If the diff is **non-empty**: retranslate only the paragraphs/sections
     that changed in en into the matching fa/ru regions; leave the rest
     untouched unless structural moves require remapping. Then set the marker
     to the SHA from step 2.
   - If the diff is **empty**: **skip** that locale file; list it as up to
     date in the final report.

4. **Fallback** — if git is unavailable, the path is not under version
   control, or `git log` / `git diff` fails:
   - Retranslate the **entire** file.
   - Still write the marker when a SHA can be obtained; otherwise omit it.
   - Warn clearly in the final report that git diff was unavailable and a
     full retranslate was used.

Do not use file mtimes or “feels different” heuristics — only the
source-commit + `git diff` rules above (or the fallback).

### 2. Translation rules (both languages)
- **Tone**: conversational-professional — not stiff corporate, not overly
  casual. Write as an expert explaining to a peer.
- Translate meaning and intent, not word-for-word. Idioms and English phrasing
  need natural equivalents in the target language.
- **Technical terms** (library names, frameworks, CLI commands, file/variable
  names, code keywords) stay in English; only surrounding prose is translated.
- Code fences (` ``` `), links, file paths, and placeholders (e.g.
  `{{variable}}`) are copied verbatim — translate only explanatory text around
  them.
- Preserve Markdown/MDX structure exactly (heading levels, lists, tables,
  blockquotes, MDX components).
- If the file has frontmatter (between `---`), translate only translatable text
  fields (`title`, `description`); leave structural fields (`slug`, `date`,
  `id`, …) unchanged.
- Always preserve or refresh the `<!-- source-commit: … -->` comment (MDX) or
  `sourceCommit` field (`meta.json`) per Workflow §1.

### 3. Language-specific notes
- **Persian (fa)**:
  - Treat as RTL; if the output is HTML/JSX rather than plain md, respect
    `dir="rtl"` where needed.
  - Keep numbers/units consistent with project convention — default: Latin
    digits for technical values, Persian digits for narrative prose, unless
    another convention is already used in the project.
  - Avoid literal calques and awkward loanwords; use natural modern technical
    Persian.
- **Russian (ru)**:
  - Slightly more formal register than Persian (technical Russian usually is),
    but still fluent and non-mechanical.
  - Respect gender/case grammar, especially when an English term sits inside a
    Russian sentence (do not decline it incorrectly; keep or transliterate in
    the form common among Russian-speaking engineers).

### 4. Output validation
Before finishing, for each translated file check:
- [ ] Heading count and order match the en version
- [ ] All code blocks and links were copied unchanged
- [ ] No leftover untranslated English sentences, except intentional technical
      terms
- [ ] `source-commit` / `sourceCommit` matches
      `git log -1 --format=%H -- <en-path>` when git was available
- [ ] File is saved at the correct `content/docs/fa/...` or
      `content/docs/ru/...` path
- [ ] For `meta.json`: `pages`, `icon`, `root` match en; only prose
      `title`/`description` differ (`sourceCommit` is tracking-only)

### 5. Final report
After the run, summarize like this (example):
```
✅ Newly translated:   fa/setup/intro.mdx, ru/setup/intro.mdx
🔄 Updated:            fa/guide.mdx ("Installation" section changed), ru/guide.mdx
⏭️ Unchanged (skip):   fa/faq.mdx, ru/faq.mdx
⚠️ Needs review:       ru/advanced.mdx (ambiguous term on line 42 — please check)
⚠️ Git fallback:       fa/cli/v1/desktop.mdx (git diff unavailable — full retranslate)
```

## Important notes
- Never modify en files.
- If a passage is ambiguous or depends on context outside the file, do not
  guess; flag it as **needs review** in the final report instead of shipping a
  wrong translation.
- For very large files, translate section by section so quality does not drop.
- For fusion-docs conventions (package names, meta.json, tri-lingual nav), also
  follow the `fusion-docs` skill at `.agents/skills/fusion-docs/SKILL.md`.

This skill file must live at `.agents/skills/translate-docs/SKILL.md` so the
agent skill system can discover it.
