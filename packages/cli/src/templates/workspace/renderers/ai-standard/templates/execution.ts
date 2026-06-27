export function roleTemplate(): string {
  return `---
name: <role-name>
description: Use when <specific trigger or situation>
---

# <Role Name>

## Purpose

Define the responsibility boundary and point of view of this role in one or two sentences.

## When to Use

- <trigger>
- <symptom>

## Before Acting

Read:

- \\\`../knowledge/<file>.md\\\`

## Required Skills

- \\\`../skills/<skill-name>/SKILL.md\\\`

## Relevant Playbooks

- \\\`../playbooks/<playbook-name>.playbook.md\\\`

## Acceptance Criteria

- <expected output or confirmation state>

## Red Lines

- Do not invent product-specific facts.
- Ask before modifying durable files.
`;
}

export function roleYamlTemplate(): string {
  return `role:
  slug: <role-name>
  title: <Role Name>
  purpose: <Description of role responsibility>
  use_when:
    - <trigger>
  before_acting:
    - <context file>
  skills:
    - <skill-name>
  playbooks:
    - <playbook-name>
  outputs:
    - <expected output>
`;
}

export function skillTemplate(): string {
  return `---
name: <skill-name>
description: Use when <specific trigger or situation>
---

# <Skill Name>

## Overview

Define one reusable capability in one or two sentences.

## Use When

- <trigger>
- <symptom>
- <situation>

## Required Context

- \`../knowledge/<file>.md\`
- Active role instructions
- Founder request

## Inputs

- <input>
- <input>

## Process

### Step 1

Confirm this skill applies to the active request.

### Step 2

Load only the required context.

### Step 3

Apply the capability and produce the smallest useful output.

### Step 4

Check red lines before recommending file updates or handoffs.

## Checks & Acceptance Criteria

- <check>
- <check>

## Output

- <output>
- <output>

## Files to Update

- Update relevant area knowledge only after explicit confirmation.

## Red Lines

- Do not invent product-specific facts.
- Do not turn this skill into a playbook or workflow.
- Ask before modifying durable files.
`;
}

export function skillYamlTemplate(): string {
  return `skill:
  slug: <skill-name>
  title: <Skill Name>
  purpose: <One reusable capability>
  use_when:
    - <trigger>
  required_context:
    - <context file>
  process:
    - <step>
  checks:
    - <check>
  outputs:
    - <output>
`;
}

export function playbookTemplate(): string {
  return `---
name: <playbook-name>
description: Use when <specific trigger or situation>
---

# <Playbook Name>

## Purpose

Explain the practical task this playbook executes inside one area.

## When to Use

- ...
- ...
- ...

## Inputs

- ...
- ...
- ...

## Guided Conversation

Use \`../../../ai-standard/foundation/guided-conversation.md\` when the playbook needs the founder to choose, classify, prioritize or confirm.

Ask guided questions when:

- required context is missing;
- the founder must choose between predictable paths;
- a durable file update depends on confirmation;
- the next step changes roadmap, MVP, issue, PR, implementation, launch or learning state.

Do not ask a rigid questionnaire. Ask only what is missing.

## Process

1. ...
2. ...
3. ...

## Stop Conditions

- Ask before updating durable files.
- Ask before calling scripts, APIs or external capabilities.
- Ask before changing roadmap, MVP, issue, PR or implementation state.

## Acceptance Criteria & Outputs

- ...
- ...
- ...

## Files to Update

- ...

## Red Lines

- Do not duplicate a workflow.
- Do not duplicate skills.
- Do not invent missing context.
- Do not update files without explicit confirmation.

## Navigation

\`../AGENT.md -> roles/<role>.role.md -> skills/<skill>/SKILL.md -> playbooks/<this-playbook>.playbook.md -> Output\`
`;
}

export function playbookYamlTemplate(): string {
  return `playbook:
  key: <playbook-key>
  title: <Playbook Name>
  owner_area: <department.area>
  purpose: <practical task this playbook executes>
  use_when:
    - <trigger>
  inputs:
    - <input>
  guided_conversation:
    foundation: ../../../ai-standard/foundation/guided-conversation.md
    use_when:
      - founder decision is needed
      - durable update needs confirmation
  process:
    - <step>
  outputs:
    - <output>
  files_to_update:
    - <path>
  confirmation_required:
    - durable file updates
    - external actions
  red_lines:
    - do not duplicate a workflow
`;
}
