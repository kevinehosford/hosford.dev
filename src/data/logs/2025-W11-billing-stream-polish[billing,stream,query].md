### Overview
Polished the new billing surfaces based on design feedback and tightened a couple of stream/query edge cases while previewing billing impacts for customers.

### Highlights
- [#4045](https://github.com/axiomhq/app/pull/4045) — Rolled a batch of plan and usage tweaks: confirmation before saving add-on changes, better limit copy, and tooltips that spell out why certain allowances are capped. Also translated the usage cards and charts to the “data loading compute” vocabulary the design review called for.
- [#4063](https://github.com/axiomhq/app/pull/4063), [#4050](https://github.com/axiomhq/app/pull/4050) — Added a live “preview charges” table to the add-on slide-out that debounces requests to `/subscription/preview`, and iterated on the usage page layout so the spend comparison columns read cleanly even while data is loading.
- [#4030](https://github.com/axiomhq/app/pull/4030), [#4065](https://github.com/axiomhq/app/pull/4065) — Continued the cleanup pass across billing forms (checkbox affordances, price ordering, typography) to match the updated spec before launch.
- [#4047](https://github.com/axiomhq/app/pull/4047), [#4039](https://github.com/axiomhq/app/pull/4039), [#4044](https://github.com/axiomhq/app/pull/4044) — Kept the stream limit banner from firing on the default 15‑minute window, taught the histogram helper to handle `histogram_if` without special-casing, and removed a stray `flex` regression from the Tailwind conversion.
