import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap' // 1. ייבוא התוסף

export default defineConfig({
  plugins: [
    react(),
    // 2. הפעלת התוסף עם הגדרת כתובת האתר הראשית
    sitemap({ hostname: 'https://vip-israel-events.vercel.app' }) 
  ],
})