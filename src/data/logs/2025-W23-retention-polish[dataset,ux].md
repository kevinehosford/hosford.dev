### Overview
UX cleanup sprint: reworked the dataset retention selector so humans can scan it, and stopped the traces sidebar tooltips from spamming while you scroll.

### Highlights
- [#4747](https://github.com/axiomhq/app/pull/4747) — Rebuilt `RetentionSelect.tsx` with grouped headers and helper text, moved the option metadata into its own util, and updated the dataset edit forms to surface the new props. The store now passes through the struct so the dropdown shows actual retention durations instead of raw enum keys.
- [#4753](https://github.com/axiomhq/app/pull/4753) — Taught `TracesSidebar.tsx` to short-circuit tooltip rendering whenever the panel is scrolling, which prevents Radix from recreating the overlay 60x per second and keeps the pointer listeners from locking up.
