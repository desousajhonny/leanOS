# Implementation Packet: <feature-slug>

Feature implementation packet for a single Feature. Product Ops owns this packet; Design, Security, DevOps, Finance, Growth and Engineering add only the artifacts that are applicable to the Feature.

Feature: ../../epics/<epic-slug>/<feature-slug>.md
Parent Epic: ../../epics/<epic-slug>/epic.md

## Propósito

Centralizar tudo que Engineering precisa ler antes de implementar uma Feature.

Engineering não inicia código enquanto qualquer gate aplicável estiver missing, pending ou blocked.

## Status

- Packet status: draft / ready / blocked / done
- Owner: Product Ops
- Feature status:
- Last updated:

## Readiness Gates

| Área | Status | Artefato | Observação |
| --- | --- | --- | --- |
| Product Ops | pending | Feature file | Critérios e escopo |
| Design | not_applicable | design/screen-specs/ ou design/component-specs/ | UI, tela, fluxo, componente, copy ou acessibilidade |
| Security | not_applicable | security/ | Dados, auth, permissões, privacidade, API, abuse ou AI runtime |
| DevOps | not_applicable | devops/ | Ambientes, deploy, CI/CD, observabilidade ou release |
| Finance/Growth | not_applicable | growth/ ou finance/ | Pricing, planos, custo, campanha, suporte ou aprendizado |
| Engineering | pending | engineering/implementation-plan.md | Plano técnico antes do código |

## Artefatos Esperados

- `design/screen-specs/<screen-slug>.md`
- `design/component-specs/<component-slug>.md`
- `security/security-review.md`
- `devops/deploy-readiness.md`
- `engineering/implementation-plan.md`

Crie apenas os artefatos aplicáveis. Não crie arquivos vazios só para preencher a pasta.

## Design Handoff

- Screen specs:
- Component specs:
- Microcopy:
- Accessibility:
- Design decision:

## Security Handoff

- Security status:
- Sensitive surfaces:
- Security acceptance criteria:
- Known risks:

## DevOps Handoff

- Environment impact:
- CI/CD impact:
- Deploy/rollback:
- Observability:

## Engineering Handoff

- Implementation boundary:
- Files likely affected:
- Tests expected:
- Known risks:

## Regra De Uso

- Product Ops cria ou confirma este packet antes de Engineering.
- Áreas especialistas escrevem seus artefatos aqui quando o gate é aplicável.
- Engineering lê o packet inteiro antes de branch/código.
- PR Validation compara o PR contra Feature + este packet.

## Não Faça

- Não trate issue do GitHub como substituto deste packet.
- Não marque Design, Security ou DevOps como not_applicable sem motivo.
- Não marque componente especificado como disponível antes do merge.
- Não altere código sem packet pronto ou lacuna explicitamente aceita pelo founder.
