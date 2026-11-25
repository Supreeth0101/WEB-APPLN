# Web App — Next.js + TypeScript + PostgreSQL

A small web app with a **Register** page, a **Login** page and a protected **Home** page.

- Next.js 16 (App Router) running on Node.js, written in TypeScript
- PostgreSQL via `pg`
- Passwords hashed with `bcryptjs`
- Sessions stored in an HTTP-only signed cookie (JWT via `jose`, 7 days)

## Prerequisites

- Node.js 20.6 or newer
- PostgreSQL 13 or newer running locally (or a hosted connection string)

## Setup

1. **Create the database** (in psql or pgAdmin):

   ```sql
   CREATE DATABASE authapp;
   ```

2. **Create `.env.local`** — copy `.env.example` and fill in your values:

   ```
   DATABASE_URL=postgres://postgres:YOUR_PASSWORD@localhost:5432/authapp
   SESSION_SECRET=<long random string, 32+ characters>
   ```

   Generate a secret with:
   ```
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **Install packages and create the table:**

   ```
   npm install
   npm run db:init
   ```

4. **Run it:**

   ```
   npm run dev
   ```

   Open http://localhost:3000 — you'll be sent to `/login`. Click **Register** to create an account.

For production: `npm run build` then `npm start`.

## Project structure

```
db/schema.sql                  users table
scripts/init-db.mjs            runs schema.sql against DATABASE_URL
src/lib/db.ts                  Postgres pool + user queries
src/lib/session.ts             create / read / delete session cookie
src/app/api/auth/register      POST  name, email, password
src/app/api/auth/login         POST  email, password
src/app/api/auth/logout        POST
src/app/login/page.tsx         login page
src/app/register/page.tsx      registration page
src/app/home/page.tsx          protected home page (redirects to /login if not signed in)
src/components/AuthForm.tsx    shared login/register form
src/app/globals.css            styles
```

## Validation rules

- Name required (max 100 chars)
- Valid email, unique (case-insensitive)
- Password at least 8 characters; confirm password must match
