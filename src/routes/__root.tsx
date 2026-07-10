import { createRootRoute, Outlet } from '@tanstack/react-router'
import ErrorBoundary from '../components/ErrorBoundary'
import SkipToContent from '../components/SkipToContent'

export const Route = createRootRoute({
  component: () => (
    <ErrorBoundary>
      <SkipToContent />
      <Outlet />
    </ErrorBoundary>
  ),
})
