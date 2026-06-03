import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Tailwind is loaded via PostCSS and CSS imports; no Vite plugin required here

export default defineConfig({
  plugins: [react()],
})
