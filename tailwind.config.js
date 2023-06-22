/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'train-background': "url('/src/assets/images/bg-r2.jpg')",
      }
    },
  },
  plugins: [],
}

