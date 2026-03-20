# Skill — Authentication and Authorisation

> Owner: senior-backend | Version: 1.0.0
> Standards for implementing auth in Company-X backend services.
> Check shared/stack.md for the approved auth provider before implementing.

---

## Check Stack First

Auth provider is ❓ Undecided in `shared/stack.md`.
Before implementing any auth:
1. Check `shared/stack.md` — is an auth provider now approved?
2. If approved — use that provider
3. If still ❓ Undecided — escalate to Lead immediately

---

## Core Principles

- Never roll your own cryptography — use established libraries
- Never store passwords in plain text — always hash with bcrypt or argon2
- Never store tokens in plain text — hash them before storing
- Never log sensitive data — no tokens, passwords, or PII in logs
- Fail closed — when in doubt, deny access

---

## Session Management

### Token pattern
Use short-lived access tokens with longer-lived refresh tokens:

```
Access token:   15 minutes — used for API requests
Refresh token:  30 days — used to get new access tokens
```

Store refresh tokens in the database with the following fields:

```sql
CREATE TABLE auth_sessions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash    VARCHAR(255) NOT NULL UNIQUE,  -- hashed, never plain
  expires_at    TIMESTAMP NOT NULL,
  created_at    TIMESTAMP NOT NULL DEFAULT now(),
  last_used_at  TIMESTAMP NOT NULL DEFAULT now(),
  user_agent    VARCHAR(500),
  ip_address    INET
);
```

Never store plain refresh tokens — always hash before storing.

### Token validation
Every protected endpoint must validate the access token before
executing any business logic:

```python
def get_current_user(token: str = Depends(oauth2_scheme)) -> User:
    try:
        payload = decode_jwt(token)
        user_id = payload.get("sub")
        if not user_id:
            raise UnauthorisedError()
        user = get_user(user_id)
        if not user:
            raise UnauthorisedError()
        return user
    except JWTError:
        raise UnauthorisedError()
```

---

## OAuth Integration

### Google OAuth flow (server-side)

```
1. Frontend receives Google OAuth token from expo-auth-session
2. Frontend sends token to POST /auth/google
3. Backend verifies token with Google's token info endpoint
4. Backend upserts user record (create or update)
5. Backend creates session and returns access + refresh tokens
6. Frontend stores tokens securely via expo-secure-store
```

Verify Google tokens server-side — never trust the token without
verification:

```python
async def verify_google_token(token: str) -> GoogleTokenInfo:
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"https://oauth2.googleapis.com/tokeninfo?id_token={token}"
        )
        if response.status_code != 200:
            raise UnauthorisedError()
        return GoogleTokenInfo(**response.json())
```

---

## Authorisation

### Check authentication before authorisation
```python
# Always in this order
current_user = get_current_user(token)    # authentication
check_permission(current_user, resource)  # authorisation
```

### Resource ownership
Always verify the requesting user owns or has access to the
requested resource:

```python
def get_user_profile(profile_id: str, current_user: User) -> Profile:
    profile = db.get_profile(profile_id)
    if not profile:
        raise NotFoundError("Profile")
    if profile.user_id != current_user.id:
        raise ForbiddenError()  # 403, not 404 — don't leak existence
    return profile
```

Return 403 (not 404) when a resource exists but the user cannot
access it — 404 leaks information about resource existence.

---

## Security Rules

- Rate limit all auth endpoints — sign in, token refresh, password reset
- Invalidate all sessions on password change
- Log all auth events (sign in, sign out, token refresh) without
  logging the token values themselves
- Use HTTPS only — never transmit tokens over HTTP
- Set token expiry in configuration, not hardcoded
- Rotate refresh tokens on use — issue a new one, invalidate the old one
