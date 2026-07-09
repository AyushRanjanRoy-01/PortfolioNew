/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FBFBF9",       // warm paper
        surface: "#FFFFFF",
        line: "#E7E6E0",     // hairline
        ink: "#1B1B18",      // near-black text
        muted: "#5C5B54",    // secondary
        dim: "#93928A",      // labels / tertiary
        accent: "#4F46E5",   // quiet indigo — links only
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      maxWidth: {
        content: "960px",
        readable: "660px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease both",
      },
    },
  },
  plugins: [],
};
