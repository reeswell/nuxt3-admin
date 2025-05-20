import { hexToRGB, rgbToHex } from './converter'
import { normalizationColor } from './normalizer'
import type { GenColorList, HEX, RGB } from '~/types/color'

// 混合基础色获取
export function getMixColorFromVar(isDark?: boolean) {
  const VAR_WHITE = '--el-color-white'
  const VAR_BLACK = '--el-color-black'
  const VAR_BG = '--el-bg-color'

  let mixLightColor, mixDarkColor

  if (isDark) {
    mixLightColor = getComputedStyle(document.documentElement)
      .getPropertyValue(VAR_BG)
      .trim()
    mixDarkColor = getComputedStyle(document.documentElement)
      .getPropertyValue(VAR_WHITE)
      .trim()
  }
  else {
    mixLightColor = getComputedStyle(document.documentElement)
      .getPropertyValue(VAR_WHITE)
      .trim()
    mixDarkColor = getComputedStyle(document.documentElement)
      .getPropertyValue(VAR_BLACK)
      .trim()
  }

  mixLightColor = hexToRGB(normalizationColor(mixLightColor))
  mixDarkColor = hexToRGB(normalizationColor(mixDarkColor))

  return {
    mixLightColor,
    mixDarkColor,
  }
}

export function mix(color: RGB, mixColor: RGB, weight: number): RGB {
  return {
    r: color.r * (1 - weight) + mixColor.r * weight,
    g: color.g * (1 - weight) + mixColor.g * weight,
    b: color.b * (1 - weight) + mixColor.b * weight,
  }
}

export function genMixColor(
  base: string,
  isDark?: boolean,
): {
    DEFAULT: HEX
    dark: GenColorList
    light: GenColorList
  } {
  // 基准色统一转换为RGB
  base = normalizationColor(base)
  const rgbBase = hexToRGB(base)

  const { mixLightColor, mixDarkColor } = getMixColorFromVar(isDark)

  // 混合色
  function mix(color: RGB, mixColor: RGB, weight: number): RGB {
    return {
      r: color.r * (1 - weight) + mixColor.r * weight,
      g: color.g * (1 - weight) + mixColor.g * weight,
      b: color.b * (1 - weight) + mixColor.b * weight,
    }
  }

  return {
    DEFAULT: base,
    dark: {
      1: rgbToHex(mix(rgbBase, mixDarkColor, 0.1)),
      2: rgbToHex(mix(rgbBase, mixDarkColor, 0.2)),
      3: rgbToHex(mix(rgbBase, mixDarkColor, 0.3)),
      4: rgbToHex(mix(rgbBase, mixDarkColor, 0.4)),
      5: rgbToHex(mix(rgbBase, mixDarkColor, 0.5)),
      6: rgbToHex(mix(rgbBase, mixDarkColor, 0.6)),
      7: rgbToHex(mix(rgbBase, mixDarkColor, 0.7)),
      8: rgbToHex(mix(rgbBase, mixDarkColor, 0.8)),
      9: rgbToHex(mix(rgbBase, mixDarkColor, 0.9)),
    },
    light: {
      1: rgbToHex(mix(rgbBase, mixLightColor, 0.1)),
      2: rgbToHex(mix(rgbBase, mixLightColor, 0.2)),
      3: rgbToHex(mix(rgbBase, mixLightColor, 0.3)),
      4: rgbToHex(mix(rgbBase, mixLightColor, 0.4)),
      5: rgbToHex(mix(rgbBase, mixLightColor, 0.5)),
      6: rgbToHex(mix(rgbBase, mixLightColor, 0.6)),
      7: rgbToHex(mix(rgbBase, mixLightColor, 0.7)),
      8: rgbToHex(mix(rgbBase, mixLightColor, 0.8)),
      9: rgbToHex(mix(rgbBase, mixLightColor, 0.9)),
    },
  }
}
