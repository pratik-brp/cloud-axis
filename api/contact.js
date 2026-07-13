export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, company, phone, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' })
  }

  try {
    // Proxy to FormSubmit.co server-to-server (no CORS issues)
    const response = await fetch('https://formsubmit.co/ajax/info@cloudaxisnp.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Referer': 'https://cloudaxisnp.com', 'Origin': 'https://cloudaxisnp.com' },
      body: JSON.stringify({ name, email, company, phone, message, _captcha: 'false', _subject: `Cloud Axis: ${email}` }),
    })

    const data = await response.json()

    if (!response.ok || data.success === 'false') {
      console.error('FormSubmit error:', data)
      const message = data.message || 'Failed to send email'
      return res.status(500).json({ error: message })
    }

    return res.status(200).json({ success: true, ...data })
  } catch (err) {
    console.error('Server error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
