import type { AreaFileDefinition } from "../../../../types.js";
import { businessProfile, checklist, decisionLog, folderReadme, productBrief, stateDraft, titledDraft } from "../../../../content/shared.js";
import { securityAccessControlKnowledge } from "./knowledge/security-access-control.js";
import { securityAutomationKnowledge } from "./knowledge/security-automation.js";
import { securityBaselineKnowledge } from "./knowledge/security-baseline.js";
import { securityDatabaseSecurityKnowledge } from "./knowledge/security-database-security.js";
import { securityDataProtectionKnowledge } from "./knowledge/security-data-protection.js";
import { securityIncidentResponseKnowledge } from "./knowledge/security-incident-response.js";
import { securityInfraHardeningKnowledge } from "./knowledge/security-infra-hardening.js";
import { securityKnowledge } from "./knowledge/security-knowledge-template.js";
import { securitySecretsManagementKnowledge } from "./knowledge/security-secrets-management.js";
import { securitySecureCodingKnowledge } from "./knowledge/security-secure-coding.js";
import { securityThreatModelKnowledge } from "./knowledge/security-threat-model.js";

export const operationsSecuritySourceOfTruth = [
    "knowledge/security-baseline.md",
    "knowledge/threat-model.md",
    "knowledge/access-control.md",
    "knowledge/data-protection.md",
    "knowledge/database-security.md",
    "knowledge/secrets-management.md",
    "knowledge/infra-hardening.md",
    "knowledge/secure-coding.md",
    "knowledge/incident-response.md",
    "knowledge/security-automation.md"
  ];

export const operationsSecurityFiles: AreaFileDefinition[] = [
    { path: "knowledge/README.md", content: () => folderReadme("Security Knowledge", "Security baseline, risk context and quality gates for MVP-stage products.", "Use when reviewing implementation, PR, deploy, API, database, secrets, infrastructure, dependency or AI-generated-code risk.", "security-baseline.md", ["security-baseline.md", "threat-model.md", "access-control.md", "data-protection.md", "database-security.md", "secrets-management.md", "infra-hardening.md", "secure-coding.md", "incident-response.md", "security-automation.md"], ["../AGENT.md", "../roles/", "../skills/", "../playbooks/", "../../engineering/", "../../devops/"], "Keep this practical. Security is a quality gate for risky work, not an enterprise process dump.") },
    { path: "knowledge/security-baseline.md", content: () => securityBaselineKnowledge() },
    { path: "knowledge/threat-model.md", content: () => securityThreatModelKnowledge() },
    { path: "knowledge/access-control.md", content: () => securityAccessControlKnowledge() },
    { path: "knowledge/data-protection.md", content: () => securityDataProtectionKnowledge() },
    { path: "knowledge/database-security.md", content: () => securityDatabaseSecurityKnowledge() },
    { path: "knowledge/secrets-management.md", content: () => securitySecretsManagementKnowledge() },
    { path: "knowledge/infra-hardening.md", content: () => securityInfraHardeningKnowledge() },
    { path: "knowledge/secure-coding.md", content: () => securitySecureCodingKnowledge() },
    { path: "knowledge/incident-response.md", content: () => securityIncidentResponseKnowledge() },
    { path: "knowledge/security-automation.md", content: () => securityAutomationKnowledge() }
  ];
