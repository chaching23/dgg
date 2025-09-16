---
id: app-store-roadmap
title: App Store Roadmap (Concise)
sidebar_label: App Store Roadmap
---

This is a condensed roadmap aligned with what’s already implemented and what remains to ship to TestFlight and the App Store.

## Done

- **Foundation & Navigation**: React Native app scaffold with tabs (`Results`, `Leaders`, `Play`, `Rewards`, `Profile`).
- **Unity Game Flow (placeholder)**: `GameMatch` → `UnityGame` with simulated Win/Loss; returns to `Results`.
- **Matchmaking scaffold**: Socket connection + queue/join/start/result handlers.
- **Results**: History list supports cash or diamonds entries, updates basic progression and ETF pool placeholder.
- **Rewards (UI scaffold)**: Rewards screen present; actions to be wired to backend later.
- **Wallet + Top‑up scaffolds**: In‑app purchase stub and Apple Pay placeholder; web checkout link added; local diamonds balance stored.
- **Auth (mocked)**: Email/password login and signup via `AuthService` with mock responses when no API is configured; token persistence.

## In Progress / Next

- **Authentication backend**: Connect `AuthService` to real backend (Supabase or custom API). Persist user profile: username, email, diamonds, gamesPlayed, stats.
- **Payments**: Integrate `@stripe/stripe-react-native` for Apple Pay. Confirm PaymentIntent on backend, credit diamonds, record in history.
- **Matchmaking backend**: Implement Node.js + Socket.IO or Firebase RTDB service for real queues, match start, and result reporting from Unity.
- **Unity bridge**: Replace placeholder with Unity export and native bridge (e.g., `react-native-unity-play`). Define result payload to update DB and local cache.
- **Leaderboard**: Query dynamic rankings (diamonds, wins, or earnings) from backend and render.
- **Rewards**: Implement referral codes and review bonuses; write gems to user profile and local cache.
- **Version gating**: Remote config endpoint to force update modal when app is outdated.
- **TestFlight prep**: Icons, splash, privacy policy, Store listing, iOS build tuning for Unity bridge.

## Submission Notes (Apple)

- **Apple Pay**: Requires Organization Apple Developer account and Stripe setup before submission.
- **Privacy**: Provide data collection disclosure and privacy policy URLs in App Store Connect.
- **Login**: Include a demo/test account for review or clear signup flow.
- **Unity**: Ensure the app launches to home, starts a game, and returns without crash on real device.

## Tech Stack

- **Frontend**: React Native (TypeScript)
- **Games**: Unity (embedded via native bridge)
- **Backend**: Node.js (Express) + Socket.IO or Firebase for MVP
- **DB**: Firestore or Postgres (via Supabase)
- **Payments**: Stripe (Apple Pay); optional PayPal via web checkout
- **Hosting**: Vercel (docs/web) + Firebase/Heroku/AWS for backend



