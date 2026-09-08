-- ============================================================================
-- DzPhy — Improvements & fixes (Supabase / PostgreSQL)
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
