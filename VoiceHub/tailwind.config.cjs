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
        'sixty-percent-home': '#121212',
        'ten-percent': '#8B30FF'
      },
      animation: {
        like: 'like 0.5s ease-out',
        expand: 'expand 0.5s ease'
      },
      keyframes: {
        like: {
          '0%, 100%': { transform: 'scale(1)'},
          '50%': { transform: 'scale(1.5)'}
        },
        expand: {
          '0%': { width: '0'},
          '100%': { width: '83.33%'}
        }
      },
    },
  },
  plugins: [],
}

