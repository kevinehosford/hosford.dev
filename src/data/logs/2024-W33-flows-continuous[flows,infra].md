### Overview
Landed continuous flows, tightened incident.io integration, and tuned our tooling after the new runner rollout.

### Highlights
- [#2699](https://github.com/axiomhq/app/pull/2699), [#2701](https://github.com/axiomhq/app/pull/2701) — Added “run continuously” support in FlowDetails (with the new stop CTA and codegen for the API toggle) and made sure fresh flows don’t sit on a perpetual loading spinner when you haven’t run them yet.
- [#2655](https://github.com/axiomhq/app/pull/2655), [#2676](https://github.com/axiomhq/app/pull/2676) — Routed the migration banner through the incident.io TRPC router instead of the old REST shim, and updated the maintenance fetcher to account for the different `ongoing_incidents` shape so the preview doesn’t show ghost outages.
- [#2593](https://github.com/axiomhq/app/pull/2593), [#2665](https://github.com/axiomhq/app/pull/2665) — Swapped CI over to the new runner image (with refreshed Playwright deps and cache restore action) and reverted the monaco-apl experiment after it broke the editor build.
- [#2672](https://github.com/axiomhq/app/pull/2672) — Relaxed the Query Fields panel so a fetch failure no longer surfaces as a top-level error toast; the page can keep loading even if that sidebar hiccups.
