import assert from "node:assert/strict";
import { createWorkspaceFiles } from "../../dist/templates/workspace-template.js";
import { answers } from "./fixtures.mjs";

const genericTriggerPatterns = [
  /é necessário para o pedido ativo/i,
  /esta sequência de execução corresponder ao pedido ativo/i,
  /esta capacidade for necessária para o pedido ativo/i,
  /<gatilho/i,
  /<sintoma/i,
  /<situação/i
];

export async function validateSemanticTriggerQuality() {
  const files = createWorkspaceFiles({ ...answers, initialActivationMode: "all-at-once" });
  const generatedAssets = files.filter((file) => isGeneratedExecutionAsset(file.path));
  const failures = [];

  for (const file of generatedAssets) {
    const frontmatter = parseFrontmatter(file.content);
    const useWhenItems = parseUseWhenItems(file.content);

    if (!frontmatter.description.startsWith("Use quando ")) {
      failures.push(`${file.path}: description must start with "Use quando"`);
    }

    if (containsGenericTrigger(frontmatter.description)) {
      failures.push(`${file.path}: description is generic or circular`);
    }

    if (descriptionRepeatsAssetName(frontmatter.name, frontmatter.description)) {
      failures.push(`${file.path}: description repeats the asset name instead of concrete activation signals`);
    }

    if (useWhenItems.length < 2) {
      failures.push(`${file.path}: Use Quando must include at least two concrete activation signals`);
    }

    for (const item of useWhenItems) {
      if (containsGenericTrigger(item)) {
        failures.push(`${file.path}: Use Quando item is generic or circular: ${item}`);
      }
    }
  }

  assert.equal(failures.length, 0, `Semantic trigger quality failures:\n${failures.join("\n")}`);
}

function isGeneratedExecutionAsset(path) {
  return (
    (path.includes("/skills/") && path.endsWith("/SKILL.md")) ||
    (path.includes("/playbooks/") && path.endsWith(".playbook.md"))
  );
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  assert(match, "Execution asset should include frontmatter");

  const frontmatter = Object.fromEntries(
    match[1]
      .split(/\r?\n/)
      .map((line) => line.match(/^([^:]+):\s*(.*)$/))
      .filter(Boolean)
      .map((lineMatch) => [lineMatch[1].trim(), lineMatch[2].trim()])
  );

  return {
    name: frontmatter.name ?? "",
    description: frontmatter.description ?? ""
  };
}

function parseUseWhenItems(content) {
  const match = content.match(/## Use Quando\n\n([\s\S]*?)(?:\n## |\n# |$)/);

  if (!match) {
    return [];
  }

  return match[1]
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim())
    .filter(Boolean)
    .filter((line) => !containsPlaceholder(line));
}

function containsGenericTrigger(value) {
  return genericTriggerPatterns.some((pattern) => pattern.test(value));
}

function containsPlaceholder(value) {
  return /<[^>]+>|\.\.\./.test(value);
}

function descriptionRepeatsAssetName(name, description) {
  if (!name) {
    return false;
  }

  const normalizedName = normalizeText(name);
  const normalizedDescription = normalizeText(description.replace(/^use quando\s+/i, ""));

  return normalizedDescription.startsWith(normalizedName);
}

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}
