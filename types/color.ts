// types/color.ts
export interface RGB {
  r: number
  g: number
  b: number
}

export interface HSL {
  h: number
  s: number
  l: number
}

export type HEX_VALUE =
  | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
  | 'A' | 'B' | 'C' | 'D' | 'E' | 'F'

export type HEX = string

export type GenColorList = {
  [K in 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9]: string;
}

export interface MixColorResult {
  DEFAULT: HEX
  dark: GenColorList
  light: GenColorList
}
