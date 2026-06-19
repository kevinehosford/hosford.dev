---
title: 'A Pi ACE extension: playbook injection'
slug: pi-ace-playbook-injection
date: 2026-06-07
tags:
  - pi
  - extensions
  - ace
  - context-engineering
excerpt: Hooking ACE into Pi. A playbook-injection extension that appends the curated bullets to each agent turn's system prompt.
---

[the last post](/blog/customizing-pi-tui) was about augmenting the tui with an extension. this one looks at modifying the agent behavior.

(1 of N): scope here is the playbook-injection half. reflection and curation are the hard parts and earn their own posts.

## What I want to learn

- explain the ACE memory system:
  - the value it delivers and the algorithm that gets you there
  - the architectural components
  - the lifecycle, including which hooks an integration would need

## Approach

- read the [ACE python implementation](https://github.com/ace-agent/ace). pull out:
  - architectural components
  - lifecycle(s)
  - side-effects, data, and functions

## What I found

### ACE in one paragraph

ACE stands for Agent Curator Environment system. it's a framework for evolving and improving agentic behavior. rough sketch: your agent gets the right domain-specific instructions and tips for the task at hand. that context is continually groomed (allowed to grow) and then distilled into a clearer, more focused version that uses less context budget. claimed gains: +10.6% on agent tasks and +8.6% on domain-specific benchmarks.

the artifact at the center is the **playbook**. format is easy to grok: bullets organized into categories, each with an identifier and helpfulness/harmfulness counters.

```md
# strategies & insights
[str-0001] helpful=5 harmful=0 :: Always verify data types before processing
```

the architecture has three roles:

- **GENERATOR**: produces reasoning trajectories. roughly: tightly-scoped context specific to the task at hand.
- **REFLECTOR**: evaluation and insight generation. reviews what took place and extracts lessons.
- **CURATOR**: converts the lessons into normalized form and applies delta updates to the playbook.

to make GENERATOR concrete, here's its prompt structure (truncated):

```md
You are an analysis expert tasked with answering questions using your knowledge, a curated playbook of strategies and insights and a reflection that goes over the diagnosis of all previous mistakes made while answering the question.

...

Your output should be a json object, which contains the following fields:
- reasoning: your chain of thought / reasoning / thinking process, detailed analysis and calculations
- bullet_ids: each line in the playbook has a bullet_id. all bulletpoints in the playbook that's relevant, helpful for you to answer this question, you should include their bullet_id in this list
- final_answer: your concise final answer

...

**Answer in this exact JSON format:**
{{
  "reasoning": "...",
  "bullet_ids": ["calc-00001", "fin-00002"],
  "final_answer": "..."
}}
```

inputs: question, playbook, context (optional), reflection (optional). outputs: response, plus the set of bullet ids the generator deemed useful.

### Mapping ACE onto Pi sessions

a pi session has a natural shape that lines up with ACE's GENERATOR phase. each agent turn has a beginning, inputs, and a result. roughly:

- session start (or user input, or maybe a tool-call return for tool-refining cases): annotate `generation phase started`, inject the playbook.
- agent response: annotate `generation phase ended`.

the produced artifact (the session, including the annotations) feeds reflection later. and a bunch of useful context comes for free: the user's prior turns, the model and provider, other session config. all already in the session.

so: first thing to build is the playbook-injection half. defer everything else.

### First extension: playbook injection

the simplest viable thing: read a `playbook.md` from the cwd, append it to the system prompt for each agent turn.

```ts
const createStartCtx = (params: {
  playbook?: string;
  systemPrompt: string;
}): { systemPrompt: string } | undefined => {
  if (!params.playbook) {
    return undefined;
  }

  return {
    systemPrompt: `${params.systemPrompt}

${params.playbook}`,
  };
};

export default function (pi: ExtensionAPI) {
  let ace: Ace | undefined;

  pi.on('session_start', (_event, ctx) => {
    // find/read or create playbook
    ace = createAce(pi);
    logAce(pi, ace);
  });

  pi.on('before_agent_start', (event, ctx) => {
    return createStartCtx({
      playbook: ace?.playbook,
      systemPrompt: ctx.getSystemPrompt(),
    });
  });
}
```

initialize global state on `session_start`, read the playbook if it exists in the cwd, append it to the per-turn system prompt via `before_agent_start`.

:::aside
`before_agent_start` was something i learned while implementing this. it fires before each agent turn, and you can return a `systemPrompt` for that turn. clean injection point.
:::

the `playbook.md` in the working dir for the test was empty:

```md
# ACE (Agent Curator Environment) Playbook

// TODO: fill this out
```

yes, empty. however:

![pi session showing the agent answering a question about the ACE memory system with the empty playbook injected](/pi-session-ace.png)

## What's next

i'm now an expert on the ACE system. (not really.) what is true: deterministic playbook injection works. what's been punted on is the actually-hard stuff.

- **reflection on the session.** distilling what happened into insights worth keeping.
- **training over sessions.** treating a session as input to an evaluation function with the playbook varied. this one's tricky and will take some thinking.

one of the two is the next post.
