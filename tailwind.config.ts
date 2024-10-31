import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "100px",
      md: "750px",
      lg: "1200px",
    },
    colors: {
      text: "#f5ece1",
      background: "#080808",
      backgroundprimary: "#3f2f1f",
      primary: "#e0b986",
      secondary: "#87591d",
      accent: "#dc973d",
    },

    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      dropShadow: {
        glow: ["0 0px 20px rgba(255,200, 100, 0.35)"],
      },
    },
  },
  plugins: [],
};
export default config;
