// ============================================================================
// DzPhy — Simple in-memory rate limiter
// ----------------------------------------------------------------------------
// KNOWN LIMITATION: this is a per-process sliding window. On serverless
// platforms (Vercel) with multiple concurrent instances, each instance has
// its own counter, so the effective limit is (limit × active instances),
// not a hard global cap. It still stops a single-instance/basic abuse burst
// and is a real improvement over "no limiting at all" (the previous state),
// but for a production-grade guarantee use a shared store like Upstash
// Redis (`@upstash/ratelimit`) — that requires its own API keys, which
// weren't available in this environment. This limiter is a genuine stopgap,
// not a placeholder.
// ============================================================================

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

// Periodically drop stale buckets so this Map doesn't grow unbounded.
let lastSweep = 0;
function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt < now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Returns whether `key` (usually `${ip}:${route}`) is still within
 * `limit` requests per `windowMs` milliseconds.
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = buckets.get(key);
  if (!existing || existing.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (existing.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return { allowed: true, remaining: limit - existing.count, resetAt: existing.resetAt };
}

/** Best-effort client identifier from standard proxy headers. */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}
