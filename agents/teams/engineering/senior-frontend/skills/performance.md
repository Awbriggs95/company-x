# Skill — Performance Optimisation

> Owner: senior-frontend | Version: 1.0.0
> Standards for maintaining performance in Company-X React Native apps.

---

## Performance Mindset

Mobile performance is more constrained than web. A component that
renders fine on a desktop browser may cause dropped frames on a
mid-range Android device. Always develop with a mid-range Android
device as your performance baseline, not a flagship simulator.

---

## Render Optimisation

### Avoid unnecessary re-renders

The most common performance issue in React Native is components
re-rendering when their props have not meaningfully changed.

```typescript
// ✅ Memoize components that receive stable props
const UserCard = React.memo(({ user }: { user: User }) => {
  return <View>...</View>;
});

// ✅ Memoize callbacks passed as props
const handlePress = useCallback(() => {
  navigateTo(userId);
}, [userId]);

// ✅ Memoize expensive computations
const sortedItems = useMemo(
  () => items.sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);
```

Do not add `React.memo`, `useCallback`, or `useMemo` everywhere
by default — add them only when you have identified an actual
re-render problem or a genuinely expensive computation.
Premature optimisation adds complexity without benefit.

### Identify re-render issues
Use React DevTools Profiler or Expo's built-in performance tools
to identify components that re-render excessively before optimising.

---

## List Performance

Large lists are the most common cause of poor scroll performance.

```typescript
// ✅ FlashList for lists over 50 items
import { FlashList } from '@shopify/flash-list';

<FlashList
  data={items}
  renderItem={({ item }) => <ItemCard item={item} />}
  estimatedItemSize={80}
  keyExtractor={(item) => item.id}
/>

// ✅ FlatList acceptable for lists under 50 items
<FlatList
  data={items}
  renderItem={({ item }) => <ItemCard item={item} />}
  keyExtractor={(item) => item.id}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={5}
/>
```

Never use `ScrollView` with `map()` for lists — it renders all items
at once regardless of visibility.

Always provide `estimatedItemSize` for FlashList — without it,
scroll performance degrades significantly.

---

## Image Performance

```typescript
// ✅ Always use expo-image
import { Image } from 'expo-image';

<Image
  source={{ uri: imageUrl }}
  style={{ width: 100, height: 100 }}
  contentFit="cover"
  transition={200}
  placeholder={blurhash}
/>
```

Always specify explicit width and height on images — never let images
determine their own dimensions from the network response.

Use blurhash placeholders for images loaded from a URL — prevents
layout shift during image load.

---

## Bundle Size

- Avoid large libraries when a smaller alternative exists
- Use `import { specific } from 'library'` over `import * as lib from 'library'`
- Check bundle impact before adding any new dependency:
  ```bash
  npx expo-bundle-analyzer
  ```
- Never import an entire icon library — import individual icons only

---

## Animation Performance

Use `react-native-reanimated` for all animations — never the built-in
`Animated` API for anything more than trivial transitions:

```typescript
// ✅ Reanimated runs on the UI thread — smooth 60fps
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

// ❌ Animated API runs on JS thread — can drop frames
import { Animated } from 'react-native';
```

Always run animations on the UI thread — use `useAnimatedStyle`
and `useSharedValue`, not `useNativeDriver: true` workarounds.

---

## Startup Performance

- Defer non-critical initialisation until after first render
- Use `expo-splash-screen` to hold the splash screen while critical
  resources load — never show a blank screen during startup
- Avoid synchronous operations on the main thread during startup
- Load fonts with `expo-font` before rendering text-heavy screens
