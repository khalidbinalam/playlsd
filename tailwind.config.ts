
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom colors for PlayLSD Hub
				playlsd: {
					dark: "#1A1F2C",
					purple: "#9b87f5",
					"purple-light": "#D6BCFA",
					"purple-mid": "#7E69AB",
					blue: "#1EAEDB",
					"blue-light": "#D3E4FD",
					gray: "#8E9196",
					overlay: "#000000e6"
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				display: ['Space Grotesk', 'sans-serif'],
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'mesh-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 20.83l2.83-2.83 1.41 1.41L1.41 22.24H0v-1.41zM0 3.07l2.83-2.83 1.41 1.41L1.41 4.48H0V3.07zM17.76 38.59l2.83-2.83 1.41 1.41-2.83 2.83h-1.41v-1.41zM17.76 20.83l2.83-2.83 1.41 1.41-2.83 2.83h-1.41v-1.41zM17.76 3.07l2.83-2.83 1.41 1.41-2.83 2.83h-1.41V3.07zM35.52 38.59l2.83-2.83 1.41 1.41-2.83 2.83h-1.41v-1.41zM35.52 20.83l2.83-2.83 1.41 1.41-2.83 2.83h-1.41v-1.41zM35.52 3.07l2.83-2.83 1.41 1.41-2.83 2.83h-1.41V3.07zM0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 20.83l2.83-2.83 1.41 1.41L1.41 22.24H0v-1.41zM0 3.07l2.83-2.83 1.41 1.41L1.41 4.48H0V3.07zM17.76 38.59l2.83-2.83 1.41 1.41-2.83 2.83h-1.41v-1.41zM17.76 20.83l2.83-2.83 1.41 1.41-2.83 2.83h-1.41v-1.41zM17.76 3.07l2.83-2.83 1.41 1.41-2.83 2.83h-1.41V3.07zM35.52 38.59l2.83-2.83 1.41 1.41-2.83 2.83h-1.41v-1.41zM35.52 20.83l2.83-2.83 1.41 1.41-2.83 2.83h-1.41v-1.41zM35.52 3.07l2.83-2.83 1.41 1.41-2.83 2.83h-1.41V3.07z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
