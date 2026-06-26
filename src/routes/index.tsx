import { lazy, Suspense } from 'react'
import { createFileRoute } from '@tanstack/react-router'

const Hero = lazy(() => import('../components/Hero'))

export const Route = createFileRoute("/")({
  component: () => (
    <Suspense fallback={<div className="min-h-screen bg-[#020b1c]" />}>
      <Hero />
    </Suspense>
  ),
})
