Backend (Express + Firebase Admin)

Setup
- Place your Firebase service account JSON as `backend/serviceAccountKey.json`.
- Copy `env.example` to `.env` and adjust values as needed.

Install & Run
```bash
cd /Users/chaching/Desktop/ggg/backend
npm install
npm run dev
```

Endpoints
- POST `/signup` { email, password }
- POST `/verifyToken` { token }
- GET  `/health`


