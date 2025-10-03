/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",   // this makes Tailwind work inside your React/Vite files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
