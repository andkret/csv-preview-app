import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/csv-preview-app/',
  plugins: [react()],
  root: '.',
  build: {
    outDir: 'dist',
  },
})