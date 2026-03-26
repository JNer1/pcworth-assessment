/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["DM Sans", "sans-serif"],
      },
      colors: {
        forest: {
          50: "#f0faf4",
          100: "#dcf4e6",
          500: "#2d8653",
          700: "#16523a",
          900: "#0c3224",
        },
        amber: {
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
        },
        cream: {
          50: "#fafaf7",
          100: "#f4f4ef",
          200: "#e8e8e0",
        },
      },
    },
  },
  plugins: [],
};
