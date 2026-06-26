# Founder Progression Model Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the Founder Progression Model as a generated LeanOS foundation asset, validate it automatically, and prepare it to drive progressive workspace activation.

**Architecture:** The first slice keeps the model as source-generated documentation under `ai-standard/foundation/` because that folder already owns framework-level rules for navigation, guided conversation and quality. Generator validation will fail when the file, README routes or required progression anchors are missing.

**Tech Stack:** TypeScript generator templates, Node validation script, Markdown generated workspace assets.

---

### Task 1: Add Generator Validation For Founder Progression

**Files:**
- Modify: `packages/cli/scripts/validate-generator.mjs`

- [x] **Step 1: Add the failing file-existence expectation**

Add `ai-standard/foundation/founder-progression-model.md` to the expected generated paths in `validateWorkspaceFiles()`.

- [x] **Step 2: Add content assertions**

In `assertAiStandardFoundation(rootDir)`, read `founder-progression-model.md` and assert it contains the required anchors:

```js
const founderProgressionModel = await readFile(join(rootDir, "ai-standard", "foundation", "founder-progression-model.md"), "utf8");

for (const expected of [
  "Setup Seed",
  "Strategy Seed",
  "Strategy Baseline",
  "Idea Diagnosis",
  "Roadmap Inicial",
  "MVP Decision",
  "Product Shaping",
  "Delivery Readiness",
  "Implementation",
  "Launch",
  "Learning Loop",
  "Scaling / Operating Cadence",
  "activation_required",
  "Progression Intent Routing",
  "Do not load inactive departments"
]) {
  assert(founderProgressionModel.includes(expected), `Founder Progression Model should include ${expected}`);
}
```

- [x] **Step 3: Run validation and confirm RED**

Run: `node packages\cli\scripts\validate-generator.mjs`

Expected: FAIL because `ai-standard/foundation/founder-progression-model.md` is not generated yet.

Observed: FAIL with `Expected generated path missing: ai-standard/foundation/founder-progression-model.md`.

### Task 2: Generate Founder Progression Foundation File

**Files:**
- Modify: `packages/cli/src/templates/workspace/renderers/ai-standard.ts`

- [x] **Step 1: Register the new foundation asset**

Add the file to the foundation README list and the `aiStandardFiles()` return array:

```ts
{ path: "ai-standard/foundation/founder-progression-model.md", content: founderProgressionModel() },
```

- [x] **Step 2: Add the content function**

Create `founderProgressionModel(): string` with sections for:

- purpose and when to use
- startup progression stages
- Chief behavior at startup
- guided question rules
- activation gates
- `activation_required` response behavior
- red lines against inactive or nonexistent assets
- practical routing examples

- [x] **Step 3: Update AI Standard README routes**

Add a route row for choosing the next founder progression stage:

```md
| Decide the next founder progression stage | `foundation/founder-progression-model.md` | Defines Strategy-first progression, gates, activation_required and Chief routing behavior. |
```

- [x] **Step 4: Run validation and confirm GREEN**

Run: `node packages\cli\scripts\validate-generator.mjs`

Expected: PASS with `LeanOS generator validations passed.`

Observed: PASS after compiling `packages/cli` with `packages\cli\node_modules\.bin\tsc.CMD -p packages\cli\tsconfig.json` and regenerating `examples/client-workspace`.

### Task 3: Review Generated Diff

**Files:**
- Review: `packages/cli/src/templates/workspace/renderers/ai-standard.ts`
- Review: `packages/cli/scripts/validate-generator.mjs`
- Review: `docs/superpowers/plans/2026-06-25-founder-progression-model.md`

- [x] **Step 1: Inspect changed files**

Run: `git diff -- packages/cli/src/templates/workspace/renderers/ai-standard.ts packages/cli/scripts/validate-generator.mjs docs/superpowers/plans/2026-06-25-founder-progression-model.md`

Expected: Diff only adds the new foundation model, README routing and validation assertions.

Observed: Diff includes the generated preview fixture for the new foundation file, plus the temporary roadmap file already modified in this session.

- [ ] **Step 2: Decide next slice**

After this passes, continue with root `AGENT.md` / generated root agent progression routing, then Strategy-only scaffold activation rules.
