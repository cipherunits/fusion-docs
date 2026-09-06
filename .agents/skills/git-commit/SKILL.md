---
name: git-commit
description: >-
  Creates git commits that pass commitlint and follow repo conventions. Use when
  the user asks to commit, stage changes, write a commit message, or says
  "commit", "git commit", or "کامیت".
---

# Git Commit

Create commits only when the user **explicitly** asks. Follow `commitlint.config.mjs` and the Husky `commit-msg` hook (`.husky/commit-msg`).

## Commit message format

```text
<type>: <subject>

[optional body — wrap at ~72 chars per line]
```

| Rule | Detail |
| --- | --- |
| Header max length | **100** characters (type + `: ` + subject) |
| Subject case | lowercase start; no Start-Case, PascalCase, or ALL CAPS |
| Scope | optional; not enforced — prefer clear subject over `type(scope):` unless scope adds clarity |
| Body | optional; separate from header with one blank line |

### Allowed types

| Type | Use when |
| --- | --- |
| `feat` | New user-facing behavior or capability |
| `fix` | Bug fix |
| `docs` | Documentation only (`content/docs`, README, DEVELOPING, comments in docs) |
| `i18n` | Translations, locale JSON, RTL/copy — no app logic change |
| `style` | Formatting, whitespace, CSS polish — no behavior change |
| `refactor` | Code restructure — same behavior |
| `perf` | Performance improvement |
| `test` | Tests only |
| `build` | Build system, deps, bundler, `pnpm-workspace.yaml` |
| `ci` | CI/CD, GitHub Actions, hooks config |
| `chore` | Maintenance that does not fit above (tooling, misc) |
| `revert` | Reverts a prior commit — subject should name what is reverted |

### Type selection (fusion-docs)

- MDX under `content/docs/**` → usually `docs`; if only `fa`/`ru` prose → `i18n`
- `content/locales/**` → `i18n`
- `src/**` UI or app logic → `feat` / `fix` / `refactor` / `style` / `perf`
- `commitlint.config.mjs`, `.husky/*`, eslint → `ci` or `chore`
- Dependency bumps → `build`

### Good examples

```text
feat: add version select to docs sidebar
fix: allow @tsparticles/engine builds on Vercel
docs: clarify python getting started
i18n: wire fa locale in i18n config
ci: add commitlint and commit-msg hook
chore: add git-commit agent skill
```

### Bad examples

```text
Update files                    # no type
Feat: add search                # capitalized type/subject start
docs:Fix pagination             # missing space after colon
feat: add the new feature for the documentation site that we discussed yesterday  # >100 chars
```

## Workflow

Run in parallel first:

```bash
git status
git diff
git diff --staged
git log -5 --oneline
```

Then:

1. **Stage** only relevant files — never `.env`, credentials, or secrets.
2. **Draft** header (and body if multi-area or non-obvious why).
3. **Validate** before committing:
   ```bash
   echo "type: subject" | pnpm exec commitlint
   ```
4. **Commit** with HEREDOC (required for formatting):
   ```bash
   git add <paths>
   git commit -m "$(cat <<'EOF'
   type: subject line

   Optional body explaining why, not what.
   EOF
   )"
   ```
5. **Verify**: `git status`; if hook failed, fix message and make a **new** commit (do not amend unless user rules allow).

## Git safety (hard rules)

- **Never** update git config.
- **Never** run destructive git commands (`push --force`, `reset --hard`, etc.) unless the user explicitly asks.
- **Never** skip hooks (`--no-verify`, `--no-gpg-sign`) unless the user explicitly asks.
- **Never** force-push to `main` / `master`.
- **Never** commit unless the user asked in this conversation.
- **Avoid** `git commit --amend` unless all are true: user requested amend, HEAD commit is yours this session, and commit was **not** pushed.
- If a hook **rejects** the commit, fix the issue and create a **new** commit — do not amend a failed commit.

## Message quality

- Focus on **why** in the body; header states **what** changed.
- One logical change per commit when possible.
- Match recent repo tone (`git log`) — short, imperative subject (`add`, `fix`, `clarify`, not `added` / `fixes`).
- Do not mention "Cursor", "AI", or "agent" in commit messages.

## After commit

Report: commit hash, full message, and `git status` summary. Do **not** push unless the user asks.

## Reference

- Rules source: [`commitlint.config.mjs`](../../commitlint.config.mjs) (repo root)
- Branch naming: `feat/…`, `fix/…`, `docs/…`, `i18n/…` — see `DEVELOPING.md`
