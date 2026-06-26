import { confirm, groupMultiselect, isCancel, note, select, text } from "@clack/prompts";
import type { DetectedProject, OperatingMode, ProductStage, ProductStatus, ProductType, Subarea, WorkspaceAnswers, WorkspaceMode } from "../templates/workspace-template.js";
import { getAllSubareas } from "../templates/workspace-template.js";
import { keyValue, stepLabel, ui } from "../ui/theme.js";
import { detectProject, hasExistingProjectSignals } from "../utils/project-detector.js";

type CancelledResult = {
  status: "cancelled";
};

type ExitResult = {
  status: "exit";
};

type ComingSoonResult = {
  status: "coming-soon";
  label: string;
};

type CreateWorkspaceResult = {
  status: "create-workspace";
  answers: WorkspaceAnswers;
};

export type AiPromptResult = CancelledResult | ExitResult | ComingSoonResult | CreateWorkspaceResult;

const productStatusLabels: Record<ProductStatus, string> = {
  "new-product": "New product / idea",
  "existing-product": "Existing product",
  "codebase-without-strategy": "Existing codebase, but no clear product strategy yet"
};

const productTypeLabels: Record<ProductType, string> = {
  "b2b-saas": "B2B SaaS",
  "b2c-app": "B2C app",
  "ai-agent-product": "AI agent product",
  "developer-tool": "Developer tool",
  marketplace: "Marketplace",
  "internal-tool": "Internal tool",
  "api-product": "API product",
  "not-sure": "Not sure yet"
};

const stageLabels: Record<ProductStage, string> = {
  idea: "Idea only",
  "researching-problem": "Researching the problem",
  "designing-mvp": "Designing MVP",
  "building-mvp": "Building MVP",
  "mvp-launched": "MVP launched",
  "existing-product-with-users": "Existing product with users",
  scaling: "Scaling"
};

const modeLabels: Record<OperatingMode, string> = {
  "solo-founder": "Solo founder",
  "founder-plus-ai-agents": "Founder + AI agents",
  "small-team": "Small team",
  "existing-startup-team": "Existing startup team",
  "internal-innovation-team": "Internal corporate innovation team"
};

const subareaLabels: Record<Subarea, string> = {
  "strategy.business": "Business",
  "strategy.product": "Product",
  "strategy.roadmap": "Roadmap",
  "operations.product-ops": "Product Ops",
  "operations.design": "Design",
  "operations.engineering": "Engineering",
  "operations.devops": "DevOps",
  "operations.security": "Security",
  "growth.customer-experience": "Customer Experience",
  "growth.marketing": "Marketing",
  "growth.finance": "Finance"
};

const subareaHints: Record<Subarea, string> = {
  "strategy.business": "brand, mission, principles and operating model",
  "strategy.product": "ICP, problem, value proposition and business model",
  "strategy.roadmap": "cycles, milestones and backlog priority",
  "operations.product-ops": "delivery scope, acceptance criteria and issue readiness",
  "operations.design": "flows, screens, UX states and usability",
  "operations.engineering": "implementation, tests, issues and PRs",
  "operations.devops": "environments, CI, deployment and observability",
  "operations.security": "threat model, data protection and access control",
  "growth.customer-experience": "feedback, support, churn and success moments",
  "growth.marketing": "positioning, landing pages, launch and acquisition",
  "growth.finance": "pricing, unit economics, budget and revenue model"
};

const defaultSubareas: Subarea[] = getAllSubareas();

