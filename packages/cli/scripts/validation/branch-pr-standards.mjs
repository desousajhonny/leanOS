import assert from "node:assert/strict";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { activateWorkspaceArea } from "../../dist/generators/workspace-activation.js";
import { generateWorkspace } from "../../dist/generators/workspace-generator.js";
import { answers } from "./fixtures.mjs";

export async function validateBranchAndPrStandards() {
  const rootDir = await mkdtemp(join(tmpdir(), "leanos-branch-pr-standards-"));

  await generateWorkspace(rootDir, answers);

  const branchRules = await readFile(join(rootDir, ".github", "leanos", "branch-rules.md"), "utf8");
  const pullRequestTemplate = await readFile(join(rootDir, ".github", "PULL_REQUEST_TEMPLATE.md"), "utf8");
  const branchNameTemplate = await readFile(join(rootDir, ".leanos", "standard", "templates", "github", "branch-name-template.md"), "utf8");
  const aiPullRequestTemplate = await readFile(join(rootDir, ".leanos", "standard", "templates", "github", "pull-request-template.md"), "utf8");

  assertBranchStandards(branchRules, "Generated branch rules");
  assertBranchStandards(branchNameTemplate, "AI Standard branch template");
  assertPullRequestStandards(pullRequestTemplate, "Generated PR template");
  assertPullRequestStandards(aiPullRequestTemplate, "AI Standard PR template");

  await activateWorkspaceArea(rootDir, "operations.product-ops");
  await activateWorkspaceArea(rootDir, "operations.engineering");

  const createPrSkill = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "skills", "create-pr", "SKILL.md"), "utf8");
  const branchPlaybook = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "playbooks", "branch-for-feature.playbook.md"), "utf8");
  const preparePrPlaybook = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "playbooks", "prepare-pr.playbook.md"), "utf8");
  const postMergeReminder = "Quando você mergear, avisa aqui que continuamos. Basta um 'merge feito, vamos seguir'.";

  assert(createPrSkill.includes("Título do PR em formato Conventional Commit"), "Create PR skill should require a Conventional Commit style title");
  assert(createPrSkill.includes("Status de prontidão"), "Create PR skill should output PR readiness status");
  assert(createPrSkill.includes("Deploy / Rollback"), "Create PR skill should require deploy and rollback notes");
  assert(createPrSkill.includes("Acabei de criar o PR #<number>: <url>. Você deseja rodar a revisão agora?"), "Create PR skill should prompt the founder to run PR validation after creating the PR");
  assert(createPrSkill.includes(postMergeReminder), "Create PR skill should remind founder to trigger post-merge continuation after merge");
  assert(createPrSkill.includes("playbooks/pr-validation.playbook.md"), "Create PR skill should route the post-PR review prompt to PR validation");
  assert(branchPlaybook.includes("fix/..."), "Branch playbook should mention fix branches");
  assert(branchPlaybook.includes("chore/..."), "Branch playbook should mention chore branches");
  assert(branchPlaybook.includes("docs/..."), "Branch playbook should mention docs branches");
  assert(branchPlaybook.includes("spike/..."), "Branch playbook should mention spike branches");
  assert(preparePrPlaybook.includes("Título do PR em formato Conventional Commit"), "Prepare PR playbook should require a Conventional Commit style title");
  assert(preparePrPlaybook.includes("Status De Prontidão"), "Prepare PR playbook should fill readiness status");
  assert(preparePrPlaybook.includes("Deploy / Rollback"), "Prepare PR playbook should fill deploy and rollback notes");
  assert(preparePrPlaybook.includes("Acabei de criar o PR #<number>: <url>. Você deseja rodar a revisão agora?"), "Prepare PR playbook should ask whether to run PR validation after PR creation");
  assert(preparePrPlaybook.includes(postMergeReminder), "Prepare PR playbook should remind founder to trigger post-merge continuation after merge");
}

function assertBranchStandards(content, label) {
  for (const expected of [
    "feature/<feature-slug>-<short-kebab-slug>",
    "issue/<issue-number>-<short-kebab-slug>",
    "fix/<issue-number>-<short-kebab-slug>",
    "chore/<short-kebab-slug>",
    "docs/<short-kebab-slug>",
    "spike/<short-kebab-slug>"
  ]) {
    assert(content.includes(expected), `${label} should include ${expected}`);
  }

  assert(content.includes("feature/..."), `${label} should explain Feature branches`);
  assert(content.includes("issue/..."), `${label} should explain issue branches`);
  assert(content.includes("fix/..."), `${label} should explain fix branches`);
  assert(content.includes("chore/..."), `${label} should explain chore branches`);
  assert(content.includes("docs/..."), `${label} should explain docs branches`);
  assert(content.includes("spike/..."), `${label} should explain spike branches`);
  assert(content.includes("kebab-case"), `${label} should require kebab-case slugs`);
  assert(content.includes("Não inclua segredos"), `${label} should protect sensitive data in branch names`);
}

function assertPullRequestStandards(content, label) {
  for (const expected of [
    "## Título Do PR",
    "feat(<escopo>): <resumo curto>",
    "fix(<escopo>): <resumo curto>",
    "chore(<escopo>): <resumo curto>",
    "## Resumo",
    "## Issue Vinculada",
    "## Epic Pai",
    "## Status De Prontidão",
    "draft | founder-ready | blocked-by-tests | blocked-by-context",
    "## Alinhamento De Produto / Escopo De Delivery",
    "## Notas De Design",
    "## Notas De Security",
    "## Testes",
    "## Founder Testing Guide",
    "## Deploy / Rollback",
    "## Riscos",
    "## Checklist De Review LeanOS"
  ]) {
    assert(content.includes(expected), `${label} should include ${expected}`);
  }

  assert.equal(content.includes("## Summary"), false, `${label} should not use English Summary heading`);
  assert.equal(content.includes("## Linked Issue"), false, `${label} should not use English Linked Issue heading`);
  assert.equal(content.includes("## Parent Epic"), false, `${label} should not use English Parent Epic heading`);
  assert.equal(content.includes("## Design Notes"), false, `${label} should not use English Design Notes heading`);
  assert(content.includes("Founder Testing Guide is clear enough for a non-technical founder"), `${label} should keep founder testing review criterion`);
}
