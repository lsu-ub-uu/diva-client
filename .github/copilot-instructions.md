# Copilot instructions for diva-client

## Architecture and data flow

- This is a full-stack React Router v7 SSR app on a custom Express server. Entry points are [../server.ts](../server.ts) (Node runtime) and [../server/app.ts](../server/app.ts) (React Router request handler).
- Route tree is defined centrally in [../app/routes.ts](../app/routes.ts). Add/modify pages there first, then implement route modules in [../app/routes/](../app/routes/).
- `root` route is the app composition point: session + auth renewal middleware, global loader data, i18n, notifications, header/footer layout in [../app/root.tsx](../app/root.tsx).
- Server-only modules follow `*.server.ts` naming (e.g. [../app/cora/getRecordDataById.server.ts](../app/cora/getRecordDataById.server.ts)). Keep browser code out of these files.
- Cora API access lives under [../app/cora/](../app/cora/) with URL/content-type helpers in [../app/cora/helper.server.ts](../app/cora/helper.server.ts). Reuse helper constants before adding new headers/content types.
- BFF/domain transforms are explicit and file-scoped under [../app/cora/transform/](../app/cora/transform/). Preserve existing transform style instead of embedding conversions in route components.
- Dependency pools (metadata, presentations, record types, etc.) are loaded once and reused via [../server/dependencies/depencencies.ts](../server/dependencies/depencencies.ts); RabbitMQ data-change events update pools incrementally.

## Project conventions that matter

- Use path alias `@/* -> app/*` from [../tsconfig.json](../tsconfig.json); prefer `@/` imports over deep relative paths.
- Keep generated type artifacts in [../app/generatedTypes/](../app/generatedTypes/); regenerate via `npm run typegen` (script calls [../typegen/main.ts](../typegen/main.ts)).
- For Cora raw-record serialization, underscore-prefixed keys represent attributes; see `isAttribute()` / `findChildrenAttributes()` in [../app/cora/transform/transformToRaw.ts](../app/cora/transform/transformToRaw.ts).
- Error normalization for data calls uses [../app/data/errorHandler.server.ts](../app/data/errorHandler.server.ts) (Axios status + safe message).
- `no-console` is enforced except `error|warn|info|trace` (see [../eslint.config.js](../eslint.config.js)); do not add `console.log`.

## CSS and design tokens

- Global styles are composed in [../app/styles/root.css](../app/styles/root.css), which imports color/spacing/typography files and defines CSS layers (`@layer root, components`).
- Prefer existing CSS custom properties over hardcoded values. Main token sources are [../app/styles/colors.scss](../app/styles/colors.scss) (`--color-*`), [../app/styles/spacing.css](../app/styles/spacing.css) (`--gap-*`, input heights), and [../app/styles/typography.css](../app/styles/typography.css) (`--font-*`).
- When styling components, use `var(--...)` tokens for color, spacing, radii, typography, and elevation (e.g. `var(--color-text)`, `var(--gap-l)`, `var(--border-radius)`, `var(--elevation)`).
- Dark mode is token-driven via `[data-color-scheme='dark']` in [../app/styles/colors.scss](../app/styles/colors.scss); theme selection is applied on `<body data-color-scheme=...>` in [../app/root.tsx](../app/root.tsx). Keep new styles compatible with both schemes by relying on tokens.

## Dev workflows

- Prereqs: Node `22.14.0` (see [../package.json](../package.json)).
- Main dev loop: `npm run dev` (runs type generation, then `tsx server.ts`).
- Useful variants: `npm run dev:minikube`, `npm run dev:preview` for different Cora backends.
- Type/lint/style checks: `npm run typecheck`, `npm run lint`, `npm run stylelint`.
- Tests: `npm test` (Vitest), `npm run test:ci` for JUnit report, `npm run coverage` for coverage output.
- Production path: `npm run build` then `npm start` (prestart rewrites placeholders via [../scripts/prestart.js](../scripts/prestart.js)).

## Integrations and runtime settings

- Required env vars: `CORA_API_URL`, `CORA_LOGIN_URL`, `CORA_EXTERNAL_SYSTEM_URL` (validated in [../server.ts](../server.ts)).
- Optional env vars used often: `BASE_PATH` (commonly `/divaclient`), `PORT`, `SESSION_SECURE`, `SESSION_SECRETS`, RabbitMQ `RABBITMQ_HOST`/`RABBITMQ_PORT`.
- Prometheus metrics are exposed at `${BASE_PATH}/metrics` in [../server.ts](../server.ts).
- In tests, environment and browser APIs are stubbed in [../setupTest.ts](../setupTest.ts); extend this file when adding APIs missing in jsdom.

## Testing patterns to copy

- HTTP-layer tests mock Axios with `axios-mock-adapter` (see [../app/cora/**tests**/getRecordDataById.server.test.ts](../app/cora/__tests__/getRecordDataById.server.test.ts)).
- Session middleware tests mock `sessions.server` and assert `Set-Cookie` side effects (see [../app/auth/**tests**/sessionMiddleware.test.ts](../app/auth/__tests__/sessionMiddleware.test.ts)).
- Integration with RabbitMQ is unit-tested by mocking `amqplib` (see [../server/**tests**/listenForDataChange.test.ts](../server/__tests__/listenForDataChange.test.ts)).
