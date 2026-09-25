# AEGIS × UFX — Stage 1 MVP

Parent platform **AEGIS** + consumer app **UFX**. Hosted on **Vercel** + **Neon Postgres**.

Users open UFX. You operate AEGIS Control Center.

## Demo accounts

Password for all: `Demo123!`

| Email | Opens |
|-------|--------|
| `henry@ufx.app` | UFX |
| `maya@ufx.app` | UFX |
| `owner@aegis.dev` | AEGIS Control Center |
| `mod@aegis.dev` | AEGIS (Moderator) |

Empty databases auto-seed on first visit.

## Deploy to Vercel (client link)

### 1. Neon database

1. Create a project at [neon.tech](https://neon.tech)
2. Copy the **pooled** connection string (`…-pooler…`, include `?sslmode=require`)

### 2. GitHub

Push this repo to your GitHub account, then import it in Vercel.

### 3. Vercel environment variables

| Name | Example |
|------|---------|
| `DATABASE_URL` | Neon pooled connection string |
| `AUTH_SECRET` | Long random string |
| `SEED_SECRET` | `aegis-demo-seed` |
| `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` (set after first deploy + redeploy) |

### 4. Deploy

Click **Deploy**. Schema syncs via `prisma db push` during build. Open UFX once — demo data seeds automatically.

### 5. Optional reset

```powershell
Invoke-RestMethod -Method POST -Uri "https://YOUR-APP.vercel.app/api/aegis/seed" -ContentType "application/json" -Body '{"secret":"aegis-demo-seed","force":true}'
```

## Local setup

```bash
cp .env.example .env
docker compose up -d
npm install
npm run db:setup
npm run dev
```

## Stack

TypeScript · Next.js · PostgreSQL · Prisma · Vercel

## Project map

```
src/app/page.tsx          → MVP first page (architecture + product map)
src/app/ufx/*             → UFX user application (For You home)
src/app/aegis/*           → AEGIS Control Center
src/app/api/aegis/*       → Platform APIs
prisma/schema.prisma      → Data models
```
