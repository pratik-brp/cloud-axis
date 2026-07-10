import { useState, useEffect } from 'react'
import heroImage from '../assets/cloud-axis-hero-3d.png'
import heroBackground from '../assets/Hero Section.jpg'
import heroBgWebp from '../assets/hero-bg.webp'
import Navbar from './Navbar'

const platforms = [
  {
    name: 'AWS',
    color: '#FF9900',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.76 10.45c0 .28.03.5.08.67.06.17.14.35.25.55.04.07.06.14.06.2 0 .09-.05.18-.16.27l-.54.36c-.08.05-.15.08-.22.08-.09 0-.17-.04-.26-.13a2.7 2.7 0 01-.31-.4 6.6 6.6 0 01-.27-.51c-.68.8-1.53 1.2-2.56 1.2-.73 0-1.31-.21-1.74-.63-.43-.42-.64-.98-.64-1.68 0-.74.26-1.34.79-1.79.53-.45 1.23-.67 2.12-.67.29 0 .6.03.92.08.32.05.65.13.99.22v-.63c0-.66-.14-1.12-.41-1.39-.28-.27-.75-.4-1.42-.4-.31 0-.62.04-.94.11-.32.08-.63.18-.93.31-.14.06-.24.1-.3.11-.06.02-.1.03-.14.03-.12 0-.18-.09-.18-.27v-.43c0-.14.02-.24.06-.31.04-.07.12-.14.24-.21.31-.16.68-.29 1.11-.4A5.4 5.4 0 015.3 6c1.01 0 1.75.23 2.22.69.47.46.7 1.15.7 2.09v2.75l-.46-.08zm-3.54.66c.28 0 .57-.05.88-.16.31-.11.58-.3.81-.57.14-.16.24-.34.29-.54.05-.2.08-.44.08-.72v-.35a7.3 7.3 0 00-.8-.15 6.5 6.5 0 00-.82-.05c-.58 0-1.01.11-1.29.34-.28.23-.42.55-.42.97 0 .4.1.69.31.89.2.2.49.3.86.3l.1.04zm6.93.93c-.16 0-.26-.03-.33-.09-.07-.05-.13-.17-.19-.33L7.8 6.28c-.06-.17-.09-.28-.09-.34 0-.13.07-.2.2-.2h.82c.16 0 .27.03.33.09.07.05.12.17.18.33l1.3 5.12 1.2-5.12c.05-.17.1-.28.17-.33.07-.05.19-.09.34-.09h.67c.16 0 .27.03.34.09.07.05.13.17.17.33l1.22 5.18 1.34-5.18c.06-.17.12-.28.18-.33.07-.05.17-.09.33-.09h.78c.13 0 .2.06.2.2 0 .04-.01.08-.02.13-.01.05-.03.12-.07.22l-1.87 5.34c-.06.17-.12.28-.19.33-.07.05-.18.09-.33.09h-.72c-.16 0-.27-.03-.34-.09-.07-.06-.13-.17-.17-.34l-1.2-4.98-1.19 4.97c-.05.17-.1.28-.17.34-.07.06-.19.09-.34.09h-.72zm9.97.2c-.44 0-.88-.05-1.3-.16-.43-.1-.76-.22-.99-.35-.14-.08-.23-.16-.26-.24a.6.6 0 01-.05-.23v-.45c0-.18.07-.27.2-.27.05 0 .1.01.15.03.05.02.13.06.21.1.29.13.6.23.94.3.34.07.67.1 1.01.1.54 0 .95-.09 1.24-.28.29-.19.44-.46.44-.81 0-.24-.08-.44-.23-.6-.15-.16-.44-.31-.86-.45l-1.24-.38c-.62-.2-1.08-.48-1.37-.86-.29-.37-.43-.79-.43-1.24 0-.36.08-.67.23-.94.16-.27.37-.51.63-.7.27-.19.57-.33.92-.43.35-.1.72-.14 1.11-.14.2 0 .4.01.6.04.2.03.39.07.57.11.18.05.35.1.51.16.16.06.28.12.37.18.12.08.21.16.26.24.05.08.08.18.08.31v.42c0 .18-.07.27-.2.27-.07 0-.18-.04-.33-.11a3.97 3.97 0 00-1.67-.34c-.48 0-.86.08-1.12.24-.26.16-.4.41-.4.75 0 .24.09.44.26.61.17.17.49.34.94.48l1.21.38c.62.2 1.06.47 1.33.82.27.35.4.75.4 1.19 0 .37-.07.7-.22.99-.15.29-.36.54-.63.75-.27.21-.59.37-.97.48-.39.12-.81.17-1.26.17z" fill="#FF9900"/>
        <path d="M20.16 17.46c-2.42 1.79-5.94 2.74-8.97 2.74-4.24 0-8.07-1.57-10.96-4.18-.23-.2-.02-.48.25-.32 3.12 1.81 6.97 2.9 10.96 2.9 2.69 0 5.64-.56 8.36-1.71.41-.18.75.27.36.57z" fill="#FF9900"/>
        <path d="M21.13 16.35c-.31-.4-2.06-.19-2.84-.09-.24.03-.27-.18-.06-.33 1.39-.98 3.68-.7 3.94-.37.27.34-.07 2.64-1.38 3.74-.2.17-.39.08-.3-.14.3-.73.96-2.41.64-2.81z" fill="#FF9900"/>
      </svg>
    ),
  },
  {
    name: 'Azure',
    color: '#0078D4',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.05 4.24L6.56 19.7H2l6.09-10.56-3.1-4.9h8.06zm.87 1.27l4.03 13.22H24L15.4 5.51h-1.48z" fill="#0078D4"/>
      </svg>
    ),
  },
  {
    name: 'Google Cloud',
    color: '#4285F4',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.19 10.55V13h3.93a3.35 3.35 0 01-1.44 2.19l2.33 1.81c1.36-1.25 2.14-3.1 2.14-5.29 0-.51-.05-1-.13-1.47l-6.83.31z" fill="#4285F4"/>
        <path d="M6.22 14.29a5.5 5.5 0 010-4.58L3.85 7.88A8.97 8.97 0 003 12c0 1.45.34 2.82.85 4.07l2.37-1.78z" fill="#34A853"/>
        <path d="M12 6.5c1.24 0 2.36.43 3.24 1.27l2.43-2.43A8.97 8.97 0 0012 3a9 9 0 00-8.15 4.88l2.37 1.83A5.5 5.5 0 0112 6.5z" fill="#EA4335"/>
        <path d="M6.22 14.29L3.85 16.12A9 9 0 0012 21a8.97 8.97 0 006.01-2.3l-2.33-1.81A5.5 5.5 0 016.22 14.29z" fill="#FBBC05"/>
      </svg>
    ),
  },
  {
    name: 'Cloudflare',
    color: '#F48120',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.5 15.75c.13-.45.08-.86-.14-1.16-.2-.28-.52-.44-.9-.46l-8.97-.12c-.06 0-.1-.03-.13-.07-.03-.04-.03-.09-.01-.14l.19-.52c.13-.45.08-.86-.14-1.16-.2-.28-.52-.44-.9-.46l-1.1-.01c-.06 0-.1-.03-.13-.07-.03-.04-.03-.09-.01-.14l.19-.52c.13-.45.08-.86-.14-1.16-.2-.28-.52-.44-.9-.46L2 9.9v4.35h14.5v1.5z" fill="#F48120"/>
        <path d="M16.5 15.75H2v1.5h15.5l-1-1.5zM19.5 10.5c-.1-3.59-3.04-6.5-6.65-6.5-2.52 0-4.72 1.4-5.88 3.47-.38-.17-.8-.27-1.24-.27-1.73 0-3.13 1.4-3.13 3.13 0 .17.01.34.04.5H2v.07h17.5c0-.13.01-.27.01-.4z" fill="#FBAD41"/>
      </svg>
    ),
  },
  {
    name: 'DigitalOcean',
    color: '#0080FF',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 17.5v-3.25c2.35 0 4.25-1.9 4.25-4.25S14.35 7.75 12 7.75 7.75 9.65 7.75 12H4.5C4.5 7.31 8.31 3.5 13 3.5S21.5 7.31 21.5 12 17.69 20.5 13 20.5H12v-.5-.5zm-3.25-3.25H6.5v-2.25h2.25v2.25zm-2.25 2.25H4.25V16.5H6.5v2.25-.25z" fill="#0080FF"/>
      </svg>
    ),
  },
  {
    name: 'Vercel',
    color: '#ffffff',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 19.5h20L12 2z" fill="#ffffff"/>
      </svg>
    ),
  },
  {
    name: 'Kubernetes',
    color: '#326CE5',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.98 2a.93.93 0 00-.36.08L5.1 5.02a.93.93 0 00-.52.64L3.02 12.3a.93.93 0 00.18.77l4.38 5.57a.93.93 0 00.73.36h7.38a.93.93 0 00.73-.36l4.38-5.57a.93.93 0 00.18-.77l-1.56-6.64a.93.93 0 00-.52-.64L12.38 2.08A.93.93 0 0011.98 2zm.02 2.08l5.5 2.6 1.4 5.96-3.93 5H9.03L5.1 12.64l1.4-5.96 5.5-2.6zm-.01 2.5a.5.5 0 00-.49.5v2.5l-2.17 1.25a.5.5 0 00-.18.68l.5.87a.5.5 0 00.68.18L12 11.3l1.67.96a.5.5 0 00.68-.18l.5-.87a.5.5 0 00-.18-.68L12.5 9.08V6.58a.5.5 0 00-.51-.5z" fill="#326CE5"/>
      </svg>
    ),
  },
  {
    name: 'Docker',
    color: '#2496ED',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5 9h2v2h-2V9zm-2.5 0h2v2h-2V9zm-2.5 0h2v2H8.5V9zm-2.5 0h2v2H6V9zm2.5-2.5h2v2H8.5V6.5zm2.5 0h2v2h-2V6.5zm2.5 0h2v2h-2V6.5zm2.5 2.5h2v2h-2V9zm3.5 2.5c-.28 0-.55.03-.81.08-.17-1.3-1.28-2.08-2.44-2.08-.34 0-.67.07-.97.2V9h-2v.7c-.3-.13-.63-.2-.97-.2-1.16 0-2.27.78-2.44 2.08A3.5 3.5 0 002 15c0 1.93 1.57 3.5 3.5 3.5h12c1.93 0 3.5-1.57 3.5-3.5 0-1.93-1.57-3.5-3.5-3.5z" fill="#2496ED"/>
      </svg>
    ),
  },
]

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
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = heroBgWebp
    link.fetchPriority = 'high'
    document.head.appendChild(link)
    return () => { if (link.parentNode) document.head.removeChild(link) }
  }, [])

  return (
    <div
      id="hero"
      className="relative min-h-screen overflow-hidden text-white"
      style={{ backgroundColor: '#0d1b2a' }}
    >
      {/* Hero background image — eager loaded, highest priority */}
      <picture>
        <source srcSet={heroBgWebp} type="image/webp" />
        <img
          src={heroBackground}
          alt=""
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          style={{ objectPosition: 'center' }}
        />
      </picture>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020b1c]/40 via-transparent to-[#020b1c]/60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_40%,rgba(125,211,232,0.12),transparent_45%)] pointer-events-none" />

      <Navbar />

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
                  Start your 14-day trial. No credit card required.
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

            <div className="relative flex items-center justify-center animate-fade-in-scale animate-delay-100">
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

      {/* ── PLATFORM SIGNALS ── */}
      <section className="relative z-20 px-6 md:px-12 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[500px] h-[180px] bg-cyan-400/8 blur-3xl pointer-events-none rounded-full" />
            <div className="flex flex-col gap-2 px-6 py-5 md:flex-row md:items-center md:justify-between border-b border-white/8">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.32em] text-cyan-300/70 font-medium">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                    Platform signals
                </span>
                <h3 className="mt-1 text-base md:text-lg font-semibold text-white/90 tracking-tight">Ecosystem we power</h3>
              </div>
              <p className="max-w-xs text-xs text-white/40 leading-5">
                 Deeply integrated with the tools your team already runs on.
              </p>
            </div>
            <div className="marquee py-2">
              <div className="marquee-track">
                {[...platforms, ...platforms].map((platform, index) => (
                  <div key={`${platform.name}-${index}`} className="platform-pill" style={{ borderColor: platform.color + '40' }}>
                    <span className="shrink-0">{platform.icon}</span>
                    <span>{platform.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}