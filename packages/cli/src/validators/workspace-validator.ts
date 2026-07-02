import { constants } from "node:fs";
import { access, readdir, readFile, stat } from "node:fs/promises";
import { basename, isAbsolute, join, relative, resolve } from "node:path";
import { parse } from "yaml";

export type ValidationSeverity = "blocker" | "high" | "medium" | "low";

export type ValidationFinding = {
  severity: ValidationSeverity;
  code: string;
  path?: string;
  message: string;
  suggestion?: string;
};

export type ValidationSummary = Record<ValidationSeverity, number>;

export type WorkspaceValidationResult = {
  rootDir: string;
  passed: boolean;
  findings: ValidationFinding[];
  summary: ValidationSummary;
};

type LeanOsYaml = Record<string, unknown>;

const failSeverities = new Set<ValidationSeverity>(["blocker", "high"]);
const genericTriggerPatterns = [
  "e necessario para o pedido ativo",
  "esta sequencia de execucao corresponder ao pedido ativo",
  "esta capacidade for necessaria para o pedido ativo",
  "<gatilho",
  "<sintoma",
  "<situacao"
];
const ignoredDirectoryNames = new Set([
  ".git",
  "node_modules",
  "dist",
  "build",
  "coverage",
  ".next",
  ".turbo",
  ".vercel"
]);
const obsoleteGeneratedPaths = [
  ".github/agents",
  ".github/prompts",
  ".leanos/commands",
  ".leanos/vscode",
  ".leanos/runtime/vscode"
];
const temporaryFilePattern = /^(debug|temp|scratch|check|verify)[-_].+\.(cjs|js|mjs|ps1|py|sh|sql|ts|tsx)$/i;

export async function validateLeanOsWorkspace(rootDir: string): Promise<WorkspaceValidationResult> {
  const findings: ValidationFinding[] = [];
  const yamlPath = join(rootDir, "leanos.yaml");

  if (!(await pathExists(yamlPath))) {
    findings.push({
      severity: "blocker",
      code: "workspace-missing",
      path: "leanos.yaml",
      message: "leanos.yaml nao foi encontrado.",
      suggestion: "Rode este comando na raiz de um workspace LeanOS."
    });
    return buildResult(rootDir, findings);
  }

  const yaml = await readLeanOsYaml(rootDir, findings);

  if (!yaml) {
    return buildResult(rootDir, findings);
  }

  const paths = workspacePaths(yaml);

  await validateCorePaths(rootDir, paths, findings);
  await validateActiveAreas(rootDir, yaml, paths, findings);
  await validateRuntimeIndexPaths(rootDir, paths.runtime, findings);
  await validateObsoleteArtifacts(rootDir, findings);
  await validateExecutionAssetSemantics(rootDir, paths.businessOs, findings);
  await validateTemporaryArtifacts(rootDir, paths.runtime, findings);

  return buildResult(rootDir, findings);
}

function buildResult(rootDir: string, findings: ValidationFinding[]): WorkspaceValidationResult {
  const summary: ValidationSummary = {
    blocker: 0,
    high: 0,
    medium: 0,
    low: 0
  };

  for (const finding of findings) {
    summary[finding.severity] += 1;
  }

  return {
    rootDir,
    findings: findings.sort(compareFindings),
    summary,
    passed: !findings.some((finding) => failSeverities.has(finding.severity))
  };
}

function compareFindings(left: ValidationFinding, right: ValidationFinding): number {
  const severityOrder: Record<ValidationSeverity, number> = {
    blocker: 0,
    high: 1,
    medium: 2,
    low: 3
  };

  return severityOrder[left.severity] - severityOrder[right.severity] || left.code.localeCompare(right.code) || (left.path ?? "").localeCompare(right.path ?? "");
}

async function readLeanOsYaml(rootDir: string, findings: ValidationFinding[]): Promise<LeanOsYaml | null> {
  try {
    const yaml = parse(await readFile(join(rootDir, "leanos.yaml"), "utf8"));

    if (!yaml || typeof yaml !== "object" || Array.isArray(yaml)) {
      findings.push({
        severity: "blocker",
        code: "invalid-leanos-yaml",
        path: "leanos.yaml",
        message: "leanos.yaml nao contem um documento YAML valido.",
        suggestion: "Regenere ou corrija o arquivo antes de validar a estrutura."
      });
      return null;
    }

    return yaml as LeanOsYaml;
  } catch (error) {
    findings.push({
      severity: "blocker",
      code: "invalid-leanos-yaml",
      path: "leanos.yaml",
      message: `leanos.yaml nao pode ser lido ou parseado: ${errorMessage(error)}`,
      suggestion: "Corrija a sintaxe do YAML antes de continuar."
    });
    return null;
  }
}

