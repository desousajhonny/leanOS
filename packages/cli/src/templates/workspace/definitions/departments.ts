import type { RootDepartmentDefinition } from "../types.js";
import { assumptionsRegister, businessProfile, checklist, decisionLog, folderReadme, learningLog, productBrief, riskiestAssumptions, stateDraft, titledDraft, validationExperiments, validationSuccessMetrics } from "../content/shared.js";

function designSystemKnowledge(): string {
  return `# Design System

## Tokens

TBD

## Typography

TBD

## Color Intent

TBD

## Spacing

TBD

## Components

TBD

## Interaction Principles

TBD

## Do Not Do

TBD

## Open Questions

TBD
`;
}

function accessibilityKnowledge(): string {
  return `# Accessibility

## Accessibility Baseline

TBD

## WCAG Target

TBD

## Keyboard Navigation

TBD

## Focus Rules

TBD

## Contrast Rules

TBD

## Forms and Errors

TBD

## Screen Reader Notes

TBD

## Known Risks

TBD
`;
}

function userFlowsKnowledge(): string {
  return `# User Flows

## Primary Flow

TBD

## Entry Point

TBD

## User Goal

TBD

## Steps

TBD

## Edge Cases

TBD

## Required Screens

TBD

## Open Questions

TBD
`;
}

