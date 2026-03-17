# Skill — Database Design and Migrations

> Owner: senior-backend | Version: 1.0.0
> Standards for database design and schema migrations in Company-X.
> Check shared/stack.md for the approved database before implementing.

---

## Check Stack First

Database technology is marked PENDING in `shared/stack.md`.
Before writing any schema or migration:
1. Check `shared/stack.md` — is a database now approved?
2. If approved — use that database and its migration tooling
3. If still PENDING — escalate to Lead immediately

The principles below apply regardless of database chosen.

---

## Schema Design Principles

### Naming conventions
```sql
-- Tables: snake_case, plural
users
auth_sessions
user_profiles

-- Columns: snake_case
created_at
updated_at
google_id
display_name

-- Primary keys: always "id"
-- Foreign keys: [referenced_table_singular]_id
user_id
session_id
```

### Required columns on every table
```sql
id          -- Primary key (UUID preferred over integer)
created_at  -- Timestamp, default now(), not null
updated_at  -- Timestamp, updated on every write, not null
```

Use UUIDs for primary keys — they are safer than sequential integers
for external exposure and safer for distributed systems.

### Soft deletes
For data that must be auditable or recoverable, use soft deletes:

```sql
deleted_at  -- Timestamp, null means not deleted
```

Filter `WHERE deleted_at IS NULL` in all queries.
Only use soft deletes when explicitly required by the brief —
hard deletes are simpler and correct for most cases.

---

## Migration Standards

### One migration per change
Each migration does exactly one thing. Never bundle unrelated schema
changes into a single migration file.

```
migrations/
├── 001_create_users_table.sql
├── 002_add_google_id_to_users.sql
├── 003_create_auth_sessions_table.sql
```

### Migration file format
```sql
-- Migration: [description]
-- Date: [YYYY-MM-DD]
-- Brief: [TASK-ID]

-- Up
ALTER TABLE users ADD COLUMN google_id VARCHAR(255);
CREATE INDEX idx_users_google_id ON users(google_id);

-- Down (rollback)
DROP INDEX idx_users_google_id;
ALTER TABLE users DROP COLUMN google_id;
```

Always include a Down migration — rollback must be possible.
If a rollback would cause data loss, document it explicitly
and escalate to Lead before running the migration.

### Migration rules
- Never modify a migration that has been run in any environment
- Never delete a migration file
- Always test both Up and Down before reporting complete
- Data migrations (updating existing rows) must be separate from
  schema migrations (changing table structure)
- Never run a migration in production without operator approval

---

## Query Standards

### Use parameterised queries — always
```python
# ✅ Correct — parameterised
cursor.execute("SELECT * FROM users WHERE email = %s", (email,))

# ❌ Wrong — SQL injection vulnerability
cursor.execute(f"SELECT * FROM users WHERE email = '{email}'")
```

Never interpolate user input into SQL strings. Ever.

### Indexing
Add an index for every column that is:
- Used in a WHERE clause frequently
- Used as a foreign key
- Used in an ORDER BY on large tables

Do not add indexes speculatively — they slow writes and take space.
Add them when a query pattern is established.

### N+1 queries
Avoid N+1 query patterns — fetching a list then querying each item
individually:

```python
# ❌ N+1 — one query per user
users = get_all_users()
for user in users:
    user.profile = get_profile(user.id)  # N queries

# ✅ Join or batch — one query
users_with_profiles = get_users_with_profiles()  # 1 query
```

---

## Data Integrity

- Use database constraints to enforce data integrity — not just
  application-level validation
- Foreign keys must have explicit ON DELETE behaviour defined —
  never leave it as the default
- NOT NULL constraints on every column that should never be null
- UNIQUE constraints on columns that must be unique (email, google_id)
- Use transactions for any operation that modifies multiple tables

```sql
-- Always define ON DELETE behaviour explicitly
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
```
