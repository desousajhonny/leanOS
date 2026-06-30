# Workflow Feature To Delivery Cycle

## Propósito

Mover uma Feature local confirmada ou issue do GitHub mapeada de entendimento para branch, implementação, review e prontidão de PR.

## Gatilho

O founder pede para implementar uma Feature específica ou uma issue do GitHub que representa uma Feature.

## Áreas Participantes

- Product Ops: confirma escopo de delivery, prontidão de issue e limites de delivery.
- Engineering: planeja, implementa, testa e prepara PR.
- Design: condicional, somente quando UX muda.
- Security: condicional, somente quando dados, auth, permissões, privacidade, risco de abuso ou compliance estiverem envolvidos.

## Sequência

1. Carregue a Feature, Epic pai e contexto do MVP.
2. Resuma a Feature no chat e peça confirmação.
3. Cheque prontidão de Product e Engineering.
4. Adicione critérios de Design somente quando UX voltada ao usuário mudar.
5. Adicione critérios de Security somente quando a issue tiver superfície sensível a Security.
6. Crie um plano de branch vinculado à Feature.
7. Implemente somente após confirmação.
8. Rode testes ou explique por que não podem rodar.
9. Prepare um rascunho de PR usando o template de PR.
10. Roteie para review antes do merge.

## Saída

- Resumo da Feature confirmada
- Plano de implementação
- Nome da branch
- Plano de teste
- Rascunho de PR
- Notas de prontidão de review
