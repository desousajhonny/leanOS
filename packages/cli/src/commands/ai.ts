import { cancel, isCancel, note, outro, select, spinner } from "@clack/prompts";
import { runAiPrompts } from "../prompts/ai-prompts.js";
import { printBanner } from "../ui/banner.js";
import { printCreatedWorkspaceOutro, printComingSoonOutro } from "../ui/outro.js";
import { ui } from "../ui/theme.js";
import { workspaceExists } from "../utils/paths.js";
import { findWorkspaceConflicts, generateWorkspace, type WorkspaceGenerationMode } from "../generators/workspace-generator.js";

export async function runAiCommand(): Promise<void> {
  printBanner();

  note(
    [
      `This wizard prepares the workspace structure and ${ui.title("LeanOS Chief")}.`,
      `After setup, continue in your editor chat with ${ui.command("/leanos-init")}.`
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

  const validationSpinner = spinner();
  validationSpinner.start("Validating workspace structure...");
  const conflicts = await findWorkspaceConflicts(process.cwd(), promptResult.answers);
  validationSpinner.stop(
    conflicts.length > 0
      ? ui.warning("Existing files detected.")
      : ui.success("Workspace target is ready.")
  );

  if (conflicts.length > 0) {
    const hasLeanOsWorkspace = await workspaceExists(process.cwd());
    const conflictPreview = conflicts.slice(0, 6).map((path) => `- ${ui.path(path)}`).join("\n");
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

  const generationSpinner = spinner();

  try {
    generationSpinner.start(
      generationMode === "missing-only"
        ? "Creating missing LeanOS files..."
        : generationMode === "overwrite"
          ? "Generating LeanOS workspace and overwriting selected conflicts..."
          : "Preparing LeanOS workspace..."
    );
    generationSpinner.message("Generating AGENT.md, command map and LeanOS Chief workspace agent...");
    const result = await generateWorkspace(process.cwd(), promptResult.answers, {
      overwriteExisting,
      mode: generationMode
    });
    generationSpinner.stop(ui.success("LeanOS workspace structure is ready."));
    printCreatedWorkspaceOutro(promptResult.answers, result);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    generationSpinner.stop(ui.error("Workspace generation stopped."), 1);
    console.error(ui.error("Could not create the LeanOS workspace."));
    console.error(ui.muted(message));
    process.exitCode = 1;
  }
}