function workspacePaths(yaml: LeanOsYaml): { businessOs: string; runtime: string; standard: string } {
  const paths = asRecord(yaml.paths);

  return {
    businessOs: stringValue(paths.business_os, "business-os"),
    runtime: stringValue(paths.runtime, ".leanos/runtime"),
    standard: stringValue(paths.standard_library, ".leanos/standard")
  };
}

async function validateCorePaths(rootDir: string, paths: { businessOs: string; runtime: string; standard: string }, findings: ValidationFinding[]): Promise<void> {
  for (const requiredPath of [
    "AGENT.md",
    "leanos.yaml",
    paths.businessOs,
    `${paths.runtime}/index/intent-map.yaml`,
    `${paths.runtime}/index/routing-map.yaml`,
    `${paths.standard}/README.md`
  ]) {
    if (!(await pathExists(join(rootDir, requiredPath)))) {
      findings.push({
        severity: "high",
        code: "missing-core-path",
        path: requiredPath,
        message: "Path essencial do LeanOS nao encontrado.",
        suggestion: "Rode `lean-os update --dry-run` para verificar a migracao ou recupere o arquivo esperado."
      });
    }
  }
}

async function validateActiveAreas(rootDir: string, yaml: LeanOsYaml, paths: { businessOs: string }, findings: ValidationFinding[]): Promise<void> {
  const subareas = asRecord(yaml.subareas);
  const activation = asRecord(yaml.activation);
  const activeAreaEntries = Array.isArray(subareas.active) ? subareas.active : [];
  const activeAreaPaths = new Map<string, string>();

  for (const entry of activeAreaEntries) {
    const record = asRecord(entry);
    const key = typeof record.key === "string" ? record.key : "";
    const path = typeof record.path === "string" ? record.path : "";

    if (key && path) {
      activeAreaPaths.set(key, path);
    }
  }

  const activeAreas = Array.isArray(activation.active_areas) ? activation.active_areas.filter((value): value is string => typeof value === "string") : [];

  for (const area of activeAreas) {
    const areaPath = activeAreaPaths.get(area) ?? inferAreaPath(paths.businessOs, area);

    if (!(await pathExists(join(rootDir, areaPath)))) {
      findings.push({
        severity: "high",
        code: "active-area-missing",
        path: areaPath,
        message: `Area ativa ausente: ${area}.`,
        suggestion: "Ative novamente a area ou rode `lean-os update --dry-run` para conferir o layout."
      });
    }
  }
}

function inferAreaPath(businessOsRoot: string, area: string): string {
  const [department, subarea] = area.split(".");

  if (!department || !subarea) {
    return join(businessOsRoot, area).split("\\").join("/");
  }

  return `${businessOsRoot}/${department}/${subarea}`;
}

async function validateRuntimeIndexPaths(rootDir: string, runtimeRoot: string, findings: ValidationFinding[]): Promise<void> {
  const indexRoot = join(rootDir, runtimeRoot, "index");

  if (!(await pathExists(indexRoot))) {
    findings.push({
      severity: "high",
      code: "missing-runtime-index",
      path: `${runtimeRoot}/index`,
      message: "Indice runtime do LeanOS nao encontrado.",
      suggestion: "Rode `lean-os update --dry-run` para verificar a estrutura atual."
    });
    return;
  }

  const entries = await safeReaddir(indexRoot);

  for (const entry of entries.filter((file) => file.endsWith(".yaml") || file.endsWith(".yml"))) {
    const relativeIndexPath = `${runtimeRoot}/index/${entry}`;
    let document: unknown;

    try {
      document = parse(await readFile(join(indexRoot, entry), "utf8"));
    } catch (error) {
      findings.push({
        severity: "high",
        code: "invalid-runtime-index",
        path: relativeIndexPath,
        message: `Arquivo de indice nao pode ser parseado: ${errorMessage(error)}`,
        suggestion: "Corrija o YAML do indice antes de confiar no roteamento."
      });
      continue;
    }

    const indexedPaths: string[] = [];
    collectIndexPaths(document, indexedPaths);

    for (const indexedPath of indexedPaths) {
      if (indexedPath.includes("<") || indexedPath.includes(">")) {
        continue;
      }

      const resolvedPath = resolve(indexRoot, indexedPath);

      if (!isPathInside(rootDir, resolvedPath)) {
        findings.push({
          severity: "high",
          code: "index-path-outside-workspace",
          path: `${relativeIndexPath} -> ${indexedPath}`,
          message: "Indice aponta para fora do workspace.",
          suggestion: "Corrija o path ou regenere os indices LeanOS."
        });
        continue;
      }

      if (!(await pathExists(resolvedPath))) {
        findings.push({
          severity: "high",
          code: "broken-index-path",
          path: `${relativeIndexPath} -> ${indexedPath}`,
          message: "Indice runtime aponta para um path inexistente.",
          suggestion: "Rode `lean-os update` ou corrija o asset referenciado."
        });
      }
    }
  }
}

