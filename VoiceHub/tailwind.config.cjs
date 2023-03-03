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
        'ten-percent': '#8B30FF'
      }
    },
  },
  plugins: [],
}

