import { useEffect, useRef, useState } from 'react'

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

interface Service {
  icon: React.ReactNode
  title: string
  problem: string
  solution: string
  gradientFrom: string
  gradientTo: string
  accentColor: string
  glowColor: string
}

const services: Service[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 16v-8" />
        <path d="M9 11l3-3 3 3" />
        <path d="M22 12h-5l-2 3H9l-2-3H2" />
        <path d="M5.5 8.5A5 5 0 0 1 15 8" />
        <path d="M15 8a5 5 0 0 1 3.5 4.5" />
      </svg>
    ),
    title: 'Cloud Deployment',
    problem: 'Build new cloud environments correctly from day one.',
    solution: 'Launch production-grade infrastructure in minutes with automated provisioning, immutable deployments, and built-in best practices that eliminate configuration drift.',
    gradientFrom: '#22d3ee',
    gradientTo: '#3b82f6',
    accentColor: '#22d3ee',
    glowColor: 'rgba(34,211,238,0.18)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M5 5h4l4 4" />
        <path d="M19 5h-4l-4 4" />
        <path d="M5 19h4l4-4" />
        <path d="M19 19h-4l-4-4" />
        <path d="M9 5v14" />
        <path d="M15 5v14" />
      </svg>
    ),
    title: 'Cloud Migration',
    problem: 'Migrate existing systems to the cloud with minimal downtime.',
    solution: 'Execute lift-and-shift or re-architecture migrations with automated discovery, phased cutover planning, and real-time replication that keeps your business running.',
    gradientFrom: '#3b82f6',
    gradientTo: '#818cf8',
    accentColor: '#60a5fa',
    glowColor: 'rgba(96,165,250,0.18)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="3" width="20" height="8" rx="2" />
        <rect x="2" y="13" width="20" height="8" rx="2" />
        <path d="M6 7h.01" />
        <path d="M6 17h.01" />
      </svg>
    ),
    title: 'Infrastructure Setup & Management',
    problem: 'Manage scalable and reliable infrastructure professionally.',
    solution: 'We design, deploy, and manage cloud environments with auto-scaling, load balancing, and self-healing architectures that adapt to your traffic patterns automatically.',
    gradientFrom: '#34d399',
    gradientTo: '#14b8a6',
    accentColor: '#34d399',
    glowColor: 'rgba(52,211,153,0.18)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M21 12a9 9 0 1 1-9-9" />
        <path d="M12 6v6l3 2" />
        <path d="M21 3v6h-6" />
      </svg>
    ),
    title: 'Automation & DevOps',
    problem: 'Accelerate software delivery through automation and DevOps practices.',
    solution: 'Implement CI/CD pipelines, infrastructure-as-code, and automated testing frameworks that reduce deployment cycles from weeks to minutes with zero manual errors.',
    gradientFrom: '#8b5cf6',
    gradientTo: '#ec4899',
    accentColor: '#a78bfa',
    glowColor: 'rgba(167,139,250,0.18)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M22 12h-4l-3 4-4-8-3 4H2" />
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v4" />
        <path d="M12 18v4" />
      </svg>
    ),
    title: 'Cloud Monitoring & Reporting',
    problem: 'Detect and resolve issues before customers are impacted.',
    solution: 'Real-time observability across your entire stack with intelligent alerting, distributed tracing, and custom dashboards that surface anomalies before they become incidents.',
    gradientFrom: '#f43f5e',
    gradientTo: '#f97316',
    accentColor: '#f43f5e',
    glowColor: 'rgba(244,63,94,0.18)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2v20" />
        <path d="M17 6H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        <path d="M6 17h2" />
      </svg>
    ),
    title: 'Cloud Cost Optimization',
    problem: 'Reduce unnecessary cloud spending and improve efficiency.',
    solution: 'Continuous cost analysis with automated rightsizing, reserved instance optimization, and granular resource tagging that identifies savings opportunities across your entire cloud footprint.',
    gradientFrom: '#f59e0b',
    gradientTo: '#eab308',
    accentColor: '#fbbf24',
    glowColor: 'rgba(251,191,36,0.18)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2l7 3v5c0 4-3 7-7 8-4-1-7-4-7-8V5l7-3z" />
        <path d="M9 12l2 2 4-4" />
        <path d="M6 17l-2 3" />
        <path d="M18 17l2 3" />
      </svg>
    ),
    title: 'Backup & Disaster Recovery',
    problem: 'Protect critical business data and ensure business continuity.',
    solution: 'Automated, encrypted backups with point-in-time recovery, cross-region replication, and tested DR runbooks that guarantee RPO and RTO compliance for any scenario.',
    gradientFrom: '#14b8a6',
    gradientTo: '#22d3ee',
    accentColor: '#22d3ee',
    glowColor: 'rgba(34,211,238,0.18)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1" />
      </svg>
    ),
    title: 'Cloud Security & Compliance',
    problem: 'Maintain strong security posture and compliance readiness.',
    solution: 'Zero-trust architecture with continuous compliance monitoring, automated threat detection, and policy-as-code enforcement that meets SOC 2, HIPAA, and GDPR standards.',
    gradientFrom: '#22c55e',
    gradientTo: '#06b6d4',
    accentColor: '#4ade80',
    glowColor: 'rgba(74,222,128,0.18)',
  },
]

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  const baseShadow = '0 8px 32px -8px rgba(0,0,0,0.4)'
  const hoverShadow = `0 40px 80px -16px rgba(0,0,0,0.6), 0 0 0 1px ${service.accentColor}12, 0 0 80px ${service.glowColor}`

  return (
    <div
      className="group"
      style={{ animation: `fadeInUp 0.6s cubic-bezier(0.16,1,0.3,1) both`, animationDelay: `${index * 80}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative h-full rounded-2xl overflow-hidden cursor-default transition-all duration-200 ease-out"
        style={{
          background: `linear-gradient(160deg, rgba(255,255,255,${isHovered ? '0.04' : '0.025'}) 0%, rgba(255,255,255,${isHovered ? '0.01' : '0.005'}) 100%)`,
          border: `1px solid ${isHovered ? `${service.accentColor}35` : 'rgba(255,255,255,0.06)'}`,
          boxShadow: isHovered ? hoverShadow : baseShadow,
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[3px] transition-all duration-200"
          style={{
            background: `linear-gradient(90deg, ${service.gradientFrom}, ${service.gradientTo})`,
            opacity: isHovered ? 1 : 0.5,
            boxShadow: isHovered ? `0 0 24px ${service.glowColor}` : 'none',
          }}
        />

        <div
          className="absolute -top-24 -right-24 w-64 h-64 transition-all duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${service.glowColor}, transparent 70%)`,
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'scale(1.2)' : 'scale(0.8)',
          }}
        />

        <div className="relative z-10 p-7 md:p-8 flex flex-col h-full">
          <div className="flex items-start gap-4 mb-5">
            <div
              className="relative flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200"
              style={{
                background: `linear-gradient(135deg, ${service.gradientFrom}20, ${service.gradientTo}12)`,
                border: `1px solid ${isHovered ? `${service.accentColor}35` : `${service.accentColor}18`}`,
                color: isHovered ? service.accentColor : 'rgba(255,255,255,0.65)',
                transform: isHovered ? 'scale(1.06) rotate(-2deg)' : 'scale(1) rotate(0deg)',
                boxShadow: isHovered ? `0 0 28px ${service.glowColor}` : 'none',
              }}
            >
              {service.icon}
            </div>

            <h3
              className="text-lg font-bold leading-tight pt-1 transition-colors duration-150"
              style={{ color: isHovered ? 'white' : 'rgba(255,255,255,0.9)' }}
            >
              {service.title}
            </h3>
          </div>

          <div
            className="relative pl-4 mb-5 py-2 rounded-r-lg transition-all duration-200"
            style={{
              background: isHovered ? `${service.accentColor}08` : 'rgba(255,255,255,0.02)',
              borderLeft: `2px solid ${isHovered ? service.accentColor : 'rgba(255,255,255,0.1)'}`,
            }}
          >
            <span
              className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-1 block transition-colors duration-150"
              style={{ color: isHovered ? `${service.accentColor}99` : 'rgba(255,255,255,0.2)' }}
            >
              Pain point
            </span>
            <p
              className="text-sm italic leading-relaxed transition-colors duration-150"
              style={{ color: isHovered ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.45)' }}
            >
              &ldquo;{service.problem}&rdquo;
            </p>
          </div>

          <p
            className="text-sm leading-relaxed mb-auto transition-colors duration-150"
            style={{ color: isHovered ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.4)' }}
          >
            {service.solution}
          </p>

          <div
            className="mt-6 pt-4 transition-all duration-200"
            style={{
              borderTop: `1px solid ${isHovered ? `${service.accentColor}12` : 'rgba(255,255,255,0.03)'}`,
            }}
          >
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase transition-all duration-200"
              style={{ color: isHovered ? service.accentColor : 'rgba(255,255,255,0.25)' }}
            >
              Learn more
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-200"
                style={{ transform: isHovered ? 'translateX(4px)' : 'translateX(0)' }}
              >
                <path d="M2 6h8M7 3l3 3-3 3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  const headerRef = useReveal()
  const gridRef = useReveal(0.05)

  return (
    <section id="services" className="relative bg-[#030d1e] py-28 md:py-36 px-6 md:px-12 overflow-hidden" aria-labelledby="services-heading">
      <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-[700px] h-[600px] bg-cyan-500/[0.025] blur-[140px] rounded-full pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-blue-600/[0.03] blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none" aria-hidden="true" />
      <div className="absolute top-1/4 left-[8%] w-72 h-72 rounded-full opacity-30 pointer-events-none orb-float" style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)' }} aria-hidden="true" />
      <div className="absolute bottom-1/4 right-[8%] w-56 h-56 rounded-full opacity-20 pointer-events-none orb-float-2" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)' }} aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl">
        <header ref={headerRef as React.RefObject<HTMLDivElement>} className="reveal text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="section-label mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" aria-hidden="true" />
            Our services
          </span>
          <h2 id="services-heading" className="mt-5 text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-white leading-[1.08]">
            Comprehensive cloud services{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300">
              built for scale
            </span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-white/40 leading-relaxed max-w-2xl mx-auto">
            From migration to managed infrastructure, security to cost optimization — we deliver enterprise-grade cloud solutions that align technology with business outcomes.
          </p>
        </header>

        <div ref={gridRef as React.RefObject<HTMLDivElement>} className="reveal" style={{ transitionDelay: '100ms' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
