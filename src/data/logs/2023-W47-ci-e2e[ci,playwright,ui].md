### Overview
Invested in CI visibility by shipping shareable visual diff reports, then tidied the primary nav ahead of the holiday slowdown.

### Highlights
- [#1189](https://github.com/axiomhq/app/pull/1189) — Reran the Backstop workflow through Vercel so any failed Playwright job auto-deploys its HTML report and comments with the URL and commit SHA. The `.vercel` ignore keeps local artifacts out of Git, and the tweaked secrets wiring means contributors no longer need the private repo just to inspect screenshots.
- [#1182](https://github.com/axiomhq/app/pull/1182) — Dropped the “Beta” wrapper from the dark-mode toggle now that the theme switcher is GA. The nav stays functional while looking less cluttered, and MobX state continues to drive the same `viewStore.theme` branching.
- — Wrapped the short week balancing QA follow-up on the visual diffs with planning for the maintenance banner launch. No other code shipped while folks were out for the holiday.
