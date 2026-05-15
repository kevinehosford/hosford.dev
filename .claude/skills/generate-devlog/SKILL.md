---
name: generate-devlog
description: Generate or backfill weekly dev log entries for hosford.dev from GitHub PR activity. Use when the user asks to write a dev log entry, backfill missing weeks, or update the dev log. Fetches merged PRs via `gh` across configured repos, groups by ISO week, writes entries that match the existing voice/format, runs a sensitive-info review, and commits.
---

# generate-devlog

Generate dev log entries for `src/data/logs/` from `gh` PR activity. Single week or backfill range.

## Quick start

- "write this week's dev log" → single week, current ISO week
- "backfill the dev log" → from week after newest existing entry through previous ISO week
- "write the dev log for 2026-W14" → that specific week

## Inputs

| Form                   | Meaning                                                           |
| ---------------------- | ----------------------------------------------------------------- |
| empty / "this week"    | current ISO week                                                  |
| `YYYY-WXX`             | one week                                                          |
| "backfill" / "missing" | every gap week from newest existing entry up to previous ISO week |
| `--repos repo1,repo2`  | override default repo list                                        |
| `--dry-run`            | print, don't write                                                |
| `--no-commit`          | write files, skip commit/push                                     |

## Workflow

1. **Find newest existing entry.** `ls src/data/logs/` — newest filename like `YYYY-WXX-*.md` defines backfill start (start = next ISO week).
2. **Pick target weeks.** Skip the current incomplete week unless explicitly asked.
3. **Fetch PRs.** One call per author covers all repos:
   ```bash
   gh search prs --author kevinehosford --created '>=YYYY-MM-DD' \
     --limit 300 \
     --json number,title,body,createdAt,closedAt,repository,state,url
   ```
   Use `createdAt` for week bucketing. Filter `state == "merged"` only.
4. **Bucket by ISO week.** Use Python `date.isocalendar()` for accuracy across year boundaries.
5. **Inspect PR bodies.** Read titles + bodies (Cursor `[!NOTE]` summaries are the dense gold). Group thematically — auth, ci, dashboards, edge, etc.
6. **Write entries.** See [FORMAT.md](FORMAT.md) for filename, structure, length guidelines, and voice rules.
7. **Sensitive-info review.** See [REVIEW.md](REVIEW.md). Mandatory before commit.
8. **Commit + push** unless `--no-commit`. Conventional commit, no Claude co-author (per global instructions). Single commit for the whole batch.

## Voice

Casual Kevin, sentence-case (it's a blog, not Slack). Per `write-as-me` casual rules: contractions, dry asides, fragments where natural, drop corporate polish. First-person plural "we" or subject-dropped fragments both fine. Read 2–3 most recent entries before writing to calibrate.

Verbs to favor: `wired`, `taught`, `tightened`, `swapped`, `pulled`, `rewrote`, `pruned`, `hardened`, `landed`, `chased`, `dropped`. Avoid: `implemented`, `enhanced`, `leveraged`, `utilized`.

Consequence chaining is the signature pattern: "so [result]", "which keeps X from Y", "turns out order matters".

## Default repos

`axiomhq/app`, `axiomhq/axiom`, `axiomhq/ctrl`, `axiomhq/docs`, `axiomhq/mpl`, `axiomhq/skills`, `kevinehosford/personal-ai`. Cross-repo PRs use full `[owner/repo#NNNN](url)` form; same-repo PRs use bare `[#NNNN](url)`.

## Reference

- [FORMAT.md](FORMAT.md) — filename, frontmatter-free structure, length guidelines, examples
- [REVIEW.md](REVIEW.md) — sensitive-info checklist (must run before commit)
