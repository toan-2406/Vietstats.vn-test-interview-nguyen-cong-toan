import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#DFA128", // Sửa 2 dấu # thành 1 dấu #
        secondary: "#4CAF50",
        accent: "#2196F3",
        neutral: "#E0E0E0",
        "text-primary": "#212121",
        "text-secondary": "#757575",
      },
      fontFamily: {
        sans: ["var(--font-lexend)"],
      },
      fontSize: {
        "heading-lg": "24px",
        "heading-md": "20px",
        body: "14px",
      },
      boxShadow: {
        card: "0 2px 4px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        card: "8px",
        button: "4px",
      },
    },
  },
  plugins: [],
};

export default config;