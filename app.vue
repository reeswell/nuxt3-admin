<script setup lang="ts">
import { useHead, useRequestURL, useRoute } from 'nuxt/app'
import { setupPageHeader } from '~/composables/setups'

const route = useRoute()
if (process.server) {
  const url = useRequestURL()

  useHead({
    meta: [
      { property: 'og:url', content: `${url.origin}${route.path}` },
    ],
  })
}

setupPageHeader()
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html, body , #__nuxt{
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
