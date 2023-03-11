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
      primary: ['"Space Grotesk"', 'sans-serif'],
      bevn: ['"Be Vietnam Pro"', 'sans-serif']
    },
    extend: {
      screens: {
        xs: '320px'
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
