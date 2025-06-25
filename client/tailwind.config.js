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
        
        // פלטת הזהב המדויקת שלך
        'gold-base': '#D4A574',       // זהב בסיס
        'gold-shadow': '#B8860B',    // זהב עמוק לצללים
        'gold-highlight': '#E6C88A', // זהב בהיר להדגשות
        'gold-dark-details': '#A0522D', // לפרטים כהים
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}