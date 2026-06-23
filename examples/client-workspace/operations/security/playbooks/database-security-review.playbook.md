# Database Security Review

## Purpose

Review database changes for privacy, isolation, backup, query and permission risk.

## When to Use

- database schema/query/migration changes
- tenant isolation changes
- service-account permissions change
- data migration or destructive action

## Before Acting

- `../AGENT.md`
- `../knowledge/database-security.md`
- `../knowledge/data-protection.md`
- `../../engineering/knowledge/data-guidelines.md`

## Inputs

- Data model
- Query or migration
- Data sensitivity
- Service account
- Backup/rollback

## Steps

1. Load Data Protection Reviewer
2. Use database-security-review skill
3. Check production exposure
4. Check SQL/query safety
5. Check tenant isolation
6. Check service-account permissions
7. Check backup and rollback

## Security Gate

- Block public production database.
- Block SQL string concatenation.
- Block missing tenant isolation.
- Block no backup/rollback for risky data change.

## Output

- Database security result
- Required fixes
- Migration/rollback notes
- Safe-to-continue decision

## Files to Update

- Update `../knowledge/database-security.md` or `../knowledge/data-protection.md` after explicit confirmation.

## Stop Conditions

- Data sensitivity is unknown.
- Rollback cannot be defined.
- Tenant boundary is unclear.

## Navigation

Start from `../AGENT.md`, choose a role in `../roles/`, load required skills in `../skills/`, then use this playbook.
