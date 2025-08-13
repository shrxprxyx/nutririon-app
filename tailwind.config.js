/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#D9641E",
        secondary: "#ED7D27",
        lightText: "#ECE2D2",
        lightBg: "#F7F7F7",
        darkBg: "#41423A",
        darkerBg: "#141414",
      },
    },
  },
  plugins: [],
}