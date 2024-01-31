/** @type {import('tailwindcss').Config} */
import plugin from "@tailwindcss/forms";

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
          dark: "#3C50E0",
          base: "#41B2E9",
        },
        grText: {
          gray: "#64748B",
          dark: "#212B36",
        },
        grGreen: {
          base: "#13C296",
        },
        grGray: {
          base: "#EFF4FB",
          dark: "#E2E8F0",
          light: "#637381",
        },
        grYellow: {
          base: "#FFEFBC",
        },
        chatBlue: "#41B2E9",
        chatGray: "#EFF4FB",
        buttonBlack: "#1C2434",
      },
    },
  },
  plugins: [plugin],
};
