/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grWhite: {
          light: "#8A99AF",
          base: "#FFFFFF",
        },
        grBlue: {
          light: "#41B2E9",
          base: "#41B2E9",
        },
        grText: {
          gray: "#64748B",
          dark: "#212B36",
        },
        chatBlue: "#41B2E9",
        chatGray: "#EFF4FB",
        buttonBlack: "#1C2434",
      },
    },
  },
  plugins: [],
};
