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
        
        'gold-base': '#b79145',            // הזהב החדש מהלוגו
        'gold-shadow': '#9c7a3a',           // גוון מעט כהה יותר לצל
        'gold-highlight': '#d3a951',        // גוון מעט בהיר יותר להרחפה
        'gold-dark-details': '#896831',
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