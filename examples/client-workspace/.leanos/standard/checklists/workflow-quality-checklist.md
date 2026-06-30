# Checklist de Qualidade do Workflow

Use este checklist antes de aceitar um arquivo `.workflow.md`.

## Ownership

- [ ] O workflow pertence a um departamento ou a um fluxo realmente owned por uma área.
- [ ] O workflow coordena múltiplas áreas, roles ou estágios.
- [ ] O workflow não vive em `.leanos/workflows/`.

## Fluxo

- [ ] O workflow define gatilho, contexto obrigatório e estado final.
- [ ] O workflow identifica áreas ou roles participantes.
- [ ] O workflow define handoffs entre owners.
- [ ] Participantes condicionais são marcados como condicionais.
- [ ] Áreas ativas ausentes são tratadas como lacunas.

## Saída

- [ ] O workflow declara as saídas esperadas.
- [ ] O workflow identifica rotas de continuidade.
- [ ] O workflow não duplica playbooks de área.
