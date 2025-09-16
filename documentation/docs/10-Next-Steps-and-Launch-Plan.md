---
id: next-steps-launch
title: Next Steps & Launch Plan
sidebar_label: Next Steps & Launch Plan
---

A focused checklist of what’s left to ship and a realistic timeline to TestFlight and App Store.

## Prioritized Next Steps

1) Authentication backend
- Connect `AuthService` to real backend (Supabase or custom API)
- Persist profile: username, email, diamonds, gamesPlayed, stats
- Secure auth (JWT/Firebase tokens) and .env configuration

2) Payments (Apple Pay via Stripe)
- Install and configure `@stripe/stripe-react-native`
- Backend: Create PaymentIntent endpoint; confirm and credit diamonds
- Update `AddMoney` flow; record top‑ups in history

3) Matchmaking service
- Implement Node.js + Socket.IO (or Firebase RTDB)
- Endpoints/events: queue:join, match:start, match:finish, match:result
- Persistence for matches and results; queue cleanup jobs

4) Unity bridge + result payload
- Integrate Unity export via native bridge (`react-native-unity-play` or custom)
- Define consistent result payload (win/loss, score, matchId)
- Update local history and backend on game finish

5) Leaderboard (dynamic)
- API to fetch rankings (diamonds, wins)
- Render list with pagination and basic filters

6) Rewards
- Referral codes and review bonuses; server-side validation
- Update diamonds and history entries

7) Version gating
- Remote config endpoint with current app version
- In-app modal that blocks when outdated

8) TestFlight prep
- Icons, splash, privacy policy, Store listing text
- iOS build tuning for Unity bridge; device testing

## Week-by-Week Timeline (estimate)

Week 1
- Auth backend wiring and profile persistence
- Basic leaderboard API shape

Week 2
- Stripe + Apple Pay integration (frontend + backend)
- Update `AddMoney` flow and credit logic

Week 3
- Matchmaking service (queues, start, finish, result)
- Connect app to service; solo fallback retained

Week 4
- Unity bridge integration and result payload plumbing
- End-to-end: Game → result → DB → Results screen

Week 5
- Leaderboard dynamic data + pagination
- Rewards (referral + review) wired to backend

Week 6
- Version gating modal + remote config
- QA pass across devices; fix stability issues

Week 7
- TestFlight setup: icons, splash, listing, privacy
- Internal testing build; capture feedback

Week 8
- Address reviewer blockers and polish
- Submit for App Store review

Notes
- Parallelization is possible: a backend engineer can advance matchmaking while mobile focuses on Stripe and Unity bridge.
- If Apple Pay setup or Unity bridge adds friction, buffer +1–2 weeks.



