### Overview
Explored a CodeMirror-based editor, opened the door for org-wide AI controls, and continued tightening billing/trace tooling.

### Highlights
- [#4260](https://github.com/axiomhq/app/pull/4260) — Stood up a CodeMirror prototype for APL with custom completions and grammar adapters, laying the groundwork for a Monaco replacement.
- [#4222](https://github.com/axiomhq/app/pull/4222) — Added the org-level AI settings panel plus `aiEnabled()` helpers and the `setEnableAi` endpoint so feature flags and billing limits stay in sync.
- [#4281](https://github.com/axiomhq/app/pull/4281) — Captured trace IDs automatically when filing support bug reports, making escalations easier to reproduce.
- [#4284](https://github.com/axiomhq/app/pull/4284) — Exposed the compute credits UI to dev/staging by keying off `isEnvDev()`, and updated the usage query so we surface current balances even after the first purchase.
- [#4311](https://github.com/axiomhq/app/pull/4311) — Regenerated SCSS types and tidied the affected components to keep type-checking in sync with recent styling changes.
