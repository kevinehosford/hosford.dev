### Overview
Wrote down where `apps/console/src` is headed and taught smart filters to take metrics queries.

### Highlights
- [#7884](https://github.com/axiomhq/ctrl/pull/7884) — ADR-001 for the console's target `src/` layout. Scaffolded the 12 target directories with a README each saying what goes there and which legacy area it replaces. No code moved yet, so the follow-ups can go in small and not fight over merge conflicts.
- [#7886](https://github.com/axiomhq/ctrl/pull/7886) — Smart filter selects can now be driven by an MPL query as well as APL (`selectType: 'query'`), pulling options from the distinct values when the query groups by one tag. Moved the smart filter code out of `hubs/dash` into `features/dashboards/smart-filter` and swapped its classy-forms pieces for react-hook-form while in there.
- [#7885](https://github.com/axiomhq/ctrl/pull/7885) — Pointed the Playwright e2e cleanup script at the staging org.
