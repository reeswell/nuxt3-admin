import { HEX_MAP, RGBUnit } from './constants'
import type { HEX, HEX_VALUE, HSL, RGB } from '~/types/color'

/**
 * RGB颜色转HSL颜色值
 * @param r 红色值
 * @param g 绿色值
 * @param b 蓝色值
 * @returns { h: [0, 360]; s: [0, 1]; l: [0, 1] }
 */
export function rgbToHsl(rgb: RGB): HSL {
  let { r, g, b } = rgb
  const hsl = {
    h: 0,
    s: 0,
    l: 0,
  }

  // 计算rgb基数 ∈ [0, 1]
  r /= RGBUnit
  g /= RGBUnit
  b /= RGBUnit
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  // 计算h
  if (max === min) {
    hsl.h = 0
  }
  else if (max === r) {
    hsl.h = 60 * ((g - b) / (max - min)) + (g >= b ? 0 : 360)
  }
  else if (max === g) {
    hsl.h = 60 * ((b - r) / (max - min)) + 120
  }
  else {
    hsl.h = 60 * ((r - g) / (max - min)) + 240
  }
  hsl.h = hsl.h > 360 ? hsl.h - 360 : hsl.h

  // 计算l
  hsl.l = (max + min) / 2

  // 计算s
  if (hsl.l === 0 || max === min) {
    // 灰/白/黑
    hsl.s = 0
  }
  else if (hsl.l > 0 && hsl.l <= 0.5) {
    hsl.s = (max - min) / (max + min)
  }
  else {
    hsl.s = (max - min) / (2 - (max + min))
  }

  return hsl
}

/**
 * hsl -> rgb
 * @param h [0, 360]
 * @param s [0, 1]
 * @param l [0, 1]
 * @returns RGB
 */
export function hslToRgb(hsl: HSL): RGB {
  const { h, s, l } = hsl
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  const hUnit = h / 360 // 色相转换为 [0, 1]

  const Cr = fillCircleVal(hUnit + 1 / 3)
  const Cg = fillCircleVal(hUnit)
  const Cb = fillCircleVal(hUnit - 1 / 3)

  // 保持 [0, 1] 环状取值
  function fillCircleVal(val: number): number {
    return val < 0 ? val + 1 : val > 1 ? val - 1 : val
  }

  function computedRgb(val: number): number {
    let colorVal: number
    if (val < 1 / 6) {
      colorVal = p + (q - p) * 6 * val
    }
    else if (val >= 1 / 6 && val < 1 / 2) {
      colorVal = q
    }
    else if (val >= 1 / 2 && val < 2 / 3) {
      colorVal = p + (q - p) * 6 * (2 / 3 - val)
    }
    else {
      colorVal = p
    }
    return colorVal * 255
  }

  return {
    r: Number(computedRgb(Cr).toFixed(0)),
    g: Number(computedRgb(Cg).toFixed(0)),
    b: Number(computedRgb(Cb).toFixed(0)),
  }
}

/**
 * 16进制颜色转换RGB
 * @param color #rrggbb
 * @returns RGB
 */
export function hexToRGB(hex: HEX): RGB {
  hex = hex.toUpperCase()
  const hexRegExp = /^#([0-9A-F]{6})$/
  if (!hexRegExp.test(hex)) {
    throw new Error('请传入合法的16进制颜色值，eg: #FF0000')
  }

  const hexValArr = (hexRegExp.exec(hex)?.[1] || '000000').split(
    '',
  ) as Array<HEX_VALUE>

  return {
    r: HEX_MAP[hexValArr[0]] * 16 + HEX_MAP[hexValArr[1]],
    g: HEX_MAP[hexValArr[2]] * 16 + HEX_MAP[hexValArr[3]],
    b: HEX_MAP[hexValArr[4]] * 16 + HEX_MAP[hexValArr[5]],
  }
}

/**
 * rgb 转 16进制
 * @param rgb RGB
 * @returns #HEX{6}
 */
export function rgbToHex(rgb: RGB): HEX {
  const HEX_MAP_REVERSE: Record<string, HEX_VALUE> = {}
  for (const key in HEX_MAP) {
    HEX_MAP_REVERSE[HEX_MAP[key as HEX_VALUE]] = key as HEX_VALUE
  }
  function getRemainderAndQuotient(val: number): `${HEX_VALUE}${HEX_VALUE}` {
    val = Math.round(val)
    return `${HEX_MAP_REVERSE[Math.floor(val / 16)]}${HEX_MAP_REVERSE[val % 16]
    }`
  }

  return `#${getRemainderAndQuotient(rgb.r)}${getRemainderAndQuotient(
    rgb.g,
  )}${getRemainderAndQuotient(rgb.b)}`
}

// hsl 转 16进制
export function hslToHex(hsl: HSL): HEX {
  return rgbToHex(hslToRgb(hsl))
}
