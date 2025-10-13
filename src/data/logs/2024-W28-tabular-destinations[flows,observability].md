### Overview
Finished wiring the flow destinations to the latest API shapes, enabled tabular requests from the datasets view, and trimmed unnecessary telemetry so the frontend stays quiet when hidden.

### Highlights
- [#2406](https://github.com/axiomhq/app/pull/2406), [#2438](https://github.com/axiomhq/app/pull/2438), [#2396](https://github.com/axiomhq/app/pull/2396) — Regenerated swagger/codegen after the flow payload rename, added HTTP basic auth + authorization header support in `EditDestinationForm`, and fixed the malformed auth key path so requests match the backend.
- [#2421](https://github.com/axiomhq/app/pull/2421), [#2407](https://github.com/axiomhq/app/pull/2407) — `/datasets` now respects the tabular feature flag when issuing queries, and the stream settings store persists its localStorage shape correctly so column/layout choices survive reloads.
- [#2440](https://github.com/axiomhq/app/pull/2440), [#2441](https://github.com/axiomhq/app/pull/2441) — Paused Faro when tabs go background and stopped emitting LaunchDarkly diagnostic events, cutting down on noisy telemetry from inactive sessions.
- [#2404](https://github.com/axiomhq/app/pull/2404), [#2408](https://github.com/axiomhq/app/pull/2408), [#2410](https://github.com/axiomhq/app/pull/2410), [#2490](https://github.com/axiomhq/app/pull/2490) — Bumped `@axiomhq/apl` in both the app and workers, documented how to run the UI in Play mode, reminded folks to export `PLAYWRIGHT_TESTING`, and relaxed a flaky Playwright selector timeout tied to slow API responses.
