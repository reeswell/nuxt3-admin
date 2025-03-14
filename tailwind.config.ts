import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './App.{js,ts,vue}',
    './app.{js,ts,vue}',
    './Error.{js,ts,vue}',
    './error.{js,ts,vue}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1f2937',
        slate: colors.slate,
        background: 'var(--c-bg-base)',
        foreground: 'var(--c-text-base)',
        secondary: '#FF6C58',
        danger: {
          DEFAULT: 'var(--c-danger)',
          foreground: 'var(--c-bg-base)',
        },
        opacity: {
          5: '0.05',
        },
        link: 'var(--c-active-text-color)',
        success: 'var(--c-success)',
      },
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans],
      },
    },
  },
}
