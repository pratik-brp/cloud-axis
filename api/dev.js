import https from 'https'

function postToFormSubmit(data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data)
    const url = new URL('https://formsubmit.co/ajax/info@cloudaxisnp.com')
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'Referer': 'https://cloudaxisnp.com',
      },
    }

    const request = https.request(options, (response) => {
      let data = ''
      response.on('data', (chunk) => { data += chunk })
      response.on('end', () => {
        try {
          resolve({ status: response.statusCode, body: JSON.parse(data) })
        } catch {
          resolve({ status: response.statusCode, body: { message: data } })
        }
      })
    })

    request.on('error', reject)
    request.write(body)
    request.end()
  })
}

// Dev-only middleware that serves /api/contact during local development.
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

            const result = await postToFormSubmit({ name, email, company, phone, message, _captcha: 'false', _subject: `Cloud Axis: ${email}` })

            if (result.status !== 200 || result.body.success === 'false') {
              console.error('FormSubmit error:', result.body)
              const msg = result.body.message || 'Failed to send email'
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: msg }))
              return
            }

            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true, ...result.body }))
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
