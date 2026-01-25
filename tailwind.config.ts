import type {Config} from 'tailwindcss'
import {heroui} from '@heroui/react'
const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette')
export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        aurora: 'aurora 60s linear infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: '50% 50%, 50% 50%',
          },
          to: {
            backgroundPosition: '350% 50%, 350% 50%',
          },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    addVariablesForColors,
    heroui({
      defaultTheme: "dark",
      themes: {
        light: {
          colors: {
            background: "#09090b",
            foreground: "#fafafa",
            primary: {
              50: "#042f2e",
              100: "#134e4a",
              200: "#115e59",
              300: "#0d9488",
              400: "#2dd4bf",
              500: "#5eead4",
              600: "#99f6e4",
              700: "#ccfbf1",
              800: "#f0fdfa",
              900: "#f0fdfa",
              DEFAULT: "#5eead4",
              foreground: "#09090b",
            },
            secondary: {
              50: "#2e1065",
              100: "#4c1d95",
              200: "#5b21b6",
              300: "#7c3aed",
              400: "#8b5cf6",
              500: "#a78bfa",
              600: "#c4b5fd",
              700: "#ddd6fe",
              800: "#ede9fe",
              900: "#f5f3ff",
              DEFAULT: "#a78bfa",
              foreground: "#09090b",
            },
            divider: "rgba(255, 255, 255, 0.08)",
            focus: "#5eead4",
          },
        },
        dark: {
          colors: {
            background: "#09090b",
            foreground: "#fafafa",
            content1: "#111113",
            content2: "#18181b",
            content3: "#27272a",
            content4: "#3f3f46",
            primary: {
              50: "#042f2e",
              100: "#134e4a",
              200: "#115e59",
              300: "#0d9488",
              400: "#2dd4bf",
              500: "#5eead4",
              600: "#99f6e4",
              700: "#ccfbf1",
              800: "#f0fdfa",
              900: "#f0fdfa",
              DEFAULT: "#5eead4",
              foreground: "#09090b",
            },
            secondary: {
              50: "#2e1065",
              100: "#4c1d95",
              200: "#5b21b6",
              300: "#7c3aed",
              400: "#8b5cf6",
              500: "#a78bfa",
              600: "#c4b5fd",
              700: "#ddd6fe",
              800: "#ede9fe",
              900: "#f5f3ff",
              DEFAULT: "#a78bfa",
              foreground: "#09090b",
            },
            success: {
              DEFAULT: "#22c55e",
              foreground: "#09090b",
            },
            warning: {
              DEFAULT: "#f59e0b",
              foreground: "#09090b",
            },
            danger: {
              DEFAULT: "#ef4444",
              foreground: "#fafafa",
            },
            divider: "rgba(255, 255, 255, 0.08)",
            focus: "#5eead4",
          },
        },
      },
    }),
  ],
} satisfies Config

function addVariablesForColors({addBase, theme}: any) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  )

  addBase({
    ':root': newVars,
  })
}
