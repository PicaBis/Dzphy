# DzPhy — API Documentation

All endpoints are Next.js Route Handlers under `src/app/api/**/route.ts`. Base
URL in production: `https://dzphy.vercel.app`.

**Auth model in this project (two separate systems — do not confuse them):**
- **Admin auth** — a single shared password (`ADMIN_SECRET`) protecting the
  `/admin` panel and `/api/admin/*` routes, via an `admin_token` httpOnly
  cookie. There is only one "admin" — this is not a per-user role system.
- **User auth** — Supabase Auth (email + password), used for `/api/profile`,
  `/api/quiz/*`, `/api/favorites`, `/api/lessons/progress`. Session lives in
  Supabase's own cookies, refreshed by `middleware.ts` on every request.

Every route degrades gracefully when Supabase/Resend env vars are absent
(returns `503 { error: "Not configured" }` or a `configured: false` flag)
instead of crashing — consistent with the rest of the project.

---

## Auth (Supabase Auth — called directly from the browser, not proxied)

These are NOT custom route handlers; the client calls the Supabase JS SDK
directly (`src/lib/supabase-browser.ts` + `src/context/AuthContext.tsx`),
which talks to Supabase's own hosted Auth API. Documented here because the
UI pages that drive them live in this repo.

| Action | UI Page | SDK call |
|---|---|---|
| Sign up | `/signup` | `supabase.auth.signUp({ email, password, options: { data: { name } } })` |
| Log in | `/login` | `supabase.auth.signInWithPassword({ email, password })` |
| Log out | (Header/Profile) | `supabase.auth.signOut()` |
| Password reset request | `/reset-password` | `supabase.auth.resetPasswordForEmail(email)` |
| Session | everywhere | `supabase.auth.getUser()`, refreshed by `middleware.ts` |

Rate limiting: enforced by Supabase itself (not this app) on these endpoints.

---

## Admin Session

### POST /api/admin/login
**Purpose:** Authenticate into the admin panel with the shared admin password.
**Auth required:** No (this IS the login).
**Rate limit:** 5 attempts / 15 min / IP (in-memory, see `src/lib/rateLimit.ts`).
**Request body:**
```json
{ "password": "string" }
```
**Response 200:** `{ "success": true }` + sets `admin_token` httpOnly cookie (24h).
**Errors:** `401` wrong password · `429` rate limited · `500` `ADMIN_SECRET` not configured.
**DB tables used:** none.

### POST /api/admin/logout
**Purpose:** Clear the admin session cookie.
**Auth required:** No.
**Response 200:** `{ "success": true }`.
**DB tables used:** none.

---

## Admin Data (require `admin_token` cookie — see `src/lib/adminAuth.ts`)

