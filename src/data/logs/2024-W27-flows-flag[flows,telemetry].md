### Overview
Short week focused on hardening: I gated flows behind the LaunchDarkly flag, fixed a couple of navigation quirks, and calmed down the telemetry endpoints that were returning 502s.

### Highlights
- [#2373](https://github.com/axiomhq/app/pull/2373), [#2372](https://github.com/axiomhq/app/pull/2372) — Flows visibility now respects the `flows` LaunchDarkly flag throughout the app, and `initForm` parameters are always decoded before we hydrate the query view, so shared links stop presenting broken filters.
- [#2353](https://github.com/axiomhq/app/pull/2353), [#2378](https://github.com/axiomhq/app/pull/2378) — Stopped spamming `/exapi/instrument` by short-circuiting when LD/Faro configs are missing, and raised the dashboard change notifier `z-index` so alerts sit above charts instead of hiding behind tooltips.
- [#2350](https://github.com/axiomhq/app/pull/2350), [#2371](https://github.com/axiomhq/app/pull/2371) — Extended the NextAuth session lifetime used in Playwright so e2e runs stop expiring mid-test, and cleaned up the maintenance banner (the retired “Max Teams” incident no longer appears).
