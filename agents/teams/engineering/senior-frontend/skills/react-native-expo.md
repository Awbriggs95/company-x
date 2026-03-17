# Skill — React Native / Expo Development

> Owner: senior-frontend | Version: 1.0.0
> Core development standards and patterns for React Native with Expo
> managed workflow.

---

## Project Setup Assumptions

All Company-X mobile projects use:
- React Native with Expo managed workflow
- TypeScript — strict mode
- Expo SDK (latest stable at project creation)
- Expo Router for navigation
- NativeWind for styling

Never eject from Expo managed workflow without an approved brief
and explicit operator instruction.

---

## Component Standards

### File structure per component
```
src/
├── screens/          ← Full screens composed of components
├── components/       ← Reusable UI components
│   └── ComponentName/
│       ├── index.tsx         ← Component implementation
│       └── ComponentName.types.ts  ← TypeScript types if complex
├── hooks/            ← Custom hooks
├── utils/            ← Pure utility functions
├── services/         ← API calls and external integrations
├── constants/        ← App-wide constants
└── types/            ← Shared TypeScript types
```

### Component rules
- One component per file — no exceptions
- Components must be typed — no implicit `any`
- Functional components only — no class components
- Props interface defined above the component, not inline
- Export as default at the bottom of the file

```typescript
// ✅ Correct
interface LoginScreenProps {
  onSuccess: () => void;
}

const LoginScreen = ({ onSuccess }: LoginScreenProps) => {
  return (/* ... */);
};

export default LoginScreen;
```

### Naming conventions
- Components: PascalCase — `LoginScreen`, `OAuthButton`
- Hooks: camelCase with `use` prefix — `useAuthSession`
- Utilities: camelCase — `formatDate`
- Constants: SCREAMING_SNAKE_CASE — `API_BASE_URL`
- Types and interfaces: PascalCase — `UserProfile`, `AuthState`

---

## Styling Standards

Use NativeWind utility classes as the primary styling approach.
Use StyleSheet only for dynamic styles that cannot be expressed
as utility classes.

```typescript
// ✅ NativeWind preferred
<View className="flex-1 bg-white px-4 py-6">
  <Text className="text-xl font-bold text-gray-900">Hello</Text>
</View>

// ✅ StyleSheet for dynamic values
const styles = StyleSheet.create({
  container: {
    height: dynamicHeight,
  }
});
```

Never use inline style objects — `style={{ margin: 8 }}` is not acceptable
outside of genuinely dynamic values.

---

## UI States

Every screen or component that fetches data or performs async operations
must implement all three states:

```typescript
// Always handle all three
if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorState message={error.message} onRetry={refetch} />;
if (!data) return <EmptyState />;

return <MainContent data={data} />;
```

Never render a screen that can silently fail or show nothing.

---

## Expo-Specific Rules

- Use `expo-constants` for environment variables — never `process.env` directly
- Use `expo-secure-store` for sensitive data — never AsyncStorage for secrets
- Use `expo-router` for all navigation — no React Navigation directly
- Use `expo-image` for images — better performance than `<Image />`
- Test on both iOS and Android simulators before reporting complete
- Check `app.json` / `app.config.ts` before adding new Expo plugins

---

## Performance Rules

- Avoid anonymous functions in JSX — they cause unnecessary re-renders
- Use `React.memo` for components that receive stable props
- Use `useCallback` for functions passed as props
- Use `useMemo` for expensive computations
- Use `FlashList` from `@shopify/flash-list` for long lists — never `FlatList`
  for lists over 50 items
- Avoid deeply nested component trees — flatten where possible

---

## Accessibility

Every interactive element must have an `accessibilityLabel`:

```typescript
<TouchableOpacity
  accessibilityLabel="Sign in with Google"
  accessibilityRole="button"
  onPress={handleGoogleSignIn}
>
```

Never ship a screen without accessibility labels on interactive elements.
