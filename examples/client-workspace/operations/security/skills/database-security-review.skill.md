# Database Security Review

## Purpose

Review database privacy, isolation, query safety, backups and permissions.

## Use When

- database schema/query changes
- tenant isolation matters
- service account or database exposure changes
- migration or destructive data change

## Required Context

- Database security knowledge
- Data protection knowledge
- Engineering data guidelines
- Migration or query plan

## Inputs

- Database access pattern
- Query/migration
- Service account
- Data sensitivity
- Backup/rollback

## Process

1. Check database exposure
2. Check query construction
3. Check tenant/user isolation
4. Check service-account privilege
5. Check backup and rollback

## Checks

- Database is not public
- SQL is not string-concatenated
- Tenant isolation is explicit
- Backup/rollback exists before risky deploy

## Output

- Database security result
- Required fixes
- Backup/rollback notes
- Stop conditions

## Files to Update

- Update `../knowledge/database-security.md` after explicit confirmation.

## Red Lines

- No public production database.
- Never build SQL with string concatenation.
- No deploy touching data without backup and rollback path.
