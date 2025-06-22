/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      serif: ['Instrument Serif', 'serif'],
    },
      colors: {
      'primary': '#0D2A4C',      // Deep Navy Blue
      'secondary': '#4A5568',    // Slate Gray
      'accent': '#BFA06A',        // Muted Gold
      'background': '#F7FAFC',   // Light Grayish Blue
      'text-main': '#2D3748',    // Charcoal
    }
  },
},
  plugins: [],
}


