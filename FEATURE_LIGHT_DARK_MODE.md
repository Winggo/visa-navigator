# Feature: Dark / Light Mode Toggle

## Overview

Implements a dark/light mode toggle for the entire O-1 Visa Case Builder frontend. The app defaulted to a dark teal theme (`#374B46`); light mode introduces a white/slate aesthetic with the same coral accent (`#D97757`).

## Approach

**CSS Custom Properties + `next-themes`**

- All color tokens are defined as CSS variables in `globals.css` under `.dark` (default) and `.light` class selectors.
- Tailwind's `darkMode: "class"` config maps custom color names to these variables (e.g., `bg-surface-primary`, `text-content-secondary`).
- `next-themes` manages theme state, persists to `localStorage`, and toggles the `.dark` / `.light` class on `<html>`.
- A floating `ThemeToggle` button (top-right, `fixed top-4 right-4`) shows a sun or moon icon and is visible on all pages.

## Files Changed

### New Files
| File | Purpose |
|------|---------|
| `src/components/ThemeProvider.tsx` | Wraps app with `next-themes` provider (`defaultTheme: "dark"`, `attribute: "class"`) |
| `src/components/ThemeToggle.tsx` | Floating toggle button with sun/moon icon; uses `mounted` guard to prevent SSR hydration mismatch |

### Modified Files

| File | Changes |
|------|---------|
| `package.json` | Added `next-themes` dependency |
| `tailwind.config.ts` | Added `darkMode: "class"`; added `surface`, `content`, `border`, `badge`, `notice`, `success`, `progress`, `chat` color token namespaces referencing CSS variables |
| `src/app/globals.css` | Replaced `:root` block with `.dark` / `.light` class selectors defining all CSS variable tokens for both themes |
| `src/app/layout.tsx` | Added `suppressHydrationWarning` to `<html>`; wrapped body with `<ThemeProvider>` and `<ThemeToggle />` |
| `src/app/page.tsx` | Replaced hardcoded colors with token classes |
| `src/app/dashboard/[caseId]/page.tsx` | Replaced hardcoded colors with token classes; status badges and info boxes now use `badge-*`, `notice-*`, `success-*` tokens |
| `src/app/questionnaire/[caseId]/page.tsx` | Replaced hardcoded colors with token classes |
| `src/app/evidence/[caseId]/[criteriaId]/page.tsx` | Replaced hardcoded colors with token classes |
| `src/components/ui/Button.tsx` | `outline`/`ghost` variants use `text-content-secondary` |
| `src/components/ui/Input.tsx` | Input bg/text/border/label/hint use token classes |
| `src/components/ui/TextArea.tsx` | Same as Input |
| `src/components/ui/ProgressBar.tsx` | Progress track uses `bg-progress-track`; text uses `text-content-secondary` |
| `src/components/fields/MultiUrlField.tsx` | Label and hint use token classes |
| `src/components/fields/MultiFileField.tsx` | File item bg/border/icon/text use token classes |
| `src/components/questionnaire/QuestionContainer.tsx` | Bg, progress track, back button, question text/subtext use token classes |
| `src/components/questionnaire/ProgressDots.tsx` | Incomplete dot uses `bg-progress-track` |
| `src/components/questionnaire/questions/TextQuestion.tsx` | Input border/text/placeholder/OK hint use token classes |
| `src/components/questionnaire/questions/NumberQuestion.tsx` | Currency symbol, unit label, input, OK hint use token classes |
| `src/components/questionnaire/questions/YesNoQuestion.tsx` | Button borders/text, textarea, keyboard hint pills use token classes |
| `src/components/questionnaire/questions/SingleSelectQuestion.tsx` | Option borders/text, keyboard hint pills use token classes |
| `src/components/questionnaire/questions/MultiSelectQuestion.tsx` | Option borders/text, disabled OK button, keyboard hint pills use token classes |
| `src/components/chatbot/ChatHeader.tsx` | Border, title, subtitle, close button hover use token classes |
| `src/components/chatbot/ChatInput.tsx` | Border, textarea bg/text use token classes |
| `src/components/chatbot/ChatInterface.tsx` | Chat panel bg uses `bg-surface-secondary` |
| `src/components/chatbot/ChatMessages.tsx` | Bot bubble bg uses `bg-chat-bot-bg`; loading dots use `bg-content-muted` |

## CSS Token System

### Theme Variables (defined in `globals.css`)

| Token | Dark | Light |
|-------|------|-------|
| `--bg-primary` | `#374B46` | `#f8fafc` |
| `--bg-secondary` | `#2a3a36` | `#ffffff` |
| `--bg-tertiary` | `#1a2a26` | `#f1f5f9` |
| `--bg-input` | `#2a3a36` | `#ffffff` |
| `--bg-disabled` | `#1f2f2b` | `#f1f5f9` |
| `--text-primary` | `#ffffff` | `#0f172a` |
| `--text-secondary` | `#d1d5db` | `#475569` |
| `--text-muted` | `#9ca3af` | `#64748b` |
| `--border-primary` | `#374151` | `#e2e8f0` |
| `--border-secondary` | `#4b5563` | `#cbd5e1` |

### Tailwind Color Aliases (defined in `tailwind.config.ts`)

- `bg-surface-{primary,secondary,tertiary,input,disabled}`
- `text-content-{primary,secondary,muted}`
- `border-{primary,secondary}` → maps to `border-border-primary` / `border-border-secondary`
- `bg-badge-{green,blue,gray}-bg`, `text-badge-{green,blue,gray}-text`
- `bg-notice-bg`, `border-notice-border`, `text-notice-{text,heading}`
- `bg-success-bg`, `border-success-border`, `text-success-{text,heading}`
- `bg-progress-track`
- `bg-chat-bot-bg`

## What Was NOT Changed

- Accent color `#D97757` (coral) — looks good on both themes
- `text-white` inside coral buttons — always correct on coral background
- Score colors `text-green-600`, `text-yellow-600`, `text-red-600` — readable on both themes
- Red error states (`border-red-500`, `text-red-400`) — acceptable on both themes

## Notes for Engineers

- `suppressHydrationWarning` on `<html>` is **required** — `next-themes` mutates the `class` attribute after hydration
- `mounted` guard in `ThemeToggle.tsx` is **required** — prevents SSR icon mismatch
- To add a new theme, add a new CSS class (e.g., `.sepia`) with the same variable names in `globals.css` and pass it as an allowed theme to `NextThemesProvider`
- Default theme is `"dark"` to preserve the original app appearance; system preference detection is disabled (`enableSystem: false`)
