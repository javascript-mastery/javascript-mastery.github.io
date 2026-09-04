const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
    container: false,
  },
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{jsx,tsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', ...fontFamily.sans],
        jakarta: ['"Plus Jakarta Sans"', ...fontFamily.sans],
        mono: ['"Fira Code"', ...fontFamily.mono],
      },
      borderRadius: {
        sm: "4px",
      },
      screens: {
        sm: "0px",
        lg: "997px",
      },
      colors: {
        brand: {
          50: '#fefce8',
          100: '#fef9c3',
          500: '#eab308',
          600: '#ca8a04',
          900: '#713f12',
        },
      },
    },
  },
  plugins: [],
};