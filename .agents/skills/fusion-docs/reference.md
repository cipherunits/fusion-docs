# Fusion Docs — reference

## Package and import cheat sheet

```bash
pip install fusion-framework
npm i fusion-framework
```

```python
from fusion_framework.app import FusionApp
from fusion_framework.api import FusionBaseApi
from fusion_framework.route import route
from fusion_framework import status
```

```ts
import { FusionApp, FusionBaseApi, route, status, header } from "fusion-framework";
```

```csharp
using FusionFramework;
// NuGet: Fusion-Framework
```

CLI install (Fusion Tool):

```bash
curl -fsSL https://raw.githubusercontent.com/cipherunits/fusion-tool/main/scripts/install.sh | bash
```

## `meta.json` shapes

**Top-level** `content/docs/{lang}/meta.json`:

```json
{
  "pages": ["index", "architecture", "cli", "python", "typescript", "csharp"]
}
```

**Product root** (e.g. `python/meta.json`):

```json
{
  "title": "Python",
  "description": "Python binding for Fusion Framework",
  "icon": "CodeXml",
  "root": true,
  "pages": ["v1"]
}
```

**Version** (e.g. `python/v1/meta.json`):

```json
{
  "title": "v1",
  "description": "1.2.6",
  "pages": [
    "index",
    "getting-started",
    "router",
    "custom-http-routes",
    "pagination",
    "config",
    "middleware",
    "status",
    "headers"
  ]
}
```

`description` on the version folder is the package release string shown in the docs UI.

## Link patterns

Prefer:

| Good | Avoid |
| --- | --- |
| `./architecture/v1/fma` | `./architecture/fma` (relies on redirect) |
| `./python/v1/getting-started` | `./python/getting-started` |
| `/fa/docs/cli/v1` | `/fa/docs/cli` when you mean a specific page |

Absolute GUI link example: `/en/gui` (locale prefix required).

## Locales JSON

- Keys stay English identifiers; translate **values** only.
- Keep the same key set across `en` / `fa` / `ru` for each namespace file you touch.
- Locale enablement: `content/locales/meta.json` (`dir`: `ltr` / `rtl`).

## Sync workflow (new feature page)

1. Implement English MDX from verified framework/CLI source.
2. Copy file to `fa/` and `ru/` with identical structure; translate prose + frontmatter.
3. Append the slug to `pages` in all three version `meta.json` files at the same index.
4. If the feature is cross-language, add sibling pages under `python`, `typescript`, and `csharp` (and architecture overview if it is a shared concept) — still for all three locales.
5. Grep for outdated package names (`cipherunits-fusion`, etc.) in the paths you touched.

## Fallback behavior (do not rely on it)

The site can fall back to English when a locale page is missing. That is for incomplete community translations — **agent edits must not depend on fallback**. Create the `fa` and `ru` files.
