### Overview
Rounded out the week fixing flows progress and tabular chart quirks while instrumenting TrackJS with trace IDs for better debugging.

### Highlights
- [#3425](https://github.com/axiomhq/app/pull/3425), [#3437](https://github.com/axiomhq/app/pull/3437) — Patched the flows progress polling so the preview no longer stalls, and fixed the list filter logic that was clearing selections. QA confirmed the timeline graph now survives multiple start/stop cycles without losing state.
- [#3433](https://github.com/axiomhq/app/pull/3433), [#3411](https://github.com/axiomhq/app/pull/3411), [#3406](https://github.com/axiomhq/app/pull/3406) — Knocked down the lingering tabular issues (pie totals, odd groupings, placeholder records) by tightening the aggregation helpers. The tabular chart suite is back to parity with the legacy renderer after these patches.
- [#3415](https://github.com/axiomhq/app/pull/3415) — Added `trace_id` to TrackJS and Faro payloads so we can correlate browser crashes with the backend trace. That makes the new flows progress path a lot easier to debug when production sessions go sideways.
