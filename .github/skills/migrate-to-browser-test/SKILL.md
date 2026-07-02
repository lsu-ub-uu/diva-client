---
name: migrate-to-browser-test
description: 'Migrate component tests from jsdom/React Testing Library to Vitest browser mode with vitest-browser-react. Use when: converting jsdom tests to browser tests, moving from @testing-library/react to vitest-browser-react, renaming test files to .browser.test.tsx'
argument-hint: 'Path to the jsdom test file to migrate (e.g. app/components/MyComponent/__tests__/MyComponent.test.tsx)'
---

# Migrate Component Test to Vitest Browser Mode

## When to Use

- A jsdom-based component test needs real browser behavior (popovers, focus, scroll, CSS)
- Tests use workarounds like `act()`, `waitFor()`, or `fireEvent` that a real browser would not need
- The component under test relies on browser APIs not available in jsdom

## Prerequisite Check

Before migrating, confirm the test file:

1. Is a `.test.tsx` file (component test, not `.server.test.ts`)
2. Lives under `app/components/` or another UI directory
3. Uses `@testing-library/react` and/or `@testing-library/user-event`

## Migration Procedure

### Step 1: Read the source test

Read the existing jsdom test file to understand its structure, imports, mocks, and assertions.

### Step 2: Create the browser test file

Rename the file from `ComponentName.test.tsx` to `ComponentName.browser.test.tsx` in the same directory. This ensures it is picked up by the `browser` test project in `vite.config.ts` (pattern: `**/*.browser.test.{ts,tsx}`).

### Step 3: Transform imports

Replace:

```tsx
import { render, screen, act, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
```

With:

```tsx
import { render } from 'vitest-browser-react';
```

Keep `describe, expect, it, vi` from `vitest` unchanged.

### Step 4: Transform render calls

Replace:

```tsx
render(<Component />);
// or
await act(() => render(<Component />));
```

With:

```tsx
const screen = await render(<Component />);
```

The `render` from `vitest-browser-react` is async. It returns a scoped `screen` object — no global `screen` import needed.

### Step 5: Transform queries

Replace global `screen` calls with the scoped `screen` returned from `render`:

```tsx
// Before (jsdom)
screen.getByRole('button', { name: 'Save' });
screen.getByText('Hello');
screen.queryByText('Missing');

// After (browser)
screen.getByRole('button', { name: 'Save' }); // same API, but on returned screen
screen.getByText('Hello');
```

### Step 6: Transform assertions

Replace `toBeInTheDocument()` and similar jsdom matchers with `expect.element()`:

```tsx
// Before (jsdom)
expect(screen.getByText('Hello')).toBeInTheDocument();
expect(screen.getByText('Hello')).toBeVisible();
expect(screen.queryByText('Gone')).not.toBeInTheDocument();

// After (browser)
await expect.element(screen.getByText('Hello')).toBeVisible();
await expect.element(screen.getByText('Gone')).not.toBeVisible();
```

Key differences:

- `expect.element(locator)` instead of `expect(element)` — it auto-retries
- All `expect.element()` calls must be awaited
- Use `.not.toBeVisible()` instead of checking for `null` / `not.toBeInTheDocument()`
- `toBeInTheDocument()` → `toBeVisible()` or `toBeInTheDocument()` (both work, prefer `toBeVisible` when checking visibility)
- **Gotcha: `<option>` elements** inside a `<select>` are not considered visible in a real browser (unlike jsdom). Use `toBeInTheDocument()` instead of `toBeVisible()` for option assertions.

### Step 7: Transform user interactions

Replace `userEvent` setup with direct locator actions:

```tsx
// Before (jsdom)
const user = userEvent.setup();
await user.click(screen.getByRole('button', { name: 'Submit' }));
await user.type(screen.getByRole('textbox'), 'hello');

// After (browser)
await screen.getByRole('button', { name: 'Submit' }).click();
await screen.getByRole('textbox').fill('hello');
```

