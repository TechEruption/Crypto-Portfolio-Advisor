import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bgMain': '#0B0F17',
        'bgCard': '#111827',
        'textPrimary': '#E5E7EB',
        'textMuted': '#9CA3AF',
        'accentBlue': '#3B82F6',
        'accentPurple': '#8B5CF6',
        'success': '#22C55E',
        'warning': '#F59E0B',
        'danger': '#EF4444',
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
      },
      boxShadow: {
        'glow': '0 0 30px rgba(59, 130, 246, 0.2)',
        'glow-purple': '0 0 30px rgba(139, 92, 246, 0.2)',
      },
    },
  },
  plugins: [],
}
export default config
