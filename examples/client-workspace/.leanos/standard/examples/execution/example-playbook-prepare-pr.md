---
name: prepare-pr
description: Use quando preparar pr é necessário para o pedido ativo
---

# Preparar PR

## Propósito

Preparar um pull request revisável a partir de uma implementação de Feature confirmada.

## Use Quando

- Use quando esta sequência de execução corresponder ao pedido ativo.

## Antes de Agir

- `../AGENT.md`
- `../area.yaml`

## Entradas

- Corpo da issue do GitHub
- Epic pai quando disponível
- Escopo do MVP
- PRD
- Critérios de aceite
- Critérios de Product, Design, Engineering e Security
- Nome da branch
- Knowledge de Engineering

## Processo

1. Use este playbook como etapa de preparação de PR de `engineering-delivery.playbook.md`; não use antes de o status de implementação e testes estar claro
2. Leia o AGENT de Engineering e escolha a role Senior Developer
3. Leia a Feature ou issue do GitHub mapeada, PRD, escopo do MVP e critérios de aceite
4. Confirme prontidão da Feature com critérios de Product e Engineering
5. Verifique se critérios de Design são obrigatórios para UX voltada ao usuário
6. Verifique se critérios de Security/Data são obrigatórios para dados, auth, privacidade, abuso ou compliance
7. Crie ou confirme uma branch vinculada à Feature antes de mudanças de código
8. Use `skills/plan-implementation/SKILL.md` para planejar a implementação
9. Execute `playbooks/component-implementation.playbook.md` antes de trabalho de tela ou Feature quando um novo componente reutilizável for necessário
10. Use `skills/follow-code-standards/SKILL.md` ao alterar código
11. Use `skills/review-data-change/SKILL.md` quando dados/API/persistência estiverem envolvidos
12. Use `skills/write-tests/SKILL.md` para atualizar testes ou explicar lacunas
13. Use `skills/create-pr/SKILL.md` para preparar o PR usando o template de PR
14. Preencha o Título do PR em formato Conventional Commit quando fizer sentido
15. Preencha o Status De Prontidão como draft, founder-ready, blocked-by-tests ou blocked-by-context
16. Preencha o `Founder Testing Guide` com passos em linguagem simples, onde testar, resultado esperado, notas fora de escopo e limites conhecidos
17. Preencha Deploy / Rollback quando houver impacto em deploy, migração, rollback, observabilidade ou monitoramento
18. Se não houver URL de preview, forneça a rota local, comando ou fallback manual que o founder consiga usar de forma realista
19. Depois que o PR for criado, diga: `Acabei de criar o PR #<number>: <url>. Você deseja rodar a revisão agora?` Se o founder aceitar, siga para `playbooks/pr-validation.playbook.md`

## Condições de Parada

- Pare e peça confirmação antes de alterar arquivos sensíveis de segurança.

## Critérios de Aceite e Saídas

- Título do PR em formato Conventional Commit
- Resumo de implementação
- Status De Prontidão
- Branch usada
- Arquivos alterados
- Testes executados ou propostos
- Founder Testing Guide
- Deploy / Rollback
- Rascunho de PR
- Convite pós-PR para revisão
- Riscos conhecidos

## Arquivos para Atualizar

- Atualize `../knowledge/implementation-notes.md` quando decisões de implementação precisarem persistir.
- Atualize `../knowledge/pr-log.md` após a criação do PR ou quando o usuário pedir um registro persistente de PR.

## Linhas Vermelhas

- Não duplique um workflow.
- Não duplique skills.
- Não invente contexto ausente.
- Não atualize arquivos sem confirmação explícita.

## Navegação

Comece em `../AGENT.md`, escolha um papel em `../roles/`, carregue as skills necessárias em `../skills/` e então use este playbook.
