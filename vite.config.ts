import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { visualizer } from 'rollup-plugin-visualizer'
import devApiPlugin from './api/dev.js'

export default defineConfig({
  plugins: [
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
