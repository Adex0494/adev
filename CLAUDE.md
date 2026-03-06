# CLAUDE.md — ADEV Web Project Rules

## Project Overview

ADEV company website. Built with Next.js App Router, TypeScript (strict), Tailwind CSS v4,
Vitest, and React Testing Library.

**Stack**

| Concern       | Tool                                          |
|---------------|-----------------------------------------------|
| Framework     | Next.js 16+ (App Router)                      |
| Language      | TypeScript strict                             |
| Styling       | Tailwind CSS v4 (CSS-first, no config file)   |
| Testing       | Vitest + React Testing Library + jest-dom     |
| i18n          | Custom lightweight `t()` helper               |
| Theme         | CSS-variable tokens + ThemeProvider context   |

---

## Folder Structure

```
src/
  app/                    # Next.js App Router pages and layouts
    layout.tsx            # Root layout — includes ThemeProvider
    page.tsx              # Home page
    globals.css           # Design tokens + Tailwind import

  components/
    ui/                   # Reusable UI primitives
      Button.tsx
      Button.test.tsx
      Card.tsx / Card.test.tsx
      Badge.tsx / Badge.test.tsx
      Container.tsx / Container.test.tsx
      Section.tsx / Section.test.tsx
      Typography.tsx / Typography.test.tsx
      ThemeProvider.tsx / ThemeProvider.test.tsx
      ThemeToggle.tsx / ThemeToggle.test.tsx
      index.ts            # Barrel — import from '@/components/ui'

    sections/             # Page-level composed sections
      Hero.tsx / Hero.test.tsx
      index.ts            # Barrel — import from '@/components/sections'

  i18n/
    en.json               # English strings (source of truth)
    es.json               # Spanish strings
    index.ts              # t() helper

  lib/
    utils.ts              # cn() and shared utilities
    utils.test.ts

  types/
    vitest.d.ts           # Vitest global type declarations
```

Test files live next to the component they test. Always.

---

## Component Architecture

### Hierarchy

1. **UI primitives** (`src/components/ui/`) — atoms with no business logic.
   Button, Card, Badge, Container, Section, Typography, ThemeToggle, etc.

2. **Section components** (`src/components/sections/`) — page sections composed from UI primitives.
   Hero, ServicesGrid, FeaturedWork, ProcessTimeline, CTA, Footer, etc.

3. **Pages** (`src/app/`) — compose sections, minimal logic.

### Rules

- **Reuse first.** Before creating a new component, check if an existing one covers the case.
- **Composition over prop bloat.** Split a component rather than adding a 6th prop.
- **Small and testable.** Each component must be independently renderable in a test.
- **Server Components by default.** Only add `'use client'` when strictly needed
  (event handlers, browser APIs, React state/effects).

---

## Workflow: Adding a New Component

Follow these steps exactly.

### 1. Determine placement
- Pure UI with no domain logic → `src/components/ui/`
- Page section → `src/components/sections/`

### 2. Create the component file

```tsx
// src/components/ui/MyComponent.tsx
import { cn } from '@/lib/utils'

export interface MyComponentProps {
  variant?: 'default' | 'alt'
  className?: string
  children: React.ReactNode
}

export function MyComponent({ variant = 'default', className, children }: MyComponentProps) {
  return (
    <div className={cn('base-classes', variant === 'alt' && 'alt-classes', className)}>
      {children}
    </div>
  )
}
```

Rules:
- Export a named interface for props
- Accept and forward `className` for extension
- Use `cn()` for conditional classes
- Use design token classes (`bg-primary`, `text-foreground`, `border-border`, etc.) — never raw hex values
- All user-facing strings must come from `t()` — no hard-coded text

### 3. Write the test file immediately (same PR, same commit)

```tsx
// src/components/ui/MyComponent.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MyComponent } from './MyComponent'

describe('MyComponent', () => {
  it('renders children', () => {
    render(<MyComponent>Hello</MyComponent>)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('applies default variant class', () => {
    render(<MyComponent data-testid="c">Hello</MyComponent>)
    expect(screen.getByTestId('c')).toHaveClass('base-classes')
  })

  it('applies alt variant class', () => {
    render(<MyComponent variant="alt" data-testid="c">Hello</MyComponent>)
    expect(screen.getByTestId('c')).toHaveClass('alt-classes')
  })

  it('accepts custom className', () => {
    render(<MyComponent className="extra" data-testid="c">Hello</MyComponent>)
    expect(screen.getByTestId('c')).toHaveClass('extra')
  })
})
```

### 4. Export from the barrel

Add to `src/components/ui/index.ts`:
```ts
export { MyComponent } from './MyComponent'
export type { MyComponentProps } from './MyComponent'
```

### 5. Verify tests pass

```bash
npm test
```

A component without passing tests is not complete.

---

## Testing Policy (Mandatory)

Testing is not optional. Every component and every utility must have tests.

### Setup

| Package                        | Role                              |
|--------------------------------|-----------------------------------|
| `vitest`                       | Test runner                       |
| `@vitejs/plugin-react`         | JSX/TSX transformation            |
| `@testing-library/react`       | React component rendering         |
| `@testing-library/jest-dom`    | DOM matchers (`toBeInTheDocument`) |
| `@testing-library/user-event`  | User interaction simulation       |
| `jsdom`                        | DOM environment                   |

Config: `vitest.config.ts` + `vitest.setup.ts`

### Scripts

```bash
npm test                  # run all tests once
npm run test:watch        # watch mode
npm run test:coverage     # coverage report
```

### What every component test must cover