No `userEvent.setup()` needed. Interactions are methods on locators.

Available locator actions: `.click()`, `.fill(value)`, `.clear()`, `.dblClick()`, `.tripleClick()`, `.hover()`, `.dropTo(target)`, `.selectOptions(values)`.

### Step 8: Transform scoped queries (`within`)

If the jsdom test uses `within()` to scope queries to a subtree:

```tsx
// Before (jsdom)
import { within } from '@testing-library/react';
const nav = screen.getByRole('navigation');
expect(within(nav).getByRole('link', { name: 'Home' })).toBeInTheDocument();

// After (browser)
// Use the scoped screen directly — locators compose naturally
const nav = screen.getByRole('navigation');
await expect.element(nav.getByRole('link', { name: 'Home' })).toBeVisible();
```

Locators returned from `screen.getBy*()` support chaining sub-queries, so `within()` is not needed.

### Step 9: Transform keyboard events

Replace `fireEvent.keyDown` / `userEvent.keyboard` with locator `keyboard` actions:

```tsx
// Before (jsdom)
fireEvent.keyDown(element, { key: 'Escape' });
// or
await user.keyboard('{Escape}');

// After (browser)
await screen.getByRole('dialog').press('Escape');
// or for arbitrary key sequences on focused elements:
await userEvent.keyboard('{Escape}');
```

For key presses on a specific element, use `.press(key)` on the locator. Import `userEvent` from `@vitest/browser/context` if you need global keyboard actions not targeted at a specific element:

```tsx
import { userEvent } from '@vitest/browser/context';
await userEvent.keyboard('{Escape}');
```

### Step 10: Remove unnecessary wrappers

- Remove `act()` wrappers — the browser handles updates naturally
- Remove `waitFor()` — `expect.element()` auto-retries by default
- Remove `fireEvent` — use locator actions instead
- Keep `vi.mock()` calls if they mock modules (not DOM events)

### Step 11: Handle router context

If the jsdom test uses `createRoutesStub` or `renderWithRoutesStub`:

- These still work in browser mode
- Keep the same pattern but use `render` from `vitest-browser-react`

### Step 12: Delete the old jsdom test file

Once the browser test passes, delete the original `.test.tsx` file to avoid running the same test in both environments.

## Quick Reference: Import Mapping

| jsdom (before)                                                  | browser (after)                                 |
| --------------------------------------------------------------- | ----------------------------------------------- |
| `import { render, screen } from '@testing-library/react'`       | `import { render } from 'vitest-browser-react'` |
| `import userEvent from '@testing-library/user-event'`           | _(remove — use locator actions)_                |
| `import { act, waitFor, within } from '@testing-library/react'` | _(remove — usually not needed)_                 |
| `screen.getByRole(...)` (global)                                | `screen.getByRole(...)` (from render return)    |
| `expect(el).toBeInTheDocument()`                                | `await expect.element(loc).toBeVisible()`       |
| `user.click(el)`                                                | `await loc.click()`                             |
| `user.type(el, text)`                                           | `await loc.fill(text)`                          |
| `within(el).getByRole(...)`                                     | `loc.getByRole(...)` (chain on locator)         |
| `fireEvent.keyDown(el, { key })`                                | `await loc.press(key)`                          |
| `import { within } from '@testing-library/react'`               | _(remove — use locator chaining)_               |

## Checklist

- [ ] File renamed to `.browser.test.tsx`
- [ ] `render` imported from `vitest-browser-react`
- [ ] No `@testing-library/react` or `@testing-library/user-event` imports remain
- [ ] All `render()` calls are awaited and destructure `screen`
- [ ] All assertions use `await expect.element()`
- [ ] All interactions use locator actions (`.click()`, `.fill()`, etc.)
- [ ] No `act()`, `waitFor()`, or `fireEvent` wrappers remain (unless truly needed)
- [ ] Old `.test.tsx` file is deleted
- [ ] Tests pass: `npx vitest run --project browser <file>`
