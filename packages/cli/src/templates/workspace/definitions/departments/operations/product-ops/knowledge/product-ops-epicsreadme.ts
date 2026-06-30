export function productOpsEpicsReadmeKnowledge(): string {
  return `# Product Ops Epics

## Propósito

This folder stores local LeanOS Epics before optional GitHub sync.

Use this folder only after a roadmap item has become a confirmed Delivery Scope.

## Local Structure

~~~text
operations/product-ops/epics/
  README.md
  <epic-slug>/
    README.md
    <feature-slug>.md
~~~

## Regras

- Each Epic gets one folder.
- The Epic folder name must use stable kebab-case.
- The Epic README must follow \`../../../.leanos/standard/templates/product/epic-template.md\`.
- Every markdown file inside an Epic folder, except \`README.md\`, is a Feature that belongs to that Epic.
- Feature files must follow \`../../../.leanos/standard/templates/product/feature-template.md\`.
- Não crie uma subpasta \`features/\` no scaffold de MVP.
- Tasks stay inside Feature files as internal checklists unless separate tracking is explicitly needed.
- GitHub sync is optional and must be confirmed by the founder.
- GitHub mapping rules live in \`.github/leanos/work-mapping.md\`.

## Naming

Use stable, searchable names:

~~~text
operations/product-ops/epics/customer-management/README.md
operations/product-ops/epics/customer-management/create-customer-profile.md
operations/product-ops/epics/customer-management/import-customers-csv.md
~~~

Epic title:

~~~text
[EPIC] Customer Management
~~~

Feature title:

~~~text
[FEATURE: Customer Management] Create customer profile
~~~

## Workflow

1. Confirm Delivery Scope.
2. Run \`delivery-item-to-epic\` to create or update the local Epic folder.
3. Run \`epic-to-features\` to create Feature files inside the Epic folder.
4. Run \`ready-to-develop.md\` before Engineering starts implementation.
5. Sync with GitHub only after confirmation.

## GitHub Mapping

- Epic folder README -> GitHub issue with labels \`leanos\` and \`epic\`.
- Feature markdown file -> GitHub issue with labels \`leanos\` and \`feature\`.
- Feature Tasks -> checklist inside the Feature GitHub issue.
- Separate Task issue -> only when assignment, review, deployment, security or tracking needs separate ownership.
- Remote IDs and issue numbers -> \`.github/leanos/sync-state.yaml\`, not product status.

## Sync Location Decision

Keep synced and unsynced Epics in this folder.

Não crie \`operations/product-ops/epics/synced/\` no scaffold de MVP.

Use \`.github/leanos/sync-state.yaml\` to know whether an Epic or Feature is \`not_synced\`, \`sync_ready\`, \`synced\` or \`conflict\`.

This keeps Product Ops context visible to the model without forcing it to reread a second archive folder.

## Status Rules

Use \`status\` for product work state:

~~~yaml
status: candidate | scoped | ready | in-progress | blocked | done
~~~

Use \`sync_status\` only for GitHub or remote tracking:

~~~yaml
sync_status: not_synced | sync_ready | synced | conflict
~~~

Não use \`synced\` como status de produto.

## Não Faça

- Não crie Epics de exemplo que não estejam ligados a escopo real de delivery.
- Não mova Epics sincronizadas para outra pasta salvo se uma versão futura do framework suportar explicitamente esse fluxo.
- Não trate GitHub como source of truth quando arquivos locais do LeanOS existirem.
`;
}
