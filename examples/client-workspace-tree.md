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
|   |   |-- labels.yaml
|   |   |-- pr-validation-rules.md
|   |   |-- project-sync.yaml
|   |   `-- README.md
|   |-- prompts/
|   |   `-- leanos-init.prompt.md
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
|   |-- ai-standard/
|   |   |-- checklists/
|   |   |   |-- agent-quality-checklist.md
|   |   |   |-- command-quality-checklist.md
|   |   |   |-- department-quality-checklist.md
|   |   |   |-- playbook-quality-checklist.md
|   |   |   |-- readme-quality-checklist.md
|   |   |   |-- README.md
|   |   |   |-- role-quality-checklist.md
|   |   |   `-- skill-quality-checklist.md
|   |   |-- examples/
|   |   |   |-- example-agent.md
|   |   |   |-- example-folder-readme.md
|   |   |   |-- example-playbook-issue-to-pr.md
|   |   |   |-- example-role-senior-developer.md
|   |   |   |-- example-role-ux-lead.md
|   |   |   |-- example-skill-check-coherence.md
|   |   |   |-- example-skill-create-roadmap.md
|   |   |   `-- README.md
|   |   |-- instructions/
|   |   |   |-- create-agent-instructions.md
|   |   |   |-- create-command-instructions.md
|   |   |   |-- create-department-instructions.md
|   |   |   |-- create-playbook-instructions.md
|   |   |   |-- create-readme-instructions.md
|   |   |   |-- create-role-instructions.md
|   |   |   |-- create-skill-instructions.md
|   |   |   |-- create-workflow-instructions.md
|   |   |   `-- README.md
|   |   |-- templates/
|   |   |   |-- agent-template.md
|   |   |   |-- command-template.md
|   |   |   |-- department-readme-template.md
|   |   |   |-- department-template.md
|   |   |   |-- department-template.yaml
|   |   |   |-- folder-readme-template.md
|   |   |   |-- github-issue-template.md
|   |   |   |-- playbook-template.md
|   |   |   |-- playbook-template.yaml
|   |   |   |-- README.md
|   |   |   |-- role-template.md
|   |   |   |-- role-template.yaml
|   |   |   |-- root-readme-template.md
|   |   |   |-- skill-template.md
|   |   |   |-- skill-template.yaml
|   |   |   `-- workflow-template.md
|   |   |-- creation-rules.md
|   |   |-- folder-readme-rules.md
|   |   |-- naming-conventions.md
|   |   |-- navigation-chain.md
|   |   |-- quality-criteria.md
|   |   `-- README.md
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
|   |   |-- init-leanos.md
|   |   |-- README.md
|   |   |-- review-pr.md
|   |   |-- status.md
|   |   `-- workon-issue.md
|   |-- context/
|   |   |-- active-workflow.md
|   |   |-- current-focus.md
|   |   |-- decision-index.md
|   |   |-- next-actions.md
|   |   |-- README.md
|   |   `-- workspace-summary.md
|   |-- departments/
|   |   |-- design/
|   |   |   |-- playbooks/
|   |   |   |   |-- mvp-ux-flow.playbook.md
|   |   |   |   `-- README.md
|   |   |   |-- roles/
|   |   |   |   |-- README.md
|   |   |   |   `-- ux-lead.role.md
|   |   |   |-- skills/
|   |   |   |   |-- create-screen-spec.skill.md
|   |   |   |   |-- define-ux-states.skill.md
|   |   |   |   |-- map-user-flow.skill.md
|   |   |   |   `-- README.md
|   |   |   |-- department.yaml
|   |   |   `-- README.md
|   |   |-- engineering/
|   |   |   |-- playbooks/
|   |   |   |   |-- issue-to-pr.playbook.md
|   |   |   |   |-- pr-validation.playbook.md
|   |   |   |   `-- README.md
|   |   |   |-- roles/
|   |   |   |   |-- ai-architect.role.md
|   |   |   |   |-- pr-reviewer.role.md
|   |   |   |   |-- README.md
|   |   |   |   `-- senior-developer.role.md
|   |   |   |-- skills/
|   |   |   |   |-- create-api-contract.skill.md
|   |   |   |   |-- create-pr.skill.md
|   |   |   |   |-- plan-implementation.skill.md
|   |   |   |   |-- README.md
|   |   |   |   |-- review-pr.skill.md
|   |   |   |   `-- write-tests.skill.md
|   |   |   |-- department.yaml
|   |   |   `-- README.md
|   |   |-- growth/
|   |   |   |-- playbooks/
|   |   |   |   |-- mvp-launch.playbook.md
|   |   |   |   `-- README.md
|   |   |   |-- roles/
|   |   |   |   |-- growth-lead.role.md
|   |   |   |   `-- README.md
|   |   |   |-- skills/
|   |   |   |   |-- create-landing-page-copy.skill.md
|   |   |   |   |-- create-launch-plan.skill.md
|   |   |   |   |-- define-positioning.skill.md
|   |   |   |   `-- README.md
|   |   |   |-- department.yaml
|   |   |   `-- README.md
|   |   |-- product/
|   |   |   |-- playbooks/
|   |   |   |   |-- mvp-definition.playbook.md
|   |   |   |   |-- product-strategy.playbook.md
|   |   |   |   `-- README.md
|   |   |   |-- roles/
|   |   |   |   |-- product-manager.role.md
|   |   |   |   |-- product-strategist.role.md
|   |   |   |   `-- README.md
|   |   |   |-- skills/
|   |   |   |   |-- check-coherence.skill.md
|   |   |   |   |-- create-roadmap.skill.md
|   |   |   |   |-- define-business-model.skill.md
|   |   |   |   |-- define-company.skill.md
|   |   |   |   |-- define-icp.skill.md
|   |   |   |   |-- define-product.skill.md
|   |   |   |   |-- define-value-proposition.skill.md
|   |   |   |   `-- README.md
|   |   |   |-- department.yaml
|   |   |   `-- README.md
|   |   |-- validation/
|   |   |   |-- playbooks/
|   |   |   |   |-- mvp-validation.playbook.md
|   |   |   |   `-- README.md
|   |   |   |-- roles/
|   |   |   |   |-- README.md
|   |   |   |   `-- validation-researcher.role.md
|   |   |   |-- skills/
|   |   |   |   |-- create-interview-script.skill.md
|   |   |   |   |-- define-assumptions.skill.md
|   |   |   |   |-- define-success-metrics.skill.md
|   |   |   |   `-- README.md
|   |   |   |-- department.yaml
|   |   |   `-- README.md
|   |   `-- README.md
|   |-- index/
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
|   |   |-- existing-product-audit.workflow.md
|   |   |-- issue-to-pr.workflow.md
|   |   |-- launch-and-learn.workflow.md
|   |   |-- new-product-mvp-validation.workflow.md
|   |   `-- README.md
|   `-- README.md
|-- architecture/
|   |-- ai-capabilities.md
|   |-- api-contract.md
|   |-- data-model.md
|   |-- integrations.md
|   |-- overview.md
|   |-- prompt-architecture.md
|   |-- README.md
|   |-- system-context.md
|   `-- technical-decisions.md
|-- company/
|   |-- decision-log.md
|   |-- mission.md
|   |-- operating-model.md
|   |-- principles.md
|   |-- profile.md
|   |-- README.md
|   `-- vision.md
|-- design/
|   |-- design-principles.md
|   |-- README.md
|   |-- screen-specs.md
|   |-- usability-notes.md
|   |-- user-flows.md
|   `-- ux-decisions.md
|-- growth/
|   |-- acquisition-channels.md
|   |-- landing-page.md
|   |-- launch-plan.md
|   |-- positioning.md
|   `-- README.md
|-- mvp/
|   |-- acceptance-criteria.md
|   |-- non-goals.md
|   |-- README.md
|   |-- release-checklist.md
|   |-- scope.md
|   |-- user-flows.md
|   `-- user-stories.md
|-- operations/
|   |-- metrics-review.md
|   |-- README.md
|   |-- risk-register.md
|   `-- weekly-review.md
|-- product/
|   |-- brief.md
|   |-- business-model-canvas.md
|   |-- icp.md
|   |-- jobs-to-be-done.md
|   |-- positioning.md
|   |-- problem.md
|   |-- README.md
|   `-- value-proposition.md
|-- roadmap/
|   |-- backlog.md
|   |-- current-cycle.md
|   |-- milestones.md
|   |-- README.md
|   `-- roadmap.md
|-- validation/
|   |-- assumptions.md
|   |-- experiments.md
|   |-- interview-script.md
|   |-- learning-log.md
|   |-- README.md
|   |-- riskiest-assumptions.md
|   `-- success-metrics.md
|-- AGENT.md
|-- leanos.yaml
`-- README.md
```
