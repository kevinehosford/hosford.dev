### Overview
Started a first-party GitHub integration on the backend, plus some analytics and tracing odds and ends. On the personal side, started a project called matrix-actors on Saturday.

### Highlights
- [axiomhq/axiom#19567](https://github.com/axiomhq/axiom/pull/19567) — A GitHub integration backed by a GitHub App (Go): an org installs the app once, picks repositories on GitHub, and pushes, pull requests, workflow runs and the rest land in Axiom next to their logs and traces. One row per repository. Merged the following week.
- [axiomhq/axiom#19465](https://github.com/axiomhq/axiom/pull/19465), [#10376](https://github.com/axiomhq/ctrl/pull/10376), [axiomhq/mcp#230](https://github.com/axiomhq/mcp/pull/230) — Segment now hears about add-on, retention and endpoint changes. The trace viewer reports whether a trace has AI spans, view changes and span selection. MCP tool spans record the user, so per-user questions don't need a join back to the request span.
- [#10358](https://github.com/axiomhq/ctrl/pull/10358) — `/.well-known/security.txt` (RFC 9116) on the console and auth hosts.
- matrix-actors — Personal project, first commit on the 17th, private repo. The idea is a team of coding agents that take tasks from a tracker, plan them, build in sandboxes, get reviewed by a second model family and merge through gates, talking to each other over a self-hosted Matrix chat server. Nothing to show yet.
