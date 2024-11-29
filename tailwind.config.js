/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#001011",
        "text-color": "#222222",
        gray: "#A7A7A7",
        divider: "#1F2D2E",
        divider_light: "#E0E0E0",
        divider_lighter: "#E6E6E6",
        "light-gray": "#d9d9d980",
        "gray-60": "#666666",
        milk: "#f9f9f9",
        "black-30": "#646464",
        serviceHr: "#1F2D2E",
        description: "#CCCFCF",
        "white-24": "rgba(255, 255, 255, 0.24)",
        "pale-gray": "#9AA1A1",
        orange: "#FF6E06",
        "primary-24": "rgba(0, 16, 17, 0.24)",
        gray_light: "#E6E6E6",
        error: "#FF3B30",
        gray_dark: "#3F4B4C",
      },
      fontFamily: {
        helvetica_black: ['"HelveticaNeue Black"', "sans-serif"],
        helvetica_bold: ['"HelveticaNeue Bold"', "sans-serif"],
        helvetica_bold_italic: ['"HelveticaNeue BoldItalic"', "sans-serif"],
        helvetica_condensed_black: [
          '"HelveticaNeue CondensedBlack"',
          "sans-serif",
        ],
        helvetica_condensed_bold: [
          '"HelveticaNeue CondensedBold"',
          "sans-serif",
        ],
        helvetica_condensed_light: [
          '"HelveticaNeue CondensedLight"',
          "sans-serif",
        ],
        helvetica_condensed_medium: [
          '"HelveticaNeue CondensedMedium""',
          "sans-serif",
        ],
        helvetica_condensed_regular: [
          '"HelveticaNeue CondensedRegular"',
          "sans-serif",
        ],
        helvetica_condensed_thin: [
          '"HelveticaNeue CondensedThin"',
          "sans-serif",
        ],

        helvetica_italic: ['"HelveticaNeue Italic"', "sans-serif"],
        helvetica_light: ['"HelveticaNeue Light"', "sans-serif"],
        helvetica_light_italic: ['"HelveticaNeue LightItalic"', "sans-serif"],
        helvetica_medium: ['"HelveticaNeue Medium"', "sans-serif"],
        helvetica_regular: ['"HelveticaNeue Regular"', "sans-serif"],
        helvetica_thin: ['"HelveticaNeue Thin"', "sans-serif"],
        helvetica_thin_italic: ['"HelveticaNeue ThinItalic"', "sans-serif"],
        helvetica_ultralight: ['"HelveticaNeue UltraLight"', "sans-serif"],
        helvetica_ultralight_italic: [
          '"HelveticaNeue UltraLightItalic"',
          "sans-serif",
        ],
      },
      transitionTimingFunction: {
        custom: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        300: "300ms",
      },
    },
  },
  plugins: [],
};
