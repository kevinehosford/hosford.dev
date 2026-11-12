### Overview
MCP tool calls got connected traces, and the auth app handles a couple more WorkOS sign-in states.

### Highlights
- [axiomhq/mcp#220](https://github.com/axiomhq/mcp/pull/220) — One MCP tool call now produces one trace: worker request, Durable Object, tool span, the outbound API call and everything under it, with no orphan spans. Same approach as the Threads tracing from August.
- [#10282](https://github.com/axiomhq/ctrl/pull/10282), [#10207](https://github.com/axiomhq/ctrl/pull/10207) — Added the organization-selection step for people who belong to more than one WorkOS organization, on every sign-in path. Failures caused by the user's own state return 4xx instead of 5xx, so the server-error monitor only counts server errors.
- [axiomhq/mcp#219](https://github.com/axiomhq/mcp/pull/219) — Finished the WorkOS setup for the EU MCP deployment.
