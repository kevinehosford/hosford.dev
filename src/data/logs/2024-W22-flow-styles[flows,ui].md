### Overview
Wrapped up another round of flows design feedback and knocked out a few chart regressions.

### Highlights
- [#2061](https://github.com/axiomhq/app/pull/2061), [#2080](https://github.com/axiomhq/app/pull/2080), [#2086](https://github.com/axiomhq/app/pull/2086) — Updated the flow editor spacing, icons, and running-state badges to match design’s latest pass; the running indicator now surfaces “in progress” clearly in both light and dark modes.
- [#2058](https://github.com/axiomhq/app/pull/2058), [#2083](https://github.com/axiomhq/app/pull/2083) — Reworked the column width getters so user-resized columns stick, and the stats charts grow as expected instead of getting stuck at the initial width.
- [#2062](https://github.com/axiomhq/app/pull/2062) — Fixed AXM-3012 by rendering zero values in stats charts rather than empty cells.
- [#2085](https://github.com/axiomhq/app/pull/2085) — Reverted the `forwardRef` refactor that broke the preview sidebar interactions; the Flow preview toggles work again.
