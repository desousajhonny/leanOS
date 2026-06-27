import type { AreaFileDefinition } from "../../../../types.js";
import { businessProfile, checklist, decisionLog, folderReadme, productBrief, stateDraft, titledDraft } from "../../../../content/shared.js";
import { productOpsDeliveryScopeKnowledge } from "./knowledge/product-ops-delivery-scope.js";
import { productOpsEpicsReadmeKnowledge } from "./knowledge/product-ops-epicsreadme.js";
import { productOpsIssueReadinessKnowledge } from "./knowledge/product-ops-issue-readiness.js";
import { productOpsMvpAcceptanceCriteriaKnowledge } from "./knowledge/product-ops-mvp-acceptance-criteria.js";
import { productOpsMvpBacklogKnowledge } from "./knowledge/product-ops-mvp-backlog.js";
import { productOpsMvpDecisionGateKnowledge } from "./knowledge/product-ops-mvp-decision-gate.js";
import { productOpsMvpPrdKnowledge } from "./knowledge/product-ops-mvp-prd.js";
import { productOpsMvpScopeKnowledge } from "./knowledge/product-ops-mvp-scope.js";
import { productOpsMvpUserStoriesKnowledge } from "./knowledge/product-ops-mvp-user-stories.js";
import { productOpsOverviewKnowledge } from "./knowledge/product-ops-overview.js";
import { productOpsReadyToDevelopKnowledge } from "./knowledge/product-ops-ready-to-develop.js";
import { productOpsWorkTaxonomyKnowledge } from "./knowledge/product-ops-work-taxonomy.js";

export const operationsProductOpsSourceOfTruth = ["knowledge/overview.md", "knowledge/work-taxonomy.md", "knowledge/delivery-scope.md", "knowledge/issue-readiness.md", "knowledge/mvp-decision-gate.md", "knowledge/ready-to-develop.md", "knowledge/technical-decisions.md", "mvp/backlog.md", "mvp/scope.md", "mvp/prd.md", "mvp/user-stories.md", "mvp/acceptance-criteria.md", "epics/README.md"];

export const operationsProductOpsFiles: AreaFileDefinition[] = [
    { path: "knowledge/README.md", content: () => folderReadme("Product Ops Knowledge", "Durable operational context produced by Product Ops.", "Use when turning strategy and roadmap into MVP backlog, delivery scope, issue readiness and delivery boundaries.", "overview.md", ["overview.md", "work-taxonomy.md", "delivery-scope.md", "issue-readiness.md", "mvp-decision-gate.md", "ready-to-develop.md", "technical-decisions.md"], ["../roles/", "../skills/", "../playbooks/", "../mvp/", "../epics/", "../../../strategy/product/", "../../../strategy/roadmap/"], "Keep this folder focused on delivery criteria and scope. The current delivery state should live in MVP backlog, Epics/Features, while PR and implementation memory live in Engineering knowledge.") },
    { path: "knowledge/overview.md", content: productOpsOverviewKnowledge },
    { path: "knowledge/work-taxonomy.md", content: productOpsWorkTaxonomyKnowledge },
    { path: "knowledge/delivery-scope.md", content: productOpsDeliveryScopeKnowledge },
    { path: "knowledge/issue-readiness.md", content: productOpsIssueReadinessKnowledge },
    { path: "knowledge/mvp-decision-gate.md", content: productOpsMvpDecisionGateKnowledge },
    { path: "knowledge/ready-to-develop.md", content: productOpsReadyToDevelopKnowledge },
    { path: "knowledge/technical-decisions.md", content: () => decisionLog("Technical Decisions") },
    { path: "mvp/README.md", content: () => folderReadme("MVP", "MVP execution knowledge owned by Product Ops.", "Use for MVP backlog, operational scope, PRD, stories, flows, acceptance criteria and release readiness.", "backlog.md", ["backlog.md", "scope.md", "prd.md", "user-stories.md", "user-flows.md", "acceptance-criteria.md", "non-goals.md", "release-checklist.md"], ["../knowledge/", "../roles/", "../skills/", "../playbooks/", "../../../strategy/product/", "../../../strategy/roadmap/"], "MVP work is owned by Product Ops with Product/PM supervision. Keep implementation details out until Engineering starts. Every approved MVP backlog item must become an Epic before Feature work.") },
    { path: "mvp/backlog.md", content: productOpsMvpBacklogKnowledge },
    { path: "mvp/scope.md", content: productOpsMvpScopeKnowledge },
    { path: "mvp/prd.md", content: productOpsMvpPrdKnowledge },
    { path: "mvp/user-stories.md", content: productOpsMvpUserStoriesKnowledge },
    { path: "mvp/user-flows.md", content: () => titledDraft("User Flows", "Describe core MVP flows.") },
    { path: "mvp/acceptance-criteria.md", content: productOpsMvpAcceptanceCriteriaKnowledge },
    { path: "mvp/non-goals.md", content: () => titledDraft("Non-Goals", "List what is intentionally excluded.") },
    { path: "mvp/release-checklist.md", content: () => checklist("MVP Release Checklist") },
    { path: "epics/README.md", content: productOpsEpicsReadmeKnowledge }
  ];
