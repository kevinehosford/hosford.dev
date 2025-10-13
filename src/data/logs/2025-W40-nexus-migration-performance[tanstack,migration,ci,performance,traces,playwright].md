### Overview
Single-fix week aimed squarely at the service logger: we now merge request metadata in the right order. With the context fields restoring correctly, the log pipeline lines up with what the legacy dashboard expected.

### Highlights
- [4a4aa1f072fa150174c5cbc3b5051c27ec48a90d](https://github.com/axiomhq/app/commit/4a4aa1f072fa150174c5cbc3b5051c27ec48a90d) — Flipped the spread order when building `logContext` in `frontend-server/src/dash/util/logger.ts` so request-scoped fields stop getting clobbered by derived metadata. That puts org, user, and trace identifiers back into our structured logs and matches the behavior we were debugging in legacy Nexus.
