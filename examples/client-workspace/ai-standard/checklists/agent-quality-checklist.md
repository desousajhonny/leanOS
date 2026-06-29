# Checklist de Qualidade do Agente

Use este checklist antes de aceitar um `AGENT.md`.

## Escopo

- [ ] O agente possui roteamento para exatamente um nível: raiz, departamento ou área.
- [ ] O agente declara seu escopo operacional.
- [ ] O agente não tenta ser um inventário completo de todos os arquivos filhos.

## Roteamento

- [ ] Agentes raiz roteiam apenas para departamentos.
- [ ] Agentes de departamento roteiam para workflows ou áreas ativas.
- [ ] Agentes de área roteiam para roles especialistas antes de skills ou playbooks.
- [ ] O agente não pula níveis na Navigation Chain.

## Carregamento de Contexto

- [ ] O agente informa aos modelos quais arquivos mínimos carregar primeiro.
- [ ] O agente evita pedir que modelos carreguem o workspace inteiro.
- [ ] Caminhos ausentes são tratados como lacunas, não inventados.

## Linhas Vermelhas

- [ ] O agente protege segredos.
- [ ] O agente pede confirmação antes de modificar arquivos duráveis.
- [ ] O agente não enriquece assets do framework com contexto de produto durante a inicialização.

## Saída

- [ ] O agente define o cabeçalho de resposta ou formato de saída esperado quando relevante.
- [ ] O agente deixa clara a próxima rota.
