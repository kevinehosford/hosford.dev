### Overview
Quiet build week focused on tooling polish: trimmed a noisy CI job, kept Playwright traces around for better forensics, and added guidance for both humans and agents poking through the UI library and git history. Also tidied up the histogram tooltip copy per design feedback.

### Highlights
- [#5223](https://github.com/axiomhq/app/pull/5223) — Updated `ci-frontend.yml` so the `ensure` status check is skipped on docs-only changes, letting lightweight edits merge without waiting for the full conditional job.
- [#5221](https://github.com/axiomhq/app/pull/5221) — Flipped Playwright to always record traces, even on passes, so we can diff successful runs when a test later flakes.
- [#5222](https://github.com/axiomhq/app/pull/5222), [#5213](https://github.com/axiomhq/app/pull/5213) — Added an “investigate history” task script for agents and pointed `AGENT.md` at the `/design` component gallery so assistants know where to find UI examples.
- [#5214](https://github.com/axiomhq/app/pull/5214) — Tweaked the histogram tooltip to show `<=` on the final bucket, matching the spectrograph math.
