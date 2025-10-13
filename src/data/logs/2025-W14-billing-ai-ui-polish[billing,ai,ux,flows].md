### Overview
More billing fit-and-finish work, additional toggles for the AI rollout, and a round of UI cleanup to keep flows and shared components consistent.

### Highlights
- [#4148](https://github.com/axiomhq/app/pull/4148), [#4131](https://github.com/axiomhq/app/pull/4131) — Standardised the billing copy around “Axiom Cloud”, added proper hover states, and introduced `useResourceLimit` so dataset creation buttons show the right upgrade messaging when a plan maxes out.
- [#4163](https://github.com/axiomhq/app/pull/4163) — Landed feature flags for the upcoming query title AI assistance and org-level AI settings so we can dogfood them safely.
- [#4154](https://github.com/axiomhq/app/pull/4154) — Removed the lingering lucide-react dependency and switched the UI to the in-house Axi icons.
- [#4158](https://github.com/axiomhq/app/pull/4158), [#4137](https://github.com/axiomhq/app/pull/4137) — Cleaned up the flow skeleton table markup that was throwing accessibility errors and deleted the obsolete assistant code path that had started tripping security scans.
