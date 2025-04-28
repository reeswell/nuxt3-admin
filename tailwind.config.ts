import type { Config } from 'tailwindcss'

// 生成颜色css变量名
function genColorsName(type: string) {
  return {
    lighter: `var(--${type}-lighter-color)`,
    light: `var(--${type}-light-color)`,
    DEFAULT: `var(--${type}-color)`,
    deep: `var(--${type}-deep-color)`,
    deeper: `var(--${type}-deeper-color)`,
  }
}

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
        white: '#fff',
        black: '#333',
        transparent: 'transparent',
        // 直接使用css变量
        primary: genColorsName('primary'),
        info: genColorsName('info'),
        success: genColorsName('success'),
        warning: genColorsName('warning'),
        danger: genColorsName('danger'),

        background: 'var(--el-bg-color)',
        secondary: 'var(--el-text-color-secondary)',
        active: 'var(--el-fill-color)',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
}
