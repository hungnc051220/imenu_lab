const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  important: true,
  theme: {
    extend: {
      fontSize: {
        heading1: ["28px", { lineHeight: 1.35, fontWeight: 700 }],
        heading2: ["22px", { lineHeight: 1.35, fontWeight: 700 }],
        heading3: ["20px", { lineHeight: 1.35, fontWeight: 700 }],
        heading4: ["18px", { lineHeight: 1.35, fontWeight: 700 }],
        button1: ["16px", { lineHeight: 1.35, fontWeight: 700 }],
        button2: ["15px", { lineHeight: 1.35, fontWeight: 700 }],
        button3: ["14px", { lineHeight: 1.35, fontWeight: 700 }],
        content1: ["16px", { lineHeight: 1.35, fontWeight: 400 }],
        content2: ["15px", { lineHeight: 1.35, fontWeight: 400 }],
        content3: ["14px", { lineHeight: 1.35, fontWeight: 400 }],
        content4: ["13px", { lineHeight: 1.35, fontWeight: 400 }],
        supplement: ["12px", { lineHeight: 1.35, fontWeight: 400 }],
      },
      fontFamily: {
        sans: ["Product Sans", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#252525",
        second: "#C2C2C2",
        "fade-gray": "#DDDDDD",
        "dark-gray": "#646464",
        "dark-orange": "#FF5A36",
      },
    },
  },
  plugins: [require('prettier-plugin-tailwindcss')],
};
