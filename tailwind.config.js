/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#07080B',
        'surface-dark': '#0D1017',
        'surface-card': '#131824',
        'surface-border': '#20293A',
        brand: {
          chocolate: {
            primary: '#E69D45',
            secondary: '#8C532B',
            accent: '#FFBE76',
            glow: 'rgba(230, 157, 69, 0.25)',
            deep: '#23140C'
          },
          peanut: {
            primary: '#F59E0B',
            secondary: '#B45309',
            accent: '#FDE68A',
            glow: 'rgba(245, 158, 11, 0.25)',
            deep: '#24180A'
          },
          cookies: {
            primary: '#38BDF8',
            secondary: '#0284C7',
            accent: '#E0F2FE',
            glow: 'rgba(56, 189, 248, 0.25)',
            deep: '#081B26'
          },
          caramel: {
            primary: '#FB923C',
            secondary: '#C2410C',
            accent: '#FED7AA',
            glow: 'rgba(251, 146, 60, 0.25)',
            deep: '#261208'
          }
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-spin': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
