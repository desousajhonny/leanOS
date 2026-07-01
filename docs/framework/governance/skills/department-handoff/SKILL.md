---
name: department-handoff
description: Use quando a passagem entre áreas ou departamentos do LeanOS precisa ser avaliada por owner, source of truth, evidência e readiness.
---

# Department Handoff

## Visão Geral

Skill de uso interno do framework para avaliar se uma área entrega contexto suficiente para outra agir sem adivinhar, sem criar organograma, gargalo ou carga cognitiva desnecessária.

## Use Quando

- Mudança altera workflow, readiness, implementation packet, PR validation, launch ou learning loop.
- O mantenedor pergunta se áreas estão se comunicando bem.
- Engineering, Design, Security, DevOps, Growth ou Finance dependem de output de outra área.
- Uma mudança adiciona interação stream-aligned, enabling/specialist ou platform.

## Contexto Obrigatório

- Área produtora.
- Área consumidora.
- Artefato de handoff.
- Source of truth envolvido.
- Gate posterior que validará o handoff.
- Tipo de interação: stream-aligned, enabling/specialist ou platform.

## Entradas

- Rota ou workflow avaliado.
- Artefatos produzidos.
- Evidências disponíveis.
- Falhas conhecidas.

## Processo

### Etapa 1: Checar origem e destino

Identifique quem produz, quem consome e quem decide.

### Etapa 2: Checar source of truth

Confirme se cada área consome a fonte correta sem redefinir valores ou decisões alheias.

### Etapa 3: Checar tipo de interação

Use Team Topologies como lente: stream-aligned entrega valor direto, enabling/specialist reduz risco por gatilho e platform reduz fricção sem assumir decisão de produto.

### Etapa 4: Checar readiness

Verifique se o handoff inclui decisão, critérios, riscos, evidência e bloqueios.

### Etapa 5: Registrar Evidências

Liste arquivos e campos que provam o handoff.

### Etapa 6: Decidir

Retorne `pass, risk ou blocked`.

## Perguntas De Auditoria

- Quem é produtor, consumidor e validador do handoff?
- Qual source of truth está sendo consumido?
- Que tipo de interação existe: stream-aligned, enabling/specialist ou platform?
- O handoff reduz carga cognitiva ou só imita organograma?
- O artefato permite ação sem ler chat anterior?
- Há decisão explícita, evidência, critérios e bloqueios?
- PR validation, launch ou learning loop consegue verificar cumprimento?

## Matriz De Avaliação

| Dimensão | Pass | Risk | Blocked |
| --- | --- | --- | --- |
| Owner | Produtor/consumidor/validador claros | Um papel implícito | Sem owner |
| Source | Fonte correta preservada | Fonte não citada | Fonte redefinida |
| Interação | Tipo e gatilho claros | Tipo implícito | Handoff por organograma |
| Artefato | Completo e consumível | Parcial | Chat/resumo solto |
| Gate | Aplicável e registrado | Ambíguo | Ignorado |
| Validação | Comparável depois | Manual fraco | Não verificável |
| Carga cognitiva | Reduz adivinhação | Adiciona cerimônia leve | Founder precisa entender organograma |

## Sinais De Alerta

- Engineering recebe Epic ou issue sem Feature/readiness.
- Design, Security ou Finance marcado como "não se aplica" sem razão.
- Product Ops e Engineering escrevendo critérios conflitantes.
- Pricing ou spend redefinido fora de Finance.
- PR validation sem referência ao packet/handoff.
- Especialista sem gatilho claro.
- Platform assumindo decisão de produto, pricing, UX ou estratégia.

## Racionalizações Comuns

| Racionalização | Correção |
| --- | --- |
| "A próxima área lê o contexto" | Handoff deve sobreviver fora do chat. |
| "É pequeno demais para packet" | Se entra em delivery normal, precisa readiness proporcional. |
| "A issue resume bem" | Issue é espelho/track, não source local. |
| "O dev ajusta no PR" | PR validation verifica; não substitui handoff. |
| "É assim que empresas se organizam" | LeanOS organiza fluxo de valor, não organograma. |

## Exemplo De Saída

```text
Department handoff review:
- Status: risk
- Severity: high
- Origem: operations.design
- Destino: operations.engineering
- Evidências: screen spec ausente no implementation packet
- Source of truth: product-ui-spec.md
- Tipo de interação: enabling/specialist -> stream-aligned
- Lacunas: PR validation não consegue comparar UI implementada
```

## Verificações e Critérios de Aceite

- Handoff tem owner explícito.
- Source of truth está preservado.
- Engineering não recebe ideia bruta.
- PR/launch/learning consegue validar contra o handoff.
- Status final é `pass, risk ou blocked`.

## Saída

```text
Department handoff review:
- Status: pass, risk ou blocked
- Severity: blocker / high / medium / low
- Origem:
- Destino:
- Evidências:
- Source of truth:
- Tipo de interação:
- Carga cognitiva:
- Lacunas:
```

## Arquivos para Atualizar

- Workflows.
- Playbooks/skills das áreas.
- Knowledge source of truth.
- Validações de handoff.

## Linhas Vermelhas

- Não aceite handoff sem evidência.
- Não permita área consumidora redefinir fonte canônica.
- Não permita Engineering começar com ideia bruta.
- Não use GitHub sync como substituto de readiness.
