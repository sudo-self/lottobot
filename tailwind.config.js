const colors = require('tailwindcss/colors');

module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        slate: {
          900: '#333333', // Charcoal color
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

