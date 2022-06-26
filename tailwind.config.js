// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/views/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["SF Pro Display", "Inter", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        h1: "32px",
        h2: "24px",
        h3: "20px",
        bodyXl: "20px",
        bodyL: "16px",
        bodyM: "14px",
        bodyS: "12px",
        bodyXS: "10px",
      },
      colors: {
        grayscale: {
          50: "#FBFBFB",
          100: "#F3F5F7",
          200: "#E8EBEE",
          300: "#BAC3CE",
          400: "#959DA9",
          500: "#626B78",
          600: "#414B59",
          700: "#2B3440",
          800: "#13171D",
          900: "#03050A",
        },
        primary: {
          50: "#FAD4D4",
          100: "#F7B7B7",
          200: "#F49393",
          300: "#F06E6F",
          400: "#EC4A4B",
          500: "#E82627",
          600: "#E82627",
          700: "#C12021",
          800: "#9B191A",
          900: "#741314",
        },
        yellow: "#FDB92C",
        green: "#3EE224",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