| Category          | Examples                                                     |
|-------------------|--------------------------------------------------------------|
| Rendering         | renders children, renders correct HTML element               |
| Props / variants  | each variant class, each size class                          |
| Interactions      | onClick fires, disabled prevents click, toggle changes state |
| Accessibility     | role, aria-label, aria-disabled, aria-busy                   |
| Composition       | sub-components work together                                 |
| Conditional state | loading spinner shown, disabled state applied                |

### For Client Components with context (e.g. ThemeToggle)

Wrap in the required provider:
```tsx
function renderWithProvider(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>)
}
```

### Definition of Done for tests

- `npm test` exits with code 0
- No skipped tests (`it.skip`, `describe.skip`) without documented reason
- New tests added for every changed or added behaviour

---

## i18n Rules

All user-visible strings must come from a translation file. No exceptions.

### Files

```
src/i18n/en.json    ← English (source of truth, add keys here first)
src/i18n/es.json    ← Spanish
src/i18n/index.ts   ← t() helper
```

### Usage

```tsx
import { t } from '@/i18n'

// In any Server or Client Component:
<h1>{t('home.hero.title')}</h1>
<Button>{t('common.getInTouch')}</Button>
```

### Key naming convention

```
{page}.{section}.{element}
common.{action}
nav.{item}
footer.{field}
```

### Adding a new string

1. Add the key to `en.json` first.
2. Add the matching key to `es.json`.
3. Use `t('your.key')` in the component.

Hard-coded UI text inside `.tsx` files is a bug, not a style preference.

---

## Design Tokens & Palette

All colors come from CSS custom properties defined in `src/app/globals.css`.

### Token reference

| Token                  | Tailwind class             | Usage                                |
|------------------------|----------------------------|--------------------------------------|
| `--bg`                 | `bg-background`            | Page and surface backgrounds         |
| `--fg`                 | `text-foreground`          | Primary body text                    |
| `--muted`              | `text-muted`               | Secondary text, placeholders         |
| `--card`               | `bg-card`                  | Card and panel backgrounds           |
| `--border`             | `border-border`            | Borders and dividers                 |
| `--primary`            | `bg-primary`               | Brand / CTA color                    |
| `--primary-foreground` | `text-primary-foreground`  | Text on primary backgrounds          |
| `--accent`             | `bg-accent`                | Highlight / secondary brand color    |
| `--ring`               | `ring-ring`                | Focus rings                          |
| `--success`            | `bg-success`               | Success states                       |
| `--warning`            | `bg-warning`               | Warning states                       |
| `--danger`             | `bg-danger`                | Error / destructive actions          |

### Rules

- **Never use raw hex values inside components.** Use token classes only.
- Light values are defined in `:root {}`.
- Dark values override tokens in `.dark {}`.
- Tailwind utilities (`bg-primary`, `text-foreground`, etc.) are generated automatically via
  `@theme inline` in `globals.css` — no `tailwind.config.ts` needed.

### Correct example

```tsx
// Good
<div className="bg-card border border-border text-foreground">...</div>

// Bad — violates token rule
<div style={{ backgroundColor: '#f9fafb', color: '#0f0f0f' }}>...</div>
```

---

## Theme System

### How it works

1. `ThemeProvider` (client component) stores theme preference and applies `.dark` or `.light`
   class to `<html>`.
2. A FOUC-prevention inline `<script>` in `layout.tsx` sets the class before React hydrates.
3. Preference persists in `localStorage` under key `adev-theme`.
4. Default: system preference via `window.matchMedia('(prefers-color-scheme: dark)')`.

### ThemeToggle

```tsx
import { ThemeToggle } from '@/components/ui/ThemeToggle'
// or
import { ThemeToggle } from '@/components/ui'

<ThemeToggle />                         // default position
<ThemeToggle className="absolute ..." />  // custom position
```

### useTheme hook

```tsx
'use client'
import { useTheme } from '@/components/ui/ThemeProvider'

function MyClientComponent() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  // theme: 'light' | 'dark' | 'system'
  // resolvedTheme: 'light' | 'dark'
  // setTheme: (t: Theme) => void
}
```

`useTheme` must be used inside `<ThemeProvider>` (already in `layout.tsx` root).

---

## Code Quality Rules

- **TypeScript strict** — `strict: true` in `tsconfig.json`, no `any`, no `// @ts-ignore`.
- **ESLint must pass** — run `npm run lint` before marking a task done.
- **Tailwind only** — no inline `style={{}}` except for truly dynamic values (e.g. CSS custom
  properties for animations). Never for colors or spacing.
- **Semantic HTML** — use `<section>`, `<article>`, `<nav>`, `<main>`, `<aside>` appropriately.
- **Accessibility** — every interactive element needs an accessible name. Use `aria-label` on
  icon-only buttons. Use `aria-hidden="true"` on decorative SVGs.
- **Focus states** — never `outline: none` without a visible replacement. Use `focus-visible:`
  Tailwind variants.
- **Server Components by default** — only add `'use client'` to the smallest possible subtree.

---

## Autonomy

Do NOT ask for permission to:
- create or move files
- refactor or restructure folders
- add or update configuration
- update barrel exports

**Ask only when a product requirement is ambiguous and blocks progress.**

Choose the best engineering decision, make the change, then explain what was done and why.

---

## Definition of Done

A task is complete when ALL of the following are true:

- [ ] `npm test` exits 0 — all tests pass, no skips
- [ ] `npm run lint` exits 0 — no ESLint errors
- [ ] No hard-coded UI strings — all text comes from `t()`
- [ ] No raw hex values in components — all colors from token classes
- [ ] New component exported from barrel index
- [ ] Test file exists next to every new component/utility
- [ ] Tests cover: render, props/variants, interactions, accessibility, conditional states
