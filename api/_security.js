// api/_security.js
// Shared security utilities for all Vercel serverless functions.

// ── In-memory rate limiter (per-function, resets on cold start) ──────────────
// For production at scale, replace the Map with Vercel KV or Upstash Redis.
const rateLimitStore = new Map()

/**
 * Simple sliding-window rate limiter.
 * @param {string} key       - Unique key (e.g. IP address)
 * @param {number} limit     - Max requests allowed in the window
 * @param {number} windowMs  - Window size in milliseconds
 * @returns {{ allowed: boolean, remaining: number, resetAt: number }}
 */
export function rateLimit(key, limit = 10, windowMs = 60_000) {
  const now = Date.now()
  const entry = rateLimitStore.get(key) ?? { count: 0, resetAt: now + windowMs }

  if (now > entry.resetAt) {
    entry.count = 0
    entry.resetAt = now + windowMs
  }

  entry.count += 1
  rateLimitStore.set(key, entry)

  // Prune old entries every ~500 calls to avoid unbounded memory growth
  if (rateLimitStore.size > 500) {
    for (const [k, v] of rateLimitStore) {
      if (now > v.resetAt) rateLimitStore.delete(k)
    }
  }

  return {
    allowed: entry.count <= limit,
    remaining: Math.max(0, limit - entry.count),
    resetAt: entry.resetAt,
  }
}

// ── CORS ─────────────────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = new Set([
  'https://cloudaxisnp.com',
  'https://www.cloudaxisnp.com',
])

/**
 * Validate Origin header and set CORS response headers.
 * Returns false if the origin is not allowed.
 */
export function handleCors(req, res) {
  const origin = req.headers['origin'] ?? ''

  if (req.method === 'OPTIONS') {
    if (ALLOWED_ORIGINS.has(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin)
      res.setHeader('Vary', 'Origin')
    }
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-CSRF-Token')
    res.setHeader('Access-Control-Max-Age', '86400')
    res.status(204).end()
    return false // signal: stop processing
  }

  if (ALLOWED_ORIGINS.has(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
  }

  return true // signal: continue processing
}

// ── CSRF ──────────────────────────────────────────────────────────────────────
// Double-submit cookie pattern: the client reads a CSRF token from a cookie
// and echoes it in the X-CSRF-Token request header.
// The token is a random hex string set by the /api/csrf endpoint.
//
// NOTE: Vercel Edge / serverless functions cannot set HttpOnly cookies from
// the client side, so we use a readable cookie + header echo pattern here.
// For full HttpOnly CSRF, use a session-based approach with a database.

const CSRF_SECRET = process.env.CSRF_SECRET ?? 'change-me-in-env'

/**
 * Validate the CSRF token sent in the X-CSRF-Token header against
 * the value stored in the csrf_token cookie.
 */
export function validateCsrf(req) {
  const headerToken = req.headers['x-csrf-token'] ?? ''
  const cookieToken = parseCookies(req)['csrf_token'] ?? ''

  if (!headerToken || !cookieToken) return false
  if (headerToken.length < 32 || cookieToken.length < 32) return false

  // Constant-time comparison to prevent timing attacks
  return timingSafeEqual(headerToken, cookieToken)
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return result === 0
}

export function parseCookies(req) {
  const raw = req.headers['cookie'] ?? ''
  return Object.fromEntries(
    raw.split(';').map(c => {
      const [k, ...v] = c.trim().split('=')
      return [k.trim(), decodeURIComponent(v.join('='))]
    })
  )
}

// ── Input sanitization ────────────────────────────────────────────────────────
const HTML_ESCAPE = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '/': '&#x2F;' }

/** Escape HTML special characters to prevent XSS. */
export function escapeHtml(str) {
  if (typeof str !== 'string') return ''
  return str.replace(/[&<>"'/]/g, c => HTML_ESCAPE[c])
}

/** Strip all HTML tags from a string. */
export function stripTags(str) {
  if (typeof str !== 'string') return ''
  return str.replace(/<[^>]*>/g, '')
}

/** Remove null bytes and control characters. */
export function sanitizeString(str, maxLength = 1000) {
  if (typeof str !== 'string') return ''
  return str
    .replace(/\0/g, '')                    // null bytes
    .replace(/[\x01-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // control chars (keep \t \n \r)
    .trim()
    .slice(0, maxLength)
}

/** Validate an email address format. */
export function isValidEmail(email) {
  if (typeof email !== 'string') return false
  // RFC 5322 simplified — good enough for server-side pre-validation
  return /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/.test(email) && email.length <= 320
}

/** Validate a phone number (digits, spaces, +, -, (), max 20 chars). */
export function isValidPhone(phone) {
  if (!phone) return true // optional field
  return /^[\d\s\+\-\(\)]{7,20}$/.test(phone)
}

// ── Security response headers ─────────────────────────────────────────────────
/** Apply a standard set of security headers to every API response. */
export function applySecurityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate')
  res.setHeader('Pragma', 'no-cache')
  // Remove server fingerprinting (Vercel adds its own; this is belt-and-suspenders)
  res.removeHeader('X-Powered-By')
  res.removeHeader('Server')
}

// ── IP extraction ─────────────────────────────────────────────────────────────
/** Extract the real client IP from Vercel's forwarded headers. */
export function getClientIp(req) {
  return (
    req.headers['x-real-ip'] ??
    (req.headers['x-forwarded-for'] ?? '').split(',')[0].trim() ??
    req.socket?.remoteAddress ??
    'unknown'
  )
}

// ── Logging ───────────────────────────────────────────────────────────────────
/** Structured security event logger. */
export function logSecurityEvent(event, details = {}) {
  const entry = {
    timestamp: new Date().toISOString(),
    event,
    ...details,
  }
  // In production, pipe this to your SIEM / logging service (e.g. Datadog, Logtail)
  console.warn('[SECURITY]', JSON.stringify(entry))
}
