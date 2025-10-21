import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  server: {
    port: 3000,
    open: true
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // 确保构建时包含所有必要资源
    rollupOptions: {
      output: {
        manualChunks: {
          'xlsx': ['xlsx']
        }
      }
    }
  }
})
