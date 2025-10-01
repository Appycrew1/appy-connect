create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  label text not null,
  created_at timestamptz default now()
);

create table if not exists public.providers (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  category_id uuid references public.categories(id) on delete set null,
  tags text[],
  website text,
  summary text,
  details text,
  discount_label text,
  discount_details text,
  logo text,
  is_active boolean not null default true,
  is_featured boolean not null default false,
  feature_until timestamptz,
  tier text,
  created_at timestamptz default now()
);

create table if not exists public.listing_submissions (
  id uuid primary key default uuid_generate_v4(),
  company_name text not null,
  category_id uuid references public.categories(id) on delete set null,
  website text,
  description text,
  discount text,
  created_at timestamptz default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

create table if not exists public.profiles (
  id uuid primary key,
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz default now()
);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id) values (new.id) on conflict do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.categories enable row level security;
alter table public.providers enable row level security;
alter table public.listing_submissions enable row level security;
alter table public.contact_messages enable row level security;
alter table public.profiles enable row level security;

create policy "categories read" on public.categories for select using (true);
create policy "categories write admin" on public.categories
  for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "providers read public active" on public.providers for select using (is_active = true);
create policy "providers admin all" on public.providers
  for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "submissions insert public" on public.listing_submissions for insert with check (true);
create policy "submissions read admin" on public.listing_submissions
  for select using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy "submissions admin manage" on public.listing_submissions
  for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

create policy "contact insert public" on public.contact_messages for insert with check (true);
create policy "contact read admin" on public.contact_messages
  for select using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy "contact admin manage" on public.contact_messages
  for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
