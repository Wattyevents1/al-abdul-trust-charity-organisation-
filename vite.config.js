import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    sourcemap: false,
    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 4173
  }
})
