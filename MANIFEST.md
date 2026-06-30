# LeanOS Manifest

## What is LeanOS?

LeanOS is an agent-native startup operating system for building AI-first products, SaaS products, apps, developer tools, marketplaces, internal tools, and AI agent products.

LeanOS helps founders and product builders move from idea to validated MVP by creating a structured workspace that combines company strategy, product definition, validation, roadmap, GitHub execution, skills, playbooks, and agent-guided development.

LeanOS is not just a code generator.

LeanOS is a framework that turns a coding agent into a startup operator.

Its purpose is to help users build products with strategic coherence before jumping into implementation.

The core belief behind LeanOS is:

> Do not build features before the company, customer, problem, value proposition, MVP scope, and validation logic are clear enough.

LeanOS creates the minimum operating structure required to transform an idea into a validated product.

---

## Product Positioning

LeanOS is a chat-operated, agent-native framework.

It is designed to work through a conventional coding agent chat, such as Codex, GitHub Copilot Chat, Cursor, Windsurf, Claude Code, or any compatible agent environment.

LeanOS does not require a dedicated VS Code extension.

The CLI is only responsible for installing and generating the initial workspace.

The real product experience happens through the LeanOS Agent inside the user's editor chat.

Core positioning:

> LeanOS turns your coding agent into an AI-first startup operator.

Alternative positioning:

> From startup strategy to validated pull requests.

---

## Core Product Principle

The CLI prepares the workspace.

The LeanOS Agent operates the startup.

This means:

- The CLI should be lightweight.
- The CLI should ask only the minimum required setup questions.
- Strategic definition should happen through the agent chat.
- MVP definition should happen through the agent chat.
- GitHub roadmap and issue workflow should happen through the agent chat.
- PR validation should happen through the agent chat or GitHub workflow.

---

## Primary Installation Command

LeanOS should be installed and started with:

```bash
npm create lean-os
```

For compatibility, the same setup wizard remains available as:

```bash
npx lean-os ai
```

When this command runs, the terminal should display a large LeanOS ASCII banner, similar to modern agent CLIs.

```text
██╗     ███████╗ █████╗ ███╗   ██╗ ██████╗ ███████╗
██║     ██╔════╝██╔══██╗████╗  ██║██╔═══██╗██╔════╝
██║     █████╗  ███████║██╔██╗ ██║██║   ██║███████╗
██║     ██╔══╝  ██╔══██║██║╚██╗██║██║   ██║╚════██║
███████╗███████╗██║  ██║██║ ╚████║╚██████╔╝███████║
╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝

LeanOS AI
Agent-native startup operating system
```

## LeanOS Experience Model

LeanOS has three layers:

1. LeanOS CLI
   Installs and generates the initial workspace.

2. LeanOS Workspace
   Stores the company, product, validation, MVP, roadmap, architecture, GitHub, skills, and playbooks.

3. LeanOS Agent
   Operates through the editor chat using natural-language intent routing.

## The LeanOS Agent

The LeanOS Agent is the main operating interface.

It should behave as a Chief Agent for the startup.

It is not only a coding assistant.

It is responsible for helping the user:

- define the company context
- define the product context
- clarify the ICP
- define the problem
- define the value proposition
- create the business model
- define assumptions
- define validation experiments
- define MVP scope
- create the roadmap
- create GitHub issues
- manage branch workflow
- create pull requests
- review pull requests
- check coherence
- capture learning
- iterate the roadmap

The agent should support both:

1. Natural language
2. Slash commands

### Example natural language requests

```text
Help me define the ICP.
Turn this idea into an MVP.
Create a roadmap for the first validation cycle.
Check if this MVP is coherent.
Create GitHub issues for this roadmap.
Start working on the authentication issue.
Review this PR against the MVP scope.
```
