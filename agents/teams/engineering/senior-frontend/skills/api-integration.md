# Skill — API Integration

> Owner: senior-frontend | Version: 1.0.0
> Standards for consuming backend APIs in Company-X React Native apps.

---

## API Layer Architecture

All API calls must go through a dedicated service layer.
Never call fetch or any HTTP client directly from a component,
screen, or hook.

```
src/services/
├── api.ts           ← Base API client — shared config, interceptors
├── auth.service.ts  ← Auth-related endpoints
├── user.service.ts  ← User-related endpoints
└── [domain].service.ts  ← One file per domain
```

---

## Base API Client

Centralise all HTTP configuration in `src/services/api.ts`:

```typescript
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig?.extra?.apiUrl ?? '';

const request = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = await getAuthToken();

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(response.status, await response.json());
  }

  return response.json();
};

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),
  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  patch: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: 'DELETE' }),
};
```

---

## Service Files

Each domain gets its own service file:

```typescript
// src/services/auth.service.ts
import { api } from './api';
import type { AuthResponse, GoogleAuthPayload } from '@/types/auth';

export const authService = {
  googleSignIn: (payload: GoogleAuthPayload): Promise<AuthResponse> =>
    api.post<AuthResponse>('/auth/google', payload),

  signOut: (): Promise<void> =>
    api.post<void>('/auth/signout', {}),
};
```

---

## Error Handling

Define a typed API error class:

```typescript
export class ApiError extends Error {
  constructor(
    public status: number,
    public body: unknown
  ) {
    super(`API error: ${status}`);
    this.name = 'ApiError';
  }
}
```

Handle errors at the hook level — not at the service level:

```typescript
const useGoogleSignIn = () => {
  const [error, setError] = useState<string | null>(null);

  const signIn = async (payload: GoogleAuthPayload) => {
    try {
      const result = await authService.googleSignIn(payload);
      // handle success
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.status === 401
          ? 'Authentication failed. Please try again.'
          : 'Something went wrong. Please try again.');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return { signIn, error };
};
```

Never expose raw API errors to the UI — always map to user-facing messages.

---

## Environment Configuration

API base URLs live in `app.config.ts` extra config:

```typescript
// app.config.ts
export default {
  expo: {
    extra: {
      apiUrl: process.env.API_URL ?? 'http://localhost:8000',
    },
  },
};
```

Access via `Constants.expoConfig?.extra?.apiUrl` — never via
`process.env` directly in application code.

Document all required environment variables in `.env.example`.

---

## Integration Rules

- Always type API responses — never use `any` for response types
- Never cache API responses in local component state across sessions —
  use the approved server state solution when available
- Always handle loading and error states for every API call
- Never make API calls on every render — use `useEffect` with
  correct dependencies or event handlers
- Mock API responses during UI development when backend is not ready —
  use a `__mocks__/` folder, never mock in production code
