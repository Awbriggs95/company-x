# Skill — Platform-Specific Behaviour (iOS / Android)

> Owner: senior-frontend | Version: 1.0.0
> Standards for handling platform differences in Company-X React Native apps.

---

## Platform Detection

Use `Platform.OS` for conditional behaviour. Keep platform-specific
logic at the component level — never scatter it through business logic.

```typescript
import { Platform } from 'react-native';

// Simple conditional
const shadowStyle = Platform.OS === 'ios'
  ? { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1 }
  : { elevation: 4 };

// Platform.select for multiple values
const fontSize = Platform.select({
  ios: 16,
  android: 15,
  default: 16,
});
```

For larger platform differences, use platform-specific files:

```
ComponentName.ios.tsx    ← loaded on iOS only
ComponentName.android.tsx ← loaded on Android only
ComponentName.tsx        ← fallback for both / web
```

---

## iOS-Specific Patterns

### Safe area insets
Always wrap screens with `SafeAreaView` or use `useSafeAreaInsets`:

```typescript
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Screen() {
  return (
    <SafeAreaView className="flex-1">
      {/* content */}
    </SafeAreaView>
  );
}
```

Never use fixed padding to simulate safe areas — it breaks on
different device sizes and notch configurations.

### Haptic feedback
Use `expo-haptics` for tactile feedback on iOS:

```typescript
import * as Haptics from 'expo-haptics';

const handlePress = async () => {
  await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  // ... action
};
```

### Keyboard behaviour
Use `KeyboardAvoidingView` with `behavior="padding"` on iOS:

```typescript
<KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  className="flex-1"
>
```

---

## Android-Specific Patterns

### Back button handling
Android has a hardware back button. Handle it explicitly for screens
where the default back behaviour is incorrect:

```typescript
import { BackHandler } from 'react-native';
import { useFocusEffect } from 'expo-router';

useFocusEffect(
  useCallback(() => {
    const onBackPress = () => {
      // Return true to prevent default back behaviour
      return shouldPreventBack;
    };
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [shouldPreventBack])
);
```

### Status bar
Configure the status bar explicitly — default behaviour differs between
iOS and Android:

```typescript
import { StatusBar } from 'expo-status-bar';

<StatusBar style="dark" backgroundColor="transparent" translucent />
```

### Ripple effect
Use `TouchableNativeFeedback` or Pressable with android_ripple for
Android touch feedback:

```typescript
<Pressable
  android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
  onPress={handlePress}
>
```

---

## Configuration Files

### iOS — `app.json` / `app.config.ts`
```json
{
  "ios": {
    "bundleIdentifier": "com.company-x.app",
    "infoPlist": {
      "NSCameraUsageDescription": "Used to scan QR codes"
    }
  }
}
```

Add `infoPlist` entries for every native permission your feature uses.
Missing entries cause App Store rejection.

### Android — `app.json` / `app.config.ts`
```json
{
  "android": {
    "package": "com.companyx.app",
    "permissions": ["CAMERA"],
    "googleServicesFile": "./google-services.json"
  }
}
```

`google-services.json` is required for any Google service (OAuth,
Firebase, etc.) on Android. It must never be committed to Git —
add it to `.gitignore` and reference it from secure storage.

---

## Testing on Both Platforms

Before reporting any work complete that touches UI or native behaviour:

```bash
# Start iOS simulator
npx expo start --ios

# Start Android emulator
npx expo start --android
```

Document any platform-specific findings in your Senior report's
Notes for Lead section — especially if behaviour differs between
platforms in ways that QA should verify independently.

---

## Common Platform Gotchas

| Issue | iOS behaviour | Android behaviour | Solution |
|---|---|---|---|
| Shadow | Uses shadow\* props | Uses elevation | Platform.select |
| Font rendering | Slightly larger | Slightly smaller | Test on both |
| Touch target size | 44×44pt minimum | 48×48dp minimum | Use larger value |
| Keyboard type | Smooth slide up | Varies by device | KeyboardAvoidingView |
| Scroll bounce | Bounces by default | No bounce | bounces={false} if unwanted |
| Long press | 500ms default | 500ms default | Consistent |
