import { useState, useEffect, useRef } from 'react'

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return ref
}

const contactInfo = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 7L2 7" />
      </svg>
    ),
    label: 'Email',
    value: 'hello@cloudaxis.com',
    href: 'mailto:hello@cloudaxis.com',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: 'Phone',
    value: '+977-9812345789',
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
    value: 'Baluwatar, Kathmandu, Nepal',
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
    value: 'Mon–Fri, 9:00 AM – 6:00 PM PST',
    href: null,
  },
]

function FormField({
  label,
  id,
  type = 'text',
  placeholder,
  required = false,
  rows,
}: {
  label: string
  id: string
  type?: string
  placeholder?: string
  required?: boolean
  rows?: number
}) {
  return (
    <div className="con-field-group">
      <label htmlFor={id} className="con-field-label">
        {label}{required && <span className="con-asterisk">*</span>}
      </label>
      <div className="con-input-wrapper">
        {rows ? (
          <textarea
            id={id}
            rows={rows}
            placeholder={placeholder}
            required={required}
            className="con-textarea"
          />
        ) : (
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            required={required}
            className="con-input"
            autoComplete={id === 'name' ? 'name' : id === 'email' ? 'email' : id === 'phone' ? 'tel' : 'off'}
          />
        )}
        <div className="con-input-line" />
      </div>
    </div>
  )
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const headerRef = useReveal()
  const contentRef = useReveal(0.05)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="con-section" aria-labelledby="contact-heading">
      {/* Visual background layers */}
      <div className="con-dot-pattern" aria-hidden="true" />
      <div className="con-glow-top" aria-hidden="true" />
      <div className="con-glow-bottom-left" aria-hidden="true" />
      <div className="con-glow-bottom-right" aria-hidden="true" />
      <div className="con-border-line" aria-hidden="true" />

      <div className="con-container">
        {/* Section Header */}
        <header ref={headerRef as React.RefObject<HTMLDivElement>} className="con-header reveal">
          <span className="con-badge">
            <span className="con-badge-dot" aria-hidden="true" />
            Get in touch
          </span>
          <h2 id="contact-heading" className="con-title">
            Let's discuss your{' '}
            <span className="con-title-gradient">
              cloud infrastructure
            </span>{' '}
            needs
          </h2>
          <p className="con-subtitle">
            Tell us about your project and our team will get back to you within 24 hours with a tailored proposal for your infrastructure goals.
          </p>
        </header>

        {/* Two columns (Form left, info right) */}
        <div ref={contentRef as React.RefObject<HTMLDivElement>} className="con-grid reveal">
          
          {/* Left Column: Form */}
          <div className="con-col-left">
            <div className="con-card-form">
              <div className="con-card-glow" />
              <div className="con-card-accent" />
              
              <div className="con-form-container">
                <h3 className="con-form-title">Send us a message</h3>
                <p className="con-form-subtitle">
                  Fill out the form below and we'll get back to you shortly.
                </p>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="con-form">
                    <div className="con-form-row">
                      <FormField label="Full Name" id="name" placeholder="Your name" required />
                      <FormField label="Email Address" id="email" type="email" placeholder="Your email" required />
                    </div>
                    <div className="con-form-row">
                      <FormField label="Company Name" id="company" placeholder="Your company" />
                      <FormField label="Phone Number" id="phone" type="tel" placeholder="Your phone" />
                    </div>
                    <FormField
                      label="Message"
                      id="message"
                      placeholder="Tell us about your cloud infrastructure needs, project scope, and timeline..."
                      required
                      rows={4}
                    />
                    
                    <button type="submit" className="con-submit-btn">
                      <span>Send Message</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="con-btn-arrow">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </form>
                ) : (
                  <div className="con-success-container">
                    <div className="con-success-icon-box">
                      <svg viewBox="0 0 24 24" fill="none" className="con-success-icon" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" className="con-success-circle" />
                        <path d="M8 12l3 3 5-5" className="con-success-path" />
                      </svg>
                    </div>
                    <h4 className="con-success-title">Message sent successfully!</h4>
                    <p className="con-success-text">
                      Thank you for reaching out. Our team will review your inquiry and get back to you within 24 hours.
                    </p>
                    <button onClick={() => setSubmitted(false)} className="con-reset-btn">
                      Send another message
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Info & Map */}
          <div className="con-col-right">
            
            {/* Info card */}
            <div className="con-card-info">
              <div className="con-card-glow" />
              <div className="con-card-accent-blue" />
              
              <div className="con-info-container">
                <h3 className="con-info-title">Contact Information</h3>
                
                <div className="con-info-list">
                  {contactInfo.map((item, idx) => (
                    <div key={item.label} className="con-info-item group" style={{ animationDelay: `${idx * 100}ms` }}>
                      <div className="con-info-icon-box">
                        {item.icon}
                      </div>
                      <div className="con-info-content">
                        <span className="con-info-label">{item.label}</span>
                        {item.href ? (
                          <a href={item.href} className="con-info-link">
                            {item.value}
                          </a>
                        ) : (
                          <span className="con-info-value">{item.value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Frame Card */}
            <div className="con-card-map">
              <div className="con-map-overlay" aria-hidden="true" />
              <iframe
                src="https://www.google.com/maps?q=27.723077,85.330460&z=15&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
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
