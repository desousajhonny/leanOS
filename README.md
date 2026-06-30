# LeanOS AI Framework

LeanOS is an agent-native startup operating system for building AI-first products with strategic coherence before and during implementation.

It is not just a code generator. The CLI creates a workspace, and the AI agent operates that workspace through natural-language intent routing, departments, areas, roles, skills, playbooks and workflows.

## What Exists Now

LeanOS currently includes:

- A TypeScript/Node CLI package published as `lean-os`.
- A create package published as `create-lean-os` for the standard `npm create lean-os` setup flow.
- A guided terminal wizard exposed through `npm create lean-os` and kept available through `lean-os ai` for compatibility.
- A generated client workspace with `AGENT.md`, `leanos.yaml`, `.leanos/`, `ai-standard/`, active `strategy/` and GitHub/VS Code integration files.
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
npm create lean-os
```

The CLI asks a short set of questions and creates the LeanOS workspace in the current directory.

For compatibility, the same wizard remains available through:

```bash
npx lean-os ai
```

After generation, open the folder in your preferred AI coding environment and start in natural language:

```text
Vamos comecar com o LeanOS.
```

The root `AGENT.md` is the portable entrypoint. It lets VS Code Copilot Chat, Claude, Codex, terminal agents or other assistants route the request without relying on generated command files.

## LeanOS Chief

`LeanOS Chief` is the bootloader and dispatcher for the workspace.

It is intentionally small. It does not duplicate the whole framework. Its job is to:

- Start from `AGENT.md` and `leanos.yaml`.
- Load the minimum context needed for the user request.
- Route work through the Navigation Chain.
- Respect active departments and areas.
- Avoid missing paths and avoid inventing workflows.
- Propose source-of-truth updates before writing during startup or any routed workflow.

Generated VS Code/Copilot files:

- `.github/agents/leanos-chief.agent.md`
- `.github/prompts/start-leanos.prompt.md`
- `.github/prompts/leanos-init.prompt.md` as a legacy alias

The root `AGENT.md` also keeps command-like requests portable outside VS Code by mapping natural phrases to the right workflow or to `activation_required` when an area is not active yet.

## Navigation Chain

LeanOS uses a department and area-first operating model:

```text
AGENT.md -> Department AGENT.md/README.md -> Workflow or Area AGENT.md/README.md -> Role -> Skills -> Playbook -> Output
```

The agent should not jump directly to implementation. It should load only the smallest relevant route for the current task.

## Generated Workspace

The generated client workspace separates LeanOS runtime files from the client's operating structure:

```text
.github/
.leanos/
ai-standard/
strategy/
AGENT.md
leanos.yaml
README.md
```

### `.leanos/`

LeanOS runtime support:

- `agent/` operating rules for LeanOS Chief
- `context/` current focus, next actions and workspace summary
- `index/` routing maps for departments, areas, roles, skills, playbooks and workflows
- `vscode/` notes for VS Code/Copilot setup

### `ai-standard/`

The standard library for creating and validating LeanOS assets:

- templates
- checklists
- instructions
- examples
- naming and navigation rules

### Client Departments

Active root departments live at the workspace root. The initial MVP scaffold starts Strategy-first:

- `strategy/`

Operations and Growth are available for progressive activation when the founder reaches the right stage. Each active root department has:

- `AGENT.md`
- `README.md`
- `department.yaml`
- `workflows/`

Roles, skills and playbooks live inside internal areas, not directly in the root department.

Initial active areas:

- `strategy/business/`
- `strategy/product/`
- `strategy/roadmap/`

Available later through activation:

- `operations/product-ops/`
- `operations/product-ops/mvp/`
- `operations/design/`
- `operations/engineering/`
- `operations/devops/`
- `operations/security/`
- `growth/customer-experience/`
- `growth/marketing/`
- `growth/finance/`

## Startup Intent

Startup is handled by natural-language intent through root `AGENT.md`.

It loads the workspace map, summarizes the current state and proposes Strategy-first source-of-truth updates.

During startup, LeanOS Chief may propose updates to:

- `.leanos/context/workspace-summary.md`
- `.leanos/context/current-focus.md`
- `.leanos/context/next-actions.md`
- Strategy source-of-truth files such as business profile, product brief, ICP, validation notes and roadmap context

In the MVP scaffold, lightweight validation lives in `strategy/product/knowledge/validation-notes.md`. Formal discovery can be designed later as a separate optional capability, but it is not part of the default MVP scaffold.

It must not modify during init:

- `roles/`
- `skills/`
- `playbooks/`
- `workflows/`
- `ai-standard/`
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

LeanOS publishes two npm packages:

- `lean-os`: the operational CLI.
- `create-lean-os`: the wrapper that powers `npm create lean-os`.

Before publishing, bump both package versions as needed, commit the framework changes, and prepare npm auth locally. Do not paste npm tokens into chat or committed files.

PowerShell token setup:

```powershell
$secureToken = Read-Host "Cole seu token npm granular" -AsSecureString
$token = [System.Net.NetworkCredential]::new("", $secureToken).Password
Set-Content -LiteralPath ".npmrc" -Value "//registry.npmjs.org/:_authToken=$token" -Encoding ASCII
Remove-Variable token, secureToken
npm whoami
```

Then run the release runbook:

```bash
npm run release:npm
```

The runbook validates npm auth, clean git state except local `.npmrc`, `npm test`, build, package dry-runs, publishes `lean-os` before `create-lean-os`, verifies npm registry versions, and removes `.npmrc` after the publish attempt.

After publishing, users can create a new LeanOS workspace with:

```bash
npm create lean-os
```

## Example Agent Requests

```text
Vamos comecar com o LeanOS.
Help me define the ICP.
Turn this idea into an MVP.
Create a roadmap for the first MVP learning cycle.
Check if this MVP is coherent.
Sync confirmed Epics and Features with GitHub Projects.
Start working on the authentication issue.
Review this PR against the MVP scope.
Create a new UX research role using LeanOS standards.
```

## Summary

LeanOS turns an AI coding agent into an AI-first startup operator.

The CLI prepares the workspace. LeanOS Chief reads the workspace, routes the work and keeps product execution connected to strategy, validation and learning.
