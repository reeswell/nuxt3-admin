import { hslToHex, rgbToHex } from './converter'
import type { HEX } from '~/types/color'

export function normalizationColor(color: string): HEX {
  // eslint-disable-next-line regexp/no-dupe-disjunctions
  const prefix = /^(#|hsl|rgb|rgba)/i.exec(color)?.[1]

  if (!prefix) {
    throw new TypeError('color is invalid.')
  }

  const colorVal = color.replace(prefix, '').trim()
  if (prefix === '#') {
    return fixHexVal(colorVal)
  }
  else if (prefix.toLocaleLowerCase() === 'hsl') {
    return fixHslVal(colorVal)
  }
  else {
    return fixRgbVal(colorVal)
  }

  function fixHexVal(val: string) {
    const len = val.length
    if (len === 8) {
      return `#${val.substring(0, 6)}` // 舍弃掉透明度
    }
    else if (len === 6) {
      return `#${val}`
    }
    else if (len === 3) {
      return val.split('').reduce((pre, cur) => `${pre}${cur + cur}`, '#')
    }
    else {
      throw new TypeError('hex color is invalid.')
    }
  }

  function fixHslVal(val: string) {
    const hslVal = val
      .substring(1, val.length - 1)
      .split(',')
      .map(v => Number.parseInt(v.trim()))
    return hslToHex({
      h: hslVal[0],
      s: hslVal[1],
      l: hslVal[2],
    })
  }

  function fixRgbVal(val: string) {
    const rgb = val
      .substring(1, val.length - 1)
      .split(',')
      .map(v => Number.parseInt(v.trim()))

    // 舍弃掉alphe
    return rgbToHex({
      r: rgb[0],
      g: rgb[1],
      b: rgb[2],
    })
  }
}
