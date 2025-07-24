import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand palette
        primary: "#14B8A6", // Teal
        accent: "#A855F7", // Purple
        dark: "#0F172A", // Midnight/dark bg

        // Flattened Signmons colors
        "signmons-dark-bg": "#0d0d1a",
        "signmons-purple-light": "#9f7aea",
        "signmons-blue-light": "#00bcd4",
        "signmons-green-cta": "#00e676",
        "signmons-purple-dark": "#6b46c1",
        "signmons-blue-dark": "#00796b",
        "signmons-accent-orange": "#ff7043",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
