/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: {
          50: "#eef2f8",
          100: "#d5deeb",
          200: "#a9b8d0",
          300: "#7a8fad",
          400: "#556985",
          500: "#3a4a63",
          600: "#273247",
          700: "#1a2233",
          800: "#0f1522",
          900: "#080b12",
          950: "#05070c",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        measure: "40rem",
      },
      boxShadow: {
        glow: "0 0 40px rgba(94, 234, 212, 0.2)",
      },
    },
  },
  plugins: [],
};
