/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0D1B2A',      
        'secondary': '#8892b0',  
        'lightest-slate': '#ccd6f6',
        'card-bg': 'rgba(255, 255, 255, 0.05)',
        
        'gold-base': '#D4A574',
        'gold-shadow': '#B8860B',
        'gold-highlight': '#E6C88A',
        'gold-dark-details': '#A0522D',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide') 
  ],
}