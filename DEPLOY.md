# Deploy AEGIS × UFX to Vercel (client demo link)

Your GitHub: https://github.com/star5053

The MVP is committed locally and **ready to host**. Complete these steps once.

---

## A. Log in to GitHub CLI (one time)

In PowerShell, from this project folder:

```powershell
cd F:\Codes\PROJECT\AEGIS_UFX
gh auth login
```

Choose:

1. **GitHub.com**
2. **HTTPS**
3. **Login with a web browser**
4. Paste the one-time code when the browser opens
5. Authorize as **star5053**

---

## B. Create the GitHub repo and push

```powershell
cd F:\Codes\PROJECT\AEGIS_UFX
gh repo create aegis-ufx --public --source=. --remote=origin --push
```

(Use `--private` instead of `--public` if you prefer.)

Repo URL will be: **https://github.com/star5053/aegis-ufx**

---

## C. Create Neon database

1. Go to https://console.neon.tech → **New Project**
2. Name: `aegis-ufx`
3. Copy the **pooled** connection string (host contains `-pooler`, ends with `?sslmode=require`)

---

## D. Import on Vercel

1. Go to https://vercel.com/new
2. Sign in with **GitHub** (star5053)
3. Import **aegis-ufx**
4. Before deploy, add **Environment Variables**:

| Name | Value |
|------|--------|
| `DATABASE_URL` | Neon pooled string from step C |
| `AUTH_SECRET` | Run below to generate |
| `SEED_SECRET` | `aegis-demo-seed` |

Generate `AUTH_SECRET`:

```powershell
-join ((48..57)+(65..90)+(97..122) | Get-Random -Count 48 | ForEach-Object {[char]$_})
```

5. Click **Deploy**
6. After success, copy the URL (e.g. `https://aegis-ufx.vercel.app`)
7. Add env var `NEXT_PUBLIC_APP_URL` = that URL → **Redeploy** once

---

## E. Open the client link

Visit the Vercel URL. First load of `/ufx` auto-seeds demo accounts.

| Email | Password | App |
|-------|----------|-----|
| henry@ufx.app | Demo123! | UFX |
| owner@aegis.dev | Demo123! | AEGIS Control Center |

Send your client: **the Vercel URL** + those two accounts.

---

## Optional: reset demo data

```powershell
Invoke-RestMethod -Method POST -Uri "https://YOUR-URL.vercel.app/api/aegis/seed" -ContentType "application/json" -Body '{"secret":"aegis-demo-seed","force":true}'
```
