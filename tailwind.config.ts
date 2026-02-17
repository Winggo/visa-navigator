import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: {
          primary:   "var(--bg-primary)",
          secondary: "var(--bg-secondary)",
          tertiary:  "var(--bg-tertiary)",
          input:     "var(--bg-input)",
          disabled:  "var(--bg-disabled)",
        },
        content: {
          primary:   "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted:     "var(--text-muted)",
        },
        border: {
          primary:   "var(--border-primary)",
          secondary: "var(--border-secondary)",
        },
        badge: {
          "green-bg":   "var(--badge-green-bg)",
          "green-text": "var(--badge-green-text)",
          "blue-bg":    "var(--badge-blue-bg)",
          "blue-text":  "var(--badge-blue-text)",
          "gray-bg":    "var(--badge-gray-bg)",
          "gray-text":  "var(--badge-gray-text)",
        },
        notice: {
          bg:      "var(--notice-bg)",
          border:  "var(--notice-border)",
          text:    "var(--notice-text)",
          heading: "var(--notice-heading)",
        },
        success: {
          bg:      "var(--success-bg)",
          border:  "var(--success-border)",
          text:    "var(--success-text)",
          heading: "var(--success-heading)",
        },
        progress: {
          track: "var(--progress-track)",
        },
        chat: {
          "bot-bg": "var(--chat-bot-bg)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
