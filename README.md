# Appy Link – Next.js + Supabase (Vercel-ready)

This repository is a **clean, production-ready migration scaffold** for your Appy Link app to run on **Vercel** with a **Supabase** Postgres database. It mirrors your current functionality (providers directory, submissions, contact, admin) while upgrading structure to **Next.js (App Router)**, **TypeScript**, and **Tailwind**.

## 1) One-time setup

### A) Create Supabase project
1. Create a project at https://supabase.com/ (Postgres 15+).
2. In the SQL editor, run the migration in `supabase/migrations/000_init.sql` (creates tables, policies, admin trigger).

### B) Configure Vercel
1. Import this GitHub repo into Vercel.
2. Set **Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
3. Framework preset: **Next.js** (default).

### C) Local dev
```bash
pnpm i  # or npm i / yarn
pnpm dev
```
The app runs at http://localhost:3000

## 2) Data model (supabase)

See `supabase/migrations/000_init.sql` for full schema and Row Level Security (RLS) policies.

- `categories`: id, label
- `providers`: name, category_id, tags[], website, summary, details, discount_label, discount_details, logo, is_active, is_featured, feature_until, tier
- `listing_submissions`: public can insert (rate-limit at WAF), used by /submit
- `contact_messages`: public can insert, used by /contact
- `profiles`: one row per auth user, `role` = 'user' | 'admin'

## 3) Pages

- `/` – Home
- `/providers` – Server-rendered providers list (public, cached)
- `/submit` – Client insert into `listing_submissions`
- `/contact` – Client insert into `contact_messages`
- `/admin` – Minimal admin (sign-in, toggle provider active)

> Extend by moving your existing components into `components/` and porting screens.

## 4) Seeding (optional)

Use `supabase/migrations/001_seed.sql` to insert your current categories/providers (adapt as needed).

## 5) Notes

- All write operations rely on **RLS** (no custom server needed). Tighten policies as you prefer.
- If you want server-only mutations, add **Route Handlers** under `app/api/*` and call Supabase with the **service role** key (store as a Vercel **Server** variable, never expose publicly).

## 6) CI

- Vercel will build on every push to `main` by default.
- Add GitHub Actions for lint/typecheck if you like.

---

**Environment variables** (Vercel → Settings → Environment Variables):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
