import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from '@tanstack/react-router'
import cloudaxisLogo from '../assets/cloudaxis-logo.png'

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact Us', href: '#contact' },
]

function useActiveSection() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const ids = ['hero', 'about', 'services', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      { threshold: 0.3, rootMargin: '-80px 0px -10% 0px' },
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return active
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const activeSection = useActiveSection()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (e: React.MouseEvent, link: (typeof navLinks)[0]) => {
    e.preventDefault()
    setMobileOpen(false)

    const id = link.href.replace('#', '')

    if (!isHome) {
      navigate({ to: '/', hash: id })
      return
    }

    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const isActive = (link: (typeof navLinks)[0]) => {
    const id = link.href.replace('#', '')
    return isHome && activeSection === id
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 transition-all duration-300 ${
      scrolled
        ? 'bg-[#020b1c]/90 backdrop-blur-xl shadow-lg shadow-black/20'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 md:py-4">
        <a href="/" onClick={(e) => {
            e.preventDefault()
            if (isHome) {
              window.scrollTo({ top: 0, behavior: 'smooth' })
            } else {
              navigate({ to: '/' })
            }
          }}>
          <img
            src={cloudaxisLogo}
            alt="Cloud Axis"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link)}
                className={`transition-colors duration-200 cursor-pointer tracking-wide ${
                  isActive(link)
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => {
              const el = document.getElementById('contact')
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            className="px-5 py-2 rounded-full text-sm font-semibold text-[#061a3a] bg-white hover:bg-white/90 transition-colors duration-200 shadow-lg shadow-white/10"
          >
            Get Started
          </button>
        </div>

        <button
          className="md:hidden p-2 text-white/80 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full mx-4 rounded-2xl border border-white/[0.08] bg-[#0d1b2a]/95 backdrop-blur-2xl shadow-2xl overflow-hidden animate-fade-in-down">
          <ul className="flex flex-col py-3">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleClick(e, link)}
                  className={`block px-6 py-3 text-sm transition-colors duration-200 ${
                    isActive(link)
                      ? 'text-white bg-white/[0.06]'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="px-6 pt-3 pb-2">
              <button
                onClick={() => {
                  const el = document.getElementById('contact')
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  setMobileOpen(false)
                }}
                className="w-full px-5 py-2.5 rounded-full text-sm font-semibold text-[#061a3a] bg-white hover:bg-white/90 transition-colors duration-200"
              >
                Get Started
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}
