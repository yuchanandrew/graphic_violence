/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 60s linear infinite',
      },
      fontFamily: {
        custom: ["CustomFont", "sans-serif"],
      }
    },
  },
  plugins: [],
}