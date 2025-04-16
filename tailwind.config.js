/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '240px',
      // sm: "576px",
      sm: '640px',
      // => @media (min-width: 576px) { ... }

      // md: "960px",
      md: '768px',
      // => @media (min-width: 960px) { ... }

      lg: '1024px',
      // => @media (min-width: 1440px) { ... }
      xl: '1280px',
    },

    extend: {
      fontFamily: {
        alexandria: ['Alexandria', 'sans'],
      },
      colors: {
        primary_bright: '#0B317C',
        light_gray: {
          DEFAULT: '#E7E7E7',
          100: '#6D6D6D',
          200: '#454545',
          300: '#262626',
        },
      },
      margin: {
        start: 'margin-inline-start',
        end: 'margin-inline-end',
      },
      padding: {
        start: 'padding-inline-start',
        end: 'padding-inline-end',
      },
    },
  },
  variants: {
    extend: {
      padding: ['responsive'],
    },
  },
  plugins: [],
};
