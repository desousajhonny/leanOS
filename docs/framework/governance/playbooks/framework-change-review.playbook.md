---
name: framework-change-review
description: Use quando uma mudança no LeanOS pode alterar comportamento do framework, scaffold, jornadas, roteamento, source of truth, release ou contratos internos.
---

# Framework Change Review

## Propósito

Avaliar mudanças relevantes no LeanOS antes de commit/PR ou em Auditoria Sob Demanda, garantindo que a evolução do framework melhora clareza, progressão e segurança sem adicionar cerimônia desnecessária.

## Use Quando

- Checklist Antes De Commit/PR para mudanças no framework.
- Auditoria Sob Demanda sobre uma mudança proposta ou já implementada.
- Alterações em scaffold, wizard, `AGENT.md`, source of truth, journeys, GitHub, release, skills, playbooks, workflows ou validações.

## Quando Este Playbook É Obrigatório

Use antes de commit/PR quando a mudança se encaixar em qualquer linha:

| Tipo De Mudança | Revisões Obrigatórias |
| --- | --- |
| Mudança de scaffold, layout, wizard ou update command | `framework-change-review`, `doctrine-alignment-review`, `founder-experience-review` |
| Mudança de `AGENT.md`, `intent-map.yaml`, `routing-map.yaml` ou `leanos.yaml` | `framework-change-review`, `nav-chain-audit`, `founder-experience-review` |
| Mudança de skill/playbook/workflow/role | `framework-change-review`, `asset-quality-review` |
| Mudança de handoff, readiness, implementation packet ou PR validation | `framework-change-review`, `department-handoff-review`, `asset-quality-review` |
| Mudança de GitHub/release, branch protection, sync ou package publish | `framework-change-review`, `doctrine-alignment-review`, `department-handoff-review` |
| Mudança de source of truth ou doutrina | `framework-change-review`, `doctrine-alignment-review` |

## Antes de Agir

Leia `docs/framework/source-of-truth/leanos-doctrine.md`, `operating-model.md`, `decision-rules.md` e `decision-log.md`.

## Entradas

- Descrição da mudança.
- Arquivos alterados ou pretendidos.
- Motivo da mudança.
- Testes e validações disponíveis.

## Processo

### Etapa 1: Classificar impacto

Marque impactos aplicáveis: doctrine, Nav Chain, founder experience, generated assets, handoffs, GitHub, release, CLI, docs ou tests.

### Etapa 2: Aplicar critérios centrais

Verifique se a mudança:

- melhora clareza para o founder;
- preserva Business as a Product;
- preserva Strategy-first e progressão acima de scaffolding;
- preserva topologia de fluxo de valor em vez de organograma em pasta;
- evita transformar GitHub em source of truth primário;
- mantém activation gates;
- não polui o root `AGENT.md`;
- tem validação automatizada quando o critério for mecânico.

### Etapa 3: Chamar revisões específicas

Use:

- `doctrine-alignment-review` para mudança estrutural ou decisão durável;
- `nav-chain-audit` para roteamento/ativação;
- `asset-quality-review` para skills/playbooks/workflows/roles/knowledge;
- `department-handoff-review` para passagem entre áreas;
- `founder-experience-review` para wizard, jornadas e respostas ao founder.

### Etapa 4: Emitir decisão

Produza `pass / risk / blocked` com evidências e próximos passos.

## Matriz De Avaliação

| Dimensão | Pass | Risk | Blocked |
| --- | --- | --- | --- |
| Doutrina | Preserva ou reforça princípios | Ambígua ou sem decision log | Contradiz princípio não negociável |
| Progressão | Mantém Strategy-first e readiness | Adiciona etapa útil, mas pouco clara | Pula gates ou ativa área cedo demais |
| Topologia | Reduz carga cognitiva, handoff ou ambiguidade | Estrutura útil com owner/gatilho fraco | Cria organograma, silo ou especialista sem gatilho |
| Founder clarity | Reduz confusão | Pode aumentar carga cognitiva | Exige que o founder entenda estrutura interna |
| Nav Chain | Mantém root enxuto e roteamento por owner | Falta validação de rota | Root carrega deep asset ou ignora ativação |
| Source of truth | Preserva ownership local | Ownership precisa ser explicitado | GitHub/memória/chat viram fonte primária |
| Validação | Critério mecânico testado | Teste pendente com mitigação clara | Sem teste para comportamento crítico |

