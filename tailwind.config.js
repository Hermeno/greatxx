/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#13a4ec",
        success: "#10b981",
        "background-light": "#f6f7f8",
        "background-dark": "#101c22",
        "text-light": "#1f2937",
        "text-dark": "#e5e7eb",
        "subtle-light": "#e5e7eb",
        "subtle-dark": "#374151",
      },
    },
  },
  plugins: [],
};
