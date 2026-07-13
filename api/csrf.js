// api/csrf.js
// Issues a CSRF token as a cookie.
// The SPA calls GET /api/csrf on load, reads the cookie, and sends the value
// in the X-CSRF-Token header on every state-changing request.

import { randomBytes } from 'crypto'
import {
  handleCors,
  applySecurityHeaders,
  rateLimit,
  getClientIp,
  logSecurityEvent,
} from './_security.js'

export default function handler(req, res) {
  applySecurityHeaders(res)

  if (!handleCors(req, res)) return

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip = getClientIp(req)
  const { allowed } = rateLimit(`csrf:${ip}`, 30, 60_000)
  if (!allowed) {
    logSecurityEvent('CSRF_RATE_LIMITED', { ip })
    return res.status(429).json({ error: 'Too many requests' })
  }

  const token = randomBytes(32).toString('hex')

  // SameSite=Strict + Secure prevents CSRF from cross-site requests.
  // The cookie is NOT HttpOnly so the SPA JS can read it (double-submit pattern).
  res.setHeader(
    'Set-Cookie',
    `csrf_token=${token}; Path=/; SameSite=Strict; Secure; Max-Age=3600`
  )

  return res.status(200).json({ csrfToken: token })
}
