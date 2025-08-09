# Disrupt Gaming – Post‑Auth NativeBase Homepage Integration & Customization Guide

This handoff explains how to replace the post‑login experience with a NativeBase v3 Kitchensink–style Home screen, hook it to your backend, and customize theme/branding. It targets the current codebase located in `template/` (React Native CLI, no Expo).

## 0) Current App Baseline (as implemented)
- Language: English default.
- Theme: Light globally (white background, dark text). Login/Signup are dark (black background).
- Auth: Token persisted in MMKV with a mock fallback (works without backend).
  - Files: `src/hooks/domain/auth/*`, `src/services/instance.ts`, `src/storage/index.ts`.
  - Env: `API_URL` (optional). If present, real endpoints are called; otherwise mock is used.
- Navigation: Drawer + Tabs after auth.
  - Tabs: Home, Profile, Leaderboard, Notifications, Search (`src/navigation/AppTabs.tsx`).
  - Drawer: App (tabs), Settings, Add Money, Logout (`src/navigation/AppDrawer.tsx`).
  - Root: `src/navigation/Application.tsx` (routes user to Login/Signup or Drawer based on token), Startup gate at boot.
- Branding/Assets
  - App icon & iOS splash use the bolt image (already applied).
  - Login/Signup show `src/assets/branding/disrupt.png`.

## 1) Prerequisites
- Node 18+
- Xcode latest (for iOS) and Cocoapods installed
- Yarn 1.x
- React Native CLI environment per the upstream boilerplate
- Git configured

Install UI/navigation deps (some are already present):

```bash
yarn add @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs @react-navigation/drawer react-native-safe-area-context react-native-screens react-native-gesture-handler react-native-reanimated native-base react-native-svg react-native-vector-icons
```

NativeBase peer deps docs: https://docs.nativebase.io/installations

If iOS pods change:

```bash
cd ios && pod install && cd ..
```

## 2) Environment variables
We use `API_URL` for network calls via `ky` in `src/services/instance.ts`.

Create `template/.env`:

```
API_URL=https://api.your-domain.com
```

The project ships with `babel-plugin-inline-dotenv`, so `process.env.API_URL` is resolved at build time.

## 3) Auth wiring (replace mocks when backend is ready)
- Replace endpoints in:
  - `src/hooks/domain/auth/authService.ts` → `login`, `signup`, `me`.
- Token is saved under `StorageKeys.authToken` (MMKV).
- Logout clears token and invalidates React Query cache.

Startup→Routing:
- `src/screens/Startup/Startup.tsx` chooses `Login` vs `Example` (Drawer) based on token.
- After successful `login/signup`, we `navigation.reset({ routes: [{ name: Paths.Example }] })` which loads Drawer+Tabs.

## 4) Post‑auth Home: integrate NativeBase Kitchensink style
We recommend using the layout and components style from NativeBase Kitchensink.

References:
- Kitchensink repo: https://github.com/GeekyAnts/nativebase-v3-kitchensink
- NativeBase docs: https://docs.nativebase.io/

### Steps
1) Copy the desired Home screen UI from Kitchensink into your project:
   - Create `src/screens/Home/Home.tsx` and any local components under `src/screens/Home/components/*`.
2) Wrap the app with NativeBaseProvider in `src/App.tsx`:

```tsx
import { NativeBaseProvider, extendTheme } from 'native-base';
// Keep existing providers

const nbTheme = extendTheme({
  colors: {
    primary: {
      500: '#ff0033', // Disrupt red
    },
    background: {
      50: '#ffffff',
    },
  },
  config: { initialColorMode: 'light' },
});

function App() {
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider theme={nbTheme}>
          <ThemeProvider storage={storage}>
            <ApplicationNavigator />
          </ThemeProvider>
        </NativeBaseProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
```

3) Route Home in Tabs
- Update `src/navigation/AppTabs.tsx` to import and use your `Home` screen instead of the placeholder.

```tsx
import Home from '@/screens/Home/Home';

<Tab.Screen name="Home" component={Home} />
```

4) Replace Kitchensink dummy data
- In `Home.tsx`, fetch real data:

```ts
const [games, setGames] = useState([]);
useEffect(() => {
  fetch(`${process.env.API_URL}/games`).then(r => r.json()).then(setGames);
}, []);
```

## 5) Theming & Branding
- Global theme is driven by our ThemeProvider and can co‑exist with NativeBase theme. Prefer NativeBase theme tokens inside NB components.
- Update brand colors/typography in the extended theme shown above.
- Assets:
  - Login/Signup hero: `src/assets/branding/disrupt.png`
  - iOS AppIcon & Splash are already set to the bolt image under `ios/Boilerplate/Images.xcassets/*`.
  - For Android parity, add adaptive icons and splash (open a task if needed).

## 6) Tabs & Drawer customization
- Tabs file: `src/navigation/AppTabs.tsx`
  - Replace placeholder screens with real ones: `Profile`, `Leaderboard`, `Notifications`, `Search`.
  - Add icons via `react-native-vector-icons` or NativeBase `Icon`.
- Drawer file: `src/navigation/AppDrawer.tsx`
  - Keep `Settings`, `AddMoney`, `Logout`. Implement real screens and actions.

## 7) Premium/subscriptions (outline)
- Add `isPremium` to `/user/profile` response.
- Gate premium components in `Home` and other screens.
- Stripe integration suggestion (server‑driven): create session → return URL/token → confirm client‑side.

## 8) Unity integration (outline)
- Use `react-native-unity` or `react-native-unity-play`.
- From `Home`, on game card press: `navigation.navigate('UnityGame', { gameId })` and load the Unity view.

## 9) Testing, build, run
- Start Metro (avoid 8081 conflicts):

```bash
# kill old metro if needed
pkill -f "react-native start" || true
lsof -ti tcp:8081 | xargs kill -9 2>/dev/null || true

# start and run iOS
yarn start
yarn ios
```

- Type check & tests:

```bash
yarn tsc
yarn test
```

## 10) File map (key locations)
- Auth: `src/hooks/domain/auth/*`, `src/storage/index.ts`
- Networking: `src/services/instance.ts` (Bearer header injection)
- Navigation: `src/navigation/*`
- Screens: `src/screens/*`
- Theme: `src/theme/*`
- Translations: `src/translations/*`
- Branding asset: `src/assets/branding/disrupt.png`

## 11) Handoff checklist
- [ ] Home screen implemented using NativeBase components
- [ ] Tabs wired to real screens
- [ ] Drawer screens implemented (Settings, Add Money, Logout)
- [ ] API URL in `.env` and endpoints implemented
- [ ] Replace mock auth with real backend
- [ ] Update icons and splash on Android (iOS done)
- [ ] Stripe/premium gating added where needed
- [ ] Unity integration tested on target devices

## References
- TheCodingMachine Boilerplate: https://github.com/TheCodingMachine/react-native-boilerplate
- NativeBase Kitchensink: https://github.com/GeekyAnts/nativebase-v3-kitchensink
- NativeBase Docs: https://docs.nativebase.io/

---
Need me to scaffold `Home` with NativeBase now and wire it into `AppTabs`? I can add the screen and a sample card layout in a follow‑up edit.