export async function runAiPrompts(): Promise<AiPromptResult> {
  const detectedProject = await detectProject(process.cwd());
  const hasExistingSignals = hasExistingProjectSignals(detectedProject);

  const action = await select({
    message: "What do you want to do?",
    options: [
      { value: "create", label: "Create a new LeanOS workspace", hint: "For a new idea or product before app/code bootstrap" },
      { value: "connect", label: "Connect LeanOS to an existing project", hint: "Install LeanOS as an operating layer in this repo" },
      { value: "install-agent", label: "Install LeanOS Agent files in this repo" },
      { value: "exit", label: "Exit" }
    ]
  });

  if (isCancel(action)) return { status: "cancelled" };
  if (action === "exit") return { status: "exit" };
  if (action === "install-agent") return { status: "coming-soon", label: "Install LeanOS Agent files in this repo" };

  const workspaceMode: WorkspaceMode = action === "connect" ? "existing-product-repo" : "new-product-workspace";

  if (workspaceMode === "new-product-workspace" && hasExistingSignals) {
    note(
      [
        "This folder already looks like a project.",
        detectedProjectSummary(detectedProject),
        "LeanOS can still create a new workspace here, but existing files will be checked before writing."
      ].join("\n"),
      "Detected project"
    );
  }

  if (workspaceMode === "existing-product-repo") {
    note(
      [
        hasExistingSignals
          ? "LeanOS will install an operating layer over this existing product repository."
          : "This folder does not look like an existing repo yet. LeanOS can still prepare the operating layer here.",
        detectedProjectSummary(detectedProject),
        "Product code, package files and deployment config will not be created or changed by this setup."
      ].join("\n"),
      "Existing product mode"
    );
  }

  note(
    workspaceMode === "existing-product-repo"
      ? "Tell LeanOS what this existing product is. Keep it simple; the agent will organize the current context later."
      : "Tell LeanOS what you are building. Keep it simple; the agent will refine this later.",
    stepLabel(1, 5, "Product profile")
  );

  const companyName = await text({
    message: "Company or startup name",
    validate: required
  });
  if (isCancel(companyName)) return { status: "cancelled" };

  const productNameInput = await text({
    message: "Product name",
    placeholder: String(companyName)
  });
  if (isCancel(productNameInput)) return { status: "cancelled" };

  const productStatus = await select({
    message: "New product or existing product?",
    options: toOptions(productStatusLabels),
    initialValue: workspaceMode === "existing-product-repo" ? "existing-product" : "new-product"
  });
  if (isCancel(productStatus)) return { status: "cancelled" };

  const productType = await select({
    message: "Product type",
    options: toOptions(productTypeLabels)
  });
  if (isCancel(productType)) return { status: "cancelled" };

  const description = await text({
    message: "Short product description",
    validate: required
  });
  if (isCancel(description)) return { status: "cancelled" };

  const targetUser = await text({
    message: "Primary user or customer",
    placeholder: "Not sure yet",
    validate: required
  });
  if (isCancel(targetUser)) return { status: "cancelled" };

  const stage = await select({
    message: "Current stage",
    options: toOptions(stageLabels)
  });
  if (isCancel(stage)) return { status: "cancelled" };

  const mode = await select({
    message: "Operating mode",
    options: toOptions(modeLabels)
  });
  if (isCancel(mode)) return { status: "cancelled" };

  note("Choose the client workspace areas LeanOS should prepare.", stepLabel(2, 5, "Workspace areas"));

  const subareas = await groupMultiselect({
    message: "Which workspace areas should LeanOS prepare?",
    options: {
      Strategy: toOptionsForSubareas(["strategy.business", "strategy.product", "strategy.roadmap"]),
      Operations: toOptionsForSubareas(["operations.product-ops", "operations.design", "operations.engineering", "operations.devops", "operations.security"]),
      Growth: toOptionsForSubareas(["growth.customer-experience", "growth.marketing", "growth.finance"])
    },
    initialValues: defaultSubareas,
    required: true
  });
  if (isCancel(subareas)) return { status: "cancelled" };

  const prepareGithubManagement = await confirm({
    message: "Do you want LeanOS to prepare GitHub project management?",
    initialValue: workspaceMode === "existing-product-repo" && detectedProject.hasGit
  });
  if (isCancel(prepareGithubManagement)) return { status: "cancelled" };

  const answers: WorkspaceAnswers = {
    workspaceMode,
    detectedProject,
    prepareGithubManagement: Boolean(prepareGithubManagement),
    companyName: String(companyName).trim(),
    productName: String(productNameInput).trim() || String(companyName).trim(),
    productStatus: productStatus as ProductStatus,
    productType: productType as ProductType,
    description: String(description).trim(),
    targetUser: String(targetUser).trim(),
    stage: stage as ProductStage,
    mode: mode as OperatingMode,
    subareas: subareas as Subarea[]
  };

  note(
    [
      `Workspace root: ${ui.path(process.cwd())}`,
      `Entrypoints: ${ui.path("AGENT.md")}, ${ui.path("leanos.yaml")}, ${ui.path(".leanos/")}`,
      "Existing files will be checked before anything is written."
    ].join("\n"),
    stepLabel(3, 5, "Workspace structure")
  );

  note(
    [
      `VS Code agent: ${ui.path(".github/agents/leanos-chief.agent.md")}`,
      "Start by asking LeanOS Chief, in natural language, to begin or continue the workspace.",
      "LeanOS Chief only dispatches to the framework files generated in this workspace."
    ].join("\n"),
    stepLabel(4, 5, "LeanOS Chief")
  );

  const shouldCreate = await confirm({
    message: `${formatSummary(answers)}\n\nCreate workspace?`,
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
  return [
    ui.title("LeanOS workspace summary"),
    "",
    keyValue("Workspace mode", answers.workspaceMode),
    keyValue("Company", answers.companyName),
    keyValue("Product", answers.productName),
    keyValue("Type", productTypeLabels[answers.productType]),
    keyValue("Stage", stageLabels[answers.stage]),
    keyValue("Mode", modeLabels[answers.mode]),
    keyValue("GitHub management", answers.prepareGithubManagement ? "Prepared" : "Not now"),
    keyValue("Areas", answers.subareas.map((subarea) => subareaLabels[subarea]).join(", "))
  ].join("\n");
}

function toOptionsForSubareas(subareas: Subarea[]): Array<{ value: Subarea; label: string; hint?: string }> {
  return subareas.map((subarea) => ({
    value: subarea,
    label: subareaLabels[subarea],
    hint: subareaHints[subarea]
  }));
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

  return signals.length > 0 ? `Detected: ${signals.join(", ")}` : "Detected: no existing project signals.";
}
