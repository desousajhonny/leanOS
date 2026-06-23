# Client Workspace Tree

Generated from the real LeanOS CLI workspace template.

Do not edit `examples/client-workspace/` manually. Run `npm run generate:client-workspace` from the project root instead.

```text
client-workspace/
|-- .github/
|   |-- agents/
|   |   `-- leanos-chief.agent.md
|   |-- ISSUE_TEMPLATE/
|   |   |-- bug.yml
|   |   |-- epic.yml
|   |   |-- experiment.yml
|   |   |-- feature.yml
|   |   |-- research.yml
|   |   |-- task.yml
|   |   `-- validation.yml
|   |-- leanos/
|   |   |-- branch-rules.md
|   |   |-- github-settings.example.json
|   |   |-- labels.yaml
|   |   |-- pr-validation-rules.md
|   |   |-- project-sync.yaml
|   |   |-- README.md
|   |   |-- security-automation.md
|   |   `-- sync-state.yaml
|   |-- prompts/
|   |   |-- leanos-init.prompt.md
|   |   `-- start-leanos.prompt.md
|   |-- workflows/
|   |   `-- pr-validation.yml
|   |-- copilot-instructions.md
|   `-- PULL_REQUEST_TEMPLATE.md
|-- .leanos/
|   |-- agent/
|   |   |-- protocols/
|   |   |   |-- README.md
|   |   |   `-- where-we-are.md
|   |   |-- chief-agent.md
|   |   |-- context-loading.md
|   |   |-- operating-rules.md
|   |   |-- output-standards.md
|   |   |-- README.md
|   |   `-- role-activation.md
|   |-- commands/
|   |   |-- check-coherence.md
|   |   |-- create-branch.md
|   |   |-- create-issues.md
|   |   |-- create-playbook.md
|   |   |-- create-pr.md
|   |   |-- create-roadmap.md
|   |   |-- create-role.md
|   |   |-- create-skill-role-playbook.md
|   |   |-- create-skill.md
|   |   |-- define-design.md
|   |   |-- define-icp.md
|   |   |-- define-mvp.md
|   |   |-- README.md
|   |   |-- review-pr.md
|   |   |-- start-leanos.md
|   |   |-- status.md
|   |   `-- workon-issue.md
|   |-- context/
|   |   |-- active-workflow.md
|   |   |-- current-focus.md
|   |   |-- decision-index.md
|   |   |-- next-actions.md
|   |   |-- README.md
|   |   `-- workspace-summary.md
|   |-- index/
|   |   |-- areas.yaml
|   |   |-- departments.yaml
|   |   |-- playbooks.yaml
|   |   |-- README.md
|   |   |-- roles.yaml
|   |   |-- routing-map.yaml
|   |   |-- skills.yaml
|   |   `-- workflows.yaml
|   |-- vscode/
|   |   `-- README.md
|   `-- README.md
|-- ai-standard/
|   |-- checklists/
|   |   |-- agent-quality-checklist.md
|   |   |-- area-quality-checklist.md
|   |   |-- command-quality-checklist.md
|   |   |-- department-quality-checklist.md
|   |   |-- playbook-quality-checklist.md
|   |   |-- readme-quality-checklist.md
|   |   |-- README.md
|   |   |-- role-quality-checklist.md
|   |   |-- skill-quality-checklist.md
|   |   `-- workflow-quality-checklist.md
|   |-- examples/
|   |   |-- agents/
|   |   |   |-- example-area-agent.md
|   |   |   |-- example-root-agent.md
|   |   |   `-- README.md
|   |   |-- commands/
|   |   |   |-- example-command-define-design.md
|   |   |   `-- README.md
|   |   |-- execution/
|   |   |   |-- example-playbook-issue-to-pr.md
|   |   |   |-- example-role-senior-developer.md
|   |   |   |-- example-skill-check-coherence.md
|   |   |   |-- example-workflow-issue-delivery-cycle.md
|   |   |   `-- README.md
|   |   |-- github/
|   |   |   |-- example-github-epic.md
|   |   |   |-- example-github-feature.md
|   |   |   |-- example-pull-request.md
|   |   |   `-- README.md
|   |   |-- review/
|   |   |   |-- example-code-review.md
|   |   |   `-- README.md
|   |   |-- structure/
|   |   |   |-- example-area-readme.md
|   |   |   |-- example-folder-readme.md
|   |   |   `-- README.md
|   |   `-- README.md
|   |-- foundation/
|   |   |-- asset-taxonomy.md
|   |   |-- creation-rules.md
|   |   |-- folder-documentation-rules.md
|   |   |-- guided-conversation.md
|   |   |-- naming-conventions.md
|   |   |-- navigation-chain.md
|   |   |-- quality-criteria.md
|   |   `-- README.md
|   |-- instructions/
|   |   |-- create-agent-instructions.md
|   |   |-- create-area-instructions.md
|   |   |-- create-command-instructions.md
|   |   |-- create-department-instructions.md
|   |   |-- create-playbook-instructions.md
|   |   |-- create-readme-instructions.md
|   |   |-- create-role-instructions.md
|   |   |-- create-skill-instructions.md
|   |   |-- create-workflow-instructions.md
|   |   `-- README.md
|   |-- templates/
|   |   |-- agents/
|   |   |   |-- agent-template.md
|   |   |   |-- area-agent-template.md
|   |   |   |-- department-agent-template.md
|   |   |   |-- README.md
|   |   |   `-- root-agent-template.md
|   |   |-- commands/
|   |   |   |-- command-template.md
|   |   |   `-- README.md
|   |   |-- execution/
|   |   |   |-- playbook-template.md
|   |   |   |-- playbook-template.yaml
|   |   |   |-- README.md
|   |   |   |-- role-template.md
|   |   |   |-- role-template.yaml
|   |   |   |-- skill-template.md
|   |   |   |-- skill-template.yaml
|   |   |   `-- workflow-template.md
|   |   |-- github/
|   |   |   |-- branch-name-template.md
|   |   |   |-- delivery-readiness-matrix-template.md
|   |   |   |-- github-epic-template.md
|   |   |   |-- github-feature-template.md
|   |   |   |-- github-issue-template.md
|   |   |   |-- pull-request-template.md
|   |   |   `-- README.md
|   |   |-- product/
|   |   |   |-- epic-template.md
|   |   |   |-- feature-template.md
|   |   |   `-- README.md
|   |   |-- review/
|   |   |   |-- code-review-template.md
|   |   |   `-- README.md
|   |   |-- structure/
|   |   |   |-- area-readme-template.md
|   |   |   |-- area-template.md
|   |   |   |-- area-template.yaml
|   |   |   |-- department-template.md
|   |   |   |-- department-template.yaml
|   |   |   |-- folder-readme-template.md
|   |   |   |-- README.md
|   |   |   `-- root-readme-template.md
|   |   `-- README.md
|   `-- README.md
|-- growth/
|   |-- customer-experience/
|   |   |-- knowledge/
|   |   |   |-- churn-reasons.md
|   |   |   |-- customer-feedback.md
|   |   |   |-- README.md
|   |   |   |-- success-moments.md
|   |   |   `-- support-notes.md
|   |   |-- playbooks/
|   |   |   |-- customer-learning-loop.playbook.md
|   |   |   `-- README.md
|   |   |-- roles/
|   |   |   |-- cx-lead.role.md
|   |   |   `-- README.md
|   |   |-- skills/
|   |   |   |-- map-customer-feedback.skill.md
|   |   |   |-- README.md
|   |   |   `-- synthesize-support-patterns.skill.md
|   |   |-- AGENT.md
|   |   |-- area.yaml
|   |   `-- README.md
|   |-- finance/
|   |   |-- knowledge/
|   |   |   |-- budget.md
|   |   |   |-- finance-risks.md
|   |   |   |-- pricing.md
|   |   |   |-- README.md
|   |   |   |-- revenue-model.md
|   |   |   `-- unit-economics.md
|   |   |-- playbooks/
|   |   |   |-- finance-review.playbook.md
|   |   |   `-- README.md
|   |   |-- roles/
|   |   |   |-- finance-operator.role.md
|   |   |   `-- README.md
|   |   |-- skills/
|   |   |   |-- model-unit-economics.skill.md
|   |   |   |-- README.md
|   |   |   `-- review-pricing.skill.md
|   |   |-- AGENT.md
|   |   |-- area.yaml
|   |   `-- README.md
|   |-- marketing/
|   |   |-- knowledge/
|   |   |   |-- acquisition-channels.md
|   |   |   |-- landing-page.md
|   |   |   |-- launch-plan.md
|   |   |   |-- positioning.md
|   |   |   `-- README.md
|   |   |-- playbooks/
|   |   |   |-- mvp-launch.playbook.md
|   |   |   `-- README.md
|   |   |-- roles/
|   |   |   |-- growth-lead.role.md
|   |   |   `-- README.md
|   |   |-- skills/
|   |   |   |-- create-landing-page-copy.skill.md
|   |   |   |-- create-launch-plan.skill.md
|   |   |   |-- define-positioning.skill.md
|   |   |   `-- README.md
|   |   |-- AGENT.md
|   |   |-- area.yaml
|   |   `-- README.md
|   |-- workflows/
|   |   |-- launch-learning-loop.workflow.md
|   |   `-- README.md
|   |-- AGENT.md
|   |-- department.yaml
|   `-- README.md
|-- operations/
|   |-- design/
|   |   |-- knowledge/
|   |   |   |-- accessibility.md
|   |   |   |-- design-system.md
|   |   |   |-- README.md
|   |   |   `-- user-flows.md
|   |   |-- playbooks/
|   |   |   |-- accessibility-review.playbook.md
|   |   |   |-- design-foundation.playbook.md
|   |   |   |-- mvp-ux-flow.playbook.md
|   |   |   |-- README.md
|   |   |   |-- user-research.playbook.md
|   |   |   `-- ux-writing.playbook.md
|   |   |-- roles/
|   |   |   |-- accessibility-specialist.role.md
|   |   |   |-- product-designer.role.md
|   |   |   |-- README.md
|   |   |   |-- ux-researcher.role.md
|   |   |   `-- ux-writer.role.md
|   |   |-- skills/
|   |   |   |-- accessibility.skill.md
|   |   |   |-- design-review.skill.md
|   |   |   |-- design-system.skill.md
|   |   |   |-- microcopy.skill.md
|   |   |   |-- README.md
|   |   |   |-- screen-specification.skill.md
|   |   |   |-- user-flow-mapping.skill.md
|   |   |   `-- user-research.skill.md
|   |   |-- AGENT.md
|   |   |-- area.yaml
|   |   `-- README.md
|   |-- devops/
|   |   |-- knowledge/
|   |   |   |-- ci-cd.md
|   |   |   |-- deployment-readiness.md
|   |   |   |-- environments.md
|   |   |   |-- github-management.md
|   |   |   |-- observability.md
|   |   |   |-- README.md
|   |   |   `-- release-notes.md
|   |   |-- playbooks/
|   |   |   |-- configure-environments.playbook.md
|   |   |   |-- configure-github-project.playbook.md
|   |   |   |-- define-observability.playbook.md
|   |   |   |-- plan-deployment.playbook.md
|   |   |   |-- README.md
|   |   |   |-- release-operations.playbook.md
|   |   |   `-- setup-ci-cd.playbook.md
|   |   |-- roles/
|   |   |   |-- devops-engineer.role.md
|   |   |   |-- github-devops.role.md
|   |   |   |-- README.md
|   |   |   `-- release-manager.role.md
|   |   |-- skills/
|   |   |   |-- configure-environments.skill.md
|   |   |   |-- configure-github-project.skill.md
|   |   |   |-- define-observability.skill.md
|   |   |   |-- plan-deployment.skill.md
|   |   |   |-- prepare-release.skill.md
|   |   |   |-- README.md
|   |   |   `-- setup-ci.skill.md
|   |   |-- AGENT.md
|   |   |-- area.yaml
|   |   `-- README.md
|   |-- engineering/
|   |   |-- knowledge/
|   |   |   |-- code-review-notes.md
|   |   |   |-- code-standards.md
|   |   |   |-- component-guidelines.md
|   |   |   |-- data-guidelines.md
|   |   |   |-- implementation-notes.md
|   |   |   |-- implementation-rules.md
|   |   |   |-- pr-log.md
|   |   |   |-- README.md
|   |   |   |-- review-criteria.md
|   |   |   `-- testing-strategy.md
|   |   |-- playbooks/
|   |   |   |-- branch-from-issue.playbook.md
|   |   |   |-- issue-to-pr.playbook.md
|   |   |   |-- pr-validation.playbook.md
|   |   |   |-- README.md
|   |   |   `-- test-planning.playbook.md
|   |   |-- roles/
|   |   |   |-- pr-reviewer.role.md
|   |   |   |-- README.md
|   |   |   |-- senior-developer.role.md
|   |   |   `-- test-engineer.role.md
|   |   |-- skills/
|   |   |   |-- create-branch.skill.md
|   |   |   |-- create-pr.skill.md
|   |   |   |-- follow-code-standards.skill.md
|   |   |   |-- plan-implementation.skill.md
|   |   |   |-- README.md
|   |   |   |-- review-data-change.skill.md
|   |   |   |-- review-pr.skill.md
|   |   |   `-- write-tests.skill.md
|   |   |-- AGENT.md
|   |   |-- area.yaml
|   |   `-- README.md
|   |-- product-ops/
|   |   |-- epics/
|   |   |   `-- README.md
|   |   |-- knowledge/
|   |   |   |-- delivery-context.md
|   |   |   |-- delivery-scope.md
|   |   |   |-- issue-readiness.md
|   |   |   |-- overview.md
|   |   |   |-- README.md
|   |   |   |-- ready-to-develop.md
|   |   |   |-- technical-decisions.md
|   |   |   `-- work-taxonomy.md
|   |   |-- mvp/
|   |   |   |-- acceptance-criteria.md
|   |   |   |-- non-goals.md
|   |   |   |-- prd.md
|   |   |   |-- README.md
|   |   |   |-- release-checklist.md
|   |   |   |-- scope.md
|   |   |   |-- user-flows.md
|   |   |   `-- user-stories.md
|   |   |-- playbooks/
|   |   |   |-- delivery-readiness.playbook.md
|   |   |   |-- delivery-scope-planning.playbook.md
|   |   |   |-- epic-to-features.playbook.md
|   |   |   |-- mvp-delivery.playbook.md
|   |   |   `-- README.md
|   |   |-- roles/
|   |   |   |-- delivery-architect.role.md
|   |   |   |-- product-owner.role.md
|   |   |   `-- README.md
|   |   |-- skills/
|   |   |   |-- check-delivery-coherence.skill.md
|   |   |   |-- define-delivery-boundaries.skill.md
|   |   |   |-- define-delivery-scope.skill.md
|   |   |   |-- define-mvp.skill.md
|   |   |   |-- README.md
|   |   |   |-- shape-epic.skill.md
|   |   |   |-- write-acceptance-criteria.skill.md
|   |   |   `-- write-feature-criteria.skill.md
|   |   |-- AGENT.md
|   |   |-- area.yaml
|   |   `-- README.md
|   |-- security/
|   |   |-- knowledge/
|   |   |   |-- access-control.md
|   |   |   |-- data-protection.md
|   |   |   |-- database-security.md
|   |   |   |-- incident-response.md
|   |   |   |-- infra-hardening.md
|   |   |   |-- README.md
|   |   |   |-- secrets-management.md
|   |   |   |-- secure-coding.md
|   |   |   |-- security-automation.md
|   |   |   |-- security-baseline.md
|   |   |   `-- threat-model.md
|   |   |-- playbooks/
|   |   |   |-- ai-generated-code-security-review.playbook.md
|   |   |   |-- api-security-review.playbook.md
|   |   |   |-- database-security-review.playbook.md
|   |   |   |-- incident-response.playbook.md
|   |   |   |-- pre-deploy-security-review.playbook.md
|   |   |   |-- pre-mvp-security-checklist.playbook.md
|   |   |   |-- README.md
|   |   |   |-- secrets-rotation.playbook.md
|   |   |   |-- security-automation-readiness.playbook.md
|   |   |   |-- security-foundation.playbook.md
|   |   |   `-- vulnerability-response.playbook.md
|   |   |-- roles/
|   |   |   |-- application-security-engineer.role.md
|   |   |   |-- cloud-security-reviewer.role.md
|   |   |   |-- data-protection-reviewer.role.md
|   |   |   |-- README.md
|   |   |   `-- security-reviewer.role.md
|   |   |-- skills/
|   |   |   |-- access-control-review.skill.md
|   |   |   |-- ai-generated-code-security.skill.md
|   |   |   |-- api-security-review.skill.md
|   |   |   |-- database-security-review.skill.md
|   |   |   |-- dependency-supply-chain-review.skill.md
|   |   |   |-- incident-response.skill.md
|   |   |   |-- infra-hardening-review.skill.md
|   |   |   |-- README.md
|   |   |   |-- secrets-management.skill.md
|   |   |   |-- secure-code-review.skill.md
|   |   |   |-- security-automation-readiness.skill.md
|   |   |   `-- threat-modeling.skill.md
|   |   |-- AGENT.md
|   |   |-- area.yaml
|   |   `-- README.md
|   |-- workflows/
|   |   |-- delivery-scope-to-epic.workflow.md
|   |   |-- issue-delivery-cycle.workflow.md
|   |   |-- mvp-to-pr.workflow.md
|   |   |-- post-merge-continuation.workflow.md
|   |   |-- README.md
|   |   `-- roadmap-item-to-delivery-scope.workflow.md
|   |-- AGENT.md
|   |-- department.yaml
|   `-- README.md
|-- strategy/
|   |-- business/
|   |   |-- knowledge/
|   |   |   |-- decision-log.md
|   |   |   |-- mission.md
|   |   |   |-- operating-model.md
|   |   |   |-- principles.md
|   |   |   |-- profile.md
|   |   |   |-- README.md
|   |   |   `-- vision.md
|   |   |-- playbooks/
|   |   |   |-- business-foundation.playbook.md
|   |   |   `-- README.md
|   |   |-- roles/
|   |   |   |-- business-strategist.role.md
|   |   |   `-- README.md
|   |   |-- skills/
|   |   |   |-- clarify-operating-model.skill.md
|   |   |   |-- define-business-identity.skill.md
|   |   |   `-- README.md
|   |   |-- AGENT.md
|   |   |-- area.yaml
|   |   `-- README.md
|   |-- product/
|   |   |-- knowledge/
|   |   |   |-- brief.md
|   |   |   |-- business-model-canvas.md
|   |   |   |-- icp.md
|   |   |   |-- jobs-to-be-done.md
|   |   |   |-- positioning.md
|   |   |   |-- problem.md
|   |   |   |-- README.md
|   |   |   |-- validation-notes.md
|   |   |   `-- value-proposition.md
|   |   |-- playbooks/
|   |   |   |-- product-strategy.playbook.md
|   |   |   `-- README.md
|   |   |-- roles/
|   |   |   |-- product-manager.role.md
|   |   |   |-- product-strategist.role.md
|   |   |   `-- README.md
|   |   |-- skills/
|   |   |   |-- check-coherence.skill.md
|   |   |   |-- define-business-model.skill.md
|   |   |   |-- define-icp.skill.md
|   |   |   |-- define-product.skill.md
|   |   |   |-- define-value-proposition.skill.md
|   |   |   |-- evaluate-idea.skill.md
|   |   |   `-- README.md
|   |   |-- AGENT.md
|   |   |-- area.yaml
|   |   `-- README.md
|   |-- roadmap/
|   |   |-- knowledge/
|   |   |   |-- backlog.md
|   |   |   |-- current-cycle.md
|   |   |   |-- milestones.md
|   |   |   |-- README.md
|   |   |   `-- roadmap.md
|   |   |-- playbooks/
|   |   |   |-- README.md
|   |   |   |-- roadmap-cycle-planning.playbook.md
|   |   |   `-- roadmap-sync-prep.playbook.md
|   |   |-- roles/
|   |   |   |-- README.md
|   |   |   `-- roadmap-planner.role.md
|   |   |-- skills/
|   |   |   |-- create-roadmap.skill.md
|   |   |   |-- prepare-roadmap-sync.skill.md
|   |   |   |-- prioritize-backlog.skill.md
|   |   |   `-- README.md
|   |   |-- AGENT.md
|   |   |-- area.yaml
|   |   `-- README.md
|   |-- workflows/
|   |   |-- idea-to-roadmap.workflow.md
|   |   |-- new-idea-intake.workflow.md
|   |   |-- README.md
|   |   `-- roadmap-to-github-project.workflow.md
|   |-- AGENT.md
|   |-- department.yaml
|   `-- README.md
|-- .env.local
|-- .gitignore
|-- AGENT.md
|-- leanos.yaml
`-- README.md
```
