### Overview
Light week. Corrected the dashboard authoring docs for MPL chart queries (turns out the docs were wrong about which fields the create API actually accepts), and relaxed a date-format test that was breaking on newer Node ICU/CLDR data.

### Highlights
- [axiomhq/skills#45](https://github.com/axiomhq/skills/pull/45) — Updated the dashboard authoring docs: metrics/MPL charts must set both `query.apl` (containing the MPL pipeline) and `query.metricsDataset`. The create API rejects `query.mpl` (even though GET returns it), and the prior examples/manual tests were following the wrong shape.
- [#7745](https://github.com/axiomhq/app/pull/7745) — `dates.test.ts` asserted `formatTimeZone('Europe/London', ts, 'de-de') === 'GMT'` but CI Node ships newer ICU/CLDR that renders the same input as `'GMT+0'`. Both are correct. Relaxed the assertion to `/^GMT(\+0)?$/` so the suite stops flaking across Node/ICU versions — surfaced while CI on #7743 and #7744 hit the same failure in the Code Quality coverage run, fallout from #7726 (de-locale date fix).
