---
title: Mining a Pi session
slug: mining-a-pi-session
date: 2026-05-25
tags:
  - pi
  - sessions
  - agent
  - harness
excerpt: Spelunking Pi's session storage. JSONL on disk, directory layout, and how SessionManager writes entries.
---

agent observability has been on my mind lately. what state do agents persist, how is it exposed, what shape does it take on disk. pi auto-saves every session locally, and that felt like a good place to start. low friction, inspectable, a candidate to plug into a broader observability story. this post covers what i found from a short spelunking session.

pi auto-saves every session as a jsonl file in `~/.pi/agent/sessions/`, organized into per-cwd subdirs. each line is an entry with a `type` discriminator (`message`, `model_change`, `thinking_level_change`, and a handful of others), and the first line is always a `SessionHeader` with the session id, timestamp, and the cwd it belongs to.

## What I want to learn

a few things stand out as worth understanding better:

- what do the lines in the jsonl file actually look like?
- how is "organized by working directory" encoded in the persisted sessions?
  - is the cwd in the file name or the dir name?
- how is the auto-save implemented?
- learn a few basic pi commands like `/session`, `/export`, `/share`.

## Approach

- read the rest of the docs. the interesting commands worth noting:
  - `/session` shows the current session's file, id, message count, tokens, and cost
  - `/export <file>` writes the session to html
  - `/share` uploads it as a private gist with a shareable html link
- a few entry types are unclear from the docs (labels, compactions, branch summaries, extension entries). scope: focus on message entries and auto-save; defer extensions for now.
- spin up a session that exercises a chunk of pi's session-logging functionality, then look at the raw file.
- spelunk the source from `SessionManager` outward; `pi-ai` and `pi-coding-agent` mark the package boundary.

## What I found

### Inspect the session file directly

```sh
la ~/.pi/agent/sessions
total 0 drwxr-xr-x 4 khosford staff 128B May 25 14:10 --Users-khosford-source-agent-o11y--
```

dir structure in the wild. sessions land in subdirs named by the full working directory path.

```sh
la
total 616
-rw-r--r-- 1 khosford staff 26K May 25 11:52 2026-05-25T10-50-54-478Z_019e5ec2-548e-71c9-9244-338453419335.jsonl
-rw-r--r-- 1 khosford staff 279K May 25 14:14 2026-05-25T11-33-00-547Z_019e5ee8-e003-7827-a25f-5051e2c92e96.jsonl
```

two sessions already. didn't remember creating two.

```sh
cat 2026-05-25T10-50-54-478Z_019e5ec2-548e-71c9-9244-338453419335.jsonl
```

```json
{
  "type": "session",
  "version": 3,
  "id": "019e5ec2-548e-71c9-9244-338453419335",
  "timestamp": "2026-05-25T10:50:54.478Z",
  "cwd": "/Users/khosford/source/agent-o11y"
}
```

no `parentSession`.

```sh
cat 2026-05-25T11-33-00-547Z_019e5ee8-e003-7827-a25f-5051e2c92e96.jsonl
```

```json
{
  "type": "session",
  "version": 3,
  "id": "019e5ee8-e003-7827-a25f-5051e2c92e96",
  "timestamp": "2026-05-25T11:33:00.547Z",
  "cwd": "/Users/khosford/source/agent-o11y"
}
```

still no `parentSession`.

```json
{"type":"model_change","id":"4812c1b3","parentId":null,"timestamp":"2026-05-25T11:33:00.561Z","provider":"openrouter","modelId":"moonshotai/kimi-k2.6"}
{"type":"thinking_level_change","id":"872b829f","parentId":"4812c1b3","timestamp":"2026-05-25T11:33:00.561Z","thinkingLevel":"medium"}
{"type":"model_change","id":"842a29c5","parentId":"872b829f","timestamp":"2026-05-25T13:08:50.563Z","provider":"openai-codex","modelId":"gpt-5.5"}
```

kimi-k2.6 at the start. seems like the default since i didn't pick it. then an intentional switch to gpt-5.5 because i wanted to use my codex subscription.

