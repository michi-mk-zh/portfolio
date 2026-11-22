/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: '#0F1226',
        panel: '#181C3A',
        'panel-2': '#1F2447',
        line: '#2A2F58',
        fg: '#ECEEF8',
        muted: '#9AA2CC',
        accent: {
          DEFAULT: '#35E0C4',
          dim: '#22B9A3',
        },
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%,100%': { opacity: '0.55' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        rise: 'rise 0.7s cubic-bezier(0.22,1,0.36,1) both',
        glow: 'glow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
