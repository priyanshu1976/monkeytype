/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brown: {
          primary: "#3B3030",
          secondary: "#664343",
          tertiary: "#795757",
          light: "#FFF0D1",
        },
      },
    },
  },
  plugins: [],
};
