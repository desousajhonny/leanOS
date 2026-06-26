# Glossário Do LeanOS

## Business As A Product

A doutrina de que o negócio do founder é moldado como um produto: de forma progressiva, com contexto, decisões, artefatos operacionais, gates e ciclos de aprendizado.

## Company As A Product

Enquadramento estratégico equivalente a Business as a Product. Use `Business as a Product` quando a ênfase estiver no negócio operacional; use `Company as a Product` quando a ênfase estiver no sistema em nível de empresa.

## LeanOS Chief

A persona de agente raiz que lê `AGENT.md`, diagnostica a intenção do founder, verifica o estado ativo e roteia para o menor owner válido.

## Strategy Baseline

O contexto mínimo de negócio/produto necessário para que decisões de roadmap, MVP ou delivery sejam responsáveis.

Inclui usuário/ICP, problema, alternativa atual, proposta de valor, premissa mais arriscada e foco imediato.

## Founder Progression

O movimento sensível ao estágio que vai da ideia para strategy, roadmap, escopo de MVP, Epic, Features, delivery e aprendizado.

## Business Stage

O estágio real e durável do negócio/produto do founder. Ele orienta o Chief antes de qualquer rota, ativação, roadmap, escopo ou implementação. Os estágios canônicos vivem em `business-stages.md`.

## Progressive Activation

A política de criar departamentos e áreas apenas quando o estágio atual do founder precisa deles.

## `activation_required`

Uma decisão de roteamento do tipo parar-e-explicar usada quando a próxima rota válida precisa de um departamento ou área inativa.

## MVP Validation Sequence

A ordem mínima de tentativas, sinais de sucesso, sinais de pivô e próximos passos usada para validar o MVP antes de delivery. Ela pertence a Strategy Product e não é Roadmap, Epic, Feature ou implementação.

## Roadmap Item

Uma oportunidade ou direção estratégica que pode virar trabalho de delivery depois, mas não é automaticamente escopo de implementação. Roadmap entra principalmente quando o negócio está em `product_operating`, `growth_scaling` ou precisa priorizar múltiplas frentes.

## MVP Scope

O menor escopo coerente de primeira versão criado para validar uma premissa de produto/negócio por meio de delivery e aprendizado.

## Epic

Um artefato local de Product Ops que transforma uma direção selecionada de roadmap/MVP em contexto executável de delivery.

## Feature

Uma unidade implementável dentro de um Epic, com critérios de aceite, tasks e dimensões de readiness.

## Task (Tarefa)

Um item interno de checklist dentro de uma Feature ou de um item de trabalho pertencente a uma área. Uma Task não é uma issue separada do GitHub por padrão.

## Delivery Readiness

O estado em que os critérios de Product Ops, Engineering e, quando aplicável, Design/Security/DevOps foram satisfeitos ou marcados explicitamente como não aplicáveis.

## Routing Narration

Uma explicação curta e amigável para o founder sobre quem está cuidando da solicitação, por que a rota é válida e o que acontecerá antes de arquivos mudarem.

## Local Source Of Truth

Os arquivos do workspace LeanOS que são donos do contexto de produto, operação e delivery. O GitHub pode espelhar isso, mas não substitui por padrão.

## GitHub Sync

Espelhamento opcional de Epics/Features locais do LeanOS para issues do GitHub e GitHub Projects depois de readiness, dry-run e confirmação.
