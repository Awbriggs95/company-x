# Skill — Third-Party Service Integration

> Owner: senior-backend | Version: 1.0.0
> Standards for integrating external services in Company-X backend.

---

## Before Integrating Any Service

1. Confirm the service is approved in `shared/stack.md`
2. If not listed — escalate to Lead. Do not integrate unapproved services.
3. Read the service's official documentation — do not rely on memory
4. Understand the service's rate limits, pricing, and failure modes
   before writing a single line of code

---

## Integration Architecture

Every third-party service gets its own client module:

```
src/
└── integrations/
    ├── google/
    │   ├── client.py      ← HTTP client and auth
    │   └── schemas.py     ← Request/response types
    ├── stripe/
    │   ├── client.py
    │   └── schemas.py
    └── sendgrid/
        ├── client.py
        └── schemas.py
```

Never scatter third-party API calls across business logic — isolate
them. If the third-party changes their API, you change one file.

---

## Client Pattern

```python
# integrations/google/client.py
import httpx
from src.config import settings
from src.integrations.google.schemas import GoogleTokenInfo
from src.exceptions import ExternalServiceError

class GoogleClient:
    BASE_URL = "https://oauth2.googleapis.com"

    async def verify_token(self, token: str) -> GoogleTokenInfo:
        """
        Verify a Google OAuth ID token.

        Raises:
            ExternalServiceError: If Google returns a non-200 response.
        """
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(
                    f"{self.BASE_URL}/tokeninfo",
                    params={"id_token": token},
                    timeout=10.0,
                )
                response.raise_for_status()
                return GoogleTokenInfo(**response.json())
            except httpx.HTTPStatusError as e:
                raise ExternalServiceError(
                    service="Google",
                    status=e.response.status_code
                )
            except httpx.TimeoutException:
                raise ExternalServiceError(
                    service="Google",
                    message="Request timed out"
                )

google_client = GoogleClient()
```

---

## Credentials and Secrets

- All third-party credentials live in environment variables — never hardcoded
- Document every required credential in `.env.example`
- Never log credentials, tokens, or API keys
- Rotate credentials immediately if they are accidentally committed to Git
  and escalate to Lead — this is a security incident

---

## Resilience Patterns

### Timeouts
Always set explicit timeouts on all external calls:

```python
# ✅ Always set timeout
response = await client.get(url, timeout=10.0)

# ❌ No timeout — can hang indefinitely
response = await client.get(url)
```

Timeouts by call type:
- Read operations: 10 seconds
- Write operations: 15 seconds
- Webhook delivery: 5 seconds

### Retries
Use exponential backoff for transient failures:

```python
import asyncio

async def with_retry(fn, max_attempts: int = 3):
    for attempt in range(max_attempts):
        try:
            return await fn()
        except TransientError:
            if attempt == max_attempts - 1:
                raise
            await asyncio.sleep(2 ** attempt)
```

Only retry on transient errors (5xx, timeout). Never retry on
4xx errors — they indicate a problem with the request, not the service.

### Circuit breaker
For services that are called frequently, implement a circuit breaker
pattern to avoid hammering a failing service:
- Open circuit after 5 consecutive failures
- Half-open after 30 seconds — allow one test request
- Close circuit on success

---

## Webhook Handling

If integrating a service that sends webhooks:

- Always verify webhook signatures — never process unverified webhooks
- Respond with 200 immediately — process asynchronously
- Idempotency — webhooks may be delivered more than once, handle
  duplicates gracefully
- Log all incoming webhooks with their payload before processing

---

## Testing Integrations

- Never call real third-party APIs in unit tests — mock the client
- Write integration tests that call real APIs but mark them as
  `@pytest.mark.integration` and exclude from normal test runs
- Test failure modes explicitly — what happens when the service
  returns 500, times out, or returns unexpected data?
