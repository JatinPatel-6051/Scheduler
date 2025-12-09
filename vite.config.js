import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          ui: ['@hello-pangea/dnd', 'lucide-react', '@tanstack/react-query'],
          utils: ['date-fns', 'xlsx']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    port: 3000,
    host: true,
    cors: true
  },
  preview: {
    port: 4173,
    host: true
  },
  define: {
    // Replace env variables for production build
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
    __VERSION__: JSON.stringify(process.env.npm_package_version)
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'firebase/app',
      'firebase/auth', 
      'firebase/firestore',
      '@tanstack/react-query',
      '@hello-pangea/dnd',
      'date-fns',
      'xlsx'
    ]
  }
})
