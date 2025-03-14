import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('number-format', {
    mounted(el) {
      const value = el.textContent.toString()
      const number = Number.parseFloat(value)
      if (!Number.isFinite(number))
        return

      const digits = !value.includes('.') ? 0 : value.length - value.indexOf('.') - 1
      el.textContent = number.toLocaleString(undefined, { minimumFractionDigits: digits })
    },
    getSSRProps() {
      // you can provide SSR-specific props here
      return {}
    },
  })
})
