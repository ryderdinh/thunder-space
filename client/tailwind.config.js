const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'className',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      ...colors,
      deepdark: 'rgb(24, 24, 24)',
      gray: {
        50: '#eeeeee',
        100: '#e0e0e0',
        200: '#bbbbbb',
        300: '',
        400: '#464646',
        500: '#313131',
        600: '#2a2a2a',
        700: '#262626',
        800: '#1f1f1f',
        900: '#121212'
      }
    },
    fontFamily: {
      primary: ['"Space Grotesk"', 'sans-serif'],
      bevn: ['"Be Vietnam Pro"', 'sans-serif']
    },
    extend: {
      screens: {
        xs: '320px'
      },
      borderRadius: {
        5: '5px'
      },
      fontSize: {
        '2xs': ['0.75rem', '1.25rem']
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
