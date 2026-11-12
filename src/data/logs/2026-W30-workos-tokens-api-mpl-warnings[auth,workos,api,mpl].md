### Overview
Phase 2 of the auth migration: the API accepts WorkOS access tokens as user credentials. A couple of MPL display fixes alongside.

### Highlights
- [axiomhq/axiom#18235](https://github.com/axiomhq/axiom/pull/18235), [#8333](https://github.com/axiomhq/ctrl/pull/8333) — The platform (Go) now accepts a WorkOS access token as a user credential, alongside everything it took before. The auth app links the Axiom user to the WorkOS user at sign-in, so the API can tell who a token belongs to.
- [#8309](https://github.com/axiomhq/ctrl/pull/8309), [#8310](https://github.com/axiomhq/ctrl/pull/8310) — Two small fixes to sign-in completion and the signed-in redirect on the auth app.
- [#8332](https://github.com/axiomhq/ctrl/pull/8332), [#8338](https://github.com/axiomhq/ctrl/pull/8338) — MPL query warnings show as alerts above the results, the way APL warnings already did. When MetricsDB says a query's aggregation changed the unit (`ignore_unit`), the y-axis goes unitless or uses the query's `custom_unit`.
