import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#202321',
        paper: '#f5f4f0',
        bronze: '#a47e5b',
      },
    },
  },
  plugins: [],
} satisfies Config
