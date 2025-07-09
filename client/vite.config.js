import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    sitemap({ 
      hostname: 'https://vip-israel-events.vercel.app',
      // ההוראה החדשה: אל תיגע או תיצור קובץ robots.txt
      generateRobotsTxt: false, 
    })
  ],
})