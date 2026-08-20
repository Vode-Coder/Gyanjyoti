/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        indigo: {
          950: '#1E1B4B',
          900: '#27216B',
          800: '#312A87',
          700: '#3730A2',
          600: '#453FC2',
          500: '#544DE0',
        },
        violet: {
          600: '#7C3AED',
          500: '#8B5CF6',
        },
        ember: {
          500: '#FB7A3C',
          600: '#EA5F1F',
        },
        gold: {
          400: '#FBBF24',
          500: '#F59E0B',
        },
        leaf: {
          500: '#16A34A',
          600: '#15803D',
        },
        canvas: '#F5F6FB',
        surface: '#FFFFFF',
        ink: '#181A2A',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(24,26,42,0.04), 0 8px 24px -8px rgba(24,26,42,0.08)',
        pop: '0 12px 32px -12px rgba(55,48,163,0.35)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        confetti: {
          '0%': { transform: 'translateY(-10px) rotate(0deg)', opacity: 1 },
          '100%': { transform: 'translateY(220px) rotate(360deg)', opacity: 0 },
        },
        popIn: {
          '0%': { transform: 'scale(0.8)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: 0.6 },
          '100%': { transform: 'scale(1.6)', opacity: 0 },
        },
      },
      animation: {
        confetti: 'confetti 1.4s ease-in forwards',
        popIn: 'popIn 0.35s cubic-bezier(.34,1.56,.64,1) forwards',
        pulseRing: 'pulseRing 1.8s ease-out infinite',
      },
    },
  },
  plugins: [],
}
