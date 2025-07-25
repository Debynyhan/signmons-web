import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00bcd4",
        accent: "#6b46c1",
        dark: "#0d0d1a",
        signmons: {
          purple: "#6b46c1",
          blue: "#00bcd4",
          dark: "#0d0d1a",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
