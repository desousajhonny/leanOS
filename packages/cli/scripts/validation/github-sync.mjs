import assert from "node:assert/strict";
import { parse } from "yaml";
import { createWorkspaceFiles } from "../../dist/templates/workspace-template.js";
import { answers } from "./fixtures.mjs";

export async function validateGithubSyncContract() {
  const files = createWorkspaceFiles({ ...answers, initialActivationMode: "all-at-once" });
  const byPath = new Map(files.map((file) => [file.path, file.content]));
  const leanosConfig = parse(byPath.get("leanos.yaml"));
  const businessOs = leanosConfig.paths.business_os;
  const productOpsRoot = `${businessOs}/operations/product-ops`;

  const projectSync = parse(requiredFile(byPath, ".github/leanos/project-sync.yaml"));
  const workMapping = requiredFile(byPath, ".github/leanos/work-mapping.md");
  const capabilityContract = requiredFile(byPath, ".github/leanos/capability-contract.md");
  const epicsReadme = requiredFile(byPath, `${productOpsRoot}/epics/README.md`);
  const workTaxonomy = requiredFile(byPath, `${productOpsRoot}/knowledge/work-taxonomy.md`);
  const devopsGithubManagement = requiredFile(byPath, `${businessOs}/operations/devops/knowledge/github-management.md`);
  const epicTemplate = requiredFile(byPath, ".leanos/standard/templates/product/epic-template.md");
  const featureTemplate = requiredFile(byPath, ".leanos/standard/templates/product/feature-template.md");

  assert.equal(projectSync.github.project_sync.source.epics, `../../${productOpsRoot}/epics/`);
  assert.equal(projectSync.github.work_mapping.epic.local_source, `${productOpsRoot}/epics/<epic-slug>/epic.md`);
  assert.equal(projectSync.github.work_mapping.epic.legacy_local_source, `${productOpsRoot}/epics/<epic-slug>/README.md`);
  assert.equal(projectSync.github.work_mapping.feature.local_source, `${productOpsRoot}/epics/<epic-slug>/<feature-slug>.md`);
  assert.equal(projectSync.github.fields.effort, "Effort");

  for (const snippet of [
    "body_renderer: rich_markdown",
    "preserve_local_sections: true",
    "forbid_summary_only_body: true",
    "require_milestone: true",
    "relationships:",
    "remote_verification:",
    "local_patch:"
  ]) {
    assertIncludes(requiredFile(byPath, ".github/leanos/project-sync.yaml"), snippet, ".github/leanos/project-sync.yaml");
  }

  for (const snippet of [
    "Epic artifact",
    "`epic.md`",
    "`README.md` legado",
    "não deve resumir o conteúdo local em um parágrafo",
    "milestone real da issue",
    "`Size`, `Effort`, `Priority`, `Area`, `Roadmap Item` e `Epic`",
    "Epic lista suas Features",
    "Feature aponta para o Epic pai",
    "verificar o remoto depois da escrita",
    "atualizar o arquivo local com `github_issue.url` e `sync_status: synced`"
  ]) {
    assertIncludes(workMapping, snippet, ".github/leanos/work-mapping.md");
  }

  for (const snippet of [
    "Read-back verification",
    "body sections",
    "milestone",
    "Project fields",
    "relationships",
    "local file patch",
    "github_issue:",
    "sync_status: synced",
    "não deve marcar `synced` antes da verificação remota passar"
  ]) {
    assertIncludes(capabilityContract, snippet, ".github/leanos/capability-contract.md");
  }

  for (const snippet of [
    "epic.md",
    "README.md legado",
    "Size",
    "Effort",
    "github_issue",
    "sync_status"
  ]) {
    assertIncludes(epicsReadme, snippet, `${productOpsRoot}/epics/README.md`);
    assertIncludes(workTaxonomy, snippet, `${productOpsRoot}/knowledge/work-taxonomy.md`);
  }

  for (const snippet of ["size:", "effort:", "priority:", "github_issue:", "sync_status:"]) {
    assertIncludes(epicTemplate, snippet, ".leanos/standard/templates/product/epic-template.md");
    assertIncludes(featureTemplate, snippet, ".leanos/standard/templates/product/feature-template.md");
  }

  for (const snippet of [
    "Effort",
    "Read-back verification",
    "local file patch",
    "github_issue.url",
    "sync_status: synced"
  ]) {
    assertIncludes(devopsGithubManagement, snippet, `${businessOs}/operations/devops/knowledge/github-management.md`);
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
