import { outro } from "@clack/prompts";
import pc from "picocolors";
import type { WorkspaceAnswers } from "../templates/workspace-template.js";
import type { WorkspaceGenerationResult } from "../generators/workspace-generator.js";

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
  outro(`${label} is coming soon. For now, use "Create a new LeanOS workspace".`);
}

export function printCreatedWorkspaceOutro(answers: WorkspaceAnswers, result: WorkspaceGenerationResult): void {
  const headline =
    result.mode === "missing-only"
      ? "LeanOS missing workspace files created successfully."
      : result.mode === "overwrite"
        ? "LeanOS workspace created and existing files overwritten successfully."
        : "LeanOS workspace created successfully.";
  const groupsLabel =
    result.mode === "missing-only"
      ? "Updated / preserved:"
      : result.mode === "overwrite"
        ? "Generated / overwritten:"
        : "Generated:";

  const message = [
    pc.green(headline),
    "",
    `Company: ${answers.companyName}`,
    `Product: ${answers.productName}`,
    `Type: ${productTypeLabels[answers.productType]}`,
    `Stage: ${stageLabels[answers.stage]}`,
    `Mode: ${modeLabels[answers.mode]}`,
    `Departments: ${answers.departments.join(", ")}`,
    "",
    `Files written: ${result.writtenPaths.length}`,
    `Files skipped: ${result.skippedPaths.length}`,
    result.skippedPaths.length > 0 ? "Skipped files already existed and were preserved." : "",
    "",
    groupsLabel,
    ...result.createdGroups.map((group) => `- ${group}`),
    "",
    "VS Code:",
    "",
    "LeanOS Chief custom agent prepared.",
    "",
    "To use LeanOS in VS Code:",
    "1. Open Copilot Chat",
    "2. Select \"LeanOS Chief\"",
    "3. Start with /init leanos",
    "",
    "If VS Code routes /init to its native command, use /leanos-init.",
    "",
    "Next step:",
    "",
    "Open your editor chat and type:",
    "",
    pc.bold("/init leanos"),
    "",
    "Any AI model should start from:",
    "",
    pc.bold("AGENT.md"),
    "",
    "You can also say:",
    "",
    '"Help me define the ICP."',
    '"Turn this idea into an MVP."',
    '"Create a roadmap for the first validation cycle."',
    '"Check if my MVP is coherent."',
    '"Create a new UX research role using LeanOS standards."'
  ].join("\n");

  outro(message);
}
