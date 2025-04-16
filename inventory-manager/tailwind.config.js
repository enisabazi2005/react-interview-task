/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'status-yellow': '#F9D949',
        'status-green': '#82CD47',
        'status-red': '#FF6B6B',
      }
    },
  },
  plugins: [],
} 