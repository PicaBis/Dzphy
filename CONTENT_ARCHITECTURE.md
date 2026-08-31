# DzPhy — Dynamic content architecture

How educational content flows into the site, and how to keep it updating
automatically without editing React for every new video/post.

```
YouTube channel / playlists ─┐
TikTok videos (by URL)       ├─► server API routes (server-side keys) ─► Supabase (persist) ─► DzPhy UI
Instagram posts              ─┘                                              ▲
Admin panel ─────────────────────────────────────────────────────────────┘
```

## Sources & status

| Source | Method (official / allowed) | Auto-updates? | Where |
|--------|-----------------------------|---------------|-------|
| **YouTube** | Public **RSS** feeds (no key) or **Data API v3** when `YOUTUBE_API_KEY` is set. Thumbnails derived deterministically from the video id (`i.ytimg.com/vi/<id>/hqdefault.jpg`) so **every** video has a cover. | ✅ New uploads/playlist items appear within the 15-min revalidation window. | `src/lib/youtube.ts`, `src/app/api/playlists/route.ts` |
| **TikTok** | Official **oEmbed** (`tiktok.com/oembed`). Canonical video URL is the source of truth; title/cover/verification fetched live. | ⚠️ Semi-auto: adding a video = paste its URL in `src/data/social.ts` (no per-video code). TikTok has **no free public "list my videos" API**, so full auto-discovery isn't possible without their approved Content API. | `src/lib/tiktok.ts`, `src/app/api/tiktok/route.ts` |
| **Instagram** | Persisted in Supabase (`platform='instagram'`). Instagram has **no free public listing API**; the official Graph/Basic-Display API needs a Facebook app + long-lived token. | ⚠️ Manual/DB-driven until a Graph token is provided. | `supabase/seed.sql`, `/api/content?platform=instagram` |
| **Admin / uploads** | Supabase `content` table via the service-role key (server-side). | ✅ Persists across redeploys (no more data loss on deploy). | `supabase/migrations/0001_content_model.sql` |

## Why the reported bugs are fixed

- **YouTube thumbnails missing on single videos** → now every video's cover is
  built from its id, so covers always render (not just playlist covers).
- **YouTube = channel, not just playlists** → the channel's latest uploads feed
  is added as an "أحدث الفيديوهات من القناة" section.
- **TikTok links wrong / not opening the real video** → each card opens its
  canonical URL, and `/api/tiktok` verifies every link via oEmbed. Any dead link
  is flagged (`verified:false`) instead of silently 404-ing.
- **BEM vs السنة الرابعة متوسط duplicated** → unified under one level `bem`
  ("شهادة التعليم المتوسط (BEM)"). No duplicate section/filter remains.

## Wiring Supabase (one-time)

1. Apply the schema: open Supabase → **SQL Editor**, run
   `supabase/migrations/0001_content_model.sql`, then `supabase/seed.sql`.
   (Or `supabase db push` with the CLI.)
2. In **Vercel → Settings → Environment Variables** set:
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (public/read)
   - `SUPABASE_SERVICE_ROLE_KEY` (server only — sync + admin writes)
   - `YOUTUBE_API_KEY` (optional, server only)
3. Redeploy. `/api/content` starts returning DB rows; until then the site keeps
   working with its built-in data (nothing breaks if env vars are absent).

## Security

- Anon/publishable key → browser-safe (read-only via RLS `is_active = true`).
- Service-role key → **server only** (`SUPABASE_SERVICE_ROLE_KEY`, never
  `NEXT_PUBLIC_*`), used by API routes/admin for writes. Never committed, never
  logged, never sent to the client.
