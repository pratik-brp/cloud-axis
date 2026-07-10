import { useEffect, useRef, useState } from 'react'

const stats = [
  {
    value: 100, suffix: '%', label: 'Uptime achieved', sublabel: 'verified every month', display: '99.9%',
    accentFrom: '#22d3ee', accentTo: '#0ea5e9',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14 9 11" />
      </svg>
    ),
  },
  {
    value: 9999, suffix: '%', label: 'SLA uptime', sublabel: 'guaranteed every month', display: '99.99%',
    accentFrom: '#10b981', accentTo: '#059669',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    value: 38, suffix: '%', label: 'Faster launches', sublabel: 'vs. traditional deployments',
    accentFrom: '#6366f1', accentTo: '#4f46e5',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    value: 24, suffix: '/7', label: 'Expert support', sublabel: 'response in under 60s',
    accentFrom: '#f97316', accentTo: '#ea580c',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
]

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    let raf: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        raf = requestAnimationFrame(step)
      }
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration])
  return count
}

function StatCard({ stat, index, inView }: { stat: typeof stats[0]; index: number; inView: boolean }) {
  const count = useCountUp(stat.value, 1800 + index * 150, inView)
  const displayValue = stat.display ?? `${count.toLocaleString()}${stat.suffix}`

  return (
    <div
      className="st-card group"
      style={{
        '--accent-from': stat.accentFrom,
        '--accent-to': stat.accentTo,
      } as React.CSSProperties}
    >
      {/* Background card glows */}
      <div className="st-card-glow-bg" />
      <div className="st-card-glow-border" />

      {/* Decorative dot corner grid inside the card */}
      <div className="st-card-grid" aria-hidden="true" />

      <div className="st-card-content">
        <div className="st-icon-container">
          {stat.icon}
        </div>

        <div className="st-value-container">
          <span className="st-value">{displayValue}</span>
        </div>

        <div className="st-label">{stat.label}</div>
        <div className="st-sublabel">{stat.sublabel}</div>
      </div>
    </div>
  )
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.unobserve(el)
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="st-section" aria-label="Platform statistics">
      {/* Background gradients */}
      <div className="st-bg-gradient-mesh" aria-hidden="true" />
      <div className="st-bg-line-top" aria-hidden="true" />
      <div className="st-bg-line-bottom" aria-hidden="true" />

      <div className="st-container">
        <div className="st-grid">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