function productOpsOverviewKnowledge(): string {
  return `# Product Ops Overview

## Purpose

Keep the operational bridge between Strategy, Roadmap and Engineering clear enough for implementation.

## Current State

TBD

## Product Context

TBD

## MVP Boundary

TBD

## Delivery Model

TBD

## Issue Readiness

TBD

## Cross-Area Dependencies

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function deliveryContextKnowledge(): string {
  return `# Delivery Context

## Purpose

Capture the delivery assumptions, constraints and operating context needed before Engineering starts work.

## Current State

TBD

## Repository Context

TBD

## Product Constraints

TBD

## Technical Constraints

TBD

## Dependencies

TBD

## Risks

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function issueReadinessKnowledge(): string {
  return `# Issue Readiness

## Purpose

Define what an issue needs before it is ready for implementation.

## Current State

TBD

## Required Product Criteria

TBD

## Required Engineering Criteria

TBD

## Design Criteria

TBD

## Security Criteria

TBD

## Dependencies

TBD

## Blockers

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function mvpScopeKnowledge(): string {
  return `# MVP Scope

## Purpose

Define the smallest coherent product scope that can be implemented, tested and learned from.

## Current State

TBD

## In Scope

TBD

## Out of Scope

TBD

## Primary User Outcome

TBD

## Success Criteria

TBD

## Dependencies

TBD

## Risks

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function mvpPrdKnowledge(): string {
  return `# Product Requirements Document

## Purpose

Translate product strategy and MVP scope into clear requirements before Design and Engineering execution.

## Current State

TBD

## Product Outcome

TBD

## Problem

TBD

## Target User

TBD

## Scope

TBD

## Requirements

TBD

## User Stories

TBD

## Acceptance Criteria

TBD

## Design Considerations

TBD

## Security and Privacy Considerations

TBD

## Dependencies

TBD

## Non-Goals

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function mvpUserStoriesKnowledge(): string {
  return `# User Stories

## Purpose

Capture the MVP user stories that can later become epics, sub-issues or acceptance criteria.

## Current State

TBD

## Primary Stories

TBD

## Secondary Stories

TBD

## User Value

TBD

## Acceptance Notes

TBD

## Dependencies

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function mvpAcceptanceCriteriaKnowledge(): string {
  return `# Acceptance Criteria

## Purpose

Define the criteria that make MVP work complete, testable and reviewable.

## Current State

TBD

## Global Acceptance Criteria

TBD

## Feature-Level Criteria

TBD

## Quality Bar

TBD

## Test Expectations

TBD

## Not Accepted If

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function engineeringCodeStandardsKnowledge(): string {
  return `# Code Standards

## Purpose

Define how Engineering should write maintainable code inside this product.

## Current State

TBD

## Existing Patterns First

TBD

## Modularization

TBD

## Component and Module Boundaries

TBD

## Naming

TBD

## Error Handling

TBD

## Configuration

TBD

## Do Not Do

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function engineeringImplementationRulesKnowledge(): string {
  return `# Implementation Rules

## Purpose

Define the non-negotiable engineering process before code changes start.

## Current State

TBD

## Required Context Before Coding

TBD

## Branch Rule

TBD

## Scope Control

TBD

## Design Dependency

TBD

## Security and Data Dependency

TBD

## Done Criteria

TBD

## Red Lines

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function engineeringComponentGuidelinesKnowledge(): string {
  return `# Component Guidelines

## Purpose

Define how Engineering should create, reuse and modify UI components.

## Current State

TBD

## Design Dependency

TBD

## Reuse Existing Components

TBD

## Component Boundaries

TBD

## State and Effects

TBD

## Styling

TBD

## Accessibility States

TBD

## Do Not Do

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function engineeringDataGuidelinesKnowledge(): string {
  return `# Data Guidelines

## Purpose

Define how Engineering should handle database, API, persistence and data-sensitive changes.

## Current State

TBD

## Schema Changes

TBD

## Migrations

TBD

## Validation

TBD

## Sensitive Data

TBD

## Indexes and Performance

TBD

## Backward Compatibility

TBD

## Rollback

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function engineeringTestingStrategyKnowledge(): string {
  return `# Testing Strategy

## Purpose

Define how Engineering should choose and explain tests for implementation work.

## Current State

TBD

## Unit Tests

TBD

## Integration Tests

TBD

## End-to-End Tests

TBD

## Manual Validation

TBD

## Regression Checks

TBD

## Test Gaps

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function engineeringReviewCriteriaKnowledge(): string {
  return `# Review Criteria

## Purpose

Define how Engineering reviews implementation, tests, risk and PR readiness.

## Current State

TBD

## Scope Review

TBD

## Code Review

TBD

## Test Review

TBD

## Design Review

TBD

## Security Review

TBD

## Data Review

TBD

## Merge Recommendation

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function productProblemKnowledge(): string {
  return `# Problem

## Purpose

Define the painful, frequent and valuable problem this product should solve.

## Current State

TBD

## Problem Statement

TBD

## Who Feels It

TBD

## Frequency and Urgency

TBD

## Existing Alternatives

TBD

## Why Now

TBD

## Evidence

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function productIcpKnowledge(): string {
  return `# Ideal Customer Profile

## Purpose

Define the first customer segment LeanOS should optimize strategy, MVP and validation around.

## Current State

TBD

## Primary Segment

TBD

## Buyer or Decision Maker

TBD

## End User

TBD

## Pain Triggers

TBD

## Qualification Criteria

TBD

## Exclusions

TBD

## Evidence

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function productJobsKnowledge(): string {
  return `# Jobs To Be Done

## Purpose

Describe the job the customer is trying to get done and the progress they want to make.

## Current State

TBD

## Core Job

TBD

## Functional Jobs

TBD

## Emotional Jobs

TBD

## Social Jobs

TBD

## Current Workarounds

TBD

## Success Criteria

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function productValuePropositionKnowledge(): string {
  return `# Value Proposition

## Purpose

Define the promise, outcome, proof and differentiation for the product.

## Current State

TBD

## Promise

TBD

## Primary Outcome

TBD

## Before and After

TBD

## Differentiation

TBD

## Proof or Evidence

TBD

## Risks

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function productPositioningKnowledge(): string {
  return `# Positioning

## Purpose

Define category, audience, problem, point of view and market alternative.

## Current State

TBD

## Category

TBD

## Audience

TBD

## Market Alternative

TBD

## Point of View

TBD

## Messaging Pillars

TBD

## Do Not Say

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function productBusinessModelKnowledge(): string {
  return `# Business Model Canvas

## Purpose

Define how the product can create, deliver and capture value at MVP stage.

## Current State

TBD

## Customer Segments

TBD

## Channels

TBD

## Revenue Model

TBD

## Cost Drivers

TBD

## Key Activities

TBD

## Key Partners

TBD

## Assumptions to Validate

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function roadmapKnowledge(): string {
  return `# Roadmap

## Purpose

Sequence product and business work into visible, decision-ready roadmap items.

## Current State

TBD

## Roadmap Principles

TBD

## Now

TBD

## Next

TBD

## Later

TBD

## Not Planned

TBD

## Decision Criteria

TBD

## Risks and Dependencies

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function roadmapMilestonesKnowledge(): string {
  return `# Milestones

## Purpose

Define visible checkpoints that connect roadmap work to outcomes.

## Current State

TBD

## Active Milestones

| Milestone | Outcome | Target Window | Status |
| --- | --- | --- | --- |
| TBD | TBD | TBD | TBD |

## Milestone Criteria

TBD

## Dependencies

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function roadmapCurrentCycleKnowledge(): string {
  return `# Current Cycle

## Purpose

Define the current planning or delivery cycle without overcommitting future work.

## Current State

TBD

## Cycle Goal

TBD

## Committed Work

TBD

## Candidate Work

TBD

## Constraints

TBD

## Success Criteria

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

function roadmapBacklogKnowledge(): string {
  return `# Backlog

## Purpose

Collect candidate work before it becomes committed roadmap scope.

## Current State

TBD

## Candidate Items

| Item | Source | User/Business Value | Risk | Status |
| --- | --- | --- | --- | --- |
| TBD | TBD | TBD | TBD | candidate |

## Prioritization Criteria

TBD

## Parking Lot

TBD

## Decisions

TBD

## Open Questions

TBD

## Next Update

TBD
`;
}

export const rootDepartments: RootDepartmentDefinition[] = [
  {
    key: "strategy",
    name: "Strategy",
    purpose: "Own business direction, product strategy, roadmap and validation learning.",
    requestTypes: "business, product strategy, roadmap, validation, ICP or assumptions",
    areas: [
      {
        key: "strategy.business",
        root: "strategy",
        slug: "business",
        name: "Business",
        path: "strategy/business",
        lead: {
          title: "Business Lead",
          purpose: "Route business identity, brand logic, mission, principles and operating model work."
        },
        routingKey: "business",
        requestTypes: "business, brand, mission, vision, principles or operating model",
        purpose: "Keep business identity, principles, mission and operating decisions coherent.",
        whenToUse: ["define business identity", "clarify mission", "capture principles", "record strategic decisions"],
        sourceOfTruth: ["knowledge/profile.md", "knowledge/mission.md", "knowledge/vision.md", "knowledge/principles.md", "knowledge/operating-model.md", "knowledge/decision-log.md"],
        files: [
          { path: "knowledge/README.md", content: () => folderReadme("Business Knowledge", "Durable business context produced by Strategy Business.", "Use when defining business identity, brand logic, mission, principles, operating model or strategic decisions.", "profile.md", ["profile.md", "mission.md", "vision.md", "principles.md", "operating-model.md", "decision-log.md"], ["../roles/", "../skills/", "../playbooks/", "../../product/", "../../roadmap/"], "Keep business context here. Do not enrich roles, skills or playbooks with business-specific facts.") },
          { path: "knowledge/profile.md", content: businessProfile },
          { path: "knowledge/mission.md", content: () => titledDraft("Mission", "Define why the business exists and who it serves.") },
          { path: "knowledge/vision.md", content: () => titledDraft("Vision", "Describe the future state this business wants to create.") },
          { path: "knowledge/principles.md", content: () => titledDraft("Principles", "Capture operating principles that guide decisions.") },
          { path: "knowledge/operating-model.md", content: () => titledDraft("Operating Model", "Define how the business operates with humans and AI models.") },
          { path: "knowledge/decision-log.md", content: () => decisionLog("Decision Log") }
        ],
        roles: [
          {
            slug: "business-strategist",
            title: "Business Strategist",
            purpose: "Clarify business context, principles, positioning and decision quality.",
            useWhen: ["business direction is unclear", "operating model needs definition", "a strategic decision must be recorded"],
            beforeActing: ["../knowledge/profile.md", "../knowledge/principles.md", "../knowledge/operating-model.md", "../knowledge/decision-log.md"],
            skills: ["define-business-identity", "clarify-operating-model"],
            playbooks: ["business-foundation"]
          }
        ],
        skills: [
          {
            slug: "define-business-identity",
            title: "Define Business Identity",
            purpose: "Clarify business context, mission, principles and identity.",
            useWhen: ["business identity is unclear", "mission or principles need definition", "product work lacks business context"],
            requiredContext: ["../knowledge/profile.md", "../knowledge/mission.md", "../knowledge/principles.md"],
            inputs: ["Business name", "Founder intent", "Target customer", "Product context", "Known principles"],
            process: ["Summarize what the business is.", "Clarify why it exists.", "Identify principles that should guide product and operational decisions.", "Separate founder beliefs from validated facts.", "Propose updates before writing."],
            checks: ["Mission is clear enough to guide tradeoffs.", "Principles are actionable.", "Open questions are visible."],
            outputs: ["Business identity summary", "Mission/principles update proposal", "Open questions"],
            filesToUpdate: ["../knowledge/profile.md", "../knowledge/mission.md", "../knowledge/principles.md"],
            redLines: ["Do not invent brand claims or market proof.", "Do not turn founder preferences into validated facts.", "Do not update files without confirmation."]
          },
          {
            slug: "clarify-operating-model",
            title: "Clarify Operating Model",
            purpose: "Define how humans and AI models collaborate in the business.",
            useWhen: ["operating model needs definition", "AI/human collaboration is unclear", "decision ownership is ambiguous"],
            requiredContext: ["../knowledge/operating-model.md", "../knowledge/principles.md", "../knowledge/decision-log.md"],
            inputs: ["Operating mode", "Founder role", "AI model responsibilities", "Decision constraints"],
            process: ["Define what humans own.", "Define what AI agents can assist with.", "Name decisions that require founder confirmation.", "Record durable decisions in the decision log."],
            checks: ["Human approval points are explicit.", "AI responsibilities do not exceed the workspace rules.", "Decisions are recorded with context."],
            outputs: ["Operating model update", "Decision log proposal", "Open risks"],
            filesToUpdate: ["../knowledge/operating-model.md", "../knowledge/decision-log.md"],
            redLines: ["Do not grant models authority to make irreversible business decisions.", "Do not store secrets or private credentials.", "Do not update files without confirmation."]
          }
        ],
        playbooks: [
          {
            slug: "business-foundation",
            title: "Business Foundation",
            purpose: "Move from raw business context to usable identity, principles and operating model.",
            inputs: ["../knowledge/profile.md", "../knowledge/mission.md", "../knowledge/vision.md", "../knowledge/principles.md", "../knowledge/operating-model.md", "../knowledge/decision-log.md"],
            steps: ["Load the Business AGENT and Business Strategist role.", "Clarify business profile and mission.", "Identify principles that affect product, roadmap and execution decisions.", "Define how the founder and AI agents collaborate.", "Record decisions and open questions.", "Propose file updates and wait for confirmation before writing."],
            outputs: ["Business foundation summary", "Mission/principles proposal", "Operating model proposal", "Decision log entries"],
            filesToUpdate: ["../knowledge/profile.md", "../knowledge/mission.md", "../knowledge/vision.md", "../knowledge/principles.md", "../knowledge/operating-model.md", "../knowledge/decision-log.md"]
          }
        ],
        commonPaths: [
          "Business request: `AGENT.md` -> role `roles/business-strategist.role.md` -> skill `skills/define-business-identity.skill.md` or `skills/clarify-operating-model.skill.md` -> playbook `playbooks/business-foundation.playbook.md`."
        ]
      },
      {
        key: "strategy.product",
        root: "strategy",
        slug: "product",
        name: "Product",
        path: "strategy/product",
        lead: {
          title: "Product Lead",
          purpose: "Route product strategy work, choose the right product role and keep product decisions aligned with validation, roadmap and MVP scope."
        },
        routingKey: "product",
        requestTypes: "product strategy, ICP, value proposition, positioning or business model",
        purpose: "Own product strategy, ICP, value proposition, positioning and business model coherence.",
        whenToUse: ["define strategy", "clarify ICP", "shape value proposition", "check product coherence"],
        sourceOfTruth: ["knowledge/brief.md", "knowledge/problem.md", "knowledge/icp.md", "knowledge/jobs-to-be-done.md", "knowledge/value-proposition.md", "knowledge/positioning.md", "knowledge/business-model-canvas.md"],
        files: [
          { path: "knowledge/README.md", content: () => folderReadme("Product Knowledge", "Durable product context produced by Strategy Product.", "Use when defining product strategy, ICP, value proposition, positioning, business model or product coherence.", "brief.md", ["brief.md", "problem.md", "icp.md", "jobs-to-be-done.md", "value-proposition.md", "positioning.md", "business-model-canvas.md"], ["../roles/", "../skills/", "../playbooks/", "../../validation/", "../../roadmap/", "../../../operations/product-ops/mvp/"], "Keep company/product context here. Do not enrich roles, skills or playbooks with company-specific facts.") },
          { path: "knowledge/brief.md", content: productBrief },
          { path: "knowledge/problem.md", content: productProblemKnowledge },
          { path: "knowledge/icp.md", content: productIcpKnowledge },
          { path: "knowledge/jobs-to-be-done.md", content: productJobsKnowledge },
          { path: "knowledge/value-proposition.md", content: productValuePropositionKnowledge },
          { path: "knowledge/positioning.md", content: productPositioningKnowledge },
          { path: "knowledge/business-model-canvas.md", content: productBusinessModelKnowledge }
        ],
        roles: [
          {
            slug: "product-strategist",
            title: "Product Strategist",
            purpose: "Connect customer, problem, value proposition, business model, roadmap and validation logic.",
            useWhen: ["strategy is unclear", "ICP or value proposition needs definition", "roadmap coherence is at risk"],
            beforeActing: ["../knowledge/brief.md", "../knowledge/icp.md", "../knowledge/value-proposition.md", "../../roadmap/knowledge/current-cycle.md"],
            skills: ["define-product", "define-icp", "define-value-proposition", "define-business-model", "evaluate-idea", "check-coherence"],
            playbooks: ["product-strategy"]
          },
          {
            slug: "product-manager",
            title: "Product Manager",
            purpose: "Translate strategy into coherent scope, stories and priorities with Product Ops.",
            useWhen: ["scope needs definition", "roadmap work needs issue-ready shape", "acceptance criteria are missing"],
            beforeActing: ["../knowledge/brief.md", "../../roadmap/knowledge/backlog.md", "../../../operations/product-ops/mvp/scope.md", "../../../operations/product-ops/mvp/acceptance-criteria.md"],
            skills: ["define-product", "evaluate-idea", "check-coherence"],
            playbooks: ["product-strategy"]
          }
        ],
        skills: [
          {
            slug: "define-product",
            title: "Define Product",
            purpose: "Clarify product brief, problem, target user and product status.",
            useWhen: ["the product is vague", "the founder has raw context but no product brief", "MVP or roadmap work needs a product baseline"],
            requiredContext: ["../knowledge/brief.md", "../knowledge/problem.md", "../knowledge/icp.md"],
            inputs: ["Founder description", "Product status", "Product type", "Primary user", "Known problem and outcome"],
            process: ["Summarize the product in plain language.", "Separate facts from assumptions.", "Name the primary user and problem.", "Identify what is still unknown.", "Propose updates before writing."],
            checks: ["The product can be explained in one paragraph.", "Problem and user are not treated as validated unless evidence exists.", "Open questions are explicit."],
            outputs: ["Product brief update", "Problem summary", "Open questions", "Recommended next validation or MVP step"],
            filesToUpdate: ["../knowledge/brief.md", "../knowledge/problem.md"],
            redLines: ["Do not invent customer evidence.", "Do not define MVP scope here; route MVP scope to Product Ops.", "Do not update files without confirmation."]
          },
          {
            slug: "define-icp",
            title: "Define ICP",
            purpose: "Define the first customer segment with pains, triggers and exclusions.",
            useWhen: ["the target customer is too broad", "validation needs a first segment", "marketing or design needs a clearer audience"],
            requiredContext: ["../knowledge/icp.md", "../knowledge/problem.md", "../../validation/assumptions.md"],
            inputs: ["Primary user", "Buyer or decision maker", "Pain trigger", "Exclusion criteria", "Evidence level"],
            process: ["Choose the narrowest useful first segment.", "Clarify buyer, user and decision maker.", "List qualification criteria and exclusions.", "Connect ICP to assumptions that need validation."],
            checks: ["ICP is specific enough to recruit or interview.", "Exclusions are listed.", "Assumptions are not presented as validated facts."],
            outputs: ["ICP draft", "Recruiting or validation criteria", "Assumptions to validate"],
            filesToUpdate: ["../knowledge/icp.md", "../../validation/assumptions.md"],
            redLines: ["Do not define everyone as the ICP.", "Do not skip exclusions.", "Do not create Growth acquisition plans from ICP alone."]
          },
          {
            slug: "define-value-proposition",
            title: "Define Value Proposition",
            purpose: "Articulate the promise, outcome, proof and differentiation.",
            useWhen: ["the product promise is unclear", "positioning or landing page work needs a sharper value proposition", "roadmap work needs value alignment"],
            requiredContext: ["../knowledge/problem.md", "../knowledge/icp.md", "../knowledge/value-proposition.md"],
            inputs: ["Problem", "ICP", "Desired outcome", "Alternative solution", "Evidence or proof"],
            process: ["State the promise.", "Describe the before and after.", "Name differentiation versus alternatives.", "Separate proof from assumptions.", "List risks and open questions."],
            checks: ["Promise is outcome-focused.", "Differentiation is not generic.", "Proof is not invented."],
            outputs: ["Value proposition update", "Differentiation notes", "Proof gaps"],
            filesToUpdate: ["../knowledge/value-proposition.md", "../knowledge/positioning.md"],
            redLines: ["Do not write marketing copy as if proof already exists.", "Do not overpromise beyond MVP capability."]
          },
          {
            slug: "define-business-model",
            title: "Define Business Model",
            purpose: "Draft revenue, channels, costs and delivery model.",
            useWhen: ["pricing or revenue logic is unclear", "financial assumptions affect MVP scope", "go-to-market needs a business model baseline"],
            requiredContext: ["../knowledge/business-model-canvas.md", "../knowledge/icp.md", "../knowledge/value-proposition.md"],
            inputs: ["Customer segment", "Willingness-to-pay assumption", "Delivery model", "Channel assumption", "Cost drivers"],
            process: ["Draft the simplest viable revenue model.", "List cost and delivery assumptions.", "Identify pricing risks.", "Route detailed finance modeling to Growth Finance when needed."],
            checks: ["Revenue model is plausible for the ICP.", "Costs and delivery assumptions are visible.", "Unknowns are recorded."],
            outputs: ["Business model canvas update", "Pricing assumptions", "Finance follow-up questions"],
            filesToUpdate: ["../knowledge/business-model-canvas.md", "../../../growth/finance/pricing.md"],
            redLines: ["Do not invent pricing validation.", "Do not make financial commitments without evidence.", "Do not update Growth Finance unless that area is active or the user confirms."]
          },
          {
            slug: "evaluate-idea",
            title: "Evaluate Idea",
            purpose: "Evaluate a founder idea against user value, evidence, MVP scope and roadmap impact.",
            useWhen: ["the founder proposes a new idea", "a feature request may change direction", "roadmap priority needs product judgment"],
            requiredContext: ["../knowledge/brief.md", "../knowledge/problem.md", "../knowledge/value-proposition.md", "../../roadmap/knowledge/backlog.md"],
            inputs: ["Idea", "Expected user value", "Evidence", "MVP impact", "Roadmap impact"],
            process: ["Restate the idea.", "Identify the user and problem it serves.", "Check fit with ICP and value proposition.", "Name assumptions and evidence gaps.", "Recommend accept, park, validate or reject."],
            checks: ["Idea is tied to a user outcome.", "Roadmap impact is explicit.", "Validation need is clear."],
            outputs: ["Idea evaluation", "Assumptions", "Recommended decision", "Roadmap or validation follow-up"],
            filesToUpdate: ["../../roadmap/knowledge/backlog.md", "../../validation/assumptions.md"],
            redLines: ["Do not add ideas directly to roadmap as committed work.", "Do not skip validation risk.", "Do not implement from idea evaluation alone."]
          },
          {
            slug: "check-coherence",
            title: "Check Coherence",
            purpose: "Check alignment between ICP, problem, value proposition, MVP, roadmap and issue.",
            useWhen: ["strategy feels inconsistent", "MVP scope may not match the problem", "roadmap or issue work needs product review"],
            requiredContext: ["../knowledge/icp.md", "../knowledge/problem.md", "../knowledge/value-proposition.md", "../../../operations/product-ops/mvp/scope.md", "../../roadmap/knowledge/roadmap.md"],
            inputs: ["ICP", "Problem", "Value proposition", "MVP scope", "Roadmap or issue"],
            process: ["Check ICP/problem fit.", "Check value proposition/problem fit.", "Check MVP/value fit.", "Check roadmap/MVP fit.", "List contradictions and next fixes."],
            checks: ["Findings separate alignment from inconsistency.", "Risks are actionable.", "Next command or workflow is clear."],
            outputs: ["Coherence score", "Aligned points", "Inconsistencies", "Risks", "Recommended next action"],
            filesToUpdate: ["Update no files unless the user asks after reviewing the findings."],
            redLines: ["Do not silently rewrite strategy.", "Do not treat coherence review as approval to implement."]
          }
        ],
        playbooks: [
          {
            slug: "product-strategy",
            title: "Product Strategy",
            purpose: "Move from raw product context to coherent strategy.",
            inputs: ["../knowledge/brief.md", "../knowledge/problem.md", "../knowledge/icp.md", "../knowledge/value-proposition.md", "../knowledge/positioning.md", "../knowledge/business-model-canvas.md"],
            steps: ["Load the Product AGENT and choose Product Strategist or Product Manager.", "Read the minimum Product knowledge files for the request.", "Clarify ICP, problem and value proposition before touching roadmap or MVP scope.", "Separate decisions, assumptions and open questions.", "Use validation or roadmap areas when the output affects evidence or sequencing.", "Propose file updates and wait for confirmation before writing."],
            outputs: ["Product strategy summary", "Updated Product knowledge proposal", "Assumptions or validation follow-up", "MVP or roadmap handoff when applicable"],
            filesToUpdate: ["../knowledge/brief.md", "../knowledge/problem.md", "../knowledge/icp.md", "../knowledge/value-proposition.md", "../knowledge/positioning.md", "../knowledge/business-model-canvas.md"]
          }
        ],
        commonPaths: [
          "Product strategy request: `AGENT.md` -> role `roles/product-strategist.role.md` -> skill `skills/check-coherence.skill.md` -> playbook `playbooks/product-strategy.playbook.md`."
        ]
      },
      {
        key: "strategy.roadmap",
        root: "strategy",
        slug: "roadmap",
        name: "Roadmap",
        path: "strategy/roadmap",
        lead: {
          title: "Roadmap Lead",
          purpose: "Route roadmap planning, prioritization, cycle planning and GitHub sync preparation."
        },
        routingKey: "roadmap",
        requestTypes: "roadmap, milestones, backlog, cycle planning or prioritization",
        purpose: "Own roadmap sequence, milestones, backlog and planning-cycle prioritization.",
        whenToUse: ["sequence product work", "prioritize backlog", "define current cycle", "plan milestones"],
        sourceOfTruth: ["knowledge/roadmap.md", "knowledge/milestones.md", "knowledge/current-cycle.md", "knowledge/backlog.md"],
        files: [
          { path: "knowledge/README.md", content: () => folderReadme("Roadmap Knowledge", "Durable roadmap context produced by Strategy Roadmap.", "Use when sequencing product work, planning milestones, choosing the current cycle or preparing GitHub sync.", "roadmap.md", ["roadmap.md", "milestones.md", "current-cycle.md", "backlog.md"], ["../roles/", "../skills/", "../playbooks/", "../../product/", "../../../operations/product-ops/mvp/", "../../../.github/leanos/"], "Keep roadmap planning context here. Do not turn candidate backlog items into committed scope without explicit confirmation.") },
          { path: "knowledge/roadmap.md", content: roadmapKnowledge },
          { path: "knowledge/milestones.md", content: roadmapMilestonesKnowledge },
          { path: "knowledge/current-cycle.md", content: roadmapCurrentCycleKnowledge },
          { path: "knowledge/backlog.md", content: roadmapBacklogKnowledge }
        ],
        roles: [
          {
            slug: "roadmap-planner",
            title: "Roadmap Planner",
            purpose: "Turn business, product and MVP context into a coherent roadmap and cycle plan.",
            useWhen: ["roadmap order is unclear", "backlog needs prioritization", "cycle planning is needed"],
            beforeActing: ["../knowledge/roadmap.md", "../knowledge/current-cycle.md", "../knowledge/backlog.md", "../../product/knowledge/brief.md", "../../../operations/product-ops/mvp/scope.md"],
            skills: ["create-roadmap", "prioritize-backlog", "prepare-roadmap-sync"],
            playbooks: ["roadmap-cycle-planning", "roadmap-sync-prep"]
          }
        ],
        skills: [
          {
            slug: "create-roadmap",
            title: "Create Roadmap",
            purpose: "Sequence roadmap work by business outcome, product value, MVP scope and delivery constraints.",
            useWhen: ["the founder needs a roadmap", "product strategy needs execution sequence", "MVP scope needs a planning path"],
            requiredContext: ["../knowledge/roadmap.md", "../knowledge/current-cycle.md", "../../product/knowledge/brief.md", "../../../operations/product-ops/mvp/scope.md"],
            inputs: ["Product strategy", "MVP scope", "Business constraints", "Known risks", "Candidate work"],
            process: ["Clarify the roadmap objective.", "Separate Now, Next, Later and Not Planned.", "Connect items to outcomes.", "Identify dependencies and risks.", "Propose updates before writing."],
            checks: ["Now items are small enough to execute.", "Roadmap items are not vague wishes.", "MVP scope is not expanded silently."],
            outputs: ["Roadmap proposal", "Current cycle proposal", "Risks and dependencies", "Open questions"],
            filesToUpdate: ["../knowledge/roadmap.md", "../knowledge/current-cycle.md"],
            redLines: ["Do not commit future work without founder confirmation.", "Do not invent milestones or dates.", "Do not turn backlog candidates into committed scope silently."]
          },
          {
            slug: "prioritize-backlog",
            title: "Prioritize Backlog",
            purpose: "Prioritize candidate work by value, risk, evidence, effort and current cycle fit.",
            useWhen: ["backlog is unordered", "a new idea needs placement", "the current cycle needs sharper priority"],
            requiredContext: ["../knowledge/backlog.md", "../knowledge/current-cycle.md", "../../product/knowledge/problem.md", "../../product/knowledge/value-proposition.md"],
            inputs: ["Candidate backlog items", "Product value", "Risk", "Effort", "Dependencies"],
            process: ["Group candidate work.", "Score by outcome value, risk reduction, effort and dependency.", "Recommend keep, park, split or discard.", "Update only after confirmation."],
            checks: ["Top items have a clear user or business outcome.", "Large items are flagged for epic breakdown.", "Dependencies are visible."],
            outputs: ["Prioritized backlog", "Parked items", "Items needing epic breakdown"],
            filesToUpdate: ["../knowledge/backlog.md", "../knowledge/current-cycle.md"],
            redLines: ["Do not use priority as permission to implement.", "Do not hide uncertainty.", "Do not remove backlog items without confirmation."]
          },
          {
            slug: "prepare-roadmap-sync",
            title: "Prepare Roadmap Sync",
            purpose: "Prepare roadmap epics, milestones and sync payload before GitHub Project updates.",
            useWhen: ["roadmap should be prepared for GitHub", "milestones need project sync readiness", "epics need draft payloads"],
            requiredContext: ["../knowledge/roadmap.md", "../knowledge/milestones.md", "../knowledge/current-cycle.md", "../../../operations/product-ops/mvp/scope.md", "../../../.github/leanos/project-sync.yaml"],
            inputs: ["Roadmap", "Milestones", "Current cycle", "MVP scope", "GitHub project settings"],
            process: ["Check GitHub readiness.", "Map roadmap items to milestone candidates.", "Identify epic candidates.", "Prepare dry-run sync payload.", "Ask for confirmation before any remote write."],
            checks: ["No GitHub token is stored in workspace files.", "Remote writes require dry-run and confirmation.", "Duplicate epic risk is visible."],
            outputs: ["Sync readiness summary", "Milestone mapping", "Epic draft list", "Missing configuration"],
            filesToUpdate: ["../knowledge/roadmap.md", "../knowledge/milestones.md", "../knowledge/current-cycle.md", "../../../.github/leanos/project-sync.yaml"],
            redLines: ["Do not call GitHub API directly from the model.", "Do not store tokens.", "Do not create remote items without explicit confirmation."]
          }
        ],
        playbooks: [
          {
            slug: "roadmap-cycle-planning",
            title: "Roadmap Cycle Planning",
            purpose: "Plan the next coherent roadmap cycle from strategy, MVP scope, constraints and known risks.",
            inputs: ["../knowledge/roadmap.md", "../knowledge/current-cycle.md", "../knowledge/backlog.md", "../../product/knowledge/brief.md", "../../../operations/product-ops/mvp/scope.md"],
            steps: ["Load the Roadmap AGENT and Roadmap Planner role.", "Review product strategy and MVP scope.", "Review backlog candidates.", "Choose Now, Next, Later and Not Planned boundaries.", "Define current cycle goal and success criteria.", "Propose updates and wait for confirmation before writing."],
            outputs: ["Roadmap cycle summary", "Current cycle proposal", "Backlog changes", "Milestone follow-up"],
            filesToUpdate: ["../knowledge/roadmap.md", "../knowledge/current-cycle.md", "../knowledge/backlog.md"]
          },
          {
            slug: "roadmap-sync-prep",
            title: "Roadmap Sync Prep",
            purpose: "Prepare roadmap items for GitHub Project sync without calling the API directly.",
            inputs: ["../knowledge/roadmap.md", "../knowledge/milestones.md", "../knowledge/current-cycle.md", "../knowledge/backlog.md", "../../../operations/product-ops/mvp/scope.md", "../../../.github/leanos/project-sync.yaml"],
            steps: ["Read roadmap and milestones", "Identify candidate epics", "Check MVP and validation linkage", "Ask DevOps to confirm GitHub project settings when needed", "Prepare sync payload", "Ask for confirmation before any remote write"],
            outputs: ["Roadmap sync summary", "Milestone mapping", "Epic draft list", "Missing GitHub configuration", "Confirmation question before API execution"],
            filesToUpdate: ["Update `../knowledge/roadmap.md`, `../knowledge/milestones.md` or `../knowledge/current-cycle.md` only after explicit confirmation.", "Update `../../../.github/leanos/project-sync.yaml` only through DevOps/GitHub setup guidance."]
          }
        ],
        commonPaths: [
          "Roadmap request: `AGENT.md` -> role `roles/roadmap-planner.role.md` -> skill `skills/create-roadmap.skill.md` -> playbook `playbooks/roadmap-cycle-planning.playbook.md`."
        ]
      },
      {
        key: "strategy.validation",
        root: "strategy",
        slug: "validation",
        name: "Validation",
        path: "strategy/validation",
        routingKey: "validation",
        requestTypes: "assumptions, experiments, interviews, research or validation",
        purpose: "Own assumptions, experiments, interviews, success metrics and learning capture.",
        whenToUse: ["define assumptions", "plan validation", "write interview scripts", "measure success", "capture learning"],
        sourceOfTruth: ["assumptions.md", "riskiest-assumptions.md", "experiments.md", "interview-script.md", "success-metrics.md", "learning-log.md"],
        files: [
          { path: "assumptions.md", content: () => assumptionsRegister() },
          { path: "riskiest-assumptions.md", content: () => riskiestAssumptions() },
          { path: "experiments.md", content: () => validationExperiments() },
          { path: "interview-script.md", content: () => titledDraft("Interview Script", "Prepare customer discovery questions.") },
          { path: "success-metrics.md", content: () => validationSuccessMetrics() },
          { path: "learning-log.md", content: () => learningLog() }
        ],
        roles: [
          {
            slug: "validation-researcher",
            title: "Validation Researcher",
            purpose: "Design validation work that tests the riskiest product assumptions.",
            useWhen: ["research, interviews, assumptions, experiments or learning are involved"],
            beforeActing: ["../assumptions.md", "../riskiest-assumptions.md", "../experiments.md", "../success-metrics.md"],
            skills: ["define-assumptions", "create-interview-script", "define-success-metrics"],
            playbooks: ["mvp-validation"]
          }
        ],
        skills: [
          { slug: "define-assumptions", title: "Define Assumptions", purpose: "Identify and prioritize risky assumptions." },
          { slug: "create-interview-script", title: "Create Interview Script", purpose: "Write discovery questions that reduce bias." },
          { slug: "define-success-metrics", title: "Define Success Metrics", purpose: "Define signals that indicate validation progress." }
        ],
        playbooks: [
          {
            slug: "mvp-validation",
            title: "MVP Validation",
            purpose: "Run the validation loop from assumption to roadmap impact.",
            inputs: ["Product strategy", "MVP scope", "Assumption register", "Riskiest assumptions", "Experiment plan", "Success metrics"],
            steps: ["Identify the assumption being tested", "Classify the risk and why it matters", "Design the smallest experiment that can produce evidence", "Define success and failure signals before running the experiment", "Collect evidence without interpreting it as fact too early", "Separate evidence from insight", "Make or defer a decision", "Update roadmap or backlog only when the decision requires it"],
            outputs: ["Validated learning summary", "Evidence vs insight separation", "Decision or explicit no-decision", "Roadmap or backlog impact", "Next validation action"],
            filesToUpdate: ["Update `../assumptions.md` when assumptions are added or reclassified.", "Update `../riskiest-assumptions.md` when priority changes.", "Update `../experiments.md` when an experiment is planned or completed.", "Update `../success-metrics.md` when signals are defined or changed.", "Update `../learning-log.md` only when evidence supports learning.", "Propose changes to `../../roadmap/knowledge/roadmap.md` or `../../roadmap/knowledge/backlog.md` only after a decision is confirmed."]
          }
        ],
        commonPaths: [
          "Validation request: role `roles/validation-researcher.role.md` -> skill `skills/define-assumptions.skill.md` -> playbook `playbooks/mvp-validation.playbook.md`."
        ]
      }
    ],
    workflows: [
      {
        slug: "idea-to-roadmap",
        purpose: "Turn founder ideas into product, validation, MVP and roadmap decisions.",
        requiredAreas: ["product", "roadmap", "validation"],
        steps: ["Read product strategy", "Evaluate idea against ICP, problem and value", "Identify validation risk", "Check MVP impact with Product Ops when active", "Decide backlog, roadmap, experiment or discard", "Propose source-of-truth updates before writing"]
      },
      {
        slug: "strategy-validation-cycle",
        purpose: "Coordinate company, product, roadmap and validation work inside Strategy.",
        requiredAreas: ["product", "roadmap", "validation"],
        steps: ["Read product strategy", "Review roadmap cycle", "Prioritize assumptions", "Plan validation", "Capture learning"]
      },
      {
        slug: "roadmap-to-github-project",
        purpose: "Prepare roadmap, milestones and epics for GitHub Project sync.",
        requiredAreas: ["roadmap", "product"],
        steps: ["Read roadmap and current cycle", "Confirm product outcomes and priorities", "Prepare milestones and epic drafts", "Ask DevOps to validate GitHub project settings when needed", "Produce payload and ask for confirmation before API execution"]
      }
    ]
  },
  {
    key: "operations",
    name: "Operations",
    purpose: "Own product operations, design, engineering, DevOps and security for delivery.",
    requestTypes: "MVP scope, issue readiness, design, engineering, implementation, DevOps or security",
    areas: [
      {
        key: "operations.product-ops",
        root: "operations",
        slug: "product-ops",
        name: "Product Ops",
        path: "operations/product-ops",
        lead: {
          title: "Product Ops Lead",
          purpose: "Route MVP scope, epic shaping, issue readiness and delivery-boundary work before Engineering starts implementation."
        },
        routingKey: "product_ops",
        requestTypes: "MVP scope, acceptance criteria, epics, sub-issues, issue readiness or delivery boundaries",
        purpose: "Turn Strategy and Roadmap into MVP scope, acceptance criteria and implementation-ready work.",
        whenToUse: ["define MVP", "shape acceptance criteria", "break epics into sub-issues", "check issue readiness", "coordinate delivery scope"],
        sourceOfTruth: ["knowledge/overview.md", "knowledge/delivery-context.md", "knowledge/issue-readiness.md", "knowledge/technical-decisions.md", "mvp/scope.md", "mvp/prd.md", "mvp/user-stories.md", "mvp/acceptance-criteria.md"],
        files: [
          { path: "knowledge/README.md", content: () => folderReadme("Product Ops Knowledge", "Durable operational context produced by Product Ops.", "Use when turning strategy and roadmap into MVP scope, issue readiness and delivery boundaries.", "overview.md", ["overview.md", "delivery-context.md", "issue-readiness.md", "technical-decisions.md"], ["../roles/", "../skills/", "../playbooks/", "../mvp/", "../../../strategy/product/", "../../../strategy/roadmap/"], "Keep this folder focused on delivery context. Do not move full architecture, API contracts or data models here before the product stack exists.") },
          { path: "knowledge/overview.md", content: productOpsOverviewKnowledge },
          { path: "knowledge/delivery-context.md", content: deliveryContextKnowledge },
          { path: "knowledge/issue-readiness.md", content: issueReadinessKnowledge },
          { path: "knowledge/technical-decisions.md", content: () => decisionLog("Technical Decisions") },
          { path: "mvp/README.md", content: () => folderReadme("MVP", "MVP execution knowledge owned by Product Ops.", "Use for MVP scope, PRD, stories, flows, acceptance criteria and release readiness.", "scope.md", ["scope.md", "prd.md", "user-stories.md", "user-flows.md", "acceptance-criteria.md", "non-goals.md", "release-checklist.md"], ["../knowledge/", "../roles/", "../skills/", "../playbooks/", "../../../strategy/product/", "../../../strategy/roadmap/"], "MVP work is owned by Product Ops with Product/PM supervision. Keep implementation details out until Engineering starts.") },
          { path: "mvp/scope.md", content: mvpScopeKnowledge },
          { path: "mvp/prd.md", content: mvpPrdKnowledge },
          { path: "mvp/user-stories.md", content: mvpUserStoriesKnowledge },
          { path: "mvp/user-flows.md", content: () => titledDraft("User Flows", "Describe core MVP flows.") },
          { path: "mvp/acceptance-criteria.md", content: mvpAcceptanceCriteriaKnowledge },
          { path: "mvp/non-goals.md", content: () => titledDraft("Non-Goals", "List what is intentionally excluded.") },
          { path: "mvp/release-checklist.md", content: () => checklist("MVP Release Checklist") }
        ],
        roles: [
          {
            slug: "product-owner",
            title: "Product Owner",
            purpose: "Own MVP execution clarity with supervision from Product and PM strategy.",
            useWhen: ["MVP scope needs definition", "acceptance criteria are unclear", "delivery scope needs coordination", "an epic needs to be broken into sub-issues"],
            beforeActing: ["../knowledge/overview.md", "../knowledge/issue-readiness.md", "../mvp/scope.md", "../mvp/prd.md", "../mvp/user-stories.md", "../mvp/acceptance-criteria.md", "../../../strategy/product/knowledge/brief.md", "../../../ai-standard/templates/github/issue-readiness-matrix-template.md"],
            skills: ["define-mvp", "write-acceptance-criteria", "check-delivery-coherence", "shape-epic", "write-subissue-criteria"],
            playbooks: ["mvp-delivery", "epic-to-subissues"]
          },
          {
            slug: "delivery-architect",
            title: "Delivery Architect",
            purpose: "Define delivery boundaries, technical constraints and implementation readiness without overdesigning architecture too early.",
            useWhen: ["delivery boundaries are unclear", "technical constraints affect scope", "implementation readiness needs review", "technical decisions need recording"],
            beforeActing: ["../knowledge/overview.md", "../knowledge/delivery-context.md", "../knowledge/technical-decisions.md", "../mvp/scope.md"],
            skills: ["define-delivery-boundaries", "check-delivery-coherence"],
            playbooks: ["delivery-readiness"]
          }
        ],
        skills: [
          { slug: "define-mvp", title: "Define MVP", purpose: "Turn strategy into the smallest coherent validation scope." },
          { slug: "write-acceptance-criteria", title: "Write Acceptance Criteria", purpose: "Define completion criteria for MVP work." },
          { slug: "check-delivery-coherence", title: "Check Delivery Coherence", purpose: "Check that delivery scope matches strategy, roadmap and acceptance criteria." },
          { slug: "shape-epic", title: "Shape Epic", purpose: "Turn a roadmap epic into an implementation-ready scope boundary." },
          { slug: "write-subissue-criteria", title: "Write Subissue Criteria", purpose: "Write Product and Engineering criteria for sub-issues, with Design and Security only when applicable." },
          { slug: "define-delivery-boundaries", title: "Define Delivery Boundaries", purpose: "Define enough technical and operational boundaries for safe implementation without creating premature architecture artifacts." }
        ],
        playbooks: [
          {
            slug: "mvp-delivery",
            title: "MVP Delivery",
            purpose: "Turn product strategy into executable MVP scope.",
            inputs: ["Product brief", "Problem", "ICP", "Value proposition", "Roadmap or current cycle when available", "Existing MVP scope", "Existing PRD when available"],
            steps: ["Read Product Ops AGENT and choose the Product Owner role", "Read product strategy and existing MVP knowledge", "Define the smallest coherent MVP scope", "Write or refine the MVP PRD", "Write or refine user stories", "Define acceptance criteria", "Confirm non-goals", "Identify Design, Security, Engineering or DevOps dependencies", "Propose file updates and wait for confirmation before writing"],
            outputs: ["MVP scope proposal", "PRD proposal", "User stories", "Acceptance criteria", "Non-goals", "Dependencies", "Open questions"],
            filesToUpdate: ["Update `../mvp/scope.md`, `../mvp/prd.md`, `../mvp/user-stories.md`, `../mvp/acceptance-criteria.md` and `../mvp/non-goals.md` only after explicit confirmation.", "Update `../knowledge/overview.md` or `../knowledge/delivery-context.md` when delivery context changes."]
          },
          {
            slug: "epic-to-subissues",
            title: "Epic To Subissues",
            purpose: "Break a GitHub epic into implementation-ready sub-issues with clear Product and Engineering criteria.",
            inputs: ["Parent epic", "Roadmap item", "Milestone", "MVP scope", "PRD", "Acceptance criteria", "Issue readiness matrix", "Design context when UX is affected", "Security context when sensitive surfaces are involved"],
            steps: ["Read the parent epic, MVP scope and PRD", "Confirm the epic outcome and non-goals", "Apply the issue readiness matrix", "Write Product criteria for every sub-issue", "Write Engineering criteria for every implementation sub-issue", "Include Design criteria only when the sub-issue affects user-facing UX", "Include Security criteria only when data, auth, privacy, abuse or compliance is involved", "Ask Engineering to validate size and dependencies", "Prepare sub-issue drafts and ask for confirmation before any GitHub API write"],
            outputs: ["Sub-issue draft list", "Product criteria", "Engineering criteria", "Design criteria or not applicable", "Security criteria or not applicable", "Dependencies", "Risks", "Confirmation question before remote issue creation"],
            filesToUpdate: ["Do not update GitHub directly from the model.", "Update MVP source-of-truth files only when the user explicitly confirms a scope or criteria change."]
          },
          {
            slug: "delivery-readiness",
            title: "Delivery Readiness",
            purpose: "Confirm that an issue or MVP slice has enough product, technical and operational clarity to enter Engineering.",
            inputs: ["Issue or MVP slice", "Product Ops overview", "MVP scope", "PRD", "Acceptance criteria", "Issue readiness notes", "Design and Security context when applicable"],
            steps: ["Read Product Ops AGENT and choose the Delivery Architect role", "Review MVP scope, PRD and acceptance criteria", "Identify dependencies and technical constraints", "Check Design and Security applicability", "Capture only confirmed technical decisions", "Recommend ready, needs product shaping, needs design, needs security or blocked"],
            outputs: ["Delivery readiness result", "Missing criteria", "Dependencies", "Design or Security applicability", "Technical decision notes", "Recommended next action"],
            filesToUpdate: ["Update `../knowledge/issue-readiness.md`, `../knowledge/delivery-context.md` or `../knowledge/technical-decisions.md` only after explicit confirmation."]
          }
        ],
        commonPaths: [
          "Product Ops request: area lead `AGENT.md` -> choose Product Owner or Delivery Architect -> load only the required skills and playbook.",
          "MVP request: role `roles/product-owner.role.md` -> skill `skills/define-mvp.skill.md` -> playbook `playbooks/mvp-delivery.playbook.md`.",
          "Epic breakdown request: role `roles/product-owner.role.md` -> skills `skills/shape-epic.skill.md` and `skills/write-subissue-criteria.skill.md` -> playbook `playbooks/epic-to-subissues.playbook.md`.",
          "Delivery readiness request: role `roles/delivery-architect.role.md` -> skill `skills/define-delivery-boundaries.skill.md` -> playbook `playbooks/delivery-readiness.playbook.md`."
        ]
      },
      {
        key: "operations.design",
        root: "operations",
        slug: "design",
        name: "Design",
        path: "operations/design",
        lead: {
          title: "UX Lead",
          purpose: "Lead Design work, choose the right design specialist and keep design decisions aligned with Product, MVP and implementation needs."
        },
        routingKey: "design",
        requestTypes: "screens, flows, UX, UI, onboarding or usability",
        purpose: "Own the MVP design foundation, accessibility baseline and user-flow clarity before implementation.",
        whenToUse: ["define design foundation", "map user flows", "define accessibility baseline", "design onboarding", "reason about usability"],
        sourceOfTruth: ["knowledge/design-system.md", "knowledge/accessibility.md", "knowledge/user-flows.md"],
        files: [
          { path: "knowledge/README.md", content: () => folderReadme("Design Knowledge", "Design context produced by the Design area.", "Use after Product and MVP context exist, before implementation or user-facing issue work.", "design-system.md", ["design-system.md", "accessibility.md", "user-flows.md"], ["../roles/", "../skills/", "../playbooks/", "../../../strategy/product/", "../../product-ops/mvp/"], "Keep this folder focused on reusable design foundation. Create screen specs, usability notes and UX decisions later when a concrete feature or screen requires them.") },
          { path: "knowledge/design-system.md", content: designSystemKnowledge },
          { path: "knowledge/accessibility.md", content: accessibilityKnowledge },
          { path: "knowledge/user-flows.md", content: userFlowsKnowledge }
        ],
        roles: [
          {
            slug: "ux-researcher",
            title: "UX Researcher",
            purpose: "Understand user context, behavior, pain points and research signals before design decisions harden.",
            useWhen: ["research, user evidence, interviews, behavior, usability questions or unknown user needs are involved"],
            beforeActing: ["../../../strategy/product/knowledge/brief.md", "../../product-ops/mvp/scope.md", "../knowledge/design-system.md", "../knowledge/accessibility.md", "../knowledge/user-flows.md"],
            skills: ["user-research", "user-flow-mapping"],
            playbooks: ["user-research", "mvp-ux-flow"]
          },
          {
            slug: "product-designer",
            title: "Product Designer",
            purpose: "Translate product, MVP and user context into coherent UI structure, flows and design system decisions.",
            useWhen: ["design foundation, UI, user flows, onboarding, layout, components or interaction design are involved"],
            beforeActing: ["../../../strategy/product/knowledge/brief.md", "../../product-ops/mvp/scope.md", "../knowledge/design-system.md", "../knowledge/user-flows.md"],
            skills: ["design-system", "user-flow-mapping", "screen-specification", "design-review"],
            playbooks: ["design-foundation", "mvp-ux-flow"]
          },
          {
            slug: "accessibility-specialist",
            title: "Accessibility Specialist",
            purpose: "Define and review accessibility expectations for the MVP audience, flows and interface constraints.",
            useWhen: ["accessibility, WCAG, keyboard navigation, contrast, screen readers or inclusive UX are involved"],
            beforeActing: ["../knowledge/accessibility.md", "../knowledge/design-system.md", "../knowledge/user-flows.md"],
            skills: ["accessibility", "design-review"],
            playbooks: ["accessibility-review"]
          },
          {
            slug: "ux-writer",
            title: "UX Writer",
            purpose: "Make interface language, labels, empty states, errors and onboarding copy clear and useful.",
            useWhen: ["microcopy, onboarding copy, labels, error messages, empty states or user guidance are involved"],
            beforeActing: ["../../../strategy/product/knowledge/brief.md", "../knowledge/user-flows.md", "../knowledge/accessibility.md"],
            skills: ["microcopy", "user-flow-mapping", "design-review"],
            playbooks: ["ux-writing"]
          }
        ],
        skills: [
          {
            slug: "user-research",
            title: "User Research",
            purpose: "Extract design-relevant user evidence, assumptions and open questions from Product and Validation context.",
            useWhen: ["user evidence is unclear", "research questions are needed", "design decisions depend on user behavior, pain or context"],
            requiredContext: ["Product brief", "ICP or target user", "Validation assumptions when available", "Existing user-flow knowledge"],
            inputs: ["User request", "Known evidence", "Known assumptions", "Open product or design questions"],
            process: ["Separate evidence from assumptions", "Identify user, behavior, pain and context", "Extract research questions", "Map evidence gaps", "Propose the smallest next research step"],
            checks: ["Do not treat hypotheses as facts", "Keep assumptions visibly tentative", "Make research questions specific enough to act on"],
            outputs: ["Evidence summary", "Assumption list", "Research questions", "Evidence gaps", "Smallest next research step"],
            filesToUpdate: ["Update `../knowledge/user-flows.md` only when confirmed design-relevant flow learning exists."],
            redLines: ["Do not invent user evidence", "Do not claim validation without evidence", "Ask before writing research conclusions to knowledge files."]
          },
          {
            slug: "user-flow-mapping",
            title: "User Flow Mapping",
            purpose: "Map the steps a user takes to reach the MVP outcome.",
            useWhen: ["a flow, onboarding path, task sequence or user journey needs definition", "an issue or feature has user-facing steps"],
            requiredContext: ["Product brief", "MVP scope", "User goal", "Existing user-flow knowledge"],
            inputs: ["Entry point", "User goal", "MVP scope", "Known constraints", "Success and failure conditions"],
            process: ["Map entry point", "Define user goal", "Map happy path steps", "Identify decisions, failures and edge cases", "Identify required screens", "Connect the flow to MVP scope"],
            checks: ["Avoid flows larger than the MVP", "Separate happy path from edge cases", "Flag missing product or design context"],
            outputs: ["Primary flow", "Steps", "Edge cases", "Required screens", "Open questions"],
            filesToUpdate: ["Update `../knowledge/user-flows.md` only after explicit confirmation."],
            redLines: ["Do not invent screens outside the MVP", "Do not turn vague feature ideas into large product flows without confirmation."]
          },
          {
            slug: "design-system",
            title: "Design System",
            purpose: "Define MVP design tokens, visual rules, component expectations and interaction principles.",
            useWhen: ["the design foundation is being defined", "UI consistency, tokens, typography, spacing or component expectations are needed"],
            requiredContext: ["Product brief", "MVP scope", "Target user", "Existing design-system knowledge"],
            inputs: ["Brand or product constraints", "Audience needs", "Core flows", "Accessibility expectations"],
            process: ["Define minimum tokens", "Define color intent", "Define typography", "Define spacing", "Define component expectations", "Define interaction principles", "Record do and don't guidance"],
            checks: ["Prioritize flow clarity before visual polish", "Keep tokens minimal for the MVP", "Check design-system choices against accessibility needs"],
            outputs: ["Design-system baseline", "Token notes", "Typography notes", "Color intent", "Component expectations", "Do and don't guidance"],
            filesToUpdate: ["Update `../knowledge/design-system.md` only after explicit confirmation."],
            redLines: ["Do not over-polish before user flow clarity", "Do not invent brand constraints", "Do not create a full design system when an MVP baseline is enough."]
          },
          {
            slug: "screen-specification",
            title: "Screen Specification",
            purpose: "Define screen purpose, content, states, interactions and engineering handoff notes when a concrete screen exists.",
            useWhen: ["a concrete screen, view, form, modal or page needs definition", "Engineering needs implementation-ready UI details"],
            requiredContext: ["Product brief", "MVP scope", "User-flow knowledge", "Design-system knowledge", "Accessibility knowledge"],
            inputs: ["Screen purpose", "User goal", "Required content", "Primary and secondary actions", "Validation rules", "Known constraints"],
            process: ["Define screen purpose", "Define user goal", "Structure content", "Define primary and secondary actions", "Define validation and errors", "Define default, loading, empty, error, success and edge-case states", "Add accessibility notes", "Add engineering handoff notes"],
            checks: ["Every screen state has a user outcome", "Errors are actionable", "The screen maps to an MVP flow", "Engineering handoff notes avoid visual ambiguity"],
            outputs: ["Screen purpose", "Content structure", "Actions", "Validation and error rules", "Default/loading/empty/error/success states", "Accessibility notes", "Engineering handoff notes"],
            filesToUpdate: ["Do not create screen-specific files until a concrete feature or screen requires them.", "Update issue or implementation notes only after confirmation."],
            redLines: ["Do not invent screens without a concrete feature or flow", "Do not skip loading, empty, error or success states when they are relevant."]
          },
          {
            slug: "microcopy",
            title: "Microcopy",
            purpose: "Write clear interface copy, labels, helper text, empty states and error messages.",
            useWhen: ["labels, helper text, empty states, errors, success messages and onboarding hints need definition"],
            requiredContext: ["Product positioning", "User-flow knowledge", "Accessibility knowledge", "Target user context"],
            inputs: ["User goal", "Screen or flow context", "Tone expectations", "Error or success condition", "Accessibility constraints"],
            process: ["Identify the user-facing moment", "Draft labels and helper text", "Draft empty, error and success messages", "Add onboarding hints when needed", "Check tone, clarity and accessibility of language"],
            checks: ["Use clear language", "Avoid clever copy that reduces comprehension", "Make errors actionable", "Avoid jargon unless the target user expects it"],
            outputs: ["Labels", "Helper text", "Empty states", "Errors", "Success messages", "Onboarding hints", "Tone notes"],
            filesToUpdate: ["Do not create screen-specific copy files until a concrete screen or feature requires them."],
            redLines: ["Do not invent product promises", "Do not hide important constraints in friendly copy", "Ask before changing persistent copy guidance."]
          },
          {
            slug: "accessibility",
            title: "Accessibility",
            purpose: "Define accessibility expectations based on the MVP audience, context and product constraints.",
            useWhen: ["accessibility baseline, keyboard navigation, focus, contrast, forms, errors or screen-reader implications are involved"],
            requiredContext: ["MVP audience", "User-flow knowledge", "Design-system knowledge", "Accessibility knowledge"],
            inputs: ["Target user context", "Core flows", "UI states", "Forms and errors", "Motion or interaction patterns"],
            process: ["Use WCAG 2.2 AA as the baseline", "Review keyboard navigation", "Review focus states", "Review color contrast", "Review labels and instructions", "Review error identification", "Review screen-reader implications", "Review reduced-motion needs", "Identify when human accessibility review is required"],
            checks: ["Keyboard-only users can complete critical flows", "Focus order is logical", "Contrast intent is sufficient", "Forms and errors are identifiable", "Screen-reader implications are noted"],
            outputs: ["Accessibility baseline", "WCAG 2.2 AA notes", "Keyboard and focus notes", "Contrast notes", "Form and error notes", "Screen-reader notes", "Human review requirement"],
            filesToUpdate: ["Update `../knowledge/accessibility.md` only after explicit confirmation."],
            redLines: ["Do not claim full accessibility compliance without expert validation", "Do not waive accessibility without a documented reason", "Ask for human accessibility review when risk is high."]
          },
          {
            slug: "design-review",
            title: "Design Review",
            purpose: "Evaluate UX and design impact in issues, PRs, screens, flows or product decisions.",
            useWhen: ["an issue, PR, flow, screen or decision may affect user-facing UX", "Design may be not applicable and needs explicit classification"],
            requiredContext: ["Issue, PR, flow or decision context", "MVP scope", "Design-system knowledge", "User-flow knowledge", "Accessibility knowledge when relevant"],
            inputs: ["Changed behavior", "User-facing impact", "Acceptance criteria", "Design context", "Accessibility context", "Microcopy context when relevant"],
            process: ["Classify Design result as pass, concerns, blocked or not applicable", "Review flow clarity", "Review visual hierarchy", "Check consistency with design system", "Check MVP alignment", "Check user friction", "Check basic accessibility", "Check microcopy when relevant", "List usability risks"],
            checks: ["Design is marked not applicable only when there is no user-facing UX impact", "Findings are ordered by severity", "Risks are tied to user outcomes", "Next action is explicit"],
            outputs: ["Design result: pass, concerns, blocked or not applicable", "Findings ordered by severity", "MVP alignment", "Usability risk", "Accessibility risk", "Microcopy risk", "Recommended next action"],
            filesToUpdate: ["Update review notes, PR notes or issue criteria only after explicit confirmation."],
            redLines: ["Do not approve UX without enough context", "Do not block work for polish-only concerns", "Do not apply Design when it is truly not applicable."]
          }
        ],
        playbooks: [
          {
            slug: "design-foundation",
            title: "Design Foundation",
            purpose: "Create the MVP design foundation from product strategy and MVP scope before implementation.",
            inputs: ["Product brief", "ICP", "MVP scope", "Primary user flows", "Accessibility needs", "Brand or product constraints", "Skills: design-system, accessibility, user-flow-mapping"],
            steps: ["Read Product and MVP context", "Use `skills/design-system.skill.md` to define the design system baseline", "Use `skills/accessibility.skill.md` to define accessibility expectations for the MVP audience", "Use `skills/user-flow-mapping.skill.md` to map primary user flows", "Identify missing context", "Propose updates to Design knowledge files before writing"],
            outputs: ["Design system baseline", "Accessibility baseline", "Primary user flows", "Open questions", "Confirmation question before file updates"],
            filesToUpdate: ["Update `../knowledge/design-system.md` only after explicit confirmation.", "Update `../knowledge/accessibility.md` only after explicit confirmation.", "Update `../knowledge/user-flows.md` only after explicit confirmation."]
          },
          {
            slug: "user-research",
            title: "User Research",
            purpose: "Clarify design-relevant user evidence before making UX decisions.",
            inputs: ["Product brief", "ICP", "Validation assumptions", "Known user behavior", "Open design questions", "Skill: user-research"],
            steps: ["Read product and validation context", "Use `skills/user-research.skill.md` to separate evidence from assumptions", "Identify design-relevant user needs", "Identify open research questions", "Recommend the smallest next research step"],
            outputs: ["User evidence summary", "Design assumptions", "Open research questions", "Recommended next step"],
            filesToUpdate: ["Update `../knowledge/user-flows.md` only when the user confirms a design-relevant flow change."]
          },
          {
            slug: "mvp-ux-flow",
            title: "MVP UX Flow",
            purpose: "Create a usable flow for the first validation cycle.",
            inputs: ["ICP", "MVP scope", "User-flow knowledge", "Accessibility baseline", "Skills: user-flow-mapping, screen-specification when a concrete screen exists"],
            steps: ["Read ICP and MVP scope", "Use `skills/user-flow-mapping.skill.md` to map the primary flow", "Check accessibility expectations", "Use `skills/screen-specification.skill.md` only when a concrete screen, page, form or modal needs definition", "Record proposed Design knowledge updates"],
            outputs: ["Primary UX flow", "Edge cases", "Required screens", "Screen-specification needs when applicable", "Open questions"],
            filesToUpdate: ["Update `../knowledge/user-flows.md` only after explicit confirmation."]
          },
          {
            slug: "accessibility-review",
            title: "Accessibility Review",
            purpose: "Review design foundation or UX flow for accessibility expectations.",
            inputs: ["Accessibility knowledge", "Design system baseline", "User flows", "MVP audience and constraints", "Skills: accessibility, design-review when general UX evaluation is needed"],
            steps: ["Read accessibility baseline", "Use `skills/accessibility.skill.md` to check audience needs, keyboard, focus, contrast, forms, errors and screen-reader implications", "Use `skills/design-review.skill.md` when the request needs a broader UX/design result", "List accessibility gaps"],
            outputs: ["Accessibility review", "Gaps", "Required follow-up", "Not applicable notes when justified"],
            filesToUpdate: ["Update `../knowledge/accessibility.md` only after explicit confirmation."]
          },
          {
            slug: "ux-writing",
            title: "UX Writing",
            purpose: "Define clear interface language for MVP flows.",
            inputs: ["Product positioning", "User flows", "Accessibility expectations", "Target user context", "Skill: microcopy"],
            steps: ["Read product and flow context", "Use `skills/microcopy.skill.md` to identify labels, helper text, empty states, errors, success messages and onboarding hints", "Draft concise copy", "Check clarity and accessibility", "List open copy questions"],
            outputs: ["Microcopy draft", "Tone notes", "Accessibility notes", "Open questions"],
            filesToUpdate: ["Do not create screen-specific copy files until a concrete screen or feature requires them."]
          }
        ],
        commonPaths: [
          "Design foundation request: area lead `AGENT.md` -> role `roles/product-designer.role.md` -> skills `skills/design-system.skill.md`, `skills/accessibility.skill.md` and `skills/user-flow-mapping.skill.md` -> playbook `playbooks/design-foundation.playbook.md`.",
          "Research request: area lead `AGENT.md` -> role `roles/ux-researcher.role.md` -> skill `skills/user-research.skill.md` -> playbook `playbooks/user-research.playbook.md`.",
          "Accessibility request: area lead `AGENT.md` -> role `roles/accessibility-specialist.role.md` -> skills `skills/accessibility.skill.md` and `skills/design-review.skill.md` when general UX evaluation is needed -> playbook `playbooks/accessibility-review.playbook.md`.",
          "UX writing request: area lead `AGENT.md` -> role `roles/ux-writer.role.md` -> skill `skills/microcopy.skill.md` -> playbook `playbooks/ux-writing.playbook.md`.",
          "Design review request: area lead `AGENT.md` -> role `roles/product-designer.role.md` or applicable specialist -> skill `skills/design-review.skill.md` -> output findings without creating a review playbook."
        ]
      },
      {
        key: "operations.engineering",
        root: "operations",
        slug: "engineering",
        name: "Engineering",
        path: "operations/engineering",
        lead: {
          title: "Engineering Lead",
          purpose: "Route implementation, branch, testing, data-change, PR and review work while enforcing Engineering red lines before code changes."
        },
        routingKey: "engineering",
        requestTypes: "code, implementation, bugs, tests, issues or pull requests",
        purpose: "Own implementation, tests, code quality and PR readiness.",
        whenToUse: ["implement a feature", "fix a bug", "modify code", "create or review a PR", "write tests", "work on a GitHub issue"],
        operatingRules: [
          "Read the issue, PRD, MVP scope and acceptance criteria before planning implementation.",
          "Create or confirm an issue-linked branch before changing code.",
          "Follow existing repository patterns before introducing new abstractions.",
          "Route user-facing UI work through Design when the design foundation or flow is missing.",
          "Route data, auth, permissions, privacy, abuse or compliance work through Security when risk is present.",
          "Use `.github/leanos/branch-rules.md` and `.github/PULL_REQUEST_TEMPLATE.md` for branch and PR conventions."
        ],
        redLines: [
          "Do not implement outside the confirmed issue or PRD scope.",
          "Do not create new user-facing components before Design defines the structure or confirms the gap.",
          "Do not hardcode secrets, configuration, business rules, copy or design values.",
          "Do not create large unstructured files, components or functions when modular composition is possible.",
          "Do not make destructive data or migration changes without explicit confirmation and rollback notes.",
          "Do not open or recommend a PR without tests, manual validation notes or a clear test-gap explanation."
        ],
        sourceOfTruth: ["knowledge/code-standards.md", "knowledge/implementation-rules.md", "knowledge/component-guidelines.md", "knowledge/data-guidelines.md", "knowledge/testing-strategy.md", "knowledge/review-criteria.md", "knowledge/implementation-notes.md", "knowledge/code-review-notes.md", "knowledge/pr-log.md"],
        files: [
          { path: "knowledge/README.md", content: () => folderReadme("Engineering Knowledge", "Durable Engineering rules, standards and implementation notes.", "Use before planning code changes, branch work, tests, PRs or reviews.", "implementation-rules.md", ["code-standards.md", "implementation-rules.md", "component-guidelines.md", "data-guidelines.md", "testing-strategy.md", "review-criteria.md", "implementation-notes.md", "code-review-notes.md", "pr-log.md"], ["../roles/", "../skills/", "../playbooks/", "../../product-ops/mvp/", "../../../.github/leanos/"], "Engineering knowledge defines how code should be changed. It does not replace issue scope, PRD, Design or Security review.") },
          { path: "knowledge/code-standards.md", content: engineeringCodeStandardsKnowledge },
          { path: "knowledge/implementation-rules.md", content: engineeringImplementationRulesKnowledge },
          { path: "knowledge/component-guidelines.md", content: engineeringComponentGuidelinesKnowledge },
          { path: "knowledge/data-guidelines.md", content: engineeringDataGuidelinesKnowledge },
          { path: "knowledge/testing-strategy.md", content: engineeringTestingStrategyKnowledge },
          { path: "knowledge/review-criteria.md", content: engineeringReviewCriteriaKnowledge },
          { path: "knowledge/implementation-notes.md", content: () => stateDraft("Implementation Notes", "Capture implementation context and decisions.") },
          { path: "knowledge/code-review-notes.md", content: () => stateDraft("Code Review Notes", "Capture review observations and risks.") },
          { path: "knowledge/pr-log.md", content: () => decisionLog("PR Log") }
        ],
        roles: [
          {
            slug: "senior-developer",
            title: "Senior Developer",
            purpose: "Implement roadmap issues with maintainable code, tests and MVP alignment.",
            useWhen: ["implement an issue", "fix a bug", "modify code", "write tests", "prepare implementation for a PR"],
            beforeActing: ["../../../.leanos/context/current-focus.md", "../../product-ops/mvp/scope.md", "../../product-ops/mvp/prd.md", "../../product-ops/mvp/acceptance-criteria.md", "../../product-ops/knowledge/issue-readiness.md", "../knowledge/implementation-rules.md", "../knowledge/code-standards.md", "../knowledge/component-guidelines.md", "../knowledge/data-guidelines.md", "../knowledge/testing-strategy.md", "../../../.github/leanos/branch-rules.md", "../knowledge/implementation-notes.md"],
            skills: ["plan-implementation", "follow-code-standards", "create-branch", "write-tests", "review-data-change", "create-pr"],
            playbooks: ["branch-from-issue", "issue-to-pr", "test-planning", "pr-validation"]
          },
          {
            slug: "test-engineer",
            title: "Test Engineer",
            purpose: "Plan and evaluate validation coverage for implementation work.",
            useWhen: ["test coverage is unclear", "acceptance criteria need validation mapping", "risk-based test planning is needed", "test gaps must be explained"],
            beforeActing: ["../knowledge/testing-strategy.md", "../knowledge/implementation-rules.md", "../../product-ops/mvp/acceptance-criteria.md", "../../product-ops/mvp/prd.md"],
            skills: ["write-tests", "review-pr"],
            playbooks: ["test-planning", "pr-validation"]
          },
          {
            slug: "pr-reviewer",
            title: "PR Reviewer",
            purpose: "Review pull requests against scope, tests, coherence and validation goals.",
            useWhen: ["review a PR", "validate implementation readiness", "check merge risk"],
            beforeActing: ["../../product-ops/mvp/scope.md", "../../product-ops/mvp/prd.md", "../../product-ops/mvp/acceptance-criteria.md", "../knowledge/review-criteria.md", "../knowledge/code-standards.md", "../knowledge/data-guidelines.md", "../../../.github/leanos/pr-validation-rules.md", "../../../ai-standard/templates/review/code-review-template.md"],
            skills: ["review-pr", "follow-code-standards", "review-data-change"],
            playbooks: ["pr-validation"]
          }
        ],
        skills: [
          {
            slug: "plan-implementation",
            title: "Plan Implementation",
            purpose: "Turn an issue into a scoped technical implementation plan before code changes.",
            useWhen: ["a GitHub issue should be implemented", "a bug fix needs scope", "implementation work needs sequencing"],
            requiredContext: ["Issue body", "PRD", "MVP scope", "Acceptance criteria", "Engineering implementation rules", "Code standards"],
            inputs: ["Issue", "Linked epic or PRD", "Acceptance criteria", "Current repository patterns", "Known risks"],
            process: ["Summarize the issue in the chat", "Identify files or modules likely involved", "Classify Design, Security and data impact", "Plan the smallest safe implementation steps", "Identify tests and validation", "Ask for confirmation before code changes when scope is unclear"],
            checks: ["Implementation plan stays inside issue scope", "Existing repository patterns are preferred", "Dependencies and risks are explicit", "Design/Security/Data routing is explicit when applicable"],
            outputs: ["Issue summary", "Implementation plan", "Files likely involved", "Tests to run or add", "Risks", "Confirmation question when needed"],
            filesToUpdate: ["Update `../knowledge/implementation-notes.md` only when implementation decisions should persist."],
            redLines: ["Do not begin code changes without branch context", "Do not expand scope silently", "Do not skip Design/Security/Data classification."]
          },
          {
            slug: "follow-code-standards",
            title: "Follow Code Standards",
            purpose: "Apply project coding standards, modularity, naming and hardcoding rules.",
            useWhen: ["writing or reviewing code", "choosing a pattern", "splitting files or components", "deciding whether to introduce a new abstraction"],
            requiredContext: ["Code standards", "Implementation rules", "Existing repository patterns"],
            inputs: ["Target code area", "Existing files", "Proposed change", "Known project conventions"],
            process: ["Inspect nearby patterns", "Choose the smallest matching pattern", "Separate UI, state, data access, validation and side effects where practical", "Avoid hardcoded secrets/config/copy/design values", "Keep functions and components focused", "Document any intentional deviation"],
            checks: ["No unnecessary new abstraction", "No large unstructured component or file", "No hidden business rule", "No duplicated logic when a local reusable pattern exists"],
            outputs: ["Pattern decision", "Modularity notes", "Hardcoding risks", "Refactor or no-refactor recommendation"],
            filesToUpdate: ["Update `../knowledge/code-standards.md` only when the user confirms a durable standard change."],
            redLines: ["Do not invent architecture that the repo does not need", "Do not hardcode values that belong in config, data, design tokens or copy sources."]
          },
          {
            slug: "create-branch",
            title: "Create Branch",
            purpose: "Define a safe issue-linked branch name and creation checklist before code changes.",
            useWhen: ["implementation is about to start", "a GitHub issue has been selected", "branch naming needs validation"],
            requiredContext: ["GitHub issue number", "Issue title", "Branch rules"],
            inputs: ["Issue number", "Issue title", "Branch type", "Existing branch names when available"],
            process: ["Load branch rules", "Generate an issue-linked branch name", "Keep the branch name short and descriptive", "Check for conflicting branch names", "Ask before reusing or replacing a branch"],
            checks: ["Branch includes the issue number when available", "Branch name does not include secrets or vague wording", "Branch matches repository convention"],
            outputs: ["Proposed branch name", "Branch command or plan", "Safety notes"],
            filesToUpdate: ["Do not update files just to create a branch plan."]
          },
          {
            slug: "write-tests",
            title: "Write Tests",
            purpose: "Define or update tests for changed behavior.",
            useWhen: ["behavior changes", "bug fixes need regression coverage", "acceptance criteria require validation", "PR test gaps need explanation"],
            requiredContext: ["Testing strategy", "Acceptance criteria", "Changed behavior", "Known risks"],
            inputs: ["Implementation scope", "Changed behavior", "Acceptance criteria", "Existing test patterns"],
            process: ["Identify behavior under test", "Choose unit, integration, e2e or manual validation", "Map tests to acceptance criteria", "Add regression coverage for bugs", "List test gaps honestly"],
            checks: ["Tests prove behavior, not implementation details", "Risky behavior has coverage or an explicit gap", "Manual checks are concrete"],
            outputs: ["Test plan", "Test changes", "Manual validation", "Known gaps"],
            filesToUpdate: ["Update `../knowledge/implementation-notes.md` only when persistent testing decisions are useful."]
          },
          {
            slug: "review-data-change",
            title: "Review Data Change",
            purpose: "Review database, API, persistence, migration and data-sensitive changes before implementation or PR approval.",
            useWhen: ["data model, migration, API contract, persistence, auth, permissions, privacy or sensitive data is involved"],
            requiredContext: ["Data guidelines", "Security context when sensitive data is involved", "Acceptance criteria", "Current schema or API patterns"],
            inputs: ["Proposed data change", "Data sensitivity", "Migration needs", "Rollback expectation", "Compatibility requirements"],
            process: ["Classify data sensitivity", "Identify schema or API impact", "Check validation and authorization", "Check migration and rollback implications", "Check index/performance needs", "Route to Security when privacy/auth/compliance risk exists"],
            checks: ["No destructive change without confirmation", "No sensitive data exposure", "Backward compatibility is considered", "Rollback path is visible"],
            outputs: ["Data-change review", "Risks", "Migration notes", "Security routing result", "Rollback notes"],
            filesToUpdate: ["Update `../knowledge/data-guidelines.md` only after explicit confirmation."]
          },
          {
            slug: "create-pr",
            title: "Create PR",
            purpose: "Prepare a PR summary tied to issue scope, tests and review criteria.",
            useWhen: ["implementation is ready for review", "PR description needs structure", "merge risk needs communication"],
            requiredContext: ["PR template", "Linked issue", "Implementation notes", "Tests run", "Known risks"],
            inputs: ["Branch", "Linked issue", "Changed files", "Tests", "Risks", "Screenshots or UX notes when applicable"],
            process: ["Load PR template", "Summarize scope", "List implementation notes", "List tests and manual validation", "Flag Design/Security/Data applicability", "List known risks and follow-up"],
            checks: ["PR references the issue", "Tests or gaps are explicit", "Description does not hide known risk"],
            outputs: ["PR title", "PR body", "Test summary", "Risk notes"],
            filesToUpdate: ["Update `../knowledge/pr-log.md` after PR creation or when the user asks for a persistent PR record."]
          },
          {
            slug: "review-pr",
            title: "Review PR",
            purpose: "Review PR changes for correctness, scope and LeanOS coherence.",
            useWhen: ["review a PR", "validate implementation readiness", "check merge risk", "perform code review"],
            requiredContext: ["Review criteria", "PR validation rules", "Linked issue", "PRD", "Acceptance criteria", "Changed files"],
            inputs: ["PR description", "Diff", "Linked issue", "Tests", "Known risks"],
            process: ["Check scope against issue and PRD", "Review code standards", "Review tests", "Review Design applicability", "Review Security/Data applicability", "List findings by severity", "Recommend merge, changes or blocked"],
            checks: ["Findings are actionable", "Severity is clear", "Design/Security/Data are not forced when not applicable", "Merge recommendation is justified"],
            outputs: ["Findings by severity", "Scope result", "Code result", "Test result", "Design result or not applicable", "Security/Data result or not applicable", "Merge recommendation"],
            filesToUpdate: ["Update `../knowledge/code-review-notes.md` or `../knowledge/pr-log.md` only when the user asks for persistent review notes."]
          }
        ],
        playbooks: [
          {
            slug: "branch-from-issue",
            title: "Branch From Issue",
            purpose: "Create a safe branch plan before implementation starts.",
            inputs: ["GitHub issue number", "Issue title", "Current default branch", "Existing branch list when available", "Branch rules", "Skill: create-branch"],
            steps: ["Read the issue context and title", "Load `.github/leanos/branch-rules.md`", "Use `skills/create-branch.skill.md` to generate a branch name using the required issue format", "Check for sensitive words or unnecessary scope", "Ask before using an existing branch or creating a new one"],
            outputs: ["Proposed branch name", "Linked issue", "Branch safety notes", "Next implementation step"],
            filesToUpdate: ["Do not update files just to create a branch plan. Record branch decisions in `../knowledge/implementation-notes.md` only when the user asks for persistent notes."]
          },
          {
            slug: "issue-to-pr",
            title: "Issue to PR",
            purpose: "Move from a scoped issue to a reviewable pull request.",
            inputs: ["GitHub issue body", "Parent epic when available", "MVP scope", "PRD", "Acceptance criteria", "Product, Design, Engineering and Security criteria", "Branch name", "Engineering knowledge"],
            steps: ["Read Engineering AGENT and choose the Senior Developer role", "Read issue, PRD, MVP scope and acceptance criteria", "Confirm issue readiness with Product and Engineering criteria", "Check whether Design criteria are required for user-facing UX", "Check whether Security/Data criteria are required for data, auth, privacy, abuse or compliance", "Create or confirm an issue-linked branch before code changes", "Use `skills/plan-implementation.skill.md` to plan implementation", "Use `skills/follow-code-standards.skill.md` while changing code", "Use `skills/review-data-change.skill.md` when data/API/persistence is involved", "Use `skills/write-tests.skill.md` to update tests or explain gaps", "Use `skills/create-pr.skill.md` to prepare PR using the PR template"],
            outputs: ["Implementation summary", "Branch used", "Files changed", "Tests run or proposed", "PR draft", "Known risks"],
            filesToUpdate: ["Update `../knowledge/implementation-notes.md` when implementation decisions should persist.", "Update `../knowledge/pr-log.md` after PR creation or when the user asks for a persistent PR record."]
          },
          {
            slug: "test-planning",
            title: "Test Planning",
            purpose: "Plan validation for implementation work without storing procedural test instructions as loose area files.",
            inputs: ["Implementation scope", "PRD", "Acceptance criteria", "Changed behavior", "Known risks", "Testing strategy", "Skill: write-tests"],
            steps: ["Read `knowledge/testing-strategy.md`", "Identify changed behavior", "Use `skills/write-tests.skill.md` to choose automated and manual validation", "Map tests to acceptance criteria", "Identify risky gaps", "Summarize validation readiness"],
            outputs: ["Test strategy", "Validation gaps", "Manual checks", "Next action"],
            filesToUpdate: ["Update `../knowledge/implementation-notes.md` or PR notes if the workspace needs a persistent test decision."]
          },
          {
            slug: "pr-validation",
            title: "PR Validation",
            purpose: "Validate implementation before merge.",
            inputs: ["PR description", "Linked issue", "Parent epic when available", "MVP scope", "PRD", "Acceptance criteria", "Changed files", "Tests or validation evidence", "Review criteria"],
            steps: ["Read Engineering AGENT and choose PR Reviewer or Test Engineer as needed", "Read PR context", "Load `.github/leanos/pr-validation-rules.md` and `knowledge/review-criteria.md`", "Use `skills/review-pr.skill.md` to check scope against issue, PRD and MVP", "Use `skills/follow-code-standards.skill.md` to check code quality", "Use `skills/review-data-change.skill.md` when data/API/persistence is involved", "Validate Product criteria and acceptance criteria", "Review Design criteria only when UX changed", "Review Security criteria only when data, auth, privacy, abuse or compliance is involved", "Review tests and manual validation", "List findings by severity", "Recommend merge, changes or blocked-by-context"],
            outputs: ["Findings by severity", "Product alignment", "Code quality result", "Design review result or not applicable", "Security/Data review result or not applicable", "Test confidence", "Merge recommendation"],
            filesToUpdate: ["Update `../knowledge/code-review-notes.md` or `../knowledge/pr-log.md` only when the user asks for persistent review notes."]
          }
        ],
        commonPaths: [
          "Branch request: area lead `AGENT.md` -> role `roles/senior-developer.role.md` -> skill `skills/create-branch.skill.md` -> playbook `playbooks/branch-from-issue.playbook.md`.",
          "Implementation request: area lead `AGENT.md` -> role `roles/senior-developer.role.md` -> skills `skills/plan-implementation.skill.md`, `skills/follow-code-standards.skill.md` and `skills/write-tests.skill.md` -> playbook `playbooks/issue-to-pr.playbook.md`.",
          "Data change request: area lead `AGENT.md` -> role `roles/senior-developer.role.md` or `roles/pr-reviewer.role.md` -> skill `skills/review-data-change.skill.md` -> route Security when sensitive risk exists.",
          "Test request: area lead `AGENT.md` -> role `roles/test-engineer.role.md` -> skill `skills/write-tests.skill.md` -> playbook `playbooks/test-planning.playbook.md`.",
          "PR review request: area lead `AGENT.md` -> role `roles/pr-reviewer.role.md` -> skills `skills/review-pr.skill.md`, `skills/follow-code-standards.skill.md` and conditional `skills/review-data-change.skill.md` -> playbook `playbooks/pr-validation.playbook.md`."
        ]
      },
      {
        key: "operations.devops",
        root: "operations",
        slug: "devops",
        name: "DevOps",
        path: "operations/devops",
        routingKey: "devops",
        requestTypes: "deployment, environments, CI, observability, GitHub Projects or operations runbooks",
        purpose: "Own delivery infrastructure, environments, deployment, GitHub workflow setup and observability notes.",
        whenToUse: ["plan deployment", "configure CI", "configure GitHub Projects", "document environments", "define observability"],
        sourceOfTruth: [],
        files: [],
        roles: [
          {
            slug: "devops-engineer",
            title: "DevOps Engineer",
            purpose: "Prepare release, environment, GitHub workflow and observability practices.",
            useWhen: ["deployment or CI is involved", "GitHub Project setup is needed", "runtime operations need documentation", "environment risk exists"],
            beforeActing: ["../README.md", "../area.yaml", "../../../.github/leanos/project-sync.yaml", "../../../.github/leanos/github-settings.example.json"],
            skills: ["setup-ci", "plan-deployment", "configure-github-project", "define-observability"],
            playbooks: ["setup-ci-cd", "plan-deployment", "configure-github-project", "configure-environments", "define-observability", "release-operations"]
          },
          {
            slug: "github-devops",
            title: "GitHub DevOps",
            purpose: "Guide safe GitHub repository, Project, labels and sync configuration without storing secrets.",
            useWhen: ["the founder wants to connect GitHub", "roadmap sync needs setup", "GitHub Project fields or labels need validation"],
            beforeActing: ["../../../.github/leanos/github-settings.example.json", "../../../.github/leanos/project-sync.yaml", "../../../.github/leanos/sync-state.yaml", "../../../.github/leanos/labels.yaml"],
            skills: ["configure-github-project"],
            playbooks: ["configure-github-project"]
          }
        ],
        skills: [
          { slug: "setup-ci", title: "Setup CI", purpose: "Define build, test and validation automation." },
          { slug: "plan-deployment", title: "Plan Deployment", purpose: "Plan safe release and rollback flow." },
          { slug: "configure-github-project", title: "Configure GitHub Project", purpose: "Guide GitHub repository, Project fields, labels and token source setup without storing secrets." },
          { slug: "define-observability", title: "Define Observability", purpose: "Define runtime visibility for the product." }
        ],
        playbooks: [
          {
            slug: "setup-ci-cd",
            title: "Setup CI/CD",
            purpose: "Plan build, test and release automation for the workspace.",
            inputs: ["Repository structure", "Build command", "Test command", "Deployment target", "Required validation gates"],
            steps: ["Identify build and test commands", "Choose required CI checks", "Define release trigger", "Document secrets or environment needs", "Define failure handling"],
            outputs: ["CI/CD readiness", "Required checks", "Automation gaps", "Next action"],
            filesToUpdate: ["Update relevant DevOps notes or GitHub workflow files if the workspace has them."]
          },
          {
            slug: "plan-deployment",
            title: "Plan Deployment",
            purpose: "Plan a safe deployment path.",
            inputs: ["Release scope", "Target environment", "Current validation status", "Known risks"],
            steps: ["Identify target environment", "Confirm required validation gates", "Define deployment steps", "Define rollback path", "Define post-deploy checks"],
            outputs: ["Deployment readiness", "Deployment steps", "Risks", "Rollback notes", "Next action"],
            filesToUpdate: ["Update relevant DevOps notes or release records if the workspace has them."]
          },
          {
            slug: "configure-github-project",
            title: "Configure GitHub Project",
            purpose: "Prepare GitHub settings for roadmap sync without calling the API directly from the model.",
            inputs: ["Founder GitHub owner or organization", "Repository name", "GitHub Project URL or number", "Desired project fields", "Token source from environment, secure prompt or keychain", "Deployment target such as Vercel when known"],
            steps: ["Read `.github/leanos/github-settings.example.json`", "Review `.github/leanos/project-sync.yaml`", "Ask for missing owner, repository, project and field mapping", "Confirm token source without asking the user to paste secrets into files", "Document Vercel readiness as guidance only; do not create `.vercel/`, run `vercel link` or add `vercel.json` until a real app/framework needs it", "Propose the project-sync update before writing", "Validate that sync-state remains secret-free"],
            outputs: ["GitHub readiness summary", "Missing configuration", "Proposed project-sync.yaml updates", "Token-source guidance", "Vercel readiness notes", "Next action for roadmap sync"],
            filesToUpdate: ["Update `../../../.github/leanos/project-sync.yaml` only after explicit confirmation.", "Update `../../../.github/leanos/sync-state.yaml` only with non-secret sync metadata."]
          },
          {
            slug: "configure-environments",
            title: "Configure Environments",
            purpose: "Plan environment boundaries and configuration without inventing project-specific infrastructure.",
            inputs: ["Product stage", "Runtime requirements", "Secrets or integration needs", "Deployment target"],
            steps: ["Identify required environments", "Define environment responsibilities", "List configuration needs", "Identify secrets and access boundaries", "Capture open questions"],
            outputs: ["Environment plan", "Configuration needs", "Access risks", "Open questions"],
            filesToUpdate: ["Update relevant DevOps notes or environment records if the workspace has them."]
          },
          {
            slug: "define-observability",
            title: "Define Observability",
            purpose: "Define runtime visibility for logs, metrics, alerts and traces.",
            inputs: ["Critical user flows", "Failure modes", "Runtime architecture", "Support needs"],
            steps: ["Identify critical signals", "Define logs and metrics", "Choose alert conditions", "Define incident visibility", "List observability gaps"],
            outputs: ["Observability plan", "Critical signals", "Alert candidates", "Instrumentation gaps", "Next action"],
            filesToUpdate: ["Update relevant DevOps notes or observability records if the workspace has them."]
          },
          {
            slug: "release-operations",
            title: "Release Operations",
            purpose: "Prepare a release-ready operational path.",
            inputs: ["Release scope", "CI/CD readiness", "Environment plan", "Deployment plan", "Observability plan"],
            steps: ["Check CI/CD readiness", "Confirm environment target", "Review deployment path", "Confirm observability checks", "Summarize release readiness"],
            outputs: ["Release readiness", "Blocking risks", "Rollback notes", "Post-release checks", "Next action"],
            filesToUpdate: ["Update relevant DevOps notes, release records or PR notes if the workspace has them."]
          }
        ],
        commonPaths: [
          "GitHub setup request: role `roles/github-devops.role.md` -> skill `skills/configure-github-project.skill.md` -> playbook `playbooks/configure-github-project.playbook.md`.",
          "Deployment request: role `roles/devops-engineer.role.md` -> skill `skills/plan-deployment.skill.md` -> playbook `playbooks/plan-deployment.playbook.md`.",
          "CI request: role `roles/devops-engineer.role.md` -> skill `skills/setup-ci.skill.md` -> playbook `playbooks/setup-ci-cd.playbook.md`.",
          "Observability request: role `roles/devops-engineer.role.md` -> skill `skills/define-observability.skill.md` -> playbook `playbooks/define-observability.playbook.md`."
        ]
      },
      {
        key: "operations.security",
        root: "operations",
        slug: "security",
        name: "Security",
        path: "operations/security",
        routingKey: "security",
        requestTypes: "security, privacy, access control, threat model or data protection",
        purpose: "Own security, privacy, access control and threat-modeling context.",
        whenToUse: ["review security risk", "define access control", "document data protection", "threat model a feature"],
        sourceOfTruth: ["threat-model.md", "data-protection.md", "access-control.md"],
        files: [
          { path: "threat-model.md", content: () => stateDraft("Threat Model", "Document assets, threats, trust boundaries and mitigations.") },
          { path: "data-protection.md", content: () => stateDraft("Data Protection", "Document sensitive data, retention and protection expectations.") },
          { path: "access-control.md", content: () => stateDraft("Access Control", "Define permissions, roles and access boundaries.") }
        ],
        roles: [
          {
            slug: "security-reviewer",
            title: "Security Reviewer",
            purpose: "Review product and implementation work for security and privacy risk.",
            useWhen: ["security risk is present", "user data is involved", "access control needs definition"],
            beforeActing: ["../threat-model.md", "../data-protection.md", "../access-control.md"],
            skills: ["threat-model", "review-security"],
            playbooks: ["security-review", "security-checklist"]
          }
        ],
        skills: [
          { slug: "threat-model", title: "Threat Model", purpose: "Identify threats, trust boundaries and mitigations." },
          { slug: "review-security", title: "Review Security", purpose: "Review a change or scope for security and privacy risk." }
        ],
        playbooks: [
          { slug: "security-review", title: "Security Review", purpose: "Review work against security expectations.", steps: ["Read threat model", "Check data protection", "Review access control", "Record risks"] },
          {
            slug: "security-checklist",
            title: "Security Checklist",
            purpose: "Run a lightweight security checklist as an executable review process.",
            inputs: ["Feature or change scope", "Threat model", "Data protection notes", "Access control notes"],
            steps: ["Check sensitive data exposure", "Check access boundaries", "Check threat mitigations", "Identify open security questions", "Record risks or required follow-up"],
            outputs: ["Checklist result", "Security risks", "Required follow-up", "Next action"],
            filesToUpdate: ["Update `../threat-model.md`, `../data-protection.md` or `../access-control.md` when new decisions are discovered."]
          }
        ],
        commonPaths: [
          "Security request: role `roles/security-reviewer.role.md` -> skill `skills/review-security.skill.md` -> playbook `playbooks/security-review.playbook.md`."
        ]
      }
    ],
    workflows: [
      {
        slug: "mvp-to-pr",
        purpose: "Coordinate Product Ops, Design and Engineering for delivery.",
        requiredAreas: ["product-ops", "engineering"],
        steps: ["Read MVP scope", "Check architecture", "Route UX if needed", "Plan implementation", "Prepare PR"]
      },
      {
        slug: "issue-delivery-cycle",
        purpose: "Coordinate Operations areas from issue interpretation to branch, implementation, review and PR.",
        requiredAreas: ["product-ops", "engineering"],
        steps: ["Read issue and MVP scope", "Route Design only when UX is affected", "Route Security only when data, auth, privacy, abuse or compliance is involved", "Create issue-linked branch", "Plan and implement in Engineering", "Run tests or explain gaps", "Run PR validation", "Prepare PR"]
      },
      {
        slug: "post-merge-continuation",
        purpose: "Continue delivery after a founder confirms a merge.",
        requiredAreas: ["product-ops", "engineering"],
        steps: ["Confirm merge evidence or founder confirmation", "Record relevant implementation notes", "Identify learning or roadmap impact if any", "Load the next issue", "Restart issue delivery"]
      }
    ]
  },
  {
    key: "growth",
    name: "Growth",
    purpose: "Own customer experience, marketing, launch and financial learning loops.",
    requestTypes: "customer experience, marketing, landing pages, launch, acquisition or finance",
    areas: [
      {
        key: "growth.customer-experience",
        root: "growth",
        slug: "customer-experience",
        name: "Customer Experience",
        path: "growth/customer-experience",
        routingKey: "customer_experience",
        requestTypes: "customer feedback, support, onboarding, retention or success moments",
        purpose: "Own customer learning loops, support notes and experience feedback.",
        whenToUse: ["capture customer feedback", "analyze support notes", "understand churn", "document success moments"],
        sourceOfTruth: ["customer-feedback.md", "support-notes.md", "churn-reasons.md", "success-moments.md"],
        files: [
          { path: "customer-feedback.md", content: () => titledDraft("Customer Feedback", "Capture customer feedback and requests.") },
          { path: "support-notes.md", content: () => titledDraft("Support Notes", "Document support patterns and unresolved issues.") },
          { path: "churn-reasons.md", content: () => titledDraft("Churn Reasons", "Capture why users leave or disengage.") },
          { path: "success-moments.md", content: () => titledDraft("Success Moments", "Document when customers get value.") }
        ],
        roles: [
          {
            slug: "cx-lead",
            title: "Customer Experience Lead",
            purpose: "Turn customer signals into product and growth learning.",
            useWhen: ["customer feedback is involved", "support patterns need synthesis", "retention questions arise"],
            beforeActing: ["../customer-feedback.md", "../support-notes.md", "../churn-reasons.md", "../success-moments.md"],
            skills: ["map-customer-feedback", "synthesize-support-patterns"],
            playbooks: ["customer-learning-loop"]
          }
        ],
        skills: [
          { slug: "map-customer-feedback", title: "Map Customer Feedback", purpose: "Cluster feedback into product, support and growth signals." },
          { slug: "synthesize-support-patterns", title: "Synthesize Support Patterns", purpose: "Turn support notes into learning and actions." }
        ],
        playbooks: [
          { slug: "customer-learning-loop", title: "Customer Learning Loop", purpose: "Turn customer experience signals into next actions.", steps: ["Read feedback", "Cluster support patterns", "Identify friction", "Recommend product or growth follow-up"] }
        ],
        commonPaths: [
          "Customer experience request: role `roles/cx-lead.role.md` -> skill `skills/map-customer-feedback.skill.md` -> playbook `playbooks/customer-learning-loop.playbook.md`."
        ]
      },
      {
        key: "growth.marketing",
        root: "growth",
        slug: "marketing",
        name: "Marketing",
        path: "growth/marketing",
        routingKey: "marketing",
        requestTypes: "positioning, landing page, launch, acquisition or marketing",
        purpose: "Own positioning, landing page copy, acquisition channels and launch loops.",
        whenToUse: ["define positioning", "write landing page copy", "plan launch", "choose acquisition channels"],
        sourceOfTruth: ["positioning.md", "landing-page.md", "acquisition-channels.md", "launch-plan.md"],
        files: [
          { path: "positioning.md", content: () => titledDraft("Positioning", "Define market-facing positioning.") },
          { path: "landing-page.md", content: () => titledDraft("Landing Page", "Draft landing page message and conversion goal.") },
          { path: "acquisition-channels.md", content: () => titledDraft("Acquisition Channels", "List channels and first experiments.") },
          { path: "launch-plan.md", content: () => titledDraft("Launch Plan", "Plan launch actions and learning loops.") }
        ],
        roles: [
          {
            slug: "growth-lead",
            title: "Growth Lead",
            purpose: "Translate product strategy into positioning, launch and acquisition experiments.",
            useWhen: ["growth, positioning, landing pages, acquisition or launch is involved"],
            beforeActing: ["../positioning.md", "../landing-page.md", "../acquisition-channels.md", "../launch-plan.md"],
            skills: ["define-positioning", "create-landing-page-copy", "create-launch-plan"],
            playbooks: ["mvp-launch"]
          }
        ],
        skills: [
          { slug: "define-positioning", title: "Define Positioning", purpose: "Define category, audience, promise and differentiation." },
          { slug: "create-landing-page-copy", title: "Create Landing Page Copy", purpose: "Draft clear copy for the first validation or launch page." },
          { slug: "create-launch-plan", title: "Create Launch Plan", purpose: "Plan launch actions, channels and learning loops." }
        ],
        playbooks: [
          { slug: "mvp-launch", title: "MVP Launch", purpose: "Launch the MVP into a focused learning loop.", steps: ["Read positioning", "Draft landing page", "Choose channels", "Plan launch", "Capture results"] }
        ],
        commonPaths: [
          "Launch request: role `roles/growth-lead.role.md` -> skill `skills/create-launch-plan.skill.md` -> playbook `playbooks/mvp-launch.playbook.md`."
        ]
      },
      {
        key: "growth.finance",
        root: "growth",
        slug: "finance",
        name: "Finance",
        path: "growth/finance",
        routingKey: "finance",
        requestTypes: "pricing, revenue model, budget, unit economics or finance",
        purpose: "Own pricing, revenue model, unit economics, budget and financial risks.",
        whenToUse: ["define pricing", "review unit economics", "track budget", "reason about revenue model"],
        sourceOfTruth: ["pricing.md", "revenue-model.md", "unit-economics.md", "budget.md", "finance-risks.md"],
        files: [
          { path: "pricing.md", content: () => titledDraft("Pricing", "Document pricing hypotheses and packaging.") },
          { path: "revenue-model.md", content: () => titledDraft("Revenue Model", "Define revenue streams and assumptions.") },
          { path: "unit-economics.md", content: () => titledDraft("Unit Economics", "Track acquisition, delivery and margin assumptions.") },
          { path: "budget.md", content: () => titledDraft("Budget", "Track planned spend and constraints.") },
          { path: "finance-risks.md", content: () => titledDraft("Finance Risks", "Capture risks around pricing, runway and unit economics.") }
        ],
        roles: [
          {
            slug: "finance-operator",
            title: "Finance Operator",
            purpose: "Reason about pricing, unit economics, budget and revenue assumptions.",
            useWhen: ["pricing or revenue model is involved", "budget risk needs review", "unit economics are unclear"],
            beforeActing: ["../pricing.md", "../revenue-model.md", "../unit-economics.md", "../budget.md"],
            skills: ["model-unit-economics", "review-pricing"],
            playbooks: ["finance-review"]
          }
        ],
        skills: [
          { slug: "model-unit-economics", title: "Model Unit Economics", purpose: "Clarify acquisition, delivery and margin assumptions." },
          { slug: "review-pricing", title: "Review Pricing", purpose: "Evaluate pricing hypotheses against customer value and costs." }
        ],
        playbooks: [
          { slug: "finance-review", title: "Finance Review", purpose: "Review business assumptions and financial risk.", steps: ["Read pricing", "Review revenue model", "Check unit economics", "Record risks"] }
        ],
        commonPaths: [
          "Finance request: role `roles/finance-operator.role.md` -> skill `skills/model-unit-economics.skill.md` -> playbook `playbooks/finance-review.playbook.md`."
        ]
      }
    ],
    workflows: [
      {
        slug: "launch-learning-loop",
        purpose: "Coordinate marketing, customer experience and finance after launch.",
        requiredAreas: ["marketing", "customer-experience"],
        steps: ["Read positioning", "Plan launch", "Capture customer feedback", "Review finance assumptions", "Recommend next learning loop"]
      }
    ]
  }
];
