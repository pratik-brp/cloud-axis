import cloudaxisLogo from '../assets/cloudaxis-logo.png'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact Us', href: '#contact' },
]

const contactLinks = [
  { label: 'info@cloudaxisnp.com', href: 'mailto:info@cloudaxisnp.com' },
  { label: '+977-9812345789', href: 'tel:+977-9812345789' },
  { label: 'Baluwatar, Kathmandu, Nepal', href: 'https://maps.google.com/?q=Baluwatar+Kathmandu+Nepal' },
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
              Cloud infrastructure for teams that demand reliability, speed, and security — without the complexity.
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
                    <span className="ft-link-text">{link.label}</span>
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
