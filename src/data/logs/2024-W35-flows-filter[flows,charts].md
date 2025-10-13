### Overview
Kept flows usable with a new replay filter, polished the percentiles charts, and trimmed back our tabular noise (and stray PII) ahead of the broader rollout.

### Highlights
- [#2774](https://github.com/axiomhq/app/pull/2774) — Added a replay filter to the flows sidebar so you can scope runs right from the left nav; the navigation menu primitives picked up active-state styling and the replay list now syncs with location history.
- [#2792](https://github.com/axiomhq/app/pull/2792) — Fixed the merged-chart headaches by normalizing percentile chart opts, restoring the missing tooltip rows, and cleaning up how `ElementsDatasetStore` hydrates merged results so the query status bar stays accurate.
- [#2771](https://github.com/axiomhq/app/pull/2771), [#2789](https://github.com/axiomhq/app/pull/2789) — Dialed back the tabular flag to opt-in only (reducing accidental traffic while we harden it) and scrubbed the lingering PII from `Authed.tsx` so we’re not leaking user context while loading.
