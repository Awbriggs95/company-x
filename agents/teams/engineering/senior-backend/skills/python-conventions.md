# Skill — Python Backend Conventions

> Owner: senior-backend | Version: 1.0.0
> Python coding standards for Company-X backend services.

---

## Project Structure

```
src/
├── main.py              ← App entry point and framework setup
├── config.py            ← Environment config and settings
├── models/              ← Data models / database schemas
│   └── user.py
├── schemas/             ← Request/response validation schemas (Pydantic)
│   └── user.py
├── services/            ← Business logic
│   └── auth_service.py
├── repositories/        ← Database access layer
│   └── user_repository.py
├── routers/             ← API route definitions
│   └── auth_router.py
├── middleware/          ← Request/response middleware
└── utils/               ← Pure utility functions
```

Keep each layer responsible for one thing:
- Routers: handle HTTP, validate input, call services, return responses
- Services: business logic, orchestrate repositories
- Repositories: database queries only — no business logic
- Schemas: validation only — no logic

---

## Type Hints

Use type hints everywhere — no untyped functions:

```python
# ✅ Correct
def get_user(user_id: str) -> User | None:
    return db.query(User).filter(User.id == user_id).first()

# ❌ Wrong — no type hints
def get_user(user_id):
    return db.query(User).filter(User.id == user_id).first()
```

Use `from __future__ import annotations` at the top of files
that use forward references.

Use `Optional[X]` or `X | None` (Python 3.10+) for nullable values —
never leave return types ambiguous.

---

## Code Style

Follow Black formatting and Flake8 rules without exceptions.

```bash
# Format before committing
black src/
flake8 src/
```

### Function length
No function longer than 50 lines. Extract into smaller functions
with clear names.

### Naming
```python
# Variables and functions: snake_case
user_id = "abc"
def get_user_by_email(email: str) -> User: ...

# Classes: PascalCase
class AuthService: ...
class UserRepository: ...

# Constants: SCREAMING_SNAKE_CASE
MAX_LOGIN_ATTEMPTS = 5
TOKEN_EXPIRY_MINUTES = 15

# Private methods: leading underscore
def _hash_token(token: str) -> str: ...
```

### Docstrings
All public functions, classes, and modules must have docstrings:

```python
def verify_google_token(token: str) -> GoogleTokenInfo:
    """
    Verify a Google OAuth ID token with Google's token info endpoint.

    Args:
        token: The Google ID token from the client.

    Returns:
        GoogleTokenInfo with the verified user's Google account data.

    Raises:
        UnauthorisedError: If the token is invalid or expired.
    """
```

---

## Environment Configuration

Use a settings class for all configuration — never access
environment variables directly in application code:

```python
# config.py
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    jwt_secret: str
    google_client_id: str
    token_expiry_minutes: int = 15

    class Config:
        env_file = ".env"

settings = Settings()
```

Import `settings` wherever config is needed — never `os.environ` directly.
Document all required variables in `.env.example`.

---

## Error Handling

Never let exceptions propagate unhandled to the client.
Never catch bare `Exception` without re-raising or logging.

```python
# ✅ Correct — specific exception, logged
try:
    result = external_service.call()
except ExternalServiceError as e:
    logger.error("External service failed", extra={"error": str(e)})
    raise ServiceUnavailableError()

# ❌ Wrong — bare except, swallowed
try:
    result = external_service.call()
except:
    pass
```

---

## Async Standards

Use async/await for all I/O operations — database queries, HTTP calls,
file operations:

```python
# ✅ Async database query
async def get_user(user_id: str) -> User | None:
    return await db.execute(select(User).where(User.id == user_id))

# ❌ Sync in async context — blocks the event loop
def get_user(user_id: str) -> User | None:
    return db.query(User).filter(User.id == user_id).first()
```

Never mix sync and async — if one layer is async, all layers must be async.
