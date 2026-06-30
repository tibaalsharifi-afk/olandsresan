import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Projektsajt på GitHub Pages serveras under /olandsresan/
  base: '/olandsresan/',
  plugins: [react()],
})
