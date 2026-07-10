import { lazy, Suspense } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import About from '../components/About'
import Services from '../components/Services'
import Stats from '../components/Stats'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import HeroSkeleton from '../components/HeroSkeleton'

const Hero = lazy(() => import('../components/Hero'))

export const Route = createFileRoute("/")({
  component: () => (
    <Suspense fallback={<HeroSkeleton />}>
      <Hero />
      <About />
      <Services />
      <Stats />
      <Contact />
      <Footer />
    </Suspense>
  ),
})
