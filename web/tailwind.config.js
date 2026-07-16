/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f7f7f5",
          100: "#efeee9",
          200: "#e2e0d8",
          300: "#c9c6ba",
          400: "#9e9a8c",
          500: "#6f6b5e",
          600: "#4a473e",
          700: "#2f2d28",
          800: "#1c1b18",
          900: "#121110",
        },
        accent: {
          DEFAULT: "#0f6e56",
          soft: "#e6f4ef",
          muted: "#3d9b7a",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        measure: "40rem",
        content: "68rem",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
};
