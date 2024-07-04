/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { 
        "home-gold": "var(--homegold)", 
        "home-black": "var(--homeblack)", 
      },
    },
  },
  plugins: [],
}

