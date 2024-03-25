/** @type {import('tailwindcss').Config} */
import formPlugin from "@tailwindcss/forms";
import animationPlugin from "tailwindcss-animate";

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
          dark: "#987D22",
          bright: "#F9C107",
        },
        grRed: {
          base: "#DC3545",
        },
        grOrange: {
          base: "#F97B07",
        },
        chatBlue: "#41B2E9",
        chatGray: "#EFF4FB",
        buttonBlack: "#1C2434",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [formPlugin, animationPlugin],
};
