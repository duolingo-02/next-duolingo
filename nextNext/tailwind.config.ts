import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Alata", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
        logo: ["Carter One", "system-ui"],
      },
      colors: {
        duolingoGreen: "#58CC02",
        duolingoGreenLight: "#7FE82B",
        duolingoGreenDark: "#3A9501",
        duolingoBlue: "#1CB0F6",
        duolingoBlueLight: "#51CCFF",
        duolingoBlueDark: "#0A85C4",
        duolingoDark: "#101827",
        duolingoDark2: "#1b242f",
        duolingoDark3: "#2C3B49",
        duolingoLight: "#FFFFFF",
        duolingoLightGray: "#F3F4F6",
        duolingoGray: "#A0A0A0",
        duolingoGrayLight: "#C0C0C0",
        duolingoGrayDark: "#707070",
        duolingoYellow: "#FFD700",
        duolingoYellowLight: "#FFE66D",
        duolingoYellowDark: "#CCAC00",
        duolingoDarkLight: "#3B3B3B",
        duolingoDarkLight2: "#4A4A4A",
      },
    },
  },
  plugins: [],
};

export default config;