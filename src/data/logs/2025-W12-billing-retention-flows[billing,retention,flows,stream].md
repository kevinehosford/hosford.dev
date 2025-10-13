### Overview
Rounded out billing configuration with retention controls and polished the new credits/add-ons UX, while continuing to iterate on flow insights and stream stability.

### Highlights
- [#4084](https://github.com/axiomhq/app/pull/4084) — Let admins set dataset retention when creating or editing a dataset, wiring the new `useRetentionPeriod` flag through the store, API client, and confirmation flows so billing limits stay in sync.
- [#4091](https://github.com/axiomhq/app/pull/4091) — Updated the Stripe portal redirect to use the typed request payload and refreshed the add-on preview design so prorated totals are clearer before checkout.
- [#4090](https://github.com/axiomhq/app/pull/4090) — Added flow-type coloring and hover summaries to the Insights Sankey chart, making it obvious how replay versus continuous traffic moves through ATC.
- [#4087](https://github.com/axiomhq/app/pull/4087), [#4076](https://github.com/axiomhq/app/pull/4076), [#4073](https://github.com/axiomhq/app/pull/4073) — Restored inline log-stream warnings instead of toast spam, suppressed APL warnings during streaming, and ensured context queries include `streaming-duration` so long tails don’t time out.
