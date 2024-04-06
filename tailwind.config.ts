import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        '300': '300px',
        '456': '456px',
        '576': '576px',
        '27': '27px',

      },
      height: {
        '74': '74px',
        '48': '48px',
        '56': '56px',
        "100": "100px",
        "40": "40rem",
        '36': '36px',
        '27': '27px',
        "614": "614px"

      },
      padding: {
        "176": "176px"
      },
      fontFamily: {
        'inter': ['Inter'],
      },
    },
  },
  plugins: [],
};
export default config;
