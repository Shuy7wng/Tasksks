/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        mainColor: "#2c67f2", 
        blackColor: "#161d3a",
        blue: "bg-[#0e1324]",
        whiteColor: "rgba(243, 243, 243, 0.66)",
        bog: "{` `}",
        gradiant: "bg-gradient-to-tr from-[#2c67f2] to-[#62cff4]"
      },
    },
  },
  plugins: [],
};

