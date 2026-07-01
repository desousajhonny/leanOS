import { confirm, isCancel, note, select, text } from "@clack/prompts";
import type { DetectedProject, InitialActivationMode, ProductStatus, ProductType, WorkspaceAnswers, WorkspaceMode } from "../templates/workspace-template.js";
import { getAllSubareas } from "../templates/workspace-template.js";
import { keyValue, stepLabel, ui } from "../ui/theme.js";
import { detectProject, hasExistingProjectSignals } from "../utils/project-detector.js";

type CancelledResult = {
  status: "cancelled";
};

type ExitResult = {
  status: "exit";
};

type CreateWorkspaceResult = {
  status: "create-workspace";
  answers: WorkspaceAnswers;
};

export type AiPromptResult = CancelledResult | ExitResult | CreateWorkspaceResult;

const productTypeLabels: Record<ProductType, string> = {
  "b2b-saas": "B2B SaaS",
  "b2c-app": "App B2C",
  "ai-agent-product": "Produto com agente de IA",
  "developer-tool": "Ferramenta para desenvolvedores",
  marketplace: "Marketplace",
  "internal-tool": "Ferramenta interna",
  "api-product": "Produto de API",
  "not-sure": "Ainda não sei"
};

const workspaceModeLabels: Record<WorkspaceMode, string> = {
  "new-product-workspace": "Ideia ou produto novo",
  "existing-product-repo": "Projeto existente"
};

const activationModeLabels: Record<InitialActivationMode, string> = {
  progressive: "Progressivo (recomendado)",
  "all-at-once": "Avançado: preparar tudo agora"
};

const activationModeHints: Record<InitialActivationMode, string> = {
  progressive: "Cria Strategy agora; Operations e Growth aparecem quando forem necessários.",
  "all-at-once": "Gera Strategy, Operations, Growth e todas as áreas de uma vez."
};

const availableSubareas = getAllSubareas();

