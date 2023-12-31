import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      mobile: { max: "425px" },
      "mobile-sm": { max: "320px" },
      "mobile-lg": { max: "425px", min: "321px" },

      tablet: { min: "426px", max: "950px" },
      "tablet-sm": { min: "426px", max: "687px" },
      "tablet-lg": { min: "687px", max: "950px" },

      moblet: { max: "950px" },

      laptop: { min: "950px", max: "1400px" },
      desktop: { min: "1400px" },
      
      "exept-mobile": { min: "426px" },
    },
    extend: {
      colors: {
        purple: {
          550: "#a91dd0",
        },
      },
      keyframes: {
        intro_key: { from: { opacity: "0" }, to: { opacity: "1" } },
      },
      animation: { intro: "intro_key 1s linear" },
    },
  },
  plugins: [],
};
export default config;
