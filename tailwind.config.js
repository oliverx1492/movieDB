/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "primary": "#0d253f",
      "secondary": "#01b4e4",
      "tertiary": "#90cea1"
    },
    extend: {
      fontFamily: {
        sans: ["Raleway"]
      }
    },
  },
  plugins: [],
}

