import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { parse } from "yaml";
import { assertExists } from "../assertions.mjs";

export async function assertEngineeringWorkspaceHygiene(rootDir) {
  const areaYaml = parse(await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "area.yaml"), "utf8"));
  const workspaceHygiene = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "knowledge", "workspace-hygiene.md"), "utf8");
  const seniorDeveloper = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "roles", "senior-developer.role.md"), "utf8");
  const temporaryArtifactHygiene = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "skills", "temporary-artifact-hygiene/SKILL.md"), "utf8");
  const engineeringDelivery = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "playbooks", "engineering-delivery.playbook.md"), "utf8");
  const preparePr = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "playbooks", "prepare-pr.playbook.md"), "utf8");
  const prValidation = await readFile(join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "playbooks", "pr-validation.playbook.md"), "utf8");

  await assertExists(join(rootDir, ".leanos", "runtime", "scratch", "README.md"));

  assert(areaYaml.area.source_of_truth.includes("knowledge/workspace-hygiene.md"), "Engineering area.yaml should list workspace hygiene");
  assert(areaYaml.area.skills.includes("temporary-artifact-hygiene"), "Engineering area.yaml should list temporary-artifact-hygiene");
  assert(workspaceHygiene.includes("Temporary Artifact Hygiene"), "Workspace hygiene should define temporary artifact hygiene");
  assert(workspaceHygiene.includes(".leanos/runtime/scratch/"), "Workspace hygiene should route scratch scripts to runtime scratch");
  assert(workspaceHygiene.includes("Temporary Artifact Sweep"), "Workspace hygiene should require a sweep before PR");
  assert(workspaceHygiene.includes("debug.js"), "Workspace hygiene should identify common temporary script patterns");
  assert(workspaceHygiene.includes("Script permanente precisa ter owner, propósito, documentação e comando oficial"), "Workspace hygiene should define permanent script promotion criteria");

  assert(seniorDeveloper.includes("../knowledge/workspace-hygiene.md"), "Senior Developer should read workspace hygiene");
  assert(seniorDeveloper.includes("../skills/temporary-artifact-hygiene/SKILL.md"), "Senior Developer should use temporary artifact hygiene skill");

  assert(temporaryArtifactHygiene.includes("---\nname:"), "Temporary artifact hygiene skill should include YAML frontmatter");
  assert(temporaryArtifactHygiene.includes("description: Use quando"), "Temporary artifact hygiene skill should include trigger-only description");
  assert(temporaryArtifactHygiene.includes("### Etapa 1"), "Temporary artifact hygiene skill should use Step headings inside Process");

  for (const heading of ["## Visão Geral", "## Use Quando", "## Contexto Obrigatório", "## Entradas", "## Processo", "## Verificações", "## Saída"]) {
    assert(temporaryArtifactHygiene.includes(heading), `Temporary artifact hygiene skill should include ${heading}`);
  }

  assert(temporaryArtifactHygiene.includes("Use `.leanos/runtime/scratch/` para scripts temporários"), "Temporary artifact hygiene should route temporary scripts to runtime scratch");
  assert(temporaryArtifactHygiene.includes("Temporary Artifact Sweep"), "Temporary artifact hygiene should require sweep output");
  assert(temporaryArtifactHygiene.includes("debug.js"), "Temporary artifact hygiene should identify common temporary scripts");
  assert(temporaryArtifactHygiene.includes("Não permita scripts temporários em commit ou PR"), "Temporary artifact hygiene should block temporary scripts in PR");

  assert(engineeringDelivery.includes("skills/temporary-artifact-hygiene/SKILL.md"), "Engineering delivery playbook should use temporary artifact hygiene skill");
  assert(engineeringDelivery.includes("Temporary Artifact Sweep"), "Engineering delivery should require temporary artifact sweep");
  assert(preparePr.includes("skills/temporary-artifact-hygiene/SKILL.md"), "Prepare PR playbook should use temporary artifact hygiene skill");
  assert(preparePr.includes("Temporary Artifact Sweep"), "Prepare PR playbook should require temporary artifact sweep");
  assert(prValidation.includes("temporary scripts or scratch files"), "PR validation should scan temporary scripts");
  assert(prValidation.includes("debug-*, temp-*, scratch-*, check-* or verify-*"), "PR validation should block common temporary script names");
}
