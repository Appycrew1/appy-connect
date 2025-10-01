# Appy Link – Next.js + Supabase (Vercel-ready)

This repository is a **clean migration** for your app to run on **Vercel** with **Supabase**. It mirrors your current functionality and keeps the visual feel (assets + styles ported), while upgrading to **Next.js App Router**, **TypeScript**, **Tailwind**, and **RLS**.

## 1) One-time setup

### A) Create Supabase project
1. Create a project at https://supabase.com/.
2. In the SQL editor, run `supabase/migrations/000_init.sql` (creates tables, policies, admin trigger).

### B) Configure Vercel
1. Import this GitHub repo into Vercel.
2. Set **Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### C) Local dev
```bash
pnpm i  # or npm i / yarn
pnpm dev
```

## 2) Auth (email + password)
- Enable **Email** provider in Supabase Authentication.
- Create an admin user (Supabase → Authentication → Users) with email+password.
- Promote to admin:
```sql
update public.profiles
set role = 'admin'
where id = (select id from auth.users where email = 'YOUR_ADMIN_EMAIL');
```

## 3) Pages
- `/` – Home
- `/providers` – Server-rendered providers list (public, cached)
- `/submit` – Public form → `listing_submissions`
- `/contact` – Public form → `contact_messages`
- `/admin` – Email+password sign-in; toggle providers active (RLS-protected)

## 4) Migrations
- See `supabase/migrations/000_init.sql` and optional `001_seed.sql`
