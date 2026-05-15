---
layout: post
title: "How to write effective skills for many AI models"
date: 2026-05-15 16:36:00 +7
categories: software
tags: [software, ai]
---

A good skill is not a very long instruction file. A good skill is like a small operating system for an agent. It tells the agent when to start, what to read, when to stop and ask the user, how to save progress, and how to check the output before moving to the next step.

When we look at a well-designed skill set, the most important point is not how much domain knowledge each skill has. The important point is how that knowledge is packed. The `SKILL.md` file should be short. It should describe the purpose, when to use the skill, and the startup contract. The routing logic should be in `dispatcher.md`. The real workflow should be split into `step-*.md` files. This structure helps the skill work with many model types: fast models, deep models, models with subagents, models without subagents, and models from different platforms.

This article explains how to write skills in that style: model-agnostic, do-er first, context-efficient, low in unclear branching, token-saving, and consistent in output.

## 1. Write for the model that will run the skill

A common mistake is to write a skill like a document for people. It has too much explanation, too much background, and too many special cases. An agent does not need to be convinced. It needs to know the next action.

A skill should quickly answer four questions:

1. When should this skill be used?
2. Which file should be read first?
3. Which part should be read at each time?
4. What condition requires the agent to stop, ask the user, or verify?

A neutral startup contract can look like this:

```md
1. Read `dispatcher.md` first.
2. Load exactly one active step file chosen by the dispatcher.
3. Load `metadata.md` only if the active step explicitly needs global policy not already restated in the step.
4. Do not read ahead.
```

This pattern is strong. It does not depend on one model platform. It turns the skill into a routed workflow, not one long prompt. A do-er model will not be overloaded by context. A think-er model can still load more information when it needs deeper analysis.

## 2. Do-Er first: small actions with verification

Do-er first does not mean "do not think". It means the skill should help the model move in small steps. Each step should have a clear artifact, checkpoint, or user question.

A good step should have:

- One main task, not many mixed tasks.
- Clear input.
- Clear output.
- Clear constraints.
- A verify checklist at the end.
- A continuation gate, so the model knows whether to stop or return to the dispatcher.

Good pattern:

```md
**One task**: For each item, decide the processing strategy and write the YAML plan.

## Actions
...

## Verify before next step
- [ ] Output file exists at the declared path
- [ ] Every file/function/field name traces back to input or references
- [ ] No leftover placeholders
- [ ] Checkpoint JSON updated
```

For a do-er model, this structure reduces the need for long internal planning. The model only needs to finish the current step. For a think-er model, it can still do deeper reasoning inside the step without breaking the workflow.

A simple rule: if a step cannot be explained with one "One task" sentence, the step may be too large.

## 3. Separate trigger, routing, policy, and detailed knowledge

An effective skill should have several context layers:

- `SKILL.md`: metadata, trigger description, startup contract.
- `dispatcher.md`: read checkpoint and choose the correct step.
- `step-*.md`: concrete action for one state.
- `metadata.md`: global policy, read only when a step needs it.
- `references/`: long knowledge, guides, patterns, and rule catalogs.
- `assets/`: output templates or resources, not loaded unless needed.
- `scripts/`: operations that need accuracy and repeatability.
- `blocks/`: shared guardrails, such as anti-hallucination, human input gate, and output layout.

This is progressive disclosure. The agent does not need to read the full skill to do a small task. It reads only the layer it needs at the right time.

This is better than putting all rules, templates, schemas, examples, checklists, and edge cases into one large file.

## 4. Improve branching with dispatcher and checkpoint

Branching is where skills often fail. Different models may understand words like "continue", "resume", "stop", "ask user", and "next step" in different ways. So branching should not be hidden in long text. It should be represented as state.

Good pattern:

```json
{
  "current_step": 6,
  "completed_steps": [0, 1, 2, 3, 4, 5],
  "next_step": "6c",
  "awaiting_user_confirmation": false
}
```

The dispatcher has one job: read the checkpoint and choose the correct step file. If there is a pending human gate, that gate must have higher priority than `next_step`. This prevents the model from moving to the next step when it should wait for the user.

Branching should follow this priority:

1. If waiting for the user, return to the waiting step.
2. If `next_step` exists, load that exact step.
3. If no checkpoint exists, start from the entry step.
4. If the checkpoint is missing fields, fall back to the safe entry step.
5. Do not read future steps in advance.

This design works well for do-er models because they do not need to remember the whole workflow.

## 5. A human gate must be a state change

