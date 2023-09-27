import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      ...colors,
      primary: colors.blue["500"],
      secondary: colors.gray["500"],
    },
    extend: {},
  },
  plugins: [],
};
