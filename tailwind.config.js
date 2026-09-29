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
        ieee: {
          blue: '#00629B',
          lightBlue: '#0085CA',
          cyan: '#00D2FF',
          navy: '#050D1A',
          dark: '#080E1A',
          surface: '#0E1726',
          card: '#131F37',
          border: '#1E2D4A',
          gold: '#F59E0B',
          neon: '#10B981',
          purple: '#8B5CF6'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Space Grotesk', 'Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        outfit: ['Outfit', 'Space Grotesk', 'sans-serif'],
        tech: ['Space Grotesk', 'JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(0, 210, 255, 0.2)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 210, 255, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}

