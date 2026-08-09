# Fusion Docs

Official documentation site for **[Fusion Framework](https://cipherunit.xyz)** — a backend framework with a unified developer experience across Node.js, Python, and C#.

Welcome to the team. Contributions of every size help.

## Choose your guide

| I want to… | Start here |
| --- | --- |
| Translate docs or UI strings | **[TRANSLATING.md](./TRANSLATING.md)** |
| Work on the website / app code | **[DEVELOPING.md](./DEVELOPING.md)** |

## Quick start

```bash
git clone https://github.com/cipherunits/fusion-docs.git
cd fusion-docs
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Requires **Node.js** and **pnpm 11.5.2** (`packageManager` in `package.json`).

## Repository layout (short)

```text
content/
  docs/           # Documentation pages (MDX)
  locales/        # UI translation JSON files
src/              # Next.js + Fumadocs application code
public/           # Static assets (logo, fonts, …)
```

Translators mostly stay under `content/`.  
Developers work across `src/`, `content/`, and project config.

## Links

- Repository: [github.com/cipherunits/fusion-docs](https://github.com/cipherunits/fusion-docs)
- Organization: [cipherunit.xyz](https://cipherunit.xyz)
