// shims-vue.d.ts
import 'vue'

declare module '@vue/runtime-dom' {
  export interface CSSProperties {
    '-webkit-line-clamp'?: string | number
    '-webkit-box-orient'?: string
  }
}
