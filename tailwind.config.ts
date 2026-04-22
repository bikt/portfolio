import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        surface: 'rgba(255,255,255,0.03)',
        border: 'rgba(255,255,255,0.08)',
        'text-primary': '#ffffff',
        'text-secondary': 'rgba(255,255,255,0.4)',
        'text-muted': 'rgba(255,255,255,0.2)',
        'text-ghost': 'rgba(255,255,255,0.025)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        'ultra-tight': '-0.05em',
        'super-tight': '-0.04em',
        'tight': '-0.03em',
        'wide-label': '0.15em',
      },
    },
  },
  plugins: [],
}
export default config
