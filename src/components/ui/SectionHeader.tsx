import type { ReactNode } from 'react'

interface SectionHeaderProps {
  badge: string
  title: ReactNode
  subtitle?: string
  badgeClass?: string
  titleClass?: string
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  badgeClass = '',
  titleClass = '',
}: SectionHeaderProps) {
  return (
    <header className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
      <span
        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-400/5 border border-cyan-400/15 text-cyan-300/85 text-[0.65rem] font-semibold tracking-[0.25em] uppercase ${badgeClass}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
        {badge}
      </span>
      <h2
        className={`mt-5 text-2xl sm:text-3xl md:text-4xl lg:text-[2.85rem] font-extrabold text-white leading-[1.15] tracking-tighter ${titleClass}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-sm sm:text-[0.95rem] text-white/40 leading-relaxed max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </header>
  )
}
