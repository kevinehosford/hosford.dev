# Sensitive-info review

Run before every commit. Mandatory.

## Strip these

| Pattern | Why | Action |
|---------|-----|--------|
| `AXM-\d+`, `CTRL-\d+` | Internal Linear/Jira ticket IDs | Remove the parenthetical |
| Past vulnerability disclosures | "X was leaking into Y", "auth bypass", "token exposure", etc. | Reword neutrally or drop |
| Customer names | Real org names from PR bodies | Replace with "a customer" or drop |
| Slack/Loom/Notion URLs | Internal links | Drop |
| Specific user emails / IDs | PII | Drop |
| Production secret values | Anything that looks like a token | Drop — keep env var *name* only |

## Keep these

- Env var **names** only (`SENTRY_AUTH_TOKEN`, `NPM_AUTOMATION_TOKEN`, `GITHUB_TOKEN`, `PLAY_MODE_ORG_ID`)
- Public-facing domains (`*.axiom.dev`, `app.eu`, etc.)
- Vendor names (Planetscale, Sentry, Vercel, Segment, Mixpanel, etc.)
- PR numbers and URLs (repos may be private; PR refs still document the timeline)
- File/component/function names
- Generic "support ticket" / "customer reported" without specifics

## Grep before commit

```bash
cd src/data/logs && for f in {new files}; do
  grep -nE '(AXM-[0-9]+|CTRL-[0-9]+|slack\.com|linear\.app|loom\.com|notion\.so|leaking|vulnerability|exploit|cleartext)' "$f"
done
```

Any hit → fix or justify keeping it.

## Past-vuln-disclosure heuristic

If the entry could read as "X used to be vulnerable to Y until we fixed it in PR Z" — reword.

Bad: "Stopped the access token from leaking into the HTML body."
Better: "Tightened CSRF/auth in the process."

Bad: "Fixed the SSRF in the image proxy."
Better: "Hardened the image proxy."

## Existing entries are not the rubric

Pre-existing log entries (`2025-W41` and older) may contain AXM- refs or other items now considered sensitive. Don't propagate their bad patterns into new entries. Don't retroactively rewrite them unless asked.
