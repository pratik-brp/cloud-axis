import { useEffect, useRef, useState, type CSSProperties } from 'react'
import cloudaxisLogo from '../assets/cloudaxis-logo.png'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Intersection-Observer hooks
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('ab-visible'); obs.unobserve(el) } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return ref
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Animated counter
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf: number
    let t0: number | null = null
    const step = (ts: number) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(eased * target))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [start, target, duration])
  return count
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Icons (SVG mini components)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const IcoOrchestration = ({ color = '#67e8f9' }: { color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
    <circle cx="12" cy="4" r="2.2" stroke={color} strokeWidth="1.4"/>
    <circle cx="4" cy="20" r="2.2" stroke={color} strokeWidth="1.4"/>
    <circle cx="20" cy="20" r="2.2" stroke={color} strokeWidth="1.4"/>
    <path d="M12 6.2v6M12 12.2L4.5 18M12 12.2l7.5 5.8" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
)
const IcoDatabase = ({ color = '#67e8f9' }: { color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
    <ellipse cx="12" cy="6" rx="7.5" ry="3" stroke={color} strokeWidth="1.4"/>
    <path d="M4.5 6v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6" stroke={color} strokeWidth="1.4"/>
    <path d="M4.5 12v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" stroke={color} strokeWidth="1.4"/>
  </svg>
)
const IcoCDN = ({ color = '#67e8f9' }: { color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
    <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.4"/>
    <path d="M4 12h16M12 4c-2.2 2.2-3 4.5-3 8s.8 5.8 3 8M12 4c2.2 2.2 3 4.5 3 8s-.8 5.8-3 8" stroke={color} strokeWidth="1.4"/>
  </svg>
)
const IcoAI = ({ color = '#67e8f9' }: { color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
    <circle cx="12" cy="12" r="3.5" stroke={color} strokeWidth="1.4"/>
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5.1 5.1l2.1 2.1M16.8 16.8l2.1 2.1M5.1 18.9l2.1-2.1M16.8 7.2l2.1-2.1" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
)
const IcoContainer = ({ color = '#67e8f9' }: { color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
    <rect x="2" y="2" width="8.5" height="8.5" rx="1.5" stroke={color} strokeWidth="1.4"/>
    <rect x="13.5" y="2" width="8.5" height="8.5" rx="1.5" stroke={color} strokeWidth="1.4"/>
    <rect x="2" y="13.5" width="8.5" height="8.5" rx="1.5" stroke={color} strokeWidth="1.4"/>
    <rect x="13.5" y="13.5" width="8.5" height="8.5" rx="1.5" stroke={color} strokeWidth="1.4"/>
  </svg>
)
const IcoStorage = ({ color = '#67e8f9' }: { color?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
    <rect x="3" y="4.5" width="18" height="6" rx="1.5" stroke={color} strokeWidth="1.4"/>
    <rect x="3" y="13.5" width="18" height="6" rx="1.5" stroke={color} strokeWidth="1.4"/>
    <circle cx="18" cy="7.5" r="1.2" fill={color}/>
    <circle cx="18" cy="16.5" r="1.2" fill={color}/>
  </svg>
)

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Animated circuit board background
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function CircuitPattern() {
  return (
    <svg
      className="ab-circuit-svg"
      viewBox="0 0 800 600"
      fill="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08, pointerEvents: 'none' }}
    >
      {/* Horizontal lines */}
      <line x1="0" y1="100" x2="800" y2="100" stroke="#67e8f9" strokeWidth="0.5" strokeDasharray="8 12"/>
      <line x1="0" y1="250" x2="800" y2="250" stroke="#67e8f9" strokeWidth="0.5" strokeDasharray="6 10"/>
      <line x1="0" y1="400" x2="800" y2="400" stroke="#67e8f9" strokeWidth="0.5" strokeDasharray="8 12"/>
      <line x1="0" y1="500" x2="800" y2="500" stroke="#67e8f9" strokeWidth="0.5" strokeDasharray="4 14"/>
      {/* Vertical lines */}
      <line x1="200" y1="0" x2="200" y2="600" stroke="#67e8f9" strokeWidth="0.5" strokeDasharray="6 10"/>
      <line x1="400" y1="0" x2="400" y2="600" stroke="#67e8f9" strokeWidth="0.5" strokeDasharray="8 12"/>
      <line x1="600" y1="0" x2="600" y2="600" stroke="#67e8f9" strokeWidth="0.5" strokeDasharray="6 10"/>
      {/* Junction dots */}
      {[[200,100],[400,100],[600,100],[200,250],[400,250],[600,250],[200,400],[400,400],[600,400]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r="3" fill="#67e8f9" opacity="0.6" className="ab-junction-dot" style={{animationDelay:`${i*0.3}s`}}/>
      ))}
    </svg>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Platform Diagram — Logo only, 3D style
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function PlatformDiagram() {
  return (
    <div className="ab-logo-3d-wrapper">
      {/* Ambient glow behind logo */}
      <div className="ab-logo-3d-glow" aria-hidden="true"/>
      {/* Secondary deeper glow for depth */}
      <div className="ab-logo-3d-glow-deep" aria-hidden="true"/>

      {/* 3D logo container */}
      <div className="ab-logo-3d-container">
        {/* The logo image — blend mode removes bg */}
        <img
          src={cloudaxisLogo}
          alt="Cloud Axis"
          className="ab-logo-3d-img"
        />
      </div>

      {/* Reflection / floor shadow */}
      <div className="ab-logo-3d-reflection" aria-hidden="true">
        <img
          src={cloudaxisLogo}
          alt=""
          className="ab-logo-3d-reflection-img"
        />
      </div>

      {/* "CLOUD AXIS" text */}
      <p className="ab-logo-3d-title">CLOUD AXIS</p>
      <p className="ab-logo-3d-tagline">NEXT-GEN INFRASTRUCTURE</p>
    </div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Stat pill component
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function StatPill({ value, label, suffix, prefix = '', delay, inView }: {
  value: number; label: string; suffix: string; prefix?: string; delay: number; inView: boolean
}) {
  const count = useCountUp(value, 1400, inView)
  const display = value === 9999 ? '99.99' : String(count)

  return (
    <div
      className="ab-stat-pill"
      style={{ animationDelay: `${delay}s` } as CSSProperties}
    >
      <div className="ab-stat-value">
        {prefix}{display}<span className="ab-stat-suffix">{suffix}</span>
      </div>
      <div className="ab-stat-label">{label}</div>
    </div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ABOUT SECTION (exported)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function About() {
  const headerRef = useReveal(0.2)
  const leftRef   = useReveal(0.15)
  const rightRef  = useReveal(0.15)
  const { ref: statsRef, visible: statsVisible } = useInView(0.3)

  return (
    <section
      id="about"
      className="ab-section"
      aria-labelledby="about-heading"
    >
      {/* Decorative background layers */}
      <div className="ab-bg-mesh" aria-hidden="true"/>
      <CircuitPattern/>

      {/* Top edge glow line */}
      <div className="ab-top-line" aria-hidden="true"/>

      {/* Floating orbs */}
      <div className="ab-orb ab-orb-1" aria-hidden="true"/>
      <div className="ab-orb ab-orb-2" aria-hidden="true"/>
      <div className="ab-orb ab-orb-3" aria-hidden="true"/>

      <div className="ab-container">

        {/* ── HEADER ── */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className="ab-header ab-reveal-up"
        >
          <div className="ab-badge">
            <span className="ab-badge-dot"/>
            About Us
          </div>

          <h2 id="about-heading" className="ab-title">
           
            <span className="ab-title-gradient">Deploy • Migrate • Monitor • Secure • Optimize.</span>
            <br/>
            <span className="ab-title-white">Complete cloud infrastructure lifecycle management</span>
          </h2>

          <p className="ab-subtitle">
            We set out to build the platform we always wished existed
            — fast, reliable, and built for the teams who ship.
          </p>
        </div>

        {/* ── TWO COLUMN GRID ── */}
        <div className="ab-grid">

          {/* LEFT CARD — Mission */}
          <div ref={leftRef as React.RefObject<HTMLDivElement>} className="ab-reveal-left">
            <div className="ab-card ab-card-mission">
              {/* Card top accent line */}
              <div className="ab-card-accent"/>

              <div className="ab-card-tag">
                <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
                  <path d="M8 1l2.2 4.5L15 6.3l-3.5 3.4.8 4.9L8 12.5l-4.3 2.1.8-4.9L1 6.3l4.8-.8L8 1z"
                    fill="#22d3ee" opacity="0.7"/>
                </svg>
                The Cloud Axis Mission
              </div>

              <p className="ab-card-text-primary">
               Empowering organizations through secure, scalable, and expertly managed cloud solution-driving innovation, resilience, and sustainable growth across Nepal and beyond.
              </p>

              <p className="ab-card-text-secondary">
               At Cloud Axis, our mission is to simplify cloud operations for businesses of all sizes. We partner with organizations to architect, deploy, migrate, secure, monitor, and continuously optimize cloud environments across leading cloud platforms. Through proactive management, automation, security-first practices, and 24×7 operational support, we help businesses improve reliability, reduce operational risk, and accelerate digital transformation with confidence.
              </p>

              {/* Stats row */}
              <div ref={statsRef} className="ab-stats-row">
                <StatPill value={9999} suffix="%" label="Uptime SLA" delay={0.1} inView={statsVisible}/>
                <StatPill value={5} prefix="<" suffix="m" label="Avg. deployment time" delay={0.3} inView={statsVisible}/>
              </div>
            </div>
          </div>

          {/* RIGHT CARD — Platform */}
          <div ref={rightRef as React.RefObject<HTMLDivElement>} className="ab-reveal-right">
            <div className="ab-card ab-card-platform">
              <div className="ab-card-accent ab-card-accent-alt"/>

              <div className="ab-card-tag ab-card-tag-center">
                <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
                  <circle cx="8" cy="8" r="6" stroke="#22d3ee" strokeWidth="1.2" opacity="0.7"/>
                  <circle cx="8" cy="8" r="2.5" fill="#22d3ee" opacity="0.7"/>
                </svg>
                The Platform
              </div>

              <div className="ab-diagram-wrapper">
                <PlatformDiagram/>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
