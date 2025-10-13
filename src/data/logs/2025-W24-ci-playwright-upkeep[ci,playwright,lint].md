### Overview
All about keeping iteration fast: codified the Fast Refresh rules so Nexus components hot-reload cleanly, upgraded Playwright, and started publishing the HTML reports for any failing runs.

### Highlights
- [#4818](https://github.com/axiomhq/app/pull/4818) — Added a fast-refresh lint rule in `frontend/eslint.config.mjs` and moved every helper out of component files into `*.utils.ts`. That means `Permit.tsx`, `AplFormRenderer.tsx`, and dozens of chart modules now export pure components, so Vite’s React Fast Refresh stops forcing full page reloads during edits.
- [#4779](https://github.com/axiomhq/app/pull/4779), [#4842](https://github.com/axiomhq/app/pull/4842) — Bumped Playwright and wired `ci-frontend.yml` to upload the HTML report artifact on every run. The screenshot fixtures were regenerated to match the new browser version, and failures now expose the report straight from the Actions page.
