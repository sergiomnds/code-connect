# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository structure

This is a pnpm workspace monorepo with two apps:

- `apps/api` — NestJS backend (TypeScript, ESM)
- `apps/web` — React 19 + Vite frontend (TypeScript)

Both apps are currently at their framework-generated starting point (default Nest controller/service, default Vite/React template) — there is no established custom architecture yet.

## Commands

Run from the repo root (scripts proxy to the relevant workspace via pnpm `--filter`):

```bash
# web (apps/web)
pnpm web:dev       # start Vite dev server
pnpm web:build     # tsc -b && vite build
pnpm web:preview   # preview production build
pnpm web:lint      # oxlint

# api (apps/api)
pnpm api:dev       # nest start --watch
pnpm api:start     # nest start
pnpm api:build     # nest build
pnpm api:test      # vitest run (unit tests)
pnpm api:test:e2e  # vitest run --config ./vitest.config.e2e.ts
```

To run a single api test file or pattern, `cd apps/api` and use vitest directly, e.g.:
```bash
pnpm exec vitest run src/app.controller.spec.ts
pnpm exec vitest run -t "test name"
```

There is no root-level lint/test/build aggregator — invoke the `web:*`/`api:*` scripts individually, or `cd` into the target app and use its local scripts/tooling directly.

## Tooling notes

- Both apps lint with **oxlint**, not ESLint.
- `apps/api` tests run on **vitest** (not Jest, despite being a NestJS app) — see `apps/api/vitest.config.ts` and `vitest.config.e2e.ts`.
- `apps/api` is an ESM package (`"type": "module"` in its `package.json`).

## Frontend conventions (apps/web)

- Structure components using **atomic design** (atoms → molecules → organisms → templates → pages).
- Style with **Tailwind CSS**.
- Every component must have a test covering its essential usage (main render/interaction path), not just a smoke test.

## Backend conventions (apps/api)

- Follow REST principles strictly: proper resource-based URLs, correct HTTP methods (GET/POST/PUT/PATCH/DELETE) and status codes, statelessness, and consistent representation of resources across endpoints.

## Git conventions

- Use **Conventional Commits** (`feat:`, `fix:`, `chore:`, `refactor:`, `test:`, `docs:`, etc.) for both `apps/web` and `apps/api`.
