### Overview
Turned the billing plan page into a first-class settings route and ironed out a couple of nagging selection issues in the query and flows UI.

### Highlights
- [#4200](https://github.com/axiomhq/app/pull/4200) — Promoted `settings/plan` to the top-level settings nav so pricing/usage lives beside `settings/billing`, updating the route guards accordingly.
- [#4072](https://github.com/axiomhq/app/pull/4072) — Fixed the back button and selection state in the query page so leaving and returning no longer wipes the active result.
- [#4229](https://github.com/axiomhq/app/pull/4229) — Enabled the query form requests instead of leaving them perpetually disabled, which stopped React renders from canceling the in-flight Run Query calls.
- [#4201](https://github.com/axiomhq/app/pull/4201) — Centered the destination combobox trigger in the flow canvas to match the rest of the node affordances.
