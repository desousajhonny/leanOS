import type { FileEntry } from "../../generators/file-writer.js";

export type { FileEntry };

export type ProductStatus = "new-product" | "existing-product" | "codebase-without-strategy";
export type ProductType =
  | "b2b-saas"
  | "b2c-app"
  | "ai-agent-product"
  | "developer-tool"
  | "marketplace"
  | "internal-tool"
  | "api-product"
  | "not-sure";
export type ProductStage =
  | "idea"
  | "researching-problem"
  | "designing-mvp"
  | "building-mvp"
  | "mvp-launched"
  | "existing-product-with-users"
  | "scaling";
export type OperatingMode =
  | "solo-founder"
  | "founder-plus-ai-agents"
  | "small-team"
  | "existing-startup-team"
  | "internal-innovation-team";
export type RootDepartment = "strategy" | "operations" | "growth";
export type Department = RootDepartment;
export type WorkspaceMode = "new-product-workspace" | "existing-product-repo";
export type DetectedProject = {
  hasGit: boolean;
  hasPackageJson: boolean;
  hasSourceDir: boolean;
  hasGithubDir: boolean;
  hasVercelConfig: boolean;
  gitRemoteOrigin?: string;
};
export type Subarea =
  | "strategy.business"
  | "strategy.product"
  | "strategy.roadmap"
  | "strategy.validation"
  | "operations.product-ops"
  | "operations.design"
  | "operations.engineering"
  | "operations.devops"
  | "operations.security"
  | "growth.customer-experience"
  | "growth.marketing"
  | "growth.finance";

export type WorkspaceAnswers = {
  workspaceMode: WorkspaceMode;
  detectedProject?: DetectedProject;
  prepareGithubManagement: boolean;
  companyName: string;
  productName: string;
  productStatus: ProductStatus;
  productType: ProductType;
  description: string;
  targetUser: string;
  stage: ProductStage;
  mode: OperatingMode;
  subareas: Subarea[];
};

export type RootDepartmentDefinition = {
  key: RootDepartment;
  name: string;
  purpose: string;
  requestTypes: string;
  areas: AreaDefinition[];
  workflows: DepartmentWorkflowDefinition[];
};

export type AreaDefinition = {
  key: Subarea;
  root: RootDepartment;
  slug: string;
  name: string;
  path: string;
  lead?: AreaLeadDefinition;
  routingKey: string;
  requestTypes: string;
  purpose: string;
  whenToUse: string[];
  operatingRules?: string[];
  redLines?: string[];
  sourceOfTruth: string[];
  files: AreaFileDefinition[];
  roles: RoleDefinition[];
  skills: SkillDefinition[];
  playbooks: PlaybookDefinition[];
  commonPaths: string[];
};

export type AreaLeadDefinition = {
  title: string;
  purpose: string;
};

export type AreaFileDefinition = {
  path: string;
  content: (answers: WorkspaceAnswers) => string;
};

export type RoleDefinition = {
  slug: string;
  title: string;
  purpose: string;
  useWhen: string[];
  beforeActing: string[];
  skills: string[];
  playbooks: string[];
  outputs?: string[];
  redLines?: string[];
};

export type SkillDefinition = {
  slug: string;
  title: string;
  purpose: string;
  useWhen?: string[];
  requiredContext?: string[];
  inputs?: string[];
  process?: string[];
  checks?: string[];
  outputs?: string[];
  filesToUpdate?: string[];
  redLines?: string[];
};

export type PlaybookDefinition = {
  slug: string;
  title: string;
  purpose: string;
  useWhen?: string[];
  beforeActing?: string[];
  inputs?: string[];
  steps: string[];
  guidedConversation?: string[];
  gates?: string[];
  securityGate?: string[];
  outputs?: string[];
  filesToUpdate?: string[];
  stopConditions?: string[];
};

export type WorkflowDefinition = {
  slug: string;
  purpose: string;
  requiredSubareas: Subarea[];
  steps: string[];
};

export type DepartmentWorkflowDefinition = {
  slug: string;
  purpose: string;
  requiredAreas: string[];
  founderTriggers?: string[];
  owner?: {
    department: string;
    primaryArea?: string;
    supportingAreas?: string[];
    conditionalAreas?: string[];
  };
  loadFirst?: string[];
  navigationRoute?: string[];
  steps: string[];
  conditionalAreas?: Array<{
    area: string;
    when: string;
  }>;
  confirmationGates?: string[];
  allowedUpdates?: string[];
  forbiddenUpdates?: string[];
  externalCapabilities?: string[];
  stopConditions?: string[];
  expectedOutput?: string[];
  continuationBridge?: {
    immediate: string;
    laterTriggers: string[];
    nextRoute: string;
    rules?: string[];
  };
};

export type CommandDefinition = {
  slug: string;
  purpose: string;
  area?: Subarea;
  assetCreation?: boolean;
};
