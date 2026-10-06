import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // If we are on GitHub Actions, use the repo name. Otherwise (Cloud Run/Local), use root.
  base: process.env.GITHUB_ACTIONS ? '/portfolio-site/' : '/',
})