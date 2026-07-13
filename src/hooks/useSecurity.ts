// src/hooks/useSecurity.ts
// Fetches a CSRF token from /api/csrf on mount and exposes a
// secureFetch() wrapper that attaches the X-CSRF-Token header
// to every state-changing request.

import { useEffect, useRef, useCallback } from 'react'

let cachedToken: string | null = null
let fetchPromise: Promise<string> | null = null

async function fetchCsrfToken(): Promise<string> {
  if (cachedToken) return cachedToken
  if (fetchPromise) return fetchPromise

  fetchPromise = fetch('/api/csrf', {
    method: 'GET',
    credentials: 'same-origin',
  })
    .then(r => {
      if (!r.ok) throw new Error('Failed to fetch CSRF token')
      return r.json()
    })
    .then((data: { csrfToken: string }) => {
      cachedToken = data.csrfToken
      fetchPromise = null
      return cachedToken
    })
    .catch(err => {
      fetchPromise = null
      throw err
    })

  return fetchPromise
}

export function useSecurity() {
  const tokenRef = useRef<string | null>(null)

  useEffect(() => {
    fetchCsrfToken()
      .then(token => { tokenRef.current = token })
      .catch(err => console.warn('[security] CSRF prefetch failed:', err))
  }, [])

  /**
   * A fetch wrapper that:
   * - Enforces same-origin credentials
   * - Attaches the X-CSRF-Token header on POST/PUT/PATCH/DELETE
   * - Sets Content-Type: application/json by default
   */
  const secureFetch = useCallback(async (
    url: string,
    options: RequestInit = {}
  ): Promise<Response> => {
    const method = (options.method ?? 'GET').toUpperCase()
    const isMutating = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)

    let token = tokenRef.current
    if (isMutating && !token) {
      token = await fetchCsrfToken()
      tokenRef.current = token
    }

    const headers = new Headers(options.headers)

    if (!headers.has('Content-Type') && options.body) {
      headers.set('Content-Type', 'application/json')
    }

    if (isMutating && token) {
      headers.set('X-CSRF-Token', token)
    }

    return fetch(url, {
      ...options,
      headers,
      credentials: 'same-origin',
    })
  }, [])

  return { secureFetch }
}
