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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
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
    glowColor: 'rgba(34,211,238,0.2)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
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
    glowColor: 'rgba(96,165,250,0.2)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
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
    glowColor: 'rgba(52,211,153,0.2)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
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
    glowColor: 'rgba(167,139,250,0.2)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
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
    glowColor: 'rgba(244,63,94,0.2)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
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
    glowColor: 'rgba(251,191,36,0.2)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
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
    glowColor: 'rgba(34,211,238,0.2)',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
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
    glowColor: 'rgba(74,222,128,0.2)',
  },
]

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="srv-card-wrapper"
      style={{
        animation: `fadeInUp 0.6s cubic-bezier(0.16,1,0.3,1) both`,
        animationDelay: `${index * 80}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`srv-card ${isHovered ? 'srv-hovered' : ''}`}
        style={{
          '--accent-color': service.accentColor,
          '--glow-color': service.glowColor,
          '--grad-from': service.gradientFrom,
          '--grad-to': service.gradientTo,
        } as React.CSSProperties}
      >
        {/* Top colorful gradient highlight bar */}
        <div className="srv-card-top-glow" />

        {/* Ambient glow behind card */}
        <div className="srv-card-bg-glow" />

        {/* Card Header area */}
        <div className="srv-card-header">
          <div className="srv-icon-box">
            {service.icon}
          </div>
          <h3 className="srv-card-title">{service.title}</h3>
        </div>

        {/* Pain Point Section */}
        <div className="srv-pain-box">
          <div className="srv-pain-label">Pain Point</div>
          <p className="srv-pain-text">&ldquo;{service.problem}&rdquo;</p>
        </div>

        {/* Solution Body */}
        <p className="srv-solution-text">{service.solution}</p>

        {/* Action Link Footer */}
        <div className="srv-card-footer">
          <span className="srv-learn-more">
            Learn more
            <svg
              width="14"
              height="14"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="srv-arrow-icon"
            >
              <path d="M2 6h8M7 3l3 3-3 3" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  const headerRef = useReveal()
  const gridRef = useReveal(0.05)

  return (
    <section id="services" className="srv-section" aria-labelledby="services-heading">
      {/* Decorative Grid Patterns & Ambient Light */}
      <div className="srv-dot-pattern" aria-hidden="true" />
      <div className="srv-glow-top-right" aria-hidden="true" />
      <div className="srv-glow-bottom-left" aria-hidden="true" />
      
      {/* Animated Flowing Line */}
      <div className="srv-divider-line" aria-hidden="true" />

      <div className="srv-container">
        <header ref={headerRef as React.RefObject<HTMLDivElement>} className="srv-header reveal">
          <span className="srv-badge">
            <span className="srv-badge-dot" aria-hidden="true" />
            Our Services
          </span>
          
          <h2 id="services-heading" className="srv-title">
            Comprehensive cloud services{' '}
            <span className="srv-title-gradient">
              built for scale
            </span>
          </h2>
          
          <p className="srv-subtitle">
            From migration to managed infrastructure, security to cost optimization — we deliver enterprise-grade cloud solutions that align technology with business outcomes.
          </p>
        </header>

        <div ref={gridRef as React.RefObject<HTMLDivElement>} className="srv-grid-wrapper reveal">
          <div className="srv-grid">
            {services.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
