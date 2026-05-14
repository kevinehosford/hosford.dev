### Overview
Quiet week. Mostly finished the EU/AP region gating started the week before, restored some SCSS that got pruned a bit too eagerly, and made the traces middleware behave according to the spec.

### Highlights
- [#6007](https://github.com/axiomhq/app/pull/6007) — Added `getHumanizedRegionName` and `isOrgRegionFeaturesLimited` in `dash/util/region`, wired humanized labels into the new-org and org-edit forms, and gated `EndpointsPage` and the integrations surfaces behind the region check so EU/AP orgs see an informative alert instead of broken pages (with an `isAxiomersOrg` bypass so internal accounts still get them).
- [#6017](https://github.com/axiomhq/app/pull/6017) — Reworked the traces middleware to extract the active context via `propagation.extract(context.active(), request.headers)` per the OTel docs, and always stamp `x-axiom-trace-id` onto the response using `trace.getSpanContext` so downstream clients can stitch the request to the span without guessing.
- [#5998](https://github.com/axiomhq/app/pull/5998) — Restored the dropdown styles that disappeared with the old `rc-*` cleanup. Added `dash/styles/base/dropdown.scss` covering `axiom-dropdown` / `axiom-select-dropdown`, item-state mixins, and the blue/purple/axi-default variants, then imported it back into the base index.