### GET /api/admin/stats
**Purpose:** Dashboard counters (users, quiz attempts, contact messages, content items).
**Auth required:** Admin cookie.
**Response 200:** `{ configured: boolean, users, quizAttempts, contactMessages, contentItems }`.
**Errors:** `401` unauthorized.
**DB tables used:** `profiles`, `quiz_attempts`, `contact_messages`, `content` (via service-role key, bypasses RLS — access control is this route's admin check, not RLS).

### GET /api/admin/messages?limit=50
**Purpose:** List contact-form submissions, newest first.
**Auth required:** Admin cookie.
**Response 200:** `{ configured, messages: ContactMessage[] }`.
**Errors:** `401` unauthorized · `500` query failed.
**DB tables used:** `contact_messages`.

### PATCH /api/admin/messages
**Purpose:** Update a message's status (`new` / `read` / `replied` / `archived`).
**Auth required:** Admin cookie.
**Request body:** `{ "id": "uuid", "status": "read" }`
**Response 200:** `{ success: true }`.
**Errors:** `400` invalid id/status · `401` unauthorized.
**DB tables used:** `contact_messages`.

### GET /api/admin/quiz-results?limit=100
**Purpose:** All quiz attempts across all users (aggregate admin view).
**Auth required:** Admin cookie.
**Response 200:** `{ configured, attempts: QuizAttempt[] }`.
**DB tables used:** `quiz_attempts`.

---

## Content (public, read-only)

### GET /api/content?type=&level=&platform=&limit=
**Purpose:** Dynamic educational content synced from YouTube/TikTok/Instagram/admin uploads.
**Auth required:** No (public read; RLS restricts to `is_active = true`).
**Validation:** `type` ∈ lesson/summary/exercise/solution/video/post · `level` ∈ bem/1as/2as/3as/bac · `platform` ∈ youtube/tiktok/instagram/internal · `limit` 1–1000 (capped at 200) — invalid values → `400`.
**Response 200:** `{ configured: boolean, items: ContentRow[] }`.
**DB tables used:** `content` (public read policy, `is_active = true`).

### GET /api/playlists?level=
**Purpose:** YouTube playlists + channel's latest uploads, per grade level.
**Auth required:** No.
**Validation:** `level` ∈ bem/1as/2as/3as/general → `400` if invalid.
**Caching:** `revalidate = 3600` (1h).
**External service:** YouTube RSS (no key) or Data API v3 if `YOUTUBE_API_KEY` set.
**DB tables used:** none (reads `src/data/playlists.ts` + live YouTube feeds).

### GET /api/tiktok
**Purpose:** Curated TikTok videos enriched via TikTok's oEmbed API.
**Auth required:** No.
**Caching:** `revalidate = 3600` (1h).
**External service:** TikTok oEmbed (public, no key).
**DB tables used:** none.

---

## Contact

### POST /api/contact
**Purpose:** Contact form + footer newsletter submission.
**Auth required:** No.
**Rate limit:** 5 / 10 min / IP.
**Request body:** `{ "name", "email", "subject", "message" }` (all required, server-validated: name/subject/message non-empty, email regex, length caps).
**Flow:** validate → rate-limit → insert into `contact_messages` (Supabase, service-role) or in-memory fallback if not configured → best-effort email via Resend → respond.
**Response 200:** `{ success: true, message, persisted: "supabase"|"memory", emailSent: boolean }`.
**Errors:** `400` validation · `429` rate limited · `500` unexpected error (message never includes stack traces).
**DB tables used:** `contact_messages`.
**External service:** Resend (optional — skipped gracefully if `RESEND_API_KEY` unset).

### GET /api/contact
**Purpose:** Legacy admin view of messages (superseded by `/api/admin/messages`; kept for backward compatibility).
**Auth required:** Admin cookie.
**DB tables used:** `contact_messages`.

---

## Profile (requires Supabase Auth session)

### GET /api/profile
**Purpose:** The signed-in user's own profile row.
**Auth required:** Yes (Supabase session via cookie).
**Response 200:** `{ profile }`. **Errors:** `401` no session · `404` no row · `503` Supabase not configured.
**DB tables used:** `profiles` (RLS: `id = auth.uid()`).

### PUT /api/profile
**Purpose:** Update own name/grade/avatar/goal.
**Auth required:** Yes.
**Request body (all optional):** `{ name, grade (1-4), avatar, goal }` — each field server-validated (type + length/range).
**Response 200:** `{ profile }`. **Errors:** `400` invalid field · `401` no session · `500` update failed.
**DB tables used:** `profiles` (RLS: `id = auth.uid()`, enforced twice — in the query and at the database level).

---

## Quiz (partial auth — works signed-out, persists when signed-in)

### POST /api/quiz/submit
**Purpose:** Authoritative server-side scoring of a completed quiz attempt.
**Auth required:** No (guests get a scored response but no server persistence; localStorage still used client-side as the guest fallback). Signed-in users additionally get the attempt saved to `quiz_attempts`.
**Rate limit:** 30 / 10 min / IP.
**Request body:** `{ "quizId": "string", "answers": { [questionId]: optionIndex }, "timeTaken": number }`.
**Scoring:** recomputed server-side from `src/data/quizzes.ts` — the client's own score is never trusted.
**Known limitation:** question data (including `correctIndex`) is still shipped in the client JS bundle (pre-existing architecture), so this stops "submit a fake score" but not "read the answer key from devtools" — see code comment in the route for detail.
**Response 200:** `{ quizId, score, total, percentage, timeTaken, persisted: boolean, signedIn: boolean }`.
**Errors:** `400` bad input/unknown quiz · `429` rate limited.
**DB tables used:** `quiz_attempts` (insert-only, RLS: `user_id = auth.uid()`).

### GET /api/quiz/results
**Purpose:** The signed-in user's own past attempts.
**Auth required:** Yes.
**Response 200:** `{ results: QuizAttempt[] }`. **Errors:** `401` no session · `503` not configured.
**DB tables used:** `quiz_attempts` (RLS: `user_id = auth.uid()`).

---

## Favorites (requires Supabase Auth session)

### GET /api/favorites
**Purpose:** Signed-in user's server-synced bookmarks (mirrors the existing localStorage bookmarks so they follow the account across devices).
**Auth required:** Yes.
**DB tables used:** `favorites` (RLS: `user_id = auth.uid()`).

### POST /api/favorites
**Purpose:** Add/update one bookmark.
**Auth required:** Yes.
**Request body:** `{ "id", "title"?, "url"?, "type"? }`.
**DB tables used:** `favorites` (upsert on `user_id, item_id`).

### DELETE /api/favorites?id=
**Purpose:** Remove one bookmark.
**Auth required:** Yes.
**DB tables used:** `favorites`.

---

## Lesson Progress (requires Supabase Auth session)

### GET /api/lessons/progress
**Purpose:** Signed-in user's completed videos/lessons/flashcards.
**Auth required:** Yes.
**DB tables used:** `lesson_progress` (RLS: `user_id = auth.uid()`).

### POST /api/lessons/progress
**Purpose:** Mark one item complete.
**Auth required:** Yes.
**Request body:** `{ "itemId", "itemType"? }` (`itemType` ∈ video/lesson/flashcard/quiz, defaults to video).
**DB tables used:** `lesson_progress` (upsert on `user_id, item_id, item_type`).

---

## Search — no API route (by design)

`/search` runs entirely client-side over statically bundled site data
(`src/lib/search.ts`) — it is real (not mocked) but doesn't need a server
round-trip since the index is small and public. No change made here.

---

## Standard error shape

Every route returns `{ "error": "human-readable message" }` with an
appropriate HTTP status and never leaks stack traces or internal details to
the client (errors are `console.error`'d server-side for debugging).

| Status | Meaning used in this project |
|---|---|
| 400 | Bad Request — invalid/missing input |
| 401 | Unauthorized — no/invalid session or admin cookie |
| 404 | Not Found — quiz/profile row doesn't exist |
| 429 | Too Many Requests — rate limit hit |
| 500 | Internal Server Error — unexpected failure |
| 503 | Service Unavailable — Supabase/Resend not configured in this environment |

## Rate limiting caveat

`src/lib/rateLimit.ts` is an in-memory sliding window. On a single Node
process (e.g. `next start`, or `npm run dev`) it works exactly as described
above. On serverless platforms with multiple concurrent instances (Vercel),
each instance keeps its own counter, so the *effective* ceiling is
`limit × active instances` — a real deterrent against casual abuse, not a
hard guarantee. A production-grade fixed cap needs a shared store (e.g.
Upstash Redis + `@upstash/ratelimit`), which requires its own API keys not
available in this environment.
