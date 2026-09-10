import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7C5CFC",
        secondary: "#FF6B5E",
        accent: "#FFD166",
        cream: "#FFF9F2",
        purple: "#7C5CFC",
        coral: "#FF6B5E",
        yellow: "#FFD166",
        sage: "#A7C557",
        dark: "#1F1B24",
        brand: {
          primary: "#7C5CFC",
          secondary: "#FF6B5E",
          accent: "#FFD166",
          cream: "#FFF9F2",
          purple: "#7C5CFC",
          coral: "#FF6B5E",
          yellow: "#FFD166",
          sage: "#A7C557",
          dark: "#1F1B24",
        },
      },
    },
  },
  plugins: [],
};

export default config;
