# Skill — Navigation (Expo Router)

> Owner: senior-frontend | Version: 1.0.0
> Standards for implementing navigation in Company-X apps using
> Expo Router file-based routing.

---

## Expo Router Fundamentals

Company-X uses Expo Router for all navigation. Expo Router uses
file-based routing — the file structure in `app/` defines the routes.

```
app/
├── _layout.tsx          ← Root layout — providers, global config
├── index.tsx            ← Root route "/"
├── (auth)/
│   ├── _layout.tsx      ← Auth group layout
│   ├── login.tsx        ← Route "/login"  (not in URL)
│   └── register.tsx     ← Route "/register"
├── (tabs)/
│   ├── _layout.tsx      ← Tab bar layout
│   ├── home.tsx         ← Tab route "/home"
│   └── profile.tsx      ← Tab route "/profile"
└── [id].tsx             ← Dynamic route "/[id]"
```

Route groups `(name)` organise routes without affecting the URL.
Use them to apply shared layouts to related screens.

---

## Navigation Standards

### Navigating between screens

Use the `router` object from `expo-router` for programmatic navigation:

```typescript
import { router } from 'expo-router';

// Push a new screen
router.push('/profile');

// Replace current screen (no back button)
router.replace('/home');

// Go back
router.back();

// Navigate with params
router.push({ pathname: '/user/[id]', params: { id: userId } });
```

Use the `<Link>` component for declarative navigation in JSX:

```typescript
import { Link } from 'expo-router';

<Link href="/profile">Go to Profile</Link>
<Link href={{ pathname: '/user/[id]', params: { id: userId } }} asChild>
  <TouchableOpacity>...</TouchableOpacity>
</Link>
```

Never use React Navigation directly — Expo Router wraps it.

### Reading route params

```typescript
import { useLocalSearchParams } from 'expo-router';

const { id } = useLocalSearchParams<{ id: string }>();
```

Always type your params — never use untyped `useLocalSearchParams`.

---

## Layout Patterns

### Root layout — `app/_layout.tsx`
Wrap the entire app with providers here:

```typescript
export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </AuthProvider>
  );
}
```

### Auth guard pattern
Redirect unauthenticated users before rendering protected screens:

```typescript
import { Redirect } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function ProtectedScreen() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <LoadingSpinner />;
  if (!user) return <Redirect href="/login" />;

  return <ScreenContent />;
}
```

Never conditionally render navigation — always use `<Redirect />`.

---

## Deep Linking

Configure deep links in `app.json`:

```json
{
  "expo": {
    "scheme": "company-x",
    "web": {
      "bundler": "metro"
    }
  }
}
```

Test deep links on both platforms before reporting complete:
```bash
# iOS
xcrun simctl openurl booted "company-x://profile"

# Android
adb shell am start -W -a android.intent.action.VIEW -d "company-x://profile"
```

---

## Navigation Rules

- Never hardcode route strings outside of a constants file — define
  routes as typed constants and import them
- Always handle the loading state before redirecting — avoid flash of
  wrong content
- Tab navigators must have `unmountOnBlur: false` unless there is a
  specific reason to unmount — preserves scroll position and state
- Modal screens must use `presentation: 'modal'` in their Stack.Screen config
- Never nest navigators more than 3 levels deep
