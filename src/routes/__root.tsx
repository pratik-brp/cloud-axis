import { useState, useEffect } from 'react'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import ErrorBoundary from '../components/ErrorBoundary'
import SkipToContent from '../components/SkipToContent'

export const Route = createRootRoute({
  component: () => {
    const [ready, setReady] = useState(false)

    useEffect(() => {
      const timer = setTimeout(() => {
        const loader = document.getElementById('app-loader')
        if (loader) loader.style.opacity = '0'
        setReady(true)
        setTimeout(() => document.getElementById('app-loader')?.remove(), 600)
      }, 3000)
      return () => clearTimeout(timer)
    }, [])

    return (
      <ErrorBoundary>
        <SkipToContent />
        {ready && <Outlet />}
      </ErrorBoundary>
    )
  },
})
