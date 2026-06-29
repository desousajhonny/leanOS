import type { AreaFileDefinition } from "../../../../types.js";
import { businessProfile, checklist, decisionLog, folderReadme, productBrief, stateDraft, titledDraft } from "../../../../content/shared.js";
import { devopsCiCdKnowledge } from "./knowledge/devops-ci-cd.js";
import { devopsDeploymentReadinessKnowledge } from "./knowledge/devops-deployment-readiness.js";
import { devopsEnvironmentsKnowledge } from "./knowledge/devops-environments.js";
import { devopsGithubManagementKnowledge } from "./knowledge/devops-github-management.js";
import { devopsObservabilityKnowledge } from "./knowledge/devops-observability.js";
import { devopsReleaseNotesKnowledge } from "./knowledge/devops-release-notes.js";

export const operationsDevopsSourceOfTruth = [
    "knowledge/github-management.md",
    "knowledge/environments.md",
    "knowledge/deployment-readiness.md",
    "knowledge/ci-cd.md",
    "knowledge/observability.md",
    "knowledge/release-notes.md"
  ];

export const operationsDevopsFiles: AreaFileDefinition[] = [
    { path: "knowledge/README.md", content: () => folderReadme("DevOps Knowledge", "Contexto operacional persistente para GitHub, ambientes, CI/CD, prontidão de deploy, observabilidade e notas de release.", "Use ao preparar automação, operações de release, sync de GitHub Project ou prontidão de deploy.", "github-management.md", ["github-management.md", "environments.md", "deployment-readiness.md", "ci-cd.md", "observability.md", "release-notes.md"], ["../AGENT.md", "../../../.github/leanos/", "../playbooks/"], "Mantenha segredos fora destes arquivos. Registre fonte de token e decisões de prontidão, nunca valores de token.") },
    { path: "knowledge/github-management.md", content: () => devopsGithubManagementKnowledge() },
    { path: "knowledge/environments.md", content: () => devopsEnvironmentsKnowledge() },
    { path: "knowledge/deployment-readiness.md", content: () => devopsDeploymentReadinessKnowledge() },
    { path: "knowledge/ci-cd.md", content: () => devopsCiCdKnowledge() },
    { path: "knowledge/observability.md", content: () => devopsObservabilityKnowledge() },
    { path: "knowledge/release-notes.md", content: () => devopsReleaseNotesKnowledge() }
  ];
