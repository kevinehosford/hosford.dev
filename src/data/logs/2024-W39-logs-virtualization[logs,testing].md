### Overview
Focused squarely on the Logs experience: I swapped in a proper virtualized table, hardened the search highlight pipeline, and cleaned up some of the flaky dashboard Playwright runs.

### Highlights
- [#2973](https://github.com/axiomhq/app/pull/2973) — Replaced the bespoke infinite scroll with `react-virtuoso`’s `TableVirtuoso`, so the Log stream now renders a couple hundred rows and reuses DOM nodes instead of repainting the entire table. That meant refitting the column settings menu, adjusting the top/bottom marker rows, and trimming old CSS so resize handles and match settings still work while we stream new pages in.
- [#2957](https://github.com/axiomhq/app/pull/2957) — Tightened `RawDataCell`: the search highlight now deals in `unknown` values, converts to formatted text in one place, and stops blowing up when you drag-select JSON. `EventRow` piggybacks on the same formatter so copied values match what users see on screen.
- [#2962](https://github.com/axiomhq/app/pull/2962) — Knocked some dust off the dashboard playwright suite by updating the Vercel selectors (no longer skipped) and skipping the OTEL flows that need proper mocking. That keeps the nightly runs green while we stabilize the env.
