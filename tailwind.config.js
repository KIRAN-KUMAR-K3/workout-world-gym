/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#080808',
          soft: '#141414',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          2: 'rgb(var(--accent-2) / <alpha-value>)',
        },
        ink: {
          DEFAULT: '#FFFFFF',
          muted: '#A1A1A1',
        },
        line: '#292929',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        // Two families only: Bebas Neue for display, Inter for everything else.
        heading: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      maxWidth: {
        container: '1280px',
      },
      boxShadow: {
        accent: '0 0 40px -8px rgb(var(--accent) / 0.4)',
        glow: '0 0 80px -10px rgb(var(--accent) / 0.45)',
        card: '0 20px 50px -20px rgba(0, 0, 0, 0.8)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { opacity: '0' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease forwards',
        'pulse-ring': 'pulse-ring 2.2s cubic-bezier(0.2,0.6,0.3,1) infinite',
        shimmer: 'shimmer 1.6s infinite',
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
        'spin-slow': 'spin 24s linear infinite',
      },
    },
  },
  plugins: [],
};