A sentence like "wait for user confirmation" is not strong enough. A small model may stop without showing the question. Another model may ask the question and still continue. A good skill needs a clear protocol.

When a step needs user input:

1. Print the final prompt or menu to chat.
2. Write checkpoint state:

```json
{
  "awaiting_user_confirmation": true,
  "confirmation_gate": "workspace_selection",
  "resume_step": "0",
  "pending_prompt": "Choose number or type <Workspace>/<Task>:"
}
```

3. Do not write `next_step`.
4. Do not read the dispatcher.
5. Stop the current turn.

When the user answers, the step reads the checkpoint again, handles the answer, clears the pending gate, and only then sets `next_step`.

This is one of the most important methods for making a skill stable across many models. It changes an unclear instruction into a clear state machine.

## 6. Save context: do not make the model read too much

Context is a shared budget. It contains the system prompt, conversation history, skill metadata, file content, tool output, and the current user request. If the skill is too long, the model has less space to understand the real task.

Practical best practices:

- Keep `SKILL.md` short. Put the trigger and startup contract there, not the whole workflow.
- Load only one `step-*.md` at a time.
- Put long knowledge in `references/`, but each step must say when to read which file.
- Put templates in `assets/`; do not copy long templates into the prompt.
- Put repeated or risky operations in `scripts/`.
- Treat `metadata.md` as reference-only, not auto-loaded.
- For long reference files, add a table of contents or clear headings.
- Do not copy the full shared block everywhere. Inline only the 3-5 most important lines and link to the source block.

A good skill should let the model follow breadcrumbs. Each file says enough to find the next file. It does not repeat the whole map.

## 7. Save tokens with scripts and schemas

If a task is repeated, needs exact output, or is easy to get wrong by hand, move it into a script. Neutral examples include converting file formats, filling a template, validating coverage between input and output, normalizing data, or generating a report from a schema.

Scripts save tokens in three ways:

1. The model does not need to rewrite the same logic every time.
2. The output can be checked by an exit code or a generated file.
3. The skill only needs to explain how to call the script and what input schema to use.

Schema also saves tokens. Instead of saying "create a complete processing plan" in a long paragraph, the skill gives a YAML shape. The model only needs to fill the structure.

Simple rule: prompts guide decisions; scripts handle mechanical work; schemas lock the output shape.

## 8. Reduce hallucination with source of truth and traceability

Skills that run on many platforms must handle a common model weakness: the model may invent file names, fields, sheets, schemas, counts, or behavior.

Write guardrails directly:

- Do not use a file name, function, field, sheet, or column unless it comes from user input, `references/`, `assets/`, or a file already read.
- Do not output counts, percentages, line numbers, or effort numbers unless they come from a tool or user input.
- Do not say "the system does X" unless the model has read the spec, read the code, or the user said it.
- If an important decision is unclear, stop and ask.
- If a schema requires a field but the value is unknown, use `TBD` or `null`. Do not invent it.

The key point is that these rules must be used during writing, not only at the end. The verify checklist is a safety net, but the best way to prevent hallucination is to stop it before the model writes the wrong thing.

## 9. Consistent output comes from invariants

"Make output consistent" is a weak instruction. A good skill defines concrete invariants:

- Where output files are written.
- How file names use suffixes when rerun.
- Where the checkpoint is stored.
- Which fields are required.
- When cleanup is allowed.
- Which checkpoint fields each step must update, such as `current_step`, `completed_steps`, or `next_step`.
- If subagents are used, what report schema they must return.
- If a file is based on a template, which script must be used instead of generating it directly.

For workflows with many parallel runs, output should be isolated by a neutral layout, for example:

```text
outputs/<workspace>/<task>/
```

and cache should be inside:

```text
outputs/<workspace>/<task>/.cache/
```

This is a strong invariant. It prevents checkpoint conflicts, prevents artifacts from different runs from mixing, and makes resume more reliable. When the layout is clear, the model does not need to "create" paths by itself.

## 10. Design for both do-er and think-er models

A do-er model needs:

- Small steps.
- Clear commands.
- Clear menus.
- Clear state.
- Low context.
- Short checklists.
- No need to choose complex branches by itself.

A think-er model needs:

- Deep references when analysis is needed.
- Rule catalogs for difficult decisions.
- Source-of-truth priority.
- Enough freedom for judgment when judgment is really needed.

Do-er-first means the default path must be simple and executable. When deeper reasoning is needed, the skill can open more references or use a deeper capability profile. But the main workflow still stays in small steps.

A useful structure:

