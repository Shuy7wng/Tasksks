/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        mainColor: "rgb(0, 111, 180)", 
        blackColor: "#161d3a",
        whiteColor: "rgba(243, 243, 243, 0.66)",
      },
    },
  },
  plugins: [],
};

