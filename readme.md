# Ryadom (Рядом)

Online psychological support platform: booking sessions with specialists, a support chat bot and a knowledge library.
The interface is available in **Russian, English and Arabic** (Arabic uses a right-to-left layout).

## Stack

- Node.js 18+, Express, Sequelize
- PostgreSQL (SQLite can be used for quick local runs)
- Plain HTML/CSS/JS frontend (ES modules, no build step)
- Optional Python text-generation service (`ai/`)

## Project structure

```
src/
  app.js              Express app: security headers, API, static files
  server.js           Entry point: connects to the DB and starts the server
  config/             env.js (settings from .env), db.js (Sequelize connection)
  i18n/               Server messages in ru / en / ar
  models/             User, Psychologist, Session + associations (index.js)
  middleware/         auth (JWT), validate, rateLimit, errorHandler
  controllers/        auth, psychologist, session, chat
  routes/             /api/* routers
  services/chatbot.js Chat replies (keyword bot or AI service)
  utils/httpError.js
public/
  *.html              Pages: index, chat, booking, login, register, forgot-password, payment, 404
  css/main.css        All styles (design tokens, RTL support)
  js/api.js           fetch wrapper + token storage
  js/i18n.js          Translations ru / en / ar, language switcher logic
  js/layout.js        Header, navigation, form helpers
  js/components.js    DOM helpers, specialist card
  js/pages/*.js       One script per page
  images/, fonts/
scripts/              db-check, db-seed (seed / reset)
tests/                API tests (node:test, in-memory SQLite)
ai/                   Optional Flask model server
```

## Setup

```bash
npm install
cp .env.example .env      # then fill in DB_PASSWORD and JWT_SECRET
npm run db:seed           # create tables and demo specialists
npm run dev               # http://localhost:5000
```

Without PostgreSQL set `DB_DIALECT=sqlite` in `.env`; the database file is created in `data/`.

Upgrading from the old schema: run `npm run db:reset` once (it **drops all tables** and seeds them again).

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the server |
| `npm run dev` | Start with auto-reload |
| `npm test` | Run API tests |
| `npm run db:check` | Check the DB connection |
| `npm run db:seed` | Create tables, add demo specialists if empty |
| `npm run db:reset` | Drop and recreate all tables, then seed |

## API

All responses are JSON. Send `X-Lang: ru | en | ar` to get messages in that language.

| Method | Path | Auth | Description |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | — | Register, returns `{ token, user }` |
| POST | `/api/auth/login` | — | Login, returns `{ token, user }` |
| GET | `/api/auth/me` | Bearer | Current user |
| POST | `/api/auth/forgot-password` | — | Password recovery request (email sending not configured yet) |
| GET | `/api/psychologists` | — | List of specialists |
| GET | `/api/psychologists/:id` | — | One specialist |
| POST | `/api/psychologists` | admin | Add a specialist |
| GET | `/api/sessions` | Bearer | My sessions |
| POST | `/api/sessions` | Bearer | Book `{ psychologistId, startsAt, format, note }` |
| PATCH | `/api/sessions/:id/cancel` | Bearer | Cancel my session |
| POST | `/api/chat` | — | `{ message }` → `{ reply }` |

## AI service (optional)

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r ai/requirements.txt
python ai/model_server.py         # http://127.0.0.1:8000
```

Then set `AI_SERVICE_URL=http://127.0.0.1:8000` in `.env`. If the service is unavailable, the built-in keyword bot answers.

## Security notes

- Passwords are hashed with bcrypt and never returned by the API.
- JWT secret comes from `.env`; the server refuses to start in production with a weak secret.
- Input is validated on the server; login, registration and chat are rate limited.
- Helmet sets security headers including a Content Security Policy (no inline scripts).
- The payment page is a demo: card data stays in the browser and is never sent to the server.
