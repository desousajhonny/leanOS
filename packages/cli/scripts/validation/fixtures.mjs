import { execFile } from "node:child_process";
import { dirname, resolve } from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

export const scriptDir = dirname(fileURLToPath(import.meta.url));
export const packageRoot = resolve(scriptDir, "..", "..");
export const projectRoot = resolve(packageRoot, "..", "..");
export const clientWorkspaceFixtureDir = resolve(projectRoot, "examples", "client-workspace");
export const clientWorkspaceTreePath = resolve(projectRoot, "examples", "client-workspace-tree.md");
export const execFileAsync = promisify(execFile);

export const allSubareas = [
  "strategy.business",
  "strategy.product",
  "strategy.roadmap",
  "operations.product-ops",
  "operations.design",
  "operations.engineering",
  "operations.devops",
  "operations.security",
  "growth.customer-experience",
  "growth.marketing",
  "growth.finance"
];

export const initialStrategySubareas = [
  "strategy.business",
  "strategy.product",
  "strategy.roadmap"
];

export const answers = {
  workspaceMode: "new-product-workspace",
  detectedProject: {
    hasGit: false,
    hasPackageJson: false,
    hasSourceDir: false,
    hasGithubDir: false,
    hasVercelConfig: false
  },
  prepareGithubManagement: true,
  companyName: "Acme AI",
  productName: "Clinic Assistant AI",
  productStatus: "new-product",
  productType: "b2b-saas",
  description: "An AI receptionist for small clinics.",
  targetUser: "Small clinic owners",
  stage: "idea",
  mode: "solo-founder",
  subareas: allSubareas
};

export const partialAreaAnswers = {
  ...answers,
  subareas: ["strategy.product", "operations.engineering"]
};

export const engineeringOnlyAnswers = {
  ...answers,
  subareas: ["operations.engineering"]
};

export const designOnlyAnswers = {
  ...answers,
  subareas: ["operations.design"]
};

export const growthValidationAnswers = {
  ...answers,
  prepareGithubManagement: false,
  subareas: ["growth.marketing"]
};

export const existingProductRepoAnswers = {
  ...answers,
  workspaceMode: "existing-product-repo",
  productStatus: "existing-product",
  stage: "existing-product-with-users",
  detectedProject: {
    hasGit: true,
    hasPackageJson: true,
    hasSourceDir: true,
    hasGithubDir: true,
    hasVercelConfig: true,
    gitRemoteOrigin: "git@github.com:example-org/example-repo.git"
  }
};
