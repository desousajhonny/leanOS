import type { FileEntry } from "../types.js";
import { folderReadme } from "../content/shared.js";

export function traceFiles(): FileEntry[] {
  return [
    {
      path: ".leanos/traces/README.md",
      content: folderReadme(
        "LeanOS Traces",
        "Local diagnostic traces for LeanOS Chief sessions.",
        "Use only when the founder asks to debug, inspect or share how LeanOS routed a session.",
        "../agent/protocols/chief-trace.md",
        ["trace-index.yaml", "trace-template.md"],
        ["../agent/protocols/chief-trace.md", "../commands/", "../index/", "../../AGENT.md"],
        "Traces are local, opt-in and safe-by-default. They summarize routing, files loaded, questions, decisions, confirmations and stop reasons. Do not store full transcripts, secrets, tokens, .env values, private code or unnecessary customer data."
      )
    },
    {
      path: ".leanos/traces/trace-index.yaml",
      content: `# LeanOS local trace index.
# This file is safe to version while it contains only examples or non-sensitive summaries.
# Add real trace entries only after founder confirmation.

traces: []
`
    },
    {
      path: ".leanos/traces/trace-template.md",
      content: traceTemplate()
    }
  ];
}

export function chiefTraceProtocol(): string {
  return `# Chief Trace Protocol

## Purpose

Create a safe local diagnostic trace that explains how LeanOS Chief interpreted a founder request, which route it selected, which files it loaded, what it asked, what it decided, where it stopped and what should happen next.

Use this protocol to debug whether LeanOS followed the Navigation Chain.

## Trigger Phrases

Use this protocol when the founder says things like:

- "gere um trace"
- "quero diagnosticar o Chief"
- "o que o LeanOS fez nessa conversa?"
- "por onde ele passou?"
- "registre esse fluxo"
- "quero mandar um relatorio para o framework"
- "debug LeanOS"
- "trace this LeanOS session"

## Safety Rules

- Traces are local and opt-in.
- Ask before writing a trace file.
- Do not store full chat transcripts.
- Do not store tokens, secrets, credentials, .env values or private keys.
- Do not copy private code, customer records or long proprietary content.
- Summarize founder answers instead of quoting sensitive details.
- Redact anything that looks like a token, password, email list, API key, customer data or production URL when it is not needed for routing diagnosis.
- If a trace would expose sensitive information, stop and explain what must be redacted first.

## When To Create

Create a trace when:

- the founder explicitly asks for a diagnostic record;
- a LeanOS flow behaved unexpectedly and the founder wants to inspect it;
- the founder wants to share a compact report with the LeanOS framework maintainer;
- a command or workflow asks for trace evidence during testing.

Do not create a trace by default for every normal product interaction.

## Load First

Read:

- \`../../traces/README.md\`
- \`../../traces/trace-template.md\`
- \`../../traces/trace-index.yaml\`
- \`../../../AGENT.md\`

Then inspect only the files already involved in the session route or the smallest missing route needed to explain the diagnosis.

## Trace File Naming

Use:

\`\`\`text
.leanos/traces/YYYY-MM-DD-<short-kebab-intent>.trace.md
\`\`\`

Examples:

- \`.leanos/traces/2026-06-24-github-sync.trace.md\`
- \`.leanos/traces/2026-06-24-feature-delivery.trace.md\`
- \`.leanos/traces/2026-06-24-start-leanos.trace.md\`

## Process

1. Confirm that the founder wants a local trace.
2. Identify the founder intent in one short sentence.
3. Record the route that was selected, one file per line.
4. Record the smallest list of files loaded or expected to be loaded.
5. Summarize questions asked and answers received.
6. Record decisions, confirmations and stop reasons.
7. Record proposed updates and whether they were confirmed.
8. Record missing files or Navigation Chain breaks.
9. Record the next suggested route.
10. Ask before writing the trace file and updating \`trace-index.yaml\`.

## Allowed Updates

After explicit founder confirmation, write:

- \`../../traces/YYYY-MM-DD-<short-kebab-intent>.trace.md\`
- \`../../traces/trace-index.yaml\`

## Forbidden Updates

Do not update:

- product strategy files;
- operations knowledge files;
- roles, skills, playbooks or workflows;
- \`.github/\`;
- code;
- env files;
- remote services.

This protocol documents what happened. It does not execute product work.

## Expected Output

Before writing, show:

\`\`\`text
Trace summary:
- Intent:
- Route:
- Files loaded:
- Stop reason:
- Sensitive data risk:
- Proposed trace file:

Do you want me to write this local trace?
\`\`\`

After writing, tell the founder which trace file was created and remind them to review/redact before sharing it outside their workspace.
`;
}

function traceTemplate(): string {
  return `# LeanOS Trace: <intent>

## Trace Metadata

- Date:
- Session or request:
- Created by:
- Trace mode: local only
- Sharing status: not shared

## Founder Intent

Summarize the founder request in one sentence.

## Detected Route

\`\`\`text
Root AGENT.md
-> <command/workflow/department>
-> <area AGENT/README>
-> <role>
-> <skill>
-> <playbook>
-> Output
\`\`\`

## Files Loaded

- \`AGENT.md\`
- \`<path>\`

## Questions Asked

1. <question>
2. <question>

## Founder Answers Summary

- <safe summary>
- <safe summary>

Do not paste secrets, tokens, customer records or full transcript content here.

## Decisions

- <decision>
- <decision>

## Proposed Updates

- \`<path>\`: <reason>

## Confirmation

- Status: pending / confirmed / declined
- Confirmed scope:

## Stop Reason

Explain why LeanOS stopped, continued or handed off.

## Navigation Chain Check

- Root owner used: yes/no
- Department owner used: yes/no/not applicable
- Area owner used: yes/no/not applicable
- Role selected before skills/playbooks: yes/no/not applicable
- Missing path or broken route:

## Sensitive Data Review

- Tokens or secrets included: no
- .env values included: no
- Private code copied: no
- Customer data included: no
- Redactions needed:

## Next Suggested Route

\`<next command/workflow/department/area>\`
`;
}
