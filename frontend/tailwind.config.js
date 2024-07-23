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
        "home-white": "var(--homewhite)",
        "button-red": "var(--buttonred)",
        "text-blue": "var(--textblue)",
      },
    },
  },
  plugins: [],
}

