/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        'powlen': 'wiggle 1s ease',
      },
      keyframes: {
        wiggle: {
         from: {opacity: '0'},
          to: {opacity: '1'}
        }
      }
    },
  },
  plugins: [
    require('autoprefixer'),
  ],
}
