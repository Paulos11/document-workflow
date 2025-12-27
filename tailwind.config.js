/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand colors
        brand: {
          primary: "#137FEC",
          "primary-hover": "#1E6FD9",
          "primary-light": "#137FEC1A",
        },
        // Neutral colors
        neutral: {
          background: "#F6F7F8",
          surface: "#FFFFFF",
          "surface-hover": "#F8FAFC",
          subtle: "#F1F5F9",
          border: "#E2E8F0",
          "border-strong": "#CBD5E1",
        },
        // Text colors
        text: {
          high: "#0F172A",
          medium: "#334155",
          low: "#64748B",
          muted: "#94A3B8",
        },
        // Status colors
        status: {
          success: "#22C55E",
          "success-light": "#DCFCE7",
          "success-dark": "#16A34A",
          warning: "#F59E0B",
          "warning-light": "#FEF3C7",
          "warning-dark": "#D97706",
          error: "#EF4444",
          "error-light": "#FEE2E2",
          "error-dark": "#DC2626",
          orange: "#F97316",
          "orange-light": "#FFF7ED",
          "orange-dark": "#EA580C",
          purple: "#8B5CF6",
          "purple-light": "#F3E8FF",
          "purple-dark": "#7C3AED",
        },
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
      },
      fontSize: {
        h1: ["24px", { lineHeight: "32px", fontWeight: "700" }],
        h2: ["18px", { lineHeight: "28px", fontWeight: "700" }],
        h3: ["16px", { lineHeight: "24px", fontWeight: "600" }],
        body: ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "body-small": ["13px", { lineHeight: "18px", fontWeight: "400" }],
        "body-medium": ["14px", { lineHeight: "20px", fontWeight: "500" }],
        caption: ["12px", { lineHeight: "16px", fontWeight: "400" }],
        "caption-caps": [
          "10px",
          { lineHeight: "14px", fontWeight: "700", textTransform: "uppercase" },
        ],
        button: ["14px", { lineHeight: "20px", fontWeight: "700" }],
        "button-small": ["12px", { lineHeight: "16px", fontWeight: "600" }],
      },
      boxShadow: {
        small: "0 1px 2px rgba(0, 0, 0, 0.05)",
        medium: "0 4px 6px rgba(0, 0, 0, 0.1)",
        large: "0 10px 15px rgba(0, 0, 0, 0.1)",
        primary: "0 4px 14px rgba(19, 127, 236, 0.2)",
      },
    },
  },
  plugins: [],
};
