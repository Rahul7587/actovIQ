import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#17212b',
        surface: '#f6f5f2',
        coral: '#e86f51',
        teal: '#287c76',
        gold: '#d8a441',
      },
      boxShadow: {
        soft: '0 18px 55px rgba(23, 33, 43, 0.12)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
