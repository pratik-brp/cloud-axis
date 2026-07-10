import cloudaxisLogo from '../assets/cloudaxis-logo.png'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact Us', href: '#contact' },
]

const contactLinks = [
  { label: 'hello@cloudaxis.com', href: 'mailto:hello@cloudaxis.com' },
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
    <footer className="relative bg-[#020b1c] overflow-hidden" role="contentinfo" aria-label="Site footer">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 pt-16 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-white/[0.06]">
          <div className="md:col-span-5 lg:col-span-4 space-y-4">
            <a href="/" onClick={(e) => { e.preventDefault(); handleNavClick(e, '#hero') }} aria-label="Cloud Axis home">
              <img src={cloudaxisLogo} alt="Cloud Axis" className="h-9 w-auto object-contain" />
            </a>
            <p className="text-sm text-white/40 leading-7 max-w-[260px]">
              Cloud infrastructure for teams that demand reliability, speed, and security — without the complexity.
            </p>
          </div>

          <nav className="md:col-span-3 lg:col-span-2" aria-label="Navigation links">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30 mb-5">Navigation</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="footer-link text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4 lg:col-span-3" aria-label="Contact information">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30 mb-5">Contact</h3>
            <ul className="space-y-3">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer-link text-sm"
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            &copy; {year} Cloud Axis Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
