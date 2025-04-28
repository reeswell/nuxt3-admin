import type { HEX_VALUE } from '~/types/color'

export const RGBUnit = 255

export const HEX_MAP: Record<HEX_VALUE, number> = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
}

export const CSS_VARS = {
  WHITE: '--el-color-white',
  BLACK: '--el-color-black',
  BG: '--el-bg-color',
} as const
