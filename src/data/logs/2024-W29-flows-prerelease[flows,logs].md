### Overview
Prepped flows for prerelease access, kept the destination APIs current, and smoothed a few rough edges in logs and CI while we iterated on the merged chart work.

### Highlights
- [#2497](https://github.com/axiomhq/app/pull/2497), [#2493](https://github.com/axiomhq/app/pull/2493), [#2488](https://github.com/axiomhq/app/pull/2488) — Added the flows prerelease education page (with feature-flag routing and inline art), then regenerated swagger/codegen for the camelCased flow payloads so the editor keeps rendering after the backend rename.
- [#2522](https://github.com/axiomhq/app/pull/2522), [#2493](https://github.com/axiomhq/app/pull/2493) — Destination forms picked up the new data-format selector alongside the API shape updates, keeping the editor aligned with the latest ingestion endpoints.
- [#2473](https://github.com/axiomhq/app/pull/2473), [#2468](https://github.com/axiomhq/app/pull/2468), [#2490](https://github.com/axiomhq/app/pull/2490) — Squashed the log stream clear bug (stores now reset markers correctly), reverted the font-size regression, and stretched the Playwright selector timeout so slow API responses stop flaking the suite.
- [#2457](https://github.com/axiomhq/app/pull/2457), [#2458](https://github.com/axiomhq/app/pull/2458), [#2518](https://github.com/axiomhq/app/pull/2518) — Set dropdown/popover alignment defaults to `start`, bumped `@axiomhq/apl` for the new `search <number>` and `select*` ops, and taught the APL parser to highlight numeric operands so the editor reflects the new syntax.
