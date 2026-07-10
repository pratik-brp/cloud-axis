import { lazy, Suspense } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import About from '../components/About'
import Services from '../components/Services'
import Stats from '../components/Stats'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const Hero = lazy(() => import('../components/Hero'))

export const Route = createFileRoute("/")({
  component: () => (
    <Suspense fallback={<div className="min-h-screen bg-[#020b1c]" />}>
      <Hero />
      <About />
      <Services />
      <Stats />
      <Contact />
      <Footer />
    </Suspense>
  ),
})

