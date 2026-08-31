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
