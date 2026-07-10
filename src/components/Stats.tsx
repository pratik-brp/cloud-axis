import { useEffect, useRef, useState } from 'react'

const stats = [
  {
    value: 100, suffix: '%', label: 'Uptime achieved', sublabel: 'verified every month', display: '99.9%',
    accentFrom: '#22d3ee', accentTo: '#2b7fc0',
    icon: <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    value: 9999, suffix: '%', label: 'SLA uptime', sublabel: 'guaranteed every month', display: '99.99%',
    accentFrom: '#34d399', accentTo: '#0ea5e9',
    icon: <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    value: 38, suffix: '%', label: 'Faster launches', sublabel: 'vs. traditional deployments',
    accentFrom: '#818cf8', accentTo: '#22d3ee',
    icon: <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" opacity="0.9"/></svg>,
  },
  {
    value: 24, suffix: '/7', label: 'Expert support', sublabel: 'response in under 60s',
    accentFrom: '#fb923c', accentTo: '#e879f9',
    icon: <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  },
]

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

function StatCard({ stat, index, inView }: { stat: typeof stats[0]; index: number; inView: boolean }) {
  const count = useCountUp(stat.value, 1800 + index * 200, inView)
  const displayValue = stat.display ?? `${count.toLocaleString()}${stat.suffix}`

  return (
    <div className="group relative flex flex-col items-center text-center px-6 py-10 overflow-hidden transition-all duration-200">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(ellipse at center, ${stat.accentFrom}08, transparent 70%)` }} aria-hidden="true" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
        style={{ background: `linear-gradient(90deg, ${stat.accentFrom}, ${stat.accentTo})` }} aria-hidden="true" />

      <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl mb-5 transition-all duration-200 group-hover:scale-110"
        style={{ background: `linear-gradient(135deg, ${stat.accentFrom}18, ${stat.accentTo}10)`, border: `1px solid ${stat.accentFrom}25`, color: stat.accentFrom }}>
        {stat.icon}
      </div>

      <div className="text-4xl md:text-5xl font-bold text-white mb-2 transition-all duration-200 tabular-nums"
        style={{ textShadow: `0 0 40px ${stat.accentFrom}35` }}>
        {displayValue}
      </div>

      <div className="text-sm font-semibold text-white/70 mb-1 group-hover:text-white transition-colors duration-150">{stat.label}</div>
      <div className="text-xs text-white/35">{stat.sublabel}</div>
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
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.unobserve(el) } },
      { threshold: 0.25 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} className="relative bg-[#020b1c] py-20 md:py-28 px-6 md:px-12 overflow-hidden" aria-label="Platform statistics">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.04),transparent_65%)] pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/[0.06] rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