## Escala De Severidade

Use `blocker / high / medium / low`.

- `blocker`: não pode seguir para commit/PR; quebra doutrina, segurança, source of truth, Nav Chain ou readiness.
- `high`: pode seguir apenas com correção no mesmo PR; risco real de drift ou regressão.
- `medium`: melhoria necessária, mas não bloqueia se houver issue/roadmap claro.
- `low`: ajuste editorial ou clareza incremental.

## Cenários De Pressão

Teste a mudança contra estas pressões:

- "É só documentação": se altera comportamento esperado de agentes, precisa governança e validação.
- "O teste demora": se o comportamento é mecânico, rode ou crie validação.
- "O founder pediu": ainda precisa respeitar doutrina, gates e source of truth.
- "Parece uma empresa real": LeanOS precisa de fluxo de valor, não organograma.
- "Funciona no caso atual": verifique impacto em progressive mode, all-at-once e projeto existente.
- "Depois ajustamos": se é blocker, não avance para commit/PR.

## Racionalizações Comuns

| Racionalização | Resposta Correta |
| --- | --- |
| "Está mais completo, então é melhor" | Completude sem clareza para founder é regressão. |
| "Mais área especialista aumenta qualidade" | Especialista sem gatilho aumenta handoff e carga cognitiva. |
| "O root pode resolver isso direto" | Root classifica e roteia; departamentos e áreas decidem deep assets. |
| "GitHub já registra tudo" | GitHub é espelho opcional, não source of truth primário. |
| "É interno, então não precisa validação" | Mudança interna no framework afeta todos os workspaces gerados. |
| "Não há tempo para atualizar inventário" | Asset sem inventário vira comportamento invisível e frágil. |

## Resultado Obrigatório

O resultado deve terminar com uma decisão executável:

```text
Framework Governance Check:
- Doctrine alignment: pass / risk / blocked
- Nav Chain impact: none / pass / risk / blocked
- Founder experience: pass / risk / blocked
- Asset quality: none / pass / risk / blocked
- Handoff integrity: none / pass / risk / blocked
- Severity: blocker / high / medium / low
- Required validations:
- Required docs/source updates:
- Decision: pass / risk / blocked
```

## Condições de Parada

- `blocked`: conflito com doutrina, red line, source of truth ou activation gate.
- `risk`: mudança útil, mas com lacuna de validação, inventário, handoff ou decisão.
- `pass`: mudança coerente, validada e sem risco crítico conhecido.

## Critérios de Aceite e Saídas

Saída no modo Checklist Antes De Commit/PR:

```text
Framework Governance Check:
- Doctrine alignment: pass / risk / blocked
- Nav Chain impact: none / pass / risk / blocked
- Founder experience: pass / risk / blocked
- Asset quality: none / pass / risk / blocked
- Handoff integrity: none / pass / risk / blocked
- Required validations:
- Decision: pass / risk / blocked
```

Saída no modo Auditoria Sob Demanda:

```text
O que foi avaliado:
Critérios usados:
Achados:
Riscos:
Recomendações:
Prioridade:
Arquivos impactados:
```

## Arquivos para Atualizar

- `docs/framework/source-of-truth/decision-log.md` quando houver decisão durável.
- `MODEL_MEMORY.md` quando a mudança for relevante para continuidade.
- Inventários em `docs/framework/skills/`, `playbooks/` e `workflows/` quando assets mudarem.
- Validações em `packages/cli/scripts/validation/` quando houver contrato mecânico.

## Linhas Vermelhas

- Não aprove mudança que contradiz a doutrina sem atualizar decision log e source of truth.
- Não aprove mudança que adiciona processo sem melhorar a próxima decisão do founder.
- Não aprove mudança que depende da memória do modelo para funcionar.
- Não use checklist como substituto de teste automatizado quando o comportamento puder ser validado.
