import { useDark } from '@vueuse/core'
import { merge } from 'lodash-es'
import { ref, watch } from 'vue'
import { genMixColor } from '~/utils/color/mixer'

// 类型定义
export interface ThemeColors {
  primary?: string
  info?: string
  warning?: string
  success?: string
  danger?: string
}

export interface Theme {
  colors: ThemeColors
}

// 常量
const THEME_KEY = 'theme'
const DEFAULT_THEME: Theme = {
  colors: {
    primary: '#1f2937',
    info: '#909399',
    warning: '#f2711c',
    danger: '#e71410',
    success: '#21ba45',
  },
}

export function useTheme() {
  const isDark = useDark()
  const currentTheme = ref<Theme>(loadTheme())

  // 加载主题
  function loadTheme(): Theme {
    try {
      const saved = localStorage.getItem(THEME_KEY)
      return saved ? merge({}, DEFAULT_THEME, JSON.parse(saved)) : DEFAULT_THEME
    }
    catch (error) {
      console.error('Failed to load theme:', error)
      return DEFAULT_THEME
    }
  }

  // 更新CSS变量
  function updateCSSVar(name: string, value: string) {
    document.documentElement.style.setProperty(name, value)
  }

  // 更新单个品牌色的所有变体
  function updateBrandColors(color: string, name: string) {
    const { DEFAULT, dark, light } = genMixColor(color, isDark.value)

    // 更新自定义主题变量
    const themeVars = {
      [`--${name}-lighter-color`]: light[5],
      [`--${name}-light-color`]: light[3],
      [`--${name}-color`]: DEFAULT,
      [`--${name}-deep-color`]: dark[2],
      [`--${name}-deeper-color`]: dark[4],
    }

    // 更新Element Plus变量
    const elementVars = {
      [`--el-color-${name}`]: DEFAULT,
      [`--el-color-${name}-dark-2`]: dark[2],
      [`--el-color-${name}-light-3`]: light[3],
      [`--el-color-${name}-light-5`]: light[5],
      [`--el-color-${name}-light-7`]: light[7],
      [`--el-color-${name}-light-8`]: light[8],
      [`--el-color-${name}-light-9`]: light[9],
    }

    // 批量更新CSS变量
    Object.entries({ ...themeVars, ...elementVars }).forEach(([prop, value]) => {
      updateCSSVar(prop, value)
    })
  }

  // 应用主题
  function applyTheme(theme: Theme) {
    Object.entries(theme.colors).forEach(([name, color]) => {
      if (color) {
        updateBrandColors(color, name)
      }
    })
  }

  // 更新主题
  function updateTheme(newTheme: Partial<Theme>) {
    const mergedTheme = merge({}, currentTheme.value, newTheme)
    currentTheme.value = mergedTheme

    try {
      localStorage.setItem(THEME_KEY, JSON.stringify(mergedTheme))
      applyTheme(mergedTheme)
    }
    catch (error) {
      console.error('Failed to save theme:', error)
    }
  }

  // 重置主题
  function resetTheme() {
    updateTheme(DEFAULT_THEME)
  }

  // 监听暗色模式变化
  watch(isDark, () => {
    applyTheme(currentTheme.value)
  })

  // 初始化
  applyTheme(currentTheme.value)

  return {
    currentTheme,
    isDark,
    updateTheme,
    resetTheme,
  }
}
