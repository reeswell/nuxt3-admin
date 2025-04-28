// https://nuxt.com/docs/api/configuration/nuxt-config
import { createResolver } from '@nuxt/kit'

import type { BuildInfo } from './types'

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/modules
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      version: process.env.NODE_ENV || 'development', // 或者其他环境变量
    },
  },

  ssr: false,

  vue: {
    propsDestructure: true,
  },

  imports: {
    autoImport: true,
  },

  css: ['tailwindcss/lib/css/preflight.css', '~/assets/scss/index.scss', 'floating-vue/dist/style.css'],
  // css: ['~/tailwindcss/scss/preflight.css', '~/assets/scss/index.scss', 'floating-vue/dist/style.css'],

  app: {
    // see: https://github.com/vuejs/core/issues/10415
    keepalive: false,
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      // TODO: production env Django埋点项目 白名单
      script: [],
      viewport: 'width=device-width,initial-scale=1,viewport-fit=cover',
      bodyAttrs: {
        class: 'overflow-x-hidden',
      },
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/favicon.ico' },
      ],
      meta: [
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        // open graph social image
        { property: 'og:title', content: 'nuxt3管理系统' },
        { property: 'og:description', content: '高效电子元器件后台管理系统' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://placehold.co/800x/667fff/ffffff.png?text=nuxt3-admin+Image&font=Montserrat' },
        { property: 'og:image:width', content: '3800' },
        { property: 'og:image:height', content: '1900' },
        { property: 'og:site_name', content: 'nuxt3-admin' },

      ],

    },
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vueuse/integrations/useFocusTrap',
      ],
    },
    build: {
      target: 'esnext',
    },
  },

  devtools: { enabled: true },

  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@element-plus/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/svg-sprite',
    'nuxt-lodash',
    // custom modules
    // '~/modules/build-env',
  ],

  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss',
    themes: [],
  },

  nitro: {
    devProxy: {
      '/api': { target: '', changeOrigin: true },
    },
    publicAssets: [
      {
        dir: resolve('./public/files'),
        maxAge: 24 * 60 * 60 * 30, // 30 days
        baseURL: '/files',
      },
    ],

  },

  compatibilityDate: '2025-03-13',
})

declare module '@nuxt/schema' {
  interface AppConfig {
    storage: any
    env: BuildInfo['env']
    buildInfo: BuildInfo
  }
}
