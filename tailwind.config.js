/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sin-pink': '#f472b6',
        'cos-blue': '#3b82f6',
        'tan-green': '#22c55e',
      }
    },
  },
  plugins: [],
}
