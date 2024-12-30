/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "poppins": ['Poppins', 'sans-serif']
    },
    screens: {
      'xxsm': '370px',
      'xsm': '550px',
    },
    },
  },
  plugins: [],
}

