import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          recharts: ['recharts'],
          jspdf: ['jspdf'],
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
