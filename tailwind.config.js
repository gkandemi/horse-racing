/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,vue}",
  ],
  theme: {
    extend: {
      keyframes: {
        move: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(var(--target-width))' },
        },
      },
      animation: {
        move: 'move var(--duration, 3s) linear',
      },
    },
  },
  plugins: [],
}
