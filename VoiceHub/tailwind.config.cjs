/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        'ultra-violet': '#441c82',
        'background': '#262626'
      }
    },
  },
  plugins: [],
}
