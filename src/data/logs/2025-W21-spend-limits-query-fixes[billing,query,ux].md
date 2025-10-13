### Overview
Iterated on the spend-limit experience and fixed a couple of UI bugs that were tripping users up in query history.

### Highlights
- [#4661](https://github.com/axiomhq/app/pull/4661) — Applied design feedback to the spend-limit flow (copy tweaks, layout adjustments) following last week’s launch.
- [#4680](https://github.com/axiomhq/app/pull/4680) — Ensured mutations surface toast errors so failures don’t silently disappear.
- [#4645](https://github.com/axiomhq/app/pull/4645), [#4635](https://github.com/axiomhq/app/pull/4635) — Fixed a time-range button wrapping issue and a Safari back/forward regression caused by `Map.forEach` on undefined.
