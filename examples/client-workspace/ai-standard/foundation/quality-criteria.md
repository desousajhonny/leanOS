# Quality Criteria

Use these criteria to judge whether a LeanOS asset is good enough to keep.

## Purpose

Quality criteria prevent vague assets, duplicated logic and confusing routes.

They answer:

- Is this asset clear?
- Is it owned by the right level?
- Does it load only necessary context?
- Does it preserve the Navigation Chain?
- Does it help future models act better?

## Universal Criteria

Every LeanOS asset should have:

- Clear purpose.
- Explicit owner.
- Correct location.
- Minimal context loading.
- Clear inputs.
- Clear outputs.
- Boundaries and red lines when relevant.
- References to related assets only when useful.
- No duplicated responsibility.
- No invented product or company facts.

## Routing Quality

A good asset:

- Keeps root routing at department level.
- Lets department AGENTs choose workflows or areas.
- Lets area AGENTs choose roles.
- Lets roles load skills and playbooks.
- Does not skip levels because a later file looks relevant.
- Does not ask a model to load the whole workspace.

## Content Quality

A good asset:

- Uses direct language.
- Says when to use it.
- Says when not to use it.
- Names the files it may update.
- Separates facts from assumptions.
- Uses `not applicable` explicitly when a dimension does not apply.
- Asks for confirmation before mutating durable files.

## Asset-Specific Signals

| Asset | Quality Signal |
| --- | --- |
| `AGENT.md` | Routes to the next owner without becoming a giant inventory. |
| `README.md` | Explains folder purpose, files and navigation without becoming an executor. |
| `role` | Defines a clear operating hat and points to relevant skills/playbooks. |
| `skill` | Describes a reusable capability, checks and outputs. |
| `playbook` | Provides an ordered execution sequence with inputs and outputs. |
| `knowledge` | Stores confirmed context without process instructions. |
| `workflow` | Coordinates multi-area or multi-stage work. |
| `command` | Loads minimal context and defines allowed/forbidden updates. |

## Rejection Criteria

Reject or revise an asset when:

- It duplicates another asset.
- It mixes role, skill, playbook and knowledge responsibilities.
- It has no clear owner.
- It points to paths that do not exist.
- It recommends inactive areas without warning.
- It stores secrets or token values.
- It makes implementation decisions without loading the required role, skill and playbook.
- It updates source-of-truth or framework files without confirmation.

## Final Check

Before accepting an asset, answer:

1. What type of asset is this?
2. Who owns it?
3. What question does it answer?
4. What should load it?
5. What should it never do?
6. Which checklist validates it?