```json
{
  "type": "message",
  "id": "4b16fec1",
  "parentId": "842a29c5",
  "timestamp": "2026-05-25T13:10:23.952Z",
  "message": {
    "role": "user",
    "content": [{ "type": "text", "text": "hi pi. which model is currently active" }],
    "timestamp": 1779714623951
  }
}
```

first user message. `type: "message"` with `message: { role: "user", content: ... }`. nothing unexpected, but cool to see it demystified.

```sh
jq -s '[.[] | .type] | unique' 2026-05-25T11-33-00-547Z_019e5ee8-e003-7827-a25f-5051e2c92e96.jsonl
```

```json
["message", "model_change", "session", "thinking_level_change"]
```

```json
{"type":"message","id":"fc7e9729","parentId":"90e0cb8e","timestamp":"2026-05-25T13:38:01.679Z","message":{"role":"user","content":[{"type":"text","text":"use the bash tool to get the current date"}],"timestamp":1779716281678}}
{"type":"message","id":"19db520c","parentId":"fc7e9729","timestamp":"2026-05-25T13:38:04.259Z","message":{"role":"assistant","content":[{"type":"toolCall","id":"call_VBYO4RjPNO8a8POgBhXEbJIx|fc_05bca4ab54563ec1016a1450bbc85c8191a26df0adaf45adcc","name":"bash","arguments":{"command":"date","timeout":5}}],"api":"openai-codex-responses","provider":"openai-codex","model":"gpt-5.5","usage":{...},"stopReason":"toolUse","timestamp":1779716281680,"responseId":"resp_05bca4ab54563ec1016a1450ba72bc8191ae3a9d8a77acaa4e"}}
```

asked the agent to use a tool. was unsure if tool calls get their own message type. they don't. still `type: "message"` with the tool call inside `content`.

```json
{
  "type": "message",
  "id": "84b48fbb",
  "parentId": "19db520c",
  "timestamp": "2026-05-25T13:38:04.267Z",
  "message": {
    "role": "toolResult",
    "toolCallId": "call_VBYO4RjPNO8a8POgBhXEbJIx|fc_05bca4ab54563ec1016a1450bbc85c8191a26df0adaf45adcc",
    "toolName": "bash",
    "content": [{ "type": "text", "text": "Mon May 25 14:38:04 BST 2026\n" }],
    "isError": false,
    "timestamp": 1779716284267
  }
}
```

```json
{"type":"message","id":"a12feffb","parentId":"84b48fbb","timestamp":"2026-05-25T13:38:05.504Z","message":{"role":"assistant","content":[{"type":"text","text":"Mon May 25 14:38:04 BST 2026","textSignature":"{...}"}],"api":"openai-codex-responses","provider":"openai-codex","model":"gpt-5.5","usage":{...},"stopReason":"stop","timestamp":1779716284267,"responseId":"resp_05bca4ab54563ec1016a1450bc5b3481919b28e28e7d4551d4"}}
```

last message before killing the interactive session.

### Try some of the commands

first the `/session` command:

```
Session Info

File: /Users/khosford/.pi/agent/sessions/--Users-khosford-source-agent-o11y--/2026-05-25T11-33-00-547Z_019e5ee8-e003-7827-a25f-5051e2c92e96.jsonl

ID: 019e5ee8-e003-7827-a25f-5051e2c92e96

Messages
User: 6
Assistant: 22
Tool Calls: 18
Tool Results: 18
Total: 46

Tokens
Input: 122,736
Output: 2,981
Cache Read: 417,280
Total: 542,997

Cost
Total: 0.9118
```

then `/share` to upload the session as a private gist:

```sh
/share
share url: https://pi.dev/session/#a3a948563a89d303038c38f92642e5fb
gist: https://gist.github.com/kevinehosford/a3a948563a89d303038c38f92642e5fb
```

