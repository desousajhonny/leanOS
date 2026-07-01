import { outro } from "@clack/prompts";
import type { WorkspaceAnswers } from "../templates/workspace-template.js";
import type { WorkspaceGenerationResult } from "../generators/workspace-generator.js";
import { bullet, keyValue, stepLabel, ui } from "./theme.js";

const productTypeLabels: Record<string, string> = {
  "b2b-saas": "B2B SaaS",
  "b2c-app": "App B2C",
  "ai-agent-product": "Produto com agente de IA",
  "developer-tool": "Ferramenta para desenvolvedores",
  marketplace: "Marketplace",
  "internal-tool": "Ferramenta interna",
  "api-product": "Produto de API",
  "not-sure": "Ainda não sei"
};

const workspaceModeLabels: Record<string, string> = {
  "new-product-workspace": "Ideia ou produto novo",
  "existing-product-repo": "Projeto existente"
};

const activationModeLabels: Record<string, string> = {
  progressive: "Progressivo",
  "all-at-once": "Avançado: tudo agora"
};

export function printCreatedWorkspaceOutro(answers: WorkspaceAnswers, result: WorkspaceGenerationResult): void {
  const headline =
    result.mode === "missing-only"
      ? "Ambiente LeanOS atualizado"
      : result.mode === "overwrite"
        ? "Ambiente LeanOS regenerado"
        : answers.workspaceMode === "existing-product-repo"
          ? "LeanOS instalado como camada operacional"
          : "Ambiente LeanOS criado";
  const fileModeNote =
    result.mode === "missing-only"
      ? "Alguns arquivos já existiam e foram preservados. O LeanOS criou apenas os arquivos ausentes."
      : result.mode === "overwrite"
        ? "Arquivos conflitantes foram sobrescritos porque você escolheu sobrescrever."
        : "";
  const activationMode = answers.initialActivationMode ?? "progressive";

  const message = [
    ui.success(headline),
    "",
    keyValue("Produto", answers.productName),
    keyValue("Modo", workspaceModeLabels[answers.workspaceMode] ?? answers.workspaceMode),
    keyValue("Tipo", productTypeLabels[answers.productType]),
    keyValue("Setup", activationModeLabels[activationMode] ?? activationMode),
    keyValue("GitHub", answers.prepareGithubManagement ? "Suporte preparado" : "Agora não"),
    "",
    ui.title("Arquivos"),
    keyValue("Escritos", ui.success(String(result.writtenPaths.length))),
    keyValue("Ignorados", result.skippedPaths.length > 0 ? ui.warning(String(result.skippedPaths.length)) : "0"),
    fileModeNote ? ui.warning(fileModeNote) : "",
    "",
    ui.title("Entrypoints"),
    bullet(`${ui.path("AGENT.md")} ${ui.muted("entrada principal do agente")}`),
    bullet(`${ui.path("leanos.yaml")} ${ui.muted("configuração do ambiente")}`),
    bullet(`${ui.path(".leanos/")} ${ui.muted("runtime, contexto, índices e padrões")}`),
    bullet(`${ui.path(".leanos/standard/")} ${ui.muted("templates, checklists e instruções")}`),
    "",
    stepLabel(3, 3, "Próximos passos"),
    "",
    answers.workspaceMode === "existing-product-repo"
      ? "Arquivos do produto existente foram preservados, salvo se você escolheu sobrescrever conflitos. Comece capturando contexto de produto e codebase."
      : "Comece por Strategy antes de criar app/código. O setup inicial não cria código de produto.",
    answers.prepareGithubManagement
      ? `Suporte de GitHub preparado. Peça ao LeanOS Chief para configurar GitHub Projects ou sincronizar Epics/Features quando estiver pronto. Adicione token em ${ui.path(".env.local")} só quando for conectar o GitHub.`
      : `Suporte de GitHub não solicitado agora. ${ui.path(".github/leanos/setup-guide.md")} documenta o setup opcional futuro.`,
    "",
    "Para usar:",
    "1. Abra esta pasta no seu editor ou ambiente de agente",
    "2. Comece por AGENT.md",
    "3. Peça em linguagem natural: Quero iniciar o LeanOS",
    "",
    "A interface principal é linguagem natural.",
    "",
    "Primeiros pedidos úteis:",
    "",
    bullet('"Quero iniciar o LeanOS."'),
    bullet('"Ajude a calibrar essa ideia."'),
    bullet('"Transforme essa ideia em um escopo mínimo de validação."'),
    answers.workspaceMode === "existing-product-repo" ? bullet('"Resuma este produto e codebase existentes."') : bullet('"O que falta antes de construir o MVP?"')
  ].join("\n");

  outro(message);
}
