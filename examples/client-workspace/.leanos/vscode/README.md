# VS Code

LeanOS prepares a workspace-level VS Code custom agent for GitHub Copilot Chat.

## Agent

The official workspace agent file is:

`.github/agents/leanos-chief.agent.md`

VS Code detects workspace custom agents from `.github/agents`.

## Bootstrap

Open Copilot Chat, select `LeanOS Chief`, then start with:

```text
/init leanos
```

If VS Code routes `/init` to its native command, use the safe workspace prompt:

```text
/leanos-init
```

The prompt file is:

`.github/prompts/leanos-init.prompt.md`

Do not write global user configuration for this workspace without explicit user approval.
