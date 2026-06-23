# AI Generated Code Security Review

## Purpose

Review AI/vibe-coded changes for common agent-generated security failures.

## When to Use

- AI agent produced code
- Codex/Claude/Gemini/Copilot modified files
- tool/MCP access was used
- generated code changes dependencies, tests, auth, secrets, CI/CD or infra

## Before Acting

- `../AGENT.md`
- `../knowledge/security-baseline.md`
- `../knowledge/secure-coding.md`
- `../../engineering/AGENT.md`

## Inputs

- Generated diff
- Issue/PR context
- Changed dependencies
- Changed tests
- Tool/MCP usage
- Touched files

## Steps

1. Load Application Security Engineer
2. Use ai-generated-code-security skill
3. Check hallucinated or vulnerable dependencies
4. Check prompt injection via issues, PRs, docs or logs
5. Check unsafe shell commands and out-of-scope edits
6. Check fabricated/deleted tests
7. Check secrets/context leakage
8. Check broad MCP/tool permissions
9. Return safe-to-continue or blocked decision

## Security Gate

- Block hallucinated dependency.
- Block unsafe shell command from untrusted input.
- Block fabricated tests or deleted validation.
- Block auth, secrets, CI/CD, infra or dependency changes without human review.
- Block broad MCP/tool permissions without justification.

## Output

- AI-generated-code security result
- Blocked items
- Required human review
- Safe-to-continue decision

## Files to Update

- Update `../knowledge/secure-coding.md` or `../knowledge/security-baseline.md` only after explicit confirmation.

## Stop Conditions

- The diff scope does not match the issue.
- Tool permissions are broad and unexplained.
- The agent changed security-sensitive files without review.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
