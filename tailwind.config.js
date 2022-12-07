/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: true,
  theme: {
    colors:{
      darktext: '#05192d',
      brand: '#65ff8f',
      brandbg: '#04111F',
      secondarybg: '#131E2B',
      secondarybrand: '#65FF8F'
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins','sans-serif']
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}
