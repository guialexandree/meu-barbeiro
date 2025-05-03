import { defineConfig } from 'vite'
import EnvironmentPlugin from 'vite-plugin-environment'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  optimizeDeps: {
    include: ['zod'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  define: {
    'process.env': process.env,
  },
  plugins: [
    react(),
    EnvironmentPlugin(['API_URL', 'NODE_ENV', 'CLARITY_KEY']),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Gestão Barbearia',
        short_name: 'SUSUZEIRA',
        description: 'Aplicativo de gestão para barbearias',
        start_url: '/',
        display: 'standalone',
        background_color: '#1e1e1e',
        theme_color: '#2c82d8',
        icons: [
          {
            src: 'img/favicon.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'img/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'img/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})
