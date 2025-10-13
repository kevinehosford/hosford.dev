### Overview
Focused on dashboards this week: swapped the view flow over to the new GET-by-id API and trimmed the orphaned Playwright package that was still hanging around from the legacy harness.

### Highlights
- [#4920](https://github.com/axiomhq/app/pull/4920) — Dashboards now call `/dashboard/{integrationDashId}` directly, so the view-only experience no longer round-trips through list queries. `DashboardsStore` builds the fetch params from the view slug, and the Playwright suite gained updated HAR fixtures to prove clone/export still work with the new endpoint.
- [#4951](https://github.com/axiomhq/app/pull/4951) — Deleted the unused `frontend-e2e-tests` package-lock, removing the stale dependency tree that kept tripping Dependabot.
