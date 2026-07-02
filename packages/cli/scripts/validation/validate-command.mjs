import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createWorkspaceFiles } from "../../dist/templates/workspace-template.js";
import { generateWorkspace } from "../../dist/generators/workspace-generator.js";
import { answers, execFileAsync, packageRoot } from "./fixtures.mjs";

export async function validateValidateCommand() {
  await validateCleanWorkspacePasses();
  await validateBrokenWorkspaceFailsWithFindings();
  await validateGeneratedAgentMentionsValidateCommand();
}

async function validateCleanWorkspacePasses() {
  const rootDir = await mkdtemp(join(tmpdir(), "leanos-validate-clean-"));
  await generateWorkspace(rootDir, {
    ...answers,
    initialActivationMode: "all-at-once"
  });

  const result = await execLeanOs(["validate"], rootDir);

  assert.equal(result.exitCode, 0, "lean-os validate should pass for a freshly generated workspace");
  assert(result.stdout.includes("Validacao LeanOS aprovada"), "validate output should report a successful validation");
  assert(result.stdout.includes("Findings: 0"), "validate output should include zero findings");
}

async function validateBrokenWorkspaceFailsWithFindings() {
  const rootDir = await mkdtemp(join(tmpdir(), "leanos-validate-broken-"));
  await generateWorkspace(rootDir, {
    ...answers,
    initialActivationMode: "all-at-once"
  });

  const skillPath = join(rootDir, "clinic-assistant-ai-os", "operations", "engineering", "skills", "follow-code-standards", "SKILL.md");
  const skill = await readFile(skillPath, "utf8");
  await writeFile(
    skillPath,
    skill.replace(/^description: .+$/m, "description: Use quando follow-code-standards é necessário para o pedido ativo"),
    "utf8"
  );
  await mkdir(join(rootDir, ".leanos", "commands"), { recursive: true });
  await writeFile(join(rootDir, "debug-probe.mjs"), "console.log('temporary');\n", "utf8");

  const result = await execLeanOs(["validate"], rootDir);

  assert.equal(result.exitCode, 1, "lean-os validate should fail when blocker/high findings exist");
  assert(result.stdout.includes("Validacao LeanOS falhou"), "validate output should report validation failure");
  assert(result.stdout.includes("semantic-trigger"), "validate output should include semantic trigger findings");
  assert(result.stdout.includes(".leanos/commands"), "validate output should include obsolete command artifacts");
  assert(result.stdout.includes("debug-probe.mjs"), "validate output should include temporary artifact findings");
}

function validateGeneratedAgentMentionsValidateCommand() {
  const files = createWorkspaceFiles(answers);
  const rootAgent = files.find((file) => file.path === "AGENT.md");

  assert(rootAgent, "Generated workspace should include root AGENT.md");
  assert(rootAgent.content.includes("lean-os validate"), "Root AGENT.md should route LeanOS validation requests to lean-os validate");
}

async function execLeanOs(args, cwd) {
  try {
    const result = await execFileAsync("node", [join(packageRoot, "dist", "index.js"), ...args], {
      cwd,
      windowsHide: true
    });

    return {
      exitCode: 0,
      stdout: result.stdout,
      stderr: result.stderr
    };
  } catch (error) {
    if (typeof error === "object" && error && "code" in error && "stdout" in error && "stderr" in error) {
      return {
        exitCode: Number(error.code),
        stdout: String(error.stdout),
        stderr: String(error.stderr)
      };
    }

    throw error;
  }
}
