-- ============================================================================
-- DzPhy — Unified content model (Supabase / PostgreSQL)
-- ----------------------------------------------------------------------------
-- One extensible table for every kind of educational content coming from
-- YouTube, TikTok, Instagram, uploads, or the admin panel. Designed so new
-- videos/posts persist across redeploys and can be synced automatically.
--
-- Apply with either:
--   supabase db push
-- or paste this file into the Supabase Dashboard → SQL Editor and run it.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- content: the single source of truth for dynamic educational content
-- ---------------------------------------------------------------------------
create table if not exists public.content (
  id            uuid primary key default gen_random_uuid(),

  -- where it came from
  platform      text not null default 'internal'
                  check (platform in ('youtube','tiktok','instagram','internal','other')),
  source        text,                      -- e.g. playlist id, channel id, admin
  external_id   text,                      -- youtube/tiktok video id, ig shortcode

  -- what it is
  type          text not null default 'video'
                  check (type in ('lesson','summary','exercise','solution',
                                  'video','post','review','course','announcement',
                                  'distribution','other')),

  -- display
  title         text not null,
  description   text,
  thumbnail     text,                      -- image url (or /public path)
  url           text,                      -- canonical link to open

  -- educational classification
  subject       text,                      -- الفيزياء / الكيمياء / الرياضيات ...
  level         text,                      -- bem / 1as / 2as / 3as / bac ...
  category      text,                      -- تصنيف حر إضافي
  stream        text,                      -- الشعبة

  -- ordering / lifecycle
  published_at  timestamptz,
  is_active     boolean not null default true,
  sort_order    int not null default 0,
  metadata      jsonb not null default '{}'::jsonb,

  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),

  -- de-dupe the same external item per platform
  unique (platform, external_id)
);

create index if not exists content_type_idx    on public.content (type);
create index if not exists content_level_idx   on public.content (level);
create index if not exists content_platform_idx on public.content (platform);
create index if not exists content_active_idx  on public.content (is_active);
create index if not exists content_published_idx on public.content (published_at desc);

-- keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists content_set_updated_at on public.content;
create trigger content_set_updated_at
  before update on public.content
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
--   • anyone (anon) may READ active content   → safe for the public site
--   • writes require the service_role key      → used only by server sync/admin
-- ---------------------------------------------------------------------------
alter table public.content enable row level security;

drop policy if exists "public read active content" on public.content;
create policy "public read active content"
  on public.content for select
  to anon, authenticated
  using (is_active = true);

-- NOTE: no anon insert/update/delete policy on purpose. Server code uses the
-- service_role key (which bypasses RLS) for syncing and the admin panel.

-- ---------------------------------------------------------------------------
-- Optional convenience view: latest active items first
-- ---------------------------------------------------------------------------
create or replace view public.content_feed as
  select * from public.content
  where is_active = true
  order by coalesce(published_at, created_at) desc, sort_order asc;

-- ============================================================
-- MIGRATION 0002 BELOW
-- ============================================================
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

-- ============================================================
-- SEED DATA BELOW
-- ============================================================
-- ============================================================================
-- DzPhy — Seed for public.content
-- ----------------------------------------------------------------------------
-- YouTube & TikTok are fetched LIVE (YouTube RSS/Data API, TikTok oEmbed) so
-- they don't need seeding. Instagram has no free public listing API, so its
-- posts live here and persist across redeploys. Run after 0001_content_model.sql.
-- Safe to re-run: upserts on (platform, external_id).
-- ============================================================================

insert into public.content
  (platform, source, external_id, type, title, description, thumbnail, url, subject, level, category, is_active, sort_order)
