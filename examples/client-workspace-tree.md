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
|   |   |-- capability-contract.md
|   |   |-- github-settings.example.json
|   |   |-- labels.yaml
|   |   |-- pr-validation-rules.md
|   |   |-- project-sync.yaml
|   |   |-- README.md
|   |   |-- security-automation.md
|   |   |-- setup-guide.md
|   |   |-- sync-state.yaml
|   |   `-- work-mapping.md
|   |-- prompts/
|   |   |-- leanos-init.prompt.md
|   |   `-- start-leanos.prompt.md
|   |-- workflows/
|   |   `-- pr-validation.yml
|   |-- copilot-instructions.md
|   `-- PULL_REQUEST_TEMPLATE.md
|-- .leanos/
|   |-- runtime/
|   |   |-- agent/
|   |   |   |-- protocols/
|   |   |   |   |-- chief-trace.md
|   |   |   |   |-- README.md
|   |   |   |   `-- where-we-are.md
|   |   |   |-- chief-agent.md
|   |   |   |-- context-loading.md
|   |   |   |-- operating-rules.md
|   |   |   |-- output-standards.md
|   |   |   |-- README.md
|   |   |   `-- role-activation.md
|   |   |-- context/
|   |   |   |-- active-workflow.md
|   |   |   |-- current-focus.md
|   |   |   |-- decision-index.md
|   |   |   |-- next-actions.md
|   |   |   |-- README.md
|   |   |   `-- workspace-summary.md
|   |   |-- index/
|   |   |   |-- areas.yaml
|   |   |   |-- departments.yaml
|   |   |   |-- intent-map.yaml
|   |   |   |-- playbooks.yaml
|   |   |   |-- README.md
|   |   |   |-- roles.yaml
|   |   |   |-- routing-map.yaml
|   |   |   |-- skills.yaml
|   |   |   `-- workflows.yaml
|   |   |-- traces/
|   |   |   |-- README.md
|   |   |   |-- trace-index.yaml
|   |   |   `-- trace-template.md
|   |   `-- vscode/
|   |       `-- README.md
|   |-- standard/
|   |   |-- checklists/
|   |   |   |-- agent-quality-checklist.md
|   |   |   |-- area-quality-checklist.md
|   |   |   |-- department-quality-checklist.md
|   |   |   |-- playbook-quality-checklist.md
|   |   |   |-- readme-quality-checklist.md
|   |   |   |-- README.md
|   |   |   |-- role-quality-checklist.md
|   |   |   |-- skill-quality-checklist.md
|   |   |   `-- workflow-quality-checklist.md
|   |   |-- examples/
|   |   |   |-- agents/
|   |   |   |   |-- example-area-agent.md
|   |   |   |   |-- example-root-agent.md
|   |   |   |   `-- README.md
|   |   |   |-- execution/
|   |   |   |   |-- example-playbook-prepare-pr.md
|   |   |   |   |-- example-role-senior-developer.md
|   |   |   |   |-- example-skill-coherence.md
|   |   |   |   |-- example-workflow-feature-to-delivery-cycle.md
|   |   |   |   `-- README.md
|   |   |   |-- github/
|   |   |   |   |-- example-github-epic.md
|   |   |   |   |-- example-github-feature.md
|   |   |   |   |-- example-pull-request.md
|   |   |   |   `-- README.md
|   |   |   |-- review/
|   |   |   |   |-- example-code-review.md
|   |   |   |   `-- README.md
|   |   |   |-- structure/
|   |   |   |   |-- example-area-readme.md
|   |   |   |   |-- example-folder-readme.md
|   |   |   |   `-- README.md
|   |   |   `-- README.md
|   |   |-- foundation/
|   |   |   |-- asset-taxonomy.md
|   |   |   |-- creation-rules.md
|   |   |   |-- folder-documentation-rules.md
|   |   |   |-- founder-progression-model.md
|   |   |   |-- guided-conversation.md
|   |   |   |-- naming-conventions.md
|   |   |   |-- navigation-chain.md
|   |   |   |-- progression-gates.md
|   |   |   |-- quality-criteria.md
|   |   |   `-- README.md
|   |   |-- instructions/
|   |   |   |-- create-agent-instructions.md
|   |   |   |-- create-area-instructions.md
|   |   |   |-- create-department-instructions.md
|   |   |   |-- create-playbook-instructions.md
|   |   |   |-- create-readme-instructions.md
|   |   |   |-- create-role-instructions.md
|   |   |   |-- create-skill-instructions.md
|   |   |   |-- create-workflow-instructions.md
|   |   |   `-- README.md
|   |   |-- templates/
|   |   |   |-- agents/
|   |   |   |   |-- agent-template.md
|   |   |   |   |-- area-agent-template.md
|   |   |   |   |-- department-agent-template.md
|   |   |   |   |-- README.md
|   |   |   |   `-- root-agent-template.md
|   |   |   |-- design/
|   |   |   |   |-- component-spec-template.md
|   |   |   |   |-- product-ui-spec-template.md
|   |   |   |   |-- README.md
|   |   |   |   `-- screen-spec-template.md
|   |   |   |-- execution/
|   |   |   |   |-- playbook-template.md
|   |   |   |   |-- playbook-template.yaml
|   |   |   |   |-- README.md
|   |   |   |   |-- role-template.md
|   |   |   |   |-- role-template.yaml
|   |   |   |   |-- skill-template.md
|   |   |   |   |-- skill-template.yaml
|   |   |   |   `-- workflow-template.md
|   |   |   |-- github/
|   |   |   |   |-- branch-name-template.md
|   |   |   |   |-- delivery-readiness-matrix-template.md
|   |   |   |   |-- github-epic-template.md
|   |   |   |   |-- github-feature-template.md
|   |   |   |   |-- github-issue-template.md
|   |   |   |   |-- pull-request-template.md
|   |   |   |   `-- README.md
|   |   |   |-- product/
|   |   |   |   |-- epic-template.md
|   |   |   |   |-- feature-template.md
|   |   |   |   |-- implementation-packet-template.md
|   |   |   |   |-- product-readme-template.md
|   |   |   |   `-- README.md
|   |   |   |-- review/
|   |   |   |   |-- code-review-template.md
|   |   |   |   `-- README.md
|   |   |   |-- structure/
|   |   |   |   |-- area-readme-template.md
|   |   |   |   |-- area-template.md
|   |   |   |   |-- area-template.yaml
|   |   |   |   |-- department-template.md
|   |   |   |   |-- department-template.yaml
|   |   |   |   |-- folder-readme-template.md
|   |   |   |   |-- README.md
|   |   |   |   `-- root-readme-template.md
|   |   |   `-- README.md
|   |   `-- README.md
|   `-- README.md
|-- example-ai-product-os/
|   |-- strategy/
|   |   |-- business/
|   |   |   |-- knowledge/
|   |   |   |   |-- business-model-canvas.md
|   |   |   |   |-- decision-log.md
|   |   |   |   |-- mission.md
|   |   |   |   |-- operating-model.md
|   |   |   |   |-- principles.md
|   |   |   |   |-- profile.md
|   |   |   |   |-- README.md
|   |   |   |   `-- vision.md
|   |   |   |-- playbooks/
|   |   |   |   |-- business-foundation.playbook.md
|   |   |   |   `-- README.md
|   |   |   |-- roles/
|   |   |   |   |-- business-strategist.role.md
|   |   |   |   `-- README.md
|   |   |   |-- skills/
|   |   |   |   |-- business-identity/
|   |   |   |   |   `-- SKILL.md
|   |   |   |   |-- business-model/
|   |   |   |   |   `-- SKILL.md
|   |   |   |   |-- operating-model/
|   |   |   |   |   `-- SKILL.md
|   |   |   |   `-- README.md
|   |   |   |-- AGENT.md
|   |   |   |-- area.yaml
|   |   |   `-- README.md
|   |   |-- product/
|   |   |   |-- knowledge/
|   |   |   |   |-- brief.md
|   |   |   |   |-- icp.md
|   |   |   |   |-- jobs-to-be-done.md
|   |   |   |   |-- mvp-validation-scope.md
|   |   |   |   |-- positioning.md
|   |   |   |   |-- problem.md
|   |   |   |   |-- README.md
|   |   |   |   |-- validation-notes.md
|   |   |   |   `-- value-proposition.md
|   |   |   |-- playbooks/
|   |   |   |   |-- idea-calibration.playbook.md
|   |   |   |   |-- mvp-validation-scope.playbook.md
|   |   |   |   `-- README.md
|   |   |   |-- roles/
|   |   |   |   |-- product-manager.role.md
|   |   |   |   |-- product-narrative-editor.role.md
|   |   |   |   |-- product-strategist.role.md
|   |   |   |   `-- README.md
|   |   |   |-- skills/
|   |   |   |   |-- business-baseline/
|   |   |   |   |   `-- SKILL.md
|   |   |   |   |-- coherence/
|   |   |   |   |   `-- SKILL.md
|   |   |   |   |-- mvp-validation-scope/
|   |   |   |   |   `-- SKILL.md
|   |   |   |   |-- product-core/
|   |   |   |   |   `-- SKILL.md
|   |   |   |   |-- product-readme/
|   |   |   |   |   `-- SKILL.md
|   |   |   |   `-- README.md
|   |   |   |-- AGENT.md
|   |   |   |-- area.yaml
|   |   |   `-- README.md
|   |   |-- roadmap/
|   |   |   |-- knowledge/
|   |   |   |   |-- backlog.md
|   |   |   |   |-- current-cycle.md
|   |   |   |   |-- milestones.md
|   |   |   |   |-- README.md
|   |   |   |   `-- roadmap.md
|   |   |   |-- playbooks/
|   |   |   |   |-- README.md
|   |   |   |   `-- roadmap-cycle-planning.playbook.md
|   |   |   |-- roles/
|   |   |   |   |-- README.md
|   |   |   |   `-- roadmap-planner.role.md
|   |   |   |-- skills/
|   |   |   |   |-- backlog-prioritization/
|   |   |   |   |   `-- SKILL.md
|   |   |   |   |-- roadmap/
|   |   |   |   |   `-- SKILL.md
|   |   |   |   `-- README.md
|   |   |   |-- AGENT.md
|   |   |   |-- area.yaml
|   |   |   `-- README.md
|   |   |-- AGENT.md
|   |   |-- department.yaml
|   |   `-- README.md
|   `-- README.md
|-- .env.local
|-- .gitignore
|-- AGENT.md
|-- leanos.yaml
`-- README.md
```