export async function runAiPrompts(): Promise<AiPromptResult> {
  const detectedProject = await detectProject(process.cwd());
  const hasExistingSignals = hasExistingProjectSignals(detectedProject);

  const action = await select({
    message: "Como você quer começar?",
    options: [
      { value: "create", label: "Partir de uma ideia ou produto novo", hint: "Cria um ambiente LeanOS antes de app/código." },
      { value: "connect", label: "Conectar a um projeto existente", hint: "Instala o LeanOS como camada operacional neste repositório." },
      { value: "exit", label: "Sair" }
    ]
  });

  if (isCancel(action)) return { status: "cancelled" };
  if (action === "exit") return { status: "exit" };

  const workspaceMode: WorkspaceMode = action === "connect" ? "existing-product-repo" : "new-product-workspace";
  const productStatus: ProductStatus = workspaceMode === "existing-product-repo" ? "existing-product" : "new-product";
  const stage = workspaceMode === "existing-product-repo" ? "existing-product-with-users" : "idea";
  const targetUser = workspaceMode === "existing-product-repo" ? "Usuários atuais do produto" : "A definir com Strategy";

  if (workspaceMode === "new-product-workspace" && hasExistingSignals) {
    note(
      [
        "Esta pasta já parece conter um projeto.",
        detectedProjectSummary(detectedProject),
        "O LeanOS ainda pode criar um ambiente aqui, mas os arquivos existentes serão verificados antes da escrita."
      ].join("\n"),
      "Projeto detectado"
    );
  }

  if (workspaceMode === "existing-product-repo") {
    note(
      [
        hasExistingSignals
          ? "O LeanOS vai instalar uma camada operacional sobre este repositório de produto."
          : "Esta pasta ainda não parece um repositório de produto. O LeanOS ainda pode preparar a camada operacional aqui.",
        detectedProjectSummary(detectedProject),
        "Código de produto, package files e configuração de deploy não serão criados nem alterados por este setup."
      ].join("\n"),
      "Projeto existente"
    );
  }

  note(
    workspaceMode === "existing-product-repo"
      ? "Descreva só o suficiente para o LeanOS começar. O Chief organiza o contexto depois."
      : "Descreva só o suficiente para o LeanOS começar. Strategy refina o resto depois.",
    stepLabel(1, 3, "Contexto inicial")
  );

  const productNameInput = await text({
    message: "Nome do produto",
    validate: required
  });
  if (isCancel(productNameInput)) return { status: "cancelled" };

  const productType = await select({
    message: "Tipo de produto",
    options: toOptions(productTypeLabels)
  });
  if (isCancel(productType)) return { status: "cancelled" };

  const description = await text({
    message: "Descrição curta",
    validate: required
  });
  if (isCancel(description)) return { status: "cancelled" };

  const initialActivationMode = await select({
    message: "Como preparar o ambiente?",
    options: toOptions(activationModeLabels, activationModeHints),
    initialValue: "progressive"
  });
  if (isCancel(initialActivationMode)) return { status: "cancelled" };

  const prepareGithubManagement = await confirm({
    message: "Preparar suporte de GitHub agora?",
    initialValue: workspaceMode === "existing-product-repo" && detectedProject.hasGit
  });
  if (isCancel(prepareGithubManagement)) return { status: "cancelled" };

  const productName = String(productNameInput).trim();
  const answers: WorkspaceAnswers = {
    workspaceMode,
    initialActivationMode: initialActivationMode as InitialActivationMode,
    detectedProject,
    prepareGithubManagement: Boolean(prepareGithubManagement),
    companyName: productName,
    productName,
    productStatus,
    productType: productType as ProductType,
    description: String(description).trim(),
    targetUser,
    stage,
    mode: "founder-plus-ai-agents",
    subareas: availableSubareas
  };

  note(
    [
      `Pasta: ${ui.path(process.cwd())}`,
      `Entrypoints: ${ui.path("AGENT.md")}, ${ui.path("leanos.yaml")}, ${ui.path(".leanos/")}`,
      "Depois do setup, continue no chat/agente de AI pedindo para iniciar ou continuar."
    ].join("\n"),
    stepLabel(2, 3, "Estrutura")
  );

  const shouldCreate = await confirm({
    message: `${formatSummary(answers)}\n\nCriar ambiente?`,
    initialValue: true
  });

  if (isCancel(shouldCreate)) return { status: "cancelled" };
  if (!shouldCreate) return { status: "exit" };

  return {
    status: "create-workspace",
    answers
  };
}

function required(value: string): string | void {
  if (!value.trim()) {
    return "This field is required.";
  }
}

function toOptions<TValue extends string>(labels: Record<TValue, string>, hints?: Partial<Record<TValue, string>>): Array<{ value: TValue; label: string; hint?: string }> {
  return Object.entries(labels).map(([value, label]) => ({
    value: value as TValue,
    label: label as string,
    hint: hints?.[value as TValue]
  }));
}

function formatSummary(answers: WorkspaceAnswers): string {
  const activationMode = answers.initialActivationMode ?? "progressive";

  return [
    ui.title("Resumo do ambiente LeanOS"),
    "",
    keyValue("Modo", workspaceModeLabels[answers.workspaceMode]),
    keyValue("Produto", answers.productName),
    keyValue("Tipo", productTypeLabels[answers.productType]),
    keyValue("Setup", activationModeLabels[activationMode]),
    keyValue("GitHub", answers.prepareGithubManagement ? "Preparar suporte" : "Agora não")
  ].join("\n");
}

function detectedProjectSummary(project: DetectedProject): string {
  const signals = [
    project.hasGit ? ".git" : "",
    project.hasPackageJson ? "package.json" : "",
    project.hasSourceDir ? "src/app/pages" : "",
    project.hasGithubDir ? ".github" : "",
    project.hasVercelConfig ? "Vercel config" : "",
    project.gitRemoteOrigin ? `origin: ${project.gitRemoteOrigin}` : ""
  ].filter(Boolean);

  return signals.length > 0 ? `Detectado: ${signals.join(", ")}` : "Detectado: nenhum sinal de projeto existente.";
}
