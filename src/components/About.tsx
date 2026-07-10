import { useEffect, useRef } from 'react'
import cloudaxisLogo from '../assets/cloudaxis-logo.png'

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

// ── Icons ──────────────────────────────────────────────────────────────────
const IcoOrchestration = () => (
  <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
    <circle cx="8" cy="2.5" r="1.5" stroke="#4da6ff" strokeWidth="1.2"/>
    <circle cx="3" cy="13.5" r="1.5" stroke="#4da6ff" strokeWidth="1.2"/>
    <circle cx="13" cy="13.5" r="1.5" stroke="#4da6ff" strokeWidth="1.2"/>
    <path d="M8 4v4.5M8 8.5L3.5 12.2M8 8.5l4.5 3.7" stroke="#4da6ff" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)
const IcoDatabase = () => (
  <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
    <ellipse cx="8" cy="4" rx="5" ry="2" stroke="#4da6ff" strokeWidth="1.2"/>
    <path d="M3 4v4c0 1.1 2.24 2 5 2s5-.9 5-2V4" stroke="#4da6ff" strokeWidth="1.2"/>
    <path d="M3 8v4c0 1.1 2.24 2 5 2s5-.9 5-2V8" stroke="#4da6ff" strokeWidth="1.2"/>
  </svg>
)
const IcoCDN = () => (
  <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
    <circle cx="8" cy="8" r="5.5" stroke="#4da6ff" strokeWidth="1.2"/>
    <path d="M2.5 8h11M8 2.5c-1.5 1.5-2 3-2 5.5s.5 4 2 5.5M8 2.5c1.5 1.5 2 3 2 5.5s-.5 4-2 5.5" stroke="#4da6ff" strokeWidth="1.2"/>
  </svg>
)
const IcoAI = () => (
  <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
    <circle cx="8" cy="8" r="2.5" stroke="#4da6ff" strokeWidth="1.2"/>
    <path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M3.4 12.6l1.4-1.4M11.2 4.8l1.4-1.4" stroke="#4da6ff" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)
const IcoContainer = () => (
  <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
    <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1" stroke="#4da6ff" strokeWidth="1.2"/>
    <rect x="9" y="1.5" width="5.5" height="5.5" rx="1" stroke="#4da6ff" strokeWidth="1.2"/>
    <rect x="1.5" y="9" width="5.5" height="5.5" rx="1" stroke="#4da6ff" strokeWidth="1.2"/>
    <rect x="9" y="9" width="5.5" height="5.5" rx="1" stroke="#4da6ff" strokeWidth="1.2"/>
  </svg>
)
const IcoStorage = () => (
  <svg viewBox="0 0 16 16" fill="none" width="13" height="13">
    <rect x="2" y="3" width="12" height="4" rx="1" stroke="#4da6ff" strokeWidth="1.2"/>
    <rect x="2" y="9" width="12" height="4" rx="1" stroke="#4da6ff" strokeWidth="1.2"/>
    <circle cx="12" cy="5" r="0.8" fill="#4da6ff"/>
    <circle cx="12" cy="11" r="0.8" fill="#4da6ff"/>
  </svg>
)

// ── Platform center diagram ────────────────────────────────────────────────
// Pure SVG — viewBox 460×300, center 230×150
// 3 icon nodes on left (x≈30), 3 on right (x≈430)
// Dashed lines connect each node to center, midpoint glow dot on each line
// Orbit ring around center box, 6 accent dots on ring

function PlatformDiagram() {
  const CX = 230, CY = 148
  const RING = 90          // orbit ring radius
  const nodeYs = [44, 148, 252]  // top / mid / bottom node Y positions
  const LX = 28            // left node center X
  const RX = 432           // right node center X
  const NR = 18            // node circle radius

  // Left icons in order: Orchestration, Database, Container
  const leftIcons = [IcoOrchestration, IcoDatabase, IcoContainer]
  // Right icons in order: Database, CDN, AI
  const rightIcons = [IcoDatabase, IcoCDN, IcoAI]

  const leftLabels = [
    { title: 'Container\nOrchestration', sub: 'Container orchestration\nand container-native scale' },
    { title: 'Database\nServices',       sub: 'Container orchestration\nand namespaces' },
    { title: 'Container\nOrchestration', sub: 'Container orchestration\nand namespaces' },
  ]
  const rightLabels = [
    { title: 'Database\nServices',    sub: 'Relational, NoSQL and\ndatabase mesh services' },
    { title: 'CDN & Edge\nComputing', sub: 'Content delivery, edge\ncaching and acceleration' },
    { title: 'AI/ML\nAcceleration',   sub: 'AI/ML workload acceleration\nand model serving' },
  ]

  return (
    <svg
      viewBox="0 0 460 300"
      className="w-full"
      style={{ overflow: 'visible', display: 'block' }}
    >
      <defs>
        {/* Ambient glow gradient */}
        <radialGradient id="ag" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a4aaa" stopOpacity="0.22"/>
          <stop offset="100%" stopColor="#1a4aaa" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* ── Ambient center glow ── */}
      <ellipse cx={CX} cy={CY} rx="140" ry="120" fill="url(#ag)" className="about-amb-breath"/>

      {/* ── Orbit ring ── */}
      <circle cx={CX} cy={CY} r={RING}
        fill="none" stroke="rgba(77,166,255,0.20)" strokeWidth="1" strokeDasharray="5 5"
        className="about-orbit-ring"/>

      {/* ── 6 accent dots on orbit ring (spin with ring) ── */}
      <g className="about-orbit-dots">
      {[0,60,120,180,240,300].map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        return (
          <circle key={i}
            cx={CX + RING * Math.cos(rad)} cy={CY + RING * Math.sin(rad)}
            r="3.2" fill="#4da6ff" opacity="0.9"
            style={{ filter: 'drop-shadow(0 0 5px #4da6ff)', animationDelay: `${i * 0.4}s` }}
            className="about-dot-pulse"/>
        )
      })}
      </g>

      {/* ── Dashed lines: left nodes → center (animated flow) ── */}
      {nodeYs.map((y, i) => {
        const mx = (LX + NR + CX - RING) / 2
        const my = (y + CY) / 2
        return (
          <g key={`ll${i}`}>
            <line x1={LX + NR} y1={y} x2={CX - RING} y2={CY}
              stroke="rgba(77,166,255,0.22)" strokeWidth="0.9" strokeDasharray="9 9"
              className="about-dash-flow"
              style={{ animationDelay: `${i * 0.3}s` }}/>
            <circle cx={mx} cy={my} r="2.8" fill="#4da6ff" opacity="0.85"
              className="about-dot-pulse"
              style={{ filter: 'drop-shadow(0 0 5px #4da6ff)', animationDelay: `${i * 0.5}s` }}/>
          </g>
        )
      })}

      {/* ── Dashed lines: center → right nodes (animated flow) ── */}
      {nodeYs.map((y, i) => {
        const mx = (CX + RING + RX - NR) / 2
        const my = (CY + y) / 2
        return (
          <g key={`rl${i}`}>
            <line x1={CX + RING} y1={CY} x2={RX - NR} y2={y}
              stroke="rgba(77,166,255,0.22)" strokeWidth="0.9" strokeDasharray="9 9"
              className="about-dash-flow"
              style={{ animationDelay: `${i * 0.3 + 0.15}s` }}/>
            <circle cx={mx} cy={my} r="2.8" fill="#4da6ff" opacity="0.85"
              className="about-dot-pulse"
              style={{ filter: 'drop-shadow(0 0 5px #4da6ff)', animationDelay: `${i * 0.5 + 0.25}s` }}/>
          </g>
        )
      })}

      {/* ── Soft glow behind logo ── */}
      <circle cx={CX} cy={CY - 8} r="52"
        fill="rgba(77,166,255,0.08)"
        style={{ filter: 'blur(18px)' }}/>

      {/* ── Logo (pulsing glow) ── */}
      <foreignObject
        x={CX - 40} y={CY - 52}
        width="80" height="80">
        <img
          src={cloudaxisLogo}
          alt="Cloud Axis"
          className="about-logo-pulse"
          style={{
            width: '100%', height: '100%', objectFit: 'contain',
          }}
        />
      </foreignObject>

      {/* ── "CLOUD AXIS" text ── */}
      <text x={CX} y={CY + 38}
        textAnchor="middle" fill="rgba(255,255,255,0.88)"
        fontSize="8" fontWeight="800" letterSpacing="2.8"
        fontFamily="Inter,system-ui,sans-serif">
        CLOUD AXIS
      </text>

      {/* ── Tagline ── */}
      <text x={CX} y={CY + 72}
        textAnchor="middle" fill="rgba(255,255,255,0.28)"
        fontSize="6.5" fontWeight="500" letterSpacing="2.2"
        fontFamily="Inter,system-ui,sans-serif">
        NEXT-GEN INFRASTRUCTURE
      </text>

      {/* ── Left node circles + icons (staggered pulse) ── */}
      {nodeYs.map((y, i) => {
        const Icon = leftIcons[i]
        return (
          <g key={`ln${i}`}>
            <circle cx={LX} cy={y} r={NR + 6}
              fill="rgba(77,166,255,0.08)"
              style={{ filter: 'blur(6px)' }}/>
            <circle cx={LX} cy={y} r={NR}
              fill="rgba(77,166,255,0.10)"
              stroke="rgba(77,166,255,0.32)" strokeWidth="1"
              className="about-dot-pulse"
              style={{ filter: 'drop-shadow(0 0 8px rgba(77,166,255,0.3))', animationDelay: `${i * 0.4}s` }}/>
            <foreignObject x={LX - 8} y={y - 8} width="16" height="16">
              <div style={{ display:'flex', alignItems:'center', justifyContent:'center', width:'100%', height:'100%' }}>
                <Icon />
              </div>
            </foreignObject>
          </g>
        )
      })}

      {/* ── Right node circles + icons (staggered pulse) ── */}
      {nodeYs.map((y, i) => {
        const Icon = rightIcons[i]
        return (
          <g key={`rn${i}`}>
            <circle cx={RX} cy={y} r={NR + 6}
              fill="rgba(77,166,255,0.08)"
              style={{ filter: 'blur(6px)' }}/>
            <circle cx={RX} cy={y} r={NR}
              fill="rgba(77,166,255,0.10)"
              stroke="rgba(77,166,255,0.32)" strokeWidth="1"
              className="about-dot-pulse"
              style={{ filter: 'drop-shadow(0 0 8px rgba(77,166,255,0.3))', animationDelay: `${i * 0.4 + 0.2}s` }}/>
            <foreignObject x={RX - 8} y={y - 8} width="16" height="16">
              <div style={{ display:'flex', alignItems:'center', justifyContent:'center', width:'100%', height:'100%' }}>
                <Icon />
              </div>
            </foreignObject>
          </g>
        )
      })}

      {/* ── Left labels (right-aligned, to the right of left nodes) ── */}
      {nodeYs.map((y, i) => {
        const lines = leftLabels[i].title.split('\n')
        const sub   = leftLabels[i].sub.split('\n')
        const lx = LX + NR + 8
        return (
          <g key={`ltx${i}`}>
            {lines.map((l, li) => (
              <text key={li} x={lx} y={y - 6 + li * 12}
                textAnchor="start" fill="white"
                fontSize="9" fontWeight="700"
                fontFamily="Inter,system-ui,sans-serif">{l}</text>
            ))}
            {sub.map((l, li) => (
              <text key={li} x={lx} y={y + 16 + li * 9}
                textAnchor="start" fill="rgba(255,255,255,0.35)"
                fontSize="7" fontFamily="Inter,system-ui,sans-serif">{l}</text>
            ))}
          </g>
        )
      })}

      {/* ── Right labels (left-aligned, to the left of right nodes) ── */}
      {nodeYs.map((y, i) => {
        const lines = rightLabels[i].title.split('\n')
        const sub   = rightLabels[i].sub.split('\n')
        const rx = RX - NR - 8
        return (
          <g key={`rtx${i}`}>
            {lines.map((l, li) => (
              <text key={li} x={rx} y={y - 6 + li * 12}
                textAnchor="end" fill="white"
                fontSize="9" fontWeight="700"
                fontFamily="Inter,system-ui,sans-serif">{l}</text>
            ))}
            {sub.map((l, li) => (
              <text key={li} x={rx} y={y + 16 + li * 9}
                textAnchor="end" fill="rgba(255,255,255,0.35)"
                fontSize="7" fontFamily="Inter,system-ui,sans-serif">{l}</text>
            ))}
          </g>
        )
      })}
    </svg>
  )
}

