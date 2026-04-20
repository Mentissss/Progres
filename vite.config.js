import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Use './' for portable builds (works on GH Pages, Netlify, Vercel)
  base: './',
});
