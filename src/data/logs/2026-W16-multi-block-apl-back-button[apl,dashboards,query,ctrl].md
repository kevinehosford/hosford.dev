### Overview
A handful of saved-state bugs: multi-block APL charts were losing everything but the active block on save, runtime dashboards weren't running through `mapDashboard` after `updateDashboard`, and back-navigation on `/query` restored the wrong form. Renamed `login` → `auth` on `ctrl` and documented the apps/console directory layout.

### Highlights
- [#7674](https://github.com/axiomhq/app/pull/7674) — Charts saved with multi-block APL were coming back as just one block after save. The client keeps full editor content but ships only the relevant APL block per `requires-variable`, so on instantiation we have to prefer `queryOptions.editorContent` over `query.apl`. Made the form do that.
- [#7682](https://github.com/axiomhq/app/pull/7682) — `updateDashboard` was assigning the raw API response to the active dashboard, but the queries need to be parsed by `DashboardsStore.mapDashboard` first or the query shape is ambiguous. Now we map first, then assign.
- [#7691](https://github.com/axiomhq/app/pull/7691) — Browser back/forward on `/query` would restore an empty form for the qid, then asynchronously load results and push the query into the form. Tightened query parsing and `QueryForm` init timing so the form is correct when results arrive.
- [axiomhq/ctrl#42](https://github.com/axiomhq/ctrl/pull/42), [axiomhq/ctrl#46](https://github.com/axiomhq/ctrl/pull/46) — Documented the `apps/console` directory structure for the new monorepo, and renamed `login` → `auth`.