view the pi session here: [https://pi.dev/session/#a3a948563a89d303038c38f92642e5fb](https://pi.dev/session/#a3a948563a89d303038c38f92642e5fb)

### Code spelunking

clone pi locally, cd in, run `pi`, then prompt:

```
goal: setup newly cloned repo (cwd) to be ready for development
objectives:
- identify tools
- run install commands
```

:::aside
i use this kind of structure a lot in my prompting. forcing myself to start with a `goal` and then break the prompt into common sections according to the task tends to land better than free-form chat. some sections i reach for: `objectives` (helps me granularize the steps into what i would do, even if not comprehensive), and depending on the task, `in-scope`/`out-of-scope`, `constraints`, `approach`, `output`, `verification`.
:::

then matt's `zoom-out` skill, which is great for codebase spelunking:

```sh
/zoom-out describe the SessionManager
```

the agent produced some nice reference material on the inner workings of pi. follow up with `/export` to write the session out as html:

```sh
/export /Users/khosford/source/agent-o11y/pi-spelunk.html
```

the export renders nicely in the browser. rather than dropping a screenshot here, i'll point to the share url at the end of the post.

### Questions to answer this spelunking

1. when does a session entry hit disk? per entry? debounced? on event? sync or async?

```ts
// session-manager.ts

private _appendEntry(entry: SessionEntry): void {
  this.fileEntries.push(entry);
  this.byId.set(entry.id, entry);
  this.leafId = entry.id;
  this._persist(entry);
}

_persist(entry: SessionEntry): void {
  if (!this.persist || !this.sessionFile) return;

  const hasAssistant = this.fileEntries.some(
    (e) => e.type === "message" && e.message.role === "assistant",
  );
  if (!hasAssistant) {
    // Mark as not flushed so when assistant arrives, all entries get written
    this.flushed = false;
    return;
  }

  if (!this.flushed) {
    for (const e of this.fileEntries) {
      appendFileSync(this.sessionFile, `${JSON.stringify(e)}\n`);
    }
    this.flushed = true;
  } else {
    appendFileSync(this.sessionFile, `${JSON.stringify(entry)}\n`);
  }
}
```

the public `append*` functions all funnel through the internal `_appendEntry`, which pushes the entry into in-memory state and immediately calls `_persist`. `_persist` writes synchronously via `appendFileSync`, but nothing actually hits disk until the first assistant entry shows up. before that, entries accumulate in `fileEntries`. when the first assistant message arrives, the whole backlog flushes in one pass, and from then on each new entry appends per-call.

2. is the path/format configurable (env var, config file, flag)?

```ts
newSession(options?: NewSessionOptions): string | undefined {
  this.sessionId = options?.id ?? createSessionId();
  const timestamp = new Date().toISOString();
  const header: SessionHeader = {
    type: "session",
    version: CURRENT_SESSION_VERSION,
    id: this.sessionId,
    timestamp,
    cwd: this.cwd,
    parentSession: options?.parentSession,
  };
  this.fileEntries = [header];
  this.byId.clear();
  this.labelsById.clear();
  this.leafId = null;
  this.flushed = false;

  if (this.persist) {
    const fileTimestamp = timestamp.replace(/[:.]/g, "-");
    this.sessionFile = join(this.getSessionDir(), `${fileTimestamp}_${this.sessionId}.jsonl`);
  }
  return this.sessionFile;
}
```

no. `newSession`'s options don't accept a path override, and `getSessionDir()` is computed from `this.cwd`. you get `~/.pi/agent/sessions/<cwd-encoded>/<timestamp>_<id>.jsonl` and that's it.

and finally `/share` on the spelunking session to leave a record behind:

```sh
/share
share url: https://pi.dev/session/#602e4da4787a74d15604a0c76136a439
gist: https://gist.github.com/kevinehosford/602e4da4787a74d15604a0c76136a439
```

view the pi session here: [https://pi.dev/session/#602e4da4787a74d15604a0c76136a439](https://pi.dev/session/#602e4da4787a74d15604a0c76136a439)

## What's next

this was a good use of a bit of time. now that sessions, the helpful commands, and the `SessionManager` internals are clearer, some follow-ups stand out:

- appending custom entries to the session
- figuring out if there's more session context worth surfacing
- exporting ongoing session information off-machine
