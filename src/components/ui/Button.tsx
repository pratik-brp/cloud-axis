import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'gradient'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
  loading?: boolean
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-gradient-to-b from-[#5cb8f0] to-[#2b7fc0] hover:from-[#6fc3f7] hover:to-[#3a8fd1] text-white shadow-lg shadow-blue-500/25',
  gradient:
    'bg-gradient-to-r from-[#0ea5e9] to-[#2563eb] hover:from-[#38bdf8] hover:to-[#3b82f6] text-white shadow-lg shadow-blue-500/25',
  ghost:
    'bg-white/5 border border-white/12 text-white/80 hover:bg-white/10 hover:border-white/20 hover:text-white',
}

export default function Button({
  variant = 'primary',
  children,
  loading = false,
  disabled,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={[
        'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold',
        'transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      )}
      {children}
    </button>
  )
}
