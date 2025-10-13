### Overview
Trimmed dead-end flows work this week so Nexus matches the trimmed backend surface, then plugged the replay fetch bug that kept hammering invalid IDs.

### Highlights
- [#5044](https://github.com/axiomhq/app/pull/5044) — Removed the never-launched stream/continuous flows path end-to-end: the Dash codegen contracts dropped the endpoints, `EditDestinationForm.tsx` shed the continuous toggle, and the flows nav/menu utils now only expose on-demand runs. The cleanup also fixes the Monaco tooltip clipping we were seeing in the destination form.
- [#5048](https://github.com/axiomhq/app/pull/5048) — Guarded `flows/components/hooks/hooks.ts` so we bail when the replay ID is empty and added a regression test to prove we no longer call the API with `undefined`.
