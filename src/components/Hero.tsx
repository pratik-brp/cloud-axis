import { useState, useEffect } from 'react'
import heroImage from '../assets/cloud-axis-hero-3d.png'
import heroBackground from '../assets/Hero Section.jpg'
import cloudaxisLogo from '../assets/cloudaxis-logo.png'

function Logo() {
  return (
    <img
      src={cloudaxisLogo}
      alt="Cloud Axis"
      className="h-10 md:h-12 w-auto object-contain"
    />
  )
}

const navLinks = ['Home', 'About us', 'View Product', 'Pricing']

function TypewriterHeading() {
  const text = "The future\nis now"
  const [count, setCount] = useState(0)
  const done = count >= text.length
  const nowStart = 14

  useEffect(() => {
    if (done) return
    const t = setTimeout(() => setCount(c => c + 1), 90)
    return () => clearTimeout(t)
  }, [done, count])

  return (
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.05] tracking-tight text-white animate-fade-in-down animate-delay-200">
      {text.split('').map((char, i) => (
        <span key={i} className={i < count ? "" : "opacity-0"}>
          {char === '\n' ? <br /> : (
            <span className={i >= nowStart && i < nowStart + 3 ? "font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-200" : ""}>
              {char}
            </span>
          )}
        </span>
      ))}
    </h1>
  )
}

export default function Hero() {
  return (
    <div
      className="relative min-h-screen overflow-hidden text-white"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#020b1c]/40 via-transparent to-[#020b1c]/60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_40%,rgba(125,211,232,0.12),transparent_45%)] pointer-events-none" />

      <nav className="relative z-30 px-6 md:px-12 animate-fade-in-down">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3 md:py-4">
          <Logo />

          <ul className="hidden md:flex items-center gap-8 text-sm text-white/70">
            {navLinks.map((item) => (
              <li
                key={item}
                className="hover:text-white transition-colors duration-200 cursor-pointer tracking-wide"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm text-white/80 hover:text-white transition-colors duration-200">
            </button>
            <button className="px-5 py-2 rounded-full text-sm font-semibold text-[#061a3a] bg-white hover:bg-white/90 transition-colors duration-200 shadow-lg shadow-white/10">
              Get Started
            </button>
          </div>

          <button className="md:hidden p-2 text-white/80 hover:text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      <main className="relative z-20 flex items-center min-h-[calc(100vh-80px)] px-6 md:px-12 py-8 md:py-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.07] border border-white/10 text-xs font-medium tracking-wide text-cyan-200 mb-6 animate-fade-in-down animate-delay-100">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Next-Gen Cloud Platform
              </div>

              <TypewriterHeading />

              <p className="mt-6 text-base md:text-lg text-white/65 leading-relaxed max-w-lg animate-fade-in-up animate-delay-300">
                Cloud Axis delivers secure, scalable cloud infrastructure built for modern teams.
                Deploy faster, scale effortlessly, and power your products with reliable compute,
                storage, and networking - all from a single intelligent platform.
              </p>  


              <div className="mt-8 max-w-md animate-fade-in-up animate-delay-400">
                <div className="flex gap-3 p-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-sm">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 min-w-0 px-5 py-3 rounded-full bg-white/[0.04] text-white text-sm placeholder:text-white/35 outline-none focus:bg-white/[0.08] focus:ring-1 focus:ring-cyan-300/30 transition-all duration-200"
                  />
                  <button className="px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-b from-[#5cb8f0] to-[#2b7fc0] hover:from-[#6fc3f7] hover:to-[#3a8fd1] transition-all duration-200 shadow-lg shadow-blue-500/25 whitespace-nowrap">
                    Get Started
                  </button>
                </div>
                <p className="mt-3 text-white/40 text-xs md:text-sm pl-4">
                  Join 10,000+ teams. No credit card required.
                </p>
              </div>

              <div className="mt-10 flex items-center gap-6 md:gap-8 flex-wrap text-white/50 animate-fade-in-up animate-delay-500">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">99.99%</span>
                  <span className="text-xs tracking-wide uppercase">Uptime</span>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">99.99%</span>
                  <span className="text-xs tracking-wide uppercase">SLA Guarantee</span>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">24/7</span>
                  <span className="text-xs tracking-wide uppercase">Support</span>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center order-first lg:order-last animate-fade-in-scale animate-delay-100">
              <div
                className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] lg:w-[500px] lg:h-[500px] rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(200,235,245,0.35) 40%, rgba(20,70,120,0.05) 70%, transparent 80%)',
                }}
              />
              <div
                className="absolute w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[440px] lg:h-[440px] rounded-full pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(127,217,217,0.35) 0%, transparent 70%)',
                  filter: 'blur(60px)',
                }}
              />
              <img
                src={heroImage}
                alt="Cloud Axis 3D cloud infrastructure visualization"
                className="animate-float"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
