-- ============================================================================
-- DzPhy — Users, quiz attempts, lesson progress, favorites, contact messages
-- ----------------------------------------------------------------------------
-- Adds everything needed for real (non-localStorage) persistence of:
--   • user profiles (backed by Supabase Auth `auth.users`)
--   • quiz attempts / results
--   • lesson & video progress
--   • favorites (bookmarks)
--   • contact form submissions
--
-- Apply with either:
--   supabase db push
-- or paste this file into the Supabase Dashboard → SQL Editor and run it,
-- AFTER 0001_content_model.sql.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- profiles: 1-1 with auth.users. Created automatically on signup (trigger).
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  name          text,
  grade         int,                 -- 1..4 (السنة الأولى..الرابعة متوسط)
  avatar        text default '🎓',
  goal          text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Auto-create a profile row when a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;

drop policy if exists "profiles: user reads own" on public.profiles;
create policy "profiles: user reads own"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "profiles: user updates own" on public.profiles;
create policy "profiles: user updates own"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- No public/anon policy at all → profiles are fully private by default.
-- The admin panel reads profiles via the service-role key (bypasses RLS).

-- ---------------------------------------------------------------------------
-- quiz_attempts: one row per completed quiz attempt.
-- ---------------------------------------------------------------------------
create table if not exists public.quiz_attempts (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  quiz_id       text not null,
  score         int not null check (score >= 0),
  total         int not null check (total > 0),
  percentage    numeric generated always as (round((score::numeric / total::numeric) * 100, 1)) stored,
  time_taken    int not null default 0,   -- seconds
  answers       jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now()
);

create index if not exists quiz_attempts_user_idx on public.quiz_attempts (user_id);
create index if not exists quiz_attempts_quiz_idx on public.quiz_attempts (quiz_id);
create index if not exists quiz_attempts_created_idx on public.quiz_attempts (created_at desc);

alter table public.quiz_attempts enable row level security;

drop policy if exists "quiz_attempts: user reads own" on public.quiz_attempts;
create policy "quiz_attempts: user reads own"
  on public.quiz_attempts for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "quiz_attempts: user inserts own" on public.quiz_attempts;
create policy "quiz_attempts: user inserts own"
  on public.quiz_attempts for insert
  to authenticated
  with check (auth.uid() = user_id);

-- No update/delete policy: attempts are immutable once submitted.
-- Admin reads all attempts via the service-role key (bypasses RLS).

-- ---------------------------------------------------------------------------
-- lesson_progress: tracks completed videos/lessons per user.
-- ---------------------------------------------------------------------------
create table if not exists public.lesson_progress (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  item_id       text not null,             -- video id / lesson id
  item_type     text not null default 'video' check (item_type in ('video','lesson','flashcard','quiz')),
  completed     boolean not null default true,
  completed_at  timestamptz not null default now(),
  unique (user_id, item_id, item_type)
);

create index if not exists lesson_progress_user_idx on public.lesson_progress (user_id);

alter table public.lesson_progress enable row level security;

drop policy if exists "lesson_progress: user manages own" on public.lesson_progress;
create policy "lesson_progress: user manages own"
  on public.lesson_progress for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- favorites: bookmarked content per user (server-side mirror of the
-- localStorage bookmarks so signed-in users keep them across devices).
-- ---------------------------------------------------------------------------
create table if not exists public.favorites (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  item_id       text not null,
  item_type     text not null default 'video',
  title         text,
  url           text,
  created_at    timestamptz not null default now(),
  unique (user_id, item_id)
);

create index if not exists favorites_user_idx on public.favorites (user_id);

alter table public.favorites enable row level security;

drop policy if exists "favorites: user manages own" on public.favorites;
create policy "favorites: user manages own"
  on public.favorites for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- contact_messages: submissions from the /contact form and footer newsletter.
-- Written ONLY by server code using the service-role key (never from the
-- browser), so there is intentionally no anon/authenticated insert policy.
-- ---------------------------------------------------------------------------
create table if not exists public.contact_messages (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  email         text not null,
  subject       text not null,
  message       text not null,
  status        text not null default 'new' check (status in ('new','read','replied','archived')),
  created_at    timestamptz not null default now()
);

create index if not exists contact_messages_created_idx on public.contact_messages (created_at desc);
create index if not exists contact_messages_status_idx on public.contact_messages (status);

alter table public.contact_messages enable row level security;
-- No policies at all → completely inaccessible to anon/authenticated clients.
-- Only the service-role key (server-only, used by /api/contact and
-- /api/admin/messages) can read or write this table.
