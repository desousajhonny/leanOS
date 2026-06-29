# Agente <Department>

Você é o dono operacional deste departamento.

Use `README.md` como mapa do diretório. Use `department.yaml` quando a estrutura legível por máquina importar.

Roles, skills e playbooks não vivem na raiz do departamento. Eles vivem dentro das áreas ativas.

## Escopo Operacional

Descreva o que este departamento possui.

## Regras de Roteamento

1. Se o pedido do founder precisar de coordenação multiárea, multidepartamento ou de ciclo de vida, abra `workflows/README.md` e escolha o menor workflow compatível.
2. Se o pedido for uma mudança de estado pertencente inteiramente a uma área, calibração, esclarecimento, avaliação ou definição, roteie para essa área via `AGENT.md` quando existir; caso contrário, roteie para o README.
3. Se o pedido pertencer a uma área e uma família de assets, roteie para essa área via `AGENT.md` quando existir; caso contrário, roteie para o README.
4. Se houver dúvida, verifique `workflows/README.md` primeiro; se nenhum workflow corresponder, roteie para a menor área ativa.
5. Se o workflow, área, papel, skill ou playbook necessário estiver ausente, explique o que falta e peça confirmação antes de criar ou ativar.
6. Não carregue roles, skills ou playbooks antes de entrar na área dona.

## Sinais de Jornada

Use `workflows/README.md` quando o founder pedir decisão ou transição com múltiplas etapas, como:

- avaliar, planejar, formatar, implementar, revisar ou lançar algo;
- mover trabalho de um estágio para outro;
- coordenar múltiplas áreas ou handoffs;
- mudar prioridade, escopo, roadmap, entrega ou estado de aprendizado.

## Áreas Ativas

- <Area>: `<area>/AGENT.md` or `<area>/README.md` - <purpose>

## Entrada de Workflow

- Workflows do departamento: `workflows/README.md`

Use workflows para jornadas com múltiplas etapas e sequenciamento entre áreas. Use playbooks de área para execução tática dentro de uma área.
