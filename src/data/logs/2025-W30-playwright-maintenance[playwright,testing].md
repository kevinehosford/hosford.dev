### Overview
Light testing-only week: we parked the brittle annotations scenario so the migration work can proceed without the false reds.

### Highlights
- [#5123](https://github.com/axiomhq/app/pull/5123) — Marked `dashboards/annotations.test.ts` as skipped after the mocked annotation flow fell out of sync with real data. The change documents the clock/quick-range drift we need to solve and keeps the flaky assertions from blocking the next refactor of the Playwright harness.
