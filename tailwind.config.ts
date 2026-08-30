import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#faf8f5',
          100: '#f3efe9',
          200: '#e5e0da',
          300: '#d0c8c0',
          400: '#b8ada2',
          500: '#8c7b6c',
          600: '#6e6053',
          700: '#53483e',
          800: '#3a322b',
          900: '#201c18',
        },
        gold: {
          50: '#fcf8f0',
          100: '#f7edd8',
          200: '#efdab3',
          300: '#e4c288',
          400: '#d4a559',
          500: '#b38b4d',
          600: '#9b743e',
          700: '#7c5a31',
          800: '#64482a',
          900: '#533c24',
        },
        terracotta: {
          50: '#fdf5f2',
          100: '#fbe7e1',
          200: '#f8d2c6',
          300: '#f2b3a0',
          400: '#e9886d',
          500: '#c25e38',
          600: '#ad4924',
          700: '#8f3c1e',
          800: '#76331c',
          900: '#632d1c',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
