const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    colors: {
      ...colors,
      primary: "#3b82f6",
      secondary: "#64748b",
    },
    extend: {},
  },
  plugins: [],
};
