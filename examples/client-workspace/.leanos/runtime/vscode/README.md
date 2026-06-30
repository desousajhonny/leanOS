# VS Code

LeanOS prepares a workspace-level VS Code custom agent for GitHub Copilot Chat.

## Agent

The official workspace agent file is:

`.github/agents/leanos-chief.agent.md`

VS Code detects workspace custom agents from `.github/agents`.

## Bootstrap

Open Copilot Chat, select `LeanOS Chief`, then use linguagem natural:

```text
Quero iniciar o LeanOS.
```

The primary prompt file is:

`.github/prompts/start-leanos.prompt.md`

The legacy alias file is:

`.github/prompts/leanos-init.prompt.md`

Não escreva configuração global de usuário para este workspace sem aprovação explícita do usuário.
