import assert from "node:assert/strict";
import { constants } from "node:fs";
import { access, readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { packageRoot } from "./fixtures.mjs";

export async function validateGeneratorScriptIsModular() {
  const runnerPath = join(packageRoot, "scripts", "validate-generator.mjs");
  const moduleDir = join(packageRoot, "scripts", "validation");
  const runnerLineCount = (await readFile(runnerPath, "utf8")).split(/\r?\n/).length;
  const expectedModules = [
    "fixtures.mjs",
    "workspace-files.mjs",
    "client-fixture.mjs",
    "activation.mjs",
    "existing-product-repo.mjs",
    "writer.mjs",
    "assertions.mjs",
    "path-utils.mjs",
    "root-memory.mjs"
  ];

  assert(runnerLineCount <= 80, "Generator validation runner should stay small; split validation logic into scripts/validation modules");

  for (const moduleName of expectedModules) {
    await access(join(moduleDir, moduleName), constants.F_OK);
  }

  const moduleLineLimit = 800;
  const modulePaths = await validationModulePaths(moduleDir);

  for (const modulePath of modulePaths) {
    const moduleLineCount = (await readFile(modulePath, "utf8")).split(/\r?\n/).length;
    assert(moduleLineCount <= moduleLineLimit, `Validation module should stay under ${moduleLineLimit} lines: ${modulePath}`);
  }
}

async function validationModulePaths(rootDir) {
  const entries = await readdir(rootDir, { withFileTypes: true });
  const paths = [];

  for (const entry of entries) {
    const entryPath = join(rootDir, entry.name);

    if (entry.isDirectory()) {
      paths.push(...await validationModulePaths(entryPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".mjs")) {
      paths.push(entryPath);
    }
  }

  return paths;
}

export function ensureTrailingNewline(content) {
  return content.endsWith("\n") ? content : `${content}\n`;
}

export function formatPathDiff(label, paths) {
  if (paths.length === 0) {
    return [];
  }

  const shownPaths = paths.slice(0, 20).map((path) => `${label}: ${path}`);
  const hiddenCount = paths.length - shownPaths.length;

  return hiddenCount > 0 ? [...shownPaths, `${label}: ...and ${hiddenCount} more`] : shownPaths;
}

export function failOutOfDate(details) {
  throw new Error([
    "examples/client-workspace is out of date. Run npm run generate:client-workspace.",
    ...details
  ].join("\n"));
}

export async function assertExists(path) {
  assert.equal(await exists(path), true, `Expected path to exist: ${path}`);
}

async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export function assertSkillFormat(content, expectedName) {
  assert(content.startsWith("---\n"), `${expectedName} skill should start with YAML frontmatter`);
  assert(content.includes(`name: ${expectedName}`), `${expectedName} skill frontmatter should declare name`);
  assert(content.includes("description: Use quando"), `${expectedName} skill frontmatter should declare PT-BR trigger description`);
  assert(content.includes("## Visão Geral"), `${expectedName} skill should use Visão Geral section`);
  assert(content.includes("## Processo"), `${expectedName} skill should include Processo section`);
  assert(content.includes("### Etapa 1"), `${expectedName} skill should use Etapa headings inside Processo`);
}

export function assertRoleFormat(content, expectedName) {
  assert(content.startsWith("---\n"), `${expectedName} role should start with YAML frontmatter`);
  assert(content.includes(`name: ${expectedName}`), `${expectedName} role frontmatter should declare name`);
  assert(content.includes("description: Use quando"), `${expectedName} role frontmatter should declare PT-BR trigger description`);
  assert(content.includes("## Propósito"), `${expectedName} role should include Propósito section`);
  assert(content.includes("## Use Quando"), `${expectedName} role should include Use Quando section`);
  assert(content.includes("## Antes de Agir"), `${expectedName} role should include Antes de Agir section`);
  assert(content.includes("## Skills Obrigatórias"), `${expectedName} role should include Skills Obrigatórias section`);
  assert(content.includes("## Playbooks Relevantes"), `${expectedName} role should include Playbooks Relevantes section`);
  assert(content.includes("## Critérios de Aceite"), `${expectedName} role should include Critérios de Aceite section`);
  assert(content.includes("## Linhas Vermelhas"), `${expectedName} role should include Linhas Vermelhas section`);
}

export function assertPlaybookFormat(content, expectedName) {
  assert(content.startsWith("---\n"), `${expectedName} playbook should start with YAML frontmatter`);
  assert(content.includes(`name: ${expectedName}`), `${expectedName} playbook frontmatter should declare name`);
  assert(content.includes("description: Use quando"), `${expectedName} playbook frontmatter should declare PT-BR trigger description`);
  assert(content.includes("## Propósito"), `${expectedName} playbook should include Propósito section`);
  assert(content.includes("## Use Quando"), `${expectedName} playbook should include Use Quando section`);
  assert(content.includes("## Antes de Agir"), `${expectedName} playbook should include Antes de Agir section`);
  assert(content.includes("## Entradas"), `${expectedName} playbook should include Entradas section`);
  assert(content.includes("## Processo"), `${expectedName} playbook should include Processo section`);
  assert(content.includes("## Condições de Parada"), `${expectedName} playbook should include Condições de Parada section`);
  assert(content.includes("## Critérios de Aceite e Saídas"), `${expectedName} playbook should include Critérios de Aceite e Saídas section`);
  assert(content.includes("## Arquivos para Atualizar"), `${expectedName} playbook should include Arquivos para Atualizar section`);
  assert(content.includes("## Linhas Vermelhas"), `${expectedName} playbook should include Linhas Vermelhas section`);
}
