### Overview
Shipped spend-limit controls, smoothed a few rough edges in the query UI, and kept the billing plan pages behaving for large orgs.

### Highlights
- [#4499](https://github.com/axiomhq/app/pull/4499) — Added spend-limit components (warning banner, slideouts, and the new `updateSpendLimits` mutation) so enterprise customers can manage their budgets in-product.
- [#4522](https://github.com/axiomhq/app/pull/4522), [#4555](https://github.com/axiomhq/app/pull/4555) — Fixed event-panel navigation not updating consistently and removed an extra query observer that was double-running requests.
- [#4577](https://github.com/axiomhq/app/pull/4577) — Patched the plan page so orgs without billing data don’t get a blank screen.
- [#4583](https://github.com/axiomhq/app/pull/4583) — Disposed the APL store correctly on unmount to eliminate lingering editor subscriptions.
