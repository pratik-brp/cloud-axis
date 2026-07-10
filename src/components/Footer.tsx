import cloudaxisLogo from '../assets/cloudaxis-logo.png'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact Us', href: '#contact' },
]

const contactLinks = [
  {
    label: 'info@cloudaxisnp.com',
    href: 'mailto:info@cloudaxisnp.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 7L2 7" />
      </svg>
    ),
  },
  {
    label: '+977-9812345789',
    href: 'tel:+977-9812345789',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    label: 'Baluwatar, Kathmandu, Nepal 44600',
    href: 'https://maps.google.com/?q=Baluwatar+Kathmandu+Nepal',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="ft-footer" role="contentinfo" aria-label="Site footer">
      {/* Top separator glowing edge */}
      <div className="ft-top-line" aria-hidden="true" />
      <div className="ft-ambient-glow" aria-hidden="true" />

      <div className="ft-container">
        <div className="ft-grid">
          
          {/* Brand Info Column */}
          <div className="ft-col-brand">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); handleNavClick(e, '#hero') }}
              aria-label="Cloud Axis home"
              className="ft-logo-link"
            >
              <img src={cloudaxisLogo} alt="Cloud Axis Logo" className="ft-logo-img" />
            </a>
            <p className="ft-brand-desc">
              Cloud infrastructure for teams that demand reliability, speed, and security - without the complexity.
            </p>
          </div>

          {/* Navigation Links Column */}
          <nav className="ft-col-nav" aria-label="Navigation links">
            <h3 className="ft-col-title">Navigation</h3>
            <ul className="ft-links-list">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="ft-link"
                  >
                    <span className="ft-link-text">{link.label}</span>
                    <span className="ft-link-line" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Details Column */}
          <div className="ft-col-contact" aria-label="Contact information">
            <h3 className="ft-col-title">Contact</h3>
            <ul className="ft-links-list">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="ft-link"
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <span className="flex items-center gap-2">
                      {link.icon}
                      <span className="ft-link-text">{link.label}</span>
                    </span>
                    <span className="ft-link-line" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
        </div>

        {/* Footer Bottom copyright bar */}
        <div className="ft-bottom-bar">
          <p className="ft-copyright">
            &copy; {year} Cloud Axis Pvt. Ltd. All rights reserved.
          </p>
          <div className="ft-bottom-decor" />
        </div>
      </div>
    </footer>
  )
}
