const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      ...colors,
      deepdark: 'rgb(24, 24, 24)'
    },
    fontFamily: {
      primary: ['Kanit', 'sans-serif']
    },
    extend: {}
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
