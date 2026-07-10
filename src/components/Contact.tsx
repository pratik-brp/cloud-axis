import { useState } from 'react'

const contactInfo = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: 'Phone',
    value: '+977-9812345789',
    href: 'tel:+977-9812345789',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
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
  const baseClass =
    'w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition-all duration-200 focus:bg-white/[0.06] focus:border-cyan-400/30 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.06)]'

  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
        {label}{required && <span className="text-cyan-400 ml-1">*</span>}
      </label>
      {rows ? (
        <textarea id={id} rows={rows} placeholder={placeholder} required={required} className={`${baseClass} resize-none`} />
      ) : (
        <input id={id} type={type} placeholder={placeholder} required={required} className={baseClass} autoComplete={id === 'name' ? 'name' : id === 'email' ? 'email' : id === 'phone' ? 'tel' : 'off'} />
      )}
    </div>
  )
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="relative bg-[#020b1c] py-28 md:py-36 px-6 md:px-12 overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-cyan-500/[0.025] blur-[140px] rounded-full pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-blue-600/[0.03] blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="section-label mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" aria-hidden="true" />
            Get in touch
          </span>
          <h1 className="mt-5 text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-white leading-[1.08]">
            Let's discuss your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300">
              cloud infrastructure
            </span>{' '}
            needs
          </h1>
          <p className="mt-5 text-base md:text-lg text-white/40 leading-relaxed max-w-2xl mx-auto">
            Tell us about your project and our team will get back to you within 24 hours with a tailored proposal for your infrastructure goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl p-8 md:p-12 shadow-[0_32px_80px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)] overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" aria-hidden="true" />
              <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(34,211,238,0.05), transparent 60%)' }} aria-hidden="true" />

              <div className="relative">
                <h2 className="text-xl font-bold text-white mb-2">Send us a message</h2>
                <p className="text-sm text-white/40 mb-10 leading-relaxed">
                  Fill out the form below and we'll get back to you shortly.
                </p>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField label="Full Name" id="name" placeholder="Your name" required />
                      <FormField label="Email Address" id="email" type="email" placeholder="Your email" required />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <FormField label="Company Name" id="company" placeholder="Your company" />
                      <FormField label="Phone Number" id="phone" type="tel" placeholder="Your phone" />
                    </div>
                    <FormField label="Message" id="message" placeholder="Tell us about your cloud infrastructure needs, project scope, and timeline..." required rows={5} />
                    <button type="submit" className="btn-primary w-full px-7 py-3.5 rounded-xl text-sm font-semibold tracking-wide">
                      Send Message
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 border border-cyan-400/25 flex items-center justify-center mb-6">
                      <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 tick-in text-cyan-300" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" fill="rgba(34,211,238,0.15)" />
                        <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Message sent successfully!</h3>
                    <p className="text-sm text-white/40 max-w-sm leading-relaxed">
                      Thank you for reaching out. Our team will review your inquiry and get back to you within 24 hours.
                    </p>
                    <button onClick={() => setSubmitted(false)} className="mt-8 text-sm text-cyan-300 hover:text-cyan-200 transition-colors duration-200 underline underline-offset-4">
                      Send another message
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl p-8 md:p-10 shadow-[0_32px_80px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)] overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" aria-hidden="true" />
              <div className="relative">
                <h2 className="text-base font-bold text-white mb-8">Contact Information</h2>
                <div className="space-y-7">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-cyan-400/[0.06] border border-cyan-400/10 flex items-center justify-center text-cyan-300/70 group-hover:text-cyan-300 group-hover:border-cyan-400/20 transition-all duration-200">
                        {item.icon}
                      </div>
                      <div className="min-w-0 pt-1">
                        <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-0.5">{item.label}</div>
                        {item.href ? (
                          <a href={item.href} className="text-sm text-white/80 hover:text-white transition-colors duration-200">
                            {item.value}
                          </a>
                        ) : (
                          <div className="text-sm text-white/80">{item.value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl border border-white/[0.08] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.4)]" style={{ height: '220px' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/[0.04] to-blue-500/[0.02] pointer-events-none z-10" aria-hidden="true" />
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
              <div className="absolute bottom-3 left-3 z-20 px-3 py-1.5 rounded-lg bg-[#020b1c]/80 backdrop-blur-sm border border-white/[0.06] text-xs text-white/60">
                Baluwatar, Kathmandu, Nepal
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
