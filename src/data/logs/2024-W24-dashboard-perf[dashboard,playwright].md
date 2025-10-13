### Overview
Light coding week focused on perf wins and keeping tests green.

### Highlights
- [#2249](https://github.com/axiomhq/app/pull/2249) — Optimized the tabular dashboard path so merged charts stop over-fetching; the new totals caching logic reduces duplicated queries when multiple panels share the same dataset.
- [#2214](https://github.com/axiomhq/app/pull/2214), [#2200](https://github.com/axiomhq/app/pull/2200) — Updated the flaky Playwright selectors after the nav shuffle and linkified “input:#:#” error messages so they behave like other log links.
