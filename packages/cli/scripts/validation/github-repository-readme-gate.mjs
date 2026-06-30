import assert from "node:assert/strict";
import { createWorkspaceFiles } from "../../dist/templates/workspace-template.js";
import { answers } from "./fixtures.mjs";

export async function validateGithubRepositoryReadmeGate() {
  const files = createWorkspaceFiles({ ...answers, initialActivationMode: "all-at-once" });
  const byPath = new Map(files.map((file) => [file.path, file.content]));
  const devopsRoot = "clinic-assistant-ai-os/operations/devops";

  const devopsAgent = requiredFile(byPath, `${devopsRoot}/AGENT.md`);
  const githubRole = requiredFile(byPath, `${devopsRoot}/roles/github-devops.role.md`);
  const githubSkill = requiredFile(byPath, `${devopsRoot}/skills/configure-github-project/SKILL.md`);
  const githubPlaybook = requiredFile(byPath, `${devopsRoot}/playbooks/configure-github-project.playbook.md`);
  const githubKnowledge = requiredFile(byPath, `${devopsRoot}/knowledge/github-management.md`);

  for (const snippet of [
    "Repository bootstrap request",
    "README-ready",
    "Strategy Product -> Product Narrative Editor -> write-product-readme"
  ]) {
    assertIncludes(devopsAgent, snippet, "operations/devops/AGENT.md");
  }

  for (const snippet of [
    "novo repositório GitHub",
    "README product-first confirmado",
    "Strategy Product -> Product Narrative Editor -> write-product-readme"
  ]) {
    assertIncludes(githubRole, snippet, "github-devops.role.md");
  }

  for (const snippet of [
    "README status",
    "README-ready",
    "Não crie ou publique um novo repositório GitHub sem README product-first confirmado",
    "Strategy Product -> Product Narrative Editor -> write-product-readme"
  ]) {
    assertIncludes(githubSkill, snippet, "configure-github-project/SKILL.md");
    assertIncludes(githubPlaybook, snippet, "configure-github-project.playbook.md");
  }

  for (const snippet of [
    "Repository mode: existing | new | TBD",
    "README status: missing | draft | confirmed | preserved | TBD",
    "README source: Strategy Product | existing repo | TBD",
    "New repository README gate",
    "Não crie ou publique um novo repositório GitHub sem README product-first confirmado"
  ]) {
    assertIncludes(githubKnowledge, snippet, "github-management.md");
  }
}

function requiredFile(byPath, path) {
  const content = byPath.get(path);
  assert(content, `Expected generated file: ${path}`);
  return content;
}

function assertIncludes(content, snippet, path) {
  assert(content.includes(snippet), `${path} should include: ${snippet}`);
}
