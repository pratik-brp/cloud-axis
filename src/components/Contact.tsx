import { useState, type FormEvent } from 'react'
import { useReveal } from '../hooks/useReveal'
import Button from './ui/Button'

interface FormData {
  name: string
  email: string
  company: string
  phone: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

const contactInfo = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 7L2 7" />
      </svg>
    ),
    label: 'Email',
    value: 'info@cloudaxisnp.com',
    href: 'mailto:info@cloudaxisnp.com',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: 'Phone',
    value: '+977-9803350658',
    href: 'tel:+977-9812345789',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'Office',
    value: 'Baluwatar, Kathmandu, Nepal 44600',
    href: 'https://maps.google.com/?q=Baluwatar+Kathmandu+Nepal',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: 'Business Hours',
    value: 'Mon\u2013Fri, 9:00 AM \u2013 5:00 PM NPT',
    href: null,
  },
]

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.name.trim()) errors.name = 'Full name is required'
  if (!data.email.trim()) {
    errors.email = 'Email address is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address'
  }
  if (!data.message.trim()) errors.message = 'Message is required'
  return errors
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')
  const headerRef = useReveal<HTMLDivElement>(0.1, 'visible')
  const contentRef = useReveal<HTMLDivElement>(0.05, 'visible')

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field as keyof FormErrors]
        return next
      })
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const validationErrors = validate(formData)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setSubmitStatus('submitting')
    try {
      const res = await fetch('https://formsubmit.co/ajax/info@cloudaxisnp.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, _captcha: 'false', _subject: `Cloud Axis contact: ${formData.email}` }),
      })
      const data = await res.json()
      if (data.success !== 'true') throw new Error(data.message || 'Failed to send')
      setSubmitStatus('success')
    } catch {
      setSubmitStatus('error')
    }
  }

  const resetForm = () => {
    setFormData({ name: '', email: '', company: '', phone: '', message: '' })
    setErrors({})
    setSubmitStatus('idle')
  }

  return (
    <section id="contact" className="con-section" aria-labelledby="contact-heading">
      <div className="con-dot-pattern" aria-hidden="true" />
      <div className="con-glow-top" aria-hidden="true" />
      <div className="con-glow-bottom-left" aria-hidden="true" />
      <div className="con-glow-bottom-right" aria-hidden="true" />
      <div className="con-border-line" aria-hidden="true" />

      <div className="con-container">
        <header ref={headerRef} className="con-header reveal">
          <span className="con-badge">
            <span className="con-badge-dot" aria-hidden="true" />
            Get in touch
          </span>
          <h2 id="contact-heading" className="con-title">
            Let&apos;s discuss your{' '}
            <span className="con-title-gradient">cloud infrastructure</span>{' '}
            needs
          </h2>
          <p className="con-subtitle">
            Tell us about your project and our team will get back to you within 24 hours with a tailored proposal for your infrastructure goals.
          </p>
        </header>

        <div ref={contentRef} className="con-grid reveal">
          <div className="con-col-left">
            <div className="con-card-form">
              <div className="con-card-glow" />
              <div className="con-card-accent" />

              <div className="con-form-container">
                {submitStatus === 'success' ? (
                  <div className="con-success-container">
                    <div className="con-success-icon-box">
                      <svg viewBox="0 0 24 24" fill="none" className="con-success-icon" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h4 className="con-success-title">Message sent successfully!</h4>
                    <p className="con-success-text">
                      Thank you for reaching out. Our team will review your inquiry and get back to you within 24 hours.
                    </p>
                    <button onClick={resetForm} className="con-reset-btn">
                      Send another message
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="con-form-title">Send us a message</h3>
                    <p className="con-form-subtitle">
                      Fill out the form below and we&apos;ll get back to you shortly.
                    </p>

                    {submitStatus === 'error' && (
                      <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm" role="alert">
                        Failed to send message. Please try again or email us directly at{' '}
                        <a href="mailto:info@cloudaxisnp.com" className="underline">info@cloudaxisnp.com</a>.
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="con-form" noValidate>
                      <div className="con-form-row">
                        <div className="con-field-group">
                          <label htmlFor="name" className="con-field-label">
                            Full Name <span className="con-asterisk">*</span>
                          </label>
                          <div className="con-input-wrapper">
                            <input
                              id="name"
                              type="text"
                              placeholder="Your name"
                              value={formData.name}
                              onChange={(e) => updateField('name', e.target.value)}
                              aria-invalid={!!errors.name}
                              aria-describedby={errors.name ? 'name-error' : undefined}
                              className={`con-input ${errors.name ? '!border-red-400/50' : ''}`}
                            />
                            <div className="con-input-line" />
                          </div>
                          {errors.name && (
                            <p id="name-error" className="text-red-400 text-xs mt-1" role="alert">{errors.name}</p>
                          )}
                        </div>
                        <div className="con-field-group">
                          <label htmlFor="email" className="con-field-label">
                            Email Address <span className="con-asterisk">*</span>
                          </label>
                          <div className="con-input-wrapper">
                            <input
                              id="email"
                              type="email"
                              placeholder="Your email"
                              value={formData.email}
                              onChange={(e) => updateField('email', e.target.value)}
                              aria-invalid={!!errors.email}
                              aria-describedby={errors.email ? 'email-error' : undefined}
                              autoComplete="email"
                              className={`con-input ${errors.email ? '!border-red-400/50' : ''}`}
                            />
                            <div className="con-input-line" />
                          </div>
                          {errors.email && (
                            <p id="email-error" className="text-red-400 text-xs mt-1" role="alert">{errors.email}</p>
                          )}
                        </div>
                      </div>
                      <div className="con-form-row">
                        <div className="con-field-group">
                          <label htmlFor="company" className="con-field-label">Company Name</label>
                          <div className="con-input-wrapper">
                            <input
                              id="company"
                              type="text"
                              placeholder="Your company"
                              value={formData.company}
                              onChange={(e) => updateField('company', e.target.value)}
                              className="con-input"
                            />
                            <div className="con-input-line" />
                          </div>
                        </div>
                        <div className="con-field-group">
                          <label htmlFor="phone" className="con-field-label">Phone Number</label>
                          <div className="con-input-wrapper">
                            <input
                              id="phone"
                              type="tel"
                              placeholder="Your phone"
                              value={formData.phone}
                              onChange={(e) => updateField('phone', e.target.value)}
                              autoComplete="tel"
                              className="con-input"
                            />
                            <div className="con-input-line" />
                          </div>
                        </div>
                      </div>
                      <div className="con-field-group">
                        <label htmlFor="message" className="con-field-label">
                          Message <span className="con-asterisk">*</span>
                        </label>
                        <div className="con-input-wrapper">
                          <textarea
                            id="message"
                            rows={4}
                            placeholder="Tell us about your cloud infrastructure needs, project scope, and timeline..."
                            value={formData.message}
                            onChange={(e) => updateField('message', e.target.value)}
                            aria-invalid={!!errors.message}
                            aria-describedby={errors.message ? 'message-error' : undefined}
                            className={`con-textarea ${errors.message ? '!border-red-400/50' : ''}`}
                          />
                          <div className="con-input-line" />
                        </div>
                        {errors.message && (
                          <p id="message-error" className="text-red-400 text-xs mt-1" role="alert">{errors.message}</p>
                        )}
                      </div>

                      <Button
                        variant="gradient"
                        type="submit"
                        loading={submitStatus === 'submitting'}
                        disabled={submitStatus === 'submitting'}
                        className="w-full !rounded-xl !py-3"
                      >
                        <span>Send Message</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="con-col-right">
            <div className="con-card-info">
              <div className="con-card-glow" />
              <div className="con-card-accent-blue" />

              <div className="con-info-container">
                <h3 className="con-info-title">Contact Information</h3>
                <div className="con-info-list">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="con-info-item group">
                      <div className="con-info-icon-box">{item.icon}</div>
                      <div className="con-info-content">
                        <span className="con-info-label">{item.label}</span>
                        {item.href ? (
                          <a href={item.href} className="con-info-link">{item.value}</a>
                        ) : (
                          <span className="con-info-value">{item.value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="con-card-map">
              <div className="con-map-overlay" aria-hidden="true" />
              <iframe
                src="https://www.google.com/maps?q=27.723077,85.330460&z=15&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cloud Axis office location"
              />
              <div className="con-map-badge">
                <span className="con-map-badge-dot" />
                Baluwatar, Kathmandu, Nepal
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