// ── About ──────────────────────────────────────────────────────────────────
export default function About() {
  const leftRef   = useReveal()
  const centerRef = useReveal()

  return (
    <section
      id="about"
      className="relative overflow-hidden py-16 md:py-24 px-4 sm:px-8 md:px-12"
      style={{ backgroundColor: '#0a0e1a' }}
      aria-labelledby="about-heading"
    >
      {/* Dot grid */}
      <div className="absolute inset-0 dot-pattern pointer-events-none" aria-hidden="true"/>
      {/* Top ambient glow */}
      <div className="absolute pointer-events-none" aria-hidden="true"
        style={{
          top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 800, height: 400,
          background: 'radial-gradient(ellipse, rgba(20,60,160,0.16) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}/>

      <div className="relative mx-auto max-w-7xl">

        {/* ── Header ── */}
        <div className="text-center mb-10">
          <h2 id="about-heading"
            className="text-[2rem] sm:text-[2.4rem] lg:text-[2.75rem] font-bold tracking-tight leading-[1.12]">
            <span className="text-white">Hosting: </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4da6ff] to-[#6ec1ff]">Built by Developers</span>
            <br/>
            <span className="text-white">for Developers</span>
          </h2>
          <p className="mt-3 text-[0.9rem] text-white/40 max-w-[400px] mx-auto leading-relaxed">
            We set out to build the platform we always wished existed — fast, reliable,
            and built for the teams who ship.
          </p>
        </div>

        {/* ── 2-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">

          {/* LEFT */}
          <div ref={leftRef as React.RefObject<HTMLDivElement>} className="reveal-left">
            <div className="h-full rounded-2xl border border-white/[0.08] bg-[#0d1221] p-6 flex flex-col about-card-glow"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>

              <p className="text-[9px] font-bold tracking-[0.3em] text-white/35 uppercase mb-4">
                The Cloud Axis Mission
              </p>

              <p className="text-[0.8rem] text-white/60 leading-[1.85]">
                Cloud Axis was founded by cloud engineers frustrated with slow, inflexible
                infrastructure — and set out to build the fastest, most reliable platform
                for modern teams.
              </p>
              <p className="mt-3 text-[0.8rem] text-white/42 leading-[1.85]">
                Our platform is engineered from the ground up by certified cloud experts
                with years of hands-on experience running intricate production workloads at
                massive scale. We provide instant infrastructure provisioning in seconds,
                enterprise-grade security with SOC 2 Type II compliance, and global
                multi-region deployments to three continents, complete with DDoS protection
                and real-time monitoring.
              </p>

              <div className="mt-auto pt-5 grid grid-cols-2 gap-3">
                {[
                  { val: '99.99%', lbl: 'Uptime SLA',           cls: 'about-stat about-stat-d1' },
                  { val: '<5m',    lbl: 'Avg. deployment time',  cls: 'about-stat about-stat-d2' },
                ].map(s => (
                  <div key={s.lbl}
                    className={`rounded-xl border border-white/[0.07] px-3 py-4 text-center ${s.cls}`}
                    style={{ background: 'rgba(255,255,255,0.025)' }}>
                    <div className="text-[1.5rem] font-bold text-white leading-none stat-value">{s.val}</div>
                    <div className="mt-1.5 text-[10px] text-white/30 leading-tight">{s.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER */}
          <div ref={centerRef as React.RefObject<HTMLDivElement>} className="reveal-scale">
            <div className="h-full rounded-2xl border border-white/[0.08] bg-[#0d1221] px-4 py-5 flex flex-col about-card-glow"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.4)' }}>
              <p className="text-[9px] font-bold tracking-[0.3em] text-white/35 uppercase text-center mb-3">
                The Platform
              </p>
              <div className="flex-1 flex items-center justify-center">
                <PlatformDiagram />
              </div>
            </div>
          </div>



        </div>
      </div>
    </section>
  )
}
