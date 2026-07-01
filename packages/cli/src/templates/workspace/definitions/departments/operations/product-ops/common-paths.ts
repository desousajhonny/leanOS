export const operationsProductOpsCommonPaths: string[] = [
    "Product Ops request: area lead `AGENT.md` -> choose Product Owner or Delivery Architect -> load only the required skills and playbook.",
    "Delivery scope request: role `roles/product-owner.role.md` -> skill `skills/delivery-scope/SKILL.md` -> playbook `playbooks/delivery-scope-planning.playbook.md`.",
    "MVP backlog request: area lead `AGENT.md` -> role `roles/product-owner.role.md` -> gate `knowledge/mvp-decision-gate.md` -> playbook `playbooks/mvp-backlog-planning.playbook.md` -> `mvp/backlog.md`.",
    "Delivery item to Epic request: role `roles/product-owner.role.md` -> skills `skills/delivery-scope/SKILL.md` and `skills/shape-epic/SKILL.md` -> playbook `playbooks/delivery-item-to-epic.playbook.md`.",
    "Epic breakdown request: role `roles/product-owner.role.md` -> skills `skills/shape-epic/SKILL.md` and `skills/feature-criteria/SKILL.md` -> playbook `playbooks/epic-to-features.playbook.md`.",
    "Implementation packet request: role `roles/delivery-architect.role.md` -> gate `knowledge/ready-to-develop.md` -> template `../../../.leanos/standard/templates/product/implementation-packet-template.md` -> `knowledge/implementation-packets/<feature-slug>/README.md`.",
    "Delivery readiness request: role `roles/delivery-architect.role.md` -> skill `skills/delivery-boundaries/SKILL.md` -> playbook `playbooks/delivery-readiness.playbook.md`."
  ];
