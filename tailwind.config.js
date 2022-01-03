const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    colors: {
      ...colors,
      primary: colors.blue["500"],
      secondary: colors.coolGray["500"],
    },
    extend: {},
  },
  plugins: [],
};
