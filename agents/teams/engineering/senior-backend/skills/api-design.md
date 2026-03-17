# Skill — API Design and Development

> Owner: senior-backend | Version: 1.0.0
> Standards for designing and building APIs in Company-X backend services.
> Check shared/stack.md for the approved backend framework before implementing.

---

## Check Stack First

Backend framework and API style are marked PENDING in `shared/stack.md`.
Before building any API:
1. Check `shared/stack.md` — is a framework now approved?
2. If approved — use that framework and follow its conventions
3. If still PENDING — escalate to Lead immediately

The principles below apply regardless of framework chosen.

---

## API Design Principles

### Resource naming
```
# ✅ Correct — nouns, lowercase, kebab-case, plural
GET    /users
GET    /users/:id
POST   /users
PATCH  /users/:id
DELETE /users/:id

GET    /auth/sessions
POST   /auth/sessions        ← sign in
DELETE /auth/sessions/:id    ← sign out

# ❌ Incorrect — verbs in URLs
POST /createUser
GET  /getUser/:id
POST /doLogin
```

### HTTP methods
| Method | Use for |
|---|---|
| GET | Retrieve — never modify state |
| POST | Create new resource or action |
| PATCH | Partial update — only changed fields |
| PUT | Full replacement — rarely used |
| DELETE | Remove resource |

### Status codes
| Code | When to use |
|---|---|
| 200 | Success with response body |
| 201 | Resource created successfully |
| 204 | Success with no response body |
| 400 | Client error — invalid request |
| 401 | Unauthenticated — no valid session |
| 403 | Unauthorised — authenticated but no permission |
| 404 | Resource not found |
| 409 | Conflict — e.g. duplicate email |
| 422 | Validation error — valid JSON, invalid data |
| 500 | Server error — never expose internals |

---

## Request and Response Standards

### Response envelope
All API responses use a consistent envelope:

```json
// Success
{
  "data": { ... },
  "meta": { "timestamp": "2026-03-14T10:00:00Z" }
}

// Error
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "fields": { "email": "This field is required" }
  }
}
```

Never return raw data without the envelope — consistency across
endpoints makes frontend integration predictable.

### Validation
Validate all inputs at the API boundary. Never trust client data.

Define input schemas explicitly and validate before any business logic:

```python
# Always validate before processing
from pydantic import BaseModel, EmailStr

class CreateUserRequest(BaseModel):
    email: EmailStr
    display_name: str

    class Config:
        str_strip_whitespace = True
        str_min_length = 1
```

Return 422 with field-level error details on validation failure —
never 400 with a generic message.

### Pagination
All list endpoints must support pagination:

```
GET /users?page=1&limit=20

Response:
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 145,
    "hasNext": true
  }
}
```

Default limit: 20. Maximum limit: 100. Never return unbounded lists.

---

## Error Handling

Define a consistent error hierarchy:

```python
class AppError(Exception):
    def __init__(self, code: str, message: str, status: int = 400):
        self.code = code
        self.message = message
        self.status = status

class NotFoundError(AppError):
    def __init__(self, resource: str):
        super().__init__("NOT_FOUND", f"{resource} not found", 404)

class UnauthorisedError(AppError):
    def __init__(self):
        super().__init__("UNAUTHORISED", "Authentication required", 401)
```

Catch all errors at the framework level and map to the standard
error response envelope. Never let raw exceptions reach the client.

---

## API Documentation

Every new endpoint must include a docstring describing:
- Purpose
- Required authentication
- Request parameters and body
- Response shape
- Error codes it can return

This is the contract that the Senior Frontend agent depends on.
An undocumented endpoint is an incomplete endpoint.
