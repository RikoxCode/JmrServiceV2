/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts}", // add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
}