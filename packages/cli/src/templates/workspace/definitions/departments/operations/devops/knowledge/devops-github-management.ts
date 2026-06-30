export function devopsGithubManagementKnowledge(): string {
  return `# GitHub Management

## Propósito

Define the GitHub repository, Project, labels, milestones and sync readiness without storing secrets in the workspace.

## Estado Atual

GitHub setup is not confirmed yet. Use Setup Status and the Readiness Checklist before any GitHub Epics/Features sync dry-run.

## Setup Status

- GitHub management: not configured
- Repository mode: existing | new | TBD
- README status: missing | draft | confirmed | preserved | TBD
- README source: Strategy Product | existing repo | TBD
- GitHub owner/repository: TBD
- GitHub Project: TBD
- Fonte do token: TBD
- GitHub CLI status: unknown
- Ready for dry-run sync: no
- Capability contract reviewed: no

## Repository

- Owner ou organização: TBD
- Repository: TBD
- Remote URL: TBD
- Existing repo or new repo: TBD
- New repository README gate: README-ready required before create, publish or remote connect.
- Notes: TBD

## README Gate

Para novo repositório GitHub, DevOps verifica o gate, mas não escreve a narrativa do produto.

- New repository README gate: required.
- README-ready: no until the root \`README.md\` is product-first and confirmed.
- Owner do conteúdo: Strategy Product -> Product Narrative Editor -> write-product-readme.
- Não crie ou publique um novo repositório GitHub sem README product-first confirmado.
- Se o README estiver ausente, fraco, genérico ou incerto, pare o bootstrap de DevOps e roteie para Strategy Product antes de qualquer escrita remota.
- Em repositório existente, preserve README, comandos, badges, links e setup úteis; registre \`README status: preserved\` quando isso estiver confirmado.

## GitHub Project

- Type: user | organization | TBD
- URL: TBD
- Number: TBD
- Purpose: track LeanOS Epics and Features selected for delivery.

## Project Fields

| LeanOS field | GitHub Project field | Status | Notes |
| --- | --- | --- | --- |
| Status | Status | TBD |  |
| Priority | Priority | TBD |  |
| Size | Size | TBD |  |
| Effort | Effort | TBD |  |
| Area | Area | TBD |  |
| Roadmap Item | Roadmap Item | TBD |  |
| Epic | Epic | TBD |  |

## Labels

Minimum labels:

- \`leanos\`
- \`epic\`
- \`feature\`

Optional labels:

- \`task\`
- \`mvp\`
- \`strategy\`
- \`design\`
- \`security\`
- \`devops\`

## Milestones

- Source: \`../../../strategy/roadmap/knowledge/milestones.md\`
- GitHub milestone strategy: TBD
- Duplicate prevention rule: check existing milestones before proposing creation.

## Token Source

- Never store token values in this file.
- Accepted sources: \`LEANOS_GITHUB_TOKEN\`, \`GITHUB_TOKEN\`, \`GH_TOKEN\`, GitHub CLI auth, secure prompt or keychain.
- Recommended rule: use the smallest scope that can access the selected repository and Project.
- Current selected source: TBD

## Setup Questions

Use these questions when configuration is missing:

1. Which GitHub owner or organization should LeanOS use?
2. Which repository should receive Epics and Features?
3. Is this an existing GitHub repository or a new repository bootstrap?
4. Is the product-first root README confirmed, preserved or still missing?
5. If README is not confirmed, should Strategy Product prepare it through Product Narrative Editor?
6. Is the GitHub Project owned by a user or organization?
7. What is the GitHub Project URL or number?
8. Do the default fields match your Project, or should LeanOS map to different field names?
9. Should LeanOS create missing labels/milestones in a future sync capability, or only report them?
10. Which token source will be used locally?

## Readiness Checklist

- [ ] Owner e repositório são conhecidos.
- [ ] Repository mode está explícito como existing ou new.
- [ ] README status está explícito.
- [ ] Para novo repositório, README-ready está confirmado antes de create/publish/connect remoto.
- [ ] Tipo do Project e URL ou número são conhecidos.
- [ ] Campos do Project estão mapeados.
- [ ] Campo \`Effort\` está mapeado quando GitHub Projects for usado para estimativa.
- [ ] Labels are declared.
- [ ] Milestone strategy is clear.
- [ ] Fonte do token is known without exposing token value.
- [ ] \`.github/leanos/project-sync.yaml\` matches the confirmed setup.
- [ ] \`.github/leanos/sync-state.yaml\` exists and contains no secrets.
- [ ] \`.github/leanos/capability-contract.md\` was reviewed before any remote execution handoff.
- [ ] GitHub Epics/Features sync can run dry-run before any remote write.
- [ ] Read-back verification is planned before local files are marked synced.

## Sync Verification Contract

After a confirmed GitHub Epics/Features sync, require Read-back verification before accepting success.

Verification must confirm:

- GitHub issue body contains the rich local Epic/Feature sections, not only a short summary.
- Labels \`leanos\`, \`epic\` or \`feature\` are present.
- Milestone is set when required by local metadata.
- Project fields Status, Priority, Size, Effort, Area, Roadmap Item and Epic are set.
- Epic/Feature relationships exist through native relationship when available, Project field or markdown links.

After verification passes, the capability must return a local file patch for each synced Epic and Feature:

~~~yaml
sync_status: synced
github_issue:
  url: https://github.com/<owner>/<repo>/issues/<number>
~~~

Also update \`.github/leanos/sync-state.yaml\` with non-secret issue IDs, Project item IDs, milestone IDs or URLs and verification status.

Do not set \`sync_status: synced\` or write \`github_issue.url\` if verification failed or only a partial sync happened.

## Dry Run

Record the latest dry-run summary here only when useful:

- Last dry-run date: TBD
- Epics to create/update: TBD
- Features to create/update: TBD
- Milestones to create/update: TBD
- Conflicts: TBD
- Founder decision: TBD

## Riscos

- Token pasted into chat or tracked file.
- Project fields differ from LeanOS defaults.
- Duplicate milestones, Epics or Features.
- Local Epic/Feature differs from existing GitHub issue.
- GitHub appears ready but Product Ops work is not ready for sync.

## Decisões

TBD

## Perguntas em Aberto

TBD

## Próxima Atualização

TBD
`;
}
