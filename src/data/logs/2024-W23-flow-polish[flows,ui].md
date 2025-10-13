### Overview
Flows design polish week: I iterated on the editor layout, preview, and destination forms while locking down the feature-flag tooling.

### Highlights
- [#2143](https://github.com/axiomhq/app/pull/2143), [#2151](https://github.com/axiomhq/app/pull/2151), [#2163](https://github.com/axiomhq/app/pull/2163) — Reworked the Flow preview layout (with sticky headers and better iconography), tightened the form spacing, and cleared a laundry list of design feedback from the early UX review.
- [#2174](https://github.com/axiomhq/app/pull/2174), [#2172](https://github.com/axiomhq/app/pull/2172) — Sensitive destination fields now render as password inputs with a show/hide toggle, and we limit the destination-kind selector to the org’s allowed types to keep the dropdown manageable.
- [#2171](https://github.com/axiomhq/app/pull/2171) — Added a show/hide control to the feature flag selector so QA can flip flags without digging through LaunchDarkly.