| Work type | Skill design |
|---|---|
| Choose next step | Dispatcher + checkpoint |
| Ask the user | Human input gate |
| Generate output from a pattern | Schema + script |
| Deep analysis | Separate step + separate reference |
| Verification | Verify checklist + validation script |
| Parallel work | Subagent report schema + main context merge |
| Fallback | Single-model sequential mode |

## 11. Capability profile is better than model name

A skill should avoid depending on a specific model name from one platform. Model names change often. Capabilities are more stable.

Instead of writing:

```md
Use Model X for generation and Model Y for parsing.
```

write:

```md
Parser: fast
Formatter: fast
Analyzer: balanced
Generator: deep
```

Then add a fallback:

```md
If profile routing or subagent fan-out is unavailable, run modules sequentially in the main context with one model and keep all review/approval gates unchanged.
```

This helps the skill work on many platforms. If the platform supports routing, use it. If the platform has only one model, the skill can still run.

One exception should be clear: models without a thinking layer, or models that cannot track multi-step state, are not a good fit for complex skills. For those models, reduce the workflow: use more scripts, reduce branches, reduce long workflows, or turn the process into a CLI/task runner.

## 12. Reduce branching with menus and saved decisions

Many skills fail because they let the model guess important choices:

- choosing output format by itself,
- choosing output destination by itself,
- deriving workspace/task from a file name,
- deciding overwrite or resume by itself,
- choosing the source of truth when two input documents conflict.

Best practice: make important choices a menu or a gate. Then save the decision in the checkpoint.

Example:

```md
=== OUTPUT FORMAT ===
[1] summary
[2] detailed

=== DESTINATION ===
[a] Markdown
[b] Spreadsheet
[c] JSON
```

The model does not need to guess. The user chooses. The skill saves the choice. Later steps only read the state.

This saves tokens and improves consistency, because the same choice is not asked again or reinterpreted in every step.

## 13. When to use reference, asset, and script

An effective skill must choose the right place for each type of information.

| Part | Use when | Do not use when |
|---|---|---|
| `SKILL.md` | Trigger, startup contract, very short rules | Long workflow, long examples, large schema |
| `dispatcher.md` | Routing, resume, pending gate priority | Detailed domain logic |
| `step-*.md` | One concrete action | Many unrelated phases |
| `metadata.md` | Global policy used only sometimes | Content that must be read every turn |
| `references/` | Rule catalog, long guide, domain knowledge | Mechanical logic that can be scripted |
| `assets/` | Template files and output resources | Instructions that must be read in context |
| `scripts/` | Validate, parse, fill, convert, generate deterministic output | Decisions that need model judgment |
| `blocks/` | Shared guardrails | Content for only one skill |

If a piece of instruction is long and used only in a rare branch, put it in `references/`. If it is repeated in many skills, make it a `blocks/` file. If an operation must be deterministic, make it a `scripts/` file.

## 14. Checklist for writing an effective skill

Before you call a skill finished, check these points:

- Is the `description` in frontmatter clear enough for correct triggering?
- Does `SKILL.md` make the model read `dispatcher.md` first?
- Is there a "do not read ahead" rule or a similar mechanism?
- Does each step have one main task?
- Does every step that asks the user have a human input gate and pending checkpoint state?
- Does the dispatcher give priority to pending gates before `next_step`?
- Are all output paths defined by clear invariants?
- Is there a source-of-truth priority?
- Are there anti-hallucination rules?
- Is there a verify checklist before moving to the next step?
- Are deterministic tasks moved into scripts?
- Are long references separated from `SKILL.md`?
- Is there a fallback when subagents or model routing are not available?
- Is there a resume/rerun policy?
- Is there a validation command or another way to prove the output?

If the answer is "no" for an important item, the skill may work in a demo with a strong model. But it may not be stable when you change the model, change the platform, or run it across many conversation turns.

## 15. Short formula

A strong skill should look like this:

```text
Thin SKILL.md
-> dispatcher reads checkpoint
-> exactly one active step
-> step reads only needed references/assets
-> step writes artifact/checkpoint
-> verify checklist
-> human gate or continuation gate
-> dispatcher again
```

This structure is do-er first, but it does not reduce reasoning quality. It turns the workflow into small actions with state and verification. It lets deep models do deep analysis in the right place, while fast models can still finish mechanical work without too much context.

A good skill does not try to make the model "smarter" by adding more text. A good skill makes the model's working environment clearer: fewer unclear branches, less extra context, fewer chances to invent information, and more verification points.
