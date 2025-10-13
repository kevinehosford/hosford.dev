### Overview
Small but tangible UX wins this week: I added replay controls to flows, tightened the destination forms, and experimented with the monaco-apl fork while polishing chart stickiness.

### Highlights
- [#2654](https://github.com/axiomhq/app/pull/2654), [#2647](https://github.com/axiomhq/app/pull/2647) — Flows replays now ship with a confirmation modal for “Stop replay,” and every sensitive field in the editor uses password inputs so we’re not spraying tokens in plain text.
- [#2625](https://github.com/axiomhq/app/pull/2625), [#2612](https://github.com/axiomhq/app/pull/2612) — Moved the APL editor onto the `axiomhq/monaco-apl` fork and refreshed the OTEL traces destination form to match the new component set (auth, region, format). We later rolled the editor change back, but this was the initial spike.
- [#2611](https://github.com/axiomhq/app/pull/2611), [#2591](https://github.com/axiomhq/app/pull/2591) — Made chart series highlights sticky across reloads (so you don’t lose context when data refreshes) and trimmed the Playwright GitHub Action logs by disabling JS monitoring in CI.
