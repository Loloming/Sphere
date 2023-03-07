/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        'thirty-percent': '#220F3A',
        'sixty-percent': '#101010',
        'sixty-percent-variant': '#212121',
        'sixty-percent-banner': '#171717',
        'sixty-percent-description': '#191919',
        'sixty-percent-home': '#121212',
        'ten-percent': '#8B30FF'
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        'posts': '1fr 5fr 1fr',
      }
    },
  },
  plugins: [],
}

