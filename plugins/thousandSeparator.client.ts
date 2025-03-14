import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp) => {
  function formatNumber(num: number): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  const formatElement = (el: HTMLElement, value: number) => {
    if (typeof value === 'number')
      el.textContent = formatNumber(value)
    else
      el.textContent = value
  }
  nuxtApp.vueApp.directive('thousand-separator', {
    mounted(el, binding) {
      formatElement(el, binding.value)
    },
    updated(el, binding) {
      formatElement(el, binding.value)
    },
  })
})
