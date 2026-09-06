---
name: ui-ux-design-system-compliance
description: >-
  Enforces UI/UX design-system compliance: all colors must come from CSS
  variables in global.css (or @mana/styles tokens)—never hardcoded HEX/RGB/HSL.
  Use when creating or editing pages, components, styles, Tailwind classes,
  themes, or any UI work involving colors, spacing, or visual design.
---

# UI/UX Design System Compliance

Ensure every new or edited page and component follows the color system defined
in `global.css` (or the project's style-token file) with zero hardcoded color
values, while keeping UI/UX quality at a professional level.

## Hard Constraints

### Single Source of Truth

All colors used in components and pages must come from CSS variables defined in
`global.css` (or the equivalent in `@mana/styles`) — not from HEX, RGB, HSL, or
raw CSS color names.

### No Hardcoded Colors

Never write color values directly (inline styles, ad-hoc Tailwind classes with
numeric color values, or constants in stylesheet files). If a needed color is
missing from `global.css`:

1. First check whether an existing token is a suitable equivalent.
2. Otherwise, define a new variable in `global.css`, then use it in the
   component (never the reverse).

### Theme Consistency

Designs must work across all theme modes (light/dark when present) without
visual breakage, because colors are managed through variables.

### Pre-implementation Review

Before writing code, read and analyze `global.css` to learn the exact variable
names and each one's role (background, text, border, hover/active/disabled,
etc.).

## Quality Bar

- Apply solid UI/UX across all component states: default, hover, focus, active,
  disabled, loading, error, empty state.
- Spacing, typography, contrast, and accessibility (WCAG) must be professional-grade.
- Fully responsive across all breakpoints.
- Stay visually consistent with existing `@mana/ui` components; do not invent a
  new, incompatible design pattern without a clear reason.

## Workflow

1. **Read tokens** — Before any UI change, read `global.css` (or the
   `@mana/styles` equivalent) and extract the relevant variables.
2. **Map colors** — Map every needed color to an existing variable; if none
   fits, propose a new variable and **get approval before defining or using it**.
3. **Implement** — Use only variables / token-based classes; no direct
   HEX/RGB/HSL/color names.
4. **States** — Cover default, hover, focus, active, disabled, loading, error,
   and empty.
5. **Theme** — Verify light/dark (when applicable) with no visual breakage.
6. **Report** — Include the report below in the final response.

## Expected Output

Whenever a component or page is created or edited, the agent must:

1. Name the colors used and cite the matching `global.css` variables.
2. If a new color is needed, propose it as a variable first and get approval.
3. Provide a checklist of covered states (hover, focus, disabled, etc.).

### Report template

```markdown
### Design System Compliance

**Colors used**
| Usage | CSS variable |
| --- | --- |
| background | `--…` |
| text | `--…` |
| border | `--…` |
| hover / focus / … | `--…` |

**New tokens proposed** (if any — await approval before adding)
- `--token-name`: purpose / suggested value

**State checklist**
- [ ] default
- [ ] hover
- [ ] focus
- [ ] active
- [ ] disabled
- [ ] loading
- [ ] error
- [ ] empty state

**Theme**
- [ ] light
- [ ] dark (if applicable)

**Notes**
- spacing / typography / contrast / a11y / responsiveness
```

## Anti-patterns (forbidden)

- `style={{ color: '#fff' }}` or any inline color
- Tailwind arbitrary colors such as `bg-[#1a1a1a]`, `text-[rgb(…)]`,
  `border-[hsl(…)]`
- Color constants in TS/JS (`const PRIMARY = '#…'`)
- Defining a color only inside a component without adding it to `global.css`
- Visual patterns that clash with `@mana/ui` without a clear reason