function collectIndexPaths(value: unknown, paths: string[]): void {
  if (Array.isArray(value)) {
    for (const item of value) collectIndexPaths(item, paths);
    return;
  }

  if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      if (key === "path" && typeof child === "string" && child.startsWith("../")) {
        paths.push(child);
        continue;
      }

      collectIndexPaths(child, paths);
    }
    return;
  }

  if (typeof value === "string" && value.startsWith("../")) {
    paths.push(value);
  }
}

async function validateObsoleteArtifacts(rootDir: string, findings: ValidationFinding[]): Promise<void> {
  for (const obsoletePath of obsoleteGeneratedPaths) {
    if (await pathExists(join(rootDir, obsoletePath))) {
      findings.push({
        severity: "high",
        code: "obsolete-generated-artifact",
        path: obsoletePath,
        message: "Artefato legado gerado por integracao antiga foi encontrado.",
        suggestion: "Rode `lean-os update` para remover artefatos legados conhecidos."
      });
    }
  }
}

async function validateExecutionAssetSemantics(rootDir: string, businessOsRoot: string, findings: ValidationFinding[]): Promise<void> {
  const businessOsPath = join(rootDir, businessOsRoot);

  if (!(await pathExists(businessOsPath))) {
    return;
  }

  const files = await listFiles(businessOsPath);

  for (const filePath of files) {
    const relativeToRoot = relativePath(rootDir, filePath);

    if (!isExecutionAssetPath(relativeToRoot)) {
      continue;
    }

    await validateExecutionAsset(rootDir, relativeToRoot, findings);
  }
}

async function validateExecutionAsset(rootDir: string, relativeFilePath: string, findings: ValidationFinding[]): Promise<void> {
  const content = await readFile(join(rootDir, relativeFilePath), "utf8");
  const frontmatter = parseFrontmatter(content, relativeFilePath, findings);
  const useWhenItems = parseUseWhenItems(content);

  if (!frontmatter) {
    findings.push({
      severity: "high",
      code: "execution-asset-frontmatter",
      path: relativeFilePath,
      message: "Skill ou playbook sem frontmatter YAML.",
      suggestion: "Use o template LeanOS correspondente para recriar o asset."
    });
    return;
  }

  if (!frontmatter.description.startsWith("Use quando ")) {
    findings.push({
      severity: "high",
      code: "semantic-trigger",
      path: relativeFilePath,
      message: "Description deve comecar com `Use quando`.",
      suggestion: "Descreva sinais concretos de ativacao, nao o nome do asset."
    });
  }

  if (containsGenericTrigger(frontmatter.description) || descriptionRepeatsAssetName(frontmatter.name, frontmatter.description)) {
    findings.push({
      severity: "blocker",
      code: "semantic-trigger",
      path: relativeFilePath,
      message: "Description circular ou generica encontrada.",
      suggestion: "Inclua 2 ou mais sinais concretos como artefato, risco, estado de prontidao, sintoma ou handoff."
    });
  }

  if (useWhenItems.length < 2) {
    findings.push({
      severity: "high",
      code: "semantic-trigger",
      path: relativeFilePath,
      message: "`## Use Quando` precisa ter 2 ou mais sinais concretos.",
      suggestion: "Adicione gatilhos especificos da classe de trabalho."
    });
  }

  for (const item of useWhenItems) {
    if (containsGenericTrigger(item)) {
      findings.push({
        severity: "blocker",
        code: "semantic-trigger",
        path: relativeFilePath,
        message: `Use Quando circular ou generico: ${item}`,
        suggestion: "Substitua por sinais concretos de ativacao."
      });
    }
  }
}

