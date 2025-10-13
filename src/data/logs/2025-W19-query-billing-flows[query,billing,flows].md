### Overview
Cleaned up the progressive queries rollout, fixed a couple of billing edge cases, and kept flows/insights UX moving forward.

### Highlights
- [#4133](https://github.com/axiomhq/app/pull/4133) — Removed the “progressive queries” user preference toggle so the feature flag is the single source of truth, updating mocks and user preference migrations accordingly.
- [#4416](https://github.com/axiomhq/app/pull/4416) — Fixed the duration formatter that was rounding values before display, keeping query timing accurate.
- [#4491](https://github.com/axiomhq/app/pull/4491) — Dropped the zero-day retention limit from the enterprise license payload so plans no longer show an impossible cap.
- [#4500](https://github.com/axiomhq/app/pull/4500) — Added an empty-state placeholder to Flow Insights so the page communicates what to expect before data arrives.
