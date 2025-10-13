### Overview
Continued the tabular rollout while fleshing out flows’ continuous runs UX and keeping the dependency stack patched.

### Highlights
- [#2842](https://github.com/axiomhq/app/pull/2842), [#2850](https://github.com/axiomhq/app/pull/2850), [#2862](https://github.com/axiomhq/app/pull/2862) — Centralized tabular execution: `createQueryRequest` now normalizes every client call, `getQueryFormat()` decides between legacy and tabular, and `ExtendedAplResult` proxies the new column layout so `extractDataDotValue` just works. I also fixed `project-away` parsing so we don’t treat it as an explicit projection and removed the redundant tabular wrap in `QueryFields`.
- [#2855](https://github.com/axiomhq/app/pull/2855), [#2849](https://github.com/axiomhq/app/pull/2849) — Added the continuous-run timeline and gating to the flows details page (with codegen for the new runs endpoints), then wired the replay CTA to actually open the modal. Only canary orgs see the stream polling right now while we finish the API plumbing.
- [#2856](https://github.com/axiomhq/app/pull/2856) — Cleared the Dependabot backlog with targeted bumps (`express@4.20`, `react-router-dom@5.3.4`, `webpack@5.94`, `msw@2.4.x`, etc.) so the security dashboard is green again.
- [#2863](https://github.com/axiomhq/app/pull/2863) — Tightened the trace sidebar regex so we strip the `data.` prefix before rendering, keeping the field list readable.
