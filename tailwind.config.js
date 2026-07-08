/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#050505',
        gold: {
          DEFAULT: '#ffde59',
          dim: '#c9a93c',
        },
        paper: '#f5f1e8',
      },
      fontFamily: {
        display: ['Assistant', 'Heebo', 'sans-serif'],
        body: ['Assistant', 'Heebo', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
