import flowbiteReact from "flowbite-react/plugin/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    ".flowbite-react/class-list.json"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        special: ['"Special Gothic Expanded One"', 'sans-serif'],
      },
      colors: {
        limey: '#F3FF8C',
        deepPurple: '#5D00B5', 
      },
    },
  },
  plugins: [flowbiteReact],
}