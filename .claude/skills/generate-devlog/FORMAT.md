# Entry format

## Filename

```
{YYYY}-W{XX}-{slug}[{tag1},{tag2},...].md
```

- **slug**: 1–5 word kebab-case summary of week's primary theme(s)
- **tags**: comma-separated, no spaces inside brackets, areas touched
- Holiday/quiet weeks: empty brackets, e.g. `2025-W52-holiday[].md`, `2026-W19-quiet[].md`

**Common tags**: `auth`, `billing`, `ci`, `dashboards`, `edge`, `mpl`, `apl`, `query`, `stream`, `monitors`, `flows`, `regions`, `eu`, `traces`, `observability`, `playwright`, `e2e`, `tanstack`, `migration`, `refactor`, `architecture`, `perf`, `cache`, `sentry`, `vercel`, `nitro`, `permissions`, `integrations`, `ctrl`, `docs`, `tests`. New tags fine for genuinely new areas.

## Structure

No frontmatter. No title heading. File opens directly with `### Overview`.

```markdown
### Overview
[1–3 sentences. Verb-forward. Dense.]

### Highlights
- [PR link(s)] — [Dense paragraph. 2–4 sentences with technical specifics.]
- [PR link(s)] — [...]
```

## Bullet rules

1. Lead with PR refs. Multiple related PRs chained with commas:
   `[#1234](https://github.com/axiomhq/app/pull/1234), [#1235](https://github.com/axiomhq/app/pull/1235)`
2. Cross-repo: `[axiomhq/ctrl#42](https://github.com/axiomhq/ctrl/pull/42)`
3. Em dash separator: ` — ` between links and prose
4. Backtick file names, components, env vars, functions, props
5. Single dense paragraph per bullet — never sub-bullets
6. Group related PRs into one bullet, not one bullet per PR
7. Only `state == "merged"` PRs. Skip closed/draft unless notable revert chain

## Length

| Week intensity | Overview | Bullets | Per-bullet |
|---|---|---|---|
| Heavy (8+ merged PRs) | 2–3 sentences | 4–6 | 3–5 sentences |
| Normal (3–7 PRs) | 1–2 sentences | 2–4 | 2–3 sentences |
| Light (1–2 PRs) | 1 sentence | 1–2 | 1–2 sentences |
| Quiet/holiday (0 PRs) | 1 sentence | none | — |

## Quiet-week template

```markdown
### Overview
Holiday break. No PRs landed this week.
```

or

```markdown
### Overview
Quiet week. No merges landed.
```

## Examples (in repo)

- Heavy: `src/data/logs/2025-W45-regions-planetscale-rolldown[...].md`
- Normal: `src/data/logs/2025-W44-edge-regions-traces[...].md`
- Light: `src/data/logs/2026-W18-skills-docs-gmt-zero[...].md`
- Quiet: `src/data/logs/2025-W52-holiday[].md`

Read 2–3 of the most recent entries before writing to match current density and tone.

## Voice — dos and don'ts

✅ "Pulled the big nexus sync into main. React 19.2, TanStack Start bumps, AI SDK v5 ride along."
✅ "Turns out order matters when one depends on the other being set up."
✅ "Wasn't ready for us yet."
✅ "Routine maintenance: monaco-apl 0.0.18, Playwright 1.56.0..."

❌ "Implemented a comprehensive solution for..."
❌ "I'm excited to share..."
❌ "This enhancement leverages..."
❌ Emoji
❌ Sub-bullets
❌ Frontmatter
