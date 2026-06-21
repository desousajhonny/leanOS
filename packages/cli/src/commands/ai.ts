import { cancel, isCancel, note, outro, select } from "@clack/prompts";
import pc from "picocolors";
import { runAiPrompts } from "../prompts/ai-prompts.js";
import { printBanner } from "../ui/banner.js";
import { printCreatedWorkspaceOutro, printComingSoonOutro } from "../ui/outro.js";
import { workspaceExists } from "../utils/paths.js";
import { findWorkspaceConflicts, generateWorkspace, type WorkspaceGenerationMode } from "../generators/workspace-generator.js";

export async function runAiCommand(): Promise<void> {
  printBanner();

  note(
    [
      "LeanOS will create an agent-native startup workspace for your AI-first product.",
      "",
      "The CLI only collects the basics.",
      "Your LeanOS Agent will continue the strategy, MVP, roadmap and execution workflow inside your editor chat."
    ].join("\n"),
    "Welcome"
  );

  const promptResult = await runAiPrompts();

  if (promptResult.status === "cancelled") {
    cancel("LeanOS setup cancelled.");
    return;
  }

  if (promptResult.status === "exit") {
    outro("No workspace created. Come back when you are ready.");
    return;
  }

  if (promptResult.status === "coming-soon") {
    printComingSoonOutro(promptResult.label);
    return;
  }

  let overwriteExisting = true;
  let generationMode: WorkspaceGenerationMode = "create";

  const conflicts = await findWorkspaceConflicts(process.cwd(), promptResult.answers);

  if (conflicts.length > 0) {
    const hasLeanOsWorkspace = await workspaceExists(process.cwd());
    const conflictPreview = conflicts.slice(0, 6).map((path) => `- ${path}`).join("\n");
    const remainingCount = conflicts.length - 6;
    const message = [
      hasLeanOsWorkspace
        ? "A LeanOS workspace already exists in this directory. What do you want to do?"
        : "LeanOS would create files that already exist in this directory. What do you want to do?",
      "",
      "Conflicts:",
      conflictPreview,
      remainingCount > 0 ? `- ...and ${remainingCount} more` : ""
    ]
      .filter(Boolean)
      .join("\n");

    const conflictAction = await select({
      message,
      options: [
        { value: "cancel", label: "Cancel" },
        { value: "missing", label: "Create only missing files" },
        { value: "overwrite", label: "Overwrite existing files" }
      ],
      initialValue: "cancel"
    });

    if (isCancel(conflictAction)) {
      cancel("LeanOS setup cancelled.");
      return;
    }

    if (conflictAction === "cancel") {
      outro("No files changed. Existing files were left untouched.");
      return;
    }

    overwriteExisting = conflictAction === "overwrite";
    generationMode = conflictAction === "overwrite" ? "overwrite" : "missing-only";
  }

  try {
    const result = await generateWorkspace(process.cwd(), promptResult.answers, {
      overwriteExisting,
      mode: generationMode
    });
    printCreatedWorkspaceOutro(promptResult.answers, result);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(pc.red("Could not create the LeanOS workspace."));
    console.error(pc.dim(message));
    process.exitCode = 1;
  }
}
