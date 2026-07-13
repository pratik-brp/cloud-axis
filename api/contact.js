// api/contact.js
// Hardened contact form handler.
// Security layers: CORS → rate limit → CSRF → input validation → sanitization → forward.

import https from 'https'
import {
  handleCors,
  applySecurityHeaders,
  rateLimit,
  validateCsrf,
  sanitizeString,
  escapeHtml,
  stripTags,
  isValidEmail,
  isValidPhone,
  getClientIp,
  logSecurityEvent,
} from './_security.js'

// Maximum field lengths
const LIMITS = {
  name:    { max: 100,  required: true  },
  email:   { max: 320,  required: true  },
  company: { max: 150,  required: false },
  phone:   { max: 20,   required: false },
  message: { max: 2000, required: true  },
}

export default async function handler(req, res) {
  applySecurityHeaders(res)

  // ── CORS ──────────────────────────────────────────────────────────────────
  if (!handleCors(req, res)) return

  // ── Method guard ──────────────────────────────────────────────────────────
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const ip = getClientIp(req)

  // ── Rate limiting: 5 submissions per IP per 10 minutes ───────────────────
  const { allowed, remaining, resetAt } = rateLimit(`contact:${ip}`, 5, 600_000)
  res.setHeader('X-RateLimit-Limit', '5')
  res.setHeader('X-RateLimit-Remaining', String(remaining))
  res.setHeader('X-RateLimit-Reset', String(Math.ceil(resetAt / 1000)))

  if (!allowed) {
    logSecurityEvent('CONTACT_RATE_LIMITED', { ip })
    return res.status(429).json({
      error: 'Too many requests. Please wait before submitting again.',
    })
  }

  // ── CSRF validation ───────────────────────────────────────────────────────
  if (!validateCsrf(req)) {
    logSecurityEvent('CONTACT_CSRF_FAIL', { ip })
    return res.status(403).json({ error: 'Invalid or missing CSRF token.' })
  }

  // ── Content-Type guard ────────────────────────────────────────────────────
  const contentType = req.headers['content-type'] ?? ''
  if (!contentType.includes('application/json')) {
    return res.status(415).json({ error: 'Content-Type must be application/json' })
  }

  // ── Body size guard (Vercel default is 1 MB; we enforce 10 KB) ───────────
  const contentLength = parseInt(req.headers['content-length'] ?? '0', 10)
  if (contentLength > 10_240) {
    logSecurityEvent('CONTACT_OVERSIZED_BODY', { ip, contentLength })
    return res.status(413).json({ error: 'Request body too large.' })
  }

  // ── Extract and validate fields ───────────────────────────────────────────
  const raw = req.body ?? {}

  // Reject unexpected keys (allowlist approach)
  const allowedKeys = new Set(Object.keys(LIMITS))
  for (const key of Object.keys(raw)) {
    if (!allowedKeys.has(key)) {
      logSecurityEvent('CONTACT_UNEXPECTED_FIELD', { ip, field: key })
      return res.status(400).json({ error: `Unexpected field: ${key}` })
    }
  }

  const errors = {}

  // Validate each field
  for (const [field, rules] of Object.entries(LIMITS)) {
    const value = raw[field]
    if (rules.required && (!value || String(value).trim() === '')) {
      errors[field] = `${field} is required`
    } else if (value && String(value).length > rules.max) {
      errors[field] = `${field} must be at most ${rules.max} characters`
    }
  }

  if (!isValidEmail(raw.email ?? '')) {
    errors.email = 'Invalid email address'
  }

  if (raw.phone && !isValidPhone(raw.phone)) {
    errors.phone = 'Invalid phone number'
  }

  if (Object.keys(errors).length > 0) {
    logSecurityEvent('CONTACT_VALIDATION_FAIL', { ip, errors })
    return res.status(400).json({ error: 'Validation failed', details: errors })
  }

  // ── Sanitize ──────────────────────────────────────────────────────────────
  const name    = escapeHtml(sanitizeString(stripTags(raw.name),    100))
  const email   = sanitizeString(raw.email,   320).toLowerCase()
  const company = escapeHtml(sanitizeString(stripTags(raw.company ?? ''), 150))
  const phone   = sanitizeString(raw.phone ?? '', 20)
  const message = escapeHtml(sanitizeString(stripTags(raw.message), 2000))

  // ── Forward to FormSubmit ─────────────────────────────────────────────────
  try {
    const payload = JSON.stringify({
      name,
      email,
      company,
      phone,
      message,
      _captcha: 'false',
      _subject: `Cloud Axis Contact: ${name} <${email}>`,
    })

    const result = await new Promise((resolve, reject) => {
      const url = new URL('https://formsubmit.co/ajax/info@cloudaxisnp.com')
      const options = {
        hostname: url.hostname,
        path: url.pathname + url.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
          'Referer': 'https://cloudaxisnp.com',
        },
      }

      const request = https.request(options, (response) => {
        let data = ''
        response.on('data', chunk => { data += chunk })
        response.on('end', () => {
          try { resolve({ status: response.statusCode, body: JSON.parse(data) })
          } catch { resolve({ status: response.statusCode, body: { message: data } }) }
        })
      })

      request.setTimeout(8000, () => {
        request.destroy()
        reject(new Error('Upstream timeout'))
      })

      request.on('error', reject)
      request.write(payload)
      request.end()
    })

    if (result.status !== 200 || result.body.success === 'false') {
      console.error('[contact] FormSubmit error:', result.body)
      return res.status(502).json({ error: 'Failed to deliver message. Please try again.' })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('[contact] Server error:', err.message)
    logSecurityEvent('CONTACT_SERVER_ERROR', { ip, error: err.message })
    return res.status(500).json({ error: 'Internal server error' })
  }
}
