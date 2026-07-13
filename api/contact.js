import https from 'https'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, company, phone, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' })
  }

  try {
    const body = JSON.stringify({ name, email, company, phone, message, _captcha: 'false', _subject: `Cloud Axis: ${email}` })

    const result = await new Promise((resolve, reject) => {
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

    if (result.status !== 200 || result.body.success === 'false') {
      console.error('FormSubmit error:', result.body)
      const message = result.body.message || 'Failed to send email'
      return res.status(500).json({ error: message })
    }

    return res.status(200).json({ success: true, ...result.body })
  } catch (err) {
    console.error('Server error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
