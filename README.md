# LeanOS AI

LeanOS is an agent-native startup operating system for building AI-first products, SaaS products, apps, developer tools, marketplaces, internal tools, and AI agent products.

It helps founders and product builders move from idea to validated MVP, and then continue operating the product day to day through feature discovery, prioritization, roadmap updates, GitHub execution, skills, playbooks, and agent-guided development.

LeanOS is not just a code generator. It turns a coding agent into a startup operator.

## Core Idea

LeanOS exists to help users build products with strategic coherence before implementation and keep that coherence alive as the product evolves.

Its central principle is:

> Do not build features before the company, customer, problem, value proposition, MVP scope, and validation logic are clear enough.

## Product Model

LeanOS is a chat-operated, agent-native framework.

The CLI prepares the workspace. The LeanOS Agent operates the startup through the editor chat using natural language and slash commands.

LeanOS supports both the early startup cycle and the ongoing product development cycle: from a new feature idea, to clarification, validation, scope definition, issue creation, implementation, review, and learning capture.

## CLI

Once the package is published to npm, users can start LeanOS with:

```bash
npx lean-os ai
```

The CLI creates the initial LeanOS workspace. After that, the main experience continues inside your editor chat:

```text
/init leanos
```

## Local Development

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

After publishing, users do not need to install LeanOS globally. They can run:

```bash
npx lean-os ai
```

## Experience Model

LeanOS has three layers:

1. **LeanOS CLI**
   Installs and generates the initial workspace.

2. **LeanOS Workspace**
   Stores company, product, validation, MVP, roadmap, architecture, GitHub, skills, and playbooks.

3. **LeanOS Agent**
   Operates through the editor chat using natural language and slash commands.

## Example Agent Requests

```text
Help me define the ICP.
Turn this idea into an MVP.
Create a roadmap for the first validation cycle.
Check if this MVP is coherent.
Create GitHub issues for this roadmap.
Start working on the authentication issue.
Review this PR against the MVP scope.
```

## Summary

LeanOS turns your coding agent into an AI-first startup operator.

From startup strategy to validated pull requests.
