### Overview
Continued sanding the flows experience: shipped the replay details view, tightened the combobox inputs, and reduced noisy Faro traffic.

### Highlights
- [#2029](https://github.com/axiomhq/app/pull/2029), [#2040](https://github.com/axiomhq/app/pull/2040), [#2009](https://github.com/axiomhq/app/pull/2009) — Added the replay detail panel (with step status, run timestamps, and CTA buttons), locked in the new iconography, and made the header state consistent across flow pages.
- [#2020](https://github.com/axiomhq/app/pull/2020), [#2021](https://github.com/axiomhq/app/pull/2021), [#2004](https://github.com/axiomhq/app/pull/2004) — Introduced `FormCombobox` with better search/clear UX, deduped the matches columns so junk data doesn’t render, and relaxed the Query Fields filters to skip 500s when the dataset exposes unexpected shapes.
- [#2012](https://github.com/axiomhq/app/pull/2012) — Bumped Faro batching timeouts so instrument payloads fire less often during active sessions.
