### Overview
Major tabular clean-up week plus a push toward the new compiler tooling and flows release.

### Highlights
- [#3466](https://github.com/axiomhq/app/pull/3466), [#3464](https://github.com/axiomhq/app/pull/3464), [#3451](https://github.com/axiomhq/app/pull/3451), [#3536](https://github.com/axiomhq/app/pull/3536) — Added the tabular session override so users can force the new format, then patched the totals/empty-state regressions that cropped up in large responses. The fixes touched the downloader, heatmap aggregations, and the totals pipeline so the UI no longer shows phantom data or crashes when the backend omits buckets.
- [#3519](https://github.com/axiomhq/app/pull/3519), [#3295](https://github.com/axiomhq/app/pull/3295) — Introduced the React compiler plugin and disabled the lint rule on the handful of files it still breaks. That gives us a path to land the generated output incrementally without blocking other work.
- [#3479](https://github.com/axiomhq/app/pull/3479), [#3476](https://github.com/axiomhq/app/pull/3476), [#3459](https://github.com/axiomhq/app/pull/3459) — Polished the flows release path by promoting the canary features, moving the preview label into the header, and ensuring collapsed error details always print the original message. The flows screens now match design and expose the debugging context we kept losing in the previous iteration.
