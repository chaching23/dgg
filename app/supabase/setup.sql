-- Supabase setup for Disrupt app
-- Run this in Supabase SQL Editor (Project > SQL)

-- 1) Profiles table linked to auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

-- 2) Policies: users can select/update their own profile
do $$ begin
  create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);
exception when duplicate_object then null; end $$;

-- 3) Trigger to auto-create profile on new user
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 4) Helper RPC to resolve usernames to email (used by login screen)
create or replace function public.get_email_by_username(p_username text)
returns text
language sql
security definer
set search_path = public
as $$
  select email
  from auth.users
  where coalesce(raw_user_meta_data->>'username', split_part(email, '@', 1)) = p_username
  limit 1;
$$;

-- 5) Optional: let any logged-in user read any profile (comment out if not desired)
-- do $$ begin
--   create policy "profiles_select_all_authenticated" on public.profiles
--   for select to authenticated using (true);
-- exception when duplicate_object then null; end $$;









