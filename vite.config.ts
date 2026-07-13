import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { visualizer } from 'rollup-plugin-visualizer'
import devApiPlugin from './api/dev.js'

export default defineConfig({
  plugins: [
    {
      name: 'csp-headers',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/' || req.url === '/index.html') {
            res.setHeader(
              'Content-Security-Policy',
              "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://formsubmit.co https://fonts.googleapis.com https://fonts.gstatic.com; frame-src 'self' https://www.google.com; object-src 'none'; base-uri 'self'; form-action 'self'"
            )
          }
          next()
        })
      },
    },
    TanStackRouterVite(),
    react(),
    tailwindcss(),
    devApiPlugin(),
    ViteImageOptimizer({
      png: { quality: 70 },
      jpg: { quality: 70 },
      webp: { quality: 75 },
      avif: { quality: 60 },
    }),
    visualizer({ open: false, filename: 'dist/stats.html', gzipSize: true, brotliSize: true }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) return 'vendor'
          if (id.includes('node_modules/@tanstack/react-router')) return 'router'
        },
      },
    },
  },
})
