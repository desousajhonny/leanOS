import { outro } from "@clack/prompts";
import type { WorkspaceAnswers } from "../templates/workspace-template.js";
import type { WorkspaceGenerationResult } from "../generators/workspace-generator.js";
import { bullet, keyValue, stepLabel, ui } from "./theme.js";

const productTypeLabels: Record<string, string> = {
  "b2b-saas": "B2B SaaS",
  "b2c-app": "B2C app",
  "ai-agent-product": "AI agent product",
  "developer-tool": "Developer tool",
  marketplace: "Marketplace",
  "internal-tool": "Internal tool",
  "api-product": "API product",
  "not-sure": "Not sure yet"
};

const stageLabels: Record<string, string> = {
  idea: "Idea only",
  "researching-problem": "Researching the problem",
  "designing-mvp": "Designing MVP",
  "building-mvp": "Building MVP",
  "mvp-launched": "MVP launched",
  "existing-product-with-users": "Existing product with users",
  scaling: "Scaling"
};

const modeLabels: Record<string, string> = {
  "solo-founder": "Solo founder",
  "founder-plus-ai-agents": "Founder + AI agents",
  "small-team": "Small team",
  "existing-startup-team": "Existing startup team",
  "internal-innovation-team": "Internal corporate innovation team"
};

export function printComingSoonOutro(label: string): void {
  outro(`${ui.title(label)} is coming soon. For now, use ${ui.command("Create a new LeanOS workspace")}.`);
}

export function printCreatedWorkspaceOutro(answers: WorkspaceAnswers, result: WorkspaceGenerationResult): void {
  const headline =
    result.mode === "missing-only"
      ? "LeanOS workspace updated"
      : result.mode === "overwrite"
        ? "LeanOS workspace regenerated"
        : "LeanOS workspace created";
  const fileModeNote =
    result.mode === "missing-only"
      ? "Some files already existed and were preserved. LeanOS created only the missing files."
      : result.mode === "overwrite"
        ? "Existing conflicting files were overwritten because you selected overwrite."
        : "";

  const message = [
    ui.success(headline),
    "",
    keyValue("Company", answers.companyName),
    keyValue("Product", answers.productName),
    keyValue("Type", productTypeLabels[answers.productType]),
    keyValue("Stage", stageLabels[answers.stage]),
    keyValue("Mode", modeLabels[answers.mode]),
    keyValue("Areas", answers.subareas.join(", ")),
    "",
    ui.title("Files"),
    keyValue("Written", ui.success(String(result.writtenPaths.length))),
    keyValue("Skipped", result.skippedPaths.length > 0 ? ui.warning(String(result.skippedPaths.length)) : "0"),
    fileModeNote ? ui.warning(fileModeNote) : "",
    "",
    ui.title("Main entrypoints"),
    bullet(`${ui.path("AGENT.md")} ${ui.muted("universal agent entrypoint")}`),
    bullet(`${ui.path("leanos.yaml")} ${ui.muted("workspace configuration")}`),
    bullet(`${ui.path(".leanos/")} ${ui.muted("LeanOS runtime, commands, context and indexes")}`),
    bullet(`${ui.path("ai-standard/")} ${ui.muted("templates, checklists and instructions")}`),
    bullet(`${ui.path(".github/agents/leanos-chief.agent.md")} ${ui.muted("VS Code custom agent")}`),
    bullet(`${ui.path(".github/prompts/start-leanos.prompt.md")} ${ui.muted("VS Code start prompt")}`),
    "",
    ui.title("Workspace areas"),
    bullet(ui.path("strategy/")),
    bullet(ui.path("operations/")),
    bullet(ui.path("growth/")),
    bullet(ui.path(".leanos/commands")),
    bullet(ui.path(".leanos/index")),
    bullet(ui.path(".github")),
    "",
    stepLabel(5, 5, "Next actions"),
    "",
    "To use LeanOS in VS Code:",
    `1. Open this folder in ${ui.title("VS Code")}`,
    "2. Open Copilot Chat",
    `3. Select ${ui.title("\"LeanOS Chief\"")}`,
    `4. Run ${ui.command("/start-leanos")}`,
    "",
    `Legacy workspaces may still use ${ui.command("/leanos-init")}, but ${ui.command("/start-leanos")} is the recommended command.`,
    "",
    "Useful first requests:",
    "",
    bullet('"Help me define the ICP."'),
    bullet('"Turn this idea into an MVP."'),
    bullet('"Create a roadmap for the first validation cycle."'),
    bullet('"Check if my MVP is coherent."'),
    bullet('"Create a new UX research role using LeanOS standards."')
  ].join("\n");

  outro(message);
}
