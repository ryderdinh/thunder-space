const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'className',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      ...colors,
      deepdark: 'rgb(24, 24, 24)'
    },
    fontFamily: {
      bevn: ['"Be Vietnam Pro"', 'sans-serif']
    },
    extend: {}
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
