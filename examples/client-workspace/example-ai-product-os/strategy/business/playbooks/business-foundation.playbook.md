---
name: business-foundation
description: Use quando business foundation é necessário para o pedido ativo
---

# Business Foundation

## Propósito

Transformar contexto bruto do founder em identidade, princípios, modelo operacional e business model inicial usando perguntas guiadas e simples.

## Use Quando

- Use quando esta sequência de execução corresponder ao pedido ativo.

## Antes de Agir

- `../AGENT.md`
- `../area.yaml`
- `../../../.leanos/standard/foundation/guided-conversation.md`

## Entradas

- ../knowledge/profile.md
- ../knowledge/mission.md
- ../knowledge/vision.md
- ../knowledge/principles.md
- ../knowledge/operating-model.md
- ../knowledge/business-model-canvas.md
- ../knowledge/decision-log.md

## Processo

1. Carregue o AGENT de Business e a role Business Strategist.
2. Leia `.leanos/standard/foundation/guided-conversation.md` e conduza uma pergunta por vez.
3. Não aceite entrevista aberta como padrão; ofereça opções numeradas e deixe o founder responder com número.
4. Use `skills/business-identity/SKILL.md` para cliente inicial, promessa, propósito, princípio e não-promessas.
5. Use `skills/business-model/SKILL.md` quando receita, canal ou entrega forem necessários para destravar Product.
6. Use `skills/operating-model/SKILL.md` quando a colaboração founder/IA estiver indefinida.
7. Monte um Business Foundation Snapshot com status e confiança antes de propor escrita.
8. Registre decisões e perguntas abertas.
9. Proponha atualizações de arquivo e aguarde confirmação antes de escrever.

## Conversa Guiada

Use `.leanos/standard/foundation/guided-conversation.md`.

- Faça uma pergunta por vez; não transforme Business Foundation em formulário longo.
- `Quem vamos ajudar primeiro?` Opções: pessoas/consumidores finais; pequenas empresas/equipes; empresas maiores/área específica; profissionais independentes/criadores; ainda não sei, recomende.
- `Qual mudança o negócio promete?` Opções: economizar tempo; reduzir custo, erro ou risco; aumentar receita, vendas ou leads; organizar operação e decisões; melhorar suporte ou relacionamento.
- `Por que o negócio deve existir?` Opções: resolver uma dor frequente; tornar algo caro/lento acessível; automatizar trabalho repetitivo; dar clareza para decidir melhor; criar uma nova forma de entregar valor.
- `Como o negócio pretende ganhar dinheiro?` Opções: assinatura; serviço/setup/implantação; comissão ou success fee; uso/créditos; ainda é hipótese.
- `Qual princípio deve guiar decisões difíceis?` Opções: simplicidade para o cliente; segurança e privacidade primeiro; velocidade com escopo pequeno; qualidade acima de volume; atendimento humano quando a IA não for suficiente.
- `O que não devemos prometer agora?` Opções: resultado financeiro garantido; substituição total de humanos; automação 100% sem revisão; integrações complexas no MVP; escala enterprise agora.
- `Como founder e IA devem operar?` Opções: IA propõe, founder decide; IA executa tarefas aprovadas; IA monitora e sugere próximos passos; IA automatiza rotinas de baixo risco; ainda não definido.

Não faça um questionário rígido. Pergunte apenas o que estiver faltando.

## Condições de Parada

- Pare e peça confirmação antes de alterar arquivos sensíveis de segurança.

## Critérios de Aceite e Saídas

- Business Foundation Snapshot
- business_foundation_status: draft
- confidence: founder-assumption
- Mission/vision/principles proposal
- Business model canvas proposal
- Operating model proposal
- Decision log entries

## Arquivos para Atualizar

- ../knowledge/profile.md
- ../knowledge/mission.md
- ../knowledge/vision.md
- ../knowledge/principles.md
- ../knowledge/operating-model.md
- ../knowledge/business-model-canvas.md
- ../knowledge/decision-log.md

## Linhas Vermelhas

- Não faça pergunta aberta como caminho principal.
- Não registre respostas iniciais como validated sem evidência.
- Não invente pricing, canais ou claims de mercado.
- Não atualize arquivos sem confirmação explícita.

## Navegação

Comece em `../AGENT.md`, escolha um papel em `../roles/`, carregue as skills necessárias em `../skills/` e então use este playbook.
