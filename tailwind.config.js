/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        GrWhite: {
          light: "#8A99AF",
          base: "#FFFFFF",
        },
        GrBlue: {
          light: "#9CA3AF",
          base: "#1F2937",
        },
        chatBlue: "#41B2E9",
        chatGray: "#EFF4FB",
      },
    },
  },
  plugins: [],
};
