# LeanOS AI Framework

LeanOS is an agent-native startup operating system for building AI-first products with strategic coherence before and during implementation.

It is not just a code generator. The CLI creates a workspace, and the AI agent operates that workspace through documented commands, departments, areas, roles, skills and playbooks.

## What Exists Now

LeanOS currently includes:

- A TypeScript/Node CLI package published as `lean-os`.
- A guided terminal wizard exposed through `lean-os ai`.
- A generated client workspace with `AGENT.md`, `leanos.yaml`, `.leanos/`, `ai-standard/`, `strategy/`, `operations/`, `growth/` and GitHub/VS Code integration files.
- A workspace-level VS Code/Copilot custom agent called `LeanOS Chief`.
- A portable agent entrypoint for any model or chat surface through the root `AGENT.md`.
- A generated preview in `examples/client-workspace/` that shows exactly what the CLI creates.

The current version is a local, file-based framework. It does not yet include hosted services, real GitHub API sync, marketplace distribution, remote auth, analytics or a VS Code extension.

## Core Principle

LeanOS exists to help founders and product builders avoid jumping straight into implementation.

The central rule is:

> Do not build features before the company, customer, problem, value proposition, MVP scope and validation logic are clear enough.

LeanOS supports both the early startup cycle and the ongoing product development cycle: from a new idea, to clarification, validation, scope definition, issue creation, implementation, review and learning capture.

## Company as a Product

LeanOS treats the company itself as a product.

The company is not just the organization building the product. It is also an operating system with its own profile, principles, workflows, validation loops, decision history and quality rules.

In LeanOS, `strategy/business/` is the source-of-truth area for that operating system. It captures:

- who the company is and who it exists for
- mission, vision and principles
- how decisions are made
- how humans and AI agents collaborate
- what has been decided and why
- which assumptions still need validation

This means product work should be coherent with the business operating model. Before creating features, issues or pull requests, LeanOS Chief should understand the business context, product strategy and validation state.

The product is what the company builds. The business is the system that decides what is worth building.

## Quick Start

After the current package version is published, users can run:

```bash
npx lean-os ai
```

The CLI asks a short set of questions and creates the LeanOS workspace in the current directory.

After generation, open the folder in your preferred AI coding environment and start with:

```text
/start-leanos
```

`/start-leanos` is a chat/agent command, not a shell command. It works as an instruction for VS Code Copilot Chat, Claude, Codex, terminal agents or any assistant that reads the generated `AGENT.md`.

## LeanOS Chief

`LeanOS Chief` is the bootloader and dispatcher for the workspace.

It is intentionally small. It does not duplicate the whole framework. Its job is to:

- Start from `AGENT.md` and `leanos.yaml`.
- Load the minimum context needed for the user request.
- Route work through the Navigation Chain.
- Respect active departments and areas.
- Load `.leanos/commands/<command>.md` before acting on any LeanOS slash command.
- Avoid missing paths and avoid inventing workflows.
- Propose source-of-truth updates before writing during `/start-leanos`.

Generated VS Code/Copilot files:

- `.github/agents/leanos-chief.agent.md`
- `.github/prompts/start-leanos.prompt.md`
- `.github/prompts/leanos-init.prompt.md` as a legacy alias

The root `AGENT.md` also makes command handling portable outside VS Code. If the user invokes `/start-leanos`, any capable model should load `.leanos/commands/start-leanos.md` and follow it.

## Navigation Chain

LeanOS uses a department and area-first operating model:

```text
AGENT.md -> Department AGENT.md/README.md -> Area README -> Role -> Skills -> Playbook -> Output
```

The agent should not jump directly to implementation. It should load only the smallest relevant route for the current task.

## Generated Workspace

The generated client workspace separates LeanOS runtime files from the client's operating structure:

```text
.github/
.leanos/
ai-standard/
strategy/
operations/
growth/
AGENT.md
leanos.yaml
README.md
```

### `.leanos/`

LeanOS runtime support:

- `agent/` operating rules for LeanOS Chief
- `commands/` slash command instructions
- `context/` current focus, next actions and workspace summary
- `index/` routing maps for departments, areas, roles, skills, playbooks and workflows
- `workflows/` global cross-department workflows
- `vscode/` notes for VS Code/Copilot setup

### `ai-standard/`

The standard library for creating and validating LeanOS assets:

- templates
- checklists
- instructions
- examples
- naming and navigation rules

### Client Departments

Root departments live at the workspace root:

- `strategy/`
- `operations/`
- `growth/`

Each root department has:

- `AGENT.md`
- `README.md`
- `department.yaml`
- `workflows/`

Roles, skills and playbooks live inside internal areas, not directly in the root department.

Current areas:

- `strategy/business/`
- `strategy/product/`
- `strategy/roadmap/`
- `strategy/validation/`
- `operations/product-ops/`
- `operations/product-ops/mvp/`
- `operations/design/`
- `operations/engineering/`
- `operations/devops/`
- `operations/security/`
- `growth/customer-experience/`
- `growth/marketing/`
- `growth/finance/`

## `/start-leanos`

`/start-leanos` is the safe bootstrap command.

It loads the workspace map, summarizes the current state and proposes Strategy-first source-of-truth updates.

During `/start-leanos`, LeanOS Chief may propose updates to:

- `.leanos/context/workspace-summary.md`
- `.leanos/context/current-focus.md`
- `.leanos/context/next-actions.md`
- Strategy source-of-truth files such as company profile, product brief, ICP, assumptions and learning log

It must not modify during init:

- `roles/`
- `skills/`
- `playbooks/`
- `workflows/`
- `ai-standard/`
- `.leanos/commands/`
- `.github/`
- product code
- Operations or Growth files unless the user explicitly asks after init

Roles, skills, playbooks and workflows are operating assets. They are used by the model to work, but they are not enriched with company/product context during startup.

## CLI Development

Install dependencies:

```bash
pnpm install
```

Build the CLI:

```bash
pnpm build
```

Run the CLI locally:

```bash
pnpm --filter lean-os dev ai
```

Run the built CLI:

```bash
node packages/cli/dist/index.js ai
```

## Generated Client Workspace Preview

`examples/client-workspace/` is a generated preview of the workspace LeanOS creates for a client.

Do not edit it manually. It is generated from the real CLI template.

Regenerate it with:

```bash
npm run generate:client-workspace
```

Validate that it is synchronized with the template:

```bash
npm test
```

The tree view lives in:

```text
examples/client-workspace-tree.md
```

## Useful Scripts

```bash
npm run generate:client-workspace
npm run refresh
npm test
npm --prefix packages/cli run build
node packages/cli/scripts/validate-generator.mjs
node packages/cli/dist/index.js --help
```

## Publishing

The CLI package lives in `packages/cli` and exposes this binary:

```json
{
  "bin": {
    "lean-os": "dist/index.js"
  }
}
```

To publish the public CLI package:

```bash
pnpm install
pnpm build
cd packages/cli
npm publish --access public
```

After publishing, users can run:

```bash
npx lean-os ai
```

## Example Agent Requests

```text
/start-leanos
Help me define the ICP.
Turn this idea into an MVP.
Create a roadmap for the first validation cycle.
Check if this MVP is coherent.
Create GitHub issues for this roadmap.
Start working on the authentication issue.
Review this PR against the MVP scope.
Create a new UX research role using LeanOS standards.
```

## Summary

LeanOS turns an AI coding agent into an AI-first startup operator.

The CLI prepares the workspace. LeanOS Chief reads the workspace, routes the work and keeps product execution connected to strategy, validation and learning.
