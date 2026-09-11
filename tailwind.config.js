/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        '2xs': '0.625rem',
      },
      fontFamily: {
        // Voxel Workbench: pixel display for headings, Manrope for body/UI.
        pixel: ['var(--font-pixel)', 'ui-monospace', 'monospace'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Voxel Workbench design tokens (see .stitch/DESIGN.md §2)
        paper: '#F4F1EA',
        chalk: '#FFFFFF',
        ink: '#1B1B1F',
        'ink-muted': '#3A3D42',
        'ink-soft': '#5B5F66',
        grass: '#3E8E2A',
        'grass-ink': '#2F6E1F',
        diamond: '#1FB5AC',
        'diamond-tint': '#E6F7F5',
        redstone: '#C8372D',
        dirt: '#8A5A36',
        checker: '#EEEAE1',
        // legacy palette kept for reused pages (pricing/billing/etc.)
        primary: {
          50: '#f0f9ff', 100: '#e0f2fe', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1', 900: '#0c4a6e',
        },
        secondary: {
          50: '#fdf4ff', 100: '#fae8ff', 500: '#a855f7', 600: '#9333ea', 700: '#7c3aed', 900: '#581c87',
        },
      },
      boxShadow: {
        // Hard offset shadows, no blur (neo-brutalist blocks)
        block: '4px 4px 0 #1B1B1F',
        'block-sm': '2px 2px 0 #1B1B1F',
        'block-hover': '5px 5px 0 #1B1B1F',
        'block-inset': 'inset 2px 2px 0 rgba(27,27,31,0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'modal-in': 'modalIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(30px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        modalIn: { '0%': { opacity: '0', transform: 'scale(0.95) translateY(8px)' }, '100%': { opacity: '1', transform: 'scale(1) translateY(0)' } },
      },
    },
  },
  plugins: [],
}