values
  ('instagram','@prof_pica','DbpnOFVtwcR','post',
   'كيفية استعمال الحاسبة CASIO fx-991ES 🧮',
   'شرح عملي للآلة الحاسبة — ضروري لكل تلميذ في العلوم الفيزيائية',
   '/social/ig_casio.jpg','https://www.instagram.com/reel/DbpnOFVtwcR/',
   'الفيزياء',null,'منشور',true,10),

  ('instagram','@prof_pica','DaIUeL-NJl2','post',
   '#العلوم_الفيزيائية #bac2027 #motivation 🔥',
   'تحفيز لطلبة البكالوريا — استعد بقوة للسنة الدراسية الجديدة',
   '/social/ig_motivation.jpg','https://www.instagram.com/reel/DaIUeL-NJl2/',
   'الفيزياء','bac','تحفيز',true,20),

  ('instagram','@prof_pica','DbsNJtEjcom','post',
   'منشور جديد من الأستاذ بيكا ✍️',
   'أحدث منشور على إنستغرام — تابع الصفحة أولًا بأول',
   '/social/ig_post_aug6.jpg','https://www.instagram.com/p/DbsNJtEjcom/',
   null,null,'منشور',true,30),

  ('instagram','@prof_pica','DbpmNiAjSnQ','post',
   'الأستاذ بيكا — الهوية الجديدة 🐺',
   'العلامة الجديدة لمحتوى العلوم الفيزيائية',
   '/social/ig_wolf.jpg','https://www.instagram.com/p/DbpmNiAjSnQ/',
   null,null,'منشور',true,40),

  ('instagram','@prof_pica','DbqFV68DRUQ','post',
   'دروس الدعم لجميع المستويات 🎯',
   'دروس خصوصية لكل الشعب والمستويات — BAC، 2AS، 1AS و BEM',
   '/social/ig_poster.jpg','https://www.instagram.com/p/DbqFV68DRUQ/',
   null,null,'إعلان',true,50),

  ('instagram','@prof_pica','Dbj3OOQq6sX','post',
   'منشورات يومية من الأستاذ بيكا',
   'ملخصات يومية ونظام الكاروزول — تابع حساب إنستغرام الرسمي',
   '/social/ig_aug2.jpg','https://www.instagram.com/p/Dbj3OOQq6sX/',
   null,null,'ملخص',true,60)

 on conflict (platform, external_id) do update set
  title       = excluded.title,
  description = excluded.description,
  thumbnail   = excluded.thumbnail,
  url         = excluded.url,
  category    = excluded.category,
  is_active   = excluded.is_active,
  sort_order  = excluded.sort_order;

-- ============================================================
-- MIGRATION 0003 BELOW
-- ============================================================
-- ============================================================================
-- DzPhy — Improvements & fixes
-- ============================================================================
-- Adds missing triggers, indexes, and small schema improvements on top of
-- migrations 0001 + 0002. Safe to re-run.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- lesson_progress: add updated_at trigger
-- ---------------------------------------------------------------------------
drop trigger if exists lesson_progress_set_updated_at on public.lesson_progress;
create trigger lesson_progress_set_updated_at
  before update on public.lesson_progress
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- favorites: add updated_at trigger + created_at index
-- ---------------------------------------------------------------------------
drop trigger if exists favorites_set_updated_at on public.favorites;
create trigger favorites_set_updated_at
  before update on public.favorites
  for each row execute function public.set_updated_at();

create index if not exists favorites_created_idx
  on public.favorites (created_at desc);

-- ---------------------------------------------------------------------------
-- quiz_attempts: composite index for common query pattern
-- ---------------------------------------------------------------------------
create index if not exists quiz_attempts_user_quiz_idx
  on public.quiz_attempts (user_id, quiz_id);

-- ---------------------------------------------------------------------------
-- content: full-text search support
-- ---------------------------------------------------------------------------
alter table public.content
  add column if not exists search_vector tsvector
  generated always as (
    setweight(to_tsvector('arabic', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('arabic', coalesce(description, '')), 'B')
  ) stored;

create index if not exists content_search_idx
  on public.content using gin (search_vector);
