/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        syne: ['var(--font-syne)', 'sans-serif'],
      },
      colors: {
        bg: '#080c14',
        surface: '#0d1220',
        border: 'rgba(59,130,246,0.12)',
        'border-hover': 'rgba(59,130,246,0.35)',
        accent: '#3b82f6',
        'accent-dim': '#1d4ed8',
        'accent-glow': 'rgba(59,130,246,0.15)',
        text: '#e8eaf0',
        muted: '#6b7280',
        'muted-light': '#9ca3af',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-up': 'slideUp 0.5s ease forwards',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        pulseGlow: { '0%,100%': { boxShadow: '0 0 20px rgba(59,130,246,0.1)' }, '50%': { boxShadow: '0 0 40px rgba(59,130,246,0.25)' } },
      },
    },
  },
  plugins: [],
}