function parseFrontmatter(content: string, relativeFilePath: string, findings: ValidationFinding[]): { name: string; description: string } | null {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);

  if (!match) {
    return null;
  }

  let frontmatter: Record<string, unknown> | null;

  try {
    frontmatter = parse(match[1]) as Record<string, unknown> | null;
  } catch (error) {
    findings.push({
      severity: "high",
      code: "execution-asset-frontmatter",
      path: relativeFilePath,
      message: `Frontmatter YAML invalido: ${errorMessage(error)}`,
      suggestion: "Corrija o YAML do frontmatter antes de confiar na ativacao do asset."
    });
    return null;
  }

  return {
    name: typeof frontmatter?.name === "string" ? frontmatter.name : "",
    description: typeof frontmatter?.description === "string" ? frontmatter.description : ""
  };
}

function parseUseWhenItems(content: string): string[] {
  const match = content.match(/## Use Quando\r?\n\r?\n([\s\S]*?)(?:\r?\n## |\r?\n# |$)/);

  if (!match) {
    return [];
  }

  return match[1]
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim())
    .filter(Boolean)
    .filter((line) => !/<[^>]+>|\.\.\./.test(line));
}

function containsGenericTrigger(value: string): boolean {
  const normalizedValue = normalizeText(value);
  return genericTriggerPatterns.some((pattern) => normalizedValue.includes(pattern));
}

function descriptionRepeatsAssetName(name: string, description: string): boolean {
  if (!name) {
    return false;
  }

  const normalizedName = normalizeText(name);
  const normalizedDescription = normalizeText(description).replace(/^use quando\s+/, "");

  return normalizedDescription.startsWith(normalizedName);
}

async function validateTemporaryArtifacts(rootDir: string, runtimeRoot: string, findings: ValidationFinding[]): Promise<void> {
  const files = await listFiles(rootDir);
  const scratchRoot = normalizePath(`${runtimeRoot}/scratch`);

  for (const filePath of files) {
    const relativeFilePath = relativePath(rootDir, filePath);
    const normalized = normalizePath(relativeFilePath);

    if (normalized.startsWith(`${scratchRoot}/`)) {
      continue;
    }

    if (temporaryFilePattern.test(basename(relativeFilePath))) {
      findings.push({
        severity: "medium",
        code: "temporary-artifact",
        path: relativeFilePath,
        message: "Arquivo com padrao temporario fora de `.leanos/runtime/scratch/`.",
        suggestion: "Remova o arquivo, mova para scratch ou transforme em script permanente com owner, proposito, comando e documentacao."
      });
    }
  }
}

async function listFiles(rootDir: string): Promise<string[]> {
  const rootStats = await stat(rootDir);

  if (!rootStats.isDirectory()) {
    return [];
  }

  const entries = await readdir(rootDir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (ignoredDirectoryNames.has(entry.name)) {
        continue;
      }

      files.push(...await listFiles(join(rootDir, entry.name)));
      continue;
    }

    if (entry.isFile()) {
      files.push(join(rootDir, entry.name));
    }
  }

  return files;
}

function isExecutionAssetPath(path: string): boolean {
  const normalizedPath = normalizePath(path);
  return (
    (normalizedPath.includes("/skills/") && normalizedPath.endsWith("/SKILL.md")) ||
    (normalizedPath.includes("/playbooks/") && normalizedPath.endsWith(".playbook.md"))
  );
}

async function safeReaddir(path: string): Promise<string[]> {
  try {
    return await readdir(path);
  } catch {
    return [];
  }
}

function relativePath(from: string, to: string): string {
  return relative(from, to).split("\\").join("/");
}

function normalizePath(path: string): string {
  return path.split("\\").join("/");
}

function isPathInside(parentPath: string, childPath: string): boolean {
  const childRelativePath = relative(parentPath, childPath);
  return childRelativePath === "" || (!childRelativePath.startsWith("..") && !isAbsolute(childRelativePath));
}

function asRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, unknown>;
}

function stringValue(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9<>]+/g, " ")
    .trim();
}
