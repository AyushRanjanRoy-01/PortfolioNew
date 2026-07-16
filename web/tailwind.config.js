/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./lib/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0c10",
          soft: "#10141c",
          card: "#141920",
          wash: "#0e1218",
          line: "rgba(240, 234, 224, 0.08)",
        },
        stone: {
          DEFAULT: "#f0eae0",
          muted: "#a39e94",
          dim: "#6f6a62",
        },
        accent: {
          DEFAULT: "#c9a66b",
          soft: "rgba(201, 166, 107, 0.12)",
          bright: "#dfc08a",
        },
        signal: {
          DEFAULT: "#5eb89e",
          soft: "rgba(94, 184, 158, 0.12)",
        },
        blush: {
          DEFAULT: "#c48b7a",
          soft: "rgba(196, 139, 122, 0.1)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-2xl": ["clamp(2.75rem, 5.5vw, 4.25rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-xl": ["clamp(2.25rem, 4vw, 3.35rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(1.85rem, 3vw, 2.55rem)", { lineHeight: "1.15", letterSpacing: "-0.018em" }],
        "display-md": ["clamp(1.35rem, 2vw, 1.65rem)", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
      },
      maxWidth: {
        measure: "38rem",
        content: "70rem",
      },
      letterSpacing: {
        label: "0.14em",
        wide: "0.08em",
      },
      boxShadow: {
        lift: "0 24px 60px -20px rgba(0,0,0,0.55)",
        glow: "0 0 0 1px rgba(201,166,107,0.15), 0 20px 50px rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [],
};
