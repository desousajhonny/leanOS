import { getActiveSubareaKeys } from "../../selectors.js";
import type { AreaDefinition, FileEntry, WorkspaceAnswers } from "../../types.js";
import { createWorkspacePaths } from "../../paths.js";
import { toTitle } from "../../content/shared.js";
import { githubLeanOsReadme, githubSetupGuide, githubCapabilityContract, githubSettingsExampleJson, securityAutomationReadiness, workMappingRules } from "./leanos-docs.js";
import { issueTemplate, epicIssueTemplate, featureIssueTemplate } from "./issue-templates.js";
import { labelsYaml } from "./labels.js";
import { pullRequestTemplate } from "./pull-request.js";
import { envLocal, projectSyncYaml, syncStateYaml } from "./project-sync.js";
import { branchRules, prValidationRules, workspaceGitignore } from "./rules.js";
import { prValidationWorkflow } from "./workflows.js";

export function githubFiles(answers: WorkspaceAnswers, activeAreas: AreaDefinition[]): FileEntry[] {
  const activeKeys = getActiveSubareaKeys(activeAreas);
  const paths = createWorkspacePaths(answers);
  const engineeringActive = activeKeys.has("operations.engineering");
  const devopsActive = activeKeys.has("operations.devops");
  const securityActive = activeKeys.has("operations.security");
  const engineeringNote = engineeringActive
    ? `Route GitHub branch, PR and validation work through \`../../${paths.businessOsRoot}/operations/engineering/AGENT.md\` before changing GitHub workflow files.`
    : "Operations Engineering não está ativo neste workspace. Peça confirmação antes de ativá-lo ou alterar arquivos de workflow do GitHub.";
  const devopsNote = devopsActive
    ? `Route GitHub setup through \`../../${paths.businessOsRoot}/operations/devops/AGENT.md\` before configuring project sync.`
    : "Operations DevOps não está ativo neste workspace. Peça confirmação antes de configurar sync de GitHub Project.";
  const securityNote = securityActive
    ? `Route security automation readiness through \`../../${paths.businessOsRoot}/operations/security/AGENT.md\` before adding scanner workflows or security gates.`
    : "Operations Security não está ativo neste workspace. Peça confirmação antes de adicionar automação de Security ou workflows de scanner.";

  return [
    ...(answers.prepareGithubManagement ? [{ path: ".env.local", content: envLocal() }] : []),
    { path: ".gitignore", content: workspaceGitignore() },
    { path: ".github/copilot-instructions.md", content: "# LeanOS Instructions\n\nComece por `../AGENT.md` e siga a Navigation Chain do LeanOS antes de implementar trabalho de produto.\n" },
    { path: ".github/PULL_REQUEST_TEMPLATE.md", content: pullRequestTemplate() },
    { path: ".github/ISSUE_TEMPLATE/epic.yml", content: epicIssueTemplate() },
    { path: ".github/ISSUE_TEMPLATE/feature.yml", content: featureIssueTemplate() },
    ...["bug", "experiment", "validation", "research", "task"].map((name) => issueTemplate(`${name}.yml`, toTitle(name), `LeanOS ${name} issue.`)),
    { path: ".github/workflows/pr-validation.yml", content: prValidationWorkflow() },
    { path: ".github/leanos/README.md", content: githubLeanOsReadme(devopsNote, engineeringNote, securityNote) },
    { path: ".github/leanos/setup-guide.md", content: githubSetupGuide() },
    { path: ".github/leanos/capability-contract.md", content: githubCapabilityContract() },
    { path: ".github/leanos/github-settings.example.json", content: githubSettingsExampleJson() },
    { path: ".github/leanos/work-mapping.md", content: workMappingRules() },
    { path: ".github/leanos/labels.yaml", content: labelsYaml() },
    { path: ".github/leanos/project-sync.yaml", content: projectSyncYaml(answers) },
    { path: ".github/leanos/sync-state.yaml", content: syncStateYaml() },
    { path: ".github/leanos/branch-rules.md", content: branchRules() },
    { path: ".github/leanos/pr-validation-rules.md", content: prValidationRules() },
    { path: ".github/leanos/security-automation.md", content: securityAutomationReadiness() }
  ];
}
