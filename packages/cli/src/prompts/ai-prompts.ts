import { confirm, isCancel, multiselect, select, text } from "@clack/prompts";
import type { Department, OperatingMode, ProductStage, ProductStatus, ProductType, WorkspaceAnswers } from "../templates/workspace-template.js";

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

const departmentLabels: Record<Department, string> = {
  product: "Product",
  validation: "Validation",
  engineering: "Engineering",
  design: "Design",
  growth: "Growth"
};

const defaultDepartments: Department[] = ["product", "validation", "engineering", "design", "growth"];

export async function runAiPrompts(): Promise<AiPromptResult> {
  const action = await select({
    message: "What do you want to do?",
    options: [
      { value: "create", label: "Create a new LeanOS workspace" },
      { value: "connect", label: "Connect LeanOS to an existing project" },
      { value: "install-agent", label: "Install LeanOS Agent files in this repo" },
      { value: "exit", label: "Exit" }
    ]
  });

  if (isCancel(action)) return { status: "cancelled" };
  if (action === "exit") return { status: "exit" };
  if (action === "connect") return { status: "coming-soon", label: "Connect LeanOS to an existing project" };
  if (action === "install-agent") return { status: "coming-soon", label: "Install LeanOS Agent files in this repo" };

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
    options: toOptions(productStatusLabels)
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

  const departments = await multiselect({
    message: "Active departments",
    options: toOptions(departmentLabels),
    initialValues: defaultDepartments,
    required: true
  });
  if (isCancel(departments)) return { status: "cancelled" };

  const answers: WorkspaceAnswers = {
    companyName: String(companyName).trim(),
    productName: String(productNameInput).trim() || String(companyName).trim(),
    productStatus: productStatus as ProductStatus,
    productType: productType as ProductType,
    description: String(description).trim(),
    targetUser: String(targetUser).trim(),
    stage: stage as ProductStage,
    mode: mode as OperatingMode,
    departments: departments as Department[]
  };

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

function toOptions<TValue extends string>(labels: Record<TValue, string>): Array<{ value: TValue; label: string }> {
  return Object.entries(labels).map(([value, label]) => ({
    value: value as TValue,
    label: label as string
  }));
}

function formatSummary(answers: WorkspaceAnswers): string {
  return [
    "LeanOS workspace summary:",
    "",
    `Company: ${answers.companyName}`,
    `Product: ${answers.productName}`,
    `Type: ${productTypeLabels[answers.productType]}`,
    `Stage: ${stageLabels[answers.stage]}`,
    `Mode: ${modeLabels[answers.mode]}`,
    `Departments: ${answers.departments.map((department) => departmentLabels[department]).join(", ")}`
  ].join("\n");
}
