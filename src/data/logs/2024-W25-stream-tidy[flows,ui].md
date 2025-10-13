### Overview
Quick clean-up week: fixed a few lingering stream bugs and kept the preview tables aligned with the new flows layout.

### Highlights
- [#2289](https://github.com/axiomhq/app/pull/2289), [#2303](https://github.com/axiomhq/app/pull/2303) — The log stream no longer restores stale filters on reload, and the “duration” column defaults to timespan formatting so dashboards don’t show raw numbers.
- [#2302](https://github.com/axiomhq/app/pull/2302), [#2275](https://github.com/axiomhq/app/pull/2275), [#2264](https://github.com/axiomhq/app/pull/2264) — Fixed column metadata so query results label projections correctly, ensured `_time` is always projected in Flow previews, and stopped `GetTables` from returning `undefined` when the response only includes a single table.
- [#2256](https://github.com/axiomhq/app/pull/2256), [#2265](https://github.com/axiomhq/app/pull/2265) — Aligned the Flow empty state with the latest design and removed legacy flow components that were no longer referenced.
