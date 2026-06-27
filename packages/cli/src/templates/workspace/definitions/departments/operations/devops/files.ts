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
    { path: "knowledge/README.md", content: () => folderReadme("DevOps Knowledge", "Persistent operational context for GitHub, environments, CI/CD, deployment readiness, observability and release notes.", "Use when preparing automation, release operations, GitHub Project sync or deploy readiness.", "github-management.md", ["github-management.md", "environments.md", "deployment-readiness.md", "ci-cd.md", "observability.md", "release-notes.md"], ["../AGENT.md", "../../../.github/leanos/", "../playbooks/"], "Keep secrets out of these files. Record token source and readiness decisions, never token values.") },
    { path: "knowledge/github-management.md", content: () => devopsGithubManagementKnowledge() },
    { path: "knowledge/environments.md", content: () => devopsEnvironmentsKnowledge() },
    { path: "knowledge/deployment-readiness.md", content: () => devopsDeploymentReadinessKnowledge() },
    { path: "knowledge/ci-cd.md", content: () => devopsCiCdKnowledge() },
    { path: "knowledge/observability.md", content: () => devopsObservabilityKnowledge() },
    { path: "knowledge/release-notes.md", content: () => devopsReleaseNotesKnowledge() }
  ];
