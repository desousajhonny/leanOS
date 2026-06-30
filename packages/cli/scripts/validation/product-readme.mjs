import assert from "node:assert/strict";
import { createWorkspaceFiles } from "../../dist/templates/workspace-template.js";
import { answers, existingProductRepoAnswers } from "./fixtures.mjs";

export async function validateProductReadmeContract() {
  const files = createWorkspaceFiles({ ...answers, initialActivationMode: "all-at-once" });
  const existingRepoFiles = createWorkspaceFiles({ ...existingProductRepoAnswers, initialActivationMode: "all-at-once" });
  const byPath = new Map(files.map((file) => [file.path, file.content]));
  const existingRepoByPath = new Map(existingRepoFiles.map((file) => [file.path, file.content]));

  const rootReadme = requiredFile(byPath, "README.md");
  const productAgent = requiredFile(byPath, "clinic-assistant-ai-os/strategy/product/AGENT.md");
  const productAreaReadme = requiredFile(byPath, "clinic-assistant-ai-os/strategy/product/README.md");
  const narrativeRole = requiredFile(byPath, "clinic-assistant-ai-os/strategy/product/roles/product-narrative-editor.role.md");
  const productReadmeSkill = requiredFile(byPath, "clinic-assistant-ai-os/strategy/product/skills/write-product-readme/SKILL.md");
  const productTemplatesReadme = requiredFile(byPath, ".leanos/standard/templates/product/README.md");
  const productReadmeTemplate = requiredFile(byPath, ".leanos/standard/templates/product/product-readme-template.md");
  const existingRepoReadme = requiredFile(existingRepoByPath, "README.md");

  for (const snippet of [
    "## O Que É",
    "## Para Quem É",
    "## Problema",
    "## Proposta De Valor",
    "## Status Atual",
    "## O Que Existe Neste Repositório",
    "## Como Rodar Localmente",
    "## Estrutura",
    "## Foco Atual",
    "## LeanOS"
  ]) {
    assertIncludes(rootReadme, snippet, "README.md");
  }

  assertIncludes(rootReadme, "An AI receptionist for small clinics.", "README.md");
  assertIncludes(rootReadme, "Small clinic owners", "README.md");
  assertIncludes(rootReadme, "app ou código de produto ainda não foi criado", "README.md");
  assertIncludes(existingRepoReadme, "LeanOS foi adicionado como camada operacional sobre um produto existente", "README.md for existing product repo");
  assertIncludes(existingRepoReadme, "preserve o README existente", "README.md for existing product repo");

  for (const snippet of [
    "Product Narrative Editor",
    "roles/product-narrative-editor.role.md",
    "write-product-readme",
    "README do produto"
  ]) {
    assertIncludes(productAgent, snippet, "strategy/product/AGENT.md");
    assertIncludes(productAreaReadme, snippet, "strategy/product/README.md");
  }

  for (const snippet of [
    "Product Narrative Editor",
    "README do produto",
    "../skills/write-product-readme/SKILL.md",
    "não invente fatos",
    "preserve README existente"
  ]) {
    assertIncludes(narrativeRole, snippet, "product-narrative-editor.role.md");
  }

  for (const snippet of [
    "Use quando o modelo criar um novo repositório",
    "Use quando um repositório existente tiver README fraco",
    "../../../README.md",
    ".leanos/standard/templates/product/product-readme-template.md",
    "Não sobrescreva README existente sem confirmação explícita",
    "Não transforme o README em landing page",
    "propor diff antes de escrever",
    "Strategy Product -> Product Narrative Editor -> write-product-readme"
  ]) {
    assertIncludes(productReadmeSkill, snippet, "write-product-readme/SKILL.md");
  }

  for (const snippet of [
    "product-readme-template.md",
    "README de produto",
    "não substitua a Navigation Chain"
  ]) {
    assertIncludes(productTemplatesReadme, snippet, ".leanos/standard/templates/product/README.md");
  }

  for (const snippet of [
    "# <Nome Do Produto>",
    "## O Que É",
    "## Para Quem É",
    "## Problema",
    "## Proposta De Valor",
    "## Como Rodar Localmente",
    "## Foco Atual",
    "## LeanOS"
  ]) {
    assertIncludes(productReadmeTemplate, snippet, "product-readme-template.md");
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
