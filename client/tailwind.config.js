module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          to: {
            opacity: 1,
          },
          from: {
            opacity: 0,
          },
        },
        fadeOut: {
          to: {
            opacity: 0,
          },
          from: {
            opacity: 1,
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 1s linear",
        fadeOut: "fadeOut 1s linear",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
