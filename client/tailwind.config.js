/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FFFFFF',             // רקע ראשי -> לבן
        'secondary': '#4A5568',           // טקסט משני -> אפור כהה
        'lightest-slate': '#091c3b',      // טקסט בהיר -> הכחול מהלוגו
        'card-bg': 'rgba(249, 250, 251, 0.5)', // רקע כרטיס -> אפרפר שקוף
        
        'gold-base': '#b79145',
        'gold-shadow': '#b79145',
        'gold-highlight': '#b79145',
        'gold-dark-details': '#b79145',
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