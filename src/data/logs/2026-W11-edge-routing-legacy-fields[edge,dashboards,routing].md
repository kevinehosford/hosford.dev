### Overview
Three landings: regenerated the dashboards schema/spec to accept the legacy `dataset`/`config` fields and make the ephemeral `uuid` optional, and fixed `/query` so it falls back to region-specific edges when apex isn't the target.

### Highlights
- [#7461](https://github.com/axiomhq/app/pull/7461) — `/query` page wasn't routing to the edges when apex shouldn't be the target. Now it uses the same region-resolution logic the rest of the edge routing uses, with the atlas fallback still in place, and includes the metrics vs APL path distinction.
- [axiomhq/axiom#16651](https://github.com/axiomhq/axiom/pull/16651), [#7436](https://github.com/axiomhq/app/pull/7436) — Added `dataset` and `config` as `ignoredLegacyFields` on the dashboards schema so payloads created by legacy/external producers stop triggering validation warnings, and made `uuid` optional on `metricsTransformationSchema` since it's generated on load and stripped on save. Regenerated the dashboards Zod schema + OpenAPI spec on the console side to pick this up.
