### Overview
Three small but useful fixes: duration fields now respect the dataset's `unit` setting, the console's Segment integration stops throwing uncaught errors when Segment misbehaves, and we expanded CSP to permit the edge URLs we just added.

### Highlights
- [#7037](https://github.com/axiomhq/app/pull/7037) — Console now formats `duration`-named dataset fields using the field's configured `unit`, falling back to `ns` when unset. Was a small localized change in the value-formatting selection but had a noticeable before/after.
- [#7059](https://github.com/axiomhq/app/pull/7059) — Datasets page was failing in Safari with an "invalid javascript MIME type" error. Pretty sure some Segment calls were throwing uncaught, so hardened the analytics shim to swallow init/track errors and log them through our usual paths instead of crashing the page when Segment has a bad day.
- [#7060](https://github.com/axiomhq/app/pull/7060) — Added `*.edge` wildcard entries for dev/staging/prod to `connect-src` in `csp-config.ts` so the new edge-query path doesn't get blocked by CSP.
