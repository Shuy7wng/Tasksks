/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // molto importante
  theme: {
    extend: {},
    extend: {
      colors: {
        mainColor: "rgb(0, 111, 180)", 
        blackBack: "rgba(22, 29, 58, 0.8)",
        whiteColor: "rgba(243, 243, 243, 0.66)",
      },
    },
  },
  plugins: [],
};

