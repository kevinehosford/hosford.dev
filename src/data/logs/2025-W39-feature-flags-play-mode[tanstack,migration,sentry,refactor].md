### Overview
No new surface shipped this week—we backed out the feature-flag patch that destabilized dataset navigation. Restoring the previous components keeps Play mode and the datasets UI behaving while we debug the root cause offline.

### Highlights
- [f4cbd6d1ae8dc52d61f8fbea0f7ed5481ab06120](https://github.com/axiomhq/app/commit/f4cbd6d1ae8dc52d61f8fbea0f7ed5481ab06120) — Reverted the "feature flags issues" fix by dropping `Datasets_legacy.tsx` back into the route tree, rewinding `useFeatureFlags`/`FeatureFlagSelector`, and pulling the old dropdown menu implementations out of git history. The revert also realigned every Playwright fixture, screenshot, and dataset mock with the legacy behavior so we can pin the regression without shipping broken toggles.
