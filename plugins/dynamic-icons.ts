import { defineAsyncComponent } from 'vue'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp) => {
  const iconLoader = (iconName: string) => {
    return defineAsyncComponent(() =>
      import(`@element-plus/icons-vue`).then(module => module[iconName as keyof typeof module]),
    )
  }

  nuxtApp.provide('iconLoader', iconLoader)
})
