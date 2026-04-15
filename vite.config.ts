import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'lib',
    lib: {
        entry: 'js/index.js',
        formats: ['es', 'cjs'],
    },
    rollupOptions: {
        external: ['react', 'react-dom'],
    }
  },
});