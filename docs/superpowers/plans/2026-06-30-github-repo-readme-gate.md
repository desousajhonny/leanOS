# GitHub Repository README Gate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure any new GitHub repository setup routes through Strategy Product to prepare a product-first README before DevOps finalizes repository creation or publication.

**Architecture:** Keep root `AGENT.md` clean. Add the contract to DevOps/GitHub DevOps as a handoff gate, referencing `Strategy Product -> Product Narrative Editor -> write-product-readme`. Cover the behavior through generator validation and regenerated client workspace fixtures.

**Tech Stack:** TypeScript workspace generator, Node.js validation scripts, Markdown/YAML generated assets.

---

### Task 1: RED Validation

**Files:**
- Create: `packages/cli/scripts/validation/github-repository-readme-gate.mjs`
- Modify: `packages/cli/scripts/validate-generator.mjs`

- [ ] **Step 1: Add failing validation**

Create a validation that asserts DevOps/GitHub generated assets contain:

```text
README status
README-ready
Strategy Product -> Product Narrative Editor -> write-product-readme
Não crie ou publique um novo repositório GitHub sem README product-first confirmado
```

- [ ] **Step 2: Run test to verify RED**

Run: `npm test`
Expected: FAIL because DevOps assets do not yet contain the README gate.

### Task 2: GREEN Contract

**Files:**
- Modify: `packages/cli/src/templates/workspace/definitions/departments/operations/devops/common-paths.ts`
- Modify: `packages/cli/src/templates/workspace/definitions/departments/operations/devops/skills.ts`
- Modify: `packages/cli/src/templates/workspace/definitions/departments/operations/devops/playbooks.ts`
- Modify: `packages/cli/src/templates/workspace/definitions/departments/operations/devops/knowledge/devops-github-management.ts`
- Modify: `packages/cli/src/templates/workspace/definitions/departments/operations/devops/roles.ts`

- [ ] **Step 1: Add README gate to GitHub DevOps**

Add a repository bootstrap path and checks that require README readiness before new repository creation/publication.

- [ ] **Step 2: Route missing README to Strategy Product**

Every new repository path must explicitly point to `Strategy Product -> Product Narrative Editor -> write-product-readme`.

- [ ] **Step 3: Preserve DevOps boundary**

DevOps may verify README status and remote setup, but must not invent product narrative.

### Task 3: Fixtures And Verification

**Files:**
- Regenerate: `examples/client-workspace/`
- Modify: `TEMP-roadmap-ajustes.md`
- Modify: `MODEL_MEMORY.md`
- Modify: `docs/framework/source-of-truth/decision-log.md`

- [ ] **Step 1: Regenerate fixture**

Run: `npm run generate:client-workspace`
Expected: generated workspace includes README gate in DevOps assets.

- [ ] **Step 2: Run final checks**

Run: `npm test`
Expected: `LeanOS generator validations passed.`

Run: `git diff --check`
Expected: no output.
