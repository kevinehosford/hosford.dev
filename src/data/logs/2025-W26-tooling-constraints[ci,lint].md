### Overview
Pure hygiene week: tightened our TypeScript lint rules around navigation and locked the toolchain to the exact Node build we ship.

### Highlights
- [#4946](https://github.com/axiomhq/app/pull/4946) — Added `react-router-dom` to the restricted-imports list in `frontend/eslint.config.mjs`, dropping a `// restricted` banner into every route component so folks reach for the TanStack helpers instead of the legacy router.
- [#4949](https://github.com/axiomhq/app/pull/4949) — Pinned `frontend/package.json` to the full `22.4.1` Node version so dev shells and CI use the same toolchain when running Vite and Playwright.
