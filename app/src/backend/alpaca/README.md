Alpaca Integration (Plan)

Environment:
- APCA-API-KEY-ID
- APCA-API-SECRET-KEY
- APCA-API-BASE: https://paper-api.alpaca.markets (switch to https://api.alpaca.markets for live)

Daily Batch Flow:
1) Aggregate each user's ETF pool increment from matches during the day
2) At a scheduled time, place fractional buy orders for each selected ETF (min $5 per user)
3) Record fills and update per-user ETF holdings and pool history

REST Example:

curl -X GET \
  -H "APCA-API-KEY-ID: $APCA_API_KEY_ID" \
  -H "APCA-API-SECRET-KEY: $APCA_API_SECRET_KEY" \
  "$APCA_API_BASE/v2/account"








