/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0b1220",
          soft: "#111827",
          card: "#151d2e",
        },
        stone: {
          DEFAULT: "#e2e8f0",
          muted: "#94a3b8",
          dim: "#64748b",
        },
        accent: {
          DEFAULT: "#5eead4",
          soft: "rgba(94, 234, 212, 0.1)",
          dim: "#2dd4bf",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        content: "72rem",
        measure: "40rem",
      },
      letterSpacing: {
        label: "0.1em",
      },
    },
  },
  plugins: [],
};
