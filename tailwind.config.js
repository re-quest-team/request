const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'dodger-blue': {
          DEFAULT: '#4B73FF',
          50: '#FFFFFF',
          100: '#EEF2FF',
          200: '#C5D2FF',
          300: '#9DB2FF',
          400: '#7493FF',
          500: '#4B73FF',
          600: '#1347FF',
          700: '#0030DA',
          800: '#0024A2',
          900: '#00176A',
        },
        flamingo: {
          DEFAULT: '#EB5C37',
          50: '#FCE4DE',
          100: '#FAD5CB',
          200: '#F6B7A6',
          300: '#F29881',
          400: '#EF7A5C',
          500: '#EB5C37',
          600: '#D53D15',
          700: '#A22E10',
          800: '#6F200B',
          900: '#3C1106',
        },
        buttermilk: {
          DEFAULT: '#FFF4B8',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#FFFAE1',
          500: '#FFF4B8',
          600: '#FFEB80',
          700: '#FFE348',
          800: '#FFDA10',
          900: '#D7B500',
        },
      },
    },
  },
}
