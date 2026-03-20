# Skill — State Management

> Owner: senior-frontend | Version: 1.0.0
> Guidance for managing state in Company-X React Native applications.
> Check shared/stack.md for the current approved state management library
> before implementing anything.

---

## Check Stack First

State management library selection is ❓ Undecided in `shared/stack.md`
until a Research Spike is completed and approved.

**Before implementing any global state:**
1. Check `shared/stack.md` — is a library now approved?
2. If approved — use that library, read its skill file if one exists
3. If still ❓ Undecided — escalate to Lead immediately. Do not choose a
   library independently.

The guidance below applies once a library is approved and covers
principles that apply regardless of which library is chosen.

---

## State Categories

Classify state before deciding where it lives:

| Category | Definition | Where it lives |
|---|---|---|
| Local UI state | Belongs to one component only — input values, toggles, modals | `useState` in the component |
| Shared UI state | Needed by multiple components on the same screen | Lifted to nearest common parent |
| Global app state | Needed across multiple screens — auth, user profile, theme | Approved global state library |
| Server state | Data fetched from an API | Dedicated server state solution |
| Form state | Form field values and validation | Local or form library |

Never put local UI state in global state — it creates unnecessary
coupling and re-renders.

---

## Local State Rules

Use `useState` for simple local state:

```typescript
const [isVisible, setIsVisible] = useState(false);
const [inputValue, setInputValue] = useState('');
```

Use `useReducer` for complex local state with multiple sub-values
or state transitions that follow specific rules:

```typescript
type AuthState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; user: User }
  | { status: 'error'; message: string };
```

Use discriminated unions for state that has meaningful transitions —
never boolean flags like `isLoading`, `isError`, `isSuccess` together.

---

## Server State Rules

Until a server state library is approved in `shared/stack.md`,
handle API calls with a custom hook pattern:

```typescript
const useUser = (userId: string) => {
  const [data, setData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetchUser(userId)
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [userId]);

  return { data, isLoading, error };
};
```

All API calls must go through `src/services/` — never call fetch or
axios directly inside a component or screen.

---

## Global State Rules

Once a library is approved:

- Keep global state minimal — only what genuinely needs to be global
- Auth state is always global
- User profile data is always global
- UI state (modals, toasts) should stay local unless cross-screen
- Never store derived data in global state — compute it from source data

---

## State and Performance

- Colocate state as close to where it is used as possible
- Split large global state into smaller independent stores
- Avoid storing objects that change reference frequently — use selectors
- Never store raw API responses in global state — transform to the shape
  your UI needs
