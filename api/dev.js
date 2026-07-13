// Dev-only middleware that serves /api/contact during local development.
// Mirrors the Vercel serverless function in api/contact.js
export default function devApiPlugin() {
  return {
    name: 'dev-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        let body = ''
        req.on('data', (chunk) => { body += chunk })
        req.on('end', async () => {
          try {
            const { name, email, company, phone, message } = JSON.parse(body)

            if (!name && !email) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Name and email are required' }))
              return
            }

            const response = await fetch('https://formsubmit.co/ajax/info@cloudaxisnp.com', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Referer': 'https://cloudaxisnp.com', 'Origin': 'https://cloudaxisnp.com' },
              body: JSON.stringify({ name, email, company, phone, message, _captcha: 'false', _subject: `Cloud Axis: ${email}` }),
            })

            const data = await response.json()

            if (!response.ok || data.success === 'false') {
              console.error('FormSubmit error:', data)
              const msg = data.message || 'Failed to send email'
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: msg }))
              return
            }

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true, ...data }))
          } catch (err) {
            console.error('Dev API error:', err)
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Internal server error' }))
          }
        })
      })
    },
  }
}
