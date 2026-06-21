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
|   |   |-- chief-agent.md
|   |   |-- context-loading.md
|   |   |-- operating-rules.md
|   |   |-- output-standards.md
|   |   |-- README.md
|   |   `-- role-activation.md
|   |-- commands/
|   |   |-- check-coherence.md
|   |   |-- create-issues.md
|   |   |-- create-playbook.md
|   |   |-- create-pr.md
|   |   |-- create-roadmap.md
|   |   |-- create-role.md
|   |   |-- create-skill-role-playbook.md
|   |   |-- create-skill.md
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
|   |-- workflows/
|   |   |-- issue-to-pr.workflow.md
|   |   |-- launch-and-learn.workflow.md
|   |   |-- new-product-mvp-validation.workflow.md
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
|   |   `-- skill-quality-checklist.md
|   |-- examples/
|   |   |-- example-agent.md
|   |   |-- example-folder-readme.md
|   |   |-- example-playbook-issue-to-pr.md
|   |   |-- example-role-senior-developer.md
|   |   |-- example-skill-check-coherence.md
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
|   |   |-- agent-template.md
|   |   |-- area-template.md
|   |   |-- area-template.yaml
|   |   |-- command-template.md
|   |   |-- department-template.md
|   |   |-- department-template.yaml
|   |   |-- folder-readme-template.md
|   |   |-- github-issue-template.md
|   |   |-- playbook-template.md
|   |   |-- playbook-template.yaml
|   |   |-- README.md
|   |   |-- role-template.md
|   |   |-- role-template.yaml
|   |   |-- root-readme-template.md
|   |   |-- skill-template.md
|   |   |-- skill-template.yaml
|   |   `-- workflow-template.md
|   |-- creation-rules.md
|   |-- folder-readme-rules.md
|   |-- naming-conventions.md
|   |-- navigation-chain.md
|   |-- quality-criteria.md
|   `-- README.md
|-- growth/
|   |-- customer-experience/
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
|   |   |-- area.yaml
|   |   |-- churn-reasons.md
|   |   |-- customer-feedback.md
|   |   |-- README.md
|   |   |-- success-moments.md
|   |   `-- support-notes.md
|   |-- finance/
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
|   |   |-- area.yaml
|   |   |-- budget.md
|   |   |-- finance-risks.md
|   |   |-- pricing.md
|   |   |-- README.md
|   |   |-- revenue-model.md
|   |   `-- unit-economics.md
|   |-- marketing/
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
|   |   |-- acquisition-channels.md
|   |   |-- area.yaml
|   |   |-- landing-page.md
|   |   |-- launch-plan.md
|   |   |-- positioning.md
|   |   `-- README.md
|   |-- workflows/
|   |   |-- launch-learning-loop.workflow.md
|   |   `-- README.md
|   |-- AGENT.md
|   |-- department.yaml
|   `-- README.md
|-- operations/
|   |-- core/
|   |   |-- mvp/
|   |   |   |-- acceptance-criteria.md
|   |   |   |-- non-goals.md
|   |   |   |-- README.md
|   |   |   |-- release-checklist.md
|   |   |   |-- scope.md
|   |   |   |-- user-flows.md
|   |   |   `-- user-stories.md
|   |   |-- playbooks/
|   |   |   |-- architecture-planning.playbook.md
|   |   |   |-- mvp-delivery.playbook.md
|   |   |   `-- README.md
|   |   |-- roles/
|   |   |   |-- product-owner.role.md
|   |   |   |-- README.md
|   |   |   `-- technical-architect.role.md
|   |   |-- skills/
|   |   |   |-- check-delivery-coherence.skill.md
|   |   |   |-- create-api-contract.skill.md
|   |   |   |-- define-architecture.skill.md
|   |   |   |-- define-mvp.skill.md
|   |   |   |-- README.md
|   |   |   `-- write-acceptance-criteria.skill.md
|   |   |-- ai-capabilities.md
|   |   |-- api-contract.md
|   |   |-- area.yaml
|   |   |-- data-model.md
|   |   |-- integrations.md
|   |   |-- overview.md
|   |   |-- prompt-architecture.md
|   |   |-- README.md
|   |   |-- system-context.md
|   |   `-- technical-decisions.md
|   |-- design/
|   |   |-- playbooks/
|   |   |   |-- mvp-ux-flow.playbook.md
|   |   |   `-- README.md
|   |   |-- roles/
|   |   |   |-- README.md
|   |   |   `-- ux-lead.role.md
|   |   |-- skills/
|   |   |   |-- create-screen-spec.skill.md
|   |   |   |-- define-ux-states.skill.md
|   |   |   |-- map-user-flow.skill.md
|   |   |   `-- README.md
|   |   |-- area.yaml
|   |   |-- design-principles.md
|   |   |-- README.md
|   |   |-- screen-specs.md
|   |   |-- usability-notes.md
|   |   |-- user-flows.md
|   |   `-- ux-decisions.md
|   |-- devops/
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
|   |   |   `-- README.md
|   |   |-- skills/
|   |   |   |-- configure-github-project.skill.md
|   |   |   |-- define-observability.skill.md
|   |   |   |-- plan-deployment.skill.md
|   |   |   |-- README.md
|   |   |   `-- setup-ci.skill.md
|   |   |-- area.yaml
|   |   `-- README.md
|   |-- engineering/
|   |   |-- playbooks/
|   |   |   |-- issue-to-pr.playbook.md
|   |   |   |-- pr-validation.playbook.md
|   |   |   |-- README.md
|   |   |   `-- test-planning.playbook.md
|   |   |-- roles/
|   |   |   |-- pr-reviewer.role.md
|   |   |   |-- README.md
|   |   |   `-- senior-developer.role.md
|   |   |-- skills/
|   |   |   |-- create-pr.skill.md
|   |   |   |-- plan-implementation.skill.md
|   |   |   |-- README.md
|   |   |   |-- review-pr.skill.md
|   |   |   `-- write-tests.skill.md
|   |   |-- area.yaml
|   |   |-- code-review-notes.md
|   |   |-- implementation-notes.md
|   |   |-- pr-log.md
|   |   `-- README.md
|   |-- security/
|   |   |-- playbooks/
|   |   |   |-- README.md
|   |   |   |-- security-checklist.playbook.md
|   |   |   `-- security-review.playbook.md
|   |   |-- roles/
|   |   |   |-- README.md
|   |   |   `-- security-reviewer.role.md
|   |   |-- skills/
|   |   |   |-- README.md
|   |   |   |-- review-security.skill.md
|   |   |   `-- threat-model.skill.md
|   |   |-- access-control.md
|   |   |-- area.yaml
|   |   |-- data-protection.md
|   |   |-- README.md
|   |   `-- threat-model.md
|   |-- workflows/
|   |   |-- mvp-to-pr.workflow.md
|   |   `-- README.md
|   |-- AGENT.md
|   |-- department.yaml
|   `-- README.md
|-- strategy/
|   |-- company/
|   |   |-- playbooks/
|   |   |   |-- company-foundation.playbook.md
|   |   |   `-- README.md
|   |   |-- roles/
|   |   |   |-- company-strategist.role.md
|   |   |   `-- README.md
|   |   |-- skills/
|   |   |   |-- clarify-operating-model.skill.md
|   |   |   |-- define-company.skill.md
|   |   |   `-- README.md
|   |   |-- area.yaml
|   |   |-- decision-log.md
|   |   |-- mission.md
|   |   |-- operating-model.md
|   |   |-- principles.md
|   |   |-- profile.md
|   |   |-- README.md
|   |   `-- vision.md
|   |-- product/
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
|   |   |   `-- README.md
|   |   |-- area.yaml
|   |   |-- brief.md
|   |   |-- business-model-canvas.md
|   |   |-- icp.md
|   |   |-- jobs-to-be-done.md
|   |   |-- positioning.md
|   |   |-- problem.md
|   |   |-- README.md
|   |   `-- value-proposition.md
|   |-- roadmap/
|   |   |-- playbooks/
|   |   |   |-- README.md
|   |   |   `-- validation-cycle-planning.playbook.md
|   |   |-- roles/
|   |   |   |-- README.md
|   |   |   `-- roadmap-planner.role.md
|   |   |-- skills/
|   |   |   |-- create-roadmap.skill.md
|   |   |   |-- prioritize-backlog.skill.md
|   |   |   `-- README.md
|   |   |-- area.yaml
|   |   |-- backlog.md
|   |   |-- current-cycle.md
|   |   |-- milestones.md
|   |   |-- README.md
|   |   `-- roadmap.md
|   |-- validation/
|   |   |-- playbooks/
|   |   |   |-- mvp-validation.playbook.md
|   |   |   `-- README.md
|   |   |-- roles/
|   |   |   |-- README.md
|   |   |   `-- validation-researcher.role.md
|   |   |-- skills/
|   |   |   |-- create-interview-script.skill.md
|   |   |   |-- define-assumptions.skill.md
|   |   |   |-- define-success-metrics.skill.md
|   |   |   `-- README.md
|   |   |-- area.yaml
|   |   |-- assumptions.md
|   |   |-- experiments.md
|   |   |-- interview-script.md
|   |   |-- learning-log.md
|   |   |-- README.md
|   |   |-- riskiest-assumptions.md
|   |   `-- success-metrics.md
|   |-- workflows/
|   |   |-- README.md
|   |   `-- strategy-validation-cycle.workflow.md
|   |-- AGENT.md
|   |-- department.yaml
|   `-- README.md
|-- .env.example
|-- .env.local
|-- .gitignore
|-- AGENT.md
|-- leanos.yaml
`-- README.md
```
