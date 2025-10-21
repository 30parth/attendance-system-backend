# Attendance Backend (TypeScript + Express + Mongoose)

This is a minimal scaffold for an Express backend using TypeScript and Mongoose.

Setup

1. Copy `.env.example` to `.env` and set `MONGODB_URI`.
2. Install dependencies: `npm install`.
3. Run in development: `npm run dev` (requires Node and npm).
4. Build: `npm run build` and start: `npm start`.

Endpoints

- GET /health - returns { status: 'ok' }
- POST /users - create a user with { name, email }
