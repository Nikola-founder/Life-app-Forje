/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#EDE3D3",
        parchmentDark: "#E0D2BE",
        surface: "#FBF6ED",
        ink: "#3A2A1E",
        inkSoft: "#6B5A4C",
        leather: "#7B4B32",
        leatherDark: "#5B3623",
        brass: "#B8875A",
        brassLight: "#D8B98C",
        olive: "#5F7355",
        brick: "#8B3A3A",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 2px 10px rgba(58, 42, 30, 0.08), 0 1px 2px rgba(58, 42, 30, 0.06)",
        lift: "0 8px 24px rgba(58, 42, 30, 0.12)",
      },
      borderRadius: {
        card: "14px",
      },
    },
  },
  plugins: [],
};
