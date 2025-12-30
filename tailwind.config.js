/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        brand: {
          primary: "#0E64BC",
          "primary-hover": "#0A4D94",
          "primary-light": "#0E64BC1A", // 10% opacity
        },

        // Neutral / Backgrounds
        neutral: {
          background: "#F6F7F8",
          surface: "#FFFFFF",
          "surface-hover": "#F8FAFC",
          subtle: "#F1F5F9",
          border: "#E2E8F0",
          "border-strong": "#CBD5E1",
        },

        // Text Colors
        text: {
          high: "#0F172A",
          medium: "#334155",
          low: "#64748B",
          muted: "#94A3B8",
        },

        // Status Colors
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

      // Sharpe Border Radius
      borderRadius: {
        lg: "6px",
        md: "4px",
        DEFAULT: "2px",
        sm: "1px",
      },

      // Font Family
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
      },

      // Text Styles - Exact from design system
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
          { lineHeight: "14px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em" },
        ],
        button: ["14px", { lineHeight: "20px", fontWeight: "700" }],
        "button-small": ["12px", { lineHeight: "16px", fontWeight: "600" }],
      },

      // Effect Styles (Shadows) - Refined for corporate feel (crisper, subtle)
      boxShadow: {
        small: "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
        medium: "0px 2px 4px -1px rgba(0, 0, 0, 0.06), 0px 4px 6px -1px rgba(0, 0, 0, 0.04)", // Tighter, less spread
        large: "0px 10px 15px -3px rgba(0, 0, 0, 0.04), 0px 4px 6px -2px rgba(0, 0, 0, 0.02)", // Very subtle large shadow
        primary: "0px 4px 14px 0px rgba(14, 100, 188, 0.15)", // Reduced opacity
        inner: "inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
