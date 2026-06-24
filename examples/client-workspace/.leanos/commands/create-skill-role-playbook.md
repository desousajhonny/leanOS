# /create skill role playbook

## Purpose

Create a coherent role, skill and playbook set inside the correct area.

## Load First

First consult:

- `../../ai-standard/README.md`
- `../../ai-standard/foundation/navigation-chain.md`
- `../../ai-standard/foundation/creation-rules.md`
- `../../ai-standard/templates/`
- `../../ai-standard/checklists/`
- `../../ai-standard/instructions/`

## Area-First Rule

Create role, skill and playbook assets inside the correct active area:

- Business assets: `../../strategy/business/`
- Product assets: `../../strategy/product/`
- Roadmap assets: `../../strategy/roadmap/`
- Validation assets: `../../strategy/validation/` (not active; ask before activating or creating it)
- Product Ops assets: `../../operations/product-ops/`
- Design assets: `../../operations/design/`
- Engineering assets: `../../operations/engineering/`
- DevOps assets: `../../operations/devops/`
- Security assets: `../../operations/security/`
- Customer Experience assets: `../../growth/customer-experience/`
- Marketing assets: `../../growth/marketing/`
- Finance assets: `../../growth/finance/`

## Process

1. Identify the correct department and active area.
2. Load the area README or AGENT.md before creating assets.
3. Load the relevant AI Standard taxonomy, instructions, template and checklist.
4. Propose the asset path, name and purpose.
5. Ask for confirmation before writing files.
6. Create only the requested asset type and keep it inside the owning area.

## Allowed Updates

Only after explicit founder confirmation:

- new or updated role files inside an active area `roles/`;
- new or updated skill files inside an active area `skills/`;
- new or updated playbook files inside an active area `playbooks/`;
- related README or area index updates when needed and confirmed.

## Forbidden Updates

Do not:

- create assets at department root;
- create assets inside inactive areas without explicit activation or confirmation;
- modify product source code;
- write secrets or credentials;
- modify unrelated roles, skills, playbooks, workflows, commands or `ai-standard/`;
- use examples as active workspace context.

## Confirmation Rule

Ask before creating or updating any asset file.

## Expected Output

- Selected department and area
- Assets to create
- Templates used
- Checklists used
- Files created or updated

## Active Areas

- strategy.business
- strategy.product
- strategy.roadmap
- operations.product-ops
- operations.design
- operations.engineering
- operations.devops
- operations.security
- growth.customer-experience
- growth.marketing
- growth.finance
