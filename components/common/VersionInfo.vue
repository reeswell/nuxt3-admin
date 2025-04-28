<script setup lang="ts">
import { useAppConfig } from 'nuxt/app'

const { version } = useAppConfig().buildInfo

</script>

<template>
  <div class="text-primary flex justify-center items-center gap-3">
    <p>版本: <span class="ml-1">{{ version }}</span></p>
  </div>
</template>
