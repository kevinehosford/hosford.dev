### Overview
Slipped in a defensive fix to the shared object helpers while the rest of the week went to field-list QA and planning for the December release cadence.

### Highlights
- [#1206](https://github.com/axiomhq/app/pull/1206) — Replaced the lodash `reduce` call in `flattenObject` with an explicit key walk so any payload that exposes a `length` property no longer gets coerced into an array. The new approach preserves deeply nested field names (including dots) and keeps our dot-notation helpers stable ahead of the field list launch.
- — Spent the remaining sprint slices validating the new explorer experience against production data sets and coordinating the change freeze. No additional merges landed while those reviews ran.
