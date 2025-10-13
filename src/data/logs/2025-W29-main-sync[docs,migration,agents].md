### Overview
Mostly bookkeeping: merged `main` to pick up the latest dataset/flows rework and captured the product requirements for our docs dogfooding push.

### Highlights
- [#5085](https://github.com/axiomhq/app/pull/5085) — Pulled in the July `main` drop, which landed the new dataset view manager (`routes/datasets/$resourceId/-manage-view-panel.tsx`), refreshed flow destination forms, Vega spotlight polish, and the agent-facing graphite prompt bundles under `frontend/AGENT/`. The merge also synced updated pricing helpers, changelog metadata, and a sweep of Playwright fixes that keep stream/query dashboards aligned.
- [#5083](https://github.com/axiomhq/app/pull/5083) — Added `frontend/docs/product-requirements-checklist.md` so the docs/dogfooding crew has a PRD to cross-reference with test coverage and keep scope explicit.
