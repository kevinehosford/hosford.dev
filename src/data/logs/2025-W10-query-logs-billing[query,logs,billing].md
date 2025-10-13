### Overview
Locked down the lingering query selection bugs, improved log context navigation, and tidied the billing experience for non-billed plans.

### Highlights
- [#3983](https://github.com/axiomhq/app/pull/3983) — Introduced `InitialQueryFetcherStore` so query-string updates don’t trigger a fresh fetch, rewired the history query hook into `useDatasetsHistoryQueryToQueryFormInputs`, and memoized the InitialQueryFetcher props. This fixed the APL editor “auto-select” bug by keeping form defaults stable while still persisting params back to the URL.
- [#3973](https://github.com/axiomhq/app/pull/3973) — When jumping to “View in context” we now reuse the StreamSettings column state, ensure the target event scrolls into view via the new `virtuoso.scrollToIndex` helper, and handle multi-page results by flattening matches before sorting. Lesson: proper cursor bookkeeping eliminated the awkward double-scroll we used to see for contextual log checks.
- [#3948](https://github.com/axiomhq/app/pull/3948) — Redirected the billing route back to settings when the org is on a non-billed plan, instead of showing an empty page, while [#3945](https://github.com/axiomhq/app/pull/3945) removed the stale `frontend-workers` directory so Dependabot stops complaining.
