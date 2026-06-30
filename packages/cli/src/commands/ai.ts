import { cancel, isCancel, note, outro, select, spinner } from "@clack/prompts";
import { runAiPrompts } from "../prompts/ai-prompts.js";
import { printBanner } from "../ui/banner.js";
import { printCreatedWorkspaceOutro } from "../ui/outro.js";
import { ui } from "../ui/theme.js";
import { workspaceExists } from "../utils/paths.js";
import { findWorkspaceConflicts, generateWorkspace, type WorkspaceGenerationMode } from "../generators/workspace-generator.js";

export async function runAiCommand(): Promise<void> {
  printBanner();

  note(
    [
      `Este wizard prepara a estrutura do ambiente e o ${ui.title("LeanOS Chief")}.`,
      "Depois do setup, continue no chat do editor pedindo ao LeanOS Chief para iniciar ou continuar em linguagem natural."
    ].join("\n"),
    "Bem-vindo"
  );

  const promptResult = await runAiPrompts();

  if (promptResult.status === "cancelled") {
    cancel("Setup do LeanOS cancelado.");
    return;
  }

  if (promptResult.status === "exit") {
    outro("Nenhum ambiente foi criado. Volte quando estiver pronto.");
    return;
  }

  let overwriteExisting = true;
  let generationMode: WorkspaceGenerationMode = "create";

  const validationSpinner = spinner();
  validationSpinner.start("Validando estrutura do ambiente...");
  const conflicts = await findWorkspaceConflicts(process.cwd(), promptResult.answers);
  validationSpinner.stop(
    conflicts.length > 0
      ? ui.warning("Arquivos existentes detectados.")
      : ui.success("Pasta de destino pronta.")
  );

  if (conflicts.length > 0) {
    const hasLeanOsWorkspace = await workspaceExists(process.cwd());
    const conflictPreview = conflicts.slice(0, 6).map((path) => `- ${ui.path(path)}`).join("\n");
    const remainingCount = conflicts.length - 6;
    const message = [
      hasLeanOsWorkspace
        ? "Já existe um ambiente LeanOS neste diretório. O que você quer fazer?"
        : "O LeanOS criaria arquivos que já existem neste diretório. O que você quer fazer?",
      "",
      "Conflitos:",
      conflictPreview,
      remainingCount > 0 ? `- ...e mais ${remainingCount}` : ""
    ]
      .filter(Boolean)
      .join("\n");

    const conflictAction = await select({
      message,
      options: [
        { value: "cancel", label: "Cancelar" },
        { value: "missing", label: "Criar apenas arquivos ausentes" },
        { value: "overwrite", label: "Sobrescrever arquivos existentes" }
      ],
      initialValue: promptResult.answers.workspaceMode === "existing-product-repo" ? "missing" : "cancel"
    });

    if (isCancel(conflictAction)) {
      cancel("Setup do LeanOS cancelado.");
      return;
    }

    if (conflictAction === "cancel") {
      outro("Nenhum arquivo foi alterado. Os arquivos existentes foram preservados.");
      return;
    }

    overwriteExisting = conflictAction === "overwrite";
    generationMode = conflictAction === "overwrite" ? "overwrite" : "missing-only";
  }

  const generationSpinner = spinner();

  try {
    generationSpinner.start(
      generationMode === "missing-only"
        ? "Criando arquivos LeanOS ausentes..."
        : generationMode === "overwrite"
          ? "Gerando workspace LeanOS e sobrescrevendo conflitos selecionados..."
          : "Preparando ambiente LeanOS..."
    );
    generationSpinner.message("Gerando AGENT.md, contexto de roteamento e agente LeanOS Chief...");
    const result = await generateWorkspace(process.cwd(), promptResult.answers, {
      overwriteExisting,
      mode: generationMode
    });
    generationSpinner.stop(ui.success("Estrutura do ambiente LeanOS pronta."));
    printCreatedWorkspaceOutro(promptResult.answers, result);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    generationSpinner.stop(ui.error("Geração do ambiente interrompida."), 1);
    console.error(ui.error("Não foi possível criar o ambiente LeanOS."));
    console.error(ui.muted(message));
    process.exitCode = 1;
  }
}
