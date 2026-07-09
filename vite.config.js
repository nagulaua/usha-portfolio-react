import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: `base` must match your GitHub Pages repo name, e.g. if your repo is
// github.com/nagulaua/usha-portfolio-react, keep base as '/usha-portfolio-react/'.
// If you deploy to a custom domain or a user/organization root site
// (nagulaua.github.io itself), change base to '/'.
export default defineConfig({
  plugins: [react()],
  base: '/usha-portfolio-react/',
})
