export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        page: "var(--bg-base)",
        surface: "var(--bg-surface)",
        "surface-alt": "var(--bg-surface-alt)",
        blue: "var(--accent-blue)",
        "blue-dim": "var(--accent-blue-dim)",
        primary: "var(--text-primary)",
        muted: "var(--text-muted)",
        line: "var(--border)",
      },
    },
  },
  plugins: [],
};
