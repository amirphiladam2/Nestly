/** @type {import('tailwindcss').Config} */
const pixelMap=Object.fromEntries(
  Array.from({length: 1000}).map((_,i)=>[ i,`${i}px`])
)
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary:"#161029",
        secondary: "#d203fc",
        background:"#FFF9FD",
        green: "#158a03ff",
        red: "#fc032dff",
        borderColor:"#E9D8FB",
        orange: "#ee8020ff",
        brown: "#42240aff",
        burntorange: "#ee4e14ff",

        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0A0A0A',
        },
      },
    },
  },
  plugins: [],
}

