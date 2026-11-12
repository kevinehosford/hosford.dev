### Overview
Light week. One MCP change, on auth telemetry.

### Highlights
- [axiomhq/mcp#193](https://github.com/axiomhq/mcp/pull/193) — Token refresh for MCP clients happens at the authorization server, so the worker had no record of it. Added token lineage to its telemetry and made SSE sessions pick up a refreshed token.
