# Command Quality Checklist

Use this checklist before accepting a `.leanos/commands/<command>.md` file.

## Intent

- [ ] The command maps to a stable user intent.
- [ ] The command is portable across VS Code, Claude, Codex, terminal agents and chat interfaces.
- [ ] The command does not duplicate natural-language routing unless stable loading rules are needed.

## Loading

- [ ] The command defines `Load First` or equivalent context.
- [ ] The command loads only necessary context.
- [ ] The command does not require missing or inactive paths without warning.

## Safety

- [ ] Allowed updates are explicit.
- [ ] Forbidden updates are explicit.
- [ ] Remote writes require confirmation and should be delegated to tool-capable scripts/capabilities.
- [ ] Secrets are never requested into tracked files.

## Output

- [ ] The command defines expected output.
- [ ] The command asks for confirmation before durable changes.